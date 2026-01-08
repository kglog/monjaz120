import crypto from "crypto";

export const OWNER_COOKIE = "owner_session";

function b64url(buf: Buffer) {
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function hmac(secret: string, data: string) {
  return b64url(crypto.createHmac("sha256", secret).update(data).digest());
}

function safeEq(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function ownerEnv() {
  // Return env values but do not throw — caller should handle missing values.
  const u = process.env.OWNER_USERNAME || "";
  const p = process.env.OWNER_PASSWORD || "";
  const s = process.env.OWNER_SECRET || "";
  return { u, p, s };
}

export function ownerIssueToken(username: string) {
  const { s } = ownerEnv();
  const payload = JSON.stringify({ u: username, iat: Date.now() });
  const payloadB64 = b64url(Buffer.from(payload));
  const sig = hmac(s, payloadB64);
  return `${payloadB64}.${sig}`;
}

export function ownerVerifyToken(token: string) {
  const { s } = ownerEnv();
  if (!s) return null; // no secret configured -> cannot verify
  const [payloadB64, sig] = (token || "").split(".");
  if (!payloadB64 || !sig) return null;

  const expected = hmac(s, payloadB64);
  if (!safeEq(sig, expected)) return null;

  try {
    const json = JSON.parse(Buffer.from(payloadB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")) as {
      u: string;
      iat: number;
    };

    // صلاحية 14 يوم
    const maxAge = 14 * 24 * 60 * 60 * 1000;
    if (!json?.u || !json?.iat) return null;
    if (Date.now() - json.iat > maxAge) return null;

    return json;
  } catch {
    return null;
  }
}

export function ownerCheckLogin(inputUser: string, inputPass: string) {
  const { u, p } = ownerEnv();
  if (!u || !p) return false; // env not configured
  return inputUser === u && inputPass === p;
}

// ASSISTANT_FINAL: true
