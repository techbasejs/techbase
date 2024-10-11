import { REGEXS } from "./shared/constants";

/**
 * Validates if the given string is a valid RGB color string.
 *
 * This validation includes:
 * - RGB format: `rgb(r, g, b)` where `r`, `g`, and `b` are integers between 0 and 255
 * - Whitespace between `rgb`, parentheses, and values are optional but valid
 *
 * The regex used checks for valid RGB format.
 *
 * @param {string | null | undefined} input - The string to validate.
 * @returns {boolean} - Returns true if the string is a valid RGB color string, false otherwise.
 *
 * @example
 * ```typescript
 * const result1 = isRgbColor("rgb(255, 255, 255)"); // true, valid RGB color
 * const result2 = isRgbColor("rgb(0,0,0)"); // true, valid RGB color
 * const result3 = isRgbColor("rgb(256,0,0)"); // false, out-of-bounds value
 * const result4 = isRgbColor("rgb(255,255)"); // false, invalid RGB format
 * const result5 = isRgbColor(""); // false, empty string
 * const result6 = isRgbColor(null); // false, input is null
 * const result7 = isRgbColor(undefined); // false, input is undefined
 * ```
 */
export const isRgbColor = (input: string | null | undefined): boolean => {
  if (typeof input !== "string") {
    return false;
  }

  const match = input.match(REGEXS.rgbColor);

  if (!match) {
    return false;
  }

  const [r, g, b] = match.slice(1, 4).map(Number);

  return [r, g, b].every((value) => value >= 0 && value <= 255);
};
