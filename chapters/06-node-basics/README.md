# 06 — Node basics

Just enough of Node's standard library to do real work. Think of Node as "Python for the server" — the runtime plus its built-in modules.

## Built-in modules use the `node:` prefix

```ts
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { argv } from "node:process";
```

The `node:` prefix is recommended in modern code — it signals "this is a built-in, not a package someone might shadow on npm". Python analogy: it's roughly like the distinction between `import os` (stdlib) and `import requests` (third-party).

## Reading and writing files

The `node:fs/promises` module is the async-first file API.

```ts
import { readFile, writeFile } from "node:fs/promises";

const text = await readFile("notes.txt", "utf8");   // returns string when encoding is given
await writeFile("out.txt", text.toUpperCase());
```

Without `"utf8"`, `readFile` returns a `Buffer` (raw bytes). Pass the encoding to get a string directly, which is what you want 95% of the time.

## Working with JSON

No `import json` needed — `JSON.parse` / `JSON.stringify` are built-in globals.

```ts
const raw = await readFile("data.json", "utf8");
const data: unknown = JSON.parse(raw);   // JSON.parse returns any; we type it as unknown to be careful
```

For runtime validation of parsed JSON, the standard tool is [`zod`](https://zod.dev) (a third-party lib). Out of scope here, but worth knowing.

## HTTP: `fetch`

`fetch` is a global in Node ≥ 18. Same API as the browser.

```ts
const res = await fetch("https://api.github.com/repos/microsoft/typescript");
if (!res.ok) {
  throw new Error(`HTTP ${res.status}`);
}
const data: unknown = await res.json();
```

`fetch` itself resolves as soon as headers arrive; the body is a separate async step (`.json()`, `.text()`, etc.).

## Paths

Don't string-concatenate paths; use `node:path`.

```ts
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const filePath = join("data", "input.csv");

// "__dirname" doesn't exist in ESM. This is the standard replacement:
const __dirname = dirname(fileURLToPath(import.meta.url));
```

`import.meta.url` is the ESM equivalent of `__file__`.

## CLI args: `process.argv`

```ts
import { argv } from "node:process";
// argv = ["node", "/path/to/script.ts", "arg1", "arg2", ...]
const userArgs = argv.slice(2);
```

Same shape as Python's `sys.argv`, same convention: first two entries are the interpreter and the script. For real CLIs you'd reach for a library like `commander` or `yargs`, but `argv.slice(2)` gets you far.

## Environment variables

```ts
import { env } from "node:process";
const apiKey = env.API_KEY;   // type: string | undefined
```

No special library needed. For loading a `.env` file into `env`, use Node's built-in `--env-file` flag:

```bash
node --env-file=.env ./script.js
```

## Everything is a stream under the hood

Node exposes low-level `Readable`/`Writable` streams for large files and HTTP bodies, similar to Python's file iterators. You won't need them for this chapter, but know they exist for the day you handle a 20GB file.

---

## Files

- `examples/read-write.ts` — write and read back a JSON file
- `examples/http.ts` — fetch from a public API and pretty-print
- `exercises/csv-sum.ts` + `.test.ts` — read a CSV and sum a column (pure function, no I/O in tests)
- `exercises/cli-greet.ts` — a small CLI that reads `argv` (no test; run it manually)

```bash
npm run ex chapters/06-node-basics/examples/read-write.ts
npm run ex chapters/06-node-basics/examples/http.ts
npm run ex chapters/06-node-basics/exercises/cli-greet.ts -- Ada
npm run test:watch
```

Next: [chapter 07 — TS advanced](../07-ts-advanced/README.md).
