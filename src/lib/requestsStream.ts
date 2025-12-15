// Simple in-memory SSE broadcaster for development/testing.
// Keeps a list of Node ServerResponse objects and broadcasts JSON data.
const clients: Array<any> = [];

export function addClient(res: any) {
  clients.push(res);
}

export function removeClient(res: any) {
  const idx = clients.indexOf(res);
  if (idx !== -1) clients.splice(idx, 1);
}

export function broadcast(item: any) {
  const data = `data: ${JSON.stringify(item)}\n\n`;
  clients.forEach((res) => {
    try {
      res.write(data);
    } catch (e) {
      // ignore
    }
  });
}

export function clientCount() {
  return clients.length;
}
