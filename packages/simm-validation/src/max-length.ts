/**
 * Check if the length of an array, string, or number is at most the given maximum length.
 * Using code units, Doesn't work for emojis. Updated to version 2.
 * @param value - The array, string, or number to check.
 * @param max - The maximum length.
 * @returns True if the length is at most the maximum, otherwise false.
 */
export const maxLength = (value: any, max: number): boolean => {
  if (typeof value === 'number') {
      return value.toString().length <= max;
  }
  return (Array.isArray(value) || typeof value === 'string') && value.length <= max;
};
