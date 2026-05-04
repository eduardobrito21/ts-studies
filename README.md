# ts-studies

A self-study repo for learning TypeScript and JavaScript, written for people who already know Python.

Every chapter leans hard on Python analogies — you won't be learning "programming", you'll be learning how Python concepts you already know translate to TS/JS.

## How it works

Each chapter is a folder under `chapters/` containing:

- `README.md` — the concepts, with Python analogies and inline examples
- `examples/*.ts` — runnable scripts you can execute and tinker with
- `exercises/*.ts` — function stubs you complete
- `exercises/*.test.ts` — failing tests you make pass (pytest-style, but with `vitest`)

The workflow is: **read the README → run the examples → make the tests green**.

## Prerequisites

- Node.js ≥ 20 (check with `node --version`)
- npm (ships with Node)

If Node is older, install it via [nvm](https://github.com/nvm-sh/nvm) — this repo has a `.nvmrc` so `nvm use` picks the right version.

## Getting started

```bash
npm install                                            # Python analogue: pip install -r requirements.txt
npm run ex chapters/01-js-basics/examples/hello.ts     # run a single .ts file
npm test                                               # run all tests once
npm run test:watch                                     # watch mode (re-runs on save)
npm run typecheck                                      # static type check across repo
```

## Roadmap

| # | Chapter | Topic |
|---|---|---|
| 00 | [setup](chapters/00-setup/README.md) | Install Node, run your first script, editor tips |
| 01 | [js-basics](chapters/01-js-basics/README.md) | Variables, primitives, control flow, arrays, objects, destructuring, arrow functions |
| 02 | [ts-basics](chapters/02-ts-basics/README.md) | Type annotations, union/intersection, literals, `type` vs `interface`, narrowing |
| 03 | [functions-generics](chapters/03-functions-generics/README.md) | Function types, generics, overloads, `unknown` vs `any` |
| 04 | [async](chapters/04-async/README.md) | Promises, `async`/`await`, `Promise.all`, error handling |
| 05 | [modules-npm](chapters/05-modules-npm/README.md) | `import`/`export`, ESM vs CJS, `package.json`, installing libraries |
| 06 | [node-basics](chapters/06-node-basics/README.md) | `fs/promises`, `fetch`, JSON, simple CLIs with `process.argv` |
| 07 | [ts-advanced](chapters/07-ts-advanced/README.md) | Utility types, discriminated unions, type guards, `satisfies` |

Work through them in order. Each chapter assumes the previous ones.

Planned future chapters (React, Next.js, AI SDKs) are sketched in [ROADMAP.md](ROADMAP.md).

## Python → TS cheat sheet

Bookmark this. The rest of the repo is just filling it in with detail.

| Python | TypeScript / Node | Note |
|---|---|---|
| `pip` | `npm` | Package manager |
| `requirements.txt` / `pyproject.toml` | `package.json` | Dep manifest |
| `venv` | `node_modules/` (per-project, automatic) | Isolation |
| `python script.py` | `npx tsx script.ts` (or `npm run ex script.ts`) | Run a file |
| `pytest` | `vitest` | Test runner |
| `mypy` / `pyright` | `tsc --noEmit` | Static type check |
| `def foo(x: int) -> str:` | `function foo(x: number): string` | Function signature |
| `list[int]` | `number[]` or `Array<number>` | Typed array |
| `dict[str, int]` | `Record<string, number>` | Dict/map |
| `tuple[int, str]` | `[number, string]` | Fixed-length tuple |
| `Optional[int]` / `int \| None` | `number \| null` or `number \| undefined` | Nullable |
| `typing.Protocol` | `interface` | Structural typing |
| `@dataclass` | `type` or `interface` | Plain object shape |
| `Enum` | `type X = 'a' \| 'b'` (string literal union) | Prefer unions over TS `enum` |
| `typing.Union[A, B]` | `A \| B` | Union type |
| `typing.Any` | `any` (avoid) / `unknown` (prefer) | See ch. 03 |
| `f"hello {name}"` | `` `hello ${name}` `` | Template literal |
| `None` | `null` or `undefined` | JS has both — don't panic, ch. 02 |
| `True` / `False` | `true` / `false` | Lowercase |
| `for x in xs:` | `for (const x of xs) { ... }` | Note `of`, not `in` |
| `[f(x) for x in xs]` | `xs.map(f)` | No list comprehensions |
| `[x for x in xs if p(x)]` | `xs.filter(p)` | |
| `sum(xs)` | `xs.reduce((a, b) => a + b, 0)` | No built-in `sum` |
| `async def` / `await` | `async function` / `await` | Nearly identical semantics |
| `asyncio.gather(...)` | `Promise.all([...])` | |
| `import json` (stdlib) | `JSON.parse` / `JSON.stringify` (built-in) | No import needed |
| `open('f.txt').read()` | `await fs.readFile('f.txt', 'utf8')` (from `node:fs/promises`) | Node only; async by default |
| `sys.argv` | `process.argv` | First two entries are `node` and the script path |
| `print(x)` | `console.log(x)` | |

## Conventions

- **ESM only.** `import`/`export` everywhere, no `require`. Chapter 05 explains why.
- **Strict mode TypeScript.** `noUncheckedIndexedAccess` is on, so `arr[0]` has type `T | undefined`. This surprises Python developers — chapter 02 covers it.
- **No build step.** `tsx` executes `.ts` files directly. You never run `tsc` to produce `.js` — `tsc` is only used for type-checking.
