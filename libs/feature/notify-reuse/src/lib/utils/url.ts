export const navigateToLightEdit = (
  reuseFormUrl: string,
  baseHref: string,
  uniqueIdentifier: string
) => {
  const baseUrl = `${reuseFormUrl ?? ''}`.replace(/\/+$/, '')
  // Normalisation du baseHref pour éviter les doubles /
  const baseHrefClean = baseHref.replace(/^\/+|\/+$/g, '')
  const prefix = baseHrefClean ? `/${baseHrefClean}` : ''
  const rawRedirectUrl = `${window.location.origin}${prefix}/reuse/${uniqueIdentifier}`
  const redirect_on_leave = encodeURIComponent(rawRedirectUrl)
  window.open(
    `${baseUrl}/light-edit/${uniqueIdentifier}?redirect_on_leave=${redirect_on_leave}`,
    '_self'
  )
}
