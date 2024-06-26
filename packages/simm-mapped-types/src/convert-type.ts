
export function convertObjectToArray<T>(
  obj: Record<string, T>
): unknown[] {
  return Object.entries(obj).map(([key, value]) => {
    return typeof value === "object" && value !== null && !Array.isArray(value)
      ? { [key]: convertObjectToArray(value as Record<string, T>) }
      : { [key]: value };
  });
}


export function convertArrayToObject<T>(arr: T[]): Record<string, T> {
  const result: Record<string, T> = {};
  for (const item of arr) {
    if (typeof item === "object" && !Array.isArray(item) && item !== null) {
      Object.assign(result, item);
    } else if (Array.isArray(item)) {
      for (const el of item.filter((el) => el !== null && el !== undefined)) {
        result[`${el}_key`] = el;
      }
    } else if (item !== null && item !== undefined) {
      result[`${item}_key`] = item;
    }
  }
  return result;
}


export function objectToQueryString<T>(
  obj: Record<string, T>,
  parentKey?: string,
): string {
  const queryParams: string[] = [];
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const encodeKey = parentKey
        ? `${parentKey}_${encodeURIComponent(key)}`
        : encodeURIComponent(key);
      if (value === null || value === undefined) {
        queryParams.push(`${encodeKey}=`);
      } else if (typeof value === "object" && !Array.isArray(value)) {
        const nestedParams = objectToQueryString(value as Record<string, T>, encodeKey);
        queryParams.push(nestedParams);
      } else if (Array.isArray(value)) {
        for (const item of value) {
          queryParams.push(`${encodeKey}=${encodeURIComponent(item)}`);
        }
      } else {
        queryParams.push(`${encodeKey}=${encodeURIComponent(value as string)}`);
      }
    }
  }
  return queryParams.join("&") || "";
}
