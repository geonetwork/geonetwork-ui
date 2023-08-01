/**
 * Removes the given search params from the URL completely; this is case-insensitive
 * @param url
 * @param searchParams
 */
export function removeSearchParams(
  url: string,
  searchParams: string[]
): string {
  const toDelete = []
  const urlObj = new URL(url, window.location.toString())
  const keysLower = searchParams.map((p) => p.toLowerCase())
  for (const param of urlObj.searchParams.keys()) {
    if (keysLower.indexOf(param.toLowerCase()) > -1) {
      toDelete.push(param)
    }
  }
  toDelete.map((param) => urlObj.searchParams.delete(param))
  return urlObj.toString()
}
