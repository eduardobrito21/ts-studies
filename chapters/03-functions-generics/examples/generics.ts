// Generics and unknown.

// A generic "identity-with-logging" function.
function tap<T>(x: T, label: string): T {
  console.log(`[${label}]`, x);
  return x;
}

const n = tap(42, "answer");          // T = number
const s = tap("hello", "greeting");   // T = string
const arr = tap([1, 2, 3], "list");   // T = number[]

// A generic pair builder.
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const entry = pair("age", 36);
console.log("entry:", entry, "— types infer as [string, number]");

// Constrained generic: T must have a numeric `length`.
function longer<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longer("hello", "world!"));
console.log(longer([1, 2, 3], [1, 2]));

// Narrowing `unknown` — safer than `any`.
function firstChar(x: unknown): string | null {
  if (typeof x === "string" && x.length > 0) {
    return x[0] ?? null;
  }
  return null;
}
console.log(firstChar("hi"));   // "h"
console.log(firstChar(42));     // null
console.log(firstChar(""));     // null

// Intentional result usage (so `n` etc. aren't flagged as unused).
console.log({ n, s, arr });
