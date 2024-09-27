/**
 * Validates if the given string passes the Luhn algorithm or not.
 *
 * @param {any} input The string to validate.
 * @returns {boolean} Returns true if the string passes the Luhn algorithm, false otherwise.
 *
 * @example
 * ```typescript
 * isLuhnNumber("555555-555555-4444"); // true
 * isLuhnNumber("4111111111111111"); // true
 * ```
 */
const isLuhnNumber = (input: any) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // Remove all space and dash characters
  const sanitized = input.replace(/[- ]+/g, "");

  let sum = 0;
  let shouldDouble = false;

  // Reverse iterate each number from right to left
  for (let i = sanitized.length - 1; i >= 0; i--) {
    // The current digit
    let digit = +sanitized.substring(i, i + 1);

    // Double each 2nd digit started from rightmost digit
    if (shouldDouble) {
      // Double digit, if digit has 2 characters length, then get sum of 2 characters
      digit *= 2;
      sum += digit >= 10 ? (digit % 10) + 1 : digit;
    } else {
      sum += digit;
    }

    // Toggle double status
    shouldDouble = !shouldDouble;
  }

  // If sum divisible by 10, then passes Luhn algorithm
  return !!(sum % 10 === 0 ? sanitized : false);
};

export { isLuhnNumber };
