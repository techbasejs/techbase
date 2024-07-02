import { compareUrls } from "../src/index";
import { describe, it, expect } from "vitest";

describe("compareUrls", () => {
  it("should return true for identical URLs", () => {
    expect(compareUrls("https://example.com", "https://example.com")).toBe(
      true,
    );
  });

  it("should return false for URLs with different schemes (http and https)", () => {
    expect(compareUrls("http://example.com", "https://example.com")).toBe(
      false,
    );
  });

  it("should return false for URLs with different domains", () => {
    expect(compareUrls("https://google.com", "https://example.com")).toBe(
      false,
    );
  });

  it("should return false for URLs with different path lengths", () => {
    expect(
      compareUrls(
        "https://example.com/path1/path2",
        "https://example.com/path1",
      ),
    ).toBe(false);
  });

  it("should return false for URLs where one has a named parameter and the other does not", () => {
    expect(
      compareUrls(
        "https://example.com/path1/path2",
        "https://example.com/path1/:path2",
      ),
    ).toBe(true);
  });

  it("should return true for URLs where one has a named parameter and the other also has a value at that position", () => {
    expect(
      compareUrls(
        "https://example.com/path1/path2",
        "https://example.com/path1/:value",
      ),
    ).toBe(true);
  });

  it("should return false when comparing a URL with a path to one without", () => {
    expect(
      compareUrls("https://example.com/path1", "https://example.com"),
    ).toBe(false);
  });

  it("should return false for URLs with different query parameters", () => {
    expect(
      compareUrls("https://example.com?param=value", "https://example.com"),
    ).toBe(false);
  });

  it("should return false for URLs with different path identifiers", () => {
    expect(
      compareUrls(
        "https://example.com/path1/123213/detail",
        "https://example.com/path1/:id",
      ),
    ).toBe(false);
  });

  it("should return false for URLs with different fragment identifiers", () => {
    expect(
      compareUrls("https://example.com#fragment", "https://example.com"),
    ).toBe(false);
  });

  it("should return true when path includes named parameter with specified starting string", () => {
    expect(
      compareUrls(
        "https://example.com/path1/123213",
        "https://example.com/path1/*id",
        "*",
      ),
    ).toBe(true);
  });
});
