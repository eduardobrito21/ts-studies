import { describe, it, expect } from "vitest";
import { mapValues } from "./map-values.ts";

describe("mapValues", () => {
  it("transforms numeric values", () => {
    expect(mapValues({ a: 1, b: 2, c: 3 }, (n) => n * 10)).toEqual({
      a: 10,
      b: 20,
      c: 30,
    });
  });

  it("passes the key to the transform", () => {
    const input = { a: 1, b: 2 };
    const result = mapValues(input, (v, k) => `${k}=${v}`);
    expect(result).toEqual({ a: "a=1", b: "b=2" });
  });

  it("returns an empty object for an empty input", () => {
    expect(mapValues<string, number, number>({}, (n) => n + 1)).toEqual({});
  });

  it("does not mutate the input", () => {
    const input = { a: 1, b: 2 };
    mapValues(input, (n) => n * 2);
    expect(input).toEqual({ a: 1, b: 2 });
  });
});
