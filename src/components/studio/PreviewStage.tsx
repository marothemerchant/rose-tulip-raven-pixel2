import { useEffect, useRef, useState } from "react";
import { useOrbit } from "@/lib/orbit/store";
import { deviceById, type DeviceSpec } from "./devices";

export function PreviewStage({ srcdoc, detail }: { srcdoc: string; detail: string }) {
  const viewport = useOrbit().viewport;
  const spec = deviceById(viewport);
  const host = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 320, h: 520 });

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const apply = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    apply();
    const watcher = new ResizeObserver(apply);
    watcher.observe(el);
    return () => watcher.disconnect();
  }, []);

  const outerW = spec.kind === "desktop" ? spec.screenW : spec.screenW + spec.bezel * 2;
  const outerH = spec.kind === "desktop" ? spec.screenH + 36 : spec.screenH + spec.bezel * 2;
  const scale = spec.kind === "full" ? 1 : Math.max(0.12, Math.min((box.w - 20) / outerW, (box.h - 12) / outerH));

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={host} className="grid min-h-0 flex-1 place-items-center overflow-hidden px-3 py-2">
        {spec.kind === "full" ? (
          <iframe title="Full screen preview" sandbox="allow-scripts" srcDoc={srcdoc} className="h-full w-full border-0 bg-white" />
        ) : (
          <div style={{ width: outerW * scale, height: outerH * scale }}>
            <div style={{ width: outerW, height: outerH, transform: `scale(${scale})`, transformOrigin: "top left" }}>
              {spec.kind === "desktop" ? <DesktopFrame spec={spec} srcdoc={srcdoc} /> : <Handset spec={spec} srcdoc={srcdoc} />}
            </div>
          </div>
        )}
      </div>
      <p className="truncate px-4 pb-1 text-center text-xs text-muted">{detail}</p>
    </div>
  );
}

function Handset({ spec, srcdoc }: { spec: DeviceSpec; srcdoc: string }) {
  return (
    <div
      className="bg-bezel shadow-2xl"
      style={{
        width: spec.screenW + spec.bezel * 2,
        height: spec.screenH + spec.bezel * 2,
        borderRadius: spec.radius + 10,
        padding: spec.bezel,
      }}
    >
      <div className="relative h-full overflow-hidden bg-ink" style={{ borderRadius: spec.radius }}>
        <iframe title={`${spec.label} preview`} sandbox="allow-scripts" srcDoc={srcdoc} className="absolute inset-0 h-full w-full border-0 bg-white" />
        {spec.island ? <div className="pointer-events-none absolute top-2 left-1/2 h-7 w-28 -translate-x-1/2 rounded-full bg-ink" /> : null}
        {spec.kind === "phone" ? <div className="pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-fg/70" /> : null}
      </div>
    </div>
  );
}

function DesktopFrame({ spec, srcdoc }: { spec: DeviceSpec; srcdoc: string }) {
  return (
    <div className="overflow-hidden bg-bezel shadow-2xl" style={{ width: spec.screenW, height: spec.screenH + 36, borderRadius: 12 }}>
      <div className="flex h-9 items-center gap-1.5 px-3 text-bezel-ink">
        <span className="size-2.5 rounded-full bg-danger" />
        <span className="size-2.5 rounded-full bg-accent" />
        <span className="size-2.5 rounded-full bg-ok" />
        <span className="ml-2 text-xs">Preview</span>
      </div>
      <iframe title="Desktop preview" sandbox="allow-scripts" srcDoc={srcdoc} className="border-0 bg-white" style={{ width: spec.screenW, height: spec.screenH }} />
    </div>
  );
}
