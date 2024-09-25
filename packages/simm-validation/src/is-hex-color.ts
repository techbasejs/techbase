import { REGEXS } from "./shared/constants";

/**
 * Validates if the given string is a valid hex color string.
 *
 * This validation includes:
 * - Hexadecimal color strings can be 3 or 6 characters long (excluding the leading `#`).
 * - The characters should be valid hexadecimal digits: 0-9, a-f, or A-F.
 * - The string can optionally start with a `#`.
 *
 * @param {string | null | undefined} input - The string to validate.
 * @returns {boolean} - Returns true if the string is a valid hex color string, false otherwise.
 *
 * @example
 * ```typescript
 * const result1 = isHexColor("#FFFFFF"); // true, valid hex color
 * const result2 = isHexColor("#FFF"); // true, valid shorthand hex color
 * const result3 = isHexColor("000000"); // true, valid hex color without #
 * const result4 = isHexColor("#GGG"); // false, invalid characters
 * const result5 = isHexColor(""); // false, empty string
 * const result6 = isHexColor(null); // false, input is null
 * const result7 = isHexColor(undefined); // false, input is undefined
 * ```
 */
export const isHexColor = (input: string | null | undefined): boolean => {
  if (typeof input !== "string") {
    return false;
  }

  return REGEXS.HEXCOLOR.test(input);
};
