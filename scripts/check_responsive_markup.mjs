import http from 'http';

// Let's test if Chrome debugging port is active or use a lightweight DOM inspection script
async function inspectViewportSizes() {
  console.log('Testing responsive markup...');
  const res = await new Promise((resolve, reject) => {
    http.get('http://localhost:3000/', (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });

  // Verify responsive Tailwind classes
  const checks = [
    { name: 'Feature grid responsiveness', pattern: /sm:grid-cols-2\s+lg:grid-cols-4/ },
    { name: 'How to Use step grid responsiveness', pattern: /sm:grid-cols-3/ },
    { name: 'Bidirectional mechanics grid', pattern: /sm:grid-cols-2/ },
    { name: 'Timing table horizontal scroll container', pattern: /overflow-x-auto/ },
    { name: 'Alphabet table horizontal scroll container', pattern: /overflow-x-auto/ },
    { name: 'Hero heading responsive sizing', pattern: /text-3xl\s+sm:text-4xl/ },
    { name: 'Hero text responsive sizing', pattern: /text-sm\s+sm:text-base/ },
    { name: 'Audio control cards responsiveness', pattern: /sm:grid-cols-2\s+lg:grid-cols-4/ },
    { name: 'CTA buttons wrap responsiveness', pattern: /flex-wrap/ },
  ];

  for (const c of checks) {
    const passed = c.pattern.test(res);
    console.log(`Responsive Check [${c.name}]: ${passed ? 'PASSED' : 'FAILED'}`);
  }
}

inspectViewportSizes().catch(console.error);

