import { describe, expect, it } from 'vitest';
import { objectToQueryString } from "../object-to-query-string";

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
