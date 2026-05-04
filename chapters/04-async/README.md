# 04 — Async

JS is single-threaded and uses an event loop — much like Python's `asyncio`. If you've written `async def` / `await` in Python, 90% of this chapter is translating syntax.

## Promises = Python's Futures/Coroutines

A `Promise<T>` represents a value of type `T` that will arrive later. Three states: pending → fulfilled (with a value) or rejected (with an error).

```ts
const p: Promise<number> = Promise.resolve(42);
```

## `async` / `await`

Any function marked `async` returns a `Promise<T>` whose `T` is whatever you return.

```ts
async function fetchUserId(): Promise<number> {
  return 42;   // auto-wrapped into Promise<number>
}

async function main() {
  const id = await fetchUserId();   // unwraps Promise<number> → number
  console.log("got id:", id);
}

main();
```

You can only use `await` inside an `async` function (or at the top level of an ES module — this repo uses ESM, so you can await at the top of any `.ts` file).

**Python comparison:**

```python
# Python
async def fetch_user_id() -> int:
    return 42

async def main():
    id = await fetch_user_id()
```

```ts
// TypeScript — nearly identical
async function fetchUserId(): Promise<number> {
  return 42;
}

async function main() {
  const id = await fetchUserId();
}
```

## Waiting in parallel: `Promise.all`

The direct analogue of Python's `asyncio.gather`. Kick off multiple async operations at once, wait for all of them, get an array of results.

```ts
async function fetchBoth() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts(),
  ]);
  // user and posts are resolved values, typed correctly
}
```

If **any** promise rejects, `Promise.all` rejects with that error — same as `gather` without `return_exceptions=True`. Use `Promise.allSettled` for the other behavior.

## Error handling

Rejected promises turn into thrown errors inside `async` functions. Catch with `try`/`catch`:

```ts
async function safeParse(raw: string): Promise<unknown> {
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("parse failed:", err);
    return null;
  }
}
```

**Gotcha:** the caught value's type is `unknown` (since `strict` is on), not `Error`. Narrow before using:

```ts
try {
  // ...
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("unknown error:", err);
  }
}
```

## `setTimeout` as a Promise

There's no built-in `asyncio.sleep`, but wrapping `setTimeout` takes one line:

```ts
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

await sleep(1000);   // pause for 1s
```

You'll see this idiom everywhere.

## Forgetting to `await` — the silent bug

```ts
async function save(x: number) { /* ... */ }

save(1);           // fires but nothing waits. If it rejects, unhandled promise warning.
await save(1);     // correct.
```

If the function is `async`, **treat calling it without `await` as a bug** unless you specifically want fire-and-forget. The TS compiler flags many cases, and linters catch more.

## The event loop, briefly

Just like Python's asyncio: one thread, one task runs at a time, `await` yields back so something else can make progress. CPU-bound work is still blocking. For parallel CPU work you'd use **worker threads** (analogous to `multiprocessing`), which is beyond this repo's scope.

---

## Files

- `examples/basic.ts` — async function, await, sleep
- `examples/parallel.ts` — `Promise.all` vs sequential awaits, timing comparison
- `exercises/retry.ts` + `.test.ts` — implement a simple retry-with-backoff helper

```bash
npm run ex chapters/04-async/examples/basic.ts
npm run ex chapters/04-async/examples/parallel.ts
npm run test:watch
```

Next: [chapter 05 — modules and npm](../05-modules-npm/README.md).
