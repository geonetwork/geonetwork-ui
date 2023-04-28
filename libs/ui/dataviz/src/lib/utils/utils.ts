export function truncateString(str: string, truncateLength: number) {
  return str.length <= truncateLength
    ? str
    : `${str.slice(0, truncateLength)}...`
}
