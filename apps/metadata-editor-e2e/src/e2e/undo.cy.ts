describe('undo', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')
  })

  it('should restore the record and refresh the interface', () => {
    // First create a record and its draft
    cy.get('[data-cy="create-record"]').click()
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').type(
      'record abstract'
    )
    cy.intercept({
      method: 'PUT',
      pathname: '**/records',
    }).as('insertRecord')
    cy.get('md-editor-publish-button').click()
    cy.wait('@insertRecord')
    cy.url().should('contain', '/edit/')
    cy.get('[data-cy="undo-button"] button').should('be.disabled')
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').type(
      'draft abstract'
    )
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000) // waiting for draft saving to kick in
    cy.get('[data-cy="undo-button"]').click()
    cy.get('[data-cy="confirm-button"]').click()
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').should(
      'have.value',
      'record abstract'
    )
  })
})
