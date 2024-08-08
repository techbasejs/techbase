import { test, expect, describe } from "vitest";

import { isURL } from "../src/is-url";

describe("isURL", () => {
  test("Valid HTTP URL", () => {
    expect(isURL("http://example.com")).toBe(true);
  });

  test("Valid HTTPS URL", () => {
    expect(isURL("https://www.example.com")).toBe(true);
  });

  test("Valid FTP URL", () => {
    expect(isURL("ftp://ftp.example.com")).toBe(true);
  });

  test("Valid URL with subdomain and country code TLD", () => {
    expect(isURL("http://subdomain.example.co.uk")).toBe(true);
  });

  test("Valid URL with port and path", () => {
    expect(isURL("http://example.com:8080/path/to/page")).toBe(true);
  });

  test("Valid URL with query parameters", () => {
    expect(isURL("https://example.com?q=1")).toBe(true);
  });

  test("Valid URL with fragment identifier", () => {
    expect(isURL("http://example.com#fragment")).toBe(true);
  });

  test("Invalid URL", () => {
    expect(isURL("invalid-url")).toBe(false);
  });

  test("Valid URL with IP address", () => {
    expect(isURL("http://142.251.220.110")).toBe(true);
  });

  test("Valid URL with encoded URL", () => {
    expect(
      isURL(
        "https://www.youtube.com/results?search_query=C%2B%2B%20programming%20tutorials",
      ),
    ).toBe(true);

    expect(
      isURL("https://example.com/search?q=C%2B%2B%20programming&lang=en"),
    ).toBe(true);
  });
});
