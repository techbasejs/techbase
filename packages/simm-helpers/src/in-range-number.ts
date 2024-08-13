/**
 * Checks if a given number is within a specified range.
 *
 * @param {number} value - The number to check.
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @return {boolean} Returns true if the number is within the specified range, false otherwise.
 *
 * @example
 * console.log(inRangeNumber(15, 10, 20)); // true
 * console.log(inRangeNumber(5, 10, 20));  // false
 * console.log(inRangeNumber(25, 10, 20)); // false
 */
export const inRangeNumber = (value: number, min: number, max: number): boolean => {
  if (typeof value !== "number") {
    return false;
  }
  return value >= min && value <= max;
};
