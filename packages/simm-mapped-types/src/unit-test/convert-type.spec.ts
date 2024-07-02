import { describe, expect, it } from "vitest";
import {
  convertObjectToArray,
  objectToQueryString,
  convertArrayToObject,
} from "../convert-type";

describe("convertObjectToArray", () => {
  it("No1. with simple object to array", () => {
    const obj = {
      a: "a1",
      b: "b1",
      c: "c1",
    };
    const expected = [{ a: "a1" }, { b: "b1" }, { c: "c1" }];
    const result = convertObjectToArray(obj);
    expect(result).toEqual(expected);
  });

  it("No2. with nested object to array", () => {
    const obj = {
      a: "a1",
      b: 10,
      c: {
        c1: "c11",
        c2: "c22",
      },
      d: ["d1", "d2"],
      e: {
        e1: {
          e11: "e111",
        },
      },
    };
    const expected = [
      { a: "a1" },
      { b: 10 },
      { c: [{ c1: "c11" }, { c2: "c22" }] },
      { d: ["d1", "d2"] },
      { e: [{ e1: [{ e11: "e111" }] }] },
    ];
    expect(convertObjectToArray(obj)).toEqual(expected);
  });

  it("No3. with empty object to array", () => {
    const obj = {};
    const result = convertObjectToArray(obj);
    expect(result).toEqual([]);
  });
});

describe("objectToQueryString", () => {
  it("No1. with simple object to query string", () => {
    const obj = {
      name: "Test",
      adress: "Chicago",
      age: 12,
    };
    const expected = "name=Test&adress=Chicago&age=12";
    const queryString = objectToQueryString(obj);
    expect(queryString).toBe(expected);
  });

  it("No2. with nested objects to query string", () => {
    const obj = {
      name: "Test",
      age: 12,
      location: {
        x: 180,
        y: 75,
      },
      address: ["Chicago", "New York"],
    };
    const expected =
      "name=Test&age=12&location_x=180&location_y=75&address=Chicago&address=New%20York";
    const queryString = objectToQueryString(obj);
    expect(queryString).toBe(expected);
  });

  it("No3. with empty object to query string", () => {
    const obj = {};
    const expected = "";
    const queryString = objectToQueryString(obj);
    expect(queryString).toBe(expected);
  });

  it("No4. with special characters to query string", () => {
    const obj = {
      name: "Test Name",
      address: "New York",
    };
    const expected = "name=Test%20Name&address=New%20York";
    const queryString = objectToQueryString(obj);
    expect(queryString).toBe(expected);
  });

  it("No5. with null or undefined value to query string", () => {
    const obj = {
      name: "Test Name",
      address: "New York",
      location: undefined,
      data: null,
    };
    const expected = "name=Test%20Name&address=New%20York&location=&data=";
    const queryString = objectToQueryString(obj);
    expect(queryString).toBe(expected);
  });
});

describe("convertArrayToObject", () => {
  it("No1. with simple value to single object", () => {
    const arr = [
      { name: "Test" },
      { age: 12 },
      ["data1", "data2"],
      "dataTables",
      { address: ["New York", "USA"] },
      { location: { x: 180, y: 75 } },
    ];
    const expected = {
      name: "Test",
      age: 12,
      data1_key: "data1",
      data2_key: "data2",
      dataTables_key: "dataTables",
      address: ["New York", "USA"],
      location: { x: 180, y: 75 },
    };
    const result = convertArrayToObject(arr);
    expect(result).toEqual(expected);
  });

  it("No2. with multiple array value in array to single object", () => {
    const arr = [
      ["data1", "data2", "data3"],
      "hello",
      { city: "New York", country: "USA" },
      ["apple", "banana", "cherry"],
    ];
    const expected = {
      data1_key: "data1",
      data2_key: "data2",
      data3_key: "data3",
      hello_key: "hello",
      city: "New York",
      country: "USA",
      apple_key: "apple",
      banana_key: "banana",
      cherry_key: "cherry",
    };
    const result = convertArrayToObject(arr);
    expect(result).toEqual(expected);
  });

  it("No3. with empty array to single object", () => {
    const arr: any[] = [];
    const expected = {};
    const result = convertArrayToObject(arr);
    expect(result).toEqual(expected);
  });

  it("No4. with null or undefined value in array to single object", () => {
    const arr = [{ name: "Test" }, { age: 12 }, undefined, null];
    const expected = {
      name: "Test",
      age: 12,
    };
    const result = convertArrayToObject(arr);
    expect(result).toEqual(expected);
  });
});
