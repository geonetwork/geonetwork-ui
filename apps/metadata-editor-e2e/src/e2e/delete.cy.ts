describe('delete', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')
  })

  describe('record with draft', () => {
    it('should delete the record, delete its associated draft and refresh the interface', () => {
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
      cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').type(
        'draft abstract'
      )
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000) // waiting for draft saving to kick in
      cy.visit('/my-space/my-records')
      cy.get('[data-cy="table-row"]')
        .contains('My new record')
        .should('have.length', 1)
      cy.get('[data-cy="dashboard-drafts-count"]').should('contain', '1')
      // Delete the record
      cy.get('[data-test="record-menu-button"]').last().click()
      cy.get('[data-test="record-menu-delete-button"]').click()
      cy.get('[data-cy="confirm-button"]').click()
      cy.get('[data-cy="table-row"]')
        .contains('My new record')
        .should('have.length', 0)
      cy.get('gn-ui-notification').should('contain', 'Delete success')
      cy.get('[data-cy="dashboard-drafts-count"]').should('contain', '0')
    })
  })

  describe('draft without record', () => {
    it('should delete the draft and refresh the interface', () => {
      // First create a draft
      cy.get('[data-cy="create-record"]').click()
      cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').type(
        'draft abstract'
      )
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000) // waiting for draft saving to kick in
      cy.visit('/my-space/my-draft')
      cy.get('[data-cy="table-row"]')
        .contains('My new record')
        .should('have.length', 1)
      cy.get('[data-cy="dashboard-drafts-count"]').should('contain', '1')
      // Delete the draft
      cy.get('[data-test="record-menu-button"]').click()
      cy.get('[data-test="record-menu-delete-button"]').click()
      cy.get('[data-cy="confirm-button"]').click()
      cy.get('[data-cy="table-row"]')
        .contains('New record')
        .should('have.length', 0)
      cy.get('[data-cy="dashboard-drafts-count"]').should('contain', '0')
    })
  })
})
