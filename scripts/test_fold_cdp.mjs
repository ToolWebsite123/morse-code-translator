import http from 'http';

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  const versionInfo = await getJson('http://127.0.0.1:9222/json/version');
  const wsUrl = versionInfo.webSocketDebuggerUrl;
  const { WebSocket } = await import('ws');
  const ws = new WebSocket(wsUrl);

  await new Promise((res) => ws.on('open', res));
  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const curId = id++;
    const handler = (msg) => {
      const data = JSON.parse(msg);
      if (data.id === curId) {
        ws.off('message', handler);
        resolve(data.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  const { targetId } = await send('Target.createTarget', { url: 'http://localhost:3000/' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const sendSession = (method, params = {}) => send('Target.sendMessageToTarget', {
    sessionId,
    message: JSON.stringify({ id: id++, method, params })
  }).then(() => new Promise((resolve) => {
    const handler = (msg) => {
      const data = JSON.parse(msg);
      if (data.params?.sessionId === sessionId) {
        const inner = JSON.parse(data.params.message);
        if (inner.id === id - 1) {
          ws.off('message', handler);
          resolve(inner.result);
        }
      }
    };
    ws.on('message', handler);
  }));

  // Test across laptop viewport (1366 x 650 content height without browser chrome)
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1366,
    height: 650,
    deviceScaleFactor: 1,
    mobile: false
  });

  await sendSession('Page.navigate', { url: 'http://localhost:3000/' });
  await new Promise(r => setTimeout(r, 1500));

  const foldAudit = await sendSession('Runtime.evaluate', {
    expression: `(() => {
      const translator = document.querySelector('section[aria-label="Morse Code Translator"]');
      const rect = translator.getBoundingClientRect();
      const textarea = document.querySelector('textarea');
      const textRect = textarea ? textarea.getBoundingClientRect() : null;
      return {
        viewportHeight: window.innerHeight,
        translatorTop: rect.top,
        translatorBottom: rect.bottom,
        textareaTop: textRect ? textRect.top : null,
        textareaBottom: textRect ? textRect.bottom : null,
        isTranslatorVisibleAboveFold: rect.top < window.innerHeight,
        isTextareaVisibleAboveFold: textRect ? textRect.top < window.innerHeight : false,
        visiblePixelsOfTranslator: Math.max(0, Math.min(window.innerHeight, rect.bottom) - rect.top)
      };
    })()`,
    returnByValue: true
  });

  console.log('Homepage Above-The-Fold Visibility Audit:');
  console.log(JSON.stringify(foldAudit.value, null, 2));

  await send('Target.closeTarget', { targetId });
  ws.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

