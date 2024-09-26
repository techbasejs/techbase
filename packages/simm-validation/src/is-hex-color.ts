import { REGEXS } from "./shared/constants";

/**
 * Validates if the given string is a valid hex color string.
 *
 * This validation includes:
 * - Hexadecimal color strings must start with a `#` and can be 3, 6, or 8 characters long.
 * - The characters should be valid hexadecimal digits: 0-9, a-f, or A-F.
 *
 * @param {string | null | undefined} input - The string to validate.
 * @param {boolean} [hasAlpha=false] - Optional parameter to specify if alpha values should be checked.
 * @returns {boolean} - Returns true if the input is a valid hex color, otherwise false.
 *
 * @example
 * // Valid cases
 * isHexColor("#FFFFFF"); // true
 * isHexColor("#FFF"); // true
 * isHexColor("#FFFFFF00", true); // true
 * isHexColor("#FFF0", true); // true
 *
 * // Invalid cases
 * isHexColor("000000"); // false
 * isHexColor("ABC"); // false
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

  // Define regex for hex color requiring the # prefix
  const hexColorRegex = hasAlpha
    ? REGEXS.HEXCOLOR_OPACITY // Allowing 4-character hex with alpha
    : REGEXS.HEXCOLOR; // Without alpha check

  return hexColorRegex.test(input);
}
