type AnyType = object | string | boolean | number | null;

/**
 * Split the first item as key and the others as value.
 *
 * @private
 * @param {string} string The string to split.
 * @param {string} separator The separator character.
 * @returns The array that contains key and value pairs.
 */
const splitOnFirst = (string: string, separator: string) => {
  if (string === "" || separator === "") return [];

  const separatorIndex = string.indexOf(separator);

  if (separatorIndex === -1) return [string, null];

  return [
    string.slice(0, separatorIndex),
    string.slice(separatorIndex + separator.length),
  ];
};

/**
 * Safe parse the string by JSON.parse utility.
 *
 * @private
 * @param {string} value The string to parse.
 * @returns The converted object from string.
 */
const parseJson = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

/**
 * Flat the array from nested child elements of original array.
 *
 * @private
 * @param {Array} arr The original array that needs to be flatten.
 * @returns The flatten array.
 */
const flatArray = (arr: AnyType[]) => {
  const arr_ = [];

  for (const item of arr) {
    arr_.push(...(Array.isArray(item) ? item : [item]));
  }

  return arr_;
};

/**
 * Convert string value to number,boolean,array,object.
 *
 * @private
 * @param {string|string[]} value The string that needs to be converted.
 * @returns The converted value.
 */
const parseValue = (value: string[] | string | null): AnyType => {
  if (value === null) return null;

  if (Array.isArray(value)) {
    const items = value.map((item) => parseValue(item));

    const hasOneArray = items.some((item) => Array.isArray(item));

    return hasOneArray ? flatArray(items) : items;
  }

  if (value.trim() === "") return "";

  if (!Number.isNaN(Number(value))) return Number(value);

  if (value.toLowerCase() === "true" || value.toLowerCase() === "false")
    return value.toLowerCase() === "true";

  if (
    (value.startsWith("{") && value.endsWith("}")) ||
    (value.startsWith("[") && value.endsWith("]"))
  )
    return parseJson(value);

  return value;
};

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
 * Parse query string to Javascript object values.
 *
 * @public
 * @param {string} query The query string that needs to be parsed.
 * @returns The parsed object value.
 */
const parse = (query: string) => {
  const params: { [key: string]: AnyType } = {};
  query = query
    .trim()
    .replace(/^[?#&]/, "")
    .replace(/(?<!\\)\+/g, " ")
    .replace(/\\\+/g, "+");
  const hashStart = query.indexOf("#");
  if (hashStart !== -1) {
    query = query.slice(0, hashStart);
  }

  const queryMap = new Map();
  for (const parameter of query.split("&")) {
    if (parameter === "") continue;

    const splitData = splitOnFirst(parameter, "=");
    let key = splitData[0] as string;
    let value = splitData[1];

    if (queryMap.has(key)) {
      const mapValue = queryMap.get(key);
      queryMap.set(
        key,
        Array.isArray(mapValue) ? [...mapValue, value] : [mapValue, value]
      );
    } else {
      queryMap.set(key, value);
    }
  }

  queryMap.forEach((value, key) => {
    params[key] = parseValue(value);
  });

  return params;
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

export { parse, stringify };
