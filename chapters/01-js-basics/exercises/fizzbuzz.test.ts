import { describe, it, expect } from "vitest";
import { fizzbuzz } from "./fizzbuzz.ts";

describe("fizzbuzz", () => {
  it("returns an empty array for n=0", () => {
    expect(fizzbuzz(0)).toEqual([]);
  });

  it("handles the first five values", () => {
    expect(fizzbuzz(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
  });

  it("handles Fizz, Buzz, and FizzBuzz", () => {
    const result = fizzbuzz(15);
    expect(result[2]).toBe("Fizz");     // i=3
    expect(result[4]).toBe("Buzz");     // i=5
    expect(result[14]).toBe("FizzBuzz"); // i=15
  });

  it("returns strings, not numbers", () => {
    const result = fizzbuzz(3);
    expect(typeof result[0]).toBe("string");
  });
});
