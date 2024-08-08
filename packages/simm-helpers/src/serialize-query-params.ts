/**
 * Serialize query parameters into URLSearchParams.
 *
 * @param {T} queryParams - The query parameters to serialize.
 * @param {string} [parentKey] - The parent key for nested query parameters.
 * @return {URLSearchParams} The serialized URLSearchParams.
 */
export const serializeQueryParams = <T>(
  queryParams: T,
  parentKey?: string,
): URLSearchParams => {
  const params = new URLSearchParams();

  if (queryParams && typeof queryParams === "object") {
    for (const [key, value] of Object.entries(queryParams)) {
      const paramName = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        for (const item of value) {
          if (item !== undefined && item !== null) {
            params.append(`${paramName}[]`, item.toString());
          }
        }
      } else if (typeof value === "object") {
        const nestedParams = serializeQueryParams(value, paramName);
        for (const [nestedKey, nestedValue] of nestedParams.entries()) {
          params.append(nestedKey, nestedValue);
        }
      } else if (value !== undefined && value !== null) {
        params.append(paramName, value.toString());
      }
    }
  }

  return params;
};
