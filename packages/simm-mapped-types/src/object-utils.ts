import { DEFAULT_NULL } from "./constants";

/**
 * Returns the value and path of the first occurrence of a given key in an object.
 * @param {object|null} object - The object to search for the key.
 * @param {string} keyWord - The key to search for in the object.
 * @return {{value:any, path:string}} - An object containing the value and path of the key.
 * If the key is not found, returns an object with a default value and an empty path.
 */
export function getValueOfFirstKeyFromObject(
  object: Record<string | number, any>,
  keyWord: string | number,
): {
  value: any;
  path: string;
} {
  const path: string[] = [];
  function getValue(currentObj: any): { value: any; path: string } | undefined {
    if (Object.prototype.toString.call(currentObj) !== "[object Object]")
      return undefined;

    for (const [key, value] of Object.entries(currentObj)) {
      path.push(key);
      if (key === keyWord) return { value, path: path.join(".") };

      const nestedResult = getValue(value);

      if (nestedResult) return nestedResult;

      path.pop();
    }
  }

  const result = getValue(object);

  return result || { value: DEFAULT_NULL, path: "" };
}

/**
 * Returns an array of objects containing the value and path of all occurrences of a given key in an object.
 * @param {object|null} object - The object to search for the key.
 * @param {string} keyWord - The key to search for in the object.
 * @return {{value:any, path:string}[]} - An array of objects containing the value and path of the key.
 * If the key is not found, returns an empty array.
 */
export function getAllValueOfKeyFromObject(
  object: Record<string | number, any>,
  keyWord: string,
): {
  value: any;
  path: string;
}[] {
  const keyValue: {
    value: any;
    path: string[];
  } = {
    path: [],
    value: [],
  };
  let newPath = "";
  function getValue(
    currentObj: any,
    pathNew = "",
  ): { value: any; path: string } | undefined {
    if (Object.prototype.toString.call(currentObj) !== "[object Object]") {
      newPath = "";
      return undefined;
    }

    for (const [key, value] of Object.entries(currentObj)) {
      newPath = `${pathNew ? pathNew + "." : ""}${key}`;
      if (key === keyWord) {
        keyValue.value.push(value);
        keyValue.path.push(newPath);
      }
      const nestedResult = getValue(value, newPath);
      if (nestedResult) return nestedResult;
    }
  }

  getValue(object, "");

  return keyValue?.value.map((item: any, index: number) => {
    return {
      value: item,
      path: keyValue.path[index],
    };
  });
}

/**
 * Retrieves the value of a nested property from an object using a dot-separated path.
 * @param {any} obj - The object to retrieve the nested property from.
 * @param {string} path - The dot-separated path to the nested property.
 * @return {any} The value of the nested property, or DEFAULT_NULL if the path is invalid.
 */
export function getValueFromObjectByPath(
  obj: Record<string | number, any>,
  path: string,
) {
  const pathParts = path.split(".");
  if (pathParts.length === 0) return DEFAULT_NULL;

  let currentObj = obj;

  for (const part of pathParts) {
    if (currentObj === DEFAULT_NULL || typeof currentObj !== "object")
      return DEFAULT_NULL;

    currentObj = currentObj[part];
  }

  return currentObj ?? null;
}
