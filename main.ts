// Invent a Word We Need — u-deranalabs-invent-a-word-we-need-17a020e0
//
// The entry is one invented English word with a one-line definition.
// The program writes that single line to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// Word: fridgepeek — opening the fridge for the third time in ten
// minutes, knowing nothing new has appeared inside. Everyone has done
// it; English just never gave the habit a name.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "fridgepeek: opening the fridge for the third time in ten minutes, knowing nothing new has appeared inside.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space. Guard it here so a bad edit fails loudly instead
// of shipping an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 140 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1..140 gate`);
}

// Resolve the repository directory from this script's location, never
// from process.cwd(). The output directory comes from the environment
// with the harness fallback /output.
const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : "/output";
void repoDir;

// Never delete or recreate the output directory itself; only make sure
// it exists so the file can be written, and write the single entry file.
mkdirSync(outputDir, { recursive: true });
writeFileSync(resolve(outputDir, "entry.txt"), ENTRY, "utf8");
