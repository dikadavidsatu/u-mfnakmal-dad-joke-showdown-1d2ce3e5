import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The whole entry: one original dad joke for the Dad Joke Showdown.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space.
const JOKE =
  "I named my sourdough starter Clint Yeastwood — every morning, without fail, he rises to the occasion.";

function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing white space");
  }
  // One joke, told in one breath: a line break would split the setup
  // from the punchline and break the straight-faced delivery.
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with its punchline, then a full stop");
  }
}

function main(): void {
  validate(JOKE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
}

main();
