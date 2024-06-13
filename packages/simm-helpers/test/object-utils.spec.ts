import { diffValueBetweenTwoObject } from "../src/object-utils";
import { describe, expect, it } from "vitest";

describe("diffValueBetweenTwoObject", () => {
  it("should return a empty object when 2 objects are the same", () => {
    const object = { a: 1, b: 2, c: 3 };
    const base = { a: 1, b: 2, c: 3 };
    const result = diffValueBetweenTwoObject(object, base);
    expect(result).toEqual({});
  });

  it("should return a partial object when 2 objects are different base", () => {
    const object = { a: 1, b: 2, c: 3 };
    const base = { a: 1, b: 2, c: 4 };
    const result = diffValueBetweenTwoObject(object, base);
    expect(result).toEqual({ c: 3 });
  });

  it("should return a partial object when 2 objects are different advance", () => {
    const object = {
      name: "Bin",
      age: 23,
      city: "London",
      family: ["Mom", "Dad", "Brother"],
      pet: {
        namePet: "Ki",
        agePet: 2,
      },
    };
    const base = {
      name: "Anna",
      age: 22,
      city: "London",
      family: ["Mom", "Dad", "Sister"],
      pet: {
        namePet: "Lu",
        agePet: 2,
      },
    };
    const result = diffValueBetweenTwoObject(object, base);
    console.log(result);
    expect(result).toEqual({
      name: "Bin",
      age: 23,
      family: ["Mom", "Dad", "Brother"],
      pet: { namePet: "Ki" },
    });
  });
});
