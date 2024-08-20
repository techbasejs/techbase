import { test, expect, describe } from "vitest";
import { parseUrlQuery } from "../src";

describe("Parse query", () => {
  test("Parse null value", () => {
    expect(parseUrlQuery("?value")).toEqual({ value: null });
  });

  test("Parse boolean value", () => {
    expect(parseUrlQuery("?value=true")).toEqual({ value: true });
  });

  test("Parse number value", () => {
    expect(parseUrlQuery("?value=-123.5")).toEqual({ value: -123.5 });
  });

  test("Parse string value", () => {
    expect(parseUrlQuery(String.raw`?value=I+am+using+C\+\+`)).toEqual({
      value: "I am using C++",
    });
  });

  test("Parse object value", () => {
    expect(
      parseUrlQuery(
        '?value={"name":"Nguyen+Dinh+Truong","age":26,"isMale":true}',
      ),
    ).toEqual({
      value: {
        name: "Nguyen Dinh Truong",
        age: 26,
        isMale: true,
      },
    });
  });

  test("Parse single array value", () => {
    expect(parseUrlQuery('?value=["Java","Kotlin","Dart","Golang"]')).toEqual({
      value: ["Java", "Kotlin", "Dart", "Golang"],
    });
  });

  test("Parse multiple array value", () => {
    expect(
      parseUrlQuery(
        String.raw`?value=["Java","Kotlin","Dart","Golang"]&value=["Javascript","C\+\+"]`,
      ),
    ).toEqual({
      value: ["Java", "Kotlin", "Dart", "Golang", "Javascript", "C++"],
    });
  });

  test("Parse multiple value types", () => {
    expect(
      parseUrlQuery(
        String.raw`?name=Nguyen+Dinh+Truong&age=26&isMale=true&location={"country":"Vietnam","code":1234,"axis":{"x":12,"y":23}}&jobs=[{"label":"React"},{"label":"C\+\+"}]`,
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
