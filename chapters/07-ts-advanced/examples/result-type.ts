// A Result<T, E> type for functions that can fail without throwing.
// This pattern shows up all over modern TS code.

type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function parseIntSafe(s: string): Result<number> {
  const n = Number(s);
  if (Number.isNaN(n)) {
    return { ok: false, error: `not a number: ${s}` };
  }
  return { ok: true, value: n };
}

function describe(r: Result<number>): string {
  if (r.ok) {
    return `got ${r.value}`;
  }
  return `error: ${r.error}`;
}

console.log(describe(parseIntSafe("42")));
console.log(describe(parseIntSafe("oops")));

// Exhaustive handling of a simple union.
type Color = "red" | "green" | "blue";

function hex(c: Color): string {
  switch (c) {
    case "red":   return "#ff0000";
    case "green": return "#00ff00";
    case "blue":  return "#0000ff";
    default: {
      // If a new Color variant is added later and we forget to handle it here,
      // `c` will no longer be `never` and TS will yell at us.
      const _exhaustive: never = c;
      return _exhaustive;
    }
  }
}

console.log(hex("red"), hex("blue"));
