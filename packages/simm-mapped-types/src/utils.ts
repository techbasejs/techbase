// src/utils.ts
import { DEFAULT_STRING, DEFAULT_NUMBER } from './constants';
import _ from 'lodash';

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
