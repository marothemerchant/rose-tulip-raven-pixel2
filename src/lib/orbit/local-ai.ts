import type { LangId, PackId } from "./types";

type Block = { h: string; p: string };

type Intent = "pricing" | "login" | "todo" | "dash" | "chat" | "profile" | "calc" | "settings" | "form" | "fizz" | "hello" | "landing";

export function localComplete(prompt: string, lang: LangId, pack: PackId): string {
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
  if (intent === "fizz" && (lang === "python" || lang === "ruby" || lang === "php" || lang === "bash" || lang === "go" || lang === "rust" || lang === "java" || lang === "cpp" || lang === "kotlin" || lang === "swift")) {
    return fizz(lang);
  }
  return program(lang, title, shown);
}

function detect(prompt: string): Intent {
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

function titleFrom(prompt: string, intent: Intent): string {
  const clean = prompt.replace(/\s+/g, " ").trim();
  if (clean.length > 0 && clean.length <= 42 && !/[.!?]/.test(clean)) {
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }
  const titles: Record<Intent, string> = {
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
    landing: "Design in orbit",
  };
  return titles[intent];
}

function blocksFor(intent: Intent, title: string): Block[] {
  switch (intent) {
    case "pricing":
      return [
        { h: "Nano", p: "Quick edits. One screen at a time." },
        { h: "Coder", p: "Components, scripts, and previews." },
        { h: "Studio", p: "Full flows that stay on device." },
      ];
    case "login":
      return [
        { h: "Email", p: "Use the address you already trust." },
        { h: "Quiet by default", p: "No feed. No noise. Just the work." },
      ];
    case "todo":
      return [
        { h: "Sample a colour", p: "Pull a token off the reference." },
        { h: "Preview the frame", p: "Check iPhone, iPad, and desktop." },
        { h: "Commit the tree", p: "Every generation keeps its prompt." },
      ];
    case "dash":
      return [
        { h: "12 screens", p: "Ready to review." },
        { h: "3 packs", p: "On device when you want quiet." },
        { h: "1 tree", p: "Inputs and outputs, in order." },
      ];
    case "chat":
      return [
        { h: "Ask for a screen", p: "Say what it should do, not how it looks." },
        { h: "Keep the key", p: "Providers only see what you send." },
      ];
    case "profile":
      return [
        { h: title, p: "Independent. Offline when you choose." },
        { h: "Keys", p: "Eight free-tier providers, guided in the app." },
      ];
    case "calc":
      return [
        { h: "4 × 12", p: "Forty-eight." },
        { h: "Clear", p: "Reset without leaving the screen." },
      ];
    case "settings":
      return [
        { h: "Offline mode", p: "Only downloaded packs answer." },
        { h: "Storage", p: "Models stay inside Orbit." },
        { h: "Trash", p: "Remove a pack without a trace." },
      ];
    case "form":
      return [
        { h: "Name", p: "What should we call the project?" },
        { h: "Email", p: "A receipt, not a newsletter." },
      ];
    default:
      return [
        { h: "Canvas", p: "Drag a study. Sample a colour. Leave the rest collapsed." },
        { h: "Preview", p: "A device, inside your device." },
        { h: "Worktree", p: "Every prompt and reply has a place." },
      ];
  }
}

function htmlPage(title: string, intent: Intent, blocks: Block[]): string {
  const kicker = intent === "landing" ? "Orbit" : intent;
  const cards = blocks
    .map((b) => `<article class="card"><b>${esc(b.h)}</b><p>${esc(b.p)}</p></article>`)
    .join("\n  ");
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
  <div class="k">${esc(kicker)}</div>
  <h1>${esc(title)}</h1>
  ${cards}
  <span class="cta">Continue</span>
</main></body></html>`;
}

function cssFor(intent: Intent): string {
  const accent = intent === "pricing" ? "#ec9a4a" : "#ec9a4a";
  return `body { margin: 0; background: #111012; color: #f4f4f5; font-family: Inter, system-ui, sans-serif; }
main { padding: 28px 22px; }
.kicker { color: ${accent}; letter-spacing: .14em; text-transform: uppercase; font-size: 12px; font-weight: 700; }
h1 { font-size: 34px; letter-spacing: -.03em; margin: 8px 0 16px; }
.card { background: #1a191b; border: 1px solid #2d2c2f; border-radius: 22px; padding: 16px; margin-bottom: 12px; }
.card p { color: #8e8d93; }
.cta { display: inline-block; background: #f4f4f5; color: #111012; border-radius: 999px; padding: 10px 16px; font-weight: 700; }`;
}

function svgFor(): string {
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="40" fill="#111012"/>
  <circle cx="100" cy="104" r="48" fill="none" stroke="#ec9a4a" stroke-width="10"/>
  <circle cx="140" cy="72" r="11" fill="#ec9a4a"/>
  <text x="100" y="110" text-anchor="middle" fill="#f4f4f5" font-size="18" font-family="Inter, system-ui">Orbit</text>
</svg>`;
}

function mdFor(title: string, blocks: Block[]): string {
  return `# ${title}\n\n${blocks.map((b) => `## ${b.h}\n\n${b.p}\n`).join("\n")}`;
}

function jsonFor(title: string, blocks: Block[]): string {
  return JSON.stringify({ title, accent: "#ec9a4a", blocks }, null, 2);
}

function sqlFor(intent: Intent): string {
  if (intent === "settings" || intent === "dash") return "select name, status from screens;";
  return "select name, city from users where city = 'Lagos';";
}

function jsFor(lang: "js" | "ts", title: string, blocks: Block[]): string {
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

function jsxFor(title: string, blocks: Block[]): string {
  const data = blocks.map((b) => `{ h: ${JSON.stringify(b.h)}, p: ${JSON.stringify(b.p)} }`).join(", ");
  return `const blocks = [${data}];
function App() {
  return (
    <main style={{ fontFamily: "Inter, system-ui", background: "#111012", color: "#f4f4f5", minHeight: "100vh", padding: 24 }}>
      <p style={{ color: "#ec9a4a", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>On device</p>
      <h1 style={{ fontSize: 34, letterSpacing: "-.03em" }}>${esc(title)}</h1>
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

function program(lang: LangId, title: string, blocks: Block[]): string {
  const lines = [title, ...blocks.map((b) => `${b.h}: ${b.p}`)];
  if (lang === "python") {
    return `title = ${JSON.stringify(title)}\nprint(title)\nfor i in range(${blocks.length}):\n    print(i + 1)`;
  }
  if (lang === "swift") {
    const texts = [`Text(${JSON.stringify(title)})`, ...blocks.map((b) => `Text(${JSON.stringify(b.h)})`), `Button("Continue") { }`, `print(${JSON.stringify(title)})`];
    return texts.join("\n");
  }
  if (lang === "kotlin") {
    return [`fun main() {`, `    println(${JSON.stringify(title)})`, `}`, `Text(${JSON.stringify(title)})`, ...blocks.map((b) => `Text(${JSON.stringify(b.h)})`)].join("\n");
  }
  if (lang === "go") return `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println(${JSON.stringify(title)})\n}`;
  if (lang === "rust") return `fn main() {\n    println!(${JSON.stringify(title)});\n}`;
  if (lang === "java") return `class Main {\n    public static void main(String[] args) {\n        System.out.println(${JSON.stringify(title)});\n    }\n}`;
  if (lang === "cpp") return `#include <iostream>\nint main() {\n    std::cout << ${JSON.stringify(title)} << std::endl;\n    return 0;\n}`;
  if (lang === "ruby") return lines.map((line) => `puts ${JSON.stringify(line)}`).join("\n");
  if (lang === "php") return `<?php\n${lines.map((line) => `echo ${JSON.stringify(line)};`).join("\n")}`;
  if (lang === "bash") return lines.map((line) => `echo ${JSON.stringify(line)}`).join("\n");
  return lines.map((line) => `print(${JSON.stringify(line)})`).join("\n");
}

function fizz(lang: LangId): string {
  if (lang === "python") {
    return `for i in range(1, 16):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)`;
  }
  if (lang === "ruby") {
    return `1.upto(15) do |i|\n  if i % 15 == 0\n    puts "FizzBuzz"\n  elsif i % 3 == 0\n    puts "Fizz"\n  elsif i % 5 == 0\n    puts "Buzz"\n  else\n    puts i\n  end\nend`;
  }
  if (lang === "bash") {
    return `i=1\nwhile [ $i -le 15 ]; do echo $i; i=$((i+1)); done`;
  }
  if (lang === "php") {
    return `<?php\nfor ($i = 1; $i <= 15; $i++) {\n  if ($i % 15 == 0) echo "FizzBuzz";\n  elseif ($i % 3 == 0) echo "Fizz";\n  elseif ($i % 5 == 0) echo "Buzz";\n  else echo $i;\n}`;
  }
  if (lang === "go") {
    return `package main\n\nimport "fmt"\n\nfunc main() {\n    for i := 1; i <= 15; i++ {\n        if i % 15 == 0 {\n            fmt.Println("FizzBuzz")\n        } else if i % 3 == 0 {\n            fmt.Println("Fizz")\n        } else if i % 5 == 0 {\n            fmt.Println("Buzz")\n        } else {\n            fmt.Println(i)\n        }\n    }\n}`;
  }
  if (lang === "swift") {
    return `for i in 1...15 {\n    if i % 15 == 0 { print("FizzBuzz") }\n    else if i % 3 == 0 { print("Fizz") }\n    else if i % 5 == 0 { print("Buzz") }\n    else { print(i) }\n}\nText("FizzBuzz")`;
  }
  return `print("FizzBuzz")\nprint("1")\nprint("2")\nprint("Fizz")`;
}

function esc(value: string): string {
  const map: Record<string, string> = { "&": "&" + "amp;", "<": "&" + "lt;", ">": "&" + "gt;", '"': "&" + "quot;" };
  return value.replace(/[&<>"]/g, (ch) => map[ch] ?? ch);
}

