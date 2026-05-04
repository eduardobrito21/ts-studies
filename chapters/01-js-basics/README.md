# 01 — JS basics

This chapter covers plain JavaScript — no types yet. The syntax and quirks you need to survive, mapped to Python.

> A note on strategy: we're writing JS in `.ts` files because TypeScript is a strict superset of JavaScript. Anything that's legal JS is legal TS. For this chapter, pretend the type system isn't there.

## Variables: `let` and `const`

```ts
let count = 0;       // mutable — like a regular Python variable
const name = "Ada";  // can't be reassigned. Not frozen, just unreassignable.
count = 1;           // ok
// name = "Bob";     // ERROR
```

**Rule of thumb:** start with `const`. Only use `let` when you need to reassign. You'll see `var` in old code — avoid it, it has weird scoping (function-scoped instead of block-scoped).

## Primitive types

JS has a smaller set of primitives than Python:

| JS | Python equivalent |
|---|---|
| `number` | `int` **and** `float` — no distinction |
| `string` | `str` |
| `boolean` | `bool` |
| `null` | `None` (kind of) |
| `undefined` | `None` (kind of)  |
| `bigint` | `int` (arbitrary precision); rarely needed |
| `symbol` | no analogue; ignore for now |

**`null` vs `undefined`:** Python has one "nothing" value; JS has two. In practice:
- `undefined` = "this was never set" (uninitialized variable, missing object key, function that doesn't return)
- `null` = "this was intentionally set to nothing"

Most codebases use one or the other by convention. Default to `null` when you need to represent "absent on purpose".

## Numbers

Everything is a double-precision float. `1 / 2` is `0.5`, not `0`. Integer ops like `5 % 2` work, but watch for floating-point:

```ts
console.log(0.1 + 0.2);   // 0.30000000000000004   (same pain as Python)
console.log(1 / 0);       // Infinity   (no ZeroDivisionError)
console.log(0 / 0);       // NaN         (Not-a-Number)
```

## Strings

Three quote styles: `"a"`, `'a'`, `` `a` ``. The backtick form is a **template literal**, equivalent to Python's f-string:

```ts
const name = "Ada";
console.log(`Hello, ${name}!`);        // Hello, Ada!
console.log(`1 + 1 = ${1 + 1}`);       // 1 + 1 = 2
```

Template literals also allow newlines inside. Single/double quotes don't.

## Control flow

```ts
if (x > 0) {
  console.log("positive");
} else if (x === 0) {
  console.log("zero");
} else {
  console.log("negative");
}

for (let i = 0; i < 3; i++) { /* C-style */ }

for (const item of [1, 2, 3]) { /* iterate values (like Python `for x in xs`) */ }

for (const key in { a: 1, b: 2 }) { /* iterate object keys — rarely what you want */ }

while (condition) { /* ... */ }
```

**Watch out:** `for...in` iterates **keys** (including inherited ones), `for...of` iterates **values**. Python has one syntax; JS has two, and `for...of` is almost always the one you want.

## Equality: always use `===`

```ts
1 == "1"    // true  — loose equality coerces types. NEVER USE.
1 === "1"   // false — strict equality. Always use this.
```

Rule: **always write `===` and `!==`**. Treat `==` as if it doesn't exist. (Python's `==` is already strict; JS's `===` is the equivalent.)

## Arrays

```ts
const xs = [1, 2, 3];
xs.push(4);            // append in place, like Python's list.append
xs.length;             // 4, like len(xs)
xs[0];                 // 1 (note: strict mode flags this as possibly undefined — chapter 02)
xs.slice(1, 3);        // [2, 3] — returns a new array, like xs[1:3]
xs.map((x) => x * 2);  // [2, 4, 6, 8] — like [x*2 for x in xs]
xs.filter((x) => x % 2 === 0);   // [2, 4] — like [x for x in xs if x % 2 == 0]
xs.reduce((acc, x) => acc + x, 0); // 10 — like functools.reduce
```

`map`/`filter`/`reduce` are the array workhorses. If your Python brain reaches for a list comprehension, reach for `.map()` or `.filter()` here.

## Objects

Objects are JS's dicts. Keys are strings (or symbols), values are anything.

```ts
const user = { name: "Ada", age: 36 };
user.name;              // "Ada" — dot access
user["name"];           // "Ada" — bracket access, same thing
user.email = "a@b.com"; // add a new key by assignment
delete user.age;        // remove a key
"name" in user;         // true
Object.keys(user);      // ["name", "email"]
```

Unlike Python dicts, **the keys are identifiers, not strings, in the literal syntax**. `{ name: "Ada" }` not `{ "name": "Ada" }` (though the latter also works).

## Destructuring and spread

These are JS's best features. Get comfortable with them.

```ts
// Array destructuring
const [first, second] = [10, 20];           // like Python's a, b = [10, 20]
const [head, ...tail] = [1, 2, 3, 4];       // head=1, tail=[2,3,4]

// Object destructuring (no Python analogue — memorize this)
const { name, age } = { name: "Ada", age: 36, email: "a@b.com" };
const { name: n } = user;                    // rename while destructuring: n = user.name

// Spread in arrays
const more = [0, ...xs, 99];

// Spread in objects (like Python's {**a, **b})
const updated = { ...user, age: 37 };
```

## Functions

Two syntaxes. Both are fine; arrow functions are more common in modern code.

```ts
// Traditional function declaration
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function (preferred for short callbacks)
const add2 = (a: number, b: number): number => a + b;

// Default parameters
function greet(name = "world") {
  return `Hello, ${name}`;
}
```

**One big Python-to-JS trap:** there are no keyword arguments. You can't call `greet(name="Ada")`. The idiom is to pass an object:

```ts
function createUser({ name, age }: { name: string; age: number }) { /* ... */ }
createUser({ name: "Ada", age: 36 });   // "kwargs" via an object literal
```

This pattern is everywhere. Chapter 02 formalizes the types.

## Truthy / falsy

These values are **falsy**: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else (including `[]` and `{}` — yes, empty array and empty object are **truthy**, unlike Python) is truthy.

```ts
if (xs.length) { /* array has items */ }    // common idiom
if (user.name) { /* name is a non-empty string */ }
```

Two JS-specific operators:

```ts
const name = user.name ?? "anonymous";   // nullish coalescing: fall back if null/undefined (NOT other falsy)
const email = user?.email;               // optional chaining: undefined if user is null/undefined
```

`a ?? b` is like Python's `a if a is not None else b`. `a || b` is broader and also fires on `0`, `""` — usually not what you want.

---

## Files in this chapter

- `examples/hello.ts` — smallest runnable file
- `examples/tour.ts` — a guided tour touching each concept above
- `exercises/fizzbuzz.ts` — classic; tests in `fizzbuzz.test.ts`
- `exercises/list-ops.ts` — array method practice; tests in `list-ops.test.ts`

## Your turn

```bash
# Run the examples to see output:
npm run ex chapters/01-js-basics/examples/hello.ts
npm run ex chapters/01-js-basics/examples/tour.ts

# Start watching tests, then open the exercise files and make them pass:
npm run test:watch
```

When every test in this chapter is green, move on to [chapter 02](../02-ts-basics/README.md).
