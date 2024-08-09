/**
 * Check if the length of an array or string is at least the given minimum length.
 * Using code units, Doesn't work for emojis. Updated to version 2.
 * @param value - The array or string to check.
 * @param min - The minimum length.
 * @returns True if the length is at least the minimum, otherwise false.
 */
export const minLength = (value: string | number, min: number): boolean => {
    if (typeof value === 'string') {
        return value.length >= min;
    } else if (typeof value === 'number') {
        return value.toString().length >= min;
    } else {
        return false;
    }
};
