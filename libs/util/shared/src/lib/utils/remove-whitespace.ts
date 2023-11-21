export const removeWhitespace = function (str: string): string {
  return str?.replace(/\s+/g, ' ').trim()
}
