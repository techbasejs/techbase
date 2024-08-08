import {
  getValueOfFirstKeyFromObject,
  getAllValueOfKeyFromObject,
  getValueFromObjectByPath,
} from "../src/utils/object-utils";
import { describe, expect, it } from "vitest";

describe("getValueOfFirstKeyFromObject", () => {
  it("should find the key in a simple object", () => {
    const obj = { key1: "value1", key2: { key3: "value3" } };
    const result = getValueOfFirstKeyFromObject(obj, "key1");
    expect(result).toEqual({ value: "value1", path: "key1" });
  });

  it("should find the key in a nested object", () => {
    const obj = { key1: { key2: { key3: "value3" } } };
    const result = getValueOfFirstKeyFromObject(obj, "key3");
    expect(result).toEqual({ value: "value3", path: "key1.key2.key3" });
  });

  it("should return default value when key not found", () => {
    const obj = { key1: "value1" };
    const result = getValueOfFirstKeyFromObject(obj, "key2");
    expect(result).toEqual({ value: null, path: "" });
  });
});

describe("getAllValueOfKeyFromObject", () => {
  it("should return an empty array if the key is not found", () => {
    const obj = { a: { b: { c: 1 } } };
    const result = getAllValueOfKeyFromObject(obj, "d");
    expect(result).toEqual([]);
  });

  it("should return an array with the value and path of all occurrences of the key", () => {
    const obj = { a: { b: { c: 1 }, d: { e: 2 } }, f: 3 };
    const result = getAllValueOfKeyFromObject(obj, "c");
    expect(result).toEqual([{ value: 1, path: "a.b.c" }]);
  });

  it("should handle nested objects", () => {
    const obj = { a: { b: { c: { d: 1 } } } };
    const result = getAllValueOfKeyFromObject(obj, "d");
    expect(result).toEqual([{ value: 1, path: "a.b.c.d" }]);
  });

  it("should handle arrays", () => {
    const obj = { a: [{ b: { c: 1 } }, { d: 2 }] };
    const result = getAllValueOfKeyFromObject(obj, "c");
    expect(result).toEqual([]);
  });
});

describe("getValueFromObjectByPath", () => {
  it("should return the value of a nested property", () => {
    const obj = {
      a: {
        b: {
          c: "value",
        },
      },
    };
    expect(getValueFromObjectByPath(obj, "a.b.c")).toBe("value");
  });

  it("should return null if the path is invalid", () => {
    const obj = {
      a: {
        b: {
          c: "value",
        },
      },
    };
    expect(getValueFromObjectByPath(obj, "a.b.d")).toBeNull();
  });

  it("should return null if the path is empty", () => {
    const obj = {
      a: {
        b: {
          c: "value",
        },
      },
    };
    expect(getValueFromObjectByPath(obj, "")).toBeNull();
  });
});
