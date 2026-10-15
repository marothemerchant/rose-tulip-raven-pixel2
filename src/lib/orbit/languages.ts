import type { LangId } from "./types";

export type LangMeta = {
  id: LangId;
  label: string;
  group: "device" | "runner";
  ext: string;
  hint: string;
};

export const LANGS: LangMeta[] = [
  { id: "html", label: "HTML", group: "device", ext: "html", hint: "Renders in the device" },
  { id: "css", label: "CSS", group: "device", ext: "css", hint: "Styles the sample screen" },
  { id: "js", label: "JavaScript", group: "device", ext: "js", hint: "Runs in the device" },
  { id: "jsx", label: "JSX", group: "device", ext: "jsx", hint: "Compiled, then rendered" },
  { id: "ts", label: "TypeScript", group: "device", ext: "ts", hint: "Types stripped, then run" },
  { id: "tsx", label: "TSX", group: "device", ext: "tsx", hint: "Compiled, then rendered" },
  { id: "svg", label: "SVG", group: "device", ext: "svg", hint: "Drawn in the device" },
  { id: "md", label: "Markdown", group: "device", ext: "md", hint: "Rendered as a page" },
  { id: "json", label: "JSON", group: "device", ext: "json", hint: "Parsed and pretty printed" },
  { id: "sql", label: "SQL", group: "device", ext: "sql", hint: "Queried on a local database" },
  { id: "python", label: "Python", group: "runner", ext: "py", hint: "On-device runner" },
  { id: "swift", label: "Swift", group: "runner", ext: "swift", hint: "UI strings and prints" },
  { id: "kotlin", label: "Kotlin", group: "runner", ext: "kt", hint: "UI strings and prints" },
  { id: "go", label: "Go", group: "runner", ext: "go", hint: "Build log and stdout" },
  { id: "rust", label: "Rust", group: "runner", ext: "rs", hint: "Build log and stdout" },
  { id: "cpp", label: "C++", group: "runner", ext: "cpp", hint: "Build log and stdout" },
  { id: "java", label: "Java", group: "runner", ext: "java", hint: "Build log and stdout" },
  { id: "ruby", label: "Ruby", group: "runner", ext: "rb", hint: "On-device runner" },
  { id: "php", label: "PHP", group: "runner", ext: "php", hint: "On-device runner" },
  { id: "bash", label: "Shell", group: "runner", ext: "sh", hint: "Echo and variables" },
];

export function langMeta(id: LangId): LangMeta {
  return LANGS.find((l) => l.id === id) ?? LANGS[0];
}

const shell = (title: string, kicker: string, body: string) => `<!doctype html>
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

export const STARTERS: Record<LangId, string> = {
  html: shell(
    "Design in orbit.",
    "Studio",
    `<article class="card"><b>Canvas</b><p>Drop studies, sample a colour, keep the chrome quiet.</p></article>
<article class="card"><b>Preview</b><p>Every language renders inside the device frame.</p></article>
<span class="cta">Open a file</span>`,
  ),
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
  bash: `echo "Orbit Studio"`,
};

export function emptyFiles(): Record<LangId, string> {
  return { ...STARTERS };
}
