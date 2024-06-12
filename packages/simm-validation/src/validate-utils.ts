/**
 * Determines if the input value is a valid date.
 *
 * @param value The value to be checked if it represents a valid date.
 * @returns A boolean indicating whether the input value is a valid date.
 */
export const isDate = (value: number | string) => {
  return !Number.isNaN(new Date(value).valueOf());
};

/**
 * Calculates the number of full days between two dates.
 *
 * @param startDate The starting date.
 * @param endDate The ending date.
 * @returns The number of full days between the two dates.
 */
export const calcDate = (startDate: Date, endDate: Date) => {
  // Define a constant for the number of milliseconds in one day
  const DAILY_MS = 86_400_000;
  const sDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  const eDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );
  return (eDate.getTime() - sDate.getTime()) / DAILY_MS;
};
