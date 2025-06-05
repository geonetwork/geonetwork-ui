describe('filters and sorts', () => {
  beforeEach(() => {
    cy.visit('/search')
    cy.get('gn-ui-record-preview-row').as('initialList')
    cy.get('[data-cy="inlineFilter-all"]').as('inlineFilter-all')
    cy.get('[data-cy="inlineFilter-dataset"]').as('inlineFilter-dataset')
    cy.get('[data-cy="inlineFilter-service"]').as('inlineFilter-service')
    cy.get('[data-cy="inlineFilter-reuse"]').as('inlineFilter-reuse')
  })

  it('should create two filter buttons upon loading page', () => {
    cy.get('gn-ui-fuzzy-search').next().find('button').should('have.length', 2)
  })

  it('should sort results by latest date', () => {
    cy.get('gn-ui-fuzzy-search')
      .next()
      .find('button')
      .first()
      .click({ force: true }) // FIXME: why UI does pointer-events none?...
    cy.get('gn-ui-record-preview-row').should('not.eq', '@initialList')
    cy.get('gn-ui-sort-by gn-ui-dropdown-selector')
      .getActiveDropdownOption()
      .invoke('attr', 'data-cy-value')
      .should('equal', 'desc,createDate')
    cy.screenshot({ capture: 'viewport' })
  })

  it('should filter results by popularity', () => {
    cy.get('gn-ui-fuzzy-search')
      .next()
      .find('button')
      .eq(1)
      .click({ force: true }) // FIXME: why UI does pointer-events none?...
    cy.get('gn-ui-record-preview-row').should('not.eq', '@initialList')
    cy.get('gn-ui-sort-by gn-ui-dropdown-selector')
      .getActiveDropdownOption()
      .invoke('attr', 'data-cy-value')
      .should('equal', 'desc,userSavedCount')
  })

  describe('Filter on type', () => {
    describe('When there is no filter on recordKinds', () => {
      it('should select "All" value only', () => {
        cy.get('@inlineFilter-all').should('be.checked')
        cy.get('@inlineFilter-dataset').should('not.be.checked')
        cy.get('@inlineFilter-service').should('not.be.checked')
        cy.get('@inlineFilter-reuse').should('not.be.checked')
        cy.url().should('not.contain', 'recordKind=')
        cy.get('[data-cy="resultsHitsFound"]').should('contain.text', '28 ')
      })
    })

    describe('When filtering on recordKinds', () => {
      it('should select the value, update the url, and update the search results', () => {
        cy.get('@inlineFilter-dataset').check({ force: true })
        cy.get('@inlineFilter-all').should('not.be.checked')
        cy.get('@inlineFilter-dataset').should('be.checked')
        cy.get('@inlineFilter-service').should('not.be.checked')
        cy.get('@inlineFilter-reuse').should('not.be.checked')
        cy.url().should('contain', 'recordKind=dataset')
        cy.get('[data-cy="resultsHitsFound"]').should('contain.text', '17 ')

        cy.get('@inlineFilter-service').check({ force: true })
        cy.get('@inlineFilter-all').should('not.be.checked')
        cy.get('@inlineFilter-dataset').should('be.checked')
        cy.get('@inlineFilter-service').should('be.checked')
        cy.get('@inlineFilter-reuse').should('not.be.checked')
        cy.url().should('contain', 'recordKind=dataset,service')
        cy.get('[data-cy="resultsHitsFound"]').should('contain.text', '27 ')

        cy.get('@inlineFilter-all').check({ force: true })
        cy.get('@inlineFilter-all').should('be.checked')
        cy.get('@inlineFilter-dataset').should('not.be.checked')
        cy.get('@inlineFilter-service').should('not.be.checked')
        cy.get('@inlineFilter-reuse').should('not.be.checked')
        cy.url().should('not.contain', 'recordKind=')
        cy.get('[data-cy="resultsHitsFound"]').should('contain.text', '28 ')
      })
    })

    describe('When toggling on recordKinds', () => {
      it('should select and then deselect the value', () => {
        cy.get('@inlineFilter-dataset').check({ force: true })
        cy.get('@inlineFilter-all').should('not.be.checked')
        cy.get('@inlineFilter-dataset').should('be.checked')
        cy.get('@inlineFilter-service').should('not.be.checked')
        cy.get('@inlineFilter-reuse').should('not.be.checked')

        cy.get('@inlineFilter-dataset').uncheck({ force: true })
        cy.get('@inlineFilter-all').should('be.checked')
        cy.get('@inlineFilter-dataset').should('not.be.checked')
        cy.get('@inlineFilter-service').should('not.be.checked')
        cy.get('@inlineFilter-reuse').should('not.be.checked')
        cy.url().should('not.contain', 'recordKind=')
      })
    })
  })
})
