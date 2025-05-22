describe('reuse page: linked records', () => {
  beforeEach(() => {
    cy.visit('/reuse/7eb795c2-d612-4b5e-b15e-d985b0f4e697')
  })
  it('should display the linked records section', () => {
    // it should display the linked records
    cy.get('datahub-record-linked-records').should('be.visible')

    // it should display the linked records with the correct title
    cy.get('datahub-record-linked-records')
      .find('h2')
      .should('contain', 'Associated content')

    // it should display the source datasets with the correct number of records
    cy.get('datahub-record-internal-links')
      .find('h3')
      .first()
      .as('sourceDatasetsTitle')
      .should('contain', 'Source datasets')
    cy.get('@sourceDatasetsTitle').next('span').should('contain', '(1)')

    // it should not display any other linked records
    cy.get('datahub-record-internal-links').find('h3').eq(1).should('not.exist')
  })
})
