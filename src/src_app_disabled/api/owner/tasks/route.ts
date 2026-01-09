import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OWNER_COOKIE, ownerVerifyToken } from "@/lib/owner/auth";
import { listTasks, updateTask } from "@/lib/owner/tasks";

function requireOwner() {
  const token = cookies().get(OWNER_COOKIE)?.value || "";
  return ownerVerifyToken(token);
}

export async function GET() {
  if (!requireOwner()) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  return NextResponse.json({ ok: true, tasks: listTasks() });
}

export async function PATCH(req: Request) {
  if (!requireOwner()) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const id = String(body?.id || "");
  const status = body?.status;

  const updated = updateTask(id, {
    ...(typeof status === "string" ? { status } : {}),
  });

  return NextResponse.json({ ok: true, updated });
}

// ASSISTANT_FINAL: true
