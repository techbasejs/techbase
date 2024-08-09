import { test, expect, describe } from "vitest";
import { stringifyUrlQueryObject } from "../src";

describe("Stringify query", () => {
  test("Stringify null value", () => {
    expect(stringifyUrlQueryObject({ value: null })).toEqual("?value");
  });

  test("Stringify boolean value", () => {
    expect(stringifyUrlQueryObject({ value: true })).toEqual("?value=true");
  });

  test("Stringify number value", () => {
    expect(stringifyUrlQueryObject({ value: -123.5 })).toEqual("?value=-123.5");
  });

  test("Stringify string value", () => {
    expect(
      stringifyUrlQueryObject({
        value: "I am using C++",
      }),
    ).toEqual("?value=I+am+using+C\\+\\+");
  });

  test("Stringify object value", () => {
    expect(
      stringifyUrlQueryObject({
        value: {
          name: "Nguyen Dinh Truong",
          age: 26,
          isMale: true,
        },
      }),
    ).toEqual('?value={"name":"Nguyen+Dinh+Truong","age":26,"isMale":true}');
  });

  test("Stringify array value", () => {
    expect(
      stringifyUrlQueryObject({
        value: ["Java", "Kotlin", "Dart", "Golang", "C++"],
      }),
    ).toEqual('?value=["Java","Kotlin","Dart","Golang","C\\+\\+"]');
  });

  test("Stringify multiple value types", () => {
    expect(
      stringifyUrlQueryObject({
        name: "Nguyen Dinh Truong",
        age: 26,
        isMale: true,
        location: {
          country: "Vietnam",
          code: 1234,
          axis: { x: 12, y: 23 },
        },
        jobs: [{ label: "React" }, { label: "C++" }],
      }),
    ).toEqual(
      '?name=Nguyen+Dinh+Truong&age=26&isMale=true&location={"country":"Vietnam","code":1234,"axis":{"x":12,"y":23}}&jobs=[{"label":"React"},{"label":"C\\+\\+"}]',
    );
  });
});
