export const exponentialDecimalRegex = /(.*)e-(\d*)/;
export const exponentialBigIntRegex = /(.*)e\+(\d*)/;

/**
 * Initializes a number formatter for US Dollar with the style set to currency and currency code set to USD.
 */
export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * Initializes a number formatter for Vietnamese Dong with the style set to currency and currency code set to VND.
 */
export const VNDong = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "VND",
});

/**
 * Initializes a number formatter for British pounds with the style set to currency and currency code set to GBP.
 */
export const pounds = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

/**
 * Initializes a number formatter for Indian Rupee with the style set to currency and currency code set to INR.
 */
export const rupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

/**
 * Initializes a number formatter for Euro with the style set to currency and currency code set to EUR.
 */
export const euro = new Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});

/**
 * Initializes a number formatter for Japanese Yen with the style set to currency and currency code set to JPY.
 */
export const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});

/**
 * Formats a given value based on the decimal places of an example value.
 * If the given value is NaN or falsy, it defaults to 0.
 *
 * @param value - The value to be formatted.
 * @param example - The example value used to determine the decimal places.
 * @returns A string representing the formatted value with the same decimal places as the example value.
 */
export const formatDecimalByExample = (
  value: number,
  example: number,
): string => {
  if (Number.isNaN(value) || !value) {
    value = 0;
  }
  let numberDecimal = 0;
  numberDecimal = countDecimals(exponentialToString(example || 0));
  return intToFloat(exponentialToString(value), numberDecimal);
};

/**
 * Converts a number in exponential notation to a string representation.
 *
 * @param value - The number in exponential notation to be converted to a string.
 * @returns A string representation of the number in exponential notation.
 */
export const exponentialToString = (value: number): string => {
  const v = value.toString();
  const exponentialDecimal = v.match(exponentialDecimalRegex);
  const exponentialBigInt = v.match(exponentialBigIntRegex);
  if (exponentialDecimal) {
    return (
      "0." +
      Array.from({ length: Number.parseInt(exponentialDecimal[2], 10) }).join(
        "0",
      ) +
      exponentialDecimal[1].replace(".", "")
    );
  }
  if (exponentialBigInt) {
    const count =
      Number(exponentialBigInt[2]) -
      exponentialBigInt[1].split(".")[1].length +
      1;
    return (
      exponentialBigInt[1].replace(".", "") +
      Array.from({ length: Number.parseInt(count.toString(), 10) }).join("0")
    );
  }
  return v;
};

/**
 * Counts the number of decimal places in a given numeric string value.
 *
 * @param value The numeric string value to count decimal places for.
 * @returns The number of decimal places in the given numeric string value. Returns 0 if the value is an integer.
 */
const countDecimals = (value: string): number => {
  if (Math.floor(Number(value)) === Number(value)) return 0;
  return value.toString().split(".")[1].length || 0;
};

/**
 * Converts a numeric value to a string representation with a specified number of decimal places.
 *
 * @param value - The numeric value to convert to a string.
 * @param numberDecimal - The number of decimal places to include in the string representation.
 * @returns A string representation of the numeric value with the specified number of decimal places.
 */
const intToFloat = (value: number | string, numberDecimal: number): string => {
  const valueStr = String(value).split(".");
  const tempArr: any[] = [];
  tempArr.length = numberDecimal + 1;
  let decimal = tempArr.join("0");
  if (valueStr[1]) {
    decimal =
      valueStr[1].length > numberDecimal
        ? valueStr[1].slice(0, numberDecimal)
        : valueStr[1] +
          Array.from({ length: numberDecimal - valueStr[1].length + 1 }).join(
            "0",
          );
  }
  return valueStr[0] + (numberDecimal > 0 ? "." + decimal : "");
};
