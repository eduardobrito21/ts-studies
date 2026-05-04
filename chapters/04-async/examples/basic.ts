// Basic async / await in TS.

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function greetAfter(ms: number, name: string): Promise<string> {
  await sleep(ms);
  return `Hello, ${name}`;
}

// Top-level await works in ESM (this repo is "type": "module").
console.log("starting...");
const msg = await greetAfter(200, "Ada");
console.log(msg);
console.log("done.");
