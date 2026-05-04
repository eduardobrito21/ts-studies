// Because `noUncheckedIndexedAccess` is on, `xs[i]` has type `T | undefined`.
// Write a safer accessor that returns a fallback when the index is out of range.
//
// Example:
//   safeGet([10, 20, 30], 1, -1) => 20
//   safeGet([10, 20, 30], 5, -1) => -1

export function safeGet<T>(xs: T[], index: number, fallback: T): T {
  // TODO
  return fallback;
}

// Bonus: return the first element of xs, or null if empty.
// Note the return type is `T | null`, not `T`.
export function firstOrNull<T>(xs: T[]): T | null {
  // TODO
  return null;
}
