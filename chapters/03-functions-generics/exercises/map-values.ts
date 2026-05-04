// Transform every value in a Record, preserving the key set and the key type.
//
// Example:
//   mapValues({ a: 1, b: 2 }, (n) => n * 10)  =>  { a: 10, b: 20 }
//
// The return type should be Record<K, U> when the input is Record<K, V>.

export function mapValues<K extends string, V, U>(
  obj: Record<K, V>,
  fn: (value: V, key: K) => U,
): Record<K, U> {
  // TODO: iterate keys, apply fn, build a new object.
  // Hint: Object.entries returns [string, V][]; you'll need to cast the key.
  return {} as Record<K, U>;
}
