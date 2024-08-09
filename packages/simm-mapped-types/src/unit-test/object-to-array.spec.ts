import { describe, expect, it } from 'vitest';
import { convertObjectToArray } from '../object-to-array';
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
