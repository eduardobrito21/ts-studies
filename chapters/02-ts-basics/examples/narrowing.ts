// Type narrowing: TS follows your if/typeof/equality checks to refine types.

function formatValue(x: string | number | null): string {
  if (x === null) return "—";
  if (typeof x === "string") return x.trim();
  // By elimination, x is number here.
  return x.toFixed(2);
}

console.log(formatValue("  hello  "));  // "hello"
console.log(formatValue(3.14159));      // "3.14"
console.log(formatValue(null));         // "—"

// `in` operator narrowing works on object shapes.
type Dog = { kind: "dog"; bark: () => string };
type Cat = { kind: "cat"; meow: () => string };
type Animal = Dog | Cat;

function speak(a: Animal): string {
  // Narrow via a "tag" field — this is a discriminated union.
  if (a.kind === "dog") return a.bark();
  return a.meow();
}

console.log(speak({ kind: "dog", bark: () => "woof" }));
console.log(speak({ kind: "cat", meow: () => "meow" }));
