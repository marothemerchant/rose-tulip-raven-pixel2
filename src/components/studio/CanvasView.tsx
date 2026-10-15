import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { Crop, Frame, Hand, ImagePlus, Minus, MoveRight, Plus, Ruler, Sparkles, Spline, Trash2, Type } from "lucide-react";
import { STUDIES } from "@/lib/orbit/library";
import { useOrbit } from "@/lib/orbit/store";
import { analyzeImage, contrastNote, formatRead, sampleHex, shrinkDataUrl, type ImageRead } from "@/lib/orbit/analyze";
import { canvasToHtml } from "@/lib/orbit/compose";
import { bestPack, runGeneration } from "@/lib/orbit/generate";
import { PROVIDERS } from "@/lib/orbit/providers";
import type { CanvasNode, NodeKind } from "@/lib/orbit/types";
import { onCmd } from "./bus";
import { useToast } from "./toast";

type Tool = "hand" | "sample" | "measure" | "crop";
type Cam = { x: number; y: number; z: number };
type Mark = { x: number; y: number };

const INSERTS: { kind: NodeKind; label: string; w: number; h: number; text: string; sub: string }[] = [
  { kind: "heading", label: "Heading", w: 220, h: 52, text: "Title", sub: "" },
  { kind: "text", label: "Text", w: 200, h: 72, text: "Quiet supporting copy.", sub: "" },
  { kind: "button", label: "Button", w: 148, h: 44, text: "Continue", sub: "" },
  { kind: "pill", label: "Pill", w: 112, h: 36, text: "Label", sub: "" },
  { kind: "card", label: "Card", w: 240, h: 108, text: "Card", sub: "One clear idea." },
  { kind: "field", label: "Field", w: 240, h: 48, text: "Email", sub: "" },
  { kind: "composer", label: "Composer", w: 260, h: 52, text: "Message", sub: "" },
  { kind: "nav", label: "Nav", w: 260, h: 56, text: "Home", sub: "" },
  { kind: "segment", label: "Segment", w: 180, h: 40, text: "Lines", sub: "Dots" },
  { kind: "frame", label: "Phone frame", w: 180, h: 360, text: "Screen", sub: "" },
  { kind: "swatch", label: "Swatch", w: 56, h: 56, text: "#ec9a4a", sub: "" },
  { kind: "note", label: "Note", w: 160, h: 88, text: "Note", sub: "" },
];

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function CanvasView() {
  const orbit = useOrbit();
  const toast = useToast();
  const surface = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [tool, setTool] = useState<Tool>("hand");
  const [cam, setCam] = useState<Cam>({ x: 28, y: 28, z: 1 });
  const [selected, setSelected] = useState<string | null>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [crop, setCrop] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [sheet, setSheet] = useState<"library" | "insert" | "read" | null>(null);
  const [read, setRead] = useState<ImageRead | null>(null);
  const [prompt, setPrompt] = useState("Rebuild this screen as one HTML page.");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [grid, setGrid] = useState<"dots" | "lines" | "off">("dots");

  const node = orbit.nodes.find((item) => item.id === selected) ?? null;

  function toWorld(clientX: number, clientY: number): Mark {
    const rect = surface.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: (clientX - rect.left - cam.x) / cam.z, y: (clientY - rect.top - cam.y) / cam.z };
  }

  function place(partial: Omit<CanvasNode, "id" | "x" | "y"> & { x?: number; y?: number }) {
    const rect = surface.current?.getBoundingClientRect();
    const cx = rect ? (rect.width / 2 - cam.x) / cam.z : 80;
    const cy = rect ? (rect.height / 2 - cam.y) / cam.z : 80;
    orbit.checkpoint();
    const id = uid();
    orbit.addNode({
      id,
      x: partial.x ?? Math.round(cx - partial.w / 2),
      y: partial.y ?? Math.round(cy - partial.h / 2),
      ...partial,
    });
    setSelected(id);
  }

  async function addFile(file: File) {
    const src = await fileToUrl(file);
    const size = await imageSize(src);
    const w = 220;
    const h = Math.round(w * (size.h / Math.max(1, size.w)));
    place({ kind: "image", w, h: Math.min(h, 460), text: file.name, sub: `${size.w}×${size.h}`, color: "", src });
    toast("Tap the image with Sample to pick a colour.");
  }

  useEffect(() => {
    return onCmd((cmd) => {
      if (cmd === "import") fileRef.current?.click();
      if (cmd === "library") setSheet("library");
      if (cmd === "insert") setSheet("insert");
    });
  }, []);

  function zoomBy(factor: number) {
    setCam((current) => {
      const z = Math.min(2.8, Math.max(0.35, current.z * factor));
      const rect = surface.current?.getBoundingClientRect();
      if (!rect) return { ...current, z };
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const wx = (cx - current.x) / current.z;
      const wy = (cy - current.y) / current.z;
      return { z, x: cx - wx * z, y: cy - wy * z };
    });
  }

  function onBackgroundDown(event: ReactPointerEvent) {
    if ((event.target as HTMLElement).closest("[data-node]")) return;
    if (tool === "measure") {
      const point = toWorld(event.clientX, event.clientY);
      setMarks((current) => (current.length >= 2 ? [point] : [...current, point]));
      return;
    }
    if (tool !== "hand") return;
    const startX = event.clientX;
    const startY = event.clientY;
    const origin = cam;
    const move = (ev: PointerEvent) => setCam({ ...origin, x: origin.x + ev.clientX - startX, y: origin.y + ev.clientY - startY });
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  function onNodeDown(event: ReactPointerEvent, item: CanvasNode) {
    event.stopPropagation();
    setSelected(item.id);
    if (tool === "sample") {
      const img = (event.currentTarget as HTMLElement).querySelector("img");
      if (!img) {
        toast("Sample works on a screenshot.");
        return;
      }
      try {
        const hit = sampleHex(img, event.clientX, event.clientY);
        orbit.addToken(hit.hex);
        toast(`${hit.hex} at ${hit.x}, ${hit.y} · ${contrastNote(hit.hex)}`);
      } catch {
        toast("Could not read that pixel.");
      }
      return;
    }
    if (tool === "measure") {
      setMarks((current) => (current.length >= 2 ? [toWorld(event.clientX, event.clientY)] : [...current, toWorld(event.clientX, event.clientY)]));
      return;
    }
    if (tool === "crop" && (item.kind === "image" || item.kind === "ref")) {
      setCrop({ x: 0.12, y: 0.12, w: 0.76, h: 0.76 });
      return;
    }
    if (tool !== "hand") return;
    orbit.checkpoint();
    const start = toWorld(event.clientX, event.clientY);
    const ox = item.x;
    const oy = item.y;
    const move = (ev: PointerEvent) => {
      const point = toWorld(ev.clientX, ev.clientY);
      orbit.moveNode(item.id, Math.round(ox + point.x - start.x), Math.round(oy + point.y - start.y));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  async function readSelected() {
    if (!node?.src) {
      toast("Select a screenshot first.");
      return;
    }
    setBusy(true);
    try {
      const next = await analyzeImage(node.src);
      setRead(next);
      next.colors.slice(0, 4).forEach((color) => orbit.addToken(color.hex));
      setSheet("read");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Could not read the image.");
    } finally {
      setBusy(false);
    }
  }

  async function generateFromRead() {
    if (!node?.src || !read) return;
    setBusy(true);
    try {
      const provider = PROVIDERS.find((item) => orbit.keys[item.id] && !orbit.offline);
      const image = provider?.id === "gemini" ? await shrinkDataUrl(node.src) : undefined;
      const result = await runGeneration({
        prompt,
        lang: "html",
        offline: orbit.offline,
        pack: bestPack(orbit.packs),
        provider,
        key: provider ? orbit.keys[provider.id] : undefined,
        model: provider ? orbit.modelNames[provider.id] || provider.model : undefined,
        image,
        context: formatRead(read),
      });
      orbit.checkpoint();
      orbit.setLang("html");
      orbit.setCode(result.output);
      orbit.commit({
        kind: "generate",
        message: prompt.slice(0, 72),
        prompt,
        output: result.output,
        provider: result.provider,
        model: result.model,
      });
      orbit.setTab("code");
      toast(result.vision ? "Wrote HTML from the screenshot." : "Wrote HTML from the measured description.");
      setSheet(null);
    } catch (error) {
      toast(error instanceof Error ? error.message : "Generation failed.");
    } finally {
      setBusy(false);
    }
  }

  async function applyCrop() {
    if (!node?.src || !crop) return;
    const img = surface.current?.querySelector<HTMLImageElement>(`[data-node="${node.id}"] img`);
    if (!img) return;
    const sx = Math.round(crop.x * img.naturalWidth);
    const sy = Math.round(crop.y * img.naturalHeight);
    const sw = Math.max(1, Math.round(crop.w * img.naturalWidth));
    const sh = Math.max(1, Math.round(crop.h * img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = sw;
    canvas.height = sh;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    orbit.checkpoint();
    orbit.editNode(node.id, {
      src: canvas.toDataURL("image/jpeg", 0.86),
      sub: `${sw}×${sh} cropped`,
      h: Math.round(node.w * (sh / sw)),
    });
    setCrop(null);
    toast(`Cropped to ${sw}×${sh} image pixels.`);
  }

  const measure = describeMeasure(marks, orbit.nodes, surface.current);
  const studies = STUDIES.filter((study) => study.id.includes(query.trim().toLowerCase()));
  const bg =
    grid === "off"
      ? undefined
      : grid === "lines"
        ? "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)"
        : undefined;

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={surface}
        className={grid === "dots" ? "canvas-world absolute inset-0 overflow-hidden" : "absolute inset-0 overflow-hidden bg-bg"}
        style={bg ? { backgroundImage: bg, backgroundSize: `${22 * cam.z}px ${22 * cam.z}px` } : undefined}
        onPointerDown={onBackgroundDown}
      >
        <div style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.z})`, transformOrigin: "0 0", width: 2400, height: 1800, position: "relative" }}>
          {marks.length === 2 ? (
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <line x1={marks[0].x} y1={marks[0].y} x2={marks[1].x} y2={marks[1].y} stroke="#ec9a4a" strokeWidth={2 / cam.z} />
            </svg>
          ) : null}
          {orbit.nodes.map((item) => (
            <div
              key={item.id}
              data-node={item.id}
              data-on={item.id === selected}
              className="node"
              style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
              onPointerDown={(event) => onNodeDown(event, item)}
            >
              <NodeFace node={item} />
              {crop && item.id === selected && (item.kind === "image" || item.kind === "ref") ? (
                <div
                  className="pointer-events-none absolute border-2 border-accent"
                  style={{ left: `${crop.x * 100}%`, top: `${crop.y * 100}%`, width: `${crop.w * 100}%`, height: `${crop.h * 100}%` }}
                />
              ) : null}
            </div>
          ))}
          {measure ? (
            <div className="absolute rounded-full bg-fg px-3 py-1 text-xs font-semibold text-ink" style={{ left: measure.x, top: measure.y }}>
              {measure.label}
            </div>
          ) : null}
        </div>
        {orbit.nodes.length === 0 ? (
          <div className="pointer-events-none absolute inset-x-0 top-[18%] px-8 text-center">
            <p className="text-base font-semibold">Add a screenshot to inspect it.</p>
            <p className="mt-2 text-sm text-muted">Import one, or open a study. Sample, measure, and crop use the real pixels. Layout bands stay labelled as estimates.</p>
            <div className="pointer-events-auto mt-4 flex justify-center gap-2">
              <button type="button" className="cta" onClick={() => fileRef.current?.click()}>Import</button>
              <button type="button" className="pill" onClick={() => setSheet("library")}>Studies</button>
            </div>
          </div>
        ) : null}
      </div>

      {node ? (
        <div className="absolute inset-x-3 top-3 z-10 flex items-center gap-2">
          <input
            className="field min-w-0 flex-1"
            aria-label="Node text"
            value={node.text}
            onChange={(event) => orbit.editNode(node.id, { text: event.target.value })}
          />
          <button type="button" className="icon-btn bg-surface" aria-label="Delete node" onClick={() => { orbit.checkpoint(); orbit.removeNode(node.id); setSelected(null); }}>
            <Trash2 size={18} />
          </button>
        </div>
      ) : null}

      <div className="tool-pill" role="toolbar" aria-label="Canvas tools">
        <ToolButton label="Pan and move" on={tool === "hand"} onClick={() => setTool("hand")}><Hand size={18} /></ToolButton>
        <ToolButton label="Add image" on={false} onClick={() => fileRef.current?.click()}><ImagePlus size={18} /></ToolButton>
        <ToolButton label="Sample colour" on={tool === "sample"} onClick={() => setTool("sample")}><Spline size={18} /></ToolButton>
        <ToolButton label="Measure" on={tool === "measure"} onClick={() => { setTool("measure"); setMarks([]); }}><Ruler size={18} /></ToolButton>
        <ToolButton label="Crop" on={tool === "crop"} onClick={() => { setTool("crop"); if (node?.src) setCrop({ x: 0.12, y: 0.12, w: 0.76, h: 0.76 }); }}><Crop size={18} /></ToolButton>
        <ToolButton label="Read layout" on={false} onClick={() => void readSelected()}><Frame size={18} /></ToolButton>
        <ToolButton label="Zoom out" on={false} onClick={() => zoomBy(0.9)}><Minus size={18} /></ToolButton>
        <ToolButton label="Zoom in" on={false} onClick={() => zoomBy(1.1)}><Plus size={18} /></ToolButton>
      </div>

      {crop && node ? (
        <div className="absolute right-3 bottom-28 z-10 flex gap-2">
          <button type="button" className="pill" onClick={() => setCrop(null)}>Cancel crop</button>
          <button type="button" className="cta" onClick={() => void applyCrop()}>Apply crop</button>
        </div>
      ) : null}

      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(event) => { const file = event.target.files?.[0]; if (file) void addFile(file); event.target.value = ""; }} />

      {sheet ? (
        <>
          <button type="button" className="scrim" aria-label="Close sheet" onClick={() => setSheet(null)} />
          <div className="sheet" data-open="true" role="dialog" aria-modal="true" aria-label={sheet === "library" ? "Studies" : sheet === "insert" ? "Insert" : "Screenshot read"}>
            <div className="mx-auto mt-2 mb-3 h-1.5 w-10 rounded-full bg-line" />
            <div className="min-h-0 flex-1 overflow-auto px-4 pb-4">
              {sheet === "library" ? (
                <>
                  <h2 className="mb-2 text-lg font-semibold">Studies</h2>
                  <input className="field mb-3" placeholder="Filter" aria-label="Filter studies" value={query} onChange={(event) => setQuery(event.target.value)} />
                  <div className="grid grid-cols-3 gap-2">
                    {studies.map((study) => (
                      <button
                        key={study.id}
                        type="button"
                        className="overflow-hidden rounded-md border border-line"
                        onClick={() => {
                          const w = 200;
                          place({ kind: "ref", w, h: Math.round(w / study.ratio), text: study.id, sub: "Library study", color: "", src: study.src, refId: study.id });
                          setSheet(null);
                        }}
                      >
                        <img src={study.src} alt={study.id} className="aspect-[3/4] w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
              {sheet === "insert" ? (
                <>
                  <h2 className="mb-3 text-lg font-semibold">Insert</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {INSERTS.map((item) => (
                      <button key={item.kind} type="button" className="pill justify-center" onClick={() => { place({ kind: item.kind, w: item.w, h: item.h, text: item.text, sub: item.sub, color: item.kind === "swatch" ? item.text : "" }); setSheet(null); }}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
              {sheet === "read" && read ? (
                <>
                  <h2 className="text-lg font-semibold">Screenshot read</h2>
                  <p className="mt-1 text-sm text-muted">{read.width}×{read.height} px measured. {read.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {read.colors.map((color) => (
                      <button key={color.hex} type="button" className="pill" onClick={() => { orbit.addToken(color.hex); toast(`${color.hex} · ${contrastNote(color.hex)}`); }}>
                        <span className="size-4 rounded-full border border-line" style={{ background: color.hex }} />
                        {color.hex} · {color.share}
                      </button>
                    ))}
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {read.bands.map((band) => (
                      <li key={`${band.name}-${band.y}`} className="card px-3 py-2 text-sm">
                        <b>{band.name}</b>
                        <span className="tag ml-2">estimate</span>
                        <p className="mt-1 text-muted">y {band.y}px · height {band.height}px · {band.share}</p>
                      </li>
                    ))}
                  </ul>
                  <label className="mt-3 block text-sm text-muted" htmlFor="shot-ask">Ask</label>
                  <textarea id="shot-ask" className="field mt-1" rows={3} value={prompt} onChange={(event) => setPrompt(event.target.value)} />
                  <button type="button" className="cta mt-3 w-full" disabled={busy} onClick={() => void generateFromRead()}>
                    <Sparkles size={16} /> {busy ? "Writing…" : "Generate HTML"}
                  </button>
                  <button
                    type="button"
                    className="pill mt-2 w-full justify-center"
                    onClick={() => {
                      orbit.checkpoint();
                      orbit.setLang("html");
                      orbit.setCode(canvasToHtml(orbit.nodes));
                      orbit.setTab("code");
                      setSheet(null);
                      toast("Canvas composed into HTML.");
                    }}
                  >
                    Compose placed nodes instead
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
      {busy && !sheet ? <p className="absolute bottom-28 left-4 text-sm text-muted">Reading pixels…</p> : null}
    </div>
  );
}

function ToolButton({ label, on, onClick, children }: { label: string; on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className="icon-btn" aria-label={label} aria-pressed={on} data-on={on} onClick={onClick}>
      {children}
    </button>
  );
}

function NodeFace({ node }: { node: CanvasNode }) {
  if ((node.kind === "image" || node.kind === "ref") && node.src) {
    return <img src={node.src} alt={node.text || "Screenshot"} crossOrigin="anonymous" draggable={false} className="h-full w-full rounded-md object-cover" />;
  }
  if (node.kind === "heading") return <div className="flex h-full items-end text-2xl font-semibold tracking-tight">{node.text}</div>;
  if (node.kind === "button") return <div className="cta flex h-full items-center justify-center">{node.text}</div>;
  if (node.kind === "pill" || node.kind === "segment") return <div className="pill h-full w-full justify-center">{node.text}</div>;
  if (node.kind === "card") return <div className="card h-full p-3"><b>{node.text}</b><p className="mt-1 text-sm text-muted">{node.sub}</p></div>;
  if (node.kind === "field" || node.kind === "composer") return <div className={`field flex h-full items-center text-muted ${node.kind === "composer" ? "rounded-full" : ""}`}>{node.text}</div>;
  if (node.kind === "nav") return <div className="flex h-full items-center justify-around rounded-lg border border-line bg-surface text-xs text-muted">{node.text}</div>;
  if (node.kind === "swatch") return <div className="h-full w-full rounded-md border border-line" style={{ background: node.color || node.text }} />;
  if (node.kind === "frame") return <div className="h-full w-full rounded-[28px] border-8 border-bezel bg-ink" />;
  if (node.kind === "note") return <div className="h-full rounded-md border border-dashed border-line p-2 text-sm text-accent">{node.text}</div>;
  return <div className="h-full text-sm">{node.text}</div>;
}

function describeMeasure(marks: Mark[], nodes: CanvasNode[], surface: HTMLDivElement | null): { x: number; y: number; label: string } | null {
  if (marks.length !== 2) return null;
  const dx = marks[1].x - marks[0].x;
  const dy = marks[1].y - marks[0].y;
  const canvasPx = Math.round(Math.hypot(dx, dy));
  let label = `${canvasPx} canvas px`;
  const hit = nodes.find((node) => node.src && marks.every((mark) => mark.x >= node.x && mark.x <= node.x + node.w && mark.y >= node.y && mark.y <= node.y + node.h));
  const img = hit && surface ? surface.querySelector<HTMLImageElement>(`[data-node="${hit.id}"] img`) : null;
  if (hit && img && img.naturalWidth) {
    const imagePx = Math.round(canvasPx * (img.naturalWidth / hit.w));
    label = `${imagePx} image px`;
    if (img.naturalHeight / img.naturalWidth > 1.7 && img.naturalWidth >= 300) {
      const css = Math.round(imagePx / (img.naturalWidth / 390));
      label = `${imagePx} image px · ~${css} CSS px (estimate on a 390-wide phone)`;
    }
  }
  return { x: (marks[0].x + marks[1].x) / 2, y: (marks[0].y + marks[1].y) / 2 - 28, label };
}

function fileToUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function imageSize(src: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 220, h: 400 });
    img.src = src;
  });
}
