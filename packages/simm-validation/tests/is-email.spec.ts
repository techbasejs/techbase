import { test, expect, describe } from "vitest";
import { isEmail } from "../src/index";
describe("isStandardEmail", () => {
  describe("Invalid email addresses", () => {
    test("Invalid email addresses (no @ character)", () => {
      expect(isEmail("abc.example.com")).toBe(false);
    });

    test("Invalid email addresses (only one @ is allowed outside quotation marks)", () => {
      expect(isEmail("a@b@c@example.com")).toBe(false);
    });

    test("Invalid email addresses (none of the special characters in this local-part are allowed outside quotation marks)", () => {
      expect(isEmail('a"b(c)d,e:f;g<h>i[jk]l@example.com')).toBe(false);
    });

    test("Invalid email addresses (quoted strings must be dot separated or be the only element making up the local-part)", () => {
      expect(isEmail('just"not"right@example.com')).toBe(false);
    });

    test("Invalid email addresses (spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash)", () => {
      expect(isEmail('this is"notallowed@example.com')).toBe(false);
    });

    test("Invalid email addresses (even if escaped (preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes)", () => {
      expect(isEmail('this still"notallowed@example.com')).toBe(false);
    });

    test("Invalid email addresses (local-part is longer than 64 characters)", () => {
      expect(
        isEmail(
          `1234567890123456789012345678901234567890123456789012345678901234+x@example.com`,
        ),
      ).toBe(false);
    });

    test("Invalid email addresses (underscore is not allowed in domain part)", () => {
      expect(
        isEmail(`i.like.underscores@but_they_are_not_allowed_in_this_part`),
      ).toBe(false);
    });

    test("Invalid email addresses (undefined)", () => {
      expect(isEmail(undefined)).toBe(false);
    });

    test("Invalid email addresses (null)", () => {
      expect(isEmail(null)).toBe(false);
    });
    test("Invalid email addresses (empty)", () => {
      expect(isEmail("")).toBe(false);
    });

    test("Invalid email addresses (custom regex with value no @ character)", () => {
      expect(
        isEmail(
          "abc.example.com",
          // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(false);
    });

    test("Invalid email addresses (custom regex with value only one @ is allowed outside quotation marks)", () => {
      expect(
        isEmail(
          "a@b@c@example.com",
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(false);
    });

    test("Invalid email addresses (custom regex with value none of the special characters in this local-part are allowed outside quotation marks)", () => {
      expect(
        isEmail(
          'a"b(c)d,e:f;g<h>i[jk]l@example.com',
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(false);
    });

    test("Invalid email addresses (custom regex with quoted double dot)", () => {
      expect(
        isEmail(
          '"john..doe"@example.org',
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(false);
    });
  });
  describe("Valid email addresses", () => {
    test("Valid email addresses", () => {
      expect(isEmail("simple@example.com")).toBe(true);
    });

    test("Valid email addresses", () => {
      expect(isEmail("very.common@example.com")).toBe(true);
    });

    test("Valid email addresses (case is always ignored after the @ and usually before)", () => {
      expect(isEmail("FirstName.LastName@EasierReading.org")).toBe(true);
    });

    test("Valid email addresses (one-letter local-part)", () => {
      expect(isEmail("x@example.com")).toBe(true);
    });

    test("Valid email addresses", () => {
      expect(
        isEmail("long.email-address-with-hyphens@and.subdomains.example.com"),
      ).toBe(true);
    });

    test("Valid email addresses (may be routed to user.name@example.com inbox depending on mail server)", () => {
      expect(isEmail("user.name+tag+sorting@example.com")).toBe(true);
    });

    test("Valid email addresses (slashes are a printable character, and allowed)", () => {
      expect(isEmail("name/surname@example.com")).toBe(true);
    });

    test("Valid email addresses (see the List of Internet top-level domains)", () => {
      expect(isEmail("example@s.example")).toBe(true);
    });

    test("Valid email addresses (space between the quotes)", () => {
      expect(isEmail('" "@example.org')).toBe(true);
    });

    test("Valid email addresses (quoted double dot)", () => {
      expect(isEmail('"john..doe"@example.org')).toBe(true);
    });

    test("Valid email addresses (bangified host route used for uucp mailers)", () => {
      expect(isEmail("mailhost!username@example.org")).toBe(true);
    });

    test("Valid email addresses (% escaped mail route to user@example.com via example.org)", () => {
      expect(isEmail("user%example.com@example.org")).toBe(true);
    });

    test("Valid email addresses (local-part ending with non-alphanumeric character from the list of allowed printable characters)", () => {
      expect(isEmail("user-@example.org")).toBe(true);
    });

    test("Valid email addresses (custom regex)", () => {
      expect(
        isEmail(
          "simple@example.com",
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(true);
    });

    test("Valid email addresses (custom regex with case is always ignored after the @ and usually before)", () => {
      expect(
        isEmail(
          "FirstName.LastName@EasierReading.org",
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(true);
    });

    test("Valid email addresses (custom regex with local domain name with no TLD, although ICANN highly discourages dotless email addresses[29])", () => {
      expect(
        isEmail(
          "admin@example",
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(true);
    });

    test("Valid email addresses (custom regex with see the List of Internet top-level domains)", () => {
      expect(
        isEmail(
          "example@s.example",
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(true);
    });

    test("Valid email addresses (custom regex with bangified host route used for uucp mailers)", () => {
      expect(
        isEmail(
          "mailhost!username@example.org",
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(true);
    });

    test("Valid email addresses (custom regex with local-part ending with non-alphanumeric character from the list of allowed printable characters)", () => {
      expect(
        isEmail(
          "user-@example.org",
          /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/,
        ),
      ).toBe(true);
    });
  });
});
