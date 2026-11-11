import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = 'http://localhost:3000/';

const proc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9224',
  '--user-data-dir=C:\\temp\\chrome-resp-profile',
  targetUrl
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const res = await fetch('http://127.0.0.1:9224/json');
    const tabs = await res.json();
    const tab = tabs.find(t => t.type === 'page' && t.url.includes('3000')) || tabs[0];
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
      await new Promise(r => setTimeout(r, 2000));

      const viewports = [
        { name: '375px Mobile', width: 375, height: 667 },
        { name: '768px Tablet', width: 768, height: 1024 },
        { name: '1024px Laptop', width: 1024, height: 768 },
        { name: '1440px Desktop', width: 1440, height: 900 }
      ];

      for (const vp of viewports) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768
        });
        await new Promise(r => setTimeout(r, 500));

        const evalResult = await send('Runtime.evaluate', {
          expression: `
            JSON.stringify({
              windowWidth: window.innerWidth,
              scrollWidth: document.documentElement.scrollWidth,
              bodyScrollWidth: document.body.scrollWidth,
              hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
              h1Text: document.querySelector('h1') ? document.querySelector('h1').innerText.trim().slice(0, 35) : null,
              tablesCount: document.querySelectorAll('table').length,
              accordionsCount: document.querySelectorAll('details').length
            })
          `,
          returnByValue: true
        });

        const raw = evalResult?.result?.result?.value;
        const val = raw ? JSON.parse(raw) : evalResult;
        console.log(`\n=== Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
        console.log(`  Window Width: ${val.windowWidth}px | Scroll Width: ${val.scrollWidth}px`);
        console.log(`  Horizontal Overflow: ${val.hasOverflow ? 'YES (DEFECT)' : 'NO (PERFECT)'}`);
        console.log(`  H1: "${val.h1Text}..."`);
        console.log(`  Tables: ${val.tablesCount} | Accordions: ${val.accordionsCount}`);
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
