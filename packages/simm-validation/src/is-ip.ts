import { REGEXS } from "./shared/constants";

/**
 * A constant object that represents the string values for IP versions.
 * - V4: Represents IPv4 with a string value 'IPv4'.
 * - V6: Represents IPv6 with a string value 'IPv6'.
 */
export const IP_VERSION = {
  V4: "IPv4",
  V6: "IPv6",
} as const;
/**
 * A constant object that represents the numerical values for IP versions.
 * - V4: Represents IPv4 with a value of 4.
 * - V6: Represents IPv6 with a value of 6.
 */
export const IP_VERSION_NUMBER = {
  V4: 4,
  V6: 6,
} as const;
const MAX_LENGTH_IP_V4 = 15 as const; // 255.255.255.255
const MAX_LENGTH_IP_V6 = 45 as const; // ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff%eth0

/**
 * Checks if the input string is a valid IPv4 address.
 *
 * The function first validates if the input is not null, undefined,
 * or exceeds the maximum allowed length for an IPv4 address.
 * It then uses a regular expression to determine if the input is a valid IPv4 address.
 *
 * @param input - The input string to be checked as an IPv4 address.
 *                It can be `null`, `undefined`, or a valid string.
 *
 * @returns `true` if the input is a valid IPv4 address, `false` otherwise.
 *
 * @example
 * ```typescript
 * isIPv4("192.168.0.1"); // true
 * isIPv4("255.255.255.255"); // true
 * isIPv4("999.999.999.999"); // false
 * isIPv4(null); // false
 * isIPv4("example.com"); // false
 * ```
 */
export const isIPv4 = (input?: string | null | undefined): boolean => {
  if (!input || input.length > MAX_LENGTH_IP_V4) return false;
  return REGEXS.IP_V4.test(input);
};

/**
 * Checks if the input string is a valid IPv6 address.
 *
 * The function first validates if the input is not null, undefined, or exceeds
 * the maximum allowed length for an IPv6 address. It then uses a regular expression
 * to determine if the input is a valid IPv6 address.
 *
 * @param input - The input string to be checked as an IPv6 address.
 *                It can be `null`, `undefined`, or a valid string.
 *
 * @returns `true` if the input is a valid IPv6 address, `false` otherwise.
 *
 * @example
 * ```typescript
 * isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // true
 * isIPv6("::1"); // true (loopback address)
 * isIPv6("fe80::1%eth0"); // true (link-local with interface)
 * isIPv6("12345::abcd"); // false (invalid format)
 * isIPv6("2001:::85a3::8a2e:0370"); // false (invalid format)
 * isIPv6("::g1"); // false (invalid character)
 * isIPv6(null); // false (null input)
 * ```
 */
export const isIPv6 = (input?: string | null | undefined): boolean => {
  if (!input || input.length > MAX_LENGTH_IP_V6) return false;
  return REGEXS.IP_V6.test(input);
};

/**
 * Determines the IP version (IPv4 or IPv6) of a given input string.
 * @param input - The input string to check for an IP address.
 * @returns 6 for a valid IPv6 address, 4 for a valid IPv4 address, and -1 for invalid or undefined input.
 *
 * @example
 * ```typescript
 * ipVersion('192.168.1.1'); // 4
 * ipVersion('2001:0db8:85a3:0000:0000:8a2e:0370:7334'); // 6
 * ipVersion('invalid-ip'); // -1
 * ```
 */
export const ipVersion = (
  input?: string | null | undefined,
): (typeof IP_VERSION_NUMBER)[keyof typeof IP_VERSION_NUMBER] | -1 => {
  if (isIPv6(input)) return IP_VERSION_NUMBER.V6;
  if (isIPv4(input)) return IP_VERSION_NUMBER.V4;
  return -1;
};

/**
 * Verifies if the provided IP address matches the expected IP version (IPv4 or IPv6).
 * @param input - The input string to check for an IP address.
 * @param typeIp - The expected IP version ('IPv4' or 'IPv6').
 * @returns `true` if the IP matches the expected version, otherwise `false`.
 *
 * @example
 * ```typescript
 * isIP('192.168.1.1', 'IPv4'); // true
 * isIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334', 'IPv6'); // true
 * isIP('192.168.1.1', 'IPv6'); // false
 * ```
 */
export const isIP = (
  input?: string | null | undefined,
  typeIp?: (typeof IP_VERSION)[keyof typeof IP_VERSION],
): boolean => {
  return `IPv${ipVersion(input)}` == typeIp;
};
