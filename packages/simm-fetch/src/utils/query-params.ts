import { has } from "lodash";
import queryString from 'query-string';
import qs from "qs";

export function buildQueryParams(params: any): string {
  const queryParams = new URLSearchParams();

  for (const key of Object.keys(params)) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  }

  return queryParams.toString();
}

// export function buildQueryParams(params: { [key: string]: any }): string {
//   return qs.stringify(params, { arrayFormat: "brackets" });
// }
  
export function appendQueryParams(url: string | undefined, params: any, queryConfig: any = {}): string {
  const query = queryString.stringify({ ...params }, { ...queryConfig } )
  if (!query) {
    return url as string;
  }
  return url?.toString().includes('?') ? `${url}&${query}` : `${url}?${query}`;
}

export function objectToQueryString(obj: {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | (undefined | string | number)[];
}): string {
  const keyValuePairs: string[] = [];
  for (const key of Object.keys(obj)) {
    if (has(obj, key)) {
      const value = obj[key];
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (value as (string | number)[])?.length !== 0
      ) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(String(value));
        keyValuePairs.push(`${encodedKey}=${encodedValue}`);
      }
    }
  }
  return keyValuePairs.join("&");
}

export function serializeQueryParams<T>(
  queryParams: T,
  parentKey?: string,
): URLSearchParams {
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
}
