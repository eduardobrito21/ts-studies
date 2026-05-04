import { describe, it, expect } from "vitest";
import { mean, variance } from "./stats/index.ts";

describe("mean", () => {
  it("is 0 for empty input", () => {
    expect(mean([])).toBe(0);
  });
  it("computes the arithmetic mean", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
  });
});

describe("variance", () => {
  it("is 0 for empty input", () => {
    expect(variance([])).toBe(0);
  });
  it("is 0 for a constant array", () => {
    expect(variance([5, 5, 5, 5])).toBe(0);
  });
  it("computes population variance", () => {
    // mean = 3; squared deviations = [4, 1, 0, 1, 4]; mean of those = 2
    expect(variance([1, 2, 3, 4, 5])).toBeCloseTo(2, 10);
  });
});
