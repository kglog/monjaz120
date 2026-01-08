// Simple node script to test chat endpoints (GET and POST)
const fetch = require('node-fetch');
const base = 'http://localhost:3000';
async function run(){
  const rid = 'test_request_1';
  console.log('Posting message...');
  const p = await fetch(`${base}/api/chats/${rid}`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ senderId: 'tester', text: 'Hello from test script' }) });
  console.log('POST status', p.status);
  const g = await fetch(`${base}/api/chats/${rid}`);
  console.log('GET status', g.status);
  const j = await g.json();
  console.log('Messages:', j.data);
}
run().catch(console.error);
