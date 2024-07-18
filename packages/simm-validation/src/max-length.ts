/**
 * Check if the length of an array or string is at most the given maximum length.
 * Using code units, Doesn't work for emojis. Updated to version 2.
 * @param value - The array or string to check.
 * @param max - The maximum length.
 * @returns True if the length is at most the maximum, otherwise false.
 */
export const maxLength = (value: any[], max: number): boolean => {
    return value.length <= max;
};
