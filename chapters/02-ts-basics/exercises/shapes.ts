// A discriminated union of 2D shapes.
// Implement `area` using narrowing on the `kind` field.
//
// Formulas:
//   circle:    π * r²
//   rectangle: width * height
//   triangle:  0.5 * base * height

export type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

export function area(shape: Shape): number {
  // TODO: narrow on shape.kind and return the right formula.
  return 0;
}
