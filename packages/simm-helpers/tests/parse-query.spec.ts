import { test, expect, describe } from "vitest";
import { parse } from "../src";

describe("Parse query", () => {
  test("Parse null value", () => {
    expect(parse("?value")).toEqual({ value: null });
  });

  test("Parse boolean value", () => {
    expect(parse("?value=true")).toEqual({ value: true });
  });

  test("Parse number value", () => {
    expect(parse("?value=-123.5")).toEqual({ value: -123.5 });
  });

  test("Parse string value", () => {
    expect(parse("?value=I+am+using+C\\+\\+")).toEqual({
      value: "I am using C++",
    });
  });

  test("Parse object value", () => {
    expect(
      parse('?value={"name":"Nguyen+Dinh+Truong","age":26,"isMale":true}'),
    ).toEqual({
      value: {
        name: "Nguyen Dinh Truong",
        age: 26,
        isMale: true,
      },
    });
  });

  test("Parse single array value", () => {
    expect(parse('?value=["Java","Kotlin","Dart","Golang"]')).toEqual({
      value: ["Java", "Kotlin", "Dart", "Golang"],
    });
  });

  test("Parse multiple array value", () => {
    expect(
      parse(
        '?value=["Java","Kotlin","Dart","Golang"]&value=["Javascript","C\\+\\+"]',
      ),
    ).toEqual({
      value: ["Java", "Kotlin", "Dart", "Golang", "Javascript", "C++"],
    });
  });

  test("Parse multiple value types", () => {
    expect(
      parse(
        '?name=Nguyen+Dinh+Truong&age=26&isMale=true&location={"country":"Vietnam","code":1234,"axis":{"x":12,"y":23}}&jobs=[{"label":"React"},{"label":"C\\+\\+"}]',
      ),
    ).toEqual({
      name: "Nguyen Dinh Truong",
      age: 26,
      isMale: true,
      location: {
        country: "Vietnam",
        code: 1234,
        axis: { x: 12, y: 23 },
      },
      jobs: [{ label: "React" }, { label: "C++" }],
    });
  });
});
