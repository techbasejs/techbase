import { test, expect, describe } from "vitest";

import { isStandardURL } from "../src/is-standard-url";

describe("isStandardEmail", () => {
    test("Valid HTTP URL", () => {
        expect(isStandardURL("http://example.com")).toBe(true);
    });
      
    test("Valid HTTPS URL", () => {
        expect(isStandardURL("https://www.example.com")).toBe(true);
    });
      
    test("Valid FTP URL", () => {
        expect(isStandardURL("ftp://ftp.example.com")).toBe(true);
    });
      
    test("Valid URL with subdomain and country code TLD", () => {
        expect(isStandardURL("http://subdomain.example.co.uk")).toBe(true);
    });
      
    test("Valid URL with port and path", () => {
        expect(isStandardURL("http://example.com:8080/path/to/page")).toBe(true);
    });
      
    test("Valid URL with query parameters", () => {
        expect(isStandardURL("https://example.com?q=1")).toBe(true);
    });
      
    test("Valid URL with fragment identifier", () => {
        expect(isStandardURL("http://example.com#fragment")).toBe(true);
    });
      
    test("Invalid URL", () => {
        expect(isStandardURL("invalid-url")).toBe(false);
    });
});