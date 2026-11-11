import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const proc = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9223',
  '--user-data-dir=C:\\temp\\chrome-debug-profile-2',
  'http://localhost:3000/'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://127.0.0.1:9223/json');
    const tabs = await res.json();
    const tab = tabs.find(t => t.type === 'page' && t.url.includes('3000')) || tabs[0];
    if (!tab) {
      console.log('No tab found:', tabs);
      proc.kill();
      return;
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
      ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log(`[CONSOLE ${msg.params.type}]`, msg.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
      }
    };

    // Wait 2s, then navigate to /learn
    setTimeout(() => {
      console.log('Navigating to /learn via client click...');
      ws.send(JSON.stringify({
        id: 10,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            const link = document.querySelector('a[href="/learn"]');
            if (link) { link.click(); 'clicked'; } else { 'no link'; }
          `
        }
      }));
    }, 2000);

    setTimeout(() => {
      ws.close();
      proc.kill();
      process.exit(0);
    }, 6000);
  } catch (err) {
    console.error('Fetch error:', err);
    proc.kill();
    process.exit(1);
  }
}, 1500);

