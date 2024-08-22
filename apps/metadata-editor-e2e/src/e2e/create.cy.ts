describe('create', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')
  })

  describe('create new record', () => {
    it('should create the record without error', () => {
      // First create a record and its draft
      cy.get('[data-cy="create-record"]').click()

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1200) // waiting for draft saving to kick in

      // Check that the record is correctly displayed
      cy.get('gn-ui-record-form').should('be.visible')

      cy.get('gn-ui-record-form')
        .children()
        .eq(0)
        .children()
        .should('have.length', 3)

      cy.get('[data-test="previousNextPageButtons"]')
        .children()
        .eq(0)
        .should('contain.text', 'Come back later')
      cy.get('[data-test="previousNextPageButtons"]')
        .children()
        .eq(1)
        .should('contain.text', 'Next')
    })
  })
})
