import { defineLocalRedirections } from '../support/local-url-redirects'

beforeEach(() => {
  defineLocalRedirections()
})

it('gn-results-list-sort', () => {
  cy.intercept('POST', '**/search/records/_search*').as('search')
  cy.visit('/webcomponents/gn-results-list.sort.html')

  // should display both results lists
  cy.get('gn-results-list').should('have.length', 2)
  cy.get('gn-ui-record-preview-title').should('have.length', 10)

  // should send the same sort for the object and the string syntax
  cy.wait(['@search', '@search']).then((calls) =>
    calls.forEach((call) =>
      expect(call.request.body.sort).to.deep.equal([{ changeDate: 'desc' }])
    )
  )

  // should display the same records in both lists
  cy.get('gn-results-list').then(($lists) => {
    const titles = [...$lists].map((list) =>
      [...list.shadowRoot.querySelectorAll('gn-ui-record-preview-title')].map(
        (el) => el.textContent.trim()
      )
    )
    expect(titles[0]).to.deep.equal(titles[1])
  })
})
