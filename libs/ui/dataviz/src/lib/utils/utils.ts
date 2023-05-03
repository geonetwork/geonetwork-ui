export function truncateString(str: string, truncateLength: number) {
  if (!str) return ''
  return str.length <= truncateLength
    ? str
    : `${str.slice(0, truncateLength)}...`
}
