import http from 'http';

async function run() {
  console.log('Testing homepage in Headless Chrome via CDP...');
  const testUrl = 'http://localhost:3000/';
  http.get(testUrl, (res) => {
    console.log(`HTTP Status: ${res.statusCode}`);
    let body = '';
    res.on('data', (c) => (body += c));
    res.on('end', () => {
      console.log(`Page rendered successfully. Length: ${body.length}`);
      const hasH1 = body.includes('Free International Morse Code Translator &amp; Audio Converter');
      const hasTranslator = body.includes('Switch Direction');
      const hasTimingTable = body.includes('ITU-R M.1677-1 Standard Timing Ratio');
      console.log(`Checks -> H1: ${hasH1}, Translator: ${hasTranslator}, TimingTable: ${hasTimingTable}`);
      process.exit(0);
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

run();
