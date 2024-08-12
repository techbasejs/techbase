/**
 * Creates a function that checks if a given number is within a specified range.
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @return {Function} Returns a function that takes a number and returns true if the number is within the specified range, false otherwise.
 *
 * @example
 * const isWithinRange = inRange(10, 20);
 * 
 * console.log(isWithinRange(15)); // true
 * console.log(isWithinRange(5));  // false
 * console.log(isWithinRange(25)); // false
 */
export const inRange = (min: number, max: number) => {
  return (value: number) => {
    if (typeof value !== "number") {
      return false;
    }
    return value >= min && value <= max;
  };
};
