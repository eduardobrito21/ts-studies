import { describe, it, expect, vi } from "vitest";
import { retry } from "./retry.ts";

describe("retry", () => {
  it("returns immediately on first success", async () => {
    const task = vi.fn(async () => "ok");
    const result = await retry(task, 3, 0);
    expect(result).toBe("ok");
    expect(task).toHaveBeenCalledTimes(1);
  });

  it("retries until success", async () => {
    let calls = 0;
    const task = async () => {
      calls += 1;
      if (calls < 3) throw new Error(`fail ${calls}`);
      return "finally";
    };
    const result = await retry(task, 5, 0);
    expect(result).toBe("finally");
    expect(calls).toBe(3);
  });

  it("throws the last error after exhausting attempts", async () => {
    let calls = 0;
    const task = async () => {
      calls += 1;
      throw new Error(`fail ${calls}`);
    };
    await expect(retry(task, 3, 0)).rejects.toThrow("fail 3");
    expect(calls).toBe(3);
  });

  it("waits delayMs between attempts", async () => {
    let calls = 0;
    const task = async () => {
      calls += 1;
      if (calls < 2) throw new Error("retry me");
      return "done";
    };
    const start = Date.now();
    const result = await retry(task, 3, 50);
    const elapsed = Date.now() - start;
    expect(result).toBe("done");
    expect(elapsed).toBeGreaterThanOrEqual(45);
  });
});
