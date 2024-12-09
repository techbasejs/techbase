export const regexValidate = {
  LATITUDE_REGEX: /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/,
  LONGITUDE_REGEX: /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/,
  generateLatDMSRegex: (d: string, m: string, s: string) =>
    new RegExp(
      `^(([1-8]?\\d)${d}([1-5]?\\d|60)${m}([1-5]?\\d|60)(\\.\\d+)?|90${d}0${m}0)${s}[NSns]?$`,
      "i",
    ),
  generateLongDMSRegex: (d: string, m: string, s: string) =>
    new RegExp(
      `^([1-7]?\\d{1,2}${d}([1-5]?\\d|60)${m}([1-5]?\\d|60)(\\.\\d+)?|180${d}0${m}0)${s}[EWew]?$`,
      "i",
    ),
};

interface Options {
  checkDMS?: boolean;
  dmsUnits?: {
    degree: string;
    minute: string;
    second: string;
  };
}

/**
 * Validates if the given string is Latitude and Longitude value or not.
 *
 * @param {any} input The string to validate.
 * @param {boolean} checkDMS Check the format LatLong is DMS.
 * @param {object} dmsUnits The unit text of DMS `{ degree, minute, second }`.
 * @returns {boolean} Returns true if the string is LatLong, false otherwise.
 *
 * @example
 * ```typescript
 * isLatLong("-12.849293,+24.433594"); // true
 * isLatLong("12° 50' 57.4548'' N,24° 26' 0.9384'' E"); // true
 * isLatLong("-12.849293,+24.433594", { checkDMS: true }); // false
 * isLatLong("12d 50m 57.4548s N, 24d 26m 0.9384s E", {
 *  dmsUnits: { degree: "d", minute: "m", second: "s" },
 * ); // true
 * ```
 */
const isLatLong = (input: any, options?: Options) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // Replace all white spaces and newlines with empty string
  input = input.replace(/\s/g, "").replace(/\n|\r/, "");

  // LatLong must be separated by comma
  if (!input.includes(",")) return false;

  const pair = input.split(",");

  // Check if LatLong is wrapped by parentheses
  if (
    (pair[0].startsWith("(") && !pair[1].endsWith(")")) ||
    (pair[1].endsWith(")") && !pair[0].startsWith("("))
  )
    return false;

  // Get DMS value
  const d = options?.dmsUnits?.degree || "°";
  const m = options?.dmsUnits?.minute || "'";
  const s = options?.dmsUnits?.second || "''";

  const latRegex = regexValidate.LATITUDE_REGEX;
  const longRegex = regexValidate.LONGITUDE_REGEX;
  const latDMSRegex = regexValidate.generateLatDMSRegex(d, m, s);
  const longDMSRegex = regexValidate.generateLongDMSRegex(d, m, s);

  // Check by DMS format
  if (options?.checkDMS)
    return latDMSRegex.test(pair[0]) && longDMSRegex.test(pair[1]);

  // Check lat-long pairs is matched by both normal and dms
  return (
    (latRegex.test(pair[0]) && longRegex.test(pair[1])) ||
    (latDMSRegex.test(pair[0]) && longDMSRegex.test(pair[1]))
  );
};

export { isLatLong };
