import {
  EXCEL_FORMAT_REGEX,
  ISO8601_REGEX,
  ISO9075_REGEX,
  RFC3339_REGEX,
  RFC7231_REGEX,
} from "./constants";

/**
 * Determines if the input value is a valid date.
 * @param value The value to be checked if it represents a valid date.
 * @returns A boolean indicating whether the input value is a valid date.
 */
export const isDate = (value: number | string) => {
  return !Number.isNaN(new Date(value).valueOf());
};

export {
  excelFormatToDate,
  isExcelFormat,
  isISO8601DateTimeString,
  isISO9075DateString,
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
