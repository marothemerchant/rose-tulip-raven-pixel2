import { createFileRoute } from "@tanstack/react-router";
import { PROVIDER_BASES } from "@/lib/orbit/providers";

const MAX_KEY = 500;
const MAX_TEXT = 12_000;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function headersFor(base: string, key: string): Record<string, string> {
  const headers: Record<string, string> = {
    authorization: `Bearer ${key}`,
    "content-type": "application/json",
  };
  if (base.includes("openrouter.ai")) {
    headers["http-referer"] = "https://orbit.studio";
    headers["x-title"] = "Orbit Studio";
  }
  return headers;
}

async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const value = (await request.json()) as unknown;
    if (!value || typeof value !== "object") return null;
    return value as Record<string, unknown>;
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await readBody(request);
        if (!body) return json({ ok: false, error: "Invalid request." }, 400);
        const base = typeof body.base === "string" ? body.base : "";
        const key = typeof body.key === "string" ? body.key.trim() : "";
        if (!PROVIDER_BASES.has(base)) return json({ ok: false, error: "Unknown provider." }, 400);
        if (!key || key.length > MAX_KEY) return json({ ok: false, error: "Paste a key first." }, 400);
        const op = body.op === "models" ? "models" : body.op === "chat" ? "chat" : "";
        if (!op) return json({ ok: false, error: "Unknown action." }, 400);
        try {
          if (op === "models") {
            const response = await fetch(`${base}/models`, {
              headers: headersFor(base, key),
              signal: AbortSignal.timeout(20000),
            });
            if (response.status === 401 || response.status === 403) {
              return json({ ok: false, error: "That key was rejected." }, 401);
            }
            const note = response.ok ? "Connected" : `Saved. Model list returned ${response.status}.`;
            return json({ ok: true, note });
          }
          const model = typeof body.model === "string" ? body.model.slice(0, 160) : "";
          const messages = Array.isArray(body.messages) ? body.messages : [];
          const safe = messages.slice(0, 6).map((message) => {
            const row = message as { role?: unknown; content?: unknown };
            const role = row.role === "system" ? "system" : "user";
            const content = typeof row.content === "string" ? row.content.slice(0, MAX_TEXT) : "";
            return { role, content };
          });
          if (!model || safe.length === 0) return json({ ok: false, error: "Missing model or prompt." }, 400);
          const image = typeof body.image === "string" ? body.image : "";
          const vision =
            image.startsWith("data:image/") && image.length < 900_000 && base.includes("generativelanguage.googleapis.com");
          const payloadMessages = safe.map((message, index) => {
            if (!vision || index !== safe.length - 1 || message.role !== "user") return message;
            return {
              role: "user" as const,
              content: [
                { type: "text", text: message.content },
                { type: "image_url", image_url: { url: image } },
              ],
            };
          });
          const response = await fetch(`${base}/chat/completions`, {
            method: "POST",
            headers: headersFor(base, key),
            body: JSON.stringify({ model, messages: payloadMessages }),
            signal: AbortSignal.timeout(30000),
          });
          const payload = (await response.json().catch(() => null)) as {
            error?: { message?: string };
            choices?: { message?: { content?: string } }[];
          } | null;
          if (!response.ok) {
            const message = payload?.error?.message || `Request failed (${response.status}).`;
            return json({ ok: false, error: message }, 502);
          }
          const content = payload?.choices?.[0]?.message?.content ?? "";
          return json({ ok: true, content });
        } catch {
          return json({ ok: false, error: "Could not reach the provider." }, 502);
        }
      },
    },
  },
});
