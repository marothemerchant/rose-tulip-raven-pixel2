import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Frame, a as Spline, b as CodeXml, c as Redo2, d as Minus, f as Menu, g as GitBranch, h as Hand, i as Trash2, l as Plus, m as ImagePlus, n as Type, o as Sparkles, p as KeyRound, s as Ruler, t as Undo2, u as MoveRight, v as Crop, y as Cpu } from "../_libs/lucide-react.mjs";
import { n as PROVIDERS, r as previewPathPrefix } from "./router-DgUXLqUc.mjs";
import { n as xo, r as yo, t as mo } from "../_libs/react-resizable-panels.mjs";
import { t as transform } from "../_libs/sucrase+ts-interface-checker.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BZ42AKk2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DB = "orbit-studio";
var STORE = "kv";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB, 1);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error ?? /* @__PURE__ */ new Error("Could not open storage"));
	});
}
async function idbGet(key) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function idbSet(key, value) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readwrite");
		tx.objectStore(STORE).put(value, key);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}
var LANGS = [
	{
		id: "html",
		label: "HTML",
		group: "device",
		ext: "html",
		hint: "Renders in the device"
	},
	{
		id: "css",
		label: "CSS",
		group: "device",
		ext: "css",
		hint: "Styles the sample screen"
	},
	{
		id: "js",
		label: "JavaScript",
		group: "device",
		ext: "js",
		hint: "Runs in the device"
	},
	{
		id: "jsx",
		label: "JSX",
		group: "device",
		ext: "jsx",
		hint: "Compiled, then rendered"
	},
	{
		id: "ts",
		label: "TypeScript",
		group: "device",
		ext: "ts",
		hint: "Types stripped, then run"
	},
	{
		id: "tsx",
		label: "TSX",
		group: "device",
		ext: "tsx",
		hint: "Compiled, then rendered"
	},
	{
		id: "svg",
		label: "SVG",
		group: "device",
		ext: "svg",
		hint: "Drawn in the device"
	},
	{
		id: "md",
		label: "Markdown",
		group: "device",
		ext: "md",
		hint: "Rendered as a page"
	},
	{
		id: "json",
		label: "JSON",
		group: "device",
		ext: "json",
		hint: "Parsed and pretty printed"
	},
	{
		id: "sql",
		label: "SQL",
		group: "device",
		ext: "sql",
		hint: "Queried on a local database"
	},
	{
		id: "python",
		label: "Python",
		group: "runner",
		ext: "py",
		hint: "On-device runner"
	},
	{
		id: "swift",
		label: "Swift",
		group: "runner",
		ext: "swift",
		hint: "UI strings and prints"
	},
	{
		id: "kotlin",
		label: "Kotlin",
		group: "runner",
		ext: "kt",
		hint: "UI strings and prints"
	},
	{
		id: "go",
		label: "Go",
		group: "runner",
		ext: "go",
		hint: "Build log and stdout"
	},
	{
		id: "rust",
		label: "Rust",
		group: "runner",
		ext: "rs",
		hint: "Build log and stdout"
	},
	{
		id: "cpp",
		label: "C++",
		group: "runner",
		ext: "cpp",
		hint: "Build log and stdout"
	},
	{
		id: "java",
		label: "Java",
		group: "runner",
		ext: "java",
		hint: "Build log and stdout"
	},
	{
		id: "ruby",
		label: "Ruby",
		group: "runner",
		ext: "rb",
		hint: "On-device runner"
	},
	{
		id: "php",
		label: "PHP",
		group: "runner",
		ext: "php",
		hint: "On-device runner"
	},
	{
		id: "bash",
		label: "Shell",
		group: "runner",
		ext: "sh",
		hint: "Echo and variables"
	}
];
function langMeta(id) {
	return LANGS.find((l) => l.id === id) ?? LANGS[0];
}
var shell = (title, kicker, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #111012; color: #f4f4f5; font: 16px/1.45 Inter, system-ui, sans-serif; }
  main { padding: 28px 22px 40px; }
  .k { color: #ec9a4a; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; font-weight: 650; }
  h1 { font-size: 34px; line-height: 1.05; letter-spacing: -.03em; margin: 8px 0 18px; }
  .card { border: 1px solid #2d2c2f; background: #1a191b; border-radius: 22px; padding: 16px; margin-bottom: 12px; }
  .card b { display: block; font-size: 16px; margin-bottom: 4px; }
  .card p { margin: 0; color: #8e8d93; font-size: 14px; }
  .cta { margin-top: 8px; display: inline-flex; background: #f4f4f5; color: #111012; border-radius: 999px; padding: 10px 16px; font-weight: 650; font-size: 14px; }
</style></head>
<body><main>
  <div class="k">${kicker}</div>
  <h1>${title}</h1>
  ${body}
</main></body></html>`;
var STARTERS = {
	html: shell("Design in orbit.", "Studio", `<article class="card"><b>Canvas</b><p>Drop studies, sample a colour, keep the chrome quiet.</p></article>
<article class="card"><b>Preview</b><p>Every language renders inside the device frame.</p></article>
<span class="cta">Open a file</span>`),
	css: `body { background: #111012; color: #f4f4f5; font-family: Inter, system-ui, sans-serif; }
.kicker { color: #ec9a4a; letter-spacing: .14em; text-transform: uppercase; font-size: 12px; font-weight: 700; }
h1 { font-size: 34px; letter-spacing: -.03em; margin: 8px 0 16px; }
.card { background: #1a191b; border: 1px solid #2d2c2f; border-radius: 22px; padding: 16px; margin-bottom: 12px; }
.card p { color: #8e8d93; margin: 6px 0 0; }
.cta { display: inline-block; margin-top: 8px; background: #f4f4f5; color: #111012; border-radius: 999px; padding: 10px 16px; font-weight: 700; }`,
	js: `const tiers = ["Nano", "Coder", "Studio"];
const root = document.getElementById("app");
root.innerHTML = '<p class="k">JavaScript</p><h1>Three packs.</h1>' +
  tiers.map((t) => '<article class="card"><b>' + t + '</b><p>On device, inside Orbit.</p></article>').join("");
console.log("packs", tiers.length);`,
	jsx: `function App() {
  const items = ["Canvas", "Preview", "Worktree"];
  return (
    <main style={{fontFamily:"Inter, system-ui", background:"#111012", color:"#f4f4f5", minHeight:"100vh", padding:24}}>
      <p style={{color:"#ec9a4a", letterSpacing:".14em", textTransform:"uppercase", fontSize:12}}>JSX</p>
      <h1 style={{fontSize:34, letterSpacing:"-.03em"}}>Components, live.</h1>
      {items.map((item) => (
        <article key={item} style={{border:"1px solid #2d2c2f", borderRadius:22, padding:16, marginBottom:12}}>
          <b>{item}</b>
        </article>
      ))}
    </main>
  );
}`,
	ts: `const speeds: number[] = [1, 2, 3];
const doubled = speeds.map((n) => n * 2);
const root = document.getElementById("app");
if (root) {
  root.innerHTML = '<p class="k">TypeScript</p><h1>' + doubled.join(" · ") + '</h1><article class="card"><b>Checked</b><p>Types stripped on device, then run.</p></article>';
}
console.log(doubled);`,
	tsx: `type Card = { title: string; copy: string };
const cards: Card[] = [
  { title: "Keys", copy: "Bring your own provider." },
  { title: "Offline", copy: "Packs never leave the phone." },
];
function App() {
  return (
    <main style={{fontFamily:"Inter, system-ui", background:"#111012", color:"#f4f4f5", minHeight:"100vh", padding:24}}>
      <p style={{color:"#ec9a4a", fontSize:12, letterSpacing:".14em", textTransform:"uppercase"}}>TSX</p>
      <h1 style={{fontSize:34, marginTop:8}}>Typed UI.</h1>
      {cards.map((card) => (
        <article key={card.title} style={{border:"1px solid #2d2c2f", borderRadius:22, padding:16, marginBottom:12}}>
          <b>{card.title}</b>
          <p style={{color:"#8e8d93"}}>{card.copy}</p>
        </article>
      ))}
    </main>
  );
}`,
	svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="36" fill="#111012"/>
  <circle cx="100" cy="100" r="52" fill="none" stroke="#ec9a4a" stroke-width="10"/>
  <circle cx="142" cy="70" r="12" fill="#ec9a4a"/>
</svg>`,
	md: `# Orbit Studio

A quiet place to **design**, preview, and keep every generation.

- Canvas studies
- Device preview
- Worktree history

\`amber #ec9a4a\``,
	json: `{
  "app": "Orbit Studio",
  "accent": "#ec9a4a",
  "tabs": ["canvas", "code", "tree", "keys", "models"]
}`,
	sql: `select name, city from users;`,
	python: `print("Orbit Studio")
for i in range(1, 4):
    print(i)`,
	swift: `import SwiftUI

struct StudioView: View {
    var body: some View {
        Text("Orbit Studio")
        Text("On device")
        Button("Continue") { }
    }
}

print("built StudioView")`,
	kotlin: `fun main() {
    println("Orbit Studio")
}
// Compose
Text("Orbit Studio")
Button("Continue")`,
	go: `package main

import "fmt"

func main() {
    fmt.Println("Orbit Studio")
}`,
	rust: `fn main() {
    println!("Orbit Studio");
}`,
	cpp: `#include <iostream>
int main() {
    std::cout << "Orbit Studio" << std::endl;
    return 0;
}`,
	java: `class Main {
    public static void main(String[] args) {
        System.out.println("Orbit Studio");
    }
}`,
	ruby: `puts "Orbit Studio"`,
	php: `<?php
echo "Orbit Studio";`,
	bash: `echo "Orbit Studio"`
};
function emptyFiles() {
	return { ...STARTERS };
}
var KEY = "project";
function uid$1() {
	return Math.random().toString(36).slice(2, 10);
}
function take(s) {
	const tree = s.trees.find((item) => item.id === s.activeTree) ?? s.trees[0];
	return {
		treeId: tree.id,
		lang: s.lang,
		code: tree.files[s.lang] ?? "",
		nodes: s.nodes.map((node) => ({ ...node }))
	};
}
function sameSnap(a, b) {
	if (a.treeId !== b.treeId || a.lang !== b.lang || a.code !== b.code || a.nodes.length !== b.nodes.length) return false;
	return a.nodes.every((node, index) => {
		const other = b.nodes[index];
		return node.id === other.id && node.x === other.x && node.y === other.y && node.w === other.w && node.h === other.h && node.text === other.text && node.src === other.src && node.color === other.color;
	});
}
function applySnap(s, snap) {
	const known = s.trees.some((item) => item.id === snap.treeId);
	return {
		...s,
		lang: snap.lang,
		nodes: snap.nodes,
		activeTree: known ? snap.treeId : s.activeTree,
		trees: s.trees.map((item) => item.id === snap.treeId ? {
			...item,
			files: {
				...item.files,
				[snap.lang]: snap.code
			}
		} : item)
	};
}
function starterTrees() {
	return [{
		id: "main",
		name: "main",
		files: emptyFiles()
	}];
}
function initialState() {
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
			{
				name: "ink",
				value: "#111012"
			},
			{
				name: "surface",
				value: "#1a191b"
			},
			{
				name: "raised",
				value: "#242326"
			},
			{
				name: "paper",
				value: "#f4f4f5"
			},
			{
				name: "amber",
				value: "#ec9a4a"
			}
		],
		keys: {},
		modelNames: {},
		packs: {
			nano: false,
			coder: false,
			studio: false
		}
	};
}
function persistable(state) {
	const { tab: _tab, immersive: _immersive, ...rest } = state;
	return rest;
}
var Ctx$1 = (0, import_react.createContext)(null);
function OrbitProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(initialState);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [rev, setRev] = (0, import_react.useState)(0);
	const timer = (0, import_react.useRef)(0);
	const past = (0, import_react.useRef)([]);
	const future = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		idbGet(KEY).then((saved) => {
			if (cancel || !saved?.trees?.length) return;
			setState((current) => ({
				...current,
				...saved,
				tab: "canvas",
				immersive: false
			}));
		}).catch(() => void 0).finally(() => {
			if (!cancel) setHydrated(true);
		});
		return () => {
			cancel = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => {
			idbSet(KEY, persistable(state));
		}, 280);
	}, [state, hydrated]);
	const api = (0, import_react.useMemo)(() => {
		const tree = () => state.trees.find((item) => item.id === state.activeTree) ?? state.trees[0];
		return {
			...state,
			hydrated,
			canUndo: past.current.length > 0,
			canRedo: future.current.length > 0,
			files: () => tree().files,
			code: () => tree().files[state.lang] ?? "",
			setTab: (tab) => setState((s) => ({
				...s,
				tab
			})),
			setLang: (lang) => setState((s) => ({
				...s,
				lang
			})),
			setViewport: (viewport) => setState((s) => ({
				...s,
				viewport
			})),
			setImmersive: (immersive) => setState((s) => ({
				...s,
				immersive
			})),
			setOffline: (offline) => setState((s) => ({
				...s,
				offline
			})),
			setCode: (code) => setState((s) => ({
				...s,
				trees: s.trees.map((item) => item.id === s.activeTree ? {
					...item,
					files: {
						...item.files,
						[s.lang]: code
					}
				} : item)
			})),
			setKey: (id, key) => setState((s) => ({
				...s,
				keys: {
					...s.keys,
					[id]: key
				}
			})),
			setModelName: (id, model) => setState((s) => ({
				...s,
				modelNames: {
					...s.modelNames,
					[id]: model
				}
			})),
			setPack: (id, done) => setState((s) => ({
				...s,
				packs: {
					...s.packs,
					[id]: done
				}
			})),
			addToken: (value) => setState((s) => s.tokens.some((token) => token.value.toLowerCase() === value.toLowerCase()) ? s : {
				...s,
				tokens: [...s.tokens, {
					name: `sample-${s.tokens.length + 1}`,
					value
				}]
			}),
			renameToken: (value, name) => setState((s) => ({
				...s,
				tokens: s.tokens.map((token) => token.value.toLowerCase() === value.toLowerCase() ? {
					...token,
					name: name.trim() || token.name
				} : token)
			})),
			addNode: (node) => setState((s) => ({
				...s,
				nodes: [...s.nodes, node]
			})),
			moveNode: (id, x, y) => setState((s) => ({
				...s,
				nodes: s.nodes.map((node) => node.id === id ? {
					...node,
					x,
					y
				} : node)
			})),
			editNode: (id, patch) => setState((s) => ({
				...s,
				nodes: s.nodes.map((node) => node.id === id ? {
					...node,
					...patch
				} : node)
			})),
			removeNode: (id) => setState((s) => ({
				...s,
				nodes: s.nodes.filter((node) => node.id !== id)
			})),
			commit: (input) => setState((s) => {
				const current = s.trees.find((item) => item.id === s.activeTree) ?? s.trees[0];
				const entry = {
					id: uid$1(),
					at: Date.now(),
					treeId: current.id,
					kind: input.kind,
					message: input.message,
					lang: s.lang,
					files: { ...current.files },
					prompt: input.prompt,
					output: input.output,
					provider: input.provider,
					model: input.model
				};
				const generations = input.output ? [{
					id: uid$1(),
					at: entry.at,
					treeId: current.id,
					lang: s.lang,
					provider: input.provider || "orbit",
					model: input.model || "local",
					prompt: input.prompt || "",
					output: input.output
				}, ...s.generations].slice(0, 80) : s.generations;
				return {
					...s,
					commits: [entry, ...s.commits].slice(0, 120),
					generations
				};
			}),
			restore: (id) => setState((s) => {
				const entry = s.commits.find((item) => item.id === id);
				if (!entry) return s;
				return {
					...s,
					lang: entry.lang,
					tab: "code",
					trees: s.trees.map((item) => item.id === entry.treeId ? {
						...item,
						files: {
							...item.files,
							...entry.files
						}
					} : item),
					activeTree: s.trees.some((item) => item.id === entry.treeId) ? entry.treeId : s.activeTree
				};
			}),
			openGeneration: (id) => setState((s) => {
				const entry = s.generations.find((item) => item.id === id);
				if (!entry) return s;
				return {
					...s,
					lang: entry.lang,
					tab: "code",
					activeTree: s.trees.some((item) => item.id === entry.treeId) ? entry.treeId : s.activeTree,
					trees: s.trees.map((item) => item.id === (s.trees.some((treeItem) => treeItem.id === entry.treeId) ? entry.treeId : s.activeTree) ? {
						...item,
						files: {
							...item.files,
							[entry.lang]: entry.output
						}
					} : item)
				};
			}),
			newTree: (name) => setState((s) => {
				const current = s.trees.find((item) => item.id === s.activeTree) ?? s.trees[0];
				const id = uid$1();
				const next = {
					id,
					name: name.trim() || `tree-${s.trees.length + 1}`,
					files: { ...current.files }
				};
				return {
					...s,
					trees: [...s.trees, next],
					activeTree: id
				};
			}),
			switchTree: (id) => setState((s) => ({
				...s,
				activeTree: id
			})),
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
			}
		};
	}, [
		state,
		hydrated,
		rev
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx$1.Provider, {
		value: api,
		children
	});
}
function useOrbit() {
	const value = (0, import_react.useContext)(Ctx$1);
	if (!value) throw new Error("Orbit store missing");
	return value;
}
function localComplete(prompt, lang, pack) {
	const intent = detect(prompt);
	const title = titleFrom(prompt, intent);
	const blocks = blocksFor(intent, title);
	const shown = pack === "nano" ? blocks.slice(0, 1) : pack === "coder" ? blocks.slice(0, 2) : blocks;
	if (lang === "html") return htmlPage(title, intent, shown);
	if (lang === "css") return cssFor(intent);
	if (lang === "svg") return svgFor();
	if (lang === "md") return mdFor(title, shown);
	if (lang === "json") return jsonFor(title, shown);
	if (lang === "sql") return sqlFor(intent);
	if (lang === "js" || lang === "ts") return jsFor(lang, title, shown);
	if (lang === "jsx" || lang === "tsx") return jsxFor(title, shown);
	if (intent === "fizz" && (lang === "python" || lang === "ruby" || lang === "php" || lang === "bash" || lang === "go" || lang === "rust" || lang === "java" || lang === "cpp" || lang === "kotlin" || lang === "swift")) return fizz(lang);
	return program(lang, title, shown);
}
function detect(prompt) {
	const p = prompt.toLowerCase();
	if (/fizz/.test(p)) return "fizz";
	if (/pric|tier|plan/.test(p)) return "pricing";
	if (/log\s?in|sign\s?in|auth/.test(p)) return "login";
	if (/todo|task/.test(p)) return "todo";
	if (/dash|metric|analytic/.test(p)) return "dash";
	if (/chat|message|inbox/.test(p)) return "chat";
	if (/profile|account/.test(p)) return "profile";
	if (/calc/.test(p)) return "calc";
	if (/setting/.test(p)) return "settings";
	if (/form|signup|register|waitlist/.test(p)) return "form";
	if (/^\s*h(i|ello)\b/.test(p) || /hello world/.test(p)) return "hello";
	return "landing";
}
function titleFrom(prompt, intent) {
	const clean = prompt.replace(/\s+/g, " ").trim();
	if (clean.length > 0 && clean.length <= 42 && !/[.!?]/.test(clean)) return clean.charAt(0).toUpperCase() + clean.slice(1);
	return {
		pricing: "Simple pricing",
		login: "Welcome back",
		todo: "Today",
		dash: "This week",
		chat: "Studio chat",
		profile: "Your orbit",
		calc: "Calculator",
		settings: "Settings",
		form: "Join the list",
		fizz: "FizzBuzz",
		hello: "Hello",
		landing: "Design in orbit"
	}[intent];
}
function blocksFor(intent, title) {
	switch (intent) {
		case "pricing": return [
			{
				h: "Nano",
				p: "Quick edits. One screen at a time."
			},
			{
				h: "Coder",
				p: "Components, scripts, and previews."
			},
			{
				h: "Studio",
				p: "Full flows that stay on device."
			}
		];
		case "login": return [{
			h: "Email",
			p: "Use the address you already trust."
		}, {
			h: "Quiet by default",
			p: "No feed. No noise. Just the work."
		}];
		case "todo": return [
			{
				h: "Sample a colour",
				p: "Pull a token off the reference."
			},
			{
				h: "Preview the frame",
				p: "Check iPhone, iPad, and desktop."
			},
			{
				h: "Commit the tree",
				p: "Every generation keeps its prompt."
			}
		];
		case "dash": return [
			{
				h: "12 screens",
				p: "Ready to review."
			},
			{
				h: "3 packs",
				p: "On device when you want quiet."
			},
			{
				h: "1 tree",
				p: "Inputs and outputs, in order."
			}
		];
		case "chat": return [{
			h: "Ask for a screen",
			p: "Say what it should do, not how it looks."
		}, {
			h: "Keep the key",
			p: "Providers only see what you send."
		}];
		case "profile": return [{
			h: title,
			p: "Independent. Offline when you choose."
		}, {
			h: "Keys",
			p: "Eight free-tier providers, guided in the app."
		}];
		case "calc": return [{
			h: "4 × 12",
			p: "Forty-eight."
		}, {
			h: "Clear",
			p: "Reset without leaving the screen."
		}];
		case "settings": return [
			{
				h: "Offline mode",
				p: "Only downloaded packs answer."
			},
			{
				h: "Storage",
				p: "Models stay inside Orbit."
			},
			{
				h: "Trash",
				p: "Remove a pack without a trace."
			}
		];
		case "form": return [{
			h: "Name",
			p: "What should we call the project?"
		}, {
			h: "Email",
			p: "A receipt, not a newsletter."
		}];
		default: return [
			{
				h: "Canvas",
				p: "Drag a study. Sample a colour. Leave the rest collapsed."
			},
			{
				h: "Preview",
				p: "A device, inside your device."
			},
			{
				h: "Worktree",
				p: "Every prompt and reply has a place."
			}
		];
	}
}
function htmlPage(title, intent, blocks) {
	const kicker = intent === "landing" ? "Orbit" : intent;
	const cards = blocks.map((b) => `<article class="card"><b>${esc$1(b.h)}</b><p>${esc$1(b.p)}</p></article>`).join("\n  ");
	return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; background: #111012; color: #f4f4f5; font: 16px/1.45 Inter, system-ui, sans-serif; }
  main { padding: 28px 22px 40px; }
  .k { color: #ec9a4a; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; font-weight: 700; }
  h1 { font-size: 34px; line-height: 1.05; letter-spacing: -.03em; margin: 8px 0 18px; }
  .card { border: 1px solid #2d2c2f; background: #1a191b; border-radius: 22px; padding: 16px; margin-bottom: 12px; }
  .card b { display: block; margin-bottom: 4px; }
  .card p { margin: 0; color: #8e8d93; font-size: 14px; }
  .cta { display: inline-flex; margin-top: 6px; background: #f4f4f5; color: #111012; border-radius: 999px; padding: 10px 16px; font-weight: 700; }
</style></head>
<body><main>
  <div class="k">${esc$1(kicker)}</div>
  <h1>${esc$1(title)}</h1>
  ${cards}
  <span class="cta">Continue</span>
</main></body></html>`;
}
function cssFor(intent) {
	return `body { margin: 0; background: #111012; color: #f4f4f5; font-family: Inter, system-ui, sans-serif; }
main { padding: 28px 22px; }
.kicker { color: ${intent === "pricing" ? "#ec9a4a" : "#ec9a4a"}; letter-spacing: .14em; text-transform: uppercase; font-size: 12px; font-weight: 700; }
h1 { font-size: 34px; letter-spacing: -.03em; margin: 8px 0 16px; }
.card { background: #1a191b; border: 1px solid #2d2c2f; border-radius: 22px; padding: 16px; margin-bottom: 12px; }
.card p { color: #8e8d93; }
.cta { display: inline-block; background: #f4f4f5; color: #111012; border-radius: 999px; padding: 10px 16px; font-weight: 700; }`;
}
function svgFor() {
	return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="40" fill="#111012"/>
  <circle cx="100" cy="104" r="48" fill="none" stroke="#ec9a4a" stroke-width="10"/>
  <circle cx="140" cy="72" r="11" fill="#ec9a4a"/>
  <text x="100" y="110" text-anchor="middle" fill="#f4f4f5" font-size="18" font-family="Inter, system-ui">Orbit</text>
</svg>`;
}
function mdFor(title, blocks) {
	return `# ${title}\n\n${blocks.map((b) => `## ${b.h}\n\n${b.p}\n`).join("\n")}`;
}
function jsonFor(title, blocks) {
	return JSON.stringify({
		title,
		accent: "#ec9a4a",
		blocks
	}, null, 2);
}
function sqlFor(intent) {
	if (intent === "settings" || intent === "dash") return "select name, status from screens;";
	return "select name, city from users where city = 'Lagos';";
}
function jsFor(lang, title, blocks) {
	const typed = lang === "ts" ? ": string" : "";
	const list = blocks.map((b) => `["${b.h}", "${b.p}"]`).join(", ");
	return `const title${typed} = ${JSON.stringify(title)};
const blocks = [${list}];
const root = document.getElementById("app");
if (root) {
  root.innerHTML = '<p class="k">On device</p><h1>' + title + '</h1>' +
    blocks.map(([h, p]) => '<article class="card"><b>' + h + '</b><p>' + p + '</p></article>').join("");
}
console.log(title, blocks.length);`;
}
function jsxFor(title, blocks) {
	return `const blocks = [${blocks.map((b) => `{ h: ${JSON.stringify(b.h)}, p: ${JSON.stringify(b.p)} }`).join(", ")}];
function App() {
  return (
    <main style={{ fontFamily: "Inter, system-ui", background: "#111012", color: "#f4f4f5", minHeight: "100vh", padding: 24 }}>
      <p style={{ color: "#ec9a4a", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>On device</p>
      <h1 style={{ fontSize: 34, letterSpacing: "-.03em" }}>${esc$1(title)}</h1>
      {blocks.map((block) => (
        <article key={block.h} style={{ border: "1px solid #2d2c2f", background: "#1a191b", borderRadius: 22, padding: 16, marginBottom: 12 }}>
          <b>{block.h}</b>
          <p style={{ color: "#8e8d93" }}>{block.p}</p>
        </article>
      ))}
    </main>
  );
}`;
}
function program(lang, title, blocks) {
	const lines = [title, ...blocks.map((b) => `${b.h}: ${b.p}`)];
	if (lang === "python") return `title = ${JSON.stringify(title)}\nprint(title)\nfor i in range(${blocks.length}):\n    print(i + 1)`;
	if (lang === "swift") return [
		`Text(${JSON.stringify(title)})`,
		...blocks.map((b) => `Text(${JSON.stringify(b.h)})`),
		`Button("Continue") { }`,
		`print(${JSON.stringify(title)})`
	].join("\n");
	if (lang === "kotlin") return [
		`fun main() {`,
		`    println(${JSON.stringify(title)})`,
		`}`,
		`Text(${JSON.stringify(title)})`,
		...blocks.map((b) => `Text(${JSON.stringify(b.h)})`)
	].join("\n");
	if (lang === "go") return `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println(${JSON.stringify(title)})\n}`;
	if (lang === "rust") return `fn main() {\n    println!(${JSON.stringify(title)});\n}`;
	if (lang === "java") return `class Main {\n    public static void main(String[] args) {\n        System.out.println(${JSON.stringify(title)});\n    }\n}`;
	if (lang === "cpp") return `#include <iostream>\nint main() {\n    std::cout << ${JSON.stringify(title)} << std::endl;\n    return 0;\n}`;
	if (lang === "ruby") return lines.map((line) => `puts ${JSON.stringify(line)}`).join("\n");
	if (lang === "php") return `<?php\n${lines.map((line) => `echo ${JSON.stringify(line)};`).join("\n")}`;
	if (lang === "bash") return lines.map((line) => `echo ${JSON.stringify(line)}`).join("\n");
	return lines.map((line) => `print(${JSON.stringify(line)})`).join("\n");
}
function fizz(lang) {
	if (lang === "python") return `for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)`;
	if (lang === "ruby") return `1.upto(15) do |i|\n  if i % 15 == 0\n    puts "FizzBuzz"\n  elsif i % 3 == 0\n    puts "Fizz"\n  elsif i % 5 == 0\n    puts "Buzz"\n  else\n    puts i\n  end\nend`;
	if (lang === "bash") return `i=1\nwhile [ $i -le 15 ]; do echo $i; i=$((i+1)); done`;
	if (lang === "php") return `<?php\nfor ($i = 1; $i <= 15; $i++) {\n  if ($i % 15 == 0) echo "FizzBuzz";\n  elseif ($i % 3 == 0) echo "Fizz";\n  elseif ($i % 5 == 0) echo "Buzz";\n  else echo $i;\n}`;
	if (lang === "go") return `package main\n\nimport "fmt"\n\nfunc main() {\n    for i := 1; i <= 15; i++ {\n        if i % 15 == 0 {\n            fmt.Println("FizzBuzz")\n        } else if i % 3 == 0 {\n            fmt.Println("Fizz")\n        } else if i % 5 == 0 {\n            fmt.Println("Buzz")\n        } else {\n            fmt.Println(i)\n        }\n    }\n}`;
	if (lang === "swift") return `for i in 1...15 {\n    if i % 15 == 0 { print("FizzBuzz") }\n    else if i % 3 == 0 { print("Fizz") }\n    else if i % 5 == 0 { print("Buzz") }\n    else { print(i) }\n}\nText("FizzBuzz")`;
	return `print("FizzBuzz")\nprint("1")\nprint("2")\nprint("Fizz")`;
}
function esc$1(value) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;"
	};
	return value.replace(/[&<>"]/g, (ch) => map[ch] ?? ch);
}
function withBase(path) {
	if (typeof window === "undefined") return path;
	return (previewPathPrefix(window.location.hostname, window.location.pathname) ?? "") + path;
}
async function providerChat(input) {
	const response = await fetch(withBase("/api/ai"), {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			op: "chat",
			base: input.base,
			key: input.key,
			model: input.model,
			messages: input.messages,
			image: input.image
		})
	});
	const data = await response.json();
	if (!response.ok || !data.ok) throw new Error(data.error || "The provider refused this request.");
	return (data.content || "").replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "").trim();
}
async function providerTest(base, key) {
	const response = await fetch(withBase("/api/ai"), {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			op: "models",
			base,
			key
		})
	});
	const data = await response.json();
	if (!response.ok || !data.ok) throw new Error(data.error || "Could not test this key.");
	return data.note || "Connected";
}
function bestPack(packs) {
	if (packs.studio) return "studio";
	if (packs.coder) return "coder";
	if (packs.nano) return "nano";
	return null;
}
async function runGeneration(input) {
	const ask = [input.context, input.prompt].filter(Boolean).join("\n\n");
	if (input.offline || !input.provider || !input.key) {
		if (!input.pack) throw new Error("Enable an on-device pack, or connect a provider in Keys.");
		return {
			output: localComplete(ask, input.lang, input.pack),
			provider: "orbit",
			model: input.pack,
			vision: false
		};
	}
	const provider = input.provider;
	if (!provider || !input.key) throw new Error("Connect a provider in Keys.");
	const vision = provider.id === "gemini" && Boolean(input.image);
	return {
		output: await providerChat({
			base: provider.base,
			key: input.key,
			model: input.model || provider.model,
			image: vision ? input.image : void 0,
			messages: [{
				role: "system",
				content: `Return only ${langMeta(input.lang).label} source for a phone screen. No markdown fences. No commentary. Use the measured colours when they are given. Treat layout bands marked estimate as hints, not facts.`
			}, {
				role: "user",
				content: ask
			}]
		}),
		provider: provider.id,
		model: input.model || provider.model,
		vision
	};
}
var STUDIES = [
	{
		id: "ref-01",
		src: "/library/ref-01.jpg",
		ratio: 1.7
	},
	{
		id: "ref-02",
		src: "/library/ref-02.jpg",
		ratio: 1.141
	},
	{
		id: "ref-03",
		src: "/library/ref-03.jpg",
		ratio: 2.165
	},
	{
		id: "ref-04",
		src: "/library/ref-04.jpg",
		ratio: 1.828
	},
	{
		id: "ref-05",
		src: "/library/ref-05.jpg",
		ratio: 1.835
	},
	{
		id: "ref-06",
		src: "/library/ref-06.jpg",
		ratio: .748
	},
	{
		id: "ref-07",
		src: "/library/ref-07.jpg",
		ratio: .739
	},
	{
		id: "ref-08",
		src: "/library/ref-08.jpg",
		ratio: 2.165
	},
	{
		id: "ref-09",
		src: "/library/ref-09.jpg",
		ratio: 2.165
	},
	{
		id: "ref-10",
		src: "/library/ref-10.jpg",
		ratio: 2.165
	},
	{
		id: "ref-11",
		src: "/library/ref-11.jpg",
		ratio: 2.165
	},
	{
		id: "ref-12",
		src: "/library/ref-12.jpg",
		ratio: 2.165
	},
	{
		id: "ref-13",
		src: "/library/ref-13.jpg",
		ratio: 1.285
	},
	{
		id: "ref-14",
		src: "/library/ref-14.jpg",
		ratio: .756
	},
	{
		id: "ref-15",
		src: "/library/ref-15.jpg",
		ratio: 2.165
	},
	{
		id: "ref-16",
		src: "/library/ref-16.jpg",
		ratio: .448
	},
	{
		id: "ref-17",
		src: "/library/ref-17.jpg",
		ratio: 1.356
	},
	{
		id: "ref-18",
		src: "/library/ref-18.jpg",
		ratio: 1.454
	},
	{
		id: "ref-19",
		src: "/library/ref-19.jpg",
		ratio: 2.165
	},
	{
		id: "ref-20",
		src: "/library/ref-20.jpg",
		ratio: 2.056
	},
	{
		id: "ref-21",
		src: "/library/ref-21.jpg",
		ratio: 2.056
	},
	{
		id: "ref-22",
		src: "/library/ref-22.jpg",
		ratio: 2.056
	},
	{
		id: "ref-23",
		src: "/library/ref-23.jpg",
		ratio: 2.078
	},
	{
		id: "ref-24",
		src: "/library/ref-24.jpg",
		ratio: 2.07
	},
	{
		id: "ref-25",
		src: "/library/ref-25.jpg",
		ratio: 2.165
	},
	{
		id: "ref-26",
		src: "/library/ref-26.jpg",
		ratio: 2.078
	},
	{
		id: "ref-27",
		src: "/library/ref-27.jpg",
		ratio: 2.165
	},
	{
		id: "ref-28",
		src: "/library/ref-28.jpg",
		ratio: 2.165
	},
	{
		id: "ref-29",
		src: "/library/ref-29.jpg",
		ratio: 2.165
	},
	{
		id: "ref-30",
		src: "/library/ref-30.jpg",
		ratio: 2.165
	},
	{
		id: "ref-31",
		src: "/library/ref-31.jpg",
		ratio: 2.078
	},
	{
		id: "ref-32",
		src: "/library/ref-32.jpg",
		ratio: 2.165
	},
	{
		id: "ref-33",
		src: "/library/ref-33.jpg",
		ratio: 2.165
	},
	{
		id: "ref-34",
		src: "/library/ref-34.jpg",
		ratio: 2.165
	},
	{
		id: "ref-35",
		src: "/library/ref-35.jpg",
		ratio: 2.056
	},
	{
		id: "ref-36",
		src: "/library/ref-36.jpg",
		ratio: 2.165
	},
	{
		id: "ref-37",
		src: "/library/ref-37.jpg",
		ratio: 2.165
	},
	{
		id: "ref-38",
		src: "/library/ref-38.jpg",
		ratio: 2.056
	},
	{
		id: "ref-39",
		src: "/library/ref-39.jpg",
		ratio: 2.165
	},
	{
		id: "ref-40",
		src: "/library/ref-40.jpg",
		ratio: 2.056
	},
	{
		id: "ref-41",
		src: "/library/ref-41.jpg",
		ratio: .32
	},
	{
		id: "ref-42",
		src: "/library/ref-42.jpg",
		ratio: 2.056
	},
	{
		id: "ref-43",
		src: "/library/ref-43.jpg",
		ratio: 1.37
	},
	{
		id: "ref-44",
		src: "/library/ref-44.jpg",
		ratio: 1.415
	},
	{
		id: "ref-45",
		src: "/library/ref-45.jpg",
		ratio: 1.444
	},
	{
		id: "ref-46",
		src: "/library/ref-46.jpg",
		ratio: 1.417
	},
	{
		id: "ref-47",
		src: "/library/ref-47.jpg",
		ratio: 1.817
	},
	{
		id: "ref-48",
		src: "/library/ref-48.jpg",
		ratio: 2.043
	},
	{
		id: "ref-49",
		src: "/library/ref-49.jpg",
		ratio: 2.039
	},
	{
		id: "ref-50",
		src: "/library/ref-50.jpg",
		ratio: 2.039
	},
	{
		id: "ref-51",
		src: "/library/ref-51.jpg",
		ratio: 2.165
	},
	{
		id: "ref-52",
		src: "/library/ref-52.jpg",
		ratio: 1.872
	},
	{
		id: "ref-53",
		src: "/library/ref-53.jpg",
		ratio: 1.904
	},
	{
		id: "ref-54",
		src: "/library/ref-54.jpg",
		ratio: 1.865
	},
	{
		id: "ref-55",
		src: "/library/ref-55.jpg",
		ratio: 1.898
	},
	{
		id: "ref-56",
		src: "/library/ref-56.jpg",
		ratio: 2.165
	},
	{
		id: "ref-57",
		src: "/library/ref-57.jpg",
		ratio: .372
	},
	{
		id: "ref-58",
		src: "/library/ref-58.jpg",
		ratio: 1.159
	},
	{
		id: "ref-59",
		src: "/library/ref-59.jpg",
		ratio: 2.165
	},
	{
		id: "ref-60",
		src: "/library/ref-60.jpg",
		ratio: 2.165
	},
	{
		id: "ref-61",
		src: "/library/ref-61.jpg",
		ratio: 2.165
	},
	{
		id: "ref-62",
		src: "/library/ref-62.jpg",
		ratio: 2.165
	},
	{
		id: "ref-63",
		src: "/library/ref-63.jpg",
		ratio: 2.165
	},
	{
		id: "ref-64",
		src: "/library/ref-64.jpg",
		ratio: 2.165
	},
	{
		id: "ref-65",
		src: "/library/ref-65.jpg",
		ratio: 2.165
	},
	{
		id: "ref-66",
		src: "/library/ref-66.jpg",
		ratio: 2.165
	},
	{
		id: "ref-67",
		src: "/library/ref-67.jpg",
		ratio: 2.165
	},
	{
		id: "ref-68",
		src: "/library/ref-68.jpg",
		ratio: 2.165
	},
	{
		id: "ref-69",
		src: "/library/ref-69.jpg",
		ratio: 2.165
	},
	{
		id: "ref-70",
		src: "/library/ref-70.jpg",
		ratio: 2.165
	},
	{
		id: "ref-71",
		src: "/library/ref-71.jpg",
		ratio: 2.165
	},
	{
		id: "ref-72",
		src: "/library/ref-72.jpg",
		ratio: 2.165
	},
	{
		id: "ref-73",
		src: "/library/ref-73.jpg",
		ratio: 2.165
	},
	{
		id: "ref-74",
		src: "/library/ref-74.jpg",
		ratio: 2.165
	},
	{
		id: "ref-75",
		src: "/library/ref-75.jpg",
		ratio: 2.165
	},
	{
		id: "ref-76",
		src: "/library/ref-76.jpg",
		ratio: 2.165
	},
	{
		id: "ref-77",
		src: "/library/ref-77.jpg",
		ratio: 2.165
	},
	{
		id: "ref-78",
		src: "/library/ref-78.jpg",
		ratio: 2.165
	},
	{
		id: "ref-79",
		src: "/library/ref-79.jpg",
		ratio: 2.165
	},
	{
		id: "ref-80",
		src: "/library/ref-80.jpg",
		ratio: 2.065
	},
	{
		id: "ref-81",
		src: "/library/ref-81.jpg",
		ratio: 2.165
	},
	{
		id: "ref-82",
		src: "/library/ref-82.jpg",
		ratio: 2.165
	},
	{
		id: "ref-83",
		src: "/library/ref-83.jpg",
		ratio: 2.165
	},
	{
		id: "ref-84",
		src: "/library/ref-84.jpg",
		ratio: 2.165
	},
	{
		id: "ref-85",
		src: "/library/ref-85.jpg",
		ratio: 2.165
	}
];
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that image."));
		img.src = src;
	});
}
function hex(r, g, b) {
	return `#${[
		r,
		g,
		b
	].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
function lum(r, g, b) {
	return .2126 * r + .7152 * g + .0722 * b;
}
function contrastNote(value) {
	const match = value.trim().match(/^#([0-9a-f]{6})$/i);
	if (!match) return "Not a 6-digit hex.";
	const n = parseInt(match[1], 16);
	const channels = [
		n >> 16 & 255,
		n >> 8 & 255,
		n & 255
	].map((c) => {
		const s = c / 255;
		return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
	});
	const L = .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
	const ink = .006;
	const paper = .91;
	const onInk = (Math.max(L, ink) + .05) / (Math.min(L, ink) + .05);
	const onPaper = (Math.max(L, paper) + .05) / (Math.min(L, paper) + .05);
	return `${onInk >= onPaper ? `about ${onInk.toFixed(1)}:1 on ink` : `about ${onPaper.toFixed(1)}:1 on paper`} (sRGB estimate)`;
}
async function analyzeImage(src) {
	const img = await loadImage(src);
	const width = img.naturalWidth || img.width;
	const height = img.naturalHeight || img.height;
	const sampleW = Math.min(160, width);
	const sampleH = Math.max(1, Math.round(height * (sampleW / width)));
	const canvas = document.createElement("canvas");
	canvas.width = sampleW;
	canvas.height = sampleH;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("This browser cannot read pixels.");
	ctx.drawImage(img, 0, 0, sampleW, sampleH);
	const data = ctx.getImageData(0, 0, sampleW, sampleH).data;
	const buckets = /* @__PURE__ */ new Map();
	const rowLum = [];
	for (let y = 0; y < sampleH; y++) {
		let acc = 0;
		let count = 0;
		for (let x = 0; x < sampleW; x += 2) {
			const i = (y * sampleW + x) * 4;
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			acc += lum(r, g, b);
			count += 1;
			const key = hex(Math.round(r / 24) * 24, Math.round(g / 24) * 24, Math.round(b / 24) * 24);
			buckets.set(key, (buckets.get(key) ?? 0) + 1);
		}
		rowLum.push(acc / Math.max(1, count));
	}
	const total = [...buckets.values()].reduce((sum, n) => sum + n, 0) || 1;
	const colors = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([color, count]) => ({
		hex: color,
		share: `${Math.round(count / total * 100)}%`
	}));
	const median = [...rowLum].sort((a, b) => a - b)[Math.floor(rowLum.length / 2)] ?? 0;
	const cls = rowLum.map((value) => value < median - 14 ? 0 : value > median + 14 ? 2 : 1);
	const raw = [];
	for (let i = 0; i < cls.length; i++) {
		const last = raw[raw.length - 1];
		if (!last || last.kind !== cls[i]) raw.push({
			start: i,
			end: i + 1,
			kind: cls[i]
		});
		else last.end = i + 1;
	}
	const minRows = Math.max(2, Math.round(sampleH * .035));
	const merged = [];
	for (const band of raw) {
		const prev = merged[merged.length - 1];
		if (prev && band.end - band.start < minRows) prev.end = band.end;
		else merged.push({ ...band });
	}
	const names = [
		"Dark band",
		"Mid band",
		"Light band"
	];
	return {
		width,
		height,
		colors,
		bands: merged.map((band, index) => {
			const y = Math.round(band.start / sampleH * height);
			const bottom = Math.round(band.end / sampleH * height);
			const bandH = Math.max(1, bottom - y);
			const share = `${Math.round(bandH / height * 100)}%`;
			let name = names[band.kind] ?? "Band";
			if (index === 0 && bandH / height < .2) name = "Top chrome";
			else if (index === merged.length - 1 && bandH / height < .24) name = "Bottom chrome";
			else if (bandH / height > .35) name = "Content";
			return {
				name,
				y,
				height: bandH,
				share,
				confidence: "estimate"
			};
		}),
		summary: "Bands are estimates from row luminance, not a trained component detector. Colours are quantised samples."
	};
}
function formatRead(read) {
	const colors = read.colors.map((c) => `${c.hex} (${c.share})`).join(", ");
	const bands = read.bands.map((b) => `- ${b.name}: y ${b.y}px, height ${b.height}px, ${b.share} — estimate`).join("\n");
	return `Screenshot ${read.width}×${read.height} px (measured).\nColours by sampled share: ${colors}.\nLayout bands:\n${bands}\n${read.summary}`;
}
async function shrinkDataUrl(src, maxEdge = 768) {
	const img = await loadImage(src);
	const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
	canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not shrink the image.");
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	let quality = .72;
	let url = canvas.toDataURL("image/jpeg", quality);
	while (url.length > 85e4 && quality > .4) {
		quality -= .12;
		url = canvas.toDataURL("image/jpeg", quality);
	}
	return url;
}
function sampleHex(img, clientX, clientY) {
	const rect = img.getBoundingClientRect();
	const x = Math.min(img.naturalWidth - 1, Math.max(0, Math.floor((clientX - rect.left) / rect.width * img.naturalWidth)));
	const y = Math.min(img.naturalHeight - 1, Math.max(0, Math.floor((clientY - rect.top) / rect.height * img.naturalHeight)));
	const canvas = document.createElement("canvas");
	canvas.width = img.naturalWidth;
	canvas.height = img.naturalHeight;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Could not sample.");
	ctx.drawImage(img, 0, 0);
	const px = ctx.getImageData(x, y, 1, 1).data;
	return {
		hex: hex(px[0], px[1], px[2]),
		x,
		y
	};
}
function esc(value) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;"
	};
	return value.replace(/[&<>"]/g, (ch) => map[ch] ?? ch);
}
function canvasToHtml(nodes) {
	const maxX = nodes.reduce((m, n) => Math.max(m, n.x + n.w), 390);
	const maxY = nodes.reduce((m, n) => Math.max(m, n.y + n.h), 700);
	const body = nodes.map((node) => {
		const box = `position:absolute;left:${Math.round(node.x)}px;top:${Math.round(node.y)}px;width:${Math.round(node.w)}px;height:${Math.round(node.h)}px;`;
		if ((node.kind === "image" || node.kind === "ref") && node.src && node.src.length < 12e4) return `<img alt="${esc(node.text || "Reference")}" src="${esc(node.src)}" style="${box}object-fit:cover;border-radius:16px">`;
		if (node.kind === "image" || node.kind === "ref") return `<div style="${box}border:1px dashed #2d2c2f;border-radius:16px;display:grid;place-items:center;color:#8e8d93;font:13px system-ui">Image omitted (too large to inline)</div>`;
		if (node.kind === "button") return `<a style="${box}display:grid;place-items:center;background:#f4f4f5;color:#111012;border-radius:999px;font:600 14px system-ui;text-decoration:none">${esc(node.text)}</a>`;
		if (node.kind === "pill" || node.kind === "segment") return `<span style="${box}display:grid;place-items:center;background:#242326;color:#f4f4f5;border-radius:999px;font:14px system-ui">${esc(node.text)}</span>`;
		if (node.kind === "card") return `<article style="${box}box-sizing:border-box;background:#1a191b;border:1px solid #2d2c2f;border-radius:22px;padding:14px;font:15px/1.4 system-ui;color:#f4f4f5"><b>${esc(node.text)}</b><p style="margin:6px 0 0;color:#8e8d93">${esc(node.sub)}</p></article>`;
		if (node.kind === "field" || node.kind === "composer") return `<div style="${box}box-sizing:border-box;border:1px solid #2d2c2f;border-radius:${node.kind === "composer" ? "999px" : "10px"};padding:12px 14px;color:#8e8d93;font:15px system-ui">${esc(node.text)}</div>`;
		if (node.kind === "swatch") return `<div style="${box}border-radius:16px;background:${esc(node.color || node.text || "#ec9a4a")}"></div>`;
		if (node.kind === "frame") return `<div style="${box}box-sizing:border-box;border:10px solid #eceae6;border-radius:36px"></div>`;
		if (node.kind === "heading") return `<h1 style="${box}margin:0;font:600 28px/1.1 system-ui;letter-spacing:-.03em;color:#f4f4f5">${esc(node.text)}</h1>`;
		if (node.kind === "nav") return `<nav style="${box}display:flex;align-items:center;justify-content:space-around;background:#1a191b;border:1px solid #2d2c2f;border-radius:24px;color:#8e8d93;font:12px system-ui">${esc(node.text)}</nav>`;
		return `<p style="${box}margin:0;color:${node.kind === "note" ? "#ec9a4a" : "#f4f4f5"};font:14px/1.4 system-ui">${esc(node.text)}</p>`;
	}).join("\n  ");
	return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Orbit canvas</title>
<style>body{margin:0;background:#111012} .stage{position:relative;width:${Math.ceil(maxX)}px;height:${Math.ceil(maxY)}px}</style>
</head><body><div class="stage">
  ${body}
</div></body></html>`;
}
var handlers = /* @__PURE__ */ new Set();
function onCmd(handler) {
	handlers.add(handler);
	return () => handlers.delete(handler);
}
function emitCmd(cmd) {
	handlers.forEach((handler) => handler(cmd));
}
var Ctx = (0, import_react.createContext)(() => void 0);
function ToastProvider({ children }) {
	const [message, setMessage] = (0, import_react.useState)("");
	const [on, setOn] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)(0);
	const push = (0, import_react.useCallback)((next) => {
		setMessage(next);
		setOn(true);
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => setOn(false), 2200);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Ctx.Provider, {
		value: push,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "toast",
			"data-on": on,
			role: "status",
			children: message
		})]
	});
}
function useToast() {
	return (0, import_react.useContext)(Ctx);
}
var INSERTS = [
	{
		kind: "heading",
		label: "Heading",
		w: 220,
		h: 52,
		text: "Title",
		sub: ""
	},
	{
		kind: "text",
		label: "Text",
		w: 200,
		h: 72,
		text: "Quiet supporting copy.",
		sub: ""
	},
	{
		kind: "button",
		label: "Button",
		w: 148,
		h: 44,
		text: "Continue",
		sub: ""
	},
	{
		kind: "pill",
		label: "Pill",
		w: 112,
		h: 36,
		text: "Label",
		sub: ""
	},
	{
		kind: "card",
		label: "Card",
		w: 240,
		h: 108,
		text: "Card",
		sub: "One clear idea."
	},
	{
		kind: "field",
		label: "Field",
		w: 240,
		h: 48,
		text: "Email",
		sub: ""
	},
	{
		kind: "composer",
		label: "Composer",
		w: 260,
		h: 52,
		text: "Message",
		sub: ""
	},
	{
		kind: "nav",
		label: "Nav",
		w: 260,
		h: 56,
		text: "Home",
		sub: ""
	},
	{
		kind: "segment",
		label: "Segment",
		w: 180,
		h: 40,
		text: "Lines",
		sub: "Dots"
	},
	{
		kind: "frame",
		label: "Phone frame",
		w: 180,
		h: 360,
		text: "Screen",
		sub: ""
	},
	{
		kind: "swatch",
		label: "Swatch",
		w: 56,
		h: 56,
		text: "#ec9a4a",
		sub: ""
	},
	{
		kind: "note",
		label: "Note",
		w: 160,
		h: 88,
		text: "Note",
		sub: ""
	}
];
function uid() {
	return Math.random().toString(36).slice(2, 10);
}
function CanvasView() {
	const orbit = useOrbit();
	const toast = useToast();
	const surface = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const [tool, setTool] = (0, import_react.useState)("hand");
	const [cam, setCam] = (0, import_react.useState)({
		x: 28,
		y: 28,
		z: 1
	});
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [marks, setMarks] = (0, import_react.useState)([]);
	const [crop, setCrop] = (0, import_react.useState)(null);
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [read, setRead] = (0, import_react.useState)(null);
	const [prompt, setPrompt] = (0, import_react.useState)("Rebuild this screen as one HTML page.");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [grid, setGrid] = (0, import_react.useState)("dots");
	const node = orbit.nodes.find((item) => item.id === selected) ?? null;
	function toWorld(clientX, clientY) {
		const rect = surface.current?.getBoundingClientRect();
		if (!rect) return {
			x: 0,
			y: 0
		};
		return {
			x: (clientX - rect.left - cam.x) / cam.z,
			y: (clientY - rect.top - cam.y) / cam.z
		};
	}
	function place(partial) {
		const rect = surface.current?.getBoundingClientRect();
		const cx = rect ? (rect.width / 2 - cam.x) / cam.z : 80;
		const cy = rect ? (rect.height / 2 - cam.y) / cam.z : 80;
		orbit.checkpoint();
		const id = uid();
		orbit.addNode({
			id,
			x: partial.x ?? Math.round(cx - partial.w / 2),
			y: partial.y ?? Math.round(cy - partial.h / 2),
			...partial
		});
		setSelected(id);
	}
	async function addFile(file) {
		const src = await fileToUrl(file);
		const size = await imageSize(src);
		const w = 220;
		const h = Math.round(w * (size.h / Math.max(1, size.w)));
		place({
			kind: "image",
			w,
			h: Math.min(h, 460),
			text: file.name,
			sub: `${size.w}×${size.h}`,
			color: "",
			src
		});
		toast("Tap the image with Sample to pick a colour.");
	}
	(0, import_react.useEffect)(() => {
		return onCmd((cmd) => {
			if (cmd === "import") fileRef.current?.click();
			if (cmd === "library") setSheet("library");
			if (cmd === "insert") setSheet("insert");
		});
	}, []);
	function zoomBy(factor) {
		setCam((current) => {
			const z = Math.min(2.8, Math.max(.35, current.z * factor));
			const rect = surface.current?.getBoundingClientRect();
			if (!rect) return {
				...current,
				z
			};
			const cx = rect.width / 2;
			const cy = rect.height / 2;
			const wx = (cx - current.x) / current.z;
			const wy = (cy - current.y) / current.z;
			return {
				z,
				x: cx - wx * z,
				y: cy - wy * z
			};
		});
	}
	function onBackgroundDown(event) {
		if (event.target.closest("[data-node]")) return;
		if (tool === "measure") {
			const point = toWorld(event.clientX, event.clientY);
			setMarks((current) => current.length >= 2 ? [point] : [...current, point]);
			return;
		}
		if (tool !== "hand") return;
		const startX = event.clientX;
		const startY = event.clientY;
		const origin = cam;
		const move = (ev) => setCam({
			...origin,
			x: origin.x + ev.clientX - startX,
			y: origin.y + ev.clientY - startY
		});
		const up = () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
	}
	function onNodeDown(event, item) {
		event.stopPropagation();
		setSelected(item.id);
		if (tool === "sample") {
			const img = event.currentTarget.querySelector("img");
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
			setMarks((current) => current.length >= 2 ? [toWorld(event.clientX, event.clientY)] : [...current, toWorld(event.clientX, event.clientY)]);
			return;
		}
		if (tool === "crop" && (item.kind === "image" || item.kind === "ref")) {
			setCrop({
				x: .12,
				y: .12,
				w: .76,
				h: .76
			});
			return;
		}
		if (tool !== "hand") return;
		orbit.checkpoint();
		const start = toWorld(event.clientX, event.clientY);
		const ox = item.x;
		const oy = item.y;
		const move = (ev) => {
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
			const image = provider?.id === "gemini" ? await shrinkDataUrl(node.src) : void 0;
			const result = await runGeneration({
				prompt,
				lang: "html",
				offline: orbit.offline,
				pack: bestPack(orbit.packs),
				provider,
				key: provider ? orbit.keys[provider.id] : void 0,
				model: provider ? orbit.modelNames[provider.id] || provider.model : void 0,
				image,
				context: formatRead(read)
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
				model: result.model
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
		const img = surface.current?.querySelector(`[data-node="${node.id}"] img`);
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
			src: canvas.toDataURL("image/jpeg", .86),
			sub: `${sw}×${sh} cropped`,
			h: Math.round(node.w * (sh / sw))
		});
		setCrop(null);
		toast(`Cropped to ${sw}×${sh} image pixels.`);
	}
	const measure = describeMeasure(marks, orbit.nodes, surface.current);
	const studies = STUDIES.filter((study) => study.id.includes(query.trim().toLowerCase()));
	const bg = grid === "off" ? void 0 : grid === "lines" ? "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)" : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-0 flex-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: surface,
				className: grid === "dots" ? "canvas-world absolute inset-0 overflow-hidden" : "absolute inset-0 overflow-hidden bg-bg",
				style: bg ? {
					backgroundImage: bg,
					backgroundSize: `${22 * cam.z}px ${22 * cam.z}px`
				} : void 0,
				onPointerDown: onBackgroundDown,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.z})`,
						transformOrigin: "0 0",
						width: 2400,
						height: 1800,
						position: "relative"
					},
					children: [
						marks.length === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "pointer-events-none absolute inset-0 h-full w-full overflow-visible",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: marks[0].x,
								y1: marks[0].y,
								x2: marks[1].x,
								y2: marks[1].y,
								stroke: "#ec9a4a",
								strokeWidth: 2 / cam.z
							})
						}) : null,
						orbit.nodes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							"data-node": item.id,
							"data-on": item.id === selected,
							className: "node",
							style: {
								left: item.x,
								top: item.y,
								width: item.w,
								height: item.h
							},
							onPointerDown: (event) => onNodeDown(event, item),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeFace, { node: item }), crop && item.id === selected && (item.kind === "image" || item.kind === "ref") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute border-2 border-accent",
								style: {
									left: `${crop.x * 100}%`,
									top: `${crop.y * 100}%`,
									width: `${crop.w * 100}%`,
									height: `${crop.h * 100}%`
								}
							}) : null]
						}, item.id)),
						measure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute rounded-full bg-fg px-3 py-1 text-xs font-semibold text-ink",
							style: {
								left: measure.x,
								top: measure.y
							},
							children: measure.label
						}) : null
					]
				}), orbit.nodes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none absolute inset-x-0 top-[18%] px-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-semibold",
						children: "Add a screenshot to inspect it."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Import one, or open a study. Sample, measure, and crop use the real pixels. Layout bands stay labelled as estimates."
					})]
				}) : null]
			}),
			node ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-3 top-3 z-10 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field min-w-0 flex-1",
					"aria-label": "Node text",
					value: node.text,
					onChange: (event) => orbit.editNode(node.id, { text: event.target.value })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "icon-btn bg-surface",
					"aria-label": "Delete node",
					onClick: () => {
						orbit.checkpoint();
						orbit.removeNode(node.id);
						setSelected(null);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 18 })
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tool-pill",
				role: "toolbar",
				"aria-label": "Canvas tools",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Pan and move",
						on: tool === "hand",
						onClick: () => setTool("hand"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hand, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Add image",
						on: false,
						onClick: () => fileRef.current?.click(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Add note",
						on: false,
						onClick: () => place({
							kind: "note",
							w: 160,
							h: 88,
							text: "Note",
							sub: "",
							color: ""
						}),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Type, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Sample colour",
						on: tool === "sample",
						onClick: () => setTool("sample"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spline, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Measure",
						on: tool === "measure",
						onClick: () => {
							setTool("measure");
							setMarks([]);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Crop",
						on: tool === "crop",
						onClick: () => {
							setTool("crop");
							if (node?.src) setCrop({
								x: .12,
								y: .12,
								w: .76,
								h: .76
							});
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crop, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Read layout",
						on: false,
						onClick: () => void readSelected(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Zoom out",
						on: false,
						onClick: () => zoomBy(.9),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "px-1 text-xs text-muted",
						children: [Math.round(cam.z * 100), "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: "Zoom in",
						on: false,
						onClick: () => zoomBy(1.1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolButton, {
						label: grid === "dots" ? "Dot grid" : grid === "lines" ? "Line grid" : "Grid off",
						on: grid !== "off",
						onClick: () => setGrid((g) => g === "dots" ? "lines" : g === "lines" ? "off" : "dots"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoveRight, { size: 18 })
					})
				]
			}),
			crop && node ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute right-3 bottom-28 z-10 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "pill",
					onClick: () => setCrop(null),
					children: "Cancel crop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "cta",
					onClick: () => void applyCrop(),
					children: "Apply crop"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "image/*",
				hidden: true,
				onChange: (event) => {
					const file = event.target.files?.[0];
					if (file) addFile(file);
					event.target.value = "";
				}
			}),
			sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "scrim",
				"aria-label": "Close sheet",
				onClick: () => setSheet(null)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sheet",
				"data-open": "true",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": sheet === "library" ? "Studies" : sheet === "insert" ? "Insert" : "Screenshot read",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-2 mb-3 h-1.5 w-10 rounded-full bg-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-auto px-4 pb-4",
					children: [
						sheet === "library" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-2 text-lg font-semibold",
								children: "Studies"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field mb-3",
								placeholder: "Filter",
								"aria-label": "Filter studies",
								value: query,
								onChange: (event) => setQuery(event.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: studies.map((study) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "overflow-hidden rounded-md border border-line",
									onClick: () => {
										const w = 200;
										place({
											kind: "ref",
											w,
											h: Math.round(w / study.ratio),
											text: study.id,
											sub: "Library study",
											color: "",
											src: study.src,
											refId: study.id
										});
										setSheet(null);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: study.src,
										alt: study.id,
										className: "aspect-[3/4] w-full object-cover"
									})
								}, study.id))
							})
						] }) : null,
						sheet === "insert" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-lg font-semibold",
							children: "Insert"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: INSERTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "pill justify-center",
								onClick: () => {
									place({
										kind: item.kind,
										w: item.w,
										h: item.h,
										text: item.text,
										sub: item.sub,
										color: item.kind === "swatch" ? item.text : ""
									});
									setSheet(null);
								},
								children: item.label
							}, item.kind))
						})] }) : null,
						sheet === "read" && read ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "Screenshot read"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									read.width,
									"×",
									read.height,
									" px measured. ",
									read.summary
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: read.colors.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "pill",
									onClick: () => {
										orbit.addToken(color.hex);
										toast(`${color.hex} · ${contrastNote(color.hex)}`);
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-4 rounded-full border border-line",
											style: { background: color.hex }
										}),
										color.hex,
										" · ",
										color.share
									]
								}, color.hex))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 flex flex-col gap-2",
								children: read.bands.map((band) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "card px-3 py-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: band.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tag ml-2",
											children: "estimate"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-muted",
											children: [
												"y ",
												band.y,
												"px · height ",
												band.height,
												"px · ",
												band.share
											]
										})
									]
								}, `${band.name}-${band.y}`))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-3 block text-sm text-muted",
								htmlFor: "shot-ask",
								children: "Ask"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "shot-ask",
								className: "field mt-1",
								rows: 3,
								value: prompt,
								onChange: (event) => setPrompt(event.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "cta mt-3 w-full",
								disabled: busy,
								onClick: () => void generateFromRead(),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }),
									" ",
									busy ? "Writing…" : "Generate HTML"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "pill mt-2 w-full justify-center",
								onClick: () => {
									orbit.checkpoint();
									orbit.setLang("html");
									orbit.setCode(canvasToHtml(orbit.nodes));
									orbit.setTab("code");
									setSheet(null);
									toast("Canvas composed into HTML.");
								},
								children: "Compose placed nodes instead"
							})
						] }) : null
					]
				})]
			})] }) : null,
			busy && !sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute bottom-28 left-4 text-sm text-muted",
				children: "Reading pixels…"
			}) : null
		]
	});
}
function ToolButton({ label, on, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "icon-btn",
		"aria-label": label,
		"aria-pressed": on,
		"data-on": on,
		onClick,
		children
	});
}
function NodeFace({ node }) {
	if ((node.kind === "image" || node.kind === "ref") && node.src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: node.src,
		alt: node.text || "Screenshot",
		crossOrigin: "anonymous",
		draggable: false,
		className: "h-full w-full rounded-md object-cover"
	});
	if (node.kind === "heading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-end text-2xl font-semibold tracking-tight",
		children: node.text
	});
	if (node.kind === "button") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "cta flex h-full items-center justify-center",
		children: node.text
	});
	if (node.kind === "pill" || node.kind === "segment") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pill h-full w-full justify-center",
		children: node.text
	});
	if (node.kind === "card") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card h-full p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: node.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: node.sub
		})]
	});
	if (node.kind === "field" || node.kind === "composer") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `field flex h-full items-center text-muted ${node.kind === "composer" ? "rounded-full" : ""}`,
		children: node.text
	});
	if (node.kind === "nav") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full items-center justify-around rounded-lg border border-line bg-surface text-xs text-muted",
		children: node.text
	});
	if (node.kind === "swatch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full w-full rounded-md border border-line",
		style: { background: node.color || node.text }
	});
	if (node.kind === "frame") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full rounded-[28px] border-8 border-bezel bg-ink" });
	if (node.kind === "note") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full rounded-md border border-dashed border-line p-2 text-sm text-accent",
		children: node.text
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full text-sm",
		children: node.text
	});
}
function describeMeasure(marks, nodes, surface) {
	if (marks.length !== 2) return null;
	const dx = marks[1].x - marks[0].x;
	const dy = marks[1].y - marks[0].y;
	const canvasPx = Math.round(Math.hypot(dx, dy));
	let label = `${canvasPx} canvas px`;
	const hit = nodes.find((node) => node.src && marks.every((mark) => mark.x >= node.x && mark.x <= node.x + node.w && mark.y >= node.y && mark.y <= node.y + node.h));
	const img = hit && surface ? surface.querySelector(`[data-node="${hit.id}"] img`) : null;
	if (hit && img && img.naturalWidth) {
		const imagePx = Math.round(canvasPx * (img.naturalWidth / hit.w));
		label = `${imagePx} image px`;
		if (img.naturalHeight / img.naturalWidth > 1.7 && img.naturalWidth >= 300) label = `${imagePx} image px · ~${Math.round(imagePx / (img.naturalWidth / 390))} CSS px (estimate on a 390-wide phone)`;
	}
	return {
		x: (marks[0].x + marks[1].x) / 2,
		y: (marks[0].y + marks[1].y) / 2 - 28,
		label
	};
}
function fileToUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}
function imageSize(src) {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve({
			w: img.naturalWidth,
			h: img.naturalHeight
		});
		img.onerror = () => resolve({
			w: 220,
			h: 400
		});
		img.src = src;
	});
}
var TABLES = {
	users: [
		{
			id: "1",
			name: "Ada",
			city: "Lagos"
		},
		{
			id: "2",
			name: "Lin",
			city: "Accra"
		},
		{
			id: "3",
			name: "Noor",
			city: "Cairo"
		}
	],
	screens: [
		{
			id: "1",
			name: "Canvas",
			status: "ready"
		},
		{
			id: "2",
			name: "Preview",
			status: "live"
		},
		{
			id: "3",
			name: "Worktree",
			status: "saved"
		}
	]
};
function runSource(lang, code) {
	if (lang === "sql") return runSql(code);
	const ui = extractUi(code);
	try {
		const stdout = execBlock(toLines(code, lang), 0, {}).join("\n");
		return {
			stdout,
			ui,
			status: "ran",
			detail: stdout ? `Ran on device · ${stdout.split("\n").length} line${stdout.includes("\n") ? "s" : ""}` : ui.length ? "Built the interface strings in this file" : "Parsed · no print or echo to show"
		};
	} catch (error) {
		return {
			stdout: "",
			ui,
			status: "error",
			detail: error instanceof Error ? error.message : "Runner failed"
		};
	}
}
function runSql(code) {
	const match = code.match(/select\s+([\s\S]+?)\s+from\s+([a-z_][\w]*)\s*(?:where\s+([\s\S]+?))?(?:order\s+by[\s\S]+?)?;?\s*$/i);
	if (!match) return {
		stdout: "",
		ui: [],
		status: "error",
		detail: "Use SELECT … FROM users or screens."
	};
	const table = TABLES[match[2].toLowerCase()];
	if (!table) return {
		stdout: "",
		ui: [],
		status: "error",
		detail: `No table “${match[2]}”. Try users or screens.`
	};
	const columns = match[1].trim() === "*" ? Object.keys(table[0] ?? {}) : match[1].split(",").map((c) => c.trim()).filter(Boolean);
	let rows = table;
	if (match[3]) {
		const cond = match[3].trim().replace(/;$/, "").match(/^([a-z_][\w]*)\s*=\s*['"]?([^'"]+)['"]?$/i);
		if (!cond) return {
			stdout: "",
			ui: [],
			status: "error",
			detail: "WHERE supports column = value."
		};
		rows = rows.filter((row) => String(row[cond[1]] ?? "") === cond[2]);
	}
	const data = rows.map((row) => columns.map((col) => String(row[col] ?? "")));
	return {
		stdout: [columns.join(" · "), ...data.map((r) => r.join(" · "))].join("\n"),
		rows: {
			columns,
			data
		},
		ui: [],
		status: "ran",
		detail: `${data.length} row${data.length === 1 ? "" : "s"} · local database`
	};
}
function extractUi(code) {
	const found = [];
	const re = /\b(?:Text|Button|Label|TextView|Headline|Title)\s*\(\s*(?:text\s*[:=]\s*)?["']([^"']+)["']/g;
	let m;
	while (m = re.exec(code)) found.push(m[1]);
	return found.slice(0, 8);
}
function toLines(code, lang) {
	return code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/<!--[\s\S]*?-->/g, "").split("\n").map((raw) => {
		const indent = raw.match(/^\s*/)?.[0].length ?? 0;
		let text = raw.trim();
		if (lang === "python" || lang === "ruby" || lang === "bash" || lang === "php") {
			if (text.startsWith("#")) text = "";
		} else if (text.startsWith("//")) text = "";
		if (lang === "sql" && text.startsWith("--")) text = "";
		return {
			indent,
			text
		};
	});
}
function execBlock(lines, startIndent, scope) {
	const out = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const text = stripTrail(line.text);
		if (!text) continue;
		const pyFor = text.match(/^for\s+([A-Za-z_]\w*)\s+in\s+range\s*\(([\s\S]+)\)\s*:$/);
		if (pyFor) {
			const body = takeIndented(lines, i + 1, line.indent);
			i += body.length;
			const values = rangeValues(pyFor[2], scope);
			for (const value of values) out.push(...execBlock(body, line.indent + 1, {
				...scope,
				[pyFor[1]]: value
			}));
			continue;
		}
		const cFor = text.match(/^for\s*\((?:[^;]*;)?\s*([A-Za-z_]\w*)\s*(?::=|=)\s*([^;]+);\s*\1\s*<\s*([^;]+);[^)]*\)\s*\{?$/);
		if (cFor) {
			const body = takeBraces(lines, i, text.includes("{"));
			if (!text.includes("{")) i += body.length;
			else i += Math.max(0, body.length - 1);
			const from = Number(evaluate(cFor[2], scope));
			const to = Number(evaluate(cFor[3], scope));
			const cap = Math.min(40, Math.max(0, to - from));
			for (let n = 0; n < cap; n++) out.push(...execBlock(body, 0, {
				...scope,
				[cFor[1]]: from + n
			}));
			continue;
		}
		if (/^if\b/.test(text) && (text.endsWith(":") || text.endsWith("{"))) {
			const chain = takeIf(lines, i);
			i += chain.consumed - 1;
			let ran = false;
			for (const clause of chain.clauses) if (clause.kind === "else" || !ran && truthy(evaluate(clause.test || "false", scope))) {
				out.push(...execBlock(clause.body, 0, { ...scope }));
				ran = true;
				break;
			}
			continue;
		}
		const assigned = matchAssign(text);
		if (assigned) {
			try {
				scope[assigned.name] = evaluate(assigned.expr, scope);
			} catch {}
			continue;
		}
		const printed = matchPrint(text, scope);
		if (printed != null) out.push(printed);
	}
	return out;
}
function takeIndented(lines, from, parent) {
	const body = [];
	for (let i = from; i < lines.length; i++) {
		if (!lines[i].text) {
			body.push(lines[i]);
			continue;
		}
		if (lines[i].indent <= parent) break;
		body.push(lines[i]);
	}
	while (body.length && !body[body.length - 1].text) body.pop();
	return body;
}
function takeBraces(lines, index, opened) {
	if (!opened) return takeIndented(lines, index + 1, lines[index].indent);
	const body = [];
	let depth = countChar(lines[index].text, "{") - countChar(lines[index].text, "}");
	for (let i = index + 1; i < lines.length && depth > 0; i++) {
		depth += countChar(lines[i].text, "{");
		const close = countChar(lines[i].text, "}");
		if (close) depth -= close;
		if (!(lines[i].text === "}" && depth === 0)) body.push(lines[i]);
		if (depth <= 0) break;
	}
	return body;
}
function takeIf(lines, index) {
	const clauses = [];
	let i = index;
	while (i < lines.length) {
		const text = stripTrail(lines[i].text);
		const head = text.match(/^(if|elif|else if|else)\b\s*([\s\S]*?)(?::|\{)?$/);
		if (!head && clauses.length) break;
		if (!head) break;
		const kind = head[1] === "else" ? "else" : head[1] === "if" && clauses.length === 0 ? "if" : "elif";
		let test = head[2].replace(/[:{]\s*$/, "").trim();
		if (test.endsWith(":")) test = test.slice(0, -1).trim();
		const inline = text.match(/:\s*(.+)$/);
		let body = [];
		let consumedLines = 1;
		if (inline && !text.endsWith(":") && kind !== "else") body = [{
			indent: lines[i].indent + 2,
			text: inline[1]
		}];
		else if (text.includes("{")) {
			body = takeBraces(lines, i, true);
			consumedLines += body.length + 1;
		} else {
			body = takeIndented(lines, i + 1, lines[i].indent);
			consumedLines += body.length;
		}
		clauses.push({
			kind,
			test: kind === "else" ? void 0 : test,
			body
		});
		i += consumedLines;
		if (i >= lines.length) break;
		const next = lines[i].text;
		if (!/^(elif|else\b|else if)\b/.test(next)) break;
	}
	return {
		clauses,
		consumed: Math.max(1, i - index)
	};
}
function matchAssign(text) {
	if (text.includes("==") || /^(if|for|while|else|elif|return|import|package|class|func|fn|def|struct)\b/.test(text)) return null;
	const typed = text.match(/^(?:let|const|var|val|int|auto|string|number|double|float)\s+([A-Za-z_]\w*)\s*(?::\s*[^=]+)?=(.+)$/);
	if (typed) return {
		name: typed[1],
		expr: typed[2]
	};
	const plain = text.match(/^([A-Za-z_]\w*)\s*(?::=|=)\s*(.+)$/);
	if (plain && !plain[2].trim().startsWith("=")) return {
		name: plain[1],
		expr: plain[2]
	};
	return null;
}
function matchPrint(text, scope) {
	const cout = text.match(/(?:std::)?cout\s*<<\s*(.+?)(?:\s*<<\s*std::endl)?/);
	if (cout && !cout[1].includes("<<")) try {
		return String(evaluate(cout[1].replace(/;+\s*$/, ""), scope));
	} catch {
		return null;
	}
	const rust = text.match(/println!\s*\(([\s\S]*?)\)/);
	if (rust) return formatRust(rust[1], scope);
	const bare = text.match(/^(?:echo|puts)\s+(.+)$/);
	if (bare && !bare[1].startsWith("(")) try {
		return String(evaluate(bare[1], scope));
	} catch {
		return bare[1].replace(/^["']|["']$/g, "");
	}
	for (const name of [
		"System.out.println",
		"fmt.Println",
		"fmt.Print",
		"console.log",
		"console.error",
		"println",
		"printf",
		"print",
		"echo",
		"puts"
	]) {
		const idx = text.indexOf(name + "(");
		if (idx < 0) continue;
		const prev = idx === 0 ? "" : text[idx - 1];
		if (/[A-Za-z0-9_]/.test(prev)) continue;
		const inside = balanced(text.slice(idx + name.length));
		if (inside == null) continue;
		try {
			if (name === "printf") return formatPrintf(inside, scope);
			return splitArgs(inside).map((part) => String(evaluate(part, scope))).join(" ");
		} catch {
			return null;
		}
	}
	return null;
}
function formatRust(inside, scope) {
	const args = splitArgs(inside);
	if (!args.length) return "";
	let template = String(evaluate(args[0], scope));
	for (const arg of args.slice(1)) template = template.replace("{}", String(evaluate(arg, scope)));
	return template;
}
function formatPrintf(inside, scope) {
	const args = splitArgs(inside);
	if (!args.length) return "";
	let template = String(evaluate(args[0], scope));
	let n = 1;
	template = template.replace(/%[sdif]/g, () => String(evaluate(args[n++] ?? "\"\"", scope)));
	return template;
}
function rangeValues(arg, scope) {
	const parts = splitArgs(arg).map((part) => Number(evaluate(part, scope)));
	const out = [];
	if (parts.length <= 1) {
		const n = parts[0] || 0;
		for (let i = 0; i < Math.min(40, n); i++) out.push(i);
		return out;
	}
	const start = parts[0];
	const end = parts[1];
	const step = parts[2] || (end >= start ? 1 : -1);
	if (!step) return out;
	for (let i = start; step > 0 ? i < end : i > end; i += step) {
		out.push(i);
		if (out.length >= 40) break;
	}
	return out;
}
function truthy(value) {
	return !(value === false || value === null || value === "" || value === 0);
}
function stripTrail(text) {
	return text.replace(/;+\s*$/, "").trim();
}
function countChar(text, ch) {
	let n = 0;
	for (const c of text) if (c === ch) n++;
	return n;
}
function balanced(source) {
	if (!source.startsWith("(")) return null;
	let depth = 0;
	let quote = null;
	for (let i = 0; i < source.length; i++) {
		const ch = source[i];
		if (quote) {
			if (ch === "\\") {
				i++;
				continue;
			}
			if (ch === quote) quote = null;
			continue;
		}
		if (ch === "\"" || ch === "'") quote = ch;
		else if (ch === "(") depth++;
		else if (ch === ")") {
			depth--;
			if (depth === 0) return source.slice(1, i);
		}
	}
	return null;
}
function splitArgs(source) {
	const args = [];
	let quote = null;
	let depth = 0;
	let start = 0;
	for (let i = 0; i < source.length; i++) {
		const ch = source[i];
		if (quote) {
			if (ch === "\\") {
				i++;
				continue;
			}
			if (ch === quote) quote = null;
			continue;
		}
		if (ch === "\"" || ch === "'") quote = ch;
		else if (ch === "(") depth++;
		else if (ch === ")") depth--;
		else if (ch === "," && depth === 0) {
			args.push(source.slice(start, i).trim());
			start = i + 1;
		}
	}
	const last = source.slice(start).trim();
	if (last) args.push(last);
	return args;
}
function evaluate(input, scope) {
	const s = input.trim().replace(/;+\s*$/, "");
	let i = 0;
	function skip() {
		while (s[i] === " " || s[i] === "\n" || s[i] === "	") i++;
	}
	function parseOr() {
		let left = parseAnd();
		skip();
		while (s.slice(i, i + 2) === "or" && !/[A-Za-z0-9_]/.test(s[i + 2] ?? "")) {
			i += 2;
			const right = parseAnd();
			left = truthy(left) || truthy(right);
		}
		while (s.slice(i, i + 2) === "||") {
			i += 2;
			const right = parseAnd();
			left = truthy(left) || truthy(right);
		}
		return left;
	}
	function parseAnd() {
		let left = parseCmp();
		skip();
		while (s.slice(i, i + 3) === "and" && !/[A-Za-z0-9_]/.test(s[i + 3] ?? "")) {
			i += 3;
			const right = parseCmp();
			left = truthy(left) && truthy(right);
		}
		while (s.slice(i, i + 2) === "&&") {
			i += 2;
			const right = parseCmp();
			left = truthy(left) && truthy(right);
		}
		return left;
	}
	function parseCmp() {
		let left = parseAdd();
		skip();
		for (const op of [
			"==",
			"!=",
			"<=",
			">=",
			"<",
			">"
		]) if (s.slice(i, i + op.length) === op) {
			i += op.length;
			const right = parseAdd();
			if (op === "==") return left === right;
			if (op === "!=") return left !== right;
			const a = Number(left);
			const b = Number(right);
			if (op === "<") return a < b;
			if (op === ">") return a > b;
			if (op === "<=") return a <= b;
			return a >= b;
		}
		return left;
	}
	function parseAdd() {
		let left = parseMul();
		skip();
		while (s[i] === "+" || s[i] === "-") {
			const op = s[i++];
			const right = parseMul();
			if (op === "+") {
				if (typeof left === "number" && typeof right === "number") left = left + right;
				else left = String(left) + String(right);
			} else if (typeof left === "number" && typeof right === "number") left = left - right;
		}
		return left;
	}
	function parseMul() {
		let left = parseUnary();
		skip();
		while (s[i] === "*" || s[i] === "/" || s[i] === "%") {
			const op = s[i++];
			const right = Number(parseUnary());
			const base = Number(left);
			if (op === "*") left = base * right;
			else if (op === "/") left = right === 0 ? 0 : base / right;
			else left = right === 0 ? 0 : base % right;
		}
		return left;
	}
	function parseUnary() {
		skip();
		if (s.slice(i, i + 3) === "not" && !/[A-Za-z0-9_]/.test(s[i + 3] ?? "")) {
			i += 3;
			return !truthy(parseUnary());
		}
		if (s[i] === "!") {
			i++;
			return !truthy(parseUnary());
		}
		if (s[i] === "-") {
			i++;
			return -Number(parseUnary());
		}
		return parsePrimary();
	}
	function parsePrimary() {
		skip();
		if (s[i] === "(") {
			i++;
			const value = parseOr();
			skip();
			if (s[i] === ")") i++;
			return value;
		}
		if (s[i] === "\"" || s[i] === "'") return readString();
		if (s[i] === "f" && (s[i + 1] === "\"" || s[i + 1] === "'")) {
			i++;
			return readFString();
		}
		if (/[0-9]/.test(s[i] ?? "")) {
			const start = i;
			while (/[0-9.]/.test(s[i] ?? "")) i++;
			return Number(s.slice(start, i));
		}
		if (/[A-Za-z_]/.test(s[i] ?? "")) {
			const start = i;
			while (/[A-Za-z0-9_]/.test(s[i] ?? "")) i++;
			const name = s.slice(start, i);
			skip();
			if (s[i] === "(") {
				const inside = balanced(s.slice(i)) ?? "";
				i += inside.length + 2;
				return callFn(name, inside, scope);
			}
			if (name === "true" || name === "True") return true;
			if (name === "false" || name === "False") return false;
			if (name === "null" || name === "None" || name === "nil") return null;
			if (name in scope) return scope[name];
			return name;
		}
		return null;
	}
	function readString() {
		const q = s[i++];
		let out = "";
		while (i < s.length && s[i] !== q) {
			if (s[i] === "\\") {
				i++;
				out += s[i] ?? "";
			} else out += s[i];
			i++;
		}
		i++;
		return out;
	}
	function readFString() {
		return readString().replace(/\{([^{}]+)\}/g, (_, expr) => String(evaluate(expr, scope)));
	}
	return parseOr();
}
function callFn(name, args, scope) {
	const parts = splitArgs(args).map((part) => evaluate(part, scope));
	if (name === "str" || name === "String") return parts.length ? String(parts[0]) : "";
	if (name === "int" || name === "len" || name === "length") {
		if (name === "len" || name === "length") return String(parts[0] ?? "").length;
		return Number.parseInt(String(parts[0] ?? "0"), 10) || 0;
	}
	if (name === "upper") return String(parts[0] ?? "").toUpperCase();
	if (name === "lower") return String(parts[0] ?? "").toLowerCase();
	return null;
}
var PAGE = (body, extra = "") => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100%; background: #111012; color: #f4f4f5; font: 16px/1.45 Inter, system-ui, sans-serif; }
  main { padding: 28px 22px 48px; }
  .k { color: #ec9a4a; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; font-weight: 700; }
  h1 { font-size: 34px; line-height: 1.05; letter-spacing: -.03em; margin: 8px 0 16px; }
  .card { border: 1px solid #2d2c2f; background: #1a191b; border-radius: 22px; padding: 16px; margin: 0 0 12px; }
  .card b { display: block; margin-bottom: 4px; }
  .card p { margin: 0; color: #8e8d93; font-size: 14px; }
  .cta { display: inline-flex; margin-top: 8px; background: #f4f4f5; color: #111012; border-radius: 999px; padding: 10px 16px; font-weight: 700; font-size: 14px; }
  pre, code { font: 13px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; }
  ${extra}
</style></head><body>${body}</body></html>`;
function buildPreview(lang, code) {
	try {
		if (lang === "html") return {
			srcdoc: wrapHtml(code),
			detail: "Rendered in the device",
			ok: true
		};
		if (lang === "css") return {
			srcdoc: `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${code}</style></head><body><main><div class="kicker">CSS</div><h1>Sample screen</h1><article class="card"><b>Card</b><p>Your stylesheet paints this surface.</p><span class="cta">Continue</span></article></main></body></html>`,
			detail: "Styles applied to the sample screen",
			ok: true
		};
		if (lang === "svg") return {
			srcdoc: PAGE(`<main style="display:grid;place-items:center;min-height:100vh">${code}</main>`),
			detail: "SVG drawn in the device",
			ok: true
		};
		if (lang === "md") return {
			srcdoc: PAGE(`<main>${markdown(code)}</main>`),
			detail: "Markdown rendered",
			ok: true
		};
		if (lang === "json") try {
			return {
				srcdoc: PAGE(`<main><p class="k">JSON</p><pre>${escapeHtml(JSON.stringify(JSON.parse(code), null, 2))}</pre></main>`),
				detail: "Parsed",
				ok: true
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : "Invalid JSON";
			return {
				srcdoc: PAGE(`<main><p class="k">JSON</p><pre style="color:#e0524e">${escapeHtml(message)}</pre></main>`),
				detail: message,
				ok: false
			};
		}
		if (lang === "js" || lang === "ts") return scriptPreview(lang, code);
		if (lang === "jsx" || lang === "tsx") return jsxPreview(lang, code);
		return runnerPreview(lang, code);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Could not build a preview";
		return {
			srcdoc: PAGE(`<main><p class="k">Preview</p><pre style="color:#e0524e">${escapeHtml(message)}</pre></main>`),
			detail: message,
			ok: false
		};
	}
}
function wrapHtml(code) {
	const trimmed = code.trim();
	if (/^<!doctype/i.test(trimmed) || /^<html/i.test(trimmed)) {
		if (!/viewport/i.test(trimmed)) return trimmed.replace(/<head([^>]*)>/i, "<head$1><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
		return trimmed;
	}
	return PAGE(trimmed);
}
function scriptPreview(lang, code) {
	let source = code;
	if (lang === "ts") source = transform(code, {
		transforms: ["typescript"],
		disableESTransforms: true
	}).code;
	return {
		srcdoc: `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>
    body{margin:0;background:#111012;color:#f4f4f5;font:16px/1.45 Inter,system-ui,sans-serif}
    #app{padding:28px 22px} .k{color:#ec9a4a;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700}
    h1{font-size:34px;letter-spacing:-.03em;margin:8px 0 16px} .card{border:1px solid #2d2c2f;background:#1a191b;border-radius:22px;padding:16px;margin:0 0 12px}
    .card p{color:#8e8d93;margin:6px 0 0} #__o{padding:0 22px 24px;white-space:pre-wrap;font:12px/1.5 ui-monospace,monospace;color:#8e8d93}
  </style></head><body><div id="app"></div><pre id="__o"></pre><script>
    const o=document.getElementById("__o");
    const w=(p,a)=>{o.textContent+=p+a.map(x=>{try{return typeof x==="object"?JSON.stringify(x):String(x)}catch(e){return String(x)}}).join(" ")+"\\n"};
    console.log=(...a)=>w("",a); console.error=(...a)=>w("error: ",a);
    addEventListener("error",e=>w("error: ",[e.message]));
  <\/script><script>${source.replace(/<\/script/gi, "<\\/script")}<\/script></body></html>`,
		detail: lang === "ts" ? "TypeScript running in the device" : "JavaScript running in the device",
		ok: true
	};
}
function jsxPreview(lang, code) {
	return {
		srcdoc: `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body,#root{margin:0;min-height:100%;background:#111012}</style></head><body><div id="root"></div>
<script type="module">
import React from "https://esm.sh/react@19.2.0";
import { createRoot } from "https://esm.sh/react-dom@19.2.0/client";
${transform(code, {
			transforms: lang === "tsx" ? ["typescript", "jsx"] : ["jsx"],
			jsxRuntime: "classic",
			production: true,
			disableESTransforms: true
		}).code.replace(/<\/script/gi, "<\\/script")}
const Root = typeof App !== "undefined" ? App : null;
if (!Root) {
  document.getElementById("root").innerHTML = '<p style="color:#f4f4f5;font:15px system-ui;padding:24px">Export a function named App to render it.</p>';
} else {
  createRoot(document.getElementById("root")).render(React.createElement(Root));
}
<\/script></body></html>`,
		detail: "Component compiled for the device",
		ok: true
	};
}
function runnerPreview(lang, code) {
	const result = runSource(lang, code);
	if (result.rows) {
		const head = result.rows.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
		const body = result.rows.data.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("");
		return {
			srcdoc: PAGE(`<main><p class="k">SQL · local</p><h1>${escapeHtml(result.detail)}</h1><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></main>`, "table{width:100%;border-collapse:collapse} th,td{text-align:left;padding:12px 10px;border-bottom:1px solid #2d2c2f} th{color:#8e8d93;font-size:12px;letter-spacing:.08em;text-transform:uppercase}"),
			detail: result.detail,
			ok: result.status === "ran"
		};
	}
	if (result.ui.length) {
		const cards = result.ui.map((line, index) => index === 0 ? `<h1>${escapeHtml(line)}</h1>` : `<article class="card"><b>${escapeHtml(line)}</b></article>`).join("");
		const log = result.stdout ? `<pre>${escapeHtml(result.stdout)}</pre>` : "";
		return {
			srcdoc: PAGE(`<main><p class="k">${escapeHtml(lang)} · build</p>${cards}${log}</main>`),
			detail: result.detail,
			ok: result.status === "ran"
		};
	}
	const tone = result.status === "error" ? "#e0524e" : "#5ec06e";
	const label = result.status === "error" ? "Failed" : "Succeeded";
	return {
		srcdoc: PAGE(`<main><p class="k">${escapeHtml(lang)} · on device</p><h1 style="font-size:22px">Build <span style="color:${tone}">${label}</span></h1><pre>${escapeHtml(result.stdout || result.detail)}</pre></main>`),
		detail: result.detail,
		ok: result.status === "ran"
	};
}
function markdown(source) {
	return escapeHtml(source).replace(/^### (.*)$/gm, "<h3>$1</h3>").replace(/^## (.*)$/gm, "<h2>$1</h2>").replace(/^# (.*)$/gm, "<h1>$1</h1>").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>").replace(/^- (.*)$/gm, "<li>$1</li>").replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`).replace(/\n{2,}/g, "<br><br>");
}
function escapeHtml(value) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;"
	};
	return value.replace(/[&<>"]/g, (ch) => map[ch] ?? ch);
}
var DEVICES = [
	{
		id: "se",
		label: "iPhone SE",
		detail: "375 × 667",
		screenW: 375,
		screenH: 667,
		bezel: 12,
		radius: 32,
		island: false,
		kind: "phone"
	},
	{
		id: "iphone",
		label: "iPhone",
		detail: "393 × 852",
		screenW: 393,
		screenH: 852,
		bezel: 12,
		radius: 46,
		island: true,
		kind: "phone"
	},
	{
		id: "max",
		label: "iPhone Pro Max",
		detail: "430 × 932",
		screenW: 430,
		screenH: 932,
		bezel: 12,
		radius: 48,
		island: true,
		kind: "phone"
	},
	{
		id: "ipad-mini",
		label: "iPad mini",
		detail: "744 × 1024",
		screenW: 744,
		screenH: 1024,
		bezel: 18,
		radius: 28,
		island: false,
		kind: "tablet"
	},
	{
		id: "ipad",
		label: "iPad Pro",
		detail: "834 × 1112",
		screenW: 834,
		screenH: 1112,
		bezel: 18,
		radius: 26,
		island: false,
		kind: "tablet"
	},
	{
		id: "tablet",
		label: "Tablet",
		detail: "1024 × 768",
		screenW: 1024,
		screenH: 768,
		bezel: 16,
		radius: 20,
		island: false,
		kind: "tablet"
	},
	{
		id: "desktop",
		label: "Desktop",
		detail: "1280 × 800",
		screenW: 1280,
		screenH: 800,
		bezel: 0,
		radius: 12,
		island: false,
		kind: "desktop"
	},
	{
		id: "full",
		label: "Full screen",
		detail: "Edge to edge",
		screenW: 0,
		screenH: 0,
		bezel: 0,
		radius: 0,
		island: false,
		kind: "full"
	}
];
function deviceById(id) {
	return DEVICES.find((item) => item.id === id) ?? DEVICES[1];
}
function PreviewStage({ srcdoc, detail }) {
	const viewport = useOrbit().viewport;
	const spec = deviceById(viewport);
	const host = (0, import_react.useRef)(null);
	const [box, setBox] = (0, import_react.useState)({
		w: 320,
		h: 520
	});
	(0, import_react.useEffect)(() => {
		const el = host.current;
		if (!el) return;
		const apply = () => setBox({
			w: el.clientWidth,
			h: el.clientHeight
		});
		apply();
		const watcher = new ResizeObserver(apply);
		watcher.observe(el);
		return () => watcher.disconnect();
	}, []);
	const outerW = spec.kind === "desktop" ? spec.screenW : spec.screenW + spec.bezel * 2;
	const outerH = spec.kind === "desktop" ? spec.screenH + 36 : spec.screenH + spec.bezel * 2;
	const scale = spec.kind === "full" ? 1 : Math.max(.12, Math.min((box.w - 20) / outerW, (box.h - 12) / outerH));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: host,
			className: "grid min-h-0 flex-1 place-items-center overflow-hidden px-3 py-2",
			children: spec.kind === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: "Full screen preview",
				sandbox: "allow-scripts",
				srcDoc: srcdoc,
				className: "h-full w-full border-0 bg-white"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: outerW * scale,
					height: outerH * scale
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						width: outerW,
						height: outerH,
						transform: `scale(${scale})`,
						transformOrigin: "top left"
					},
					children: spec.kind === "desktop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopFrame, {
						spec,
						srcdoc
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handset, {
						spec,
						srcdoc
					})
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "truncate px-4 pb-1 text-center text-xs text-muted",
			children: detail
		})]
	});
}
function Handset({ spec, srcdoc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-bezel shadow-2xl",
		style: {
			width: spec.screenW + spec.bezel * 2,
			height: spec.screenH + spec.bezel * 2,
			borderRadius: spec.radius + 10,
			padding: spec.bezel
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-full overflow-hidden bg-ink",
			style: { borderRadius: spec.radius },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: `${spec.label} preview`,
					sandbox: "allow-scripts",
					srcDoc: srcdoc,
					className: "absolute inset-0 h-full w-full border-0 bg-white"
				}),
				spec.island ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute top-2 left-1/2 h-7 w-28 -translate-x-1/2 rounded-full bg-ink" }) : null,
				spec.kind === "phone" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-fg/70" }) : null
			]
		})
	});
}
function DesktopFrame({ spec, srcdoc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden bg-bezel shadow-2xl",
		style: {
			width: spec.screenW,
			height: spec.screenH + 36,
			borderRadius: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-9 items-center gap-1.5 px-3 text-bezel-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-danger" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-accent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-ok" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-xs",
					children: "Preview"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: "Desktop preview",
			sandbox: "allow-scripts",
			srcDoc: srcdoc,
			className: "border-0 bg-white",
			style: {
				width: spec.screenW,
				height: spec.screenH
			}
		})]
	});
}
function CodeView() {
	const orbit = useOrbit();
	const toast = useToast();
	const [wide, setWide] = (0, import_react.useState)(false);
	const [ask, setAsk] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [compare, setCompare] = (0, import_react.useState)(false);
	const [providerId, setProviderId] = (0, import_react.useState)("");
	const dirty = (0, import_react.useRef)(false);
	const code = orbit.code();
	const meta = langMeta(orbit.lang);
	const connected = PROVIDERS.filter((item) => orbit.keys[item.id]);
	const reference = [...orbit.nodes].reverse().find((node) => node.src && (node.kind === "image" || node.kind === "ref"));
	(0, import_react.useEffect)(() => {
		const query = window.matchMedia("(min-width: 960px)");
		const apply = () => setWide(query.matches);
		apply();
		query.addEventListener("change", apply);
		return () => query.removeEventListener("change", apply);
	}, []);
	(0, import_react.useEffect)(() => {
		return onCmd((cmd) => {
			if (cmd === "new-file") {
				orbit.checkpoint();
				orbit.setCode(STARTERS[orbit.lang]);
				toast("Starter restored.");
			}
			if (cmd === "run") toast(meta.hint);
			if (cmd === "ask") document.getElementById("orbit-ask")?.focus();
		});
	}, [
		orbit,
		meta.hint,
		toast
	]);
	const preview = (0, import_react.useMemo)(() => buildPreview(orbit.lang, code), [orbit.lang, code]);
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
				provider: orbit.offline ? void 0 : chosen,
				key: chosen ? orbit.keys[chosen.id] : void 0,
				model: chosen ? orbit.modelNames[chosen.id] || chosen.model : void 0
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
				model: result.model
			});
			toast(result.provider === "orbit" ? `Wrote with the ${result.model} pack.` : "Provider replied. Review it, then keep or undo.");
		} catch (error) {
			toast(error instanceof Error ? error.message : "Generation failed.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto px-3 py-2",
			role: "tablist",
			"aria-label": "Languages",
			children: LANGS.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "pill",
				"data-on": orbit.lang === lang.id,
				onClick: () => orbit.setLang(lang.id),
				children: [lang.label, lang.group === "runner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tag tag-run",
					children: "runner"
				}) : null]
			}, lang.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(mo, {
			orientation: wide ? "horizontal" : "vertical",
			className: "min-h-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(yo, {
					minSize: "28%",
					defaultSize: "50%",
					className: "min-h-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full min-h-0 flex-col gap-2 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold",
									children: "Editor"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tag",
									children: meta.hint
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "field min-h-0 flex-1 resize-none font-mono text-sm",
								spellCheck: false,
								"aria-label": "Source code",
								value: code,
								onChange: (event) => {
									if (!dirty.current) {
										orbit.checkpoint();
										dirty.current = true;
									}
									orbit.setCode(event.target.value);
								},
								onBlur: () => {
									dirty.current = false;
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "cta",
									onClick: () => orbit.commit({
										kind: "save",
										message: `Saved ${meta.label}`
									}),
									children: "Save version"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "pill",
									onClick: () => {
										orbit.checkpoint();
										orbit.setCode(STARTERS[orbit.lang]);
										toast("Starter restored.");
									},
									children: "Reset file"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm text-muted",
								htmlFor: "orbit-ask",
								children: "Ask"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "orbit-ask",
								className: "field",
								rows: 2,
								placeholder: `Describe a ${meta.label} screen…`,
								value: ask,
								onChange: (event) => setAsk(event.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "field",
									"aria-label": "Provider",
									value: orbit.offline ? "device" : providerId || connected[0]?.id || "device",
									onChange: (event) => setProviderId(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "device",
										children: "On-device pack"
									}), connected.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.id,
										children: item.name
									}, item.id))]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "cta shrink-0",
									disabled: busy,
									onClick: () => void generate(),
									children: busy ? "Writing…" : "Generate"
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(xo, { className: wide ? "w-2 bg-line" : "h-2 bg-line" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(yo, {
					minSize: "28%",
					className: "min-h-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full min-h-0 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 overflow-x-auto px-3 pt-2",
							"aria-label": "Viewport",
							children: [DEVICES.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "pill",
								"data-on": orbit.viewport === device.id,
								onClick: () => orbit.setViewport(device.id),
								children: device.label
							}, device.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "pill",
								"data-on": compare,
								disabled: !reference,
								onClick: () => setCompare((value) => !value),
								children: "Compare"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-0 flex-1",
							children: [compare && reference?.src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: reference.src,
								alt: "Reference screenshot",
								className: "w-1/2 object-contain bg-ink"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewStage, {
								srcdoc: preview.srcdoc,
								detail: preview.ok ? preview.detail : preview.detail
							})]
						})]
					})
				})
			]
		})]
	});
}
function KeysView() {
	const orbit = useOrbit();
	const toast = useToast();
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-0 flex-1 overflow-auto px-3 pt-3 pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Bring your own key. It stays in this browser and is sent only to the provider you pick, through Orbit."
			}),
			orbit.offline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "card mb-3 px-3 py-2 text-sm",
				children: "Offline mode is on. Generation uses an on-device pack."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: PROVIDERS.map((provider) => {
					const saved = Boolean(orbit.keys[provider.id]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "card disclosure",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1",
								children: provider.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: saved ? "tag tag-ok" : "tag",
								children: saved ? "Saved" : "No key"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chevron, {})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 px-3 pb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm text-muted",
									htmlFor: `model-${provider.id}`,
									children: "Model"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: `model-${provider.id}`,
									className: "field",
									value: orbit.modelNames[provider.id] ?? provider.model,
									onChange: (event) => orbit.setModelName(provider.id, event.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "cta",
										onClick: () => setOpen(provider),
										children: saved ? "Update key" : "Get key"
									}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "pill",
										onClick: () => {
											orbit.setKey(provider.id, "");
											toast(`${provider.name} key removed.`);
										},
										children: "Remove"
									}) : null]
								})
							]
						})]
					}, provider.id);
				})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeySheet, {
				provider: open,
				onClose: () => setOpen(null)
			}) : null
		]
	});
}
function KeySheet({ provider, onClose }) {
	const orbit = useOrbit();
	const toast = useToast();
	const [value, setValue] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("Stored on this device only.");
	const [busy, setBusy] = (0, import_react.useState)(false);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "scrim",
		"aria-label": "Close",
		onClick: onClose
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sheet",
		"data-open": "true",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "key-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-2 mb-3 h-1.5 w-10 rounded-full bg-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-auto px-4 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "key-title",
					className: "text-lg font-semibold",
					children: [
						"Get a ",
						provider.name,
						" key"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 flex flex-col gap-3",
					children: provider.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-6 shrink-0 place-items-center rounded-full bg-raised text-xs",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step })]
					}, step))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "pill mt-3 justify-center",
					href: provider.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: ["Open ", provider.host]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mt-3",
					type: "password",
					autoComplete: "off",
					"aria-label": "API key",
					placeholder: "Paste key",
					value,
					onChange: (event) => setValue(event.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill",
						onClick: () => {
							navigator.clipboard.readText().then((text) => setValue(text.trim())).catch(() => setNote("Clipboard blocked. Paste into the field."));
						},
						children: "Paste"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "cta flex-1",
						disabled: busy,
						onClick: () => void save(),
						children: "Test and save"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: note
				})
			]
		})]
	})] });
}
function Chevron() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "chev size-5",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 9l6 6 6-6" })
	});
}
var PACKS = [
	{
		id: "nano",
		name: "Nano",
		copy: "One block. Short screens and quick edits."
	},
	{
		id: "coder",
		name: "Coder",
		copy: "Two blocks. Components and short scripts."
	},
	{
		id: "studio",
		name: "Studio",
		copy: "The full on-device writer. Deepest of the three."
	}
];
function ModelsView() {
	const orbit = useOrbit();
	const toast = useToast();
	const [pending, setPending] = (0, import_react.useState)(null);
	function enable(id) {
		setPending(id);
		window.setTimeout(() => {
			orbit.setPack(id, true);
			setPending(null);
			toast(`${PACKS.find((pack) => pack.id === id)?.name} is ready on this device.`);
		}, 500);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-0 flex-1 overflow-auto px-3 pt-3 pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card mb-3 p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Offline mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "When on, only an enabled pack answers. No prompt leaves this browser."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill",
						"data-on": orbit.offline,
						"aria-pressed": orbit.offline,
						onClick: () => orbit.setOffline(!orbit.offline),
						children: orbit.offline ? "On" : "Off"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "These packs are built into Orbit. They are not downloaded foundation models, and they do not invent pixel-perfect clones. They write from your prompt plus any measurements you pass in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: PACKS.map((pack) => {
					const on = orbit.packs[pack.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "card p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "flex-1",
									children: pack.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: on ? "tag tag-ok" : "tag",
									children: on ? "On device" : "Built in"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: pack.copy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "pill",
									onClick: () => {
										orbit.setPack(pack.id, false);
										toast(`${pack.name} removed from this project.`);
									},
									children: "Remove"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "cta",
									disabled: pending === pack.id,
									onClick: () => enable(pack.id),
									children: pending === pack.id ? "Preparing…" : "Enable"
								})
							})
						]
					}, pack.id);
				})
			})
		]
	});
}
function TreeView() {
	const orbit = useOrbit();
	const toast = useToast();
	const [name, setName] = (0, import_react.useState)("");
	const commits = orbit.commits.filter((item) => item.treeId === orbit.activeTree);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-0 flex-1 overflow-auto px-3 pt-3 pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "px-4 pt-3 text-sm font-semibold",
						children: "Worktrees"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 p-3",
						children: orbit.trees.map((tree) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "pill",
							"data-on": tree.id === orbit.activeTree,
							onClick: () => orbit.switchTree(tree.id),
							children: tree.name
						}, tree.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2 px-3 pb-3",
						onSubmit: (event) => {
							event.preventDefault();
							orbit.newTree(name);
							setName("");
							toast("Worktree branched from the current files.");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							"aria-label": "New worktree name",
							placeholder: "Branch name",
							value: name,
							onChange: (event) => setName(event.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "cta shrink-0",
							children: "Branch"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-4 pt-3 text-sm font-semibold",
					children: "Files"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col p-2",
					children: LANGS.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-h-11 items-center justify-between rounded-md px-2 text-left",
						onClick: () => {
							orbit.setLang(lang.id);
							orbit.setTab("code");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [".", lang.ext]
						})]
					}, lang.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-4 pt-3 text-sm font-semibold",
					children: "History"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 p-3",
					children: [commits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Save a version to start history. Undo still works before you save."
					}) : null, commits.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "card px-3 py-2 text-left",
						onClick: () => {
							orbit.checkpoint();
							orbit.restore(entry.id);
							toast("Restored that version into the editor.");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: entry.message
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-xs text-muted",
							children: [
								entry.kind,
								" · ",
								entry.lang,
								" · ",
								formatDistanceToNow(entry.at, { addSuffix: true })
							]
						})]
					}, entry.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "px-4 pt-3 text-sm font-semibold",
					children: "Generations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 p-3",
					children: [orbit.generations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Every AI reply lands here with its prompt."
					}) : null, orbit.generations.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "card px-3 py-2 text-left",
						onClick: () => {
							orbit.checkpoint();
							orbit.openGeneration(entry.id);
							toast("Opened that generation.");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "line-clamp-2 font-semibold",
							children: entry.prompt || "Generation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-xs text-muted",
							children: [
								entry.provider,
								" · ",
								entry.model
							]
						})]
					}, entry.id))]
				})]
			})
		]
	});
}
var TABS = [
	{
		id: "canvas",
		label: "Canvas",
		icon: Frame
	},
	{
		id: "code",
		label: "Code",
		icon: CodeXml
	},
	{
		id: "tree",
		label: "Tree",
		icon: GitBranch
	},
	{
		id: "keys",
		label: "Keys",
		icon: KeyRound
	},
	{
		id: "models",
		label: "Models",
		icon: Cpu
	}
];
function Shell() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {}) });
}
function Studio() {
	const orbit = useOrbit();
	const toast = useToast();
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [dial, setDial] = (0, import_react.useState)(false);
	const title = TABS.find((tab) => tab.id === orbit.tab)?.label ?? "Orbit";
	const connected = PROVIDERS.filter((item) => orbit.keys[item.id]).length;
	const pack = bestPack(orbit.packs);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key === "Escape") {
				setMenu(false);
				setDial(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	function command(cmd) {
		setDial(false);
		if (cmd === "import" || cmd === "library" || cmd === "insert") orbit.setTab("canvas");
		if (cmd === "new-file" || cmd === "run" || cmd === "ask") orbit.setTab("code");
		window.setTimeout(() => emitCmd(cmd), 0);
	}
	function downloadExport() {
		const text = `ORBIT STUDIO EXPORT\n\n${Object.entries(orbit.files()).map(([lang, source]) => `== ${lang} ==\n${source}`).join("\n\n")}\n\n== tokens ==\n${orbit.tokens.map((token) => `${token.name}: ${token.value}`).join("\n")}\n\n== css ==\n${`:root {\n${orbit.tokens.map((token) => `  --${token.name}: ${token.value};`).join("\n")}\n}`}\n`;
		const link = document.createElement("a");
		link.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
		link.download = "orbit-export.txt";
		link.click();
		URL.revokeObjectURL(link.href);
		toast("Project exported.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio",
		"data-immersive": orbit.immersive,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "studio-head flex items-center gap-1 border-b border-line px-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": "Open menu",
						onClick: () => {
							setDial(false);
							setMenu(true);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "flex-1 text-center text-base font-semibold tracking-tight",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": "Undo",
						disabled: !orbit.canUndo,
						onClick: () => orbit.undo(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": "Redo",
						disabled: !orbit.canRedo,
						onClick: () => orbit.redo(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Redo2, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "header-fab",
						"aria-label": "Quick actions",
						"data-on": dial,
						onClick: () => setDial((open) => !open),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 20 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "studio-body",
				children: [
					orbit.tab === "canvas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasView, {}) : null,
					orbit.tab === "code" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeView, {}) : null,
					orbit.tab === "tree" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreeView, {}) : null,
					orbit.tab === "keys" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeysView, {}) : null,
					orbit.tab === "models" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModelsView, {}) : null,
					orbit.immersive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill absolute top-3 right-3 z-10",
						onClick: () => orbit.setImmersive(false),
						children: "Exit focus"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dock",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Sections",
					children: TABS.map((tab) => {
						const Icon = tab.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-on": orbit.tab === tab.id,
							"aria-current": orbit.tab === tab.id ? "page" : void 0,
							onClick: () => orbit.setTab(tab.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), tab.label]
						}, tab.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "fab",
					"aria-label": "Quick actions",
					"aria-expanded": dial,
					"data-on": dial,
					onClick: () => setDial((open) => !open),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 22 })
				})]
			}),
			dial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dial",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill",
						onClick: () => command("import"),
						children: "Import screenshot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill",
						onClick: () => command("library"),
						children: "Open study"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill",
						onClick: () => command("insert"),
						children: "Insert element"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill",
						onClick: () => command("new-file"),
						children: "New file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill",
						onClick: () => command("ask"),
						children: "Ask AI"
					})
				]
			}) : null,
			menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "scrim",
				"aria-label": "Close menu",
				onClick: () => setMenu(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "drawer",
				"data-open": "true",
				"aria-label": "Menu",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold tracking-tight",
						children: "Orbit Studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 mb-4 text-sm text-muted",
						children: "Design, preview, and keep every generation on this device."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card mb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "px-3 pt-3 text-sm font-semibold",
								children: "Tokens"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2 p-3",
								children: orbit.tokens.map((token) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-11 rounded-md border border-line",
									style: { background: token.value },
									"aria-label": `${token.name} ${token.value}`,
									onClick: () => {
										navigator.clipboard.writeText(token.value).catch(() => void 0);
										toast(`${token.value} copied`);
									}
								}, token.value))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 pb-3 text-xs text-muted",
								children: "Tap a colour to copy its hex."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card mb-3 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							children: "Readiness"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 flex flex-col gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Storage." }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: orbit.hydrated ? "Saved in this browser." : "Opening storage…"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Inspection." }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: "Import, zoom, crop, measure, and sample are on the canvas."
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Writer." }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: pack ? `${pack} pack enabled.` : "Enable a pack under Models."
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Provider." }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: connected ? `${connected} key saved on device.` : "Optional. Add one under Keys."
									})
								] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "pill mb-2 w-full justify-center",
						onClick: () => {
							orbit.setImmersive(true);
							setMenu(false);
						},
						children: "Focus canvas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "cta w-full",
						onClick: downloadExport,
						children: "Export project"
					})
				]
			})] }) : null
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}) });
}
//#endregion
export { Home as component };
