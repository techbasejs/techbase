const tldWithoutNumericRegex =
  /^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i;

interface Options {
  requireTopLevelDomain?: boolean;
  allowUnderscores?: boolean;
  allowTrailingDot?: boolean;
  allowNumericTLD?: boolean;
  allowWildcard?: boolean;
  ignoreMaxLength?: boolean;
}

/**
 * Validates if the given string is FQDN or not.
 *
 * @param {any} input The string to validate.
 * @param {boolean} requireTopLevelDomain Require Top level domain (TLD) part at the end.
 * @param {boolean} allowUnderscores Allow underscore character.
 * @param {boolean} allowTrailingDot Allow trailing dot and the end.
 * @param {boolean} allowNumericTLD Allow digits at Top level domain (TLD).
 * @param {boolean} allowWildcard Allow wildcard character (*).
 * @param {boolean} ignoreMaxLength Ignore max length of each part.
 * @returns {boolean} Returns true if the string is FQDN, false otherwise.
 *
 * @example
 * ```typescript
 * isDomainName("www.google.com"); // true
 * isDomainName("mysite.app.", { allowTrailingDot: true }); // true
 * isDomainName("*.netlify.app", { allowWildcard: true }); // true
 * isDomainName("mysite.vn123", { requireTopLevelDomain: true, allowNumericTLD: true }); // true
 * isDomainName("my_site.net", { allowUnderscores: true }); // true
 * isDomainName(
 *  "fullyqualifieddomainnamesaretheprimarilyusedformforhumanreadability.com",
 *  { ignoreMaxLength: true }
 * ); // true
 * ```
 */
const isDomainName = (input: any, options?: Options) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  /* Remove the optional trailing dot before checking validity */
  if (options?.allowTrailingDot && input.endsWith("."))
    input = input.substring(0, input.length - 1);

  /* Remove the optional wildcard before checking validity */
  if (options?.allowWildcard && input.startsWith("*."))
    input = input.substring(2);

  const parts: string[] = input.split(".");

  // Top-level Domain is the last part
  const tld = parts[parts.length - 1];

  // Validate Top-level Domain
  if (options?.requireTopLevelDomain) {
    // Disallow fqdns without tld
    if (parts.length < 2) return false;

    // Disallow spaces at TLD
    if (/\s/.test(tld)) return false;

    // Check if TLD only contains non-digit characters
    if (!options?.allowNumericTLD && !tldWithoutNumericRegex.test(tld))
      return false;
  }

  // Reject numeric TLDs
  if (!options?.allowNumericTLD && /^\d+$/.test(tld)) return false;

  return parts.every((part) => {
    // Only allow maximum 63 characters length of each part
    if (part.length > 63 && !options?.ignoreMaxLength) return false;

    // Only allow alphabet, number, dash and underscore
    if (!/^[a-zA-Z0-9_-]+$/i.test(part)) return false;

    // Disallow parts starting or ending with hyphen
    if (/^-|-$/.test(part)) return false;

    // Disallow underscores
    if (!options?.allowUnderscores && /_/.test(part)) return false;

    return true;
  });
};

export { isDomainName };
