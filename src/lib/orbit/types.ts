export type LangId =
  | "html"
  | "css"
  | "js"
  | "jsx"
  | "ts"
  | "tsx"
  | "svg"
  | "md"
  | "json"
  | "sql"
  | "python"
  | "swift"
  | "kotlin"
  | "go"
  | "rust"
  | "cpp"
  | "java"
  | "ruby"
  | "php"
  | "bash";

export type TabId = "canvas" | "code" | "tree" | "keys" | "models";

export type ViewportId =
  | "se"
  | "iphone"
  | "max"
  | "ipad-mini"
  | "ipad"
  | "tablet"
  | "desktop"
  | "full";

export type PackId = "nano" | "coder" | "studio";

export type NodeKind =
  | "heading"
  | "text"
  | "button"
  | "pill"
  | "card"
  | "field"
  | "composer"
  | "nav"
  | "segment"
  | "row"
  | "note"
  | "swatch"
  | "frame"
  | "image"
  | "ref";

export type CanvasNode = {
  id: string;
  kind: NodeKind;
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  sub: string;
  color: string;
  refId?: string;
  src?: string;
};

export type TokenColor = { name: string; value: string };

export type Generation = {
  id: string;
  at: number;
  treeId: string;
  lang: LangId;
  provider: string;
  model: string;
  prompt: string;
  output: string;
};

export type Commit = {
  id: string;
  at: number;
  treeId: string;
  kind: "save" | "generate" | "restore" | "import";
  message: string;
  lang: LangId;
  files: Partial<Record<LangId, string>>;
  prompt?: string;
  output?: string;
  provider?: string;
  model?: string;
};

export type Worktree = {
  id: string;
  name: string;
  files: Record<LangId, string>;
};

export type OrbitState = {
  tab: TabId;
  lang: LangId;
  viewport: ViewportId;
  immersive: boolean;
  offline: boolean;
  activeTree: string;
  trees: Worktree[];
  commits: Commit[];
  generations: Generation[];
  nodes: CanvasNode[];
  tokens: TokenColor[];
  keys: Record<string, string>;
  modelNames: Record<string, string>;
  packs: Record<PackId, boolean>;
};
