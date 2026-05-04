# 00 — Setup

If `npm install` at the repo root worked and `node --version` prints `v20.x.x` or higher, you're done. Jump to [chapter 01](../01-js-basics/README.md).

Otherwise, read on.

## Install Node.js

Node is the JS runtime. Think of it as the CPython of JavaScript — the thing that actually executes your code outside a browser.

**macOS / Linux:** install [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager, like `pyenv`). Then from the repo root:

```bash
nvm install        # reads .nvmrc, installs Node 20
nvm use            # activates it
```

**Windows:** use the official installer from [nodejs.org](https://nodejs.org/), pick the LTS (≥ 20).

Verify:

```bash
node --version    # v20.x.x or higher
npm --version
```

## Install project dependencies

```bash
npm install
```

This reads `package.json`, downloads everything into `node_modules/`, and writes `package-lock.json`. Python analogy: `pip install -r requirements.txt` inside an auto-created venv. No need to activate anything — `node_modules/` is per-directory, so you're automatically "in" it when you run commands from this repo.

## Run your first TypeScript file

This repo has a script alias `ex` that runs any `.ts` file using [`tsx`](https://github.com/privatenumber/tsx). `tsx` is to `.ts` what `python` is to `.py` — you don't pre-compile, you just run.

```bash
npm run ex chapters/01-js-basics/examples/hello.ts
```

You should see `Hello, world!`. If you do, you're set.

## Editor setup

Use [VS Code](https://code.visualstudio.com/). TypeScript support is built in — no extensions required to start. It's the same experience as VS Code + Pylance for Python.

Optional but nice:
- **Error Lens** — shows type errors inline next to the code (like ruff's inline hints).
- **Vitest** — gutter icons to run individual tests, like the pytest extension.

Open the repo folder in VS Code and type errors will appear instantly as you edit. No configuration needed.

## Key commands (memorize these)

```bash
npm install                 # install deps (once per fresh clone / after deps change)
npm run ex <path/to.ts>     # run a TS file — your main workhorse
npm test                    # run all vitest tests once
npm run test:watch          # re-run tests on save; use this while solving exercises
npm run typecheck           # run `tsc --noEmit`; static type check
```

When you're ready, head to [chapter 01](../01-js-basics/README.md).
