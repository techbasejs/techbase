type AnyType = object | string | boolean | number | null;

/**
 * Convert Javascript value to string value.
 *
 * @private
 * @param value The value that needs to be converted.
 * @returns The converted value.
 */
const stringifyValue = (value: AnyType) => {
  let value_: string | null = "";

  if (value === null || value === undefined) {
    value_ = null;
  } else {
    if (typeof value === "object") {
      value_ = JSON.stringify(value);
    } else {
      value_ = value!.toString();
    }

    value_ = value_.trim().replace(/\+/g, "\\+").replace(/\s+/g, "+");
  }

  return value_;
};

/**
 * Stringify query object to query string url.
 *
 * @public
 * @param {object} obj The query object that needs to be stringified.
 * @returns The query string value.
 */
const stringify = (obj: { [key: string]: AnyType }) => {
  if (!Object.keys(obj).length) return "";

  let query = "?";

  for (const key in obj) {
    const value = stringifyValue(obj[key]);
    query += value === null ? key : `${key}=${value}&`;
  }

  query = query
    .slice(0, query.endsWith("&") ? query.length - 1 : query.length)
    .trim()
    .replace(/\s+/g, "+");

  return query;
};

export { stringify };
