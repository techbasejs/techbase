type AnyType = object | string | boolean | number | null;

/**
 * Convert Javascript value to string value.
 *
 * @private
 * @param value The value that needs to be converted.
 * @returns The converted value.
 */
const stringifyValue = (value: AnyType) => {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" || typeof value === "boolean")
    return value.toString();
  /**
   * Convert value of object to string if type is object
   * and convert all "+" to "\\+" to differentiate with "+" that is converted from space
   * and then replace all space character by "+".
   */
  return (typeof value === "object" ? JSON.stringify(value) : value)
    .trim()
    .replace(/\+/g, "\\+")
    .replace(/\s+/g, "+");
};

/**
 * Stringify query object to query string url.
 *
 * @public
 * @param {object} obj The query object that needs to be stringified.
 * @returns The query string value.
 */
const stringifyUrlQuery = (obj: { [key: string]: AnyType }) => {
  // If object is empty then returns empty string.
  if (!Object.keys(obj).length) return "";

  let query = "?";

  // Loop through all key, value pairs in object.
  for (const key in obj) {
    // Stringify object value.
    const value = stringifyValue(obj[key]);
    // If value is null, then it only has key, otherwise shows "&key=value".
    query += value === null ? key : `${key}=${value}&`;
  }

  // Remove the last "&" from query string.
  query = query
    .trim()
    .slice(0, query.endsWith("&") ? query.length - 1 : query.length);

  return query;
};

export { stringifyUrlQuery };
