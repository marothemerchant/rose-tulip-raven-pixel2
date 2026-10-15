import { localComplete } from "./local-ai";
import { providerChat } from "./api";
import type { LangId, PackId } from "./types";
import type { Provider } from "./providers";
import { langMeta } from "./languages";

export function bestPack(packs: Record<PackId, boolean>): PackId | null {
  if (packs.studio) return "studio";
  if (packs.coder) return "coder";
  if (packs.nano) return "nano";
  return null;
}

export async function runGeneration(input: {
  prompt: string;
  lang: LangId;
  offline: boolean;
  pack: PackId | null;
  provider?: Provider;
  key?: string;
  model?: string;
  image?: string;
  context?: string;
}): Promise<{ output: string; provider: string; model: string; vision: boolean }> {
  const ask = [input.context, input.prompt].filter(Boolean).join("\n\n");
  const useLocal = input.offline || !input.provider || !input.key;
  if (useLocal) {
    if (!input.pack) throw new Error("Enable an on-device pack, or connect a provider in Keys.");
    return { output: localComplete(ask, input.lang, input.pack), provider: "orbit", model: input.pack, vision: false };
  }
  const provider = input.provider;
  if (!provider || !input.key) throw new Error("Connect a provider in Keys.");
  const vision = provider.id === "gemini" && Boolean(input.image);
  const output = await providerChat({
    base: provider.base,
    key: input.key,
    model: input.model || provider.model,
    image: vision ? input.image : undefined,
    messages: [
      {
        role: "system",
        content: `Return only ${langMeta(input.lang).label} source for a phone screen. No markdown fences. No commentary. Use the measured colours when they are given. Treat layout bands marked estimate as hints, not facts.`,
      },
      { role: "user", content: ask },
    ],
  });
  return { output, provider: provider.id, model: input.model || provider.model, vision };
}
