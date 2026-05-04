// Implement `retry`: call the async `task` up to `attempts` times.
// - Return the first successful result.
// - If all attempts fail, throw the error from the LAST attempt.
// - Wait `delayMs` between attempts (don't wait before the first try,
//   and don't wait after the last failed try).
//
// Signature: attempts is the total number of tries (>= 1).
//
// Hint: use a for-loop and try/catch. You can sleep with:
//   await new Promise<void>((resolve) => setTimeout(resolve, delayMs));

export async function retry<T>(
  task: () => Promise<T>,
  attempts: number,
  delayMs: number,
): Promise<T> {
  // TODO
  throw new Error("not implemented");
}
