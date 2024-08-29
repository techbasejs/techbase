import { describe, it, expect } from "vitest";
import { isFunction } from "../src";

class MyCallable {
  execute() {
    return "Executed!";
  }

  anotherMethod() {
    return "Another method!";
  }

  nonFunction = "I am not a function";
}

const regularFunction = () => "I am a function";
const asyncFunction = async () => "I am an async function";
const generatorFunction = function* () {
  yield "I am a generator function";
};
const arrowFunction = () => {};

describe("isFunction", () => {
  describe("returns true", () => {
    it("returns true for a regular function", () => {
      expect(isFunction(regularFunction)).toBe(true);
    });

    it("returns true for an async function", () => {
      expect(isFunction(asyncFunction)).toBe(true);
    });

    it("returns true for a generator function", () => {
      expect(isFunction(generatorFunction)).toBe(true);
    });

    it("returns true for an arrow function", () => {
      expect(isFunction(arrowFunction)).toBe(true);
    });

    it("returns true for a method within an object", () => {
      const instance = new MyCallable();
      expect(isFunction(instance, "execute")).toBe(true);
    });

    it("returns true for another method within an object", () => {
      const instance = new MyCallable();
      expect(isFunction(instance, "anotherMethod")).toBe(true);
    });

    it('returns true for an object with a callable "call" method', () => {
      const obj = {
        call() {
          return "Called!";
        },
      };
      expect(isFunction(obj, "call")).toBe(true);
    });

    it("returns true for a function that has no methods", () => {
      const simpleFunction = () => {};
      expect(isFunction(simpleFunction)).toBe(true);
    });

    it("returns true for a function of an object", () => {
      const obj = {
        call() {
          return "Object function!";
        },
      };
      expect(isFunction(obj.call)).toBe(true);
    });
  });

  describe("returns false", () => {
    it("returns false for an instance of a class with no methods", () => {
      class NoMethods {}
      const instance = new NoMethods();
      expect(isFunction(instance)).toBe(false);
    });

    it('returns false foran object with a non-callable "call" property', () => {
      const obj = { call: "I am not a function" };
      expect(isFunction(obj, "call")).toBe(false);
    });

    it("returns false for a non-function property within an object", () => {
      const instance = new MyCallable();
      expect(isFunction(instance, "nonFunction" as keyof MyCallable)).toBe(
        false,
      );
    });

    it("returns false for an object without methodName provided", () => {
      const instance = new MyCallable();
      expect(isFunction(instance)).toBe(false);
    });

    it("returns false for null", () => {
      expect(isFunction(null)).toBe(false);
    });

    it("returns false for undefined", () => {
      expect(isFunction(undefined)).toBe(false);
    });

    it("returns false for a string", () => {
      expect(isFunction("I'm not a function")).toBe(false);
    });

    it("returns false for a number", () => {
      expect(isFunction(123)).toBe(false);
    });

    it("returns false for a boolean", () => {
      expect(isFunction(true)).toBe(false);
    });

    it("returns false for an array", () => {
      expect(isFunction([1, 2, 3])).toBe(false);
    });

    it("returns false for a plain object without callable methods", () => {
      const obj = { foo: "bar" };
      expect(isFunction(obj)).toBe(false);
    });
  });
});
