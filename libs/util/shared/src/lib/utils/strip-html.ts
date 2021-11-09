export const stripHtml = function (html: string): string {
  if (!html) {
    return ''
  }
  return html.replace(/<[^>]*>/g, '')
}
