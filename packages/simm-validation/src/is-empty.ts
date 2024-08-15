/**
 * Checks whether a value is empty.
 *
 * @typeparam T The type of the value to check.
 * @param value The value to check for emptiness.
 * @returns `true` if the value is empty, `false` otherwise.
 *
 * This function considers the following values to be empty:
 *   - `null` and `undefined`
 *   - Empty strings and arrays
 *   - Empty Sets and Maps
 *   - Dates and Files (considered non-empty by default)
 *   - Objects with no own properties
 *
 * For all other types, the function assumes they are not empty.
 */
export function isEmpty<T>(value: T): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string" || Array.isArray(value)) {
    return (value as string | T[]).length === 0;
  }

  if (value instanceof Set || value instanceof Map) {
    return value.size === 0;
  }

  if (value instanceof Date || value instanceof File) {
    return false;
  }

  if (typeof value === "object") {
    return Object.entries(value).length === 0;
  }

  return false;
}

// export default isEmpty;
