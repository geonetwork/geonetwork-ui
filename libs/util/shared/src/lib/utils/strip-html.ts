export const stripHtml = function (html: string): string {
  if (!html) return undefined
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}
