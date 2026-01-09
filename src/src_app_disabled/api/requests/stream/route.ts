import { NextResponse } from 'next/server';
import { addClient, removeClient } from '@/lib/requestsStream';

export async function GET(req: Request) {
  const res = (req as any).res;
  // Next.js App Router doesn't expose raw res in edge functions reliably.
  // This endpoint is best-effort for local dev with Node server (not edge).
  if (!res || !res.write) {
    return NextResponse.json({ ok: false, message: 'SSE not supported in this runtime' }, { status: 501 });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write('\n');
  addClient(res);
  try {
    // Node-style request/response close
    if ((req as any).on) (req as any).on('close', () => removeClient(res));
    // also try res if it exposes on
    if ((res as any).on) (res as any).on('close', () => removeClient(res));
  } catch (e) {}
  return new Promise(() => {});
}
