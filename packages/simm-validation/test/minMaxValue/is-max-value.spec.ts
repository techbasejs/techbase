import { expect, describe, test } from "vitest";
import { isMaxValue } from "../../src/minMaxValue/is-max-value";

describe("isMaxValue", () => {
  test("should return true if the given number is the maximum value in the array", () => {
    const array = [10, 5, 8, 12, 3];
    const num = 12;
    const result = isMaxValue(num, array);
    expect(result).toBe(true);
  });

  test("should return false if the given number is not the maximum value in the array", () => {
    const array = [10, 5, 8, 12, 3];
    const num = 15;
    const result = isMaxValue(num, array);
    expect(result).toBe(false);
  });

  test("should return false if the array is empty", () => {
    const array: number[] = [];
    const num = 10;
    const result = isMaxValue(num, array);
    expect(result).toBe(false);
  });

  test("should return false if the number is null", () => {
    const array = [10, 5, 8, 12, 3];
    const num = null;
    const result = isMaxValue(num, array);
    expect(result).toBe(false);
  });

  test("should return false if the number is string", () => {
    const array = [10, 5, 8, 12, 3];
    const num = "123";
    const result = isMaxValue(num, array);
    expect(result).toBe(false);
  });
});
