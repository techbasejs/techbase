import {
  test,
  expect,
  describe,
  beforeEach,
  vi,
  afterEach,
  beforeAll,
  afterAll,
} from "vitest";
import { getTimeAgo, locales, setLocale } from "../src";

describe("Time ago utils", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-06-01 00:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Locale: English", () => {
    test("invalid time => throw error 'Invalid time'", () => {
      try {
        getTimeAgo("2024-06-01 99:99:99");
      } catch (err) {
        expect(err.message).to.equal("Invalid time");
      }
    });

    test("0 to 14 seconds => just now", () => {
      expect(getTimeAgo("2024-06-01 00:00:00")).toEqual("just now");
      expect(getTimeAgo("2024-06-01 00:00:13")).toEqual("just now");
      expect(getTimeAgo("2024-05-31 23:59:46")).toEqual("just now");
    });

    test("15 to 29 seconds => a few seconds", () => {
      expect(getTimeAgo("2024-05-31 23:59:40")).toEqual("a few seconds ago");
      expect(getTimeAgo("2024-06-01 00:00:25")).toEqual("in a few seconds");
    });

    test("30 to 44 seconds => x seconds", () => {
      expect(getTimeAgo("2024-05-31 23:59:20")).toEqual("40 seconds ago");
      expect(getTimeAgo("2024-06-01 00:00:40")).toEqual("in 40 seconds");
    });

    test("45 to 89 seconds => a minute", () => {
      expect(getTimeAgo("2024-05-31 23:59:00")).toEqual("a minute ago");
      expect(getTimeAgo("2024-06-01 00:01:00")).toEqual("in a minute");
    });

    test("90 seconds to 44 minutes => x minutes", () => {
      expect(getTimeAgo("2024-05-31 23:58:20")).toEqual("2 minutes ago");
      expect(getTimeAgo("2024-06-01 00:01:55")).toEqual("in 2 minutes");
      expect(getTimeAgo("2024-05-31 23:30:00")).toEqual("30 minutes ago");
      expect(getTimeAgo("2024-06-01 00:30:00")).toEqual("in 30 minutes");
    });

    test("45 to 89 minutes => an hour", () => {
      expect(getTimeAgo("2024-05-31 23:00:00")).toEqual("an hour ago");
      expect(getTimeAgo("2024-06-01 01:00:00")).toEqual("in an hour");
    });

    test("90 minutes to 21 hours => x hours", () => {
      expect(getTimeAgo("2024-05-31 22:20:00")).toEqual("2 hours ago");
      expect(getTimeAgo("2024-06-01 01:50:00")).toEqual("in 2 hours");
      expect(getTimeAgo("2024-05-31 13:50:00")).toEqual("10 hours ago");
      expect(getTimeAgo("2024-06-01 10:20:00")).toEqual("in 10 hours");
    });

    test("22 to 35 hours => a day", () => {
      expect(getTimeAgo("2024-05-31 00:00:00")).toEqual("a day ago");
      expect(getTimeAgo("2024-06-01 23:50:00")).toEqual("in a day");
    });

    test("36 hours to 25 days => x days", () => {
      expect(getTimeAgo("2024-05-30 12:00:00")).toEqual("2 days ago");
      expect(getTimeAgo("2024-06-02 12:50:00")).toEqual("in 2 days");
      expect(getTimeAgo("2024-05-22 00:00:00")).toEqual("10 days ago");
      expect(getTimeAgo("2024-06-11 00:00:00")).toEqual("in 10 days");
    });

    test("26 to 45 days => a month", () => {
      expect(getTimeAgo("2024-05-02 00:00:00")).toEqual("a month ago");
      expect(getTimeAgo("2024-06-28 00:00:00")).toEqual("in a month");
    });

    test("46 to 319 days => x months", () => {
      expect(getTimeAgo("2024-04-10 00:00:00")).toEqual("2 months ago");
      expect(getTimeAgo("2024-07-22 00:00:00")).toEqual("in 2 months");
      expect(getTimeAgo("2024-03-01 00:00:00")).toEqual("3 months ago");
      expect(getTimeAgo("2024-09-01 00:00:00")).toEqual("in 3 months");
    });

    test("320 to 547 days (1.5 years) => a year", () => {
      expect(getTimeAgo("2023-06-15 00:00:00")).toEqual("a year ago");
      expect(getTimeAgo("2025-06-15 00:00:00")).toEqual("in a year");
    });

    test("548 days+ => x years", () => {
      expect(getTimeAgo("2022-06-01 00:00:00")).toEqual("2 years ago");
      expect(getTimeAgo("2026-06-01 00:00:00")).toEqual("in 2 years");
    });
  });

  describe("Locale: Japanese", () => {
    beforeAll(() => {
      setLocale(locales.japaneseLocale);
    });

    afterAll(() => {
      setLocale(locales.englishLocale);
    });

    test("invalid time => throw error '無効な時間'", () => {
      try {
        getTimeAgo("2024-06-01 99:99:99");
      } catch (err) {
        expect(err.message).to.equal("無効な時間");
      }
    });

    test("0 to 14 seconds => たった今", () => {
      expect(getTimeAgo("2024-06-01 00:00:00")).toEqual("たった今");
      expect(getTimeAgo("2024-06-01 00:00:13")).toEqual("たった今");
      expect(getTimeAgo("2024-05-31 23:59:46")).toEqual("たった今");
    });

    test("15 to 29 seconds => 数秒", () => {
      expect(getTimeAgo("2024-05-31 23:59:40")).toEqual("数秒前");
      expect(getTimeAgo("2024-06-01 00:00:25")).toEqual("数秒後");
    });

    test("30 to 44 seconds => x秒", () => {
      expect(getTimeAgo("2024-05-31 23:59:20")).toEqual("40秒前");
      expect(getTimeAgo("2024-06-01 00:00:40")).toEqual("40秒後");
    });

    test("45 to 89 seconds => 1分", () => {
      expect(getTimeAgo("2024-05-31 23:59:00")).toEqual("1分前");
      expect(getTimeAgo("2024-06-01 00:01:00")).toEqual("1分後");
    });

    test("90 seconds to 44 minutes => x分", () => {
      expect(getTimeAgo("2024-05-31 23:58:20")).toEqual("2分前");
      expect(getTimeAgo("2024-06-01 00:01:55")).toEqual("2分後");
      expect(getTimeAgo("2024-05-31 23:30:00")).toEqual("30分前");
      expect(getTimeAgo("2024-06-01 00:30:00")).toEqual("30分後");
    });

    test("45 to 89 minutes => 1時間", () => {
      expect(getTimeAgo("2024-05-31 23:00:00")).toEqual("1時間前");
      expect(getTimeAgo("2024-06-01 01:00:00")).toEqual("1時間後");
    });

    test("90 minutes to 21 hours => x時間", () => {
      expect(getTimeAgo("2024-05-31 22:20:00")).toEqual("2時間前");
      expect(getTimeAgo("2024-06-01 01:50:00")).toEqual("2時間後");
      expect(getTimeAgo("2024-05-31 13:50:00")).toEqual("10時間前");
      expect(getTimeAgo("2024-06-01 10:20:00")).toEqual("10時間後");
    });

    test("22 to 35 hours => 1日", () => {
      expect(getTimeAgo("2024-05-31 00:00:00")).toEqual("1日前");
      expect(getTimeAgo("2024-06-01 23:50:00")).toEqual("1日後");
    });

    test("36 hours to 25 days => x日", () => {
      expect(getTimeAgo("2024-05-30 12:00:00")).toEqual("2日前");
      expect(getTimeAgo("2024-06-02 12:50:00")).toEqual("2日後");
      expect(getTimeAgo("2024-05-22 00:00:00")).toEqual("10日前");
      expect(getTimeAgo("2024-06-11 00:00:00")).toEqual("10日後");
    });

    test("26 to 45 days => 1ヶ月", () => {
      expect(getTimeAgo("2024-05-02 00:00:00")).toEqual("1ヶ月前");
      expect(getTimeAgo("2024-06-28 00:00:00")).toEqual("1ヶ月後");
    });

    test("46 to 319 days => xヶ月", () => {
      expect(getTimeAgo("2024-04-10 00:00:00")).toEqual("2ヶ月前");
      expect(getTimeAgo("2024-07-22 00:00:00")).toEqual("2ヶ月後");
      expect(getTimeAgo("2024-03-01 00:00:00")).toEqual("3ヶ月前");
      expect(getTimeAgo("2024-09-01 00:00:00")).toEqual("3ヶ月後");
    });

    test("320 to 547 days (1.5 years) => 1年", () => {
      expect(getTimeAgo("2023-06-15 00:00:00")).toEqual("1年前");
      expect(getTimeAgo("2025-06-15 00:00:00")).toEqual("1年後");
    });

    test("548 days+ => x years", () => {
      expect(getTimeAgo("2022-06-01 00:00:00")).toEqual("2年前");
      expect(getTimeAgo("2026-06-01 00:00:00")).toEqual("2年後");
    });
  });
});
