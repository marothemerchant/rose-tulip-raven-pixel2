import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ImagePickerAsset } from 'expo-image-picker';

type Lang = 'HTML' | 'CSS' | 'JS';
type Pack = 'Nano' | 'Coder' | 'Studio';
type ProviderId = 'Gemini' | 'Groq' | 'OpenRouter' | 'Mistral';
export type Token = { name: string; value: string };
export type Version = { id: string; message: string; at: number };
export type Worktree = { id: string; name: string; files: Record<Lang, string> };

type OrbitState = {
  lang: Lang;
  activeTree: string;
  trees: Worktree[];
  versions: Version[];
  tokens: Token[];
  screenshot?: ImagePickerAsset;
  keys: Partial<Record<ProviderId, string>>;
  provider: ProviderId;
  packs: Record<Pack, boolean>;
  offline: boolean;
  code: Record<Lang, string>;
};

const STARTERS: Record<Lang, string> = {
  HTML: `<main>\n  <p class="eyebrow">On device</p>\n  <h1>Keep the useful bits.</h1>\n  <article class="card">\n    <b>One clear idea</b>\n    <p>A quiet interface with room to think.</p>\n  </article>\n  <button>Continue</button>\n</main>`,
  CSS: `body { background: #111012; color: #f4f1ec; }\n.card { border: 1px solid #353237; border-radius: 18px; padding: 16px; }`,
  JS: `const title = 'Keep the useful bits.';\nconsole.log(title);`,
};

const initialState: OrbitState = {
  lang: 'HTML', activeTree: 'main', trees: [{ id: 'main', name: 'main', files: { ...STARTERS } }], versions: [],
  tokens: [{ name: 'ink', value: '#111012' }, { name: 'paper', value: '#F4F1EC' }, { name: 'amber', value: '#E8A15A' }],
  keys: {}, provider: 'Gemini', packs: { Nano: false, Coder: false, Studio: false }, offline: true, code: { ...STARTERS },
};

const STORAGE_KEY = 'orbit-studio-mobile-v1';
type OrbitContextValue = OrbitState & {
  hydrated: boolean;
  setLang: (lang: Lang) => void;
  setCode: (code: string) => void;
  resetCode: () => void;
  saveVersion: (message?: string) => void;
  addTree: (name: string) => void;
  setScreenshot: (asset?: ImagePickerAsset) => void;
  addToken: (value: string) => void;
  setKey: (provider: ProviderId, key: string) => void;
  setProvider: (provider: ProviderId) => void;
  setPack: (pack: Pack, enabled: boolean) => void;
  setOffline: (offline: boolean) => void;
  generate: (prompt: string) => void;
};
const Context = createContext<OrbitContextValue | null>(null);
const uid = () => Math.random().toString(36).slice(2, 9);

export function OrbitProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OrbitState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) { try { setState({ ...initialState, ...JSON.parse(raw) }); } catch { /* safe fallback */ } }
      setHydrated(true);
    }).catch(() => setHydrated(true));
  }, []);
  useEffect(() => { if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined); }, [state, hydrated]);
  const value = useMemo<OrbitContextValue>(() => ({
    ...state, hydrated,
    setLang: (lang) => setState((s) => ({ ...s, lang, code: { ...s.code, [lang]: s.trees.find((t) => t.id === s.activeTree)?.files[lang] ?? STARTERS[lang] } })),
    setCode: (code) => setState((s) => ({ ...s, code: { ...s.code, [s.lang]: code }, trees: s.trees.map((t) => t.id === s.activeTree ? { ...t, files: { ...t.files, [s.lang]: code } } : t) })),
    resetCode: () => setState((s) => ({ ...s, code: { ...s.code, [s.lang]: STARTERS[s.lang] } })),
    saveVersion: (message = 'Saved version') => setState((s) => ({ ...s, versions: [{ id: uid(), message, at: Date.now() }, ...s.versions].slice(0, 30) })),
    addTree: (name) => setState((s) => { const id = uid(); return { ...s, activeTree: id, trees: [...s.trees, { id, name: name.trim() || `study-${s.trees.length + 1}`, files: { ...s.code } }] }; }),
    setScreenshot: (screenshot) => setState((s) => ({ ...s, screenshot })),
    addToken: (value) => setState((s) => s.tokens.some((t) => t.value.toLowerCase() === value.toLowerCase()) ? s : { ...s, tokens: [...s.tokens, { name: `sample-${s.tokens.length + 1}`, value }] }),
    setKey: (provider, key) => setState((s) => ({ ...s, keys: { ...s.keys, [provider]: key } })),
    setProvider: (provider) => setState((s) => ({ ...s, provider })),
    setPack: (pack, enabled) => setState((s) => ({ ...s, packs: { ...s.packs, [pack]: enabled } })),
    setOffline: (offline) => setState((s) => ({ ...s, offline })),
    generate: (prompt) => setState((s) => ({ ...s, code: { ...s.code, HTML: `<main>\n  <p class="eyebrow">${prompt.trim() || 'On device'}</p>\n  <h1>Keep the useful bits.</h1>\n  <article class="card"><b>Generated locally</b><p>Review this screen, then save the version you want to keep.</p></article>\n  <button>Continue</button>\n</main>` }, lang: 'HTML' })),
  }), [state, hydrated]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useOrbit() { const value = useContext(Context); if (!value) throw new Error('OrbitProvider is missing'); return value; }
export type { Lang, Pack, ProviderId };
