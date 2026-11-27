// TDD-lite checks for the Invent a Word We Need entry.
// Kit gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space. The program must be deterministic and stdlib-only.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const mainTs = join(dir, "main.ts");
const node = process.execPath;

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
}

function runOnce(outDir) {
  execFileSync(node, [mainTs], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    stdio: "pipe",
  });
  return readFileSync(join(outDir, "entry.txt"), "utf8");
}

// 1. Program runs and writes entry.txt
const outA = mkdtempSync(join(tmpdir(), "invent-word-a-"));
const outB = mkdtempSync(join(tmpdir(), "invent-word-b-"));
let textA = "";
let textB = "";
try {
  textA = runOnce(outA);
  textB = runOnce(outB);
  check("entry.txt written", textA.length > 0);
} catch (err) {
  check("entry.txt written", false, String(err.message ?? err).split("\n")[0]);
}

// 2. Gate: 1 to 140 characters, not only white space
check("1..140 characters", textA.length >= 1 && textA.length <= 140, `${textA.length} chars`);
check("not only whitespace", textA.trim().length > 0);
check("single line (no newline inside)", !textA.slice(0, -1).includes("\n"));

// 3. Determinism: two runs, same bytes
check("deterministic output", textA === textB);

// 4. Stdlib-only: every import is a node: builtin
const src = readFileSync(mainTs, "utf8");
const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
const nonStd = imports.filter((i) => !i.startsWith("node:"));
check("stdlib-only imports", nonStd.length === 0, imports.join(", ") || "none");

// 5. Output holds no dotfile
const outFiles = readdirSync(outA);
check("no dotfile in output", outFiles.every((f) => !f.startsWith(".")));

// 6. Entry is one invented word + one-line definition
check(
  "word + definition shape",
  /^[a-z]+: [A-Z]?[^\n]{1,139}$/.test(textA) && textA.split(":")[0].length > 1,
  JSON.stringify(textA),
);

rmSync(outA, { recursive: true, force: true });
rmSync(outB, { recursive: true, force: true });

if (failures > 0) {
  console.error(`${failures} check(s) failed`);
  process.exit(1);
}
console.log("All checks passed.");
