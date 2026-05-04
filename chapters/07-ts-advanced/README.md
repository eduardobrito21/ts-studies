# 07 — TypeScript advanced

You've used the bread-and-butter of TS. This chapter covers the tools you'll see in library code and occasionally need yourself.

Treat this as a **reference** first, drill second. Skim, then implement the exercises.

## Utility types

Built into TS; no import needed. They derive new types from existing ones.

```ts
type User = { id: number; name: string; email: string };

type PartialUser = Partial<User>;          // all keys optional
type NameOnly = Pick<User, "name">;        // { name: string }
type NoEmail = Omit<User, "email">;        // User without "email"
type ReadonlyUser = Readonly<User>;        // all keys readonly
type UserKeys = keyof User;                // "id" | "name" | "email"

type NumDict = Record<string, number>;     // { [key: string]: number }
```

Python analogue: `TypedDict.__required_keys__`, `typing.Protocol`, etc. — but much more composable.

Cheat sheet of the ones you'll actually use:

| Utility | Effect |
|---|---|
| `Partial<T>` | make all keys optional |
| `Required<T>` | make all keys required |
| `Readonly<T>` | make all keys `readonly` |
| `Pick<T, K>` | keep only keys `K` |
| `Omit<T, K>` | remove keys `K` |
| `Record<K, V>` | dict with keys of type `K`, values of type `V` |
| `ReturnType<F>` | the return type of function `F` |
| `Parameters<F>` | tuple of parameter types of function `F` |
| `Awaited<P>` | unwrap `Promise<T>` to `T` |

## Discriminated unions (ADTs)

You already saw these in chapter 02 with shapes. They're the single most useful pattern in TS.

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function handle(r: Result<number>) {
  if (r.ok) {
    // r: { ok: true; value: number }
    return r.value * 2;
  }
  // r: { ok: false; error: string }
  console.error(r.error);
  return 0;
}
```

The `ok` field is the **discriminant**. TS narrows the union based on it. In Python this is what `match`/case on a tagged dataclass does.

## Exhaustiveness checking with `never`

The `never` type means "can't happen". Used in a `switch` default, it forces you to handle every case:

```ts
type Status = "pending" | "active" | "done";

function describe(s: Status): string {
  switch (s) {
    case "pending": return "...";
    case "active":  return "...";
    case "done":    return "...";
    default: {
      // If we ever add a new Status variant and forget to handle it,
      // TS flags this line because `s` is no longer `never`.
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}
```

This is one of the best compile-time safety tricks you get. Use it wherever you `switch` on a tag.

## Type guards (user-defined narrowing)

`x is T` in a return type tells TS "if this function returns true, narrow x to T".

```ts
function isString(x: unknown): x is string {
  return typeof x === "string";
}

function process(x: unknown) {
  if (isString(x)) {
    x.toUpperCase();   // narrowed
  }
}
```

Use type guards to teach TS about your own validation logic.

## `as const` and literal inference

By default, TS widens literals:

```ts
const obj = { kind: "circle", r: 1 };
// obj.kind has type `string`, not `"circle"`

const obj2 = { kind: "circle", r: 1 } as const;
// obj2.kind has type `"circle"`, obj2 is fully readonly
```

`as const` is how you keep literal types narrow. Essential for discriminated-union construction.

## `satisfies`

Like an annotation, but preserves the narrow inferred type.

```ts
type Config = Record<string, string | number>;

const config: Config = {
  host: "localhost",
  port: 3000,
};
// config.port has type `string | number` — we lost the fact that it's a number

const config2 = {
  host: "localhost",
  port: 3000,
} satisfies Config;
// config2.port has type `number`, AND the whole thing is checked against Config
```

Rule of thumb: when you'd reach for `: Config`, ask yourself whether `satisfies Config` would preserve more detail. Usually yes.

---

## Files

- `examples/utility-types.ts` — demo of the common utilities
- `examples/result-type.ts` — discriminated-union `Result` with exhaustive handling
- `exercises/event-handler.ts` + `.test.ts` — handle a discriminated union of events with exhaustiveness

```bash
npm run ex chapters/07-ts-advanced/examples/utility-types.ts
npm run ex chapters/07-ts-advanced/examples/result-type.ts
npm run test:watch
```

You're done with the core roadmap. Good places to go next:
- Build a tiny real thing — a CLI, a script that hits an API, a small Express server
- Look at modern TS codebases on GitHub (pick a library you use)
- Add a chapter here for AI SDKs (`@anthropic-ai/sdk`, Vercel AI SDK) when you're ready
