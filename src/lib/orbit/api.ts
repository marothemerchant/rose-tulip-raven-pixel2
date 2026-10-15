import { previewPathPrefix } from "@/lib/preview-path-prefix";

export function withBase(path: string): string {
  if (typeof window === "undefined") return path;
  const prefix = previewPathPrefix(window.location.hostname, window.location.pathname) ?? "";
  return prefix + path;
}

export type ChatMessage = { role: "system" | "user"; content: string };

export async function providerChat(input: {
  base: string;
  key: string;
  model: string;
  messages: ChatMessage[];
  image?: string;
}): Promise<string> {
  const response = await fetch(withBase("/api/ai"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ op: "chat", base: input.base, key: input.key, model: input.model, messages: input.messages, image: input.image }),
  });
  const data = (await response.json()) as { ok?: boolean; content?: string; error?: string };
  if (!response.ok || !data.ok) throw new Error(data.error || "The provider refused this request.");
  return (data.content || "").replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "").trim();
}

export async function providerTest(base: string, key: string): Promise<string> {
  const response = await fetch(withBase("/api/ai"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ op: "models", base, key }),
  });
  const data = (await response.json()) as { ok?: boolean; error?: string; note?: string };
  if (!response.ok || !data.ok) throw new Error(data.error || "Could not test this key.");
  return data.note || "Connected";
}
