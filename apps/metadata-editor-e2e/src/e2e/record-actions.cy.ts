// eslint-disable-next-line @nx/enforce-module-boundaries
import { simpleDatasetRecordAsXmlFixture } from '@geonetwork-ui/common/fixtures'

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
        // Assert that the draft exists in the local storage
        cy.editor_findDraftInLocalStorage().then((value) =>
          expect(value).to.not.equal('null')
        )
        cy.get('@abstractField').focus()
        cy.get('@abstractField').type('draft abstract')
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
        cy.editor_findDraftInLocalStorage().then((value) => {
          expect(value).to.contain('draft abstract')
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

    it('the created record should not allow upload of resources and show info message as it was not saved yet', () => {
      // first page
      cy.get('gn-ui-form-field-overviews')
        .find('gn-ui-image-input')
        .find('input')
        .should('be.disabled')
      cy.get('gn-ui-form-field-overviews')
        .children()
        .find('[data-test="disabled-message"]')
        .should(
          'contain.text',
          ' This field will be enabled once the data has been published '
        )

      // second page
      cy.get('[data-test="previousNextPageButtons"]')
        .children()
        .eq(1)
        .should('contain.text', 'Next')
        .click()
      cy.get('gn-ui-form-field-online-resources')
        .find('gn-ui-switch-toggle')
        .find('mat-button-toggle-group')
        .find('button')
        .should('be.disabled')
      cy.get('gn-ui-file-input').find('input').should('be.disabled')
      cy.get('gn-ui-form-field-online-resources')
        .children()
        .find('div')
        .should(
          'contain.text',
          ' This field will be enabled once the data has been published '
        )

      cy.get('gn-ui-form-field-online-link-resources')
        .find('input')
        .should('be.disabled')
      cy.get('gn-ui-form-field-online-link-resources')
        .children()
        .find('div')
        .should(
          'contain.text',
          ' This field will be enabled once the data has been published '
        )
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
      cy.editor_findDraftInLocalStorage().then((value) => {
        expect(value).to.not.equal('null')
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
      cy.editor_findDraftInLocalStorage().then((value) => {
        expect(value).to.contain('draft abstract')
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
        .find('textarea')
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
  describe('import', () => {
    beforeEach(() => {
      // Open the import overlay
      cy.get('[data-test="import-record"]').click()
    })

    it('should show the import menu overlay', () => {
      cy.get('gn-ui-import-record').should('be.visible')
      cy.get('[data-test="importMenuMainSection"]').should('be.visible')
    })

    describe('import by URL section', () => {
      beforeEach(() => {
        cy.get('[data-test="importFromUrlButton"]').click()
      })

      it('should show the import by URL section', () => {
        cy.get('[data-test="importMenuImportExternalFileSection"]').should(
          'be.visible'
        )
      })

      it('should show the import by URL section', () => {
        cy.get('[data-test="importMenuImportExternalFileSection"]').should(
          'be.visible'
        )
      })

      it('should import a record', () => {
        cy.get('[data-test="importMenuImportExternalFileSection"]')
          .find('gn-ui-url-input')
          .type('http://www.marvelous-record/xml/download')

        cy.intercept(
          {
            method: 'GET',
            url: /\/xml\/download$/,
          },
          {
            statusCode: 200,
            body: simpleDatasetRecordAsXmlFixture(),
          }
        ).as('importUrlRequest')

        cy.get('gn-ui-url-input').find('gn-ui-button').find('button').click()

        // Check that the record is correctly displayed
        cy.get('gn-ui-record-form').should('be.visible')

        cy.get('gn-ui-record-form')
          .find('gn-ui-form-field')
          .eq(0)
          .find('textarea')
          .invoke('val')
          .should('contain', 'Copy')
      })

      it('should be able to navigate back to the main section', () => {
        cy.get(
          '[data-test="importMenuImportExternalFileSectionBackButton"]'
        ).click()

        cy.get('[data-test="importMenuMainSection"]').should('be.visible')
        cy.get('[data-test="importMenuImportExternalFileSection"]').should(
          'not.exist'
        )
      })
    })
  })
})
