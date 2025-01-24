export function isEqual<
  T extends
    | Array<unknown>
    | Record<string, unknown>
    | string
    | Date
    | number
    | URL
    | unknown,
>(a: T, b: T): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((e, i) => isEqual(e, b[i]))
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  } else if (a instanceof URL && b instanceof URL) {
    return a.toString() === b.toString()
  } else if (a instanceof Object && b instanceof Object) {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    return (
      aKeys.length === bKeys.length &&
      aKeys.every((key) => isEqual(a[key], b[key]))
    )
  }
  return a === b
}
