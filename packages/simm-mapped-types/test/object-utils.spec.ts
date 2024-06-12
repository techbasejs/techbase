import { DEFAULT_NULL } from "../src/constants";
import {
  getValueOfKeyFirstFromObject,
  getAllValueOfKeyFromObject,
  getDataByPath,
} from "../src/object-utils";
import { describe, expect, it } from "vitest";

describe("getValueOfKeyFirstFromObject", () => {
  it("should return the value and path of the first occurrence of a given key in an object", () => {
    const object = {
      foo: {
        bar: {
          baz: "hello",
        },
      },
    };
    const keyWord = "baz";

    const result = getValueOfKeyFirstFromObject(object, keyWord);

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

    const result = getValueOfKeyFirstFromObject(object, keyWord);

    expect(result.value).toBe(DEFAULT_NULL);
    expect(result.path).toBe("");
  });

  it("should handle null objects", () => {
    const object = null;
    const keyWord = "foo";

    const result = getValueOfKeyFirstFromObject(object, keyWord);

    expect(result.value).toBe(DEFAULT_NULL);
    expect(result.path).toBe("");
  });

  it("should handle non-object values", () => {
    const object = "hello";
    const keyWord = "foo";

    const result = getValueOfKeyFirstFromObject(object, keyWord);

    expect(result.value).toBe(DEFAULT_NULL);
    expect(result.path).toBe("");
  });
});

describe("getAllValueOfKeyFromObject", () => {
  it("should return an empty array if the object is null", () => {
    const result = getAllValueOfKeyFromObject(null, "key");
    expect(result).toEqual([]);
  });

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

describe("getDataByPath", () => {
  it("should return the value of a nested property", () => {
    const obj = { foo: { bar: "baz" } };
    const result = getDataByPath(obj, "foo.bar");
    expect(result).toEqual("baz");
  });

  it("should return DEFAULT_NULL if the path is invalid", () => {
    const obj = { foo: { bar: "baz" } };
    const result = getDataByPath(obj, "foo.qux");
    expect(result).toEqual(DEFAULT_NULL);
  });

  it("should return DEFAULT_NULL if the path is empty", () => {
    const obj = { foo: { bar: "baz" } };
    const result = getDataByPath(obj, "");
    expect(result).toEqual(DEFAULT_NULL);
  });

  it("should handle null objects", () => {
    const obj = null;
    const result = getDataByPath(obj, "foo.bar");
    expect(result).toEqual(DEFAULT_NULL);
  });

  it("should handle non-object values", () => {
    const obj = "hello";
    const result = getDataByPath(obj, "foo.bar");
    expect(result).toEqual(DEFAULT_NULL);
  });
});
