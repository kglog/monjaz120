import { NextResponse } from "next/server";
import { validateFullName, validateSaudiNID, validateBirthDate } from "@/lib/validators";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

// Simple in-memory rate limit maps. For production replace with Redis.
const attemptsByAccount: Map<string, number[]> = new Map();
const attemptsByIP: Map<string, number[]> = new Map();

const DATA_FILE = path.join(process.cwd(), "data", "verification-requests.json");

function nowTs() {
  return Date.now();
}

function pruneWindow(arr: number[], windowMs: number) {
  const cutoff = Date.now() - windowMs;
  while (arr.length && arr[0] < cutoff) arr.shift();
}

function ensureDataFile() {
  return fs.mkdir(path.join(process.cwd(), "data"), { recursive: true }).then(() => {
    return fs.access(DATA_FILE).catch(() => fs.writeFile(DATA_FILE, "[]"));
  });
}

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function encryptField(plain: string) {
  const keyBase64 = process.env.FIELD_ENCRYPTION_KEY || ""; // expect base64 32 bytes
  if (!keyBase64) return null;
  try {
    const key = Buffer.from(keyBase64, "base64");
    if (key.length !== 32) return null;
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString("base64")}.${enc.toString("base64")}.${tag.toString("base64")}`;
  } catch (err) {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown").split(",")[0].trim();
    const uid = req.headers.get("x-user-id") || "anon"; // adjust to real auth in production

    const body = await req.json().catch(() => ({}));
    const { fullName, nationalId, dob } = body || {};

    // rate-limits: account 5/hour, ip 20/hour
    const accountWindow = 60 * 60 * 1000;
    const ipWindow = 60 * 60 * 1000;

    const aAttempts = attemptsByAccount.get(uid) || [];
    pruneWindow(aAttempts, accountWindow);
    if (aAttempts.length >= 5) {
      return new NextResponse(JSON.stringify({ error: "rate_limited" }), { status: 429, headers: { "Content-Type": "application/json" } });
    }

    const ipAttempts = attemptsByIP.get(ip) || [];
    pruneWindow(ipAttempts, ipWindow);
    if (ipAttempts.length >= 20) {
      return new NextResponse(JSON.stringify({ error: "rate_limited" }), { status: 429, headers: { "Content-Type": "application/json" } });
    }

    // server-side validations
    if (validateFullName(fullName)) {
      aAttempts.push(nowTs()); attemptsByAccount.set(uid, aAttempts);
      ipAttempts.push(nowTs()); attemptsByIP.set(ip, ipAttempts);
      try { /* brain-safe event via core logging if exists */ } catch (e) {}
      return NextResponse.json({ error: "invalid_name" }, { status: 400 });
    }
    if (validateSaudiNID(nationalId)) {
      aAttempts.push(nowTs()); attemptsByAccount.set(uid, aAttempts);
      ipAttempts.push(nowTs()); attemptsByIP.set(ip, ipAttempts);
      return NextResponse.json({ error: "invalid_nid" }, { status: 400 });
    }
    if (validateBirthDate(dob)) {
      aAttempts.push(nowTs()); attemptsByAccount.set(uid, aAttempts);
      ipAttempts.push(nowTs()); attemptsByIP.set(ip, ipAttempts);
      return NextResponse.json({ error: "invalid_dob" }, { status: 400 });
    }

    // passed validations: record the submission
    await ensureDataFile();
    const raw = await fs.readFile(DATA_FILE, "utf8").catch(() => "[]");
    let arr = [];
    try { arr = JSON.parse(raw || "[]"); } catch (e) { arr = []; }

    const last4 = (nationalId || "").slice(-4) || null;
    const pepper = process.env.VERIFICATION_PEPPER || "";
    const last4hash = pepper ? sha256Hex(last4 + pepper) : sha256Hex(last4 || "");

    const encNid = encryptField(nationalId) || null;

    const entry = {
      id: `req_${Date.now()}`,
      uid,
      status: "basic_info_submitted",
      createdAt: new Date().toISOString(),
      fullName: fullName || null,
      encryptedNationalId: encNid, // null if encryption not configured
      last4: last4,
      last4hash: last4hash,
      dob: dob || null
    };

    arr.push(entry);
    await fs.writeFile(DATA_FILE, JSON.stringify(arr, null, 2));

    // update attempt maps (successful submit counts as attempt)
    aAttempts.push(nowTs()); attemptsByAccount.set(uid, aAttempts);
    ipAttempts.push(nowTs()); attemptsByIP.set(ip, ipAttempts);

    return NextResponse.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
