import { isArray, isEqual, isObject, transform } from "lodash";
import { PlainObject } from "./type";

/**
 * Returns a partial object that contains only the properties in the `object` parameter that are different from the corresponding properties in the `base` parameter.
 *
 * @param {T} object - The object to compare against the base object.
 * @param {T} [base] - The base object to compare against the object parameter.
 * @return {Partial<T>} A partial object that contains only the properties in the `object` parameter that are different from the corresponding properties in the `base` parameter.
 */
export function diffValueBetweenTwoObject<T extends PlainObject>(
  object: T,
  base?: T,
): Partial<T> {
  function changes(object: T, base?: T): Partial<T> {
    if (!base) return object;
    return transform(object, (result: Partial<T>, value: unknown, key) => {
      if (!isEqual(value, base[key])) {
        if (isArray(value))
          result[key as keyof T] = value as T[keyof T] | undefined;
        else {
          if (value || base[key])
            result[key as keyof T] =
              !(value instanceof Date) && isObject(value) && isObject(base[key])
                ? (changes(value as T, base[key] as T) as
                    | T[keyof T]
                    | undefined)
                : (value as T[keyof T] | undefined);
        }
      }
    });
  }
  return changes(object, base);
}
