// src/utils.ts
import { DEFAULT_STRING, DEFAULT_NUMBER } from "./constants";
import _ from "lodash";

/**
 * Convert input to string.
 * @param input - The input value.
 * @returns The converted string.
 */
export function toString(input: any): string {
  if (_.isNil(input) || _.isNaN(input) || input === 0) {
    return DEFAULT_STRING;
  }
  return String(input);
}

/**
 * Convert input to number.
 * @param input - The input value.
 * @returns The converted number.
 */
export function toNumber(input: any): number {
  if (_.isNil(input) || _.isNaN(input) || input === 0) {
    return DEFAULT_NUMBER;
  }
  return Number(input);
}

/**
 * Convert input to Date.
 * @param input - The input value.
 * @returns The converted Date.
 */
export function toDate(input: string | number): Date {
  return new Date(input);
}

/**
 * Convert input to string or return "0" if input is empty.
 * @param input - The input value.
 * @returns The converted string or "0".
 */
export function toStringOrEmptyToZeroString(input: any): string {
  if (_.isNil(input) || _.isNaN(input) || input === 0) {
    return "0";
  }
  return String(input);
}

/**
 * Convert input to string or return 0 if input is empty.
 * @param input - The input value.
 * @returns The converted string or 0.
 */
export function toStringOrEmptyToZeroNumber(input: any): number {
  if (_.isNil(input) || _.isNaN(input) || input === 0) {
    return 0;
  }
  return Number(input);
}

/**
   * Method to convert the target to a string (`null` becomes an empty string).
   * If the argument is `null`, it returns an empty string, otherwise it converts the argument to a string and returns it.
   * If the argument is `undefined` or `NaN`, it also returns an empty string.
   *
   * @param data The data to be converted to a string
   * @return The string converted from the argument
   */
export const toStringNullToEmpty = (data: string | number | null | undefined): string => {
  const isNullOrUndefined = data == null;
  const isNaN = Number.isNaN(data);
  if (isNullOrUndefined || isNaN) return "";
  return String(data);
}

/**
 * Method to convert the target to a string (`null` remains `null`).
 * If the argument is `null`, it returns `null`, otherwise it converts the argument to a string and returns it.
 * If the argument is `undefined` or `NaN`, it also returns `null`.
 *
 * @param data The data to be converted to a string
 * @return The string converted from the argument
 */
export const toStringNullToNull = (data: string | number | null | undefined): string | null => {
  const isNullOrUndefined = data == null;
  const isNaN = Number.isNaN(data);
  if (isNullOrUndefined || isNaN) return null;
  return String(data);
}

/**
 * Method to convert the target to a string (`null` becomes `0`).
 * If the argument is `null`, it returns `0`, otherwise it converts the argument to a string and returns it.
 * If the argument is `undefined` or `NaN`, it also returns `0`.
 *
 * @param data The data to be converted to a string
 * @return The string converted from the argument
 */
export const toStringNullToZero = (data: string | number | null | undefined): string => {
  const isNullOrUndefined = data == null;
  const isNaN = Number.isNaN(data);
  if (isNullOrUndefined || isNaN) return "0";
  return String(data);
}
