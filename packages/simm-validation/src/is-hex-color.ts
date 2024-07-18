/**
 * Checks if a given string is a valid hexadecimal color code.
 *
 * The function validates hexadecimal color codes that can optionally start with '#'.
 * It accepts both short (3 characters) and long (6 characters) formats.
 *
 * @param {string} color - The string to be checked as a hexadecimal color code.
 * @returns {boolean} - Returns `true` if the string is a valid hexadecimal color code, otherwise `false`.
 */
export const isHexColor = (color: string): boolean => {
 const regex = /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6})$/;
  return regex.test(color);
}
