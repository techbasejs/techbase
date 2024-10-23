import { it, expect, describe } from "vitest";
import { isLatLong } from "../src/is-lat-long";

describe("isLatLong", () => {
  it("is valid LatLong", () => {
    expect(isLatLong("-12.849293,+24.433594")).toBe(true);
    expect(isLatLong("(-12.849293,+24.433594)")).toBe(true);
    expect(isLatLong("12.849293,24.433594")).toBe(true);
  });

  it("is valid DMS LatLong", () => {
    expect(isLatLong("12° 50' 57.4548'' N,24° 26' 0.9384'' E")).toBe(true);
    expect(
      isLatLong("12deg 50min 57.4548sec N, 24deg 26min 0.9384sec E", {
        dmsUnits: { degree: "deg", minute: "min", second: "sec" },
      })
    ).toBe(true);
  });

  it("is not be LatLong value", () => {
    expect(isLatLong(123.45)).toBe(false);
    expect(isLatLong("(-12.849293,+24.433594")).toBe(false);
    expect(isLatLong("-12.849293,+24.433594)")).toBe(false);
    expect(isLatLong("1200.849293 24.433594")).toBe(false);
    expect(isLatLong("1200.849293,24.433594")).toBe(false);
    expect(isLatLong("12.849293,24.433594", { checkDMS: true })).toBe(false);
    expect(
      isLatLong("12° 50' 57.4548'' N,24° 26' 0.9384'' T", { checkDMS: true })
    ).toBe(false);
    expect(isLatLong("-12° 50' 57.4548'' N,24° 26' 0.9384'' E")).toBe(false);
    expect(isLatLong("12° 50' 57.4548'' North,24° 26' 0.9384'' East")).toBe(
      false
    );
    expect(
      isLatLong("12deg 50min 57.4548sec N, 24deg 26min 0.9384sec E", {
        checkDMS: true,
      })
    ).toBe(false);
  });
});
