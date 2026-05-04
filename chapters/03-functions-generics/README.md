# 03 — Functions and generics

This chapter is about writing flexible, reusable, type-safe functions.

## Function types

You can type a function in three ways:

```ts
// 1. Declaration — parameters and return inline.
function add(a: number, b: number): number {
  return a + b;
}

// 2. Arrow form, type inferred or declared.
const sub = (a: number, b: number): number => a - b;

// 3. Separate type alias for the signature.
type BinaryOp = (a: number, b: number) => number;
const mul: BinaryOp = (a, b) => a * b;   // params/return inferred from BinaryOp
```

Form #3 is great when the same signature shows up repeatedly — like Python's `Callable[[int, int], int]`.

## Optional and default parameters

```ts
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

function log(message: string, level?: "info" | "warn" | "error") {
  // `level` is string | undefined here
  const prefix = level ?? "info";
  console.log(`[${prefix}] ${message}`);
}
```

`x?: T` is syntactic sugar for `x: T | undefined`. Use `?` for parameters and object keys.

## Rest parameters

```ts
function sum(...xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);   // 10
```

Same as Python's `*args`, typed as an array.

## Generics

Generics let you write one function that works over many types without losing type information. If `T` in Python type hints feels familiar (`def first(xs: list[T]) -> T`), this is the same idea.

```ts
function identity<T>(x: T): T {
  return x;
}

identity(42);        // T inferred as number
identity("hello");   // T inferred as string
```

Angle brackets in the signature introduce a **type parameter**. TS infers it from the arguments most of the time; you can pass it explicitly as `identity<number>(42)` if needed.

### A slightly more useful example

```ts
function firstOr<T>(xs: T[], fallback: T): T {
  return xs[0] ?? fallback;
}

firstOr([1, 2, 3], 0);            // T = number
firstOr(["a", "b"], "missing");   // T = string
```

Without the generic, you'd need `any` or separate versions per type. With `T`, the return type follows the input.

### Multiple type parameters

```ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
pair("age", 36);   // [string, number]
```

### Constraining a type parameter with `extends`

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("hello", "world");        // ok — strings have .length
longest([1, 2, 3], [1]);          // ok — arrays have .length
// longest(1, 2);                 // ERROR — numbers don't have .length
```

`T extends X` is the type-system version of Python's `TypeVar("T", bound=X)`.

## `any` vs `unknown`

Both mean "I don't know the type". **Always prefer `unknown`.**

- `any` disables type checking for that value. It's contagious and defeats the whole purpose of TS.
- `unknown` means "could be anything" — the compiler forces you to narrow before using it.

```ts
function parse(raw: unknown) {
  // raw.toUpperCase();              // ERROR — unknown, must narrow first
  if (typeof raw === "string") {
    return raw.toUpperCase();         // ok — narrowed to string
  }
  throw new Error("expected string");
}
```

Rule: if you catch yourself writing `any`, stop and write `unknown` instead, then narrow.

## A word on function overloads (skim)

TS lets you declare multiple signatures for one function:

```ts
function pick(x: string): string;
function pick(x: number): number;
function pick(x: string | number): string | number {
  return x;
}
```

Overloads are rarely the best tool — generics or union return types almost always do the job better. Recognize them when you see them in libraries; don't reach for them first.

---

## Files

- `examples/generics.ts` — small tour of the ideas above
- `exercises/pick.ts` + `.test.ts` — type-safe object key picker (a classic generic drill)
- `exercises/map-values.ts` + `.test.ts` — transform every value in a `Record` while preserving the key type

```bash
npm run ex chapters/03-functions-generics/examples/generics.ts
npm run test:watch
```

Next: [chapter 04 — async](../04-async/README.md).
