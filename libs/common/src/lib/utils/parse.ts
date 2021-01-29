/*
 * Implement AngularJS $parse
 * delimiter is `^^^^` cause object properties can contain `.`
 */
export const PARSE_DELIMITER = '^^^'

export const parse = (path) => {
  const fn = (obj) => {
    const paths = path.split(PARSE_DELIMITER)
    let current = obj

    for (const token of paths) {
      if (current[token] === undefined) {
        return undefined
      } else {
        current = current[token]
      }
    }
    return current
  }
  fn.assign = (obj, value) => {
    const paths = path.split(PARSE_DELIMITER)
    let current = obj

    for (let i = 0; i < paths.length - 1; ++i) {
      if (current[paths[i]] === undefined) {
        current[paths[i]] = {}
      }
      current = current[paths[i]]
    }
    current[paths[paths.length - 1]] = value
  }
  return fn
}
