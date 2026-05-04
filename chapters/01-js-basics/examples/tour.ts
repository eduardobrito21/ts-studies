// A guided tour of JS basics. Run with:
//   npm run ex chapters/01-js-basics/examples/tour.ts

// --- variables ---
const pi = 3.14159;
let counter = 0;
counter += 1;
console.log("counter:", counter);

// --- template strings ---
const who = "Ada";
console.log(`Hello, ${who}. Pi is roughly ${pi.toFixed(2)}.`);

// --- arrays ---
const xs = [1, 2, 3, 4, 5];
const doubled = xs.map((x) => x * 2);
const evens = xs.filter((x) => x % 2 === 0);
const sum = xs.reduce((acc, x) => acc + x, 0);
console.log({ doubled, evens, sum });

// --- objects ---
const user = { name: "Ada", age: 36 };
const updated = { ...user, age: 37, email: "ada@example.com" };
const { name, age } = updated;
console.log(`${name} is ${age} years old.`);

// --- truthy/falsy and nullish coalescing ---
const maybeName: string | null = null;
const displayName = maybeName ?? "anonymous";
console.log("display:", displayName);

// --- for...of ---
for (const x of xs) {
  if (x > 3) break;
  console.log("x =", x);
}
