const http = require('http');
const urls = [
  'http://localhost:3000/api/auth/me',
  'http://localhost:3000/api/seller/services',
  'http://localhost:3000/api/seller/orders',
];

async function fetchJson(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        console.log('---', url, 'status:', res.statusCode);
        try {
          console.log(JSON.stringify(JSON.parse(data), null, 2));
        } catch (e) {
          console.log(data);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log('---', url, 'error:', err.message);
      resolve();
    });
  });
}

(async function () {
  for (const u of urls) {
    await fetchJson(u);
  }
})();
