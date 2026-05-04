// Importing named exports from sibling files.
import { add, mul, PI } from "../lib/math.ts";
import { greet } from "../lib/greet.ts";

console.log(greet("Ada"));
console.log(greet("Ada", "Hi"));

console.log("2 + 3 =", add(2, 3));
console.log("2 * 3 =", mul(2, 3));
console.log("PI ≈", PI);
