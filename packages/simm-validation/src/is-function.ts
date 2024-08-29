/**
 * Checks if the provided parameter is a function or if it has a specific method that is a function.
 * @typeParam T - The type of the parameter to be checked.
 * @param param - The parameter to check if it's a function or an object with a callable method.
 * @param methodName - (Optional) The name of the method to check on the object. If provided, the function will check if this method exists and is a function.
 * @returns `true` if the parameter is a function, or if it's an object and the specified method is a function; otherwise, `false`.
 * @example
 * // Checking a function directly
 * const fn = () => {};
 * console.log(isFunction(fn)); // true
 *
 * // Checking an object with a method
 * const obj = {
 *   execute() {
 *     console.log("Running");
 *   },
 * };
 * console.log(isFunction(obj, 'execute')); // true
 *
 * // Checking an object without the method name
 * console.log(isFunction(obj)); // false
 *
 * // Checking a non-function value
 * console.log(isFunction(42)); // false
 *
 * // Checking an object with a method named "call"
 * const mimicObj = {
 *   call() {
 *     return "Mimicking a function!";
 *   },
 * };
 * console.log(isFunction(mimicObj, 'call')); // true
 *
 * // Checking if an async function
 * const asyncFn = async () => {};
 * console.log(isFunction(asyncFn)); // true
 *
 * // Checking if a generator function
 * function* genFn() {
 *   yield 1;
 * }
 * console.log(isFunction(genFn)); // true
 */

export function isFunction<T>(param: T, methodName?: keyof T): boolean {
  if (typeof param === "function") {
    return true;
  }

  if (
    typeof param === "object" &&
    param !== null &&
    methodName &&
    typeof param[methodName] === "function"
  ) {
    return true;
  }

  return false;
}
