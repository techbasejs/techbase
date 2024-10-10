import { describe, expect, it } from "vitest";
import { isDomainName } from "../src/is-domain-name";

describe("isDomainName", () => {
  it("should be FQDN string", () => {
    expect(isDomainName("www.google.com")).toBe(true);
    expect(
      isDomainName("www.google_meet.com", { allowUnderscores: true }),
    ).toBe(true);
    expect(isDomainName("www.google.com.", { allowTrailingDot: true })).toBe(
      true,
    );
    expect(
      isDomainName(
        "fullyqualifieddomainnamesaretheprimarilyusedformforhumanreadability.com",
        {
          ignoreMaxLength: true,
        },
      ),
    ).toBe(true);
    expect(
      isDomainName("www.google.com123", {
        requireTopLevelDomain: true,
        allowNumericTLD: true,
      }),
    ).toBe(true);
    expect(isDomainName("*.netlify.app", { allowWildcard: true })).toBe(true);
    expect(isDomainName("www.google-search.com")).toBe(true);
    expect(isDomainName("911.gov")).toBe(true);
  });

  it("should not be FQDN string", () => {
    expect(isDomainName(123.456)).toBe(false);
    expect(isDomainName("www.g😃😃gle.com")).toBe(false);
    expect(isDomainName("www.google.com.")).toBe(false);
    expect(
      isDomainName(
        "fullyqualifieddomainnamesaretheprimarilyusedformforhumanreadability.com",
      ),
    ).toBe(false);
    expect(isDomainName("*.netlify.app")).toBe(false);
    expect(isDomainName("www.google_meet.com")).toBe(false);
    expect(isDomainName("-google.com")).toBe(false);
    expect(isDomainName("google-.com")).toBe(false);
    expect(isDomainName("abc.証用のコ.com")).toBe(false);
    expect(isDomainName("abc.my-page.123")).toBe(false);
    expect(isDomainName("google.c", { requireTopLevelDomain: true })).toBe(
      false,
    );
    expect(isDomainName("google.c om", { requireTopLevelDomain: true })).toBe(
      false,
    );
    expect(isDomainName("google", { requireTopLevelDomain: true })).toBe(false);
  });
});
