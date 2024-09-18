import { REGEXS } from "./shared/constants";

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
