import { objectToQueryString } from "../src/index";
import { describe, it, expect } from "vitest";

describe("objectToQueryString", () => {
  it("returns correct query string for non-nested object", () => {
    const obj = { name: "John" };
    expect(objectToQueryString(obj)).toEqual("name=John");
  });

  it("returns correct query string for multi-parameter non-nested object", () => {
    const obj = { name: "John", age: 25 };
    expect(objectToQueryString(obj)).toEqual("name=John&age=25");
  });

  it("returns correct query string for an object with array value", () => {
    const obj = { names: ["John", "Doe"] };
    expect(objectToQueryString(obj)).toEqual("names=John%2CDoe");
  });

  it("ignores keys with null or undefined values", () => {
    const obj = { name: "John", age: null, active: undefined };
    expect(objectToQueryString(obj)).toEqual("name=John");
  });

  it("returns correct query string for an object with boolean value", () => {
    const obj = { isActive: true };
    expect(objectToQueryString(obj)).toEqual("isActive=true");
  });
});
