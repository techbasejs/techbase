import { REGEXS } from "./shared/constants";

/**
 * Validates if the given string is a valid Base64 encoded string.
 *
 * This validation includes:
 * - Base64 characters: A-Z, a-z, 0-9, +, /
 * - Base64 padding characters: = (up to two characters at the end)
 *
 * The regex used checks for valid Base64 format with proper padding.
 *
 * @param {string | null | undefined} input - The string to validate.
 * @returns {boolean} - Returns true if the string is a valid Base64 encoded string, false otherwise.
 *
 * @example
 * ```typescript
 * const result1 = isBase64("SGVsbG8gd29ybGQ="); // true, valid Base64 string
 * const result2 = isBase64("SGVsbG8gd29ybGQ"); // true, valid Base64 string without padding
 * const result3 = isBase64("12345"); // false, invalid Base64 string
 * const result4 = isBase64("SGVsbG8gd29ybGQ=="); // true, valid Base64 string with padding
 * const result5 = isBase64("SGVsbG8gd29ybGQ==="); // false, invalid Base64 string with too much padding
 * const result6 = isBase64(""); // false, empty string
 * const result7 = isBase64(null); // false, input is null
 * const result8 = isBase64(undefined); // false, input is undefined
 * ```
 */
export const isBase64 = (input: string | null | undefined): boolean => {
  return typeof input === "string" && REGEXS.BASE64.test(input);
};
