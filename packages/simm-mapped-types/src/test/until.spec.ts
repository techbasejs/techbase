import { describe, it, expect } from "vitest";
import { PartialType } from "../utils";

interface User {
  id: number;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
}

describe("PartialType", () => {
  it("should allow an empty object", () => {
    const user: PartialType<User> = {};
    expect(user).toEqual({});
  });

  it("should allow partial properties", () => {
    const user1: PartialType<User> = { id: 1 };
    const user2: PartialType<User> = { name: "ten" };
    const user3: PartialType<User> = { email: "ten@example.com" };

    expect(user1).toEqual({ id: 1 });
    expect(user2).toEqual({ name: "ten" });
    expect(user3).toEqual({ email: "ten@example.com" });
  });

  it("should allow all properties", () => {
    const user: PartialType<User> = {
      id: 1,
      name: "ten",
      email: "ten@example.com",
    };
    expect(user).toEqual({ id: 1, name: "ten", email: "ten@example.com" });
  });

  it("should allow mixed properties", () => {
    const user: PartialType<User> = { id: 1, name: "ten" };
    expect(user).toEqual({ id: 1, name: "ten" });
  });

  it("should handle optional nested objects correctly", () => {
    const user1: PartialType<User> = {
      address: { street: "123 Main St", city: "Anytown", zipcode: "12345" },
    };
    const user2: PartialType<User> = { address: { street: "123 Main St" } };
    const user3: PartialType<User> = {};

    expect(user1).toEqual({
      address: { street: "123 Main St", city: "Anytown", zipcode: "12345" },
    });
    expect(user2).toEqual({ address: { street: "123 Main St" } });
    expect(user3).toEqual({});
  });

  it("should handle deeply nested objects", () => {
    type NestedObject = {
      level1: {
        level2: {
          level3: {
            prop: string;
          };
        };
      };
    };

    type PartialNestedObject = PartialType<NestedObject>;

    const obj1: PartialNestedObject = {
      level1: { level2: { level3: { prop: "value" } } },
    };
    const obj2: PartialNestedObject = { level1: { level2: {} } };
    const obj3: PartialNestedObject = {};

    expect(obj1).toEqual({ level1: { level2: { level3: { prop: "value" } } } });
    expect(obj2).toEqual({ level1: { level2: {} } });
    expect(obj3).toEqual({});
  });
});
