import { useState } from "react";
import type { PackId } from "@/lib/orbit/types";
import { useOrbit } from "@/lib/orbit/store";
import { useToast } from "./toast";

const PACKS: { id: PackId; name: string; copy: string }[] = [
  { id: "nano", name: "Nano", copy: "One block. Short screens and quick edits." },
  { id: "coder", name: "Coder", copy: "Two blocks. Components and short scripts." },
  { id: "studio", name: "Studio", copy: "The full on-device writer. Deepest of the three." },
];

export function ModelsView() {
  const orbit = useOrbit();
  const toast = useToast();
  const [pending, setPending] = useState<PackId | null>(null);

  function enable(id: PackId) {
    setPending(id);
    window.setTimeout(() => {
      orbit.setPack(id, true);
      setPending(null);
      toast(`${PACKS.find((pack) => pack.id === id)?.name} is ready on this device.`);
    }, 500);
  }

  return (
    <div className="min-h-0 flex-1 overflow-auto px-3 pt-3 pb-28">
      <section className="card mb-3 p-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <b>Offline mode</b>
            <p className="mt-1 text-sm text-muted">When on, only an enabled pack answers. No prompt leaves this browser.</p>
          </div>
          <button
            type="button"
            className="pill"
            data-on={orbit.offline}
            aria-pressed={orbit.offline}
            onClick={() => orbit.setOffline(!orbit.offline)}
          >
            {orbit.offline ? "On" : "Off"}
          </button>
        </div>
      </section>
      <p className="mb-3 text-sm text-muted">These packs are built into Orbit. They are not downloaded foundation models, and they do not invent pixel-perfect clones. They write from your prompt plus any measurements you pass in.</p>
      <div className="flex flex-col gap-2">
        {PACKS.map((pack) => {
          const on = orbit.packs[pack.id];
          return (
            <article key={pack.id} className="card p-3">
              <div className="flex items-center gap-2">
                <b className="flex-1">{pack.name}</b>
                <span className={on ? "tag tag-ok" : "tag"}>{on ? "On device" : "Built in"}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{pack.copy}</p>
              <div className="mt-3">
                {on ? (
                  <button type="button" className="pill" onClick={() => { orbit.setPack(pack.id, false); toast(`${pack.name} removed from this project.`); }}>
                    Remove
                  </button>
                ) : (
                  <button type="button" className="cta" disabled={pending === pack.id} onClick={() => enable(pack.id)}>
                    {pending === pack.id ? "Preparing…" : "Enable"}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
