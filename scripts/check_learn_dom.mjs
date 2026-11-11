import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const proc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9224',
  '--user-data-dir=C:\\temp\\chrome-check-dom',
  'http://localhost:3000/learn'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9224/json');
    const tabs = await res.json();
    const tab = tabs.find(t => t.type === 'page' && t.url.includes('3000')) || tabs[0];
    if (!tab) {
      console.log('No tab found');
      proc.kill();
      return;
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    };

    setTimeout(() => {
      ws.send(JSON.stringify({
        id: 2,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            JSON.stringify({
              title: document.title,
              h1: document.querySelector('h1')?.innerText,
              hasErrorBoundary: document.body.innerText.includes('Something went wrong'),
              hasLessons: document.querySelectorAll('a[href*="/learn/"]').length,
              progressHeading: document.querySelector('h2')?.innerText,
              bodySnippet: document.body.innerText.slice(0, 300)
            })
          `
        }
      }));
    }, 2000);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 2) {
        console.log('DOM Evaluation Result:', msg.result.result.value);
        ws.close();
        proc.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error('Error:', err);
    proc.kill();
    process.exit(1);
  }
}, 1500);

