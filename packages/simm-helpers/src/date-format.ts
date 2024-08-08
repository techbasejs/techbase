/**
 * Formats a given date according to the specified format string.
 *
 * @param {DateType} date - The date to format. It can be a Date object, a string representing a date, null, or undefined.
 * @param {FormatType} format - The format string that specifies the output format of the date. The format can include year, month, day, hour, minute, and second components.
 * @return {string} The formatted date string according to the specified format. Returns an empty string if the date is null or undefined.
 * @throws {TypeError} Throws an error if the date is of an invalid type or if the date string is invalid.
 */
type DateType = string | Date | null | undefined;
type FormatType =
  | "YYYY"
  | "MM"
  | "DD"
  | "HH"
  | "mm"
  | "ss"
  | `${"YYYY" | "MM" | "DD"}${"-" | "/"}${"YYYY" | "MM" | "DD"}`
  | `${"HH" | "mm" | "ss"}${":"}${"HH" | "mm" | "ss"}`
  | "YYYY-MM-DD HH:mm:ss"
  | "YYYY-MM-DD"
  | "YYYY-MM-DD HH:mm";

const padZero = (num: number): string => String(num).padStart(2, "0");

export function dateFormat(date: DateType, format: FormatType): string {
  let dateObj: Date;
  if (date === null || date === undefined) {
    return "";
  } else if (typeof date === "string") {
    dateObj = new Date(date);
    if (Number.isNaN(dateObj.getTime())) {
      throw new TypeError(`Invalid date string '${date}'`);
    }
  } else if (date instanceof Date) {
    if (Number.isNaN(date.getTime())) {
      throw new TypeError(`Invalid Date object`);
    }
    dateObj = date;
  } else {
    throw new TypeError(`Invalid date type '${date}'`);
  }
  try {
    const day = padZero(dateObj?.getDate());
    const month = padZero(dateObj.getMonth() + 1);
    const year = dateObj.getFullYear();
    const hours = padZero(dateObj.getHours());
    const minutes = padZero(dateObj.getMinutes());
    const seconds = padZero(dateObj.getSeconds());

    const formattedDate = format
      .replace("YYYY", year.toString())
      .replace("MM", month)
      .replace("DD", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds);

    return formattedDate;
  } catch (error) {
    throw new TypeError(
      `Error formatting date: ${(error as TypeError).message}`,
    );
  }
}
