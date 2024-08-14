import { describe, expect, test } from "vitest";
import { isUniqueArray } from "../src/is-unique-array";

// Define a helper function to create a File object
const createFile = (name: string, content: string, mimeType: string) => {
  return new File([content], name, { type: mimeType });
};

describe("isUniqueArray", () => {
  describe("isArrayUniqueValid", () => {
    test("should return true for an empty array", () => {
      expect(isUniqueArray([])).toBe(true);
    });

    test("should return true for an array with unique elements", () => {
      expect(isUniqueArray([1, 2, 3, 4])).toBe(true);
    });

    test("should return true for an array with one element", () => {
      expect(isUniqueArray(["a"])).toBe(true);
    });

    test("should return true for an array with mixed types of unique elements", () => {
      expect(isUniqueArray([1, "a", true, null])).toBe(true);
    });

    test("should return true for an array with objects with unique references", () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      expect(isUniqueArray([obj1, obj2, obj3])).toBe(true);
    });

    test("returns true for an array of unique File objects", () => {
      const file1 = createFile("file1.txt", "content1", "text/plain");
      const file2 = createFile("file2.txt", "content2", "text/plain");
      const file3 = createFile("file3.txt", "content3", "text/plain");

      expect(isUniqueArray([file1, file2, file3])).toBe(true);
    });

    test("returns true for an array created with new Array(2) with unique values", () => {
      const arr = Array.from({ length: 2 });
      arr[0] = 1;
      arr[1] = 2;
      expect(isUniqueArray(arr)).toBe(true);
    });
  });

  describe("isArrayUniqueInvalid", () => {
    test("should return false for an array with duplicate elements", () => {
      expect(isUniqueArray([1, 2, 3, 2, 4])).toBe(false);
    });

    test("should return false for an array with duplicate string elements", () => {
      expect(isUniqueArray(["a", "b", "c", "b", "d"])).toBe(false);
    });

    test("should return false for an array with mixed types including duplicates", () => {
      expect(isUniqueArray([1, "a", true, null, 1])).toBe(false);
    });

    test("should return false for an array with objects with duplicate references", () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      expect(isUniqueArray([obj1, obj2, obj1])).toBe(false);
    });

    test("returns false for an array of duplicate File objects", () => {
      const file1 = createFile("file1.txt", "content1", "text/plain");
      const file2 = createFile("file1.txt", "content1", "text/plain");
      expect(isUniqueArray([file1, file2])).toBe(false);
    });

    test("should return false for an array created with new Array(2)", () => {
      expect(isUniqueArray(Array.from({ length: 2 }))).toBe(false);
    });
  });
});
