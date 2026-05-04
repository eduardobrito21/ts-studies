// Implement a type-safe `pick` that returns a new object containing only
// the specified keys.
//
// The magic is in the type: `K extends keyof T` means K is a key of T, and
// `Pick<T, K>` is a built-in utility that gives you back the sub-shape.
//
// Example:
//   pick({ a: 1, b: 2, c: 3 }, ["a", "c"]) => { a: 1, c: 3 }
//
// And TypeScript knows the return type is { a: number, c: number }.

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  // TODO: build a new object with just the requested keys.
  // Hint: use a loop or `reduce`. You'll need a cast at the end because
  // we're building up the partial result incrementally.
  return {} as Pick<T, K>;
}
