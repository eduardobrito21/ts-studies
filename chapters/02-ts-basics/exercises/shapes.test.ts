import { describe, it, expect } from "vitest";
import { area, type Shape } from "./shapes.ts";

describe("area", () => {
  it("computes circle area", () => {
    expect(area({ kind: "circle", radius: 1 })).toBeCloseTo(Math.PI, 5);
    expect(area({ kind: "circle", radius: 3 })).toBeCloseTo(Math.PI * 9, 5);
  });

  it("computes rectangle area", () => {
    expect(area({ kind: "rectangle", width: 4, height: 5 })).toBe(20);
  });

  it("computes triangle area", () => {
    expect(area({ kind: "triangle", base: 10, height: 4 })).toBe(20);
  });

  it("handles a list of mixed shapes", () => {
    const shapes: Shape[] = [
      { kind: "circle", radius: 1 },
      { kind: "rectangle", width: 2, height: 3 },
      { kind: "triangle", base: 4, height: 5 },
    ];
    const total = shapes.reduce((sum, s) => sum + area(s), 0);
    expect(total).toBeCloseTo(Math.PI + 6 + 10, 5);
  });
});
