export const removeWhitespace = function (str: string): string {
  return str ? str.replace(/\s+/g, ' ').trim() : undefined
}
