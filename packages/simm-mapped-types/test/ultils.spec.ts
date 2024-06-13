import {
  toStringNullToEmpty,
  toStringNullToNull,
  toStringNullToZero,
} from "../src";
import { expect, describe, test } from "vitest";

describe("toStringNullToEmpty", function () {
  test("When it's a string", function () {
    const input = "my text";
    const res: string = toStringNullToEmpty(input);
    const expectValue= "my text";
    expect(res).to.equal(expectValue);
  });
  test("When it's a number", function () {
    const input = 12_345;
    const res: string = toStringNullToEmpty(input);
    const expectValue= "12345";
    expect(res).to.equal(expectValue);
  });
  test("When it's an empty string", function () {
    const input = "";
    const res: string = toStringNullToEmpty(input);
    const expectValue= "";
    expect(res).to.equal(expectValue);
  });
  test("When it's the string '0'", function () {
    const input = "0";
    const res: string = toStringNullToEmpty(input);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
  test("When it's the full-width string '０'", function () {
    const input = "０";
    const res: string = toStringNullToEmpty(input);
    const expectValue= "０";
    expect(res).to.equal(expectValue);
  });
  test("When it's the number 0", function () {
    const input = 0;
    const res: string = toStringNullToEmpty(input);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
  test("When it's null", function () {
    const input = null;
    const res: string = toStringNullToEmpty(input);
    const expectValue= "";
    expect(res).to.equal(expectValue);
  });
  test("When it's undefined", function () {
    const input: { a?: number } = {};
    const res: string = toStringNullToEmpty(input.a);
    const expectValue= "";
    expect(res).to.equal(expectValue);
  });
  test("When it's NaN", function () {
    const input = Number.NaN;
    const res: string = toStringNullToEmpty(input);
    const expectValue= "";
    expect(res).to.equal(expectValue);
  });
});

describe("toStringNullToNull", function () {
  test("When it's a string", function () {
    const input = "my text";
    const res: string | null = toStringNullToNull(input);
    const expectValue= "my text";
    expect(res).to.equal(expectValue);
  });
  test("When it's a number", function () {
    const input = 12_345;
    const res: string | null = toStringNullToNull(input);
    const expectValue= "12345";
    expect(res).to.equal(expectValue);
  });
  test("When it's an empty string", function () {
    const input = "";
    const res: string | null = toStringNullToNull(input);
    const expectValue= "";
    expect(res).to.equal(expectValue);
  });
  test("When it's the string '0'", function () {
    const input = "0";
    const res: string | null = toStringNullToNull(input);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
  test("When it's the full-width string '０'", function () {
    const input = "０";
    const res: string | null = toStringNullToNull(input);
    const expectValue= "０";
    expect(res).to.equal(expectValue);
  });
  test("When it's the number 0", function () {
    const input = 0;
    const res: string | null = toStringNullToNull(input);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
  test("When it's null", function () {
    const input = null;
    const res: string | null = toStringNullToNull(input);
    const expectValue= null;
    expect(res).to.equal(expectValue);
  });
  test("When it's undefined", function () {
    const input: { a?: number } = {};
    const res: string | null = toStringNullToNull(input.a);
    const expectValue= null;
    expect(res).to.equal(expectValue);
  });
  test("When it's NaN", function () {
    const input = Number.NaN;
    const res: string | null = toStringNullToNull(input);
    const expectValue= null;
    expect(res).to.equal(expectValue);
  });
});

describe("toStringNullToZero", function () {
  test("When it's a string", function () {
    const input = "my text";
    const res: string = toStringNullToZero(input);
    const expectValue= "my text";
    expect(res).to.equal(expectValue);
  });
  test("When it's a number", function () {
    const input = 12_345;
    const res: string = toStringNullToZero(input);
    const expectValue= "12345";
    expect(res).to.equal(expectValue);
  });
  test("When it's an empty string", function () {
    const input = "";
    const res: string = toStringNullToZero(input);
    const expectValue= "";
    expect(res).to.equal(expectValue);
  });
  test("When it's the string '0'", function () {
    const input = "0";
    const res: string = toStringNullToZero(input);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
  test("When it's the full-width string '０'", function () {
    const input = "０";
    const res: string = toStringNullToZero(input);
    const expectValue= "０";
    expect(res).to.equal(expectValue);
  });
  test("When it's the number 0", function () {
    const input = 0;
    const res: string = toStringNullToZero(input);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
  test("When it's null", function () {
    const input = null;
    const res: string = toStringNullToZero(input);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
  test("When it's undefined", function () {
    const input: { a?: number } = {};
    const res: string = toStringNullToZero(input.a);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
  test("When it's NaN", function () {
    const input = Number.NaN;
    const res: string = toStringNullToZero(input);
    const expectValue= "0";
    expect(res).to.equal(expectValue);
  });
});
