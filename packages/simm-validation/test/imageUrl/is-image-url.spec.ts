import { expect, describe, test } from "vitest";
import { isImageURL } from "../../src/imageUrl/is-image-url";

describe("isImageURL", () => {
  test("returns true for valid image URLs", () => {
    const validImageURLs = [
      "https://tinyjpg.com/images/social/website.jpg",
      "https://cdn.pixabay.com/photo/2017/09/01/00/15/png-2702691_640.png",
      "https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif",
    ];

    validImageURLs.forEach((imageUrl) => {
      expect(isImageURL(imageUrl)).toBe(true);
    });
  });

  test("returns false for non-image URLs", () => {
    const nonImageURLs = [
      "https://example.com/document.pdf",
      "https://example.com/video.mp4",
      "https://example.com/archive.zip",
    ];

    nonImageURLs.forEach((url) => {
      expect(isImageURL(url)).toBe(false);
    });
  });

  test("returns false for null or undefined input", () => {
    expect(isImageURL(null)).toBe(false);
    expect(isImageURL(undefined)).toBe(false);
  });
});