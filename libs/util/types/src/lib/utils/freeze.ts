export function deepFreeze<U>(obj: U): U {
  if (Array.isArray(obj)) {
    obj.forEach(deepFreeze)
    return obj
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach((prop) => deepFreeze(obj[prop]))
    return Object.freeze(obj)
  }
  return obj
}
