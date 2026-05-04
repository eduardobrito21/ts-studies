# 02 — TypeScript basics

Now the types. If you're comfortable with Python type hints (`x: int`, `list[str]`, `Optional[int]`), this chapter is mostly syntactic.

The big mental shift: Python type hints are **advisory** — `mypy` is a separate tool most projects don't run religiously. TypeScript types are **mandatory at compile time** — `tsc` will refuse to accept code that doesn't type-check, and your editor flags errors live. You'll lean on them much more than you do in Python.

## Type annotations

Syntax is `name: Type`, just like Python:

```ts
const age: number = 36;
const name: string = "Ada";
const active: boolean = true;
const tags: string[] = ["admin", "editor"];

function add(a: number, b: number): number {
  return a + b;
}
```

You usually don't need to annotate **local variables** — TS infers their types from the initializer. Write annotations on:
- **function parameters** (must; TS can't infer these)
- **function return types** (optional but recommended; acts as a contract)
- exported values, where the type is part of the public API

```ts
const x = 42;       // inferred as number — good, don't annotate
const y: number = 42; // redundant noise
```

## Primitives cheat sheet

| Python | TypeScript |
|---|---|
| `int`, `float` | `number` |
| `str` | `string` |
| `bool` | `boolean` |
| `None` | `null` or `undefined` |
| `list[T]` | `T[]` or `Array<T>` |
| `tuple[A, B]` | `[A, B]` |
| `dict[str, T]` | `Record<string, T>` |
| `Optional[T]` | `T \| null` or `T \| undefined` |
| `Union[A, B]` | `A \| B` |
| `Any` | `any` (escape hatch; avoid) |
| `object` | `unknown` (safe version of any) |

## `type` vs `interface`

Two ways to name an object shape. Both work. Pick one and be consistent within a file.

```ts
type User = {
  name: string;
  age: number;
};

interface User2 {
  name: string;
  age: number;
}
```

Practical differences:
- `interface` can be re-opened (declaration merged). Useful for library authors, usually irrelevant to you.
- `type` can alias anything: primitives, unions, tuples, functions.

**Recommendation for this repo:** use `type` by default. Reach for `interface` only when you specifically want declaration merging.

## Unions and literal types

The single biggest reason to learn TS is this: you can narrow what strings/numbers are allowed.

```ts
type Status = "pending" | "active" | "done";
let s: Status = "pending";
s = "archived";   // ERROR: Type '"archived"' is not assignable to type Status
```

This replaces most Python `Enum` usage. It's lightweight (just a string at runtime) and gives you autocomplete.

Unions also combine types:

```ts
function length(x: string | number): number {
  if (typeof x === "string") return x.length;
  return x.toString().length;
}
```

## Narrowing

TS is smart about `if` / `typeof` / `in` / equality checks — it narrows the type inside the branch.

```ts
function describe(x: string | number | null) {
  if (x === null) {
    // x: null
    return "nothing";
  }
  if (typeof x === "string") {
    // x: string — .toUpperCase() is safe
    return x.toUpperCase();
  }
  // x: number — TS narrowed it by elimination
  return x.toFixed(2);
}
```

## `null`, `undefined`, and strict null checks

`strict` mode is on. You cannot use a nullable value as if it weren't null.

```ts
const user: User | null = findUser();
console.log(user.name);        // ERROR: Object is possibly 'null'.
console.log(user?.name);       // ok — undefined if null
console.log(user ? user.name : "anon");  // ok — narrowed
```

Chapter 01 introduced `?.` and `??`. This is where they become essential.

## `noUncheckedIndexedAccess` surprise

This repo has `noUncheckedIndexedAccess: true`. It means:

```ts
const xs: number[] = [1, 2, 3];
const first = xs[0];    // type is number | undefined, NOT number
```

Why: because `xs[999]` is `undefined` at runtime, and we'd rather the type system admit that. Python lists throw `IndexError` so the question doesn't come up; JS silently returns `undefined`, so the type has to reflect that.

Handle it explicitly:

```ts
const first = xs[0];
if (first === undefined) return;
// first: number here
```

Or use `.at()` / destructuring with defaults when it's cleaner.

## Read-only variants

```ts
const xs: readonly number[] = [1, 2, 3];
// xs.push(4);   // ERROR

type Point = Readonly<{ x: number; y: number }>;
```

Use when you want to signal "this data shouldn't be mutated" — similar to passing tuples in Python when you mean "don't touch".

## Type assertions (the escape hatch)

```ts
const el = document.getElementById("app") as HTMLDivElement;
```

`as` tells the compiler "trust me, this is a `HTMLDivElement`". No runtime check — if you're wrong, you get a runtime error. Use sparingly. Python's equivalent is `typing.cast` — same vibes, same caveats.

**Never** use `as any` to silence errors. If you don't know the type, use `unknown` and narrow properly.

---

## Files in this chapter

- `examples/annotations.ts` — basic type annotations in action
- `examples/narrowing.ts` — union + narrowing patterns
- `exercises/shapes.ts` + `.test.ts` — compute areas of a discriminated union of shapes
- `exercises/safe-get.ts` + `.test.ts` — a safe array accessor (handles `undefined`)

```bash
npm run ex chapters/02-ts-basics/examples/annotations.ts
npm run test:watch
```

Next: [chapter 03 — functions and generics](../03-functions-generics/README.md).
