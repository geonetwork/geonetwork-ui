import { propagateToDocumentOnly } from './event'

describe('propagateToDocumentOnly', () => {
  let childComponent: HTMLElement
  let parentComponent: HTMLElement
  let parentClickHandler
  let documentClickHandler
  let event: Event

  beforeEach((done) => {
    parentClickHandler = jest.fn()
    documentClickHandler = jest.fn()
    childComponent = document.createElement('div')
    childComponent.className = 'child'
    childComponent.addEventListener('click', (e) => propagateToDocumentOnly(e))

    parentComponent = document.createElement('div')
    parentComponent.appendChild(childComponent)
    parentComponent.addEventListener('click', parentClickHandler)

    document.body.appendChild(parentComponent)
    document.addEventListener('click', documentClickHandler)

    event = new Event('click')
    childComponent.dispatchEvent(event)

    setTimeout(done)
  })

  it('does not propagate event to parent', () => {
    expect(parentClickHandler).not.toHaveBeenCalled()
  })

  it('dispatches event on document', () => {
    expect(documentClickHandler).toHaveBeenCalledWith(event)
  })
})
