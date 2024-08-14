/**
 * Check if all elements in an array are unique.
 * @typeparam T The type of the value to check.
 * @param arr - The array to check for uniqueness.
 * @returns True if all elements are unique, otherwise false.
 * @example
 * // Example with primitive values
 * const numbers = [1, 2, 3, 4, 5];
 * console.log(isUniqueArray(numbers)); // true
 *
 * const mixedNumbers = [1, 2, 3, 2];
 * console.log(isUniqueArray(mixedNumbers)); // false
 *
 * // Example with File objects
 * const file1 = new File([''], 'file1.txt', { type: 'text/plain' });
 * const file2 = new File([''], 'file2.txt', { type: 'text/plain' });
 * const file3 = new File([''], 'file1.txt', { type: 'text/plain' });
 *
 * const files = [file1, file2, file3];
 * console.log(isUniqueArray(files)); // false
 *
 * const uniqueFiles = [file1, file2];
 * console.log(isUniqueArray(uniqueFiles)); // true
 */

export const isUniqueArray = <T>(arr: T[]): boolean => {
  const uniqueSet = new Set<T>();

  for (const item of arr) {
    if (item instanceof File) {
      const key = `${item.name}|${item.size}|${item.type}`;
      if (uniqueSet.has(key as T)) {
        return false;
      }
      uniqueSet.add(key as T);
      continue;
    }

    if (uniqueSet.has(item)) {
      return false;
    }
    uniqueSet.add(item);
  }

  return true;
};
