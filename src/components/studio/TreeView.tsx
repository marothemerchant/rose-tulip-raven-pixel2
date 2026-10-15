import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { LANGS } from "@/lib/orbit/languages";
import { useOrbit } from "@/lib/orbit/store";
import { useToast } from "./toast";

export function TreeView() {
  const orbit = useOrbit();
  const toast = useToast();
  const [name, setName] = useState("");
  const commits = orbit.commits.filter((item) => item.treeId === orbit.activeTree);

  return (
    <div className="min-h-0 flex-1 overflow-auto px-3 pt-3 pb-28">
      <section className="card mb-3">
        <h2 className="px-4 pt-3 text-sm font-semibold">Worktrees</h2>
        <div className="flex flex-wrap gap-2 p-3">
          {orbit.trees.map((tree) => (
            <button key={tree.id} type="button" className="pill" data-on={tree.id === orbit.activeTree} onClick={() => orbit.switchTree(tree.id)}>
              {tree.name}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2 px-3 pb-3"
          onSubmit={(event) => {
            event.preventDefault();
            orbit.newTree(name);
            setName("");
            toast("Worktree branched from the current files.");
          }}
        >
          <input className="field" aria-label="New worktree name" placeholder="Branch name" value={name} onChange={(event) => setName(event.target.value)} />
          <button type="submit" className="cta shrink-0">Branch</button>
        </form>
      </section>

      <section className="card mb-3">
        <h2 className="px-4 pt-3 text-sm font-semibold">Files</h2>
        <div className="flex flex-col p-2">
          {LANGS.map((lang) => (
            <button
              key={lang.id}
              type="button"
              className="flex min-h-11 items-center justify-between rounded-md px-2 text-left"
              onClick={() => {
                orbit.setLang(lang.id);
                orbit.setTab("code");
              }}
            >
              <span>{lang.label}</span>
              <span className="text-xs text-muted">.{lang.ext}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card mb-3">
        <h2 className="px-4 pt-3 text-sm font-semibold">History</h2>
        <div className="flex flex-col gap-2 p-3">
          {commits.length === 0 ? <p className="text-sm text-muted">Save a version to start history. Undo still works before you save.</p> : null}
          {commits.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className="card px-3 py-2 text-left"
              onClick={() => {
                orbit.checkpoint();
                orbit.restore(entry.id);
                toast("Restored that version into the editor.");
              }}
            >
              <span className="font-semibold">{entry.message}</span>
              <span className="mt-1 block text-xs text-muted">
                {entry.kind} · {entry.lang} · {formatDistanceToNow(entry.at, { addSuffix: true })}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="px-4 pt-3 text-sm font-semibold">Generations</h2>
        <div className="flex flex-col gap-2 p-3">
          {orbit.generations.length === 0 ? <p className="text-sm text-muted">Every AI reply lands here with its prompt.</p> : null}
          {orbit.generations.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className="card px-3 py-2 text-left"
              onClick={() => {
                orbit.checkpoint();
                orbit.openGeneration(entry.id);
                toast("Opened that generation.");
              }}
            >
              <span className="line-clamp-2 font-semibold">{entry.prompt || "Generation"}</span>
              <span className="mt-1 block text-xs text-muted">{entry.provider} · {entry.model}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
