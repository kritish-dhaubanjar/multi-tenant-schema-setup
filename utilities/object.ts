import { camelCase, mapKeys } from 'lodash'

/**
 * Converts all object keys to camel case.
 *
 * @param obj - The object to convert.
 * @returns The object with all keys converted to camel case.
 */
export function convertObjectKeysToCamelCase<T extends Record<string | number | symbol, unknown>>(
  obj: T
): T {
  return mapKeys(obj, (_value, key) => camelCase(key)) as T
}
