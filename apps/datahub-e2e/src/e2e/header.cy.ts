describe('header', () => {
  beforeEach(() => cy.visit('/'))

  it('should display the title', () => {
    cy.get('[data-cy="dh-title"]')
  })
  it('should display the search with autocomplete result', () => {
    cy.get('gn-ui-fuzzy-search').type('velo')
    cy.get('mat-option').should('have.text', ' Accroches vélos MEL ')
  })
  it('should display the search results on click', () => {
    cy.get('gn-ui-fuzzy-search').type('velo')
    cy.get('mat-icon').contains('search').click()
    cy.get('gn-ui-record-preview-row').should('have.length', 1)
    cy.get('gn-ui-record-preview-row')
      .find('div')
      .first()
      .should('have.attr', 'title', 'Accroches vélos MEL')
  })
})
