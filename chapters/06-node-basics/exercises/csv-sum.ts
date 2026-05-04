// Parse a tiny CSV string and sum one of its numeric columns.
// We keep the parser dead-simple — no quoted fields, no escapes.
//
// Input format:
//   first line is a header row: "name,age,score"
//   subsequent lines are data rows: "Ada,36,92"
//
// sumColumn(csv, "score") => sum of the "score" column, parsed as numbers.
//
// Throw if the column is not present in the header.
// Ignore rows where the cell doesn't parse as a number.

export function sumColumn(csv: string, column: string): number {
  // TODO:
  // 1. Split csv into lines. Trim lines, drop empties.
  // 2. First line is the header — split on "," to get column names.
  // 3. Find the index of `column` in the header. If missing, throw.
  // 4. For each remaining line, split on ",", take the cell at that index,
  //    convert to number with Number(...), skip NaN, accumulate.
  return 0;
}
