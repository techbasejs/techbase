/**
 * Check if the length of an array, string, or number is at least the given minimum length.
 * Using code units, Doesn't work for emojis. Updated to version 2.
 * @param value - The array, string, or number to check.
 * @param min - The minimum length.
 * @returns True if the length is at least the minimum, otherwise false.
 */
export const minLength = (value: any, min: number): boolean => {
  if (typeof value === 'number') {
      return value.toString().length >= min;
  }
  return (Array.isArray(value) || typeof value === 'string') && value.length >= min;
};
