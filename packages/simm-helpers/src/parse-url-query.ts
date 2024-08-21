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
  // If string or separator character is empty then returns empty.
  if (string === "" || separator === "") return [];

  const separatorIndex = string.indexOf(separator);

  // If separator does not exist in string, then returns key as string and value is null.
  if (separatorIndex === -1) return [string, null];

  // Returns key,value pairs by separator character.
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
  return arr.flat();
};

/**
 * Convert string value to number,boolean,array,object.
 *
 * @private
 * @param {string|string[]} value The string that needs to be converted.
 * @returns The converted value.
 */
const parseValue = (value: string[] | string | null): AnyType => {
  // If value is null, returns null.
  if (value === null) return null;

  /**
   * If value is array, then parse all item value of array
   * flat array if has nested array inside array
   * and then returns array of parsed values.
   */
  if (Array.isArray(value)) {
    const items = value.map((item) => parseValue(item));

    const hasOneArray = items.some((item) => Array.isArray(item));

    return hasOneArray ? flatArray(items) : items;
  }

  // If value is empty string, returns empty string.
  if (value.trim() === "") return "";

  // If value is a valid number, returns parsed number.
  if (!Number.isNaN(Number(value))) return Number(value);

  // If value is "true" or "false", then converts and returns boolean value.
  if (value.toLowerCase() === "true" || value.toLowerCase() === "false")
    return value.toLowerCase() === "true";

  // If value is object string, then then parses json and returns object value.
  if (
    (value.startsWith("{") && value.endsWith("}")) ||
    (value.startsWith("[") && value.endsWith("]"))
  )
    return parseJson(value);

  // If value is normal string, just returns it
  return value;
};

/**
 * Parse query string to Javascript object values.
 *
 * @public
 * @param {string} query The query string that needs to be parsed.
 * @returns The parsed object value.
 */
const parseUrlQuery = (query: string) => {
  const params: { [key: string]: AnyType } = {};
  /**
   * Replace redundant characters in url (?#&), convert "+" to space character
   * and replace all "\+" to "+".
   */
  query = query
    .trim()
    .replace(/^[#&?]/, "")
    .replace(/(?<!\\)\+/g, " ")
    .replace(/\\\+/g, "+");
  // Remove hash string (#xyz) if exists.
  const hashStart = query.indexOf("#");
  if (hashStart !== -1) {
    query = query.slice(0, hashStart);
  }

  const queryMap = new Map();
  // Loop through all key,value pairs in query string and group value from key.
  for (const parameter of query.split("&")) {
    // Skip the empty string.
    if (parameter === "") continue;

    // Getting the key,value pairs.
    const splitData = splitOnFirst(parameter, "=");
    const key = splitData[0] as string;
    const value = splitData[1];

    // If key already exists in map, the add new value to the end of array value.
    if (queryMap.has(key)) {
      const mapValue = queryMap.get(key);
      queryMap.set(
        key,
        // If value is array, just add new value to the end of array,
        // otherwise convert the old value and new value as array of 2 items.
        Array.isArray(mapValue) ? [...mapValue, value] : [mapValue, value],
      );
    }
    // Otherwise just set key,value pairs to map.
    else {
      queryMap.set(key, value);
    }
  }

  // Loop through all key,value pairs and parse value to proper type.
  for (const [key, value] of queryMap.entries()) {
    params[key] = parseValue(value);
  }

  return params;
};

export { parseUrlQuery };
