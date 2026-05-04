import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, "tmp", "notes.json");

// Write a JSON file.
const payload = { message: "hello", count: 3, tags: ["ts", "node"] };
await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, JSON.stringify(payload, null, 2), "utf8");
console.log("wrote", outPath);

// Read it back and parse.
const raw = await readFile(outPath, "utf8");
const parsed: unknown = JSON.parse(raw);
console.log("read:", parsed);
