export type ColorShare = { hex: string; share: string };

export type Band = {
  name: string;
  y: number;
  height: number;
  share: string;
  confidence: "estimate";
};

export type ImageRead = {
  width: number;
  height: number;
  colors: ColorShare[];
  bands: Band[];
  summary: string;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image."));
    img.src = src;
  });
}

function hex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function lum(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastNote(value: string): string {
  const match = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (!match) return "Not a 6-digit hex.";
  const n = parseInt(match[1], 16);
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const L = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  const ink = 0.006;
  const paper = 0.91;
  const onInk = (Math.max(L, ink) + 0.05) / (Math.min(L, ink) + 0.05);
  const onPaper = (Math.max(L, paper) + 0.05) / (Math.min(L, paper) + 0.05);
  const better = onInk >= onPaper ? `about ${onInk.toFixed(1)}:1 on ink` : `about ${onPaper.toFixed(1)}:1 on paper`;
  return `${better} (sRGB estimate)`;
}

export async function analyzeImage(src: string): Promise<ImageRead> {
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

  const buckets = new Map<string, number>();
  const rowLum: number[] = [];
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
  const colors = [...buckets.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([color, count]) => ({ hex: color, share: `${Math.round((count / total) * 100)}%` }));

  const median = [...rowLum].sort((a, b) => a - b)[Math.floor(rowLum.length / 2)] ?? 0;
  const cls = rowLum.map((value) => (value < median - 14 ? 0 : value > median + 14 ? 2 : 1));
  const raw: { start: number; end: number; kind: number }[] = [];
  for (let i = 0; i < cls.length; i++) {
    const last = raw[raw.length - 1];
    if (!last || last.kind !== cls[i]) raw.push({ start: i, end: i + 1, kind: cls[i] });
    else last.end = i + 1;
  }
  const minRows = Math.max(2, Math.round(sampleH * 0.035));
  const merged: typeof raw = [];
  for (const band of raw) {
    const prev = merged[merged.length - 1];
    if (prev && band.end - band.start < minRows) prev.end = band.end;
    else merged.push({ ...band });
  }

  const names = ["Dark band", "Mid band", "Light band"];
  const bands: Band[] = merged.map((band, index) => {
    const y = Math.round((band.start / sampleH) * height);
    const bottom = Math.round((band.end / sampleH) * height);
    const bandH = Math.max(1, bottom - y);
    const share = `${Math.round((bandH / height) * 100)}%`;
    let name = names[band.kind] ?? "Band";
    if (index === 0 && bandH / height < 0.2) name = "Top chrome";
    else if (index === merged.length - 1 && bandH / height < 0.24) name = "Bottom chrome";
    else if (bandH / height > 0.35) name = "Content";
    return { name, y, height: bandH, share, confidence: "estimate" };
  });

  return {
    width,
    height,
    colors,
    bands,
    summary: "Bands are estimates from row luminance, not a trained component detector. Colours are quantised samples.",
  };
}

export function formatRead(read: ImageRead): string {
  const colors = read.colors.map((c) => `${c.hex} (${c.share})`).join(", ");
  const bands = read.bands.map((b) => `- ${b.name}: y ${b.y}px, height ${b.height}px, ${b.share} — estimate`).join("\n");
  return `Screenshot ${read.width}×${read.height} px (measured).\nColours by sampled share: ${colors}.\nLayout bands:\n${bands}\n${read.summary}`;
}

export async function shrinkDataUrl(src: string, maxEdge = 768): Promise<string> {
  const img = await loadImage(src);
  const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not shrink the image.");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let quality = 0.72;
  let url = canvas.toDataURL("image/jpeg", quality);
  while (url.length > 850_000 && quality > 0.4) {
    quality -= 0.12;
    url = canvas.toDataURL("image/jpeg", quality);
  }
  return url;
}

export function sampleHex(img: HTMLImageElement, clientX: number, clientY: number): { hex: string; x: number; y: number } {
  const rect = img.getBoundingClientRect();
  const x = Math.min(img.naturalWidth - 1, Math.max(0, Math.floor(((clientX - rect.left) / rect.width) * img.naturalWidth)));
  const y = Math.min(img.naturalHeight - 1, Math.max(0, Math.floor(((clientY - rect.top) / rect.height) * img.naturalHeight)));
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not sample.");
  ctx.drawImage(img, 0, 0);
  const px = ctx.getImageData(x, y, 1, 1).data;
  return { hex: hex(px[0], px[1], px[2]), x, y };
}
