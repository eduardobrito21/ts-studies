# 00 — Setup

This repo uses [mise](https://mise.jdx.dev/) to pin the Node version (same role as `pyenv` / `uv` for Python).

If `mise install` + `npm install` already worked and `node --version` prints `v20.x.x`, jump to [chapter 01](../01-js-basics/README.md).

## Install mise (once)

```bash
curl https://mise.run | sh
# then add the shell hook — mise prints the line for your shell
```

Or via Homebrew: `brew install mise`.

## Install Node for this project

From the repo root:

```bash
mise install          # reads mise.toml → installs Node 20
mise trust            # allow this project's mise.toml (first time only)
```

`cd` into the repo (with the mise shell hook enabled) and `node` / `npm` resolve to the pinned version automatically — no `nvm use` / activate step.

Verify:

```bash
node --version        # v20.x.x
npm --version
which node            # should be under ~/.local/share/mise/...
```

## Install project dependencies

```bash
npm install
```

This reads `package.json`, downloads everything into `node_modules/`, and writes `package-lock.json`. Python analogue: `uv sync` / `pip install -r requirements.txt` inside an auto-created venv. No need to activate anything — `node_modules/` is per-directory.

`mise.toml` also puts `node_modules/.bin` on your PATH, so after install you can run `tsx`, `vitest`, and `tsc` directly.

## Run your first TypeScript file

```bash
npm run ex chapters/01-js-basics/examples/hello.ts
# or: tsx chapters/01-js-basics/examples/hello.ts
```

You should see `Hello, world!`. If you do, you're set.

## Editor setup

Use [VS Code](https://code.visualstudio.com/) or Cursor. TypeScript support is built in — no extensions required to start. Same experience as VS Code + Pylance for Python.

Optional but nice:
- **Error Lens** — type errors inline (like ruff hints)
- **Vitest** — gutter icons to run individual tests

Open the repo folder and type errors appear as you edit.

## Key commands

```bash
mise install                # install pinned Node (once / after mise.toml changes)
npm install                 # install deps (once per fresh clone / after deps change)
npm run ex <path/to.ts>     # run a TS file — your main workhorse
npm test                    # run all vitest tests once
npm run test:watch          # re-run tests on save; use this while solving exercises
npm run typecheck           # run `tsc --noEmit`; static type check
```

When you're ready, head to [chapter 01](../01-js-basics/README.md).
