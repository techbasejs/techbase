import { expect, describe, test } from "vitest";
import { isMinValue } from "../../src/minMaxValue/is-min-value";

describe("isMinValue", () => {
  test("should return true if the given number is the minimum value in the array", () => {
    const array = [10, 5, 8, 12, 3];
    const num = 3;
    const result = isMinValue(num, array);
    expect(result).toBe(true);
  });

  test("should return false if the given number is not the minimum value in the array", () => {
    const array = [10, 5, 8, 12, 3];
    const num = 15;
    const result = isMinValue(num, array);
    expect(result).toBe(false);
  });

  test("should return false if the array is empty", () => {
    const array: number[] = [];
    const num = 10;
    const result = isMinValue(num, array);
    expect(result).toBe(false);
  });

  test("should return false if the number is null", () => {
    const array = [10, 5, 8, 12, 3];
    const num = null;
    const result = isMinValue(num, array);
    expect(result).toBe(false);
  });

  test("should return false if the number is string", () => {
    const array = [10, 5, 8, 12, 3];
    const num = "123";
    const result = isMinValue(num, array);
    expect(result).toBe(false);
  });
});
