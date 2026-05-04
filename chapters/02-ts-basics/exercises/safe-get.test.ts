import { describe, it, expect } from "vitest";
import { safeGet, firstOrNull } from "./safe-get.ts";

describe("safeGet", () => {
  it("returns the element when in range", () => {
    expect(safeGet([10, 20, 30], 1, -1)).toBe(20);
  });

  it("returns the fallback when out of range", () => {
    expect(safeGet([10, 20, 30], 5, -1)).toBe(-1);
    expect(safeGet<number>([], 0, 99)).toBe(99);
  });

  it("returns the fallback for negative indices", () => {
    expect(safeGet([10, 20, 30], -1, -1)).toBe(-1);
  });

  it("works on strings", () => {
    expect(safeGet(["a", "b"], 0, "z")).toBe("a");
    expect(safeGet(["a", "b"], 2, "z")).toBe("z");
  });
});

describe("firstOrNull", () => {
  it("returns the first element if present", () => {
    expect(firstOrNull([1, 2, 3])).toBe(1);
  });

  it("returns null when empty", () => {
    expect(firstOrNull<number>([])).toBeNull();
  });
});
