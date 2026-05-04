// Barrel file: re-exports the public API so consumers can write
//   import { mean, variance } from "./stats/index.ts";
// without knowing which file each function lives in.
//
// Take a look — this file IS the answer to the "how do I re-export?" question.
// Your work is in mean.ts and variance.ts.

export { mean } from "./mean.ts";
export { variance } from "./variance.ts";
