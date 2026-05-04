import { describe, it, expect } from "vitest";
import { handle } from "./event-handler.ts";

describe("handle", () => {
  it("describes clicks", () => {
    expect(handle({ type: "click", x: 10, y: 20 })).toBe("click at (10, 20)");
  });

  it("describes keypresses", () => {
    expect(handle({ type: "keypress", key: "Enter" })).toBe("key Enter");
  });

  it("describes scrolls", () => {
    expect(handle({ type: "scroll", delta: 5 })).toBe("scroll by 5");
  });

  it("describes focus events", () => {
    expect(handle({ type: "focus", target: "email-input" })).toBe(
      "focus on email-input",
    );
  });
});
