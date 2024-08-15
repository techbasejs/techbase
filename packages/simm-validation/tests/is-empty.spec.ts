import { test, expect, describe } from "vitest";
import { isEmpty } from "../src/is-empty";

describe("isEmpty", () => {
  test("isEmpty correctly identifies null and undefined values", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  test("isEmpty handles empty strings and arrays", () => {
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
  });

  test("isEmpty identifies empty Maps and Sets", () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  test("isEmpty identifies non-empty Maps and Sets", () => {
    const nonEmptyMap = new Map([
      ["key1", "value1"],
      ["key2", "value2"],
    ]);
    const nonEmptySet = new Set(["item1", "item2", "item3"]);

    expect(isEmpty(nonEmptyMap)).toBe(false);
    expect(isEmpty(nonEmptySet)).toBe(false);
  });

  test("isEmpty excludes Dates and Files from being empty", () => {
    expect(isEmpty(new Date())).toBe(false);
    expect(isEmpty(new File([], "test.txt"))).toBe(false);
  });

  test("isEmpty handles empty objects", () => {
    expect(isEmpty({})).toBe(true);
  });

  test("isEmpty identifies non-empty objects", () => {
    expect(isEmpty({ name: "John" })).toBe(false);
  });

  test("isEmpty correctly handles complex data structures", () => {
    const complexObject = {
      array: [1, 2, 3],
      map: new Map([["key", "value"]]),
      set: new Set([4, 5]),
      nested: {
        property: "nested value",
      },
    };

    expect(isEmpty(complexObject)).toBe(false);
  });

  test("isEmpty handles other data types", () => {
    const symbol = Symbol("my-symbol");
    expect(isEmpty(symbol)).toBe(false);
  });
});
