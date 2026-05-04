// You're given a discriminated union of UI events. Implement `handle` such
// that it returns a short description of the event. Use a `switch` on
// `event.type` and include an exhaustive `never` default so you get a
// compile error if someone adds a new event type without updating `handle`.
//
// Expected outputs (keep them EXACTLY in this format — tests check strings):
//
//   { type: "click", x: 10, y: 20 }                     => "click at (10, 20)"
//   { type: "keypress", key: "Enter" }                  => "key Enter"
//   { type: "scroll", delta: 5 }                        => "scroll by 5"
//   { type: "focus", target: "email-input" }            => "focus on email-input"

export type UIEvent =
  | { type: "click"; x: number; y: number }
  | { type: "keypress"; key: string }
  | { type: "scroll"; delta: number }
  | { type: "focus"; target: string };

export function handle(event: UIEvent): string {
  // TODO: switch on event.type. Each branch narrows the event to a single
  // variant, so you get typed access to the other fields.
  //
  // After the last case, add:
  //   default: {
  //     const _exhaustive: never = event;
  //     return _exhaustive;
  //   }
  return "";
}
