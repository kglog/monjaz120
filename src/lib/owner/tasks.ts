import fs from "fs";
import path from "path";

export type ManualTaskStatus = "open" | "approved" | "rejected" | "done";

export type ManualTask = {
  id: string;
  type: "identity_verification" | "bank_transfer" | "dispute" | "security" | "other";
  title: string;
  payload: any;
  status: ManualTaskStatus;
  createdAt: string;
  updatedAt: string;
};

const FILE = path.join(process.cwd(), "data", "owner-tasks.json");

function ensure() {
  if (!fs.existsSync(FILE)) {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export function listTasks(): ManualTask[] {
  ensure();
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

export function addTask(t: Omit<ManualTask, "createdAt" | "updatedAt">) {
  ensure();
  const all = listTasks();
  const now = new Date().toISOString();
  const task: ManualTask = { ...t, createdAt: now, updatedAt: now } as ManualTask;
  all.unshift(task);
  fs.writeFileSync(FILE, JSON.stringify(all, null, 2), "utf8");
  return task;
}

export function updateTask(id: string, patch: Partial<ManualTask>) {
  ensure();
  const all = listTasks();
  const idx = all.findIndex((x) => x.id === id);
  if (idx === -1) throw new Error("TASK_NOT_FOUND");
  all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
  fs.writeFileSync(FILE, JSON.stringify(all, null, 2), "utf8");
  return all[idx];
}

// ASSISTANT_FINAL: true
