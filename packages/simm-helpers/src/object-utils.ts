/**
 * Returns the value and path of the first occurrence of a given key in an object.
 * @param {Record<string|number, T>} object - The object to search for the key.
 * @param {string | number} keyWord - The key to search for in the object.
 * @return {{value: T | null, path:string}} - An object containing the value and path of the key.
 * If the key is not found, returns an object with a default value and an empty path.
 */
export function getValueOfFirstKeyFromObject<T, U>(
  object: T,
  keyWord: string | number,
): {
  value: U | null;
  path: string;
} {
  const path: string[] = [];
  function getValue(currentObj: T): { value: U; path: string } | undefined {
    if (Object.prototype.toString.call(currentObj) !== "[object Object]")
      return undefined;

    for (const [key, value] of Object.entries(currentObj as object)) {
      path.push(key);
      if (key === keyWord) return { value, path: path.join(".") };

      const nestedResult = getValue(value);

      if (nestedResult) return nestedResult;

      path.pop();
    }
  }

  const result = getValue(object);

  return result ?? { value: null, path: "" };
}

/**
 * Returns an array of objects containing the value and path of all occurrences of a given key in an object.
 * @param {Record<string|number, T>} object - The object to search for the key.
 * @param {string | number} keyWord - The key to search for in the object.
 * @return {{value: T, path:string | number}[]} - An array of objects containing the value and path of the key.
 * If the key is not found, returns an empty array.
 */
export function getAllValueOfKeyFromObject<T, U>(
  object: T,
  keyWord: string | number,
): {
  value: U | null;
  path: string;
}[] {
  const keyValue: {
    value: U[];
    path: string[];
  } = {
    value: [],
    path: [],
  };
  let newPath = "";
  function getValue(
    currentObj: T,
    pathNew = "",
  ): { value: T; path: string } | undefined {
    if (Object.prototype.toString.call(currentObj) !== "[object Object]") {
      newPath = "";
      return undefined;
    }

    for (const [key, value] of Object.entries(currentObj as object)) {
      newPath = `${pathNew ? pathNew + "." : ""}${key}`;
      if (key === keyWord) {
        keyValue.value.push(value);
        keyValue.path.push(newPath);
      }
      const nestedResult = getValue(value, newPath);
      if (nestedResult) return nestedResult;
    }
  }

  getValue(object as T, "");

  return keyValue?.value.map((item: U, index: number) => {
    return {
      value: item,
      path: keyValue.path[index],
    };
  });
}

/**
 * Retrieves the value of a nested property from an object using a dot-separated path.
 * @param {T} obj - The object to retrieve the nested property from.
 * @param {string} path - The dot-separated path to the nested property.
 * @return {T | K |null} The value of the nested property, or null if the path is invalid.
 */
export function getValueFromObjectByPath<T extends object, K>(
  obj: T,
  path: string,
): K | T | null {
  const pathParts = path.split(".");
  if (pathParts.length === 0) return null;

  let currentObj: T | K = obj;

  for (const part of pathParts) {
    if (Object.prototype.toString.call(currentObj) !== "[object Object]")
      return null;

    currentObj = currentObj[part as keyof typeof currentObj] as K;
  }

  return currentObj ?? null;
}
