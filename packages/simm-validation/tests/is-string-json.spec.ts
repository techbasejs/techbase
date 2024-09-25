import { it, expect, describe } from "vitest";
import { isStringJson } from "../src";

describe("isStringJson", () => {
  it("should be valid json", () => {
    expect(
      isStringJson('{"email": "bar@email.com", "age": 26, "isMale": true}')
    ).toBe(true);
    expect(isStringJson("{}")).toBe(true);
    expect(isStringJson("[]")).toBe(true);
    expect(isStringJson('[{"email": "haha@email.com"}]')).toBe(true);
    expect(isStringJson('[{"a":1},[{"b":2,"c":3}]]')).toBe(true);
  });

  it("should not be valid json", () => {
    expect(isStringJson('{"email": "bar@email.com"')).toBe(false);
    expect(isStringJson("{email: bar@email.com}")).toBe(false);
    expect(isStringJson("[Java, PHP]")).toBe(false);
    expect(isStringJson('[1,2,{"id":3}]')).toBe(false);
    expect(isStringJson("123..")).toBe(false);
    expect(isStringJson("literal string")).toBe(false);
    expect(isStringJson(null)).toBe(false);
  });
});
