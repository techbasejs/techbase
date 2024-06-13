import {
  EXCEL_FORMAT_REGEX,
  ISO8601_REGEX,
  ISO9075_REGEX,
  RFC3339_REGEX,
  RFC7231_REGEX,
} from "./constants";

export {
  dateToExcelFormat,
  excelFormatToDate,
  isExcelFormat,
  isISO8601DateTimeString,
  isISO9075DateString,
  isMongoObjectId,
  isRFC3339DateString,
  isRFC7231DateString,
  isTimestamp,
  isUTCDateString,
  isUnixTimestamp,
};

function createRegexMatcher(regex: RegExp) {
  return (date?: string) => date != null && regex.test(date);
}

const isISO8601DateTimeString = createRegexMatcher(ISO8601_REGEX);
const isISO9075DateString = createRegexMatcher(ISO9075_REGEX);
const isRFC3339DateString = createRegexMatcher(RFC3339_REGEX);
const isRFC7231DateString = createRegexMatcher(RFC7231_REGEX);
const isUnixTimestamp = createRegexMatcher(/^\d{1,10}$/);
const isTimestamp = createRegexMatcher(/^\d{1,13}$/);
const isMongoObjectId = createRegexMatcher(/^[\dA-Fa-f]{24}$/);

const isExcelFormat = createRegexMatcher(EXCEL_FORMAT_REGEX);

/**
 * Determines whether the provided string is a valid UTC date string.
 *
 * @param {string | undefined | null} date - The string to validate.
 * @returns {boolean} True if the string is a valid UTC date string; otherwise, false.
 */
function isUTCDateString(date?: string) {
  if (date == null) {
    return false;
  }

  try {
    return new Date(date).toUTCString() === date;
  } catch {
    return false;
  }
}

/**
 * Converts a JavaScript Date object to an Excel format date.
 * (1000 * 60 * 60 * 24) is the number of milliseconds in a day.
 * 25_569 is the number of days since 01/01/1900
 * @param {Date} date - The JavaScript Date object to convert.
 * @returns {string} The converted Excel format date.
 */
function dateToExcelFormat(date: Date) {
  return String(date.getTime() / (1000 * 60 * 60 * 24) + 25_569);
}

/**
 * Converts an Excel format date to a JavaScript Date object.
 * (1000 * 60 * 60 * 24) is the number of milliseconds in a day.
 * 25_569 is the number of days since 01/01/1900
 * @param {string | number} excelFormat - The Excel format date to convert.
 * @returns {Date} The converted JavaScript Date object.
 */
function excelFormatToDate(excelFormat: string | number) {
  return new Date((Number(excelFormat) - 25_569) * 86_400 * 1000);
}
