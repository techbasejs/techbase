export function convertObjectToArray(
  obj: Record<string, any>,
): Array<Record<string, any>> {
  return Object.entries(obj).map(([key, value]) => {
    return typeof value === "object" && value !== null && !Array.isArray(value)
      ? { [key]: convertObjectToArray(value) }
      : { [key]: value };
  });
}

export function convertArrayToObject(arr: any[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const item of arr) {
    if (typeof item === "object" && !Array.isArray(item) && item !== null) {
      Object.assign(result, item);
    } else if (Array.isArray(item)) {
      for (const el of item.filter(el => el !== null && el !== undefined)) { 
        result[`${el}_key`] = el; 
      }
    } else if (item !== null && item !== undefined) {
      result[`${item}_key`] = item;
    }
  }
  return result;
}

export function objectToQueryString(
  obj: Record<string, any>,
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
        const nestedParams = objectToQueryString(value, encodeKey);
        queryParams.push(nestedParams);
      } else if (Array.isArray(value)) {
        for (const item of value) {
          queryParams.push(`${encodeKey}=${encodeURIComponent(item)}`);
        }
      } else {
        queryParams.push(`${encodeKey}=${encodeURIComponent(value)}`);
      }
    }
  }
  return queryParams.join("&") || "";
}
