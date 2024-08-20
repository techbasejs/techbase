/**
 * Compares two URLs based on their segments.
 * @param {string} url1 - The first URL to compare.
 * @param {string} url2 - The second URL to compare.
 * @param {string} startsWith - The character to check for at the start of segments.
 * @return {boolean} Returns true if the URLs match, false otherwise.
 * 
 * @example
 * ```javascript
 * compareUrls("https://google.com", "https://facebook.com")
 * ```
 * With startsWith `-`
 * ```javascript
 * compareUrls("https://google.com", "https://facebook.com", "-")
 * ```
 */
export const compareUrls = (
  url1: string,
  url2: string,
  startsWith: string = ":",
) => {
  const url1Parts = url1.split("/");
  const url2Parts = url2.split("/");

  if (url1Parts[0] !== url2Parts[0]) {
    return false;
  }

  if (url1Parts.length !== url2Parts.length) {
    return false;
  }

  for (let i = 1; i < url1Parts.length; i++) {
    const segment1 = url1Parts[i];
    const segment2 = url2Parts[i];

    if (segment1 === segment2) {
      continue;
    }

    if (segment2.startsWith(startsWith)) {
      return !!segment1;
    }

    return false;
  }

  return true;
};
