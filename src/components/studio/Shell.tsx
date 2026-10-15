import { useEffect, useState } from "react";
import { Code2, Cpu, Frame, GitBranch, KeyRound, Menu, Plus, Redo2, Undo2 } from "lucide-react";
import { bestPack } from "@/lib/orbit/generate";
import { PROVIDERS } from "@/lib/orbit/providers";
import { useOrbit } from "@/lib/orbit/store";
import type { TabId } from "@/lib/orbit/types";
import { CanvasView } from "./CanvasView";
import { CodeView } from "./CodeView";
import { KeysView } from "./KeysView";
import { ModelsView } from "./ModelsView";
import { TreeView } from "./TreeView";
import { emitCmd } from "./bus";
import { ToastProvider, useToast } from "./toast";

const TABS: { id: TabId; label: string; icon: typeof Frame }[] = [
  { id: "canvas", label: "Canvas", icon: Frame },
  { id: "code", label: "Code", icon: Code2 },
  { id: "tree", label: "Tree", icon: GitBranch },
  { id: "keys", label: "Keys", icon: KeyRound },
  { id: "models", label: "Models", icon: Cpu },
];

export function Shell() {
  return (
    <ToastProvider>
      <Studio />
    </ToastProvider>
  );
}

function Studio() {
  const orbit = useOrbit();
  const toast = useToast();
  const [menu, setMenu] = useState(false);
  const [dial, setDial] = useState(false);
  const title = TABS.find((tab) => tab.id === orbit.tab)?.label ?? "Orbit";
  const connected = PROVIDERS.filter((item) => orbit.keys[item.id]).length;
  const pack = bestPack(orbit.packs);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        setDial(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function command(cmd: string) {
    setDial(false);
    if (cmd === "import" || cmd === "library" || cmd === "insert") orbit.setTab("canvas");
    if (cmd === "new-file" || cmd === "run" || cmd === "ask") orbit.setTab("code");
    window.setTimeout(() => emitCmd(cmd), 0);
  }

  function downloadExport() {
    const files = Object.entries(orbit.files())
      .map(([lang, source]) => `== ${lang} ==\n${source}`)
      .join("\n\n");
    const tokens = orbit.tokens.map((token) => `${token.name}: ${token.value}`).join("\n");
    const css = `:root {\n${orbit.tokens.map((token) => `  --${token.name}: ${token.value};`).join("\n")}\n}`;
    const text = `ORBIT STUDIO EXPORT\n\n${files}\n\n== tokens ==\n${tokens}\n\n== css ==\n${css}\n`;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    link.download = "orbit-export.txt";
    link.click();
    URL.revokeObjectURL(link.href);
    toast("Project exported.");
  }

  return (
    <div className="studio" data-immersive={orbit.immersive}>
      <header className="studio-head flex items-center gap-1 border-b border-line px-2">
        <button type="button" className="icon-btn" aria-label="Open menu" onClick={() => { setDial(false); setMenu(true); }}>
          <Menu size={20} />
        </button>
        <h1 className="flex-1 text-center text-base font-semibold tracking-tight">{title}</h1>
        <button type="button" className="icon-btn" aria-label="Undo" disabled={!orbit.canUndo} onClick={() => orbit.undo()}>
          <Undo2 size={18} />
        </button>
        <button type="button" className="icon-btn" aria-label="Redo" disabled={!orbit.canRedo} onClick={() => orbit.redo()}>
          <Redo2 size={18} />
        </button>
        <button type="button" className="header-fab" aria-label="Quick actions" data-on={dial} onClick={() => setDial((open) => !open)}>
          <Plus size={20} />
        </button>
      </header>
      <div className="studio-body">
        {orbit.tab === "canvas" ? <CanvasView /> : null}
        {orbit.tab === "code" ? <CodeView /> : null}
        {orbit.tab === "tree" ? <TreeView /> : null}
        {orbit.tab === "keys" ? <KeysView /> : null}
        {orbit.tab === "models" ? <ModelsView /> : null}
        {orbit.immersive ? (
          <button type="button" className="pill absolute top-3 right-3 z-10" onClick={() => orbit.setImmersive(false)}>
            Exit focus
          </button>
        ) : null}
      </div>
      <div className="dock">
        <nav aria-label="Sections">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} type="button" data-on={orbit.tab === tab.id} aria-current={orbit.tab === tab.id ? "page" : undefined} onClick={() => orbit.setTab(tab.id)}>
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <button type="button" className="fab" aria-label="Quick actions" aria-expanded={dial} data-on={dial} onClick={() => setDial((open) => !open)}>
          <Plus size={22} />
        </button>
      </div>
      {dial ? (
        <div className="dial">
          <button type="button" className="pill" onClick={() => command("import")}>Import screenshot</button>
          <button type="button" className="pill" onClick={() => command("library")}>Open study</button>
          <button type="button" className="pill" onClick={() => command("insert")}>Insert element</button>
          <button type="button" className="pill" onClick={() => command("new-file")}>New file</button>
          <button type="button" className="pill" onClick={() => command("ask")}>Ask AI</button>
        </div>
      ) : null}
      {menu ? (
        <>
          <button type="button" className="scrim" aria-label="Close menu" onClick={() => setMenu(false)} />
          <aside className="drawer" data-open="true" aria-label="Menu">
            <h2 className="text-xl font-semibold tracking-tight">Orbit Studio</h2>
            <p className="mt-1 mb-4 text-sm text-muted">Design, preview, and keep every generation on this device.</p>
            <section className="card mb-3">
              <h3 className="px-3 pt-3 text-sm font-semibold">Tokens</h3>
              <div className="flex flex-wrap gap-2 p-3">
                {orbit.tokens.map((token) => (
                  <button
                    key={token.value}
                    type="button"
                    className="size-11 rounded-md border border-line"
                    style={{ background: token.value }}
                    aria-label={`${token.name} ${token.value}`}
                    onClick={() => {
                      void navigator.clipboard.writeText(token.value).catch(() => undefined);
                      toast(`${token.value} copied`);
                    }}
                  />
                ))}
              </div>
              <p className="px-3 pb-3 text-xs text-muted">Tap a colour to copy its hex.</p>
            </section>
            <section className="card mb-3 p-3">
              <h3 className="text-sm font-semibold">Readiness</h3>
              <ul className="mt-2 flex flex-col gap-2 text-sm">
                <li><b>Storage.</b> <span className="text-muted">{orbit.hydrated ? "Saved in this browser." : "Opening storage…"}</span></li>
                <li><b>Inspection.</b> <span className="text-muted">Import, zoom, crop, measure, and sample are on the canvas.</span></li>
                <li><b>Writer.</b> <span className="text-muted">{pack ? `${pack} pack enabled.` : "Enable a pack under Models."}</span></li>
                <li><b>Provider.</b> <span className="text-muted">{connected ? `${connected} key saved on device.` : "Optional. Add one under Keys."}</span></li>
              </ul>
            </section>
            <button type="button" className="pill mb-2 w-full justify-center" onClick={() => { orbit.setImmersive(true); setMenu(false); }}>Focus canvas</button>
            <button type="button" className="cta w-full" onClick={downloadExport}>Export project</button>
          </aside>
        </>
      ) : null}
    </div>
  );
}
