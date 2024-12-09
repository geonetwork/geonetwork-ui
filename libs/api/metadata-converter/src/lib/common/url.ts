/**
 * Will return null if the URL is invalid, without throwing
 * @param url
 * @param location
 */
export function getAsValidUrl(
  url: string,
  location: string = window.location.toString()
): URL | null {
  try {
    return new URL(url, location)
  } catch (e) {
    return null
  }
}
