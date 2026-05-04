import { describe, it, expect } from "vitest";
import { sum, scale, longEnough, countIf } from "./list-ops.ts";

describe("sum", () => {
  it("is 0 for empty", () => {
    expect(sum([])).toBe(0);
  });
  it("adds positives", () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });
  it("handles negatives", () => {
    expect(sum([-1, 1, -2, 2])).toBe(0);
  });
});

describe("scale", () => {
  it("multiplies each element", () => {
    expect(scale([1, 2, 3], 10)).toEqual([10, 20, 30]);
  });
  it("returns [] for empty input", () => {
    expect(scale([], 5)).toEqual([]);
  });
  it("does not mutate the input", () => {
    const xs = [1, 2, 3];
    scale(xs, 2);
    expect(xs).toEqual([1, 2, 3]);
  });
});

describe("longEnough", () => {
  it("keeps strings at or above the threshold", () => {
    expect(longEnough(["a", "ab", "abc"], 2)).toEqual(["ab", "abc"]);
  });
  it("excludes all if threshold too high", () => {
    expect(longEnough(["a", "b"], 5)).toEqual([]);
  });
});

describe("countIf", () => {
  it("counts matches", () => {
    expect(countIf([1, 2, 3, 4, 5, 6], (x) => x % 2 === 0)).toBe(3);
  });
  it("is 0 if nothing matches", () => {
    expect(countIf([1, 2, 3], (x) => x > 100)).toBe(0);
  });
  it("works on strings", () => {
    expect(countIf(["apple", "banana", "fig"], (s) => s.length > 4)).toBe(2);
  });
});
