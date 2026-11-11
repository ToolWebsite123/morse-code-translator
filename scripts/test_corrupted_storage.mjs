import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testWithStorage(storageData) {
  return new Promise((resolve) => {
    const port = 9225;
    const proc = spawn(chromePath, [
      '--headless=new',
      '--disable-gpu',
      `--remote-debugging-port=${port}`,
      '--user-data-dir=C:\\temp\\chrome-test-storage',
      'http://localhost:3000/'
    ]);

    setTimeout(async () => {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json`);
        const tabs = await res.json();
        const tab = tabs[0];
        const ws = new WebSocket(tab.webSocketDebuggerUrl);

        ws.onopen = () => {
          ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
          // Set localStorage
          ws.send(JSON.stringify({
            id: 2,
            method: 'Runtime.evaluate',
            params: {
              expression: `
                localStorage.setItem('morse_learning_progress_v1', ${JSON.stringify(storageData)});
                location.href = 'http://localhost:3000/learn';
              `
            }
          }));
        };

        ws.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === 2) {
            // Wait for navigation and check
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Runtime.evaluate',
                params: {
                  expression: `
                    JSON.stringify({
                      hasError: document.body.innerText.includes('Something went wrong'),
                      text: document.body.innerText.slice(0, 100)
                    })
                  `
                }
              }));
            }, 2000);
          }
          if (msg.id === 3) {
            resolve(JSON.parse(msg.result.result.value));
            ws.close();
            proc.kill();
          }
        };
      } catch (err) {
        resolve({ error: err.message });
        proc.kill();
      }
    }, 1500);
  });
}

const corruptedCases = [
  'undefined',
  'null',
  '{ "completedLessons": null }',
  '{ "completedLessons": "not-an-array" }',
  '{ "version": 2, "random": true }',
  '{"completedLessons":["what-is-morse-code"],"quizHistory":[{"score":"invalid"}]}',
  'malformed json {{'
];

for (const c of corruptedCases) {
  const result = await testWithStorage(c);
  console.log(`Testing storage [${c.slice(0, 30)}]:`, result);
}

