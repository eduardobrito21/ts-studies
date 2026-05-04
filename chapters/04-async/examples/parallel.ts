// Sequential vs parallel — same work, different wall time.

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function slowFetch(name: string, ms: number): Promise<string> {
  await sleep(ms);
  return `[${name} done in ${ms}ms]`;
}

async function runSequential() {
  const start = Date.now();
  const a = await slowFetch("A", 200);
  const b = await slowFetch("B", 200);
  const c = await slowFetch("C", 200);
  console.log("sequential:", Date.now() - start, "ms", { a, b, c });
}

async function runParallel() {
  const start = Date.now();
  const [a, b, c] = await Promise.all([
    slowFetch("A", 200),
    slowFetch("B", 200),
    slowFetch("C", 200),
  ]);
  console.log("parallel:  ", Date.now() - start, "ms", { a, b, c });
}

await runSequential();   // ~600ms
await runParallel();     // ~200ms
