import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/reference';

const proc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9225',
  '--user-data-dir=C:\\temp\\chrome-ref-profile',
  targetUrl,
]);

async function run() {
  await new Promise((r) => setTimeout(r, 2000));
  try {
    const res = await fetch('http://127.0.0.1:9225/json');
    const tabs = await res.json();
    const tab = tabs.find((t) => t.type === 'page' && t.url.includes('reference')) || tabs[0];
    if (!tab) {
      console.log('No tab found:', tabs);
      proc.kill();
      return;
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.onopen = async () => {
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Page.navigate', { url: targetUrl });
      await new Promise((r) => setTimeout(r, 2000));

      const viewports = [
        { name: '375px Mobile', width: 375, height: 667 },
        { name: '768px Tablet', width: 768, height: 1024 },
        { name: '1024px Laptop', width: 1024, height: 768 },
        { name: '1440px Desktop', width: 1440, height: 900 },
      ];

      console.log('=== MULTI-VIEWPORT RESPONSIVE & LAYOUT AUDIT ===');
      for (const vp of viewports) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768,
        });
        await new Promise((r) => setTimeout(r, 400));

        const evalResult = await send('Runtime.evaluate', {
          expression: `
            JSON.stringify({
              windowWidth: window.innerWidth,
              scrollWidth: document.documentElement.scrollWidth,
              hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
              h1Text: document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : null,
              h2Count: document.querySelectorAll('h2').length,
              tablesCount: document.querySelectorAll('table').length,
              accordionsCount: document.querySelectorAll('details').length,
              interactiveRows: document.querySelectorAll('tbody tr').length
            })
          `,
          returnByValue: true,
        });

        const val = JSON.parse(evalResult?.result?.result?.value);
        console.log(`\n[Viewport: ${vp.name} (${vp.width}x${vp.height})]`);
        console.log(`  Window Width: ${val.windowWidth}px | Scroll Width: ${val.scrollWidth}px`);
        console.log(`  Horizontal Overflow: ${val.hasOverflow ? 'DEFECT (OVERFLOW)' : 'PASSED (NO OVERFLOW)'}`);
        console.log(`  H1: "${val.h1Text}"`);
        console.log(`  H2 Headings: ${val.h2Count} | Tables: ${val.tablesCount} | Accordions: ${val.accordionsCount}`);
      }

      console.log('\n=== THEME CONTRAST & ACCESSIBILITY AUDIT ===');
      for (const theme of ['light', 'dark']) {
        const themeEval = await send('Runtime.evaluate', {
          expression: `
            (() => {
              if ('${theme}' === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              const bodyBg = window.getComputedStyle(document.body).backgroundColor;
              const h1Color = window.getComputedStyle(document.querySelector('h1')).color;
              return JSON.stringify({ theme: '${theme}', bodyBg, h1Color, isDarkClass: document.documentElement.classList.contains('dark') });
            })()
          `,
          returnByValue: true,
        });
        const themeVal = JSON.parse(themeEval?.result?.result?.value);
        console.log(`  Theme: ${themeVal.theme} (class 'dark'=${themeVal.isDarkClass}) -> Body: ${themeVal.bodyBg}, H1: ${themeVal.h1Color}`);
      }

      console.log('\n=== INTERACTIVE REFERENCE CHART FUNCTIONALITY AUDIT ===');
      const interactEval = await send('Runtime.evaluate', {
        expression: `
          (async () => {
            const searchInput = document.getElementById('reference-search');
            if (!searchInput) return JSON.stringify({ error: 'Search input not found' });
            
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;

            // Initial count
            const initialCount = document.querySelectorAll('table')[0].querySelectorAll('tbody tr').length;
            
            // Search for "SOS"
            nativeInputValueSetter.call(searchInput, 'SOS');
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, 200));
            const searchCount = document.querySelectorAll('table')[0].querySelectorAll('tbody tr').length;
            
            // Reverse lookup dot-dash for Q: "--.-"
            nativeInputValueSetter.call(searchInput, '--.-');
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, 200));
            const reverseCount = document.querySelectorAll('table')[0].querySelectorAll('tbody tr').length;
            const matchedChar = document.querySelectorAll('table')[0].querySelector('tbody tr td')?.innerText?.trim();

            // Clear search
            nativeInputValueSetter.call(searchInput, '');
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, 200));

            // Test category filter click (Digits 0-9)
            const digitTab = Array.from(document.querySelectorAll('button[role="tab"]')).find(b => b.innerText.includes('Digits'));
            if (digitTab) {
              digitTab.click();
              await new Promise(r => setTimeout(r, 200));
            }
            const digitCount = document.querySelectorAll('table')[0].querySelectorAll('tbody tr').length;

            // Reset tab to All
            const allTab = Array.from(document.querySelectorAll('button[role="tab"]')).find(b => b.innerText.includes('All'));
            if (allTab) {
              allTab.click();
              await new Promise(r => setTimeout(r, 200));
            }
            const resetCount = document.querySelectorAll('table')[0].querySelectorAll('tbody tr').length;

            // Test Play/Stop Audio Button on first row (Letter A)
            const firstRowButtons = Array.from(document.querySelectorAll('table')[0].querySelectorAll('tbody tr')[0].querySelectorAll('button'));
            const playBtn = firstRowButtons[0];
            const copyBtn = firstRowButtons[1];
            
            const initialBtnText = playBtn?.innerText?.trim();
            playBtn?.click();
            await new Promise(r => setTimeout(r, 100));
            const playingBtnText = playBtn?.innerText?.trim();
            
            playBtn?.click(); // Click Stop
            await new Promise(r => setTimeout(r, 100));
            const stoppedBtnText = playBtn?.innerText?.trim();

            return JSON.stringify({
              initialCount,
              reverseCount,
              matchedChar,
              digitCount,
              resetCount,
              initialBtnText,
              playingBtnText,
              stoppedBtnText
            });
          })()
        `,
        awaitPromise: true,
        returnByValue: true,
      });
      const interactVal = JSON.parse(interactEval?.result?.result?.value);
      console.log(`  Initial 54-item count: ${interactVal.initialCount}`);
      console.log(`  Reverse lookup "--.-": ${interactVal.reverseCount} match (Matched Char: ${interactVal.matchedChar})`);
      console.log(`  Category filter (Digits 0-9): ${interactVal.digitCount} items (expected 10)`);
      console.log(`  Reset to All (54): ${interactVal.resetCount} items (expected 54)`);
      console.log(`  Audio Play/Stop Toggle: "${interactVal.initialBtnText}" -> Clicked -> "${interactVal.playingBtnText}" -> Clicked -> "${interactVal.stoppedBtnText}"`);

      console.log('\n=== FAQ VISIBLE & JSON-LD SCHEMA PARITY AUDIT ===');
      const faqEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const visibleQuestions = Array.from(document.querySelectorAll('#faq details summary h3')).map(h => h.textContent.trim());
            const visibleAnswers = Array.from(document.querySelectorAll('#faq details p')).map(p => p.textContent.trim());
            
            const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
            let faqSchema = null;
            for (const script of jsonLdScripts) {
              try {
                const parsed = JSON.parse(script.innerText);
                const items = Array.isArray(parsed) ? parsed : [parsed];
                const found = items.find(i => i['@type'] === 'FAQPage');
                if (found) { faqSchema = found; break; }
              } catch(e) {}
            }
            
            if (!faqSchema) return JSON.stringify({ error: 'No FAQPage schema found' });
            
            const schemaQAs = faqSchema.mainEntity.map(e => ({
              q: e.name,
              a: e.acceptedAnswer.text
            }));
            
            let parityMismatch = false;
            const diffs = [];
            for (let i = 0; i < visibleQuestions.length; i++) {
              if (visibleQuestions[i] !== schemaQAs[i]?.q) {
                parityMismatch = true;
                diffs.push({ index: i, type: 'Question Mismatch', visible: visibleQuestions[i], schema: schemaQAs[i]?.q });
              }
              if (visibleAnswers[i] !== schemaQAs[i]?.a) {
                parityMismatch = true;
                diffs.push({ index: i, type: 'Answer Mismatch', visible: visibleAnswers[i], schema: schemaQAs[i]?.a });
              }
            }

            return JSON.stringify({
              visibleCount: visibleQuestions.length,
              schemaCount: schemaQAs.length,
              parityMismatch,
              diffs
            });
          })()
        `,
        returnByValue: true,
      });
      const faqVal = JSON.parse(faqEval?.result?.result?.value);
      console.log(`  Visible FAQs: ${faqVal.visibleCount} | Schema FAQs: ${faqVal.schemaCount}`);
      console.log(`  100% Verbatim Parity: ${faqVal.parityMismatch ? 'FAILED (MISMATCH)' : 'PASSED (EXACT MATCH)'}`);
      if (faqVal.diffs?.length > 0) {
        console.log('  Differences:', faqVal.diffs);
      }

      console.log('\n=== INTERNAL LINKS AUDIT ON /reference ===');
      const linksEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const links = Array.from(document.querySelectorAll('main a[href]')).map(a => ({
              text: a.innerText.trim(),
              href: a.getAttribute('href')
            }));
            return JSON.stringify(links);
          })()
        `,
        returnByValue: true,
      });
      const linksVal = JSON.parse(linksEval?.result?.result?.value);
      console.log(`  Total Content Links in <main>: ${linksVal.length}`);
      for (const link of linksVal) {
        console.log(`    - [${link.href}] "${link.text.replace(/\\n/g, ' ').slice(0, 50)}"`);
      }

      ws.close();
      proc.kill();
      process.exit(0);
    };
  } catch (err) {
    console.error('Test error:', err);
    proc.kill();
    process.exit(1);
  }
}

run();
