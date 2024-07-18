/**
 * Check if the given string is alphanumeric.
 * @param str - The string to check.
 * @returns True if the string is alphanumeric, otherwise false.
 */
export const isAlphanumeric = (str: string): boolean => {
  const alphanumericRegex = /^[\dA-Za-z]+$/;
  return alphanumericRegex.test(str);
};
