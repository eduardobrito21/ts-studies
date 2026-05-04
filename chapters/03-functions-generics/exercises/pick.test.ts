import { describe, it, expect } from "vitest";
import { pick } from "./pick.ts";

describe("pick", () => {
  it("returns a subset with the requested keys", () => {
    const user = { id: 1, name: "Ada", email: "a@b.com", age: 36 };
    expect(pick(user, ["id", "name"])).toEqual({ id: 1, name: "Ada" });
  });

  it("returns an empty object if no keys requested", () => {
    expect(pick({ a: 1, b: 2 }, [])).toEqual({});
  });

  it("does not include keys not requested", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ["a"]);
    expect(result).toEqual({ a: 1 });
    expect("b" in result).toBe(false);
  });

  it("does not mutate the input", () => {
    const obj = { a: 1, b: 2 };
    pick(obj, ["a"]);
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
