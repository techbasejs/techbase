import { test, expect, describe, beforeEach, vi, afterEach } from "vitest";
import { getTimeAgo } from "../src";

describe("Time ago utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-01 00:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("Just now", () => {
    expect(getTimeAgo("2024-06-01 00:00:00")).toEqual("Just now");
  });

  test("A minute", () => {
    expect(getTimeAgo("2024-05-31 23:58:30")).toEqual("A minute ago");
    expect(getTimeAgo("2024-06-01 00:01:30")).toEqual("A minute from now");
  });

  test("2 minutes", () => {
    expect(getTimeAgo("2024-05-31 23:58:00")).toEqual("2 minutes ago");
    expect(getTimeAgo("2024-06-01 00:02:30")).toEqual("2 minutes from now");
  });

  test("An hour", () => {
    expect(getTimeAgo("2024-05-31 22:30:00")).toEqual("An hour ago");
    expect(getTimeAgo("2024-06-01 01:30:00")).toEqual("An hour from now");
  });

  test("2 hours", () => {
    expect(getTimeAgo("2024-05-31 22:00:00")).toEqual("2 hours ago");
    expect(getTimeAgo("2024-06-01 02:30:00")).toEqual("2 hours from now");
  });

  test("Last/Next week", () => {
    expect(getTimeAgo("2024-05-24 00:00:00")).toEqual("Last week");
    expect(getTimeAgo("2024-06-08 00:00:00")).toEqual("Next week");
  });

  test("2 weeks", () => {
    expect(getTimeAgo("2024-05-15 00:00:00")).toEqual("2 weeks ago");
    expect(getTimeAgo("2024-06-15 00:00:00")).toEqual("2 weeks from now");
  });

  test("Last/Next month", () => {
    expect(getTimeAgo("2024-05-01 00:00:00")).toEqual("Last month");
    expect(getTimeAgo("2024-07-01 00:00:00")).toEqual("Next month");
  });

  test("2 months", () => {
    expect(getTimeAgo("2024-04-01 00:00:00")).toEqual("2 months ago");
    expect(getTimeAgo("2024-08-01 00:00:00")).toEqual("2 months from now");
  });

  test("Last/Next year", () => {
    expect(getTimeAgo("2023-06-01 00:00:00")).toEqual("Last year");
    expect(getTimeAgo("2025-06-01 00:00:00")).toEqual("Next year");
  });

  test("2 years", () => {
    expect(getTimeAgo("2022-06-01 00:00:00")).toEqual("2 years ago");
    expect(getTimeAgo("2026-06-01 00:00:00")).toEqual("2 years from now");
  });

  test("Last/Next century", () => {
    expect(getTimeAgo("1924-06-01 00:00:00")).toEqual("Last century");
    expect(getTimeAgo("2124-06-01 00:00:00")).toEqual("Next century");
  });

  test("2 centuries", () => {
    expect(getTimeAgo("1824-06-01 00:00:00")).toEqual("2 centuries ago");
    expect(getTimeAgo("2224-06-01 00:00:00")).toEqual("2 centuries from now");
  });
});
