import { transform } from "sucrase";
import type { LangId } from "./types";
import { runSource } from "./runner";

const PAGE = (body: string, extra = "") => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>
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

export type PreviewBuild = { srcdoc: string; detail: string; ok: boolean };

export function buildPreview(lang: LangId, code: string): PreviewBuild {
  try {
    if (lang === "html") return { srcdoc: wrapHtml(code), detail: "Rendered in the device", ok: true };
    if (lang === "css") {
      return {
        srcdoc: `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${code}</style></head><body><main><div class="kicker">CSS</div><h1>Sample screen</h1><article class="card"><b>Card</b><p>Your stylesheet paints this surface.</p><span class="cta">Continue</span></article></main></body></html>`,
        detail: "Styles applied to the sample screen",
        ok: true,
      };
    }
    if (lang === "svg") {
      return {
        srcdoc: PAGE(`<main style="display:grid;place-items:center;min-height:100vh">${code}</main>`),
        detail: "SVG drawn in the device",
        ok: true,
      };
    }
    if (lang === "md") return { srcdoc: PAGE(`<main>${markdown(code)}</main>`), detail: "Markdown rendered", ok: true };
    if (lang === "json") {
      try {
        const pretty = JSON.stringify(JSON.parse(code), null, 2);
        return { srcdoc: PAGE(`<main><p class="k">JSON</p><pre>${escapeHtml(pretty)}</pre></main>`), detail: "Parsed", ok: true };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Invalid JSON";
        return { srcdoc: PAGE(`<main><p class="k">JSON</p><pre style="color:#e0524e">${escapeHtml(message)}</pre></main>`), detail: message, ok: false };
      }
    }
    if (lang === "js" || lang === "ts") return scriptPreview(lang, code);
    if (lang === "jsx" || lang === "tsx") return jsxPreview(lang, code);
    return runnerPreview(lang, code);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not build a preview";
    return { srcdoc: PAGE(`<main><p class="k">Preview</p><pre style="color:#e0524e">${escapeHtml(message)}</pre></main>`), detail: message, ok: false };
  }
}

function wrapHtml(code: string): string {
  const trimmed = code.trim();
  if (/^<!doctype/i.test(trimmed) || /^<html/i.test(trimmed)) {
    if (!/viewport/i.test(trimmed)) {
      return trimmed.replace(/<head([^>]*)>/i, '<head$1><meta name="viewport" content="width=device-width, initial-scale=1">');
    }
    return trimmed;
  }
  return PAGE(trimmed);
}

function scriptPreview(lang: "js" | "ts", code: string): PreviewBuild {
  let source = code;
  if (lang === "ts") source = transform(code, { transforms: ["typescript"], disableESTransforms: true }).code;
  const safe = source.replace(/<\/script/gi, "<\\/script");
  const srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>
    body{margin:0;background:#111012;color:#f4f4f5;font:16px/1.45 Inter,system-ui,sans-serif}
    #app{padding:28px 22px} .k{color:#ec9a4a;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700}
    h1{font-size:34px;letter-spacing:-.03em;margin:8px 0 16px} .card{border:1px solid #2d2c2f;background:#1a191b;border-radius:22px;padding:16px;margin:0 0 12px}
    .card p{color:#8e8d93;margin:6px 0 0} #__o{padding:0 22px 24px;white-space:pre-wrap;font:12px/1.5 ui-monospace,monospace;color:#8e8d93}
  </style></head><body><div id="app"></div><pre id="__o"></pre><script>
    const o=document.getElementById("__o");
    const w=(p,a)=>{o.textContent+=p+a.map(x=>{try{return typeof x==="object"?JSON.stringify(x):String(x)}catch(e){return String(x)}}).join(" ")+"\\n"};
    console.log=(...a)=>w("",a); console.error=(...a)=>w("error: ",a);
    addEventListener("error",e=>w("error: ",[e.message]));
  <\/script><script>${safe}<\/script></body></html>`;
  return { srcdoc, detail: lang === "ts" ? "TypeScript running in the device" : "JavaScript running in the device", ok: true };
}

function jsxPreview(lang: "jsx" | "tsx", code: string): PreviewBuild {
  const js = transform(code, {
    transforms: lang === "tsx" ? ["typescript", "jsx"] : ["jsx"],
    jsxRuntime: "classic",
    production: true,
    disableESTransforms: true,
  }).code.replace(/<\/script/gi, "<\\/script");
  const srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body,#root{margin:0;min-height:100%;background:#111012}</style></head><body><div id="root"></div>
<script type="module">
import React from "https://esm.sh/react@19.2.0";
import { createRoot } from "https://esm.sh/react-dom@19.2.0/client";
${js}
const Root = typeof App !== "undefined" ? App : null;
if (!Root) {
  document.getElementById("root").innerHTML = '<p style="color:#f4f4f5;font:15px system-ui;padding:24px">Export a function named App to render it.</p>';
} else {
  createRoot(document.getElementById("root")).render(React.createElement(Root));
}
<\/script></body></html>`;
  return { srcdoc, detail: "Component compiled for the device", ok: true };
}

function runnerPreview(lang: LangId, code: string): PreviewBuild {
  const result = runSource(lang, code);
  if (result.rows) {
    const head = result.rows.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
    const body = result.rows.data
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
      .join("");
    return {
      srcdoc: PAGE(`<main><p class="k">SQL · local</p><h1>${escapeHtml(result.detail)}</h1><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></main>`,
        "table{width:100%;border-collapse:collapse} th,td{text-align:left;padding:12px 10px;border-bottom:1px solid #2d2c2f} th{color:#8e8d93;font-size:12px;letter-spacing:.08em;text-transform:uppercase}"),
      detail: result.detail,
      ok: result.status === "ran",
    };
  }
  if (result.ui.length) {
    const cards = result.ui
      .map((line, index) =>
        index === 0
          ? `<h1>${escapeHtml(line)}</h1>`
          : `<article class="card"><b>${escapeHtml(line)}</b></article>`,
      )
      .join("");
    const log = result.stdout ? `<pre>${escapeHtml(result.stdout)}</pre>` : "";
    return {
      srcdoc: PAGE(`<main><p class="k">${escapeHtml(lang)} · build</p>${cards}${log}</main>`),
      detail: result.detail,
      ok: result.status === "ran",
    };
  }
  const tone = result.status === "error" ? "#e0524e" : "#5ec06e";
  const label = result.status === "error" ? "Failed" : "Succeeded";
  return {
    srcdoc: PAGE(`<main><p class="k">${escapeHtml(lang)} · on device</p><h1 style="font-size:22px">Build <span style="color:${tone}">${label}</span></h1><pre>${escapeHtml(result.stdout || result.detail)}</pre></main>`),
    detail: result.detail,
    ok: result.status === "ran",
  };
}

function markdown(source: string): string {
  const html = escapeHtml(source)
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^- (.*)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n{2,}/g, "<br><br>");
  return html;
}

function escapeHtml(value: string): string {
  const map: Record<string, string> = { "&": "&" + "amp;", "<": "&" + "lt;", ">": "&" + "gt;", '"': "&" + "quot;" };
  return value.replace(/[&<>"]/g, (ch) => map[ch] ?? ch);
}

