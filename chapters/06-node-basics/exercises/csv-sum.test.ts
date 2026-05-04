import { describe, it, expect } from "vitest";
import { sumColumn } from "./csv-sum.ts";

const csv = `name,age,score
Ada,36,92
Grace,41,88
Alan,41,95
`;

describe("sumColumn", () => {
  it("sums a valid column", () => {
    expect(sumColumn(csv, "score")).toBe(92 + 88 + 95);
    expect(sumColumn(csv, "age")).toBe(36 + 41 + 41);
  });

  it("throws when the column is missing", () => {
    expect(() => sumColumn(csv, "height")).toThrow();
  });

  it("skips rows with non-numeric values", () => {
    const messy = `name,score
Ada,10
Grace,nope
Alan,5
`;
    expect(sumColumn(messy, "score")).toBe(15);
  });

  it("handles trailing blank lines", () => {
    const padded = csv + "\n\n";
    expect(sumColumn(padded, "age")).toBe(36 + 41 + 41);
  });
});
