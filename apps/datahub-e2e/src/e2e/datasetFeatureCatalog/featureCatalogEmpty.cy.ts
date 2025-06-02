describe('dataset feature catalog - No feature catalog', () => {
  beforeEach(() => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
  })

  it('should not display the feature catalog section', () => {
    cy.get('#feature-catalog').should('not.exist')
    cy.get('[data-cy="feature-catalog"]').should('not.exist')
  })
})
