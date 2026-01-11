export async function fingerprint(req: any) {
  try {
    // simple fp example
    return {
      ip: req.headers.get('x-forwarded-for') || 'unknown',
      ua: req.headers.get('user-agent') || '',
      hash: 'fp-' + Date.now()
    };
  } catch {
    return null;
  }
}