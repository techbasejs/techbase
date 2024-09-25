const MAC_ADDRESS = {
  FORMAT_48:
    /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/,
  FORMAT_48_WITHOUT_SEPARATOR: /^([0-9a-fA-F]){12}$/,
  FORMAT_48_WITH_DOT: /^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/,
  FORMAT_64:
    /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){6}([0-9a-fA-F]{2})$/,
  FORMAT_64_WITHOUT_SEPARATOR: /^([0-9a-fA-F]){16}$/,
  FORMAT_64_WITH_DOT: /^([0-9a-fA-F]{4}\.){3}([0-9a-fA-F]{4})$/,
};

interface Options {
  noSeparators: boolean;
}

/**
 * Validates if the given string is MAC address or not.
 *
 * @param {any} input The string to validate.
 * @param {any} options.noSeparators Allow MAC addresses without separators.
 * @returns {boolean} Returns true if the string is MAC address, false otherwise.
 *
 * @example
 * ```typescript
 * isMacAddress("00:1A:2B:3C:4D:5E"); // true
 * isMacAddress("A1-B2-C3-D4-E5-F6"); // true
 * isMacAddress("001A.2B3C.4D5E"); // true
 * isMacAddress("001A2B3C4D5E", { noSeparators: true }); // true
 * ```
 */
const isMacAddress = (input: any, options?: Options) => {
  // Returns false input is not a string
  if (typeof input !== "string") return false;

  // If allow MAC address without separators
  if (options?.noSeparators)
    return (
      MAC_ADDRESS.FORMAT_48_WITHOUT_SEPARATOR.test(input) ||
      MAC_ADDRESS.FORMAT_64_WITHOUT_SEPARATOR.test(input)
    );

  // MAC address with separators
  return (
    MAC_ADDRESS.FORMAT_48.test(input) ||
    MAC_ADDRESS.FORMAT_48_WITH_DOT.test(input) ||
    MAC_ADDRESS.FORMAT_64.test(input) ||
    MAC_ADDRESS.FORMAT_64_WITH_DOT.test(input)
  );
};

export { isMacAddress };
