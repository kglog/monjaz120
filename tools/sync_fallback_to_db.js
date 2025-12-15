// tools/sync_fallback_to_db.js
// Sync fallback JSON (requests/chats/incidents) into the database via Prisma if available.
// Usage: node tools/sync_fallback_to_db.js

const fs = require('fs');
const path = require('path');

async function readJSON(p) {
  try {
    if (!fs.existsSync(p)) return [];
    const txt = fs.readFileSync(p, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (e) { console.error('readJSON error', e); return []; }
}

async function writeJSON(p, data) {
  try { fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8'); } catch(e){ console.error('writeJSON error', e); }
}

async function main(){
  const fallbackDir = path.join(process.cwd(), 'prisma');
  const reqPath = path.join(fallbackDir, 'requests_fallback.json');
  const chatPath = path.join(fallbackDir, 'chats_fallback.json');
  const incPath = path.join(fallbackDir, 'incidents_fallback.json');

  // try to load Prisma
  let prisma = null;
  try {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
    await prisma.$connect();
    console.log('Prisma connected');
  } catch (e) {
    console.warn('Prisma client unavailable or DATABASE_URL not set. Will not write to DB.');
  }

  // Requests
  const reqs = await readJSON(reqPath);
  console.log('Found', reqs.length, 'fallback requests');
  if (prisma && prisma.request) {
    for (const r of reqs) {
      try {
        await prisma.request.upsert({ where: { id: r.id }, update: r, create: r });
        console.log('Upserted request', r.id);
      } catch (e) { console.error('Failed request upsert', r.id, e); }
    }
    // clear file
    writeJSON(reqPath, []);
    console.log('Cleared requests_fallback.json');
  } else {
    console.log('Skipping requests -> DB (prisma.request not available)');
  }

  // Incidents
  const incs = await readJSON(incPath);
  console.log('Found', incs.length, 'fallback incidents');
  if (prisma && prisma.incident) {
    for (const it of incs) {
      try {
        await prisma.incident.upsert({ where: { id: it.id }, update: it, create: it });
        console.log('Upserted incident', it.id);
      } catch (e) { console.error('Failed incident upsert', it.id, e); }
    }
    writeJSON(incPath, []);
    console.log('Cleared incidents_fallback.json');
  } else {
    console.log('Skipping incidents -> DB (prisma.incident not available)');
  }

  // Chats: only if prisma.chat exists (schema must include it)
  const chats = await readJSON(chatPath);
  console.log('Found', chats.length, 'fallback chats');
  if (prisma && prisma.chat) {
    for (const m of chats) {
      try {
        await prisma.chat.upsert({ where: { id: m.id }, update: m, create: m });
        console.log('Upserted chat', m.id);
      } catch (e) { console.error('Failed chat upsert', m.id, e); }
    }
    writeJSON(chatPath, []);
    console.log('Cleared chats_fallback.json');
  } else {
    console.log('Skipping chats -> DB (prisma.chat not available). You may add a Chat model to prisma/schema.prisma and run migrations.');
  }

  if (prisma) {
    try { await prisma.$disconnect(); } catch(e){}
  }

  console.log('Sync finished');
}

main().catch((e)=>{ console.error(e); process.exit(1); });
