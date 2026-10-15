import type { CanvasNode } from "./types";

function esc(value: string): string {
  const map: Record<string, string> = { "&": "&" + "amp;", "<": "&" + "lt;", ">": "&" + "gt;", '"': "&" + "quot;" };
  return value.replace(/[&<>"]/g, (ch) => map[ch] ?? ch);
}


export function canvasToHtml(nodes: CanvasNode[]): string {
  const maxX = nodes.reduce((m, n) => Math.max(m, n.x + n.w), 390);
  const maxY = nodes.reduce((m, n) => Math.max(m, n.y + n.h), 700);
  const body = nodes
    .map((node) => {
      const box = `position:absolute;left:${Math.round(node.x)}px;top:${Math.round(node.y)}px;width:${Math.round(node.w)}px;height:${Math.round(node.h)}px;`;
      if ((node.kind === "image" || node.kind === "ref") && node.src && node.src.length < 120_000) {
        return `<img alt="${esc(node.text || "Reference")}" src="${esc(node.src)}" style="${box}object-fit:cover;border-radius:16px">`;
      }
      if (node.kind === "image" || node.kind === "ref") {
        return `<div style="${box}border:1px dashed #2d2c2f;border-radius:16px;display:grid;place-items:center;color:#8e8d93;font:13px system-ui">Image omitted (too large to inline)</div>`;
      }
      if (node.kind === "button") return `<a style="${box}display:grid;place-items:center;background:#f4f4f5;color:#111012;border-radius:999px;font:600 14px system-ui;text-decoration:none">${esc(node.text)}</a>`;
      if (node.kind === "pill" || node.kind === "segment") return `<span style="${box}display:grid;place-items:center;background:#242326;color:#f4f4f5;border-radius:999px;font:14px system-ui">${esc(node.text)}</span>`;
      if (node.kind === "card") return `<article style="${box}box-sizing:border-box;background:#1a191b;border:1px solid #2d2c2f;border-radius:22px;padding:14px;font:15px/1.4 system-ui;color:#f4f4f5"><b>${esc(node.text)}</b><p style="margin:6px 0 0;color:#8e8d93">${esc(node.sub)}</p></article>`;
      if (node.kind === "field" || node.kind === "composer") return `<div style="${box}box-sizing:border-box;border:1px solid #2d2c2f;border-radius:${node.kind === "composer" ? "999px" : "10px"};padding:12px 14px;color:#8e8d93;font:15px system-ui">${esc(node.text)}</div>`;
      if (node.kind === "swatch") return `<div style="${box}border-radius:16px;background:${esc(node.color || node.text || "#ec9a4a")}"></div>`;
      if (node.kind === "frame") return `<div style="${box}box-sizing:border-box;border:10px solid #eceae6;border-radius:36px"></div>`;
      if (node.kind === "heading") return `<h1 style="${box}margin:0;font:600 28px/1.1 system-ui;letter-spacing:-.03em;color:#f4f4f5">${esc(node.text)}</h1>`;
      if (node.kind === "nav") return `<nav style="${box}display:flex;align-items:center;justify-content:space-around;background:#1a191b;border:1px solid #2d2c2f;border-radius:24px;color:#8e8d93;font:12px system-ui">${esc(node.text)}</nav>`;
      return `<p style="${box}margin:0;color:${node.kind === "note" ? "#ec9a4a" : "#f4f4f5"};font:14px/1.4 system-ui">${esc(node.text)}</p>`;
    })
    .join("\n  ");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Orbit canvas</title>
<style>body{margin:0;background:#111012} .stage{position:relative;width:${Math.ceil(maxX)}px;height:${Math.ceil(maxY)}px}</style>
</head><body><div class="stage">
  ${body}
</div></body></html>`;
}
