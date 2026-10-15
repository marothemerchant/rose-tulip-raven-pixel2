import { useState } from "react";
import { PROVIDERS, type Provider } from "@/lib/orbit/providers";
import { providerTest } from "@/lib/orbit/api";
import { useOrbit } from "@/lib/orbit/store";
import { useToast } from "./toast";

export function KeysView() {
  const orbit = useOrbit();
  const toast = useToast();
  const [open, setOpen] = useState<Provider | null>(null);

  return (
    <div className="min-h-0 flex-1 overflow-auto px-3 pt-3 pb-28">
      <p className="mb-3 text-sm text-muted">Bring your own key. It stays in this browser and is sent only to the provider you pick, through Orbit.</p>
      {orbit.offline ? <p className="card mb-3 px-3 py-2 text-sm">Offline mode is on. Generation uses an on-device pack.</p> : null}
      <div className="flex flex-col gap-2">
        {PROVIDERS.map((provider) => {
          const saved = Boolean(orbit.keys[provider.id]);
          return (
            <details key={provider.id} className="card disclosure">
              <summary>
                <span className="flex-1">{provider.name}</span>
                <span className={saved ? "tag tag-ok" : "tag"}>{saved ? "Saved" : "No key"}</span>
                <Chevron />
              </summary>
              <div className="flex flex-col gap-2 px-3 pb-3">
                <label className="text-sm text-muted" htmlFor={`model-${provider.id}`}>Model</label>
                <input
                  id={`model-${provider.id}`}
                  className="field"
                  value={orbit.modelNames[provider.id] ?? provider.model}
                  onChange={(event) => orbit.setModelName(provider.id, event.target.value)}
                />
                <div className="flex gap-2">
                  <button type="button" className="cta" onClick={() => setOpen(provider)}>{saved ? "Update key" : "Get key"}</button>
                  {saved ? (
                    <button type="button" className="pill" onClick={() => { orbit.setKey(provider.id, ""); toast(`${provider.name} key removed.`); }}>
                      Remove
                    </button>
                  ) : null}
                </div>
              </div>
            </details>
          );
        })}
      </div>
      {open ? <KeySheet provider={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}

function KeySheet({ provider, onClose }: { provider: Provider; onClose: () => void }) {
  const orbit = useOrbit();
  const toast = useToast();
  const [value, setValue] = useState("");
  const [note, setNote] = useState("Stored on this device only.");
  const [busy, setBusy] = useState(false);

  async function save() {
    const key = value.trim();
    if (!key) {
      setNote("Paste a key first.");
      return;
    }
    setBusy(true);
    setNote("Testing…");
    try {
      const result = await providerTest(provider.base, key);
      orbit.setKey(provider.id, key);
      toast(`${provider.name} saved.`);
      setNote(result);
      onClose();
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Could not test this key.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className="scrim" aria-label="Close" onClick={onClose} />
      <div className="sheet" data-open="true" role="dialog" aria-modal="true" aria-labelledby="key-title">
        <div className="mx-auto mt-2 mb-3 h-1.5 w-10 rounded-full bg-line" />
        <div className="overflow-auto px-4 pb-4">
          <h2 id="key-title" className="text-lg font-semibold">Get a {provider.name} key</h2>
          <ol className="mt-3 flex flex-col gap-3">
            {provider.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-raised text-xs">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <a className="pill mt-3 justify-center" href={provider.url} target="_blank" rel="noopener noreferrer">Open {provider.host}</a>
          <input className="field mt-3" type="password" autoComplete="off" aria-label="API key" placeholder="Paste key" value={value} onChange={(event) => setValue(event.target.value)} />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="pill"
              onClick={() => {
                void navigator.clipboard.readText().then((text) => setValue(text.trim())).catch(() => setNote("Clipboard blocked. Paste into the field."));
              }}
            >
              Paste
            </button>
            <button type="button" className="cta flex-1" disabled={busy} onClick={() => void save()}>Test and save</button>
          </div>
          <p className="mt-2 text-sm text-muted">{note}</p>
        </div>
      </div>
    </>
  );
}

function Chevron() {
  return (
    <svg className="chev size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
