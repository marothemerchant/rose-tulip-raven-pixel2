import { useEffect, useMemo, useRef, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { LANGS, STARTERS, langMeta } from "@/lib/orbit/languages";
import { buildPreview } from "@/lib/orbit/preview";
import { bestPack, runGeneration } from "@/lib/orbit/generate";
import { PROVIDERS } from "@/lib/orbit/providers";
import { useOrbit } from "@/lib/orbit/store";
import type { LangId } from "@/lib/orbit/types";
import { DEVICES } from "./devices";
import { PreviewStage } from "./PreviewStage";
import { onCmd } from "./bus";
import { useToast } from "./toast";

const LIVE = new Set<LangId>(["html", "css", "svg", "md", "json", "sql"]);

export function CodeView() {
  const orbit = useOrbit();
  const toast = useToast();
  const [wide, setWide] = useState(false);
  const [ask, setAsk] = useState("");
  const [busy, setBusy] = useState(false);
  const [compare, setCompare] = useState(false);
  const [providerId, setProviderId] = useState("");
  const dirty = useRef(false);
  const code = orbit.code();
  const meta = langMeta(orbit.lang);
  const connected = PROVIDERS.filter((item) => orbit.keys[item.id]);
  const reference = [...orbit.nodes].reverse().find((node) => node.src && (node.kind === "image" || node.kind === "ref"));

  useEffect(() => {
    const query = window.matchMedia("(min-width: 960px)");
    const apply = () => setWide(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    return onCmd((cmd) => {
      if (cmd === "new-file") {
        orbit.checkpoint();
        orbit.setCode(STARTERS[orbit.lang]);
        toast("Starter restored.");
      }
      if (cmd === "run") toast(meta.hint);
      if (cmd === "ask") document.getElementById("orbit-ask")?.focus();
    });
  }, [orbit, meta.hint, toast]);

  const preview = useMemo(() => buildPreview(orbit.lang, code), [orbit.lang, code]);

  async function generate() {
    const prompt = ask.trim();
    if (!prompt) {
      toast("Describe what to build.");
      return;
    }
    const chosen = connected.find((item) => item.id === providerId) ?? connected[0];
    setBusy(true);
    try {
      const result = await runGeneration({
        prompt,
        lang: orbit.lang,
        offline: orbit.offline,
        pack: bestPack(orbit.packs),
        provider: orbit.offline ? undefined : chosen,
        key: chosen ? orbit.keys[chosen.id] : undefined,
        model: chosen ? orbit.modelNames[chosen.id] || chosen.model : undefined,
      });
      orbit.checkpoint();
      dirty.current = false;
      orbit.setCode(result.output);
      orbit.commit({
        kind: "generate",
        message: prompt.slice(0, 72),
        prompt,
        output: result.output,
        provider: result.provider,
        model: result.model,
      });
      toast(result.provider === "orbit" ? `Wrote with the ${result.model} pack.` : "Provider replied. Review it, then keep or undo.");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex gap-2 overflow-x-auto px-3 py-2" role="tablist" aria-label="Languages">
        {LANGS.map((lang) => (
          <button key={lang.id} type="button" className="pill" data-on={orbit.lang === lang.id} onClick={() => orbit.setLang(lang.id)}>
            {lang.label}
            {lang.group === "runner" ? <span className="tag tag-run">runner</span> : null}
          </button>
        ))}
      </div>
      <Group orientation={wide ? "horizontal" : "vertical"} className="min-h-0 flex-1">
        <Panel minSize="28%" defaultSize="50%" className="min-h-0">
          <div className="flex h-full min-h-0 flex-col gap-2 p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Editor</span>
              <span className="tag">{meta.hint}</span>
            </div>
            <textarea
              className="field min-h-0 flex-1 resize-none font-mono text-sm"
              spellCheck={false}
              aria-label="Source code"
              value={code}
              onChange={(event) => {
                if (!dirty.current) {
                  orbit.checkpoint();
                  dirty.current = true;
                }
                orbit.setCode(event.target.value);
              }}
              onBlur={() => {
                dirty.current = false;
              }}
            />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="cta" onClick={() => orbit.commit({ kind: "save", message: `Saved ${meta.label}` })}>
                Save version
              </button>
              <button type="button" className="pill" onClick={() => { orbit.checkpoint(); orbit.setCode(STARTERS[orbit.lang]); toast("Starter restored."); }}>
                Reset file
              </button>
            </div>
            <label className="text-sm text-muted" htmlFor="orbit-ask">Ask</label>
            <textarea id="orbit-ask" className="field" rows={2} placeholder={`Describe a ${meta.label} screen…`} value={ask} onChange={(event) => setAsk(event.target.value)} />
            <div className="flex gap-2">
              <select
                className="field"
                aria-label="Provider"
                value={orbit.offline ? "device" : providerId || connected[0]?.id || "device"}
                onChange={(event) => setProviderId(event.target.value)}
              >
                <option value="device">On-device pack</option>
                {connected.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              <button type="button" className="cta shrink-0" disabled={busy} onClick={() => void generate()}>
                {busy ? "Writing…" : "Generate"}
              </button>
            </div>
          </div>
        </Panel>
        <Separator className={wide ? "w-2 bg-line" : "h-2 bg-line"} />
        <Panel minSize="28%" className="min-h-0">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex gap-2 overflow-x-auto px-3 pt-2" aria-label="Viewport">
              {DEVICES.map((device) => (
                <button key={device.id} type="button" className="pill" data-on={orbit.viewport === device.id} onClick={() => orbit.setViewport(device.id)}>
                  {device.label}
                </button>
              ))}
              <button type="button" className="pill" data-on={compare} disabled={!reference} onClick={() => setCompare((value) => !value)}>
                Compare
              </button>
            </div>
            <div className="flex min-h-0 flex-1">
              {compare && reference?.src ? (
                <img src={reference.src} alt="Reference screenshot" className="w-1/2 object-contain bg-ink" />
              ) : null}
              <PreviewStage srcdoc={preview.srcdoc} detail={preview.ok ? preview.detail : preview.detail} />
            </div>
          </div>
        </Panel>
      </Group>
    </div>
  );
}
