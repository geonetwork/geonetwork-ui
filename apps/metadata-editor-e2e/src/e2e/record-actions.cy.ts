describe('record-actions', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')
  })
  describe('delete', () => {
    const recordId = `TEST_RECORD_${Date.now()}`
    describe('record with draft', () => {
      it('should delete the record, delete its associated draft and refresh the interface', () => {
        // First create a record and its draft
        cy.get('[data-cy="create-record"]').click()
        cy.url().should('include', '/create')
        cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea')
          .as('abstractField')
          .focus()
        cy.get('@abstractField').type('record abstract')
        cy.get('[data-test="recordTitleInput"]').click()
        cy.get('[data-test="recordTitleInput"]').type('{selectAll}{backspace}')
        cy.get('[data-test="recordTitleInput"]').type(recordId)
        cy.intercept({
          method: 'PUT',
          pathname: '**/records',
        }).as('insertRecord')
        cy.get('md-editor-publish-button').click()
        cy.wait('@insertRecord')
        cy.get('@abstractField').focus()
        cy.get('@abstractField').type('draft abstract')
        // Assert that the draft exists in the local storage
        cy.editor_readFormUniqueIdentifier().then((uniqueIdentifier) =>
          cy
            .window()
            .its('localStorage')
            .invoke('getItem', `geonetwork-ui-draft-${uniqueIdentifier}`)
            .should('exist')
        )
        cy.visit('/my-space/my-records')
        cy.get('[data-cy="table-row"]')
          .contains(recordId)
          .should('have.length', 1)
        cy.get('[data-cy="dashboard-drafts-count"]').should('contain', '1')
        // Delete the record
        cy.get('[data-test="record-menu-button"]').last().click()
        cy.get('[data-test="record-menu-delete-button"]').click()
        cy.get('[data-cy="confirm-button"]').click()
        cy.get('[data-cy="table-row"]')
          .contains(recordId)
          .should('have.length', 0)
        cy.get('gn-ui-notification').should('contain', 'Delete success')
      })
    })

    describe('draft without record', () => {
      it('should delete the draft and refresh the interface', () => {
        // First create a draft
        cy.get('[data-cy="create-record"]').click()
        cy.url().should('include', '/create')
        cy.get('[data-test="recordTitleInput"]').click()
        cy.get('[data-test="recordTitleInput"]').type('{selectAll}{backspace}')
        cy.get('[data-test="recordTitleInput"]').type(recordId)
        cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea')
          .as('abstractField')
          .focus()
        cy.get('@abstractField').type('draft abstract')
        cy.editor_readFormUniqueIdentifier().then((recordUuid) => {
          cy.window()
            .its('localStorage')
            .invoke('getItem', `geonetwork-ui-draft-${recordUuid}`)
            .should('contain', 'draft abstract')
        })
        cy.visit('/my-space/my-draft')
        cy.get('[data-cy="table-row"]')
          .contains(recordId)
          .should('have.length', 1)
        cy.get('[data-cy="dashboard-drafts-count"]').should('contain', '1')
        // Delete the draft
        cy.get('[data-test="record-menu-button"]').click()
        cy.get('[data-test="record-menu-delete-button"]').click()
        cy.get('[data-cy="confirm-button"]').click()
        cy.get('[data-cy="table-row"]').should('not.exist')
      })
    })
  })

  describe('create', () => {
    beforeEach(() => {
      // create a record
      cy.get('[data-cy="create-record"]').click()
      cy.url().should('include', '/create')
    })

    afterEach(() => {
      // delete the new record
      cy.visit('/catalog/search')
      cy.get('.table-header-cell').eq(1).click()
      cy.get('.table-header-cell').eq(1).click()
      cy.get('[data-test="record-menu-button"]').first().click()
      cy.get('[data-test="record-menu-delete-button"]').click()
      cy.get('[data-cy="confirm-button"]').click()
    })

    it('should create the record without error', () => {
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
      cy.go('back')
      cy.url().should('include', '/catalog/search')
    })

    it('the created record should have the registered user as point of contact in the data managers section', () => {
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
      cy.url().should('include', '/create')
      cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea')
        .as('abstractField')
        .focus()
      cy.get('@abstractField').type('record abstract')
      cy.editor_readFormUniqueIdentifier().then((recordUuid) => {
        cy.window()
          .its('localStorage')
          .invoke('getItem', `geonetwork-ui-draft-${recordUuid}`)
          .should('exist')
      })

      cy.intercept({
        method: 'PUT',
        pathname: '**/records',
      }).as('insertRecord')
      cy.get('md-editor-publish-button').click()
      cy.wait('@insertRecord')
      cy.get('[data-cy="undo-button"] button').should('be.disabled')

      cy.get('@abstractField').clear()
      cy.get('@abstractField').focus()
      cy.get('@abstractField').type('draft abstract')
      cy.editor_readFormUniqueIdentifier().then((recordUuid) => {
        cy.window()
          .its('localStorage')
          .invoke('getItem', `geonetwork-ui-draft-${recordUuid}`)
          .should('contain', 'draft abstract')
      })

      cy.get('[data-cy="undo-button"]').click()
      cy.get('[data-cy="confirm-button"]').click()
      cy.get('@abstractField').should('have.value', 'record abstract')

      // delete the new record
      cy.visit('/catalog/search')
      cy.get('.table-header-cell').eq(1).click()
      cy.get('.table-header-cell').eq(1).click()
      cy.get('[data-test="record-menu-button"]').first().click()
      cy.get('[data-test="record-menu-delete-button"]').click()
      cy.get('[data-cy="confirm-button"]').click()
    })
  })

  describe('duplicate', () => {
    it('should duplicate the record', () => {
      cy.get('.table-header-cell').eq(1).click()
      cy.get('[data-cy="table-row"]')
        .first()
        .find('[data-test="record-menu-button"]')
        .click()
      cy.get('[data-test="record-menu-duplicate-button"]').click()

      cy.get('gn-ui-form-field')
        .first()
        .find('input')
        .invoke('val')
        .should('eq', 'Accroches vélos MEL (Copy)')

      // delete the new record
      cy.visit('/catalog/search')
      cy.get('.table-header-cell').eq(1).click()
      cy.get('.table-header-cell').eq(1).click()
      cy.get('[data-test="record-menu-button"]').first().click()
      cy.get('[data-test="record-menu-delete-button"]').click()
      cy.get('[data-cy="confirm-button"]').click()
    })
  })
})
