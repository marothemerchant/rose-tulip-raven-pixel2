type Handler = (cmd: string) => void;
const handlers = new Set<Handler>();

export function onCmd(handler: Handler): () => void {
  handlers.add(handler);
  return () => handlers.delete(handler);
}

export function emitCmd(cmd: string): void {
  handlers.forEach((handler) => handler(cmd));
}
