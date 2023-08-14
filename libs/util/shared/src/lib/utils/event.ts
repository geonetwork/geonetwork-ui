/**
 * This should be called instead of event.stopPropagation()
 * to make sure that the document receives the event
 * @param event
 */
export function propagateToDocumentOnly(event: Event) {
  event.stopPropagation()

  setTimeout(() => {
    window.document.dispatchEvent(event)
  }, 0)
}
