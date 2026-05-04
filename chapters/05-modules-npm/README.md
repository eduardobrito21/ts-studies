# 05 — Modules and npm

This chapter is about how files talk to each other and how to pull in third-party code.

## `import` / `export`

Every `.ts` file is a **module**. Use `export` to expose things, `import` to consume them. Very close to Python's `from x import y`.

```ts
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}
export const PI = 3.14159;

// main.ts
import { add, PI } from "./math.ts";
console.log(add(1, 2), PI);
```

### Default exports (skim)

```ts
// greeter.ts
export default function greet(name: string) {
  return `Hello, ${name}`;
}

// main.ts
import greet from "./greeter.ts";
```

**Use named exports by default**, not default exports. Named exports give better autocomplete, easier refactors, and clearer grep-ability. Default exports are mostly a historical mistake; libraries often use them but you shouldn't reach for them in your own code.

### Re-exports

```ts
// index.ts — create a "barrel" that re-exports multiple modules
export { add, PI } from "./math.ts";
export { greet } from "./greeter.ts";
```

## ESM vs CommonJS (the JS module mess)

JavaScript has two competing module systems. You will see both.

| System | Syntax | File extensions typically |
|---|---|---|
| **ES Modules (ESM)** — modern standard | `import` / `export` | `.mjs`, `.js` in ESM packages, `.ts` compiled to ESM |
| **CommonJS (CJS)** — old Node standard | `require()` / `module.exports` | `.cjs`, `.js` in CJS packages |

This repo is **ESM-only**. The `"type": "module"` in `package.json` tells Node to treat `.js`/`.ts` files as ESM. When you work in other codebases you might see:

```js
const fs = require("fs");            // CJS
module.exports = { add };
```

Treat that as "old JS". Mental model: ESM : CJS :: Python 3 : Python 2. ESM is where everything is heading; CJS is legacy but widespread.

## Paths in imports

```ts
import { add } from "./math.ts";           // relative file path (need ./ or ../)
import { add } from "../shared/math.ts";   // relative, going up
import express from "express";             // bare import — looks in node_modules
```

In NodeNext resolution, **relative imports need a file extension**. This repo uses `.ts` in imports (thanks to `allowImportingTsExtensions`). In compiled JS projects you'd see `.js` — the extension refers to the runtime file, not the source.

## `package.json` — the project manifest

Your project's `pyproject.toml`/`requirements.txt`/`setup.py` all rolled into one JSON file.

```json
{
  "name": "ts-studies",
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "test": "vitest run"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
```

Key fields:

- **`name`**, **`version`** — identity.
- **`type`** — `"module"` for ESM, absent/`"commonjs"` for CJS.
- **`scripts`** — commands you run with `npm run <name>`. Think of them as `make` targets or `[tool.poetry.scripts]`.
- **`dependencies`** — runtime deps.
- **`devDependencies`** — deps only needed for building/testing/typechecking. Test runners, typescript itself, types packages.

## npm basics

```bash
npm install                    # install everything in package.json
npm install lodash             # add a runtime dep
npm install -D vitest          # add a dev dep (-D = --save-dev)
npm uninstall lodash
npm outdated                   # list out-of-date packages
npm run <script>               # run an entry from "scripts"
npx <tool>                     # run a binary without installing globally
```

`npx` is important. It runs a tool from `node_modules/.bin/` (or downloads it temporarily). Python analogue: `uvx` or `pipx run`.

## Semver and version ranges

```json
"typescript": "^5.4.0"
```

- `^5.4.0` means ≥ 5.4.0 and < 6.0.0 (compatible minor/patch updates)
- `~5.4.0` means ≥ 5.4.0 and < 5.5.0 (patch-only)
- `5.4.0` means exactly that version

`package-lock.json` pins the actual resolved versions so installs are reproducible — like `poetry.lock` or `uv.lock`. Commit it.

## `@types/...` packages

Some JS libraries ship their own TypeScript types; some don't. For ones that don't, the community publishes type definitions at `@types/<name>`:

```bash
npm install lodash
npm install -D @types/lodash
```

If you install a popular library and TS complains it has no types, check if `@types/x` exists. Modern libraries (and anything written in TS) don't need this.

---

## Files

- `lib/math.ts` — a small module to import from
- `lib/greet.ts` — another module
- `examples/use-lib.ts` — demonstrates importing and re-exports
- `exercises/stats.ts` + `.test.ts` — implement a small stats library across two files

```bash
npm run ex chapters/05-modules-npm/examples/use-lib.ts
npm run test:watch
```

Next: [chapter 06 — Node basics](../06-node-basics/README.md).
