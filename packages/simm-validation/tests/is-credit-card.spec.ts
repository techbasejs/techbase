import { describe, expect, it } from "vitest";
import { isCreditCard } from "../src";

describe("isCreditCard", () => {
  it("should be credit card", () => {
    expect(isCreditCard("6212345678900000003")).toBe(true);
    expect(isCreditCard("378282246310005", "AMEX")).toBe(true);
    expect(isCreditCard("30569309025904", "DINERSCLUB")).toBe(true);
    expect(isCreditCard("6011000990139424", "DISCOVER")).toBe(true);
    expect(isCreditCard("3530111333300000", "JCB")).toBe(true);
    expect(isCreditCard("4012888888881881", "VISA")).toBe(true);
    expect(isCreditCard("2222420000001113", "MASTERCARD")).toBe(true);
    expect(isCreditCard("6212345678901265", "UNIONPAY")).toBe(true);
  });

  it("should not be credit card", () => {
    expect(isCreditCard(new Date())).toBe(false);
    expect(isCreditCard("invalid")).toBe(false);
    expect(isCreditCard("1234567890")).toBe(false);
    expect(isCreditCard("3530111333300000", "AMEX")).toBe(false);
    expect(isCreditCard("6212345678901265", "DINERSCLUB")).toBe(false);
    expect(isCreditCard("6212345678901265", "DISCOVER")).toBe(false);
    expect(isCreditCard("6212345678901265", "JCB")).toBe(false);
    expect(isCreditCard("6212345678901265", "VISA")).toBe(false);
    expect(isCreditCard("378282246310005", "MASTERCARD")).toBe(false);
    expect(isCreditCard("378282246310005", "UNIONPAY")).toBe(false);
  });
});
