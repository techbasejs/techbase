import { REGEXS } from "./shared/constants";

/**
 * Validates if the given string is a valid hex color string.
 *
 * This validation includes:
 * - Hexadecimal color strings can be 3, 6, or 8 characters long (excluding the leading `#`).
 * - The characters should be valid hexadecimal digits: 0-9, a-f, or A-F.
 * - The string can optionally start with a `#`.
 *
 * @param {string | null | undefined} input - The string to validate.
 * @param {boolean} [hasAlpha=false] - Optional parameter to specify if alpha values should be checked.
 * @returns {boolean} - Returns true if the input is a valid hex color, otherwise false.
 *
 * @example
 * // Valid cases
 * isHexColor("#FFFFFF"); // true
 * isHexColor("#FFF"); // true
 * isHexColor("000000"); // true
 * isHexColor("ABC"); // true
 * isHexColor("#FFFFFF00", true); // true
 * isHexColor("#FFF0", true); // true
 *
 * // Invalid cases
 * isHexColor("#GGG"); // false
 * isHexColor("#FFFFF"); // false
 * isHexColor("Hello"); // false
 * isHexColor(""); // false
 * isHexColor(null); // false
 * isHexColor(undefined); // false
 */
export function isHexColor(
  input: string | null | undefined,
  hasAlpha: boolean = false,
): boolean {
  if (typeof input !== "string") return false;

  // Define regex for hex color with optional alpha
  const hexColorRegex = hasAlpha ? REGEXS.HEXCOLOR : REGEXS.HEXCOLOR;

  return hexColorRegex.test(input);
}
