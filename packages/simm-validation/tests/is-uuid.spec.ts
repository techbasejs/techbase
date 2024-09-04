import { describe, expect, it } from "vitest";
import { isUUID } from "../src/is-uuid";

describe("isUUID", () => {
  it("No.1: Should return true for a valid UUID", () => {
    expect(isUUID("123e4567-e89b-12d3-a456-426614174000")).toBe(true);

    // UUID v1-5
    expect(isUUID("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    // UUID v6 (Random)
    expect(isUUID("1e840055-29b4-41d4-a716-446655440000")).toBe(true);
    // UUID v7 (Unix Epoch Time)
    expect(isUUID("017f22e2-79b0-7cc0-98a2-1a785e6a1b3a")).toBe(true);
  });

  it("No.2: Should return false for an invalid UUID with missing characters", () => {
    expect(isUUID("123e4567-e89b-12d3-a456-42661417400")).toBe(false);
  });

  it("No.3: Should return false for an invalid UUID with extra characters", () => {
    expect(isUUID("123e4567-e89b-12d3-a456-4266141740000")).toBe(false);
  });

  it("No.4: Should return false for an invalid UUID with non-hex characters", () => {
    expect(isUUID("123e4567-e89b-12d3-a456-42661417400g0")).toBe(false);
  });

  it("No.5: Should return false for a non-string value", () => {
    expect(isUUID(null)).toBe(false);
    expect(isUUID(undefined)).toBe(false);
    expect(isUUID(123)).toBe(false);
    expect(isUUID({})).toBe(false);
    expect(isUUID([])).toBe(false);
    expect(isUUID(true)).toBe(false);
  });
});
