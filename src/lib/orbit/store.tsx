import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { idbGet, idbSet } from "./db";
import { emptyFiles } from "./languages";
import type { CanvasNode, Commit, Generation, LangId, OrbitState, PackId, TabId, ViewportId, Worktree } from "./types";

const KEY = "project";

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

type Snap = { treeId: string; lang: LangId; code: string; nodes: CanvasNode[] };

function take(s: OrbitState): Snap {
  const tree = s.trees.find((item) => item.id === s.activeTree) ?? s.trees[0];
  return {
    treeId: tree.id,
    lang: s.lang,
    code: tree.files[s.lang] ?? "",
    nodes: s.nodes.map((node) => ({ ...node })),
  };
}

function sameSnap(a: Snap, b: Snap): boolean {
  if (a.treeId !== b.treeId || a.lang !== b.lang || a.code !== b.code || a.nodes.length !== b.nodes.length) return false;
  return a.nodes.every((node, index) => {
    const other = b.nodes[index];
    return node.id === other.id && node.x === other.x && node.y === other.y && node.w === other.w && node.h === other.h && node.text === other.text && node.src === other.src && node.color === other.color;
  });
}

function applySnap(s: OrbitState, snap: Snap): OrbitState {
  const known = s.trees.some((item) => item.id === snap.treeId);
  return {
    ...s,
    lang: snap.lang,
    nodes: snap.nodes,
    activeTree: known ? snap.treeId : s.activeTree,
    trees: s.trees.map((item) => (item.id === snap.treeId ? { ...item, files: { ...item.files, [snap.lang]: snap.code } } : item)),
  };
}

function starterTrees(): Worktree[] {
  return [{ id: "main", name: "main", files: emptyFiles() }];
}

export function initialState(): OrbitState {
  return {
    tab: "canvas",
    lang: "html",
    viewport: "iphone",
    immersive: false,
    offline: false,
    activeTree: "main",
    trees: starterTrees(),
    commits: [],
    generations: [],
    nodes: [],
    tokens: [
      { name: "ink", value: "#111012" },
      { name: "surface", value: "#1a191b" },
      { name: "raised", value: "#242326" },
      { name: "paper", value: "#f4f4f5" },
      { name: "amber", value: "#ec9a4a" },
    ],
    keys: {},
    modelNames: {},
    packs: { nano: false, coder: false, studio: false },
  };
}

type Persist = Omit<OrbitState, "tab" | "immersive">;

function persistable(state: OrbitState): Persist {
  const { tab: _tab, immersive: _immersive, ...rest } = state;
  return rest;
}

type Store = OrbitState & {
  hydrated: boolean;
  canUndo: boolean;
  canRedo: boolean;
  files: () => Record<LangId, string>;
  code: () => string;
  setTab: (tab: TabId) => void;
  setLang: (lang: LangId) => void;
  setViewport: (viewport: ViewportId) => void;
  setImmersive: (on: boolean) => void;
  setOffline: (on: boolean) => void;
  setCode: (code: string) => void;
  setKey: (id: string, key: string) => void;
  setModelName: (id: string, model: string) => void;
  setPack: (id: PackId, done: boolean) => void;
  addToken: (value: string) => void;
  renameToken: (value: string, name: string) => void;
  addNode: (node: CanvasNode) => void;
  moveNode: (id: string, x: number, y: number) => void;
  editNode: (id: string, patch: Partial<CanvasNode>) => void;
  removeNode: (id: string) => void;
  commit: (input: { kind: Commit["kind"]; message: string; prompt?: string; output?: string; provider?: string; model?: string }) => void;
  restore: (id: string) => void;
  openGeneration: (id: string) => void;
  newTree: (name: string) => void;
  switchTree: (id: string) => void;
  checkpoint: () => void;
  undo: () => void;
  redo: () => void;
};

const Ctx = createContext<Store | null>(null);

export function OrbitProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OrbitState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [rev, setRev] = useState(0);
  const timer = useRef<number>(0);
  const past = useRef<Snap[]>([]);
  const future = useRef<Snap[]>([]);

  useEffect(() => {
    let cancel = false;
    idbGet<Persist>(KEY)
      .then((saved) => {
        if (cancel || !saved?.trees?.length) return;
        setState((current) => ({ ...current, ...saved, tab: "canvas", immersive: false }));
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancel) setHydrated(true);
      });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      void idbSet(KEY, persistable(state));
    }, 280);
  }, [state, hydrated]);

  const api = useMemo<Store>(() => {
    const tree = () => state.trees.find((item) => item.id === state.activeTree) ?? state.trees[0];

    return {
      ...state,
      hydrated,
      canUndo: past.current.length > 0,
      canRedo: future.current.length > 0,
      files: () => tree().files,
      code: () => tree().files[state.lang] ?? "",
      setTab: (tab) => setState((s) => ({ ...s, tab })),
      setLang: (lang) => setState((s) => ({ ...s, lang })),
      setViewport: (viewport) => setState((s) => ({ ...s, viewport })),
      setImmersive: (immersive) => setState((s) => ({ ...s, immersive })),
      setOffline: (offline) => setState((s) => ({ ...s, offline })),
      setCode: (code) =>
        setState((s) => ({
          ...s,
          trees: s.trees.map((item) =>
            item.id === s.activeTree ? { ...item, files: { ...item.files, [s.lang]: code } } : item,
          ),
        })),
      setKey: (id, key) => setState((s) => ({ ...s, keys: { ...s.keys, [id]: key } })),
      setModelName: (id, model) => setState((s) => ({ ...s, modelNames: { ...s.modelNames, [id]: model } })),
      setPack: (id, done) => setState((s) => ({ ...s, packs: { ...s.packs, [id]: done } })),
      addToken: (value) =>
        setState((s) =>
          s.tokens.some((token) => token.value.toLowerCase() === value.toLowerCase())
            ? s
            : { ...s, tokens: [...s.tokens, { name: `sample-${s.tokens.length + 1}`, value }] },
        ),
      renameToken: (value, name) =>
        setState((s) => ({
          ...s,
          tokens: s.tokens.map((token) => (token.value.toLowerCase() === value.toLowerCase() ? { ...token, name: name.trim() || token.name } : token)),
        })),
      addNode: (node) => setState((s) => ({ ...s, nodes: [...s.nodes, node] })),
      moveNode: (id, x, y) => setState((s) => ({ ...s, nodes: s.nodes.map((node) => (node.id === id ? { ...node, x, y } : node)) })),
      editNode: (id, patch) => setState((s) => ({ ...s, nodes: s.nodes.map((node) => (node.id === id ? { ...node, ...patch } : node)) })),
      removeNode: (id) => setState((s) => ({ ...s, nodes: s.nodes.filter((node) => node.id !== id) })),
      commit: (input) =>
        setState((s) => {
          const current = s.trees.find((item) => item.id === s.activeTree) ?? s.trees[0];
          const entry: Commit = {
            id: uid(),
            at: Date.now(),
            treeId: current.id,
            kind: input.kind,
            message: input.message,
            lang: s.lang,
            files: { ...current.files },
            prompt: input.prompt,
            output: input.output,
            provider: input.provider,
            model: input.model,
          };
          const generations: Generation[] = input.output
            ? [
                {
                  id: uid(),
                  at: entry.at,
                  treeId: current.id,
                  lang: s.lang,
                  provider: input.provider || "orbit",
                  model: input.model || "local",
                  prompt: input.prompt || "",
                  output: input.output,
                },
                ...s.generations,
              ].slice(0, 80)
            : s.generations;
          return { ...s, commits: [entry, ...s.commits].slice(0, 120), generations };
        }),
      restore: (id) =>
        setState((s) => {
          const entry = s.commits.find((item) => item.id === id);
          if (!entry) return s;
          return {
            ...s,
            lang: entry.lang,
            tab: "code",
            trees: s.trees.map((item) =>
              item.id === entry.treeId ? { ...item, files: { ...item.files, ...entry.files } } : item,
            ),
            activeTree: s.trees.some((item) => item.id === entry.treeId) ? entry.treeId : s.activeTree,
          };
        }),
      openGeneration: (id) =>
        setState((s) => {
          const entry = s.generations.find((item) => item.id === id);
          if (!entry) return s;
          return {
            ...s,
            lang: entry.lang,
            tab: "code",
            activeTree: s.trees.some((item) => item.id === entry.treeId) ? entry.treeId : s.activeTree,
            trees: s.trees.map((item) =>
              item.id === (s.trees.some((treeItem) => treeItem.id === entry.treeId) ? entry.treeId : s.activeTree)
                ? { ...item, files: { ...item.files, [entry.lang]: entry.output } }
                : item,
            ),
          };
        }),
      newTree: (name) =>
        setState((s) => {
          const current = s.trees.find((item) => item.id === s.activeTree) ?? s.trees[0];
          const id = uid();
          const next: Worktree = {
            id,
            name: name.trim() || `tree-${s.trees.length + 1}`,
            files: { ...current.files },
          };
          return { ...s, trees: [...s.trees, next], activeTree: id };
        }),
      switchTree: (id) => setState((s) => ({ ...s, activeTree: id })),
      checkpoint: () => {
        const snap = take(state);
        const last = past.current[past.current.length - 1];
        if (last && sameSnap(last, snap)) return;
        past.current = [...past.current, snap].slice(-24);
        future.current = [];
        setRev((n) => n + 1);
      },
      undo: () => {
        const snap = past.current.pop();
        if (!snap) return;
        setState((s) => {
          future.current.push(take(s));
          return applySnap(s, snap);
        });
        setRev((n) => n + 1);
      },
      redo: () => {
        const snap = future.current.pop();
        if (!snap) return;
        setState((s) => {
          past.current.push(take(s));
          return applySnap(s, snap);
        });
        setRev((n) => n + 1);
      },
    };
  }, [state, hydrated, rev]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useOrbit(): Store {
  const value = useContext(Ctx);
  if (!value) throw new Error("Orbit store missing");
  return value;
}
