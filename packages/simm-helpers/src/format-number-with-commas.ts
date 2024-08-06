/**
 * Convert data to number with commas.
 * @param input - The input value.
 * @returns The converted string.
 */
export const formatNumberWithCommas = (input: number | string): string => {
  if (!input && input !== 0 && input !== "0") return "";
  if (input === 0) return "0";
  const inputStr = typeof input === "number" ? input.toString() : input;

  // Split into integer and decimal parts
  const parts = inputStr.split(".");

  const formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.length > 1
    ? `${formattedInteger}.${parts[1]}`
    : formattedInteger;
};
