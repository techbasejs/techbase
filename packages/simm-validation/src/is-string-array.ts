/**
 * Checks if the given string is a JSON array.
 *
 * @param strArray - The string to check.
 * @returns `true` if the string is a valid JSON array, `false` otherwise.
 *
 * @example
 * ```typescript
 * isStringArray('["apple", "banana", "cherry"]'); // returns true
 * isStringArray('[1, 2, "3"]'); // returns true
 * isStringArray('{"key": "value"}'); // returns false
 * isStringArray(null); // returns false
 * isStringArray('not an array'); // returns false
 * ```
 */
export const isStringArray = (strArray?: string | null): boolean => {
  if (!strArray || typeof strArray !== "string") return false;
  try {
    const parsed = JSON.parse(strArray);
    return Array.isArray(parsed);
  } catch {
    return false;
  }
};
