describe('dataset feature catalog - Single feature type', () => {
  beforeEach(() => {
    cy.visit('/dataset/accroche_velos')
  })

  it('should display the feature catalog section and quicklink', () => {
    cy.get('#feature-catalog').should('exist')
    cy.get('[data-cy="feature-catalog"]').should('exist')
  })

  it('should display a single expanded feature type panel', () => {
    cy.get('#feature-catalog gn-ui-expandable-panel')
      .should('have.length', 1)
      .find('[data-cy="feature-type-content"]')
      .should('be.visible')

    cy.get('#feature-catalog .text-lg.font-bold').should('be.visible')
    cy.get('#feature-catalog .text-sm').should('be.visible')
  })

  it('should only display total attributes count', () => {
    cy.get('[data-cy="total-objects-label"]').should('not.exist')
    cy.get('[data-cy="total-attributes"]')
      .invoke('text')
      .should('match', /^\d+$/)
  })

  it('should not display search input', () => {
    cy.get('#feature-catalog input[type="text"]').should('not.exist')
  })
})
