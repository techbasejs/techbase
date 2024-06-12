import { DEFAULT_NULL } from "../src/constants";
import {
  getValueOfFirstKeyFromObject,
  getAllValueOfKeyFromObject,
  getValueFromObjectByPath,
} from "../src/object-utils";
import { describe, expect, it } from "vitest";

describe("getValueOfFirstKeyFromObject", () => {
  it("should return the value and path of the first occurrence of a given key in an object", () => {
    const object = {
      foo: {
        bar: {
          baz: "hello",
        },
      },
    };
    const keyWord = "baz";

    const result = getValueOfFirstKeyFromObject(object, keyWord);

    expect(result.value).toBe("hello");
    expect(result.path).toBe("foo.bar.baz");
  });

  it("should return an object with a default value and an empty path if the key is not found", () => {
    const object = {
      foo: {
        bar: {
          baz: "hello",
        },
      },
    };
    const keyWord = "qux";

    const result = getValueOfFirstKeyFromObject(object, keyWord);

    expect(result.value).toBe(DEFAULT_NULL);
    expect(result.path).toBe("");
  });

  it("should handle empty objects", () => {
    const object = {};
    const keyWord = "foo";

    const result = getValueOfFirstKeyFromObject(object, keyWord);

    expect(result.value).toBe(DEFAULT_NULL);
    expect(result.path).toBe("");
  });
});

describe("getAllValueOfKeyFromObject", () => {
  it("should return an empty array if the object is empty", () => {
    const result = getAllValueOfKeyFromObject({}, "key");
    expect(result).toEqual([]);
  });

  it("should return an array with the value and path of the key if found", () => {
    const object = {
      a: {
        b: {
          c: {
            d: {
              key: "value",
              key2: "value2",
            },
          },
        },
      },
    };
    const result = getAllValueOfKeyFromObject(object, "key");
    expect(result).toEqual([
      {
        value: "value",
        path: "a.b.c.d.key",
      },
    ]);
  });

  it("should return an array with the value and path of all occurrences of the key if found multiple times", () => {
    const object = {
      a: {
        b: {
          c: {
            d: {
              key: "value",
              key2: "value2",
            },
            e: {
              key: "value",
            },
          },
        },
      },
    };
    const result = getAllValueOfKeyFromObject(object, "key");
    expect(result).toEqual([
      {
        value: "value",
        path: "a.b.c.d.key",
      },
      {
        value: "value",
        path: "a.b.c.e.key",
      },
    ]);
  });
});

describe("getValueFromObjectByPath", () => {
  it("should return the value of a nested property", () => {
    const obj = { foo: { bar: "baz" } };
    const result = getValueFromObjectByPath(obj, "foo.bar");
    expect(result).toEqual("baz");
  });

  it("should return DEFAULT_NULL if the path is invalid", () => {
    const obj = { foo: { bar: "baz" } };
    const result = getValueFromObjectByPath(obj, "foo.qux");
    expect(result).toEqual(DEFAULT_NULL);
  });

  it("should return DEFAULT_NULL if the path is empty", () => {
    const obj = { foo: { bar: "baz" } };
    const result = getValueFromObjectByPath(obj, "");
    expect(result).toEqual(DEFAULT_NULL);
  });

  it("should handle empty objects", () => {
    const result = getValueFromObjectByPath({}, "foo.bar");
    expect(result).toEqual(DEFAULT_NULL);
  });
});
