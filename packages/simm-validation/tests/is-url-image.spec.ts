import { expect, describe, test } from "vitest";
import { isImageURL } from "../src/is-url-image";

describe("isImageURL", () => {
  test("returns true for valid image URLs", () => {
    const validImageURLs = [
      "https://tinyjpg.com/images/social/website.jpg",
      "https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif",
      "http://142.251.220.110/png-2702691_640.png",
    ];

    for (const imageUrl of validImageURLs) {
      expect(isImageURL(imageUrl)).toBe(true);
    }
  });

  test("returns false for non-image URLs", () => {
    const nonImageURLs = [
      "https://example.com/document.pdf",
      "https://example.com/video.mp4",
      "abc",
    ];

    for (const url of nonImageURLs) {
      expect(isImageURL(url)).toBe(false);
    }
  });

  test("returns false for null input", () => {
    expect(isImageURL(null)).toBe(false);
  });
});
