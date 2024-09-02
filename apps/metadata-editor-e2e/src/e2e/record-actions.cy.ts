import { before } from 'cypress/types/lodash'

describe('record-actions', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')
  })
  describe('delete', () => {
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
  describe('create', () => {
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

    it('back navigation should go to search after creating a record', () => {
      // First create a record and its draft
      cy.get('[data-cy="create-record"]').click()
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1200) // waiting for draft saving to kick in
      cy.go('back')
      cy.url().should('include', '/catalog/search')
    })

    it('the created record should have the registered user as point of contact in the data managers section', () => {
      // First create a record and its draft
      cy.get('[data-cy="create-record"]').click()

      cy.get('[data-test=pageSelectorButtons]')
        .find('gn-ui-button')
        .eq(2)
        .click()

      cy.get('[data-test=displayedRoles]').children().should('have.length', 1)

      cy.get('[data-test=displayedRoles]')
        .children()
        .find('gn-ui-contact-card')
        .get('[data-test=contactCardName]')
        .invoke('text')
        .should('contain', 'admin admin')
    })
  })
  describe('undo', () => {
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
  describe.only('duplicate', () => {
    it('should duplicate the record', () => {
      // order to target something specific
      cy.get('[data-cy="table-row"]')
        .first()
        .find('[data-test="record-menu-button"]')
        .click()
      cy.get('[data-test="record-menu-duplicate-button"]').click()
      cy.get('gn-ui-form-field').first().should('contain', 'Alpenkonvention')
    })
  })
})
