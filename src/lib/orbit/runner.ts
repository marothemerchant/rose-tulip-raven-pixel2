export type RunResult = {
  stdout: string;
  rows?: { columns: string[]; data: string[][] };
  ui: string[];
  status: "ran" | "error";
  detail: string;
};

type Value = string | number | boolean | null;

const USERS = [
  { id: "1", name: "Ada", city: "Lagos" },
  { id: "2", name: "Lin", city: "Accra" },
  { id: "3", name: "Noor", city: "Cairo" },
];

const SCREENS = [
  { id: "1", name: "Canvas", status: "ready" },
  { id: "2", name: "Preview", status: "live" },
  { id: "3", name: "Worktree", status: "saved" },
];

const TABLES: Record<string, Record<string, string>[]> = {
  users: USERS,
  screens: SCREENS,
};

export function runSource(lang: string, code: string): RunResult {
  if (lang === "sql") return runSql(code);
  const ui = extractUi(code);
  try {
    const lines = toLines(code, lang);
    const stdout = execBlock(lines, 0, {}).join("\n");
    const detail = stdout
      ? `Ran on device · ${stdout.split("\n").length} line${stdout.includes("\n") ? "s" : ""}`
      : ui.length
        ? "Built the interface strings in this file"
        : "Parsed · no print or echo to show";
    return { stdout, ui, status: "ran", detail };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Runner failed";
    return { stdout: "", ui, status: "error", detail: message };
  }
}

function runSql(code: string): RunResult {
  const match = code.match(/select\s+([\s\S]+?)\s+from\s+([a-z_][\w]*)\s*(?:where\s+([\s\S]+?))?(?:order\s+by[\s\S]+?)?;?\s*$/i);
  if (!match) {
    return { stdout: "", ui: [], status: "error", detail: "Use SELECT … FROM users or screens." };
  }
  const table = TABLES[match[2].toLowerCase()];
  if (!table) {
    return { stdout: "", ui: [], status: "error", detail: `No table “${match[2]}”. Try users or screens.` };
  }
  const star = match[1].trim() === "*";
  const columns = star ? Object.keys(table[0] ?? {}) : match[1].split(",").map((c) => c.trim()).filter(Boolean);
  let rows = table;
  if (match[3]) {
    const where = match[3].trim().replace(/;$/, "");
    const cond = where.match(/^([a-z_][\w]*)\s*=\s*['"]?([^'"]+)['"]?$/i);
    if (!cond) return { stdout: "", ui: [], status: "error", detail: "WHERE supports column = value." };
    rows = rows.filter((row) => String(row[cond[1]] ?? "") === cond[2]);
  }
  const data = rows.map((row) => columns.map((col) => String(row[col] ?? "")));
  const stdout = [columns.join(" · "), ...data.map((r) => r.join(" · "))].join("\n");
  return {
    stdout,
    rows: { columns, data },
    ui: [],
    status: "ran",
    detail: `${data.length} row${data.length === 1 ? "" : "s"} · local database`,
  };
}

function extractUi(code: string): string[] {
  const found: string[] = [];
  const re = /\b(?:Text|Button|Label|TextView|Headline|Title)\s*\(\s*(?:text\s*[:=]\s*)?["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) found.push(m[1]);
  return found.slice(0, 8);
}

type Line = { indent: number; text: string };

function toLines(code: string, lang: string): Line[] {
  const cleaned = code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  return cleaned.split("\n").map((raw) => {
    const indent = raw.match(/^\s*/)?.[0].length ?? 0;
    let text = raw.trim();
    if (lang === "python" || lang === "ruby" || lang === "bash" || lang === "php") {
      if (text.startsWith("#")) text = "";
    } else if (text.startsWith("//")) text = "";
    if (lang === "sql" && text.startsWith("--")) text = "";
    return { indent, text };
  });
}

function execBlock(lines: Line[], startIndent: number, scope: Record<string, Value>): string[] {
  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const text = stripTrail(line.text);
    if (!text) continue;

    const pyFor = text.match(/^for\s+([A-Za-z_]\w*)\s+in\s+range\s*\(([\s\S]+)\)\s*:$/);
    if (pyFor) {
      const body = takeIndented(lines, i + 1, line.indent);
      i += body.length;
      const values = rangeValues(pyFor[2], scope);
      for (const value of values) {
        out.push(...execBlock(body, line.indent + 1, { ...scope, [pyFor[1]]: value }));
      }
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
      for (let n = 0; n < cap; n++) {
        out.push(...execBlock(body, 0, { ...scope, [cFor[1]]: from + n }));
      }
      continue;
    }

    if (/^if\b/.test(text) && (text.endsWith(":") || text.endsWith("{"))) {
      const chain = takeIf(lines, i);
      i += chain.consumed - 1;
      let ran = false;
      for (const clause of chain.clauses) {
        if (clause.kind === "else" || (!ran && truthy(evaluate(clause.test || "false", scope)))) {
          out.push(...execBlock(clause.body, 0, { ...scope }));
          ran = true;
          break;
        }
      }
      continue;
    }

    const assigned = matchAssign(text);
    if (assigned) {
      try {
        scope[assigned.name] = evaluate(assigned.expr, scope);
      } catch {
        /* keep going — declarations without a value */
      }
      continue;
    }

    const printed = matchPrint(text, scope);
    if (printed != null) out.push(printed);
  }
  void startIndent;
  return out;
}

function takeIndented(lines: Line[], from: number, parent: number): Line[] {
  const body: Line[] = [];
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

function takeBraces(lines: Line[], index: number, opened: boolean): Line[] {
  if (!opened) return takeIndented(lines, index + 1, lines[index].indent);
  const body: Line[] = [];
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

type Clause = { kind: "if" | "elif" | "else"; test?: string; body: Line[] };

function takeIf(lines: Line[], index: number): { clauses: Clause[]; consumed: number } {
  const clauses: Clause[] = [];
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
    let body: Line[] = [];
    let consumedLines = 1;
    if (inline && !text.endsWith(":") && kind !== "else") {
      body = [{ indent: lines[i].indent + 2, text: inline[1] }];
    } else if (text.includes("{")) {
      body = takeBraces(lines, i, true);
      consumedLines += body.length + 1;
    } else {
      body = takeIndented(lines, i + 1, lines[i].indent);
      consumedLines += body.length;
    }
    clauses.push({ kind, test: kind === "else" ? undefined : test, body });
    i += consumedLines;
    if (i >= lines.length) break;
    const next = lines[i].text;
    if (!/^(elif|else\b|else if)\b/.test(next)) break;
  }
  return { clauses, consumed: Math.max(1, i - index) };
}

function matchAssign(text: string): { name: string; expr: string } | null {
  if (text.includes("==") || /^(if|for|while|else|elif|return|import|package|class|func|fn|def|struct)\b/.test(text)) {
    return null;
  }
  const typed = text.match(/^(?:let|const|var|val|int|auto|string|number|double|float)\s+([A-Za-z_]\w*)\s*(?::\s*[^=]+)?=(.+)$/);
  if (typed) return { name: typed[1], expr: typed[2] };
  const plain = text.match(/^([A-Za-z_]\w*)\s*(?::=|=)\s*(.+)$/);
  if (plain && !plain[2].trim().startsWith("=")) return { name: plain[1], expr: plain[2] };
  return null;
}

function matchPrint(text: string, scope: Record<string, Value>): string | null {
  const cout = text.match(/(?:std::)?cout\s*<<\s*(.+?)(?:\s*<<\s*std::endl)?/);
  if (cout && !cout[1].includes("<<")) {
    try {
      return String(evaluate(cout[1].replace(/;+\s*$/, ""), scope));
    } catch {
      return null;
    }
  }
  const rust = text.match(/println!\s*\(([\s\S]*?)\)/);
  if (rust) return formatRust(rust[1], scope);
  const bare = text.match(/^(?:echo|puts)\s+(.+)$/);
  if (bare && !bare[1].startsWith("(")) {
    try {
      return String(evaluate(bare[1], scope));
    } catch {
      return bare[1].replace(/^["']|["']$/g, "");
    }
  }
  const names = ["System.out.println", "fmt.Println", "fmt.Print", "console.log", "console.error", "println", "printf", "print", "echo", "puts"];
  for (const name of names) {
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

function formatRust(inside: string, scope: Record<string, Value>): string {
  const args = splitArgs(inside);
  if (!args.length) return "";
  let template = String(evaluate(args[0], scope));
  for (const arg of args.slice(1)) {
    template = template.replace("{}", String(evaluate(arg, scope)));
  }
  return template;
}

function formatPrintf(inside: string, scope: Record<string, Value>): string {
  const args = splitArgs(inside);
  if (!args.length) return "";
  let template = String(evaluate(args[0], scope));
  let n = 1;
  template = template.replace(/%[sdif]/g, () => String(evaluate(args[n++] ?? '""', scope)));
  return template;
}

function rangeValues(arg: string, scope: Record<string, Value>): number[] {
  const parts = splitArgs(arg).map((part) => Number(evaluate(part, scope)));
  const out: number[] = [];
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

function truthy(value: Value): boolean {
  return !(value === false || value === null || value === "" || value === 0);
}

function stripTrail(text: string): string {
  return text.replace(/;+\s*$/, "").trim();
}

function countChar(text: string, ch: string): number {
  let n = 0;
  for (const c of text) if (c === ch) n++;
  return n;
}

function balanced(source: string): string | null {
  if (!source.startsWith("(")) return null;
  let depth = 0;
  let quote: string | null = null;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (ch === "\\" ) { i++; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "(") depth++;
    else if (ch === ")") {
      depth--;
      if (depth === 0) return source.slice(1, i);
    }
  }
  return null;
}

function splitArgs(source: string): string[] {
  const args: string[] = [];
  let quote: string | null = null;
  let depth = 0;
  let start = 0;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (ch === "\\") { i++; continue; }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") quote = ch;
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

export function evaluate(input: string, scope: Record<string, Value>): Value {
  const s = input.trim().replace(/;+\s*$/, "");
  let i = 0;
  function skip() {
    while (s[i] === " " || s[i] === "\n" || s[i] === "\t") i++;
  }
  function parseOr(): Value {
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
  function parseAnd(): Value {
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
  function parseCmp(): Value {
    let left = parseAdd();
    skip();
    const ops = ["==", "!=", "<=", ">=", "<", ">"];
    for (const op of ops) {
      if (s.slice(i, i + op.length) === op) {
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
    }
    return left;
  }
  function parseAdd(): Value {
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
  function parseMul(): Value {
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
  function parseUnary(): Value {
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
  function parsePrimary(): Value {
    skip();
    if (s[i] === "(") {
      i++;
      const value = parseOr();
      skip();
      if (s[i] === ")") i++;
      return value;
    }
    if (s[i] === '"' || s[i] === "'") return readString();
    if (s[i] === "f" && (s[i + 1] === '"' || s[i + 1] === "'")) {
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
  function readString(): string {
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
  function readFString(): string {
    const raw = readString();
    return raw.replace(/\{([^{}]+)\}/g, (_, expr: string) => String(evaluate(expr, scope)));
  }
  const value = parseOr();
  return value;
}

function callFn(name: string, args: string, scope: Record<string, Value>): Value {
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
