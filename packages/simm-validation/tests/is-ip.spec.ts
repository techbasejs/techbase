import { describe, it, expect } from "vitest";
import {
  ipVersion,
  isIP,
  isIPv4,
  isIPv6,
  IP_VERSION,
  IP_VERSION_NUMBER,
} from "../src/is-ip";

describe("isIP", () => {
  describe("isIPv4 check", () => {
    it("should return true for valid IPv4 addresses", () => {
      expect(isIPv4("192.168.0.1")).toBe(true);
      expect(isIPv4("255.255.255.255")).toBe(true);
      expect(isIPv4("0.0.0.0")).toBe(true);
      expect(isIPv4("1.1.1.1")).toBe(true);
      expect(isIPv4("127.0.0.1")).toBe(true);
    });

    it("should return false for invalid IPv4 addresses", () => {
      expect(isIPv4("999.999.999.999")).toBe(false);
      expect(isIPv4("192.168.1")).toBe(false);
      expect(isIPv4("192.168.0.256")).toBe(false);
      expect(isIPv4("example.com")).toBe(false);
      expect(isIPv4("1234::5678")).toBe(false);
    });

    it("should return false for null, undefined, or empty string", () => {
      expect(isIPv4(null)).toBe(false);
      expect(isIPv4(undefined)).toBe(false);
      expect(isIPv4("")).toBe(false);
    });

    it("should return false for input exceeding maximum length", () => {
      const longInput = "192.168.0.1".repeat(10);
      expect(isIPv4(longInput)).toBe(false);
    });
  });

  describe("isIPv6 check", () => {
    it("should return true for valid IPv6 addresses", () => {
      expect(isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
      expect(isIPv6("::1")).toBe(true);
      expect(isIPv6("fe80::1%eth0")).toBe(true);
      expect(isIPv6("2001:db8::123.123.123.123")).toBe(true);
      expect(isIPv6("::ffff:192.168.1.1")).toBe(true);
      expect(isIPv6("2001:db8:85a3::8a2e:0370:7334")).toBe(true);
      expect(isIPv6("::1234:5678")).toBe(true);
    });

    it("should return false for invalid IPv6 addresses", () => {
      expect(isIPv6("12345::abcd")).toBe(false);
      expect(isIPv6("2001:::85a3::8a2e:0370")).toBe(false);
      expect(isIPv6("::g1")).toBe(false);
      expect(isIPv6("::1::")).toBe(false);
      expect(isIPv6("2001:db8::12345:6789")).toBe(false);
      expect(isIPv6("abcd::1234::5678")).toBe(false);
      expect(isIPv6("abcd:1234:5678:90ab:cd34:efgh:ijkl:mnop")).toBe(false);
    });

    it("should return false for null, undefined, or empty string", () => {
      expect(isIPv6(null)).toBe(false);
      expect(isIPv6(undefined)).toBe(false);
      expect(isIPv6("")).toBe(false);
    });

    it("should return false for input exceeding maximum length", () => {
      const longInput = "2001:0db8:85a3:0000:0000:8a2e:0370:7334".repeat(10);
      expect(isIPv6(longInput)).toBe(false);
    });
  });

  describe("ipVersion check", () => {
    it("should return 4 for valid IPv4 addresses", () => {
      expect(ipVersion("192.168.1.1")).toBe(IP_VERSION_NUMBER.V4);
      expect(ipVersion("127.0.0.1")).toBe(IP_VERSION_NUMBER.V4);
      expect(ipVersion("0.0.0.0")).toBe(IP_VERSION_NUMBER.V4);
      expect(ipVersion("255.255.255.255")).toBe(IP_VERSION_NUMBER.V4);
      expect(ipVersion("8.8.8.8")).toBe(IP_VERSION_NUMBER.V4);
    });

    it("should return 6 for valid IPv6 addresses", () => {
      expect(ipVersion("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(
        IP_VERSION_NUMBER.V6,
      );
      expect(ipVersion("::1")).toBe(IP_VERSION_NUMBER.V6);
      expect(ipVersion("fe80::1ff:fe23:4567:890a")).toBe(IP_VERSION_NUMBER.V6);
      expect(ipVersion("::")).toBe(IP_VERSION_NUMBER.V6);
      expect(ipVersion("2001:0db8::")).toBe(IP_VERSION_NUMBER.V6);
    });

    it("should return -1 for invalid or empty input", () => {
      expect(ipVersion("invalid-ip")).toBe(-1);
      expect(ipVersion("")).toBe(-1);
      expect(ipVersion(null)).toBe(-1);
      expect(ipVersion(undefined)).toBe(-1);
      expect(ipVersion("192.168.1")).toBe(-1);
    });
  });

  describe("isIP check", () => {
    it("should return true for valid IPv4 addresses", () => {
      expect(isIP("192.168.1.1", IP_VERSION.V4)).toBe(true);
      expect(isIP("127.0.0.1", IP_VERSION.V4)).toBe(true);
      expect(isIP("255.255.255.255", IP_VERSION.V4)).toBe(true);
      expect(isIP("8.8.8.8", IP_VERSION.V4)).toBe(true);
      expect(isIP("0.0.0.0", IP_VERSION.V4)).toBe(true);
    });

    it("should return true for valid IPv6 addresses", () => {
      expect(
        isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334", IP_VERSION.V6),
      ).toBe(true);
      expect(isIP("::1", IP_VERSION.V6)).toBe(true);
      expect(isIP("fe80::1ff:fe23:4567:890a", IP_VERSION.V6)).toBe(true);
      expect(isIP("::", IP_VERSION.V6)).toBe(true);
      expect(isIP("2001:0db8::", IP_VERSION.V6)).toBe(true);
    });

    it("should return false for invalid IP addresses or mismatching types", () => {
      expect(isIP("192.168.1.1", IP_VERSION.V6)).toBe(false);
      expect(
        isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334", IP_VERSION.V4),
      ).toBe(false);
      expect(isIP("invalid-ip", IP_VERSION.V4)).toBe(false);
      expect(isIP("invalid-ip", IP_VERSION.V6)).toBe(false);
      expect(isIP("", IP_VERSION.V4)).toBe(false);
    });
  });
});
