import { describe, it, expect } from "vitest";
import { isIPv4, isIPv6 } from "../src/is-ip";

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
});
