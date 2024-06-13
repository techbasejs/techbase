/**
 * Convert phone number to phone number with hyphens.
 * @param input - The input value.
 * @returns The converted string | number | undefined.
 */
export const formatPhoneNumberWithHyphens = (
  input: string | number | undefined,
): string | number | undefined => {
  if (!input) return input;

  const phoneNumber = input.toString();
  const isStartPlus = phoneNumber.startsWith("+");
  const phoneNumberDigits = isStartPlus ? phoneNumber.slice(1) : phoneNumber;
  const phoneNumberLength = phoneNumberDigits.length;

  if (phoneNumberLength < 4) {
    return isStartPlus ? `+${phoneNumberDigits}` : phoneNumberDigits;
  } else if (phoneNumberLength < 7) {
    return `${isStartPlus ? "+" : ""}${phoneNumberDigits.slice(0, 3)}-${phoneNumberDigits.slice(3)}`;
  } else if (phoneNumberLength < 11) {
    return `${isStartPlus ? "+" : ""}${phoneNumberDigits.slice(0, 3)}-${phoneNumberDigits.slice(3, 6)}-${phoneNumberDigits.slice(6)}`;
  } else {
    return `${isStartPlus ? "+" : ""}${phoneNumberDigits.slice(0, 3)}-${phoneNumberDigits.slice(3, 6)}-${phoneNumberDigits.slice(6, 10)}-${phoneNumberDigits.slice(10)}`;
  }
};

/**
 * Convert data to decimal.
 * @param input - The input value.
 * @returns The converted number.
 */
export const formatDecimal = (input: number, fixed?: number): number => {
  if (!input || input === 0) return 0;
  return Number(input.toFixed(fixed));
};

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

/**
 * Convert Currency to USD.
 * @param input - The input value.
 * @returns The converted string.
 */
export const formatCurrencyUS = (input: string | number): string => {
  if (!input || input === 0 || input === "0") return "$0";

  const numberInput = typeof input === "string" ? Number(input) : input;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numberInput);
};

/**
 * Convert Currency to JPY.
 * @param input - The input value.
 * @returns The converted string.
 */
export const formatCurrencyJPY = (input: string | number): string => {
  if (!input && input !== 0 && input !== "0") return "";

  const numberInput = typeof input === "string" ? Number(input) : input;
  const formattedCurrency = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(numberInput);
  return formattedCurrency || "￥0";
};

/**
 * Convert Currency to JPY.
 * @param input - The input value.
 * @returns The converted string.
 */
export const formatCurrencyJPYFloat = (
  input: number | string,
  fixed?: number,
): string => {
  if (!input && input !== 0 && input !== "0") return "";

  let number = typeof input === "string" ? Number.parseFloat(input) : input;

  if (number === 0) {
    return "￥0.00"; // Return ￥0.00 if input is zero
  }

  number = Number.parseFloat(
    fixed !== undefined && fixed !== null && fixed >= 0
      ? number.toFixed(fixed)
      : number.toFixed(2),
  );

  const formattedNumber = number.toLocaleString("ja-JP", {
    style: "currency",
    currency: "JPY",
    currencyDisplay: "symbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedNumber;
};
