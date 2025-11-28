// eslint-disable-next-line @nx/enforce-module-boundaries
import { importDatasetRecordAsXmlFixture } from '@geonetwork-ui/common/fixtures'

describe('record-actions', () => {
  beforeEach(() => {
    cy.clearRecordDrafts()
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')

    // wait for results
    cy.get('gn-ui-results-table')
      .find('[data-cy=table-row]')
      .should('have.length.above', 1)
  })

  describe('delete', () => {
    const recordId = `TEST_RECORD_${Date.now()}`
    it('should delete the record, delete its associated draft and refresh the interface', () => {
      // Create a record, make it draft
      cy.get('[data-cy="create-record"]').click()
      cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea')
        .as('abstractField')
        .focus()
      cy.get('@abstractField').type('record abstract')
      cy.get('[data-test="recordTitleInput"]').click()
      cy.get('[data-test="recordTitleInput"]').type(
        `{selectAll}{backspace}${recordId}`
      )
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
      // Assert that the draft exists in the local storage
      cy.editor_findDraftInLocalStorage().then((value) =>
        expect(value).to.not.equal('null')
      )
      cy.visit('/my-space/my-records')
      cy.get('gn-ui-pagination-buttons').find('button').eq(2).click()
      cy.get('[data-cy="table-row"]')
        .contains(recordId)
        .should('have.length', 1)
      cy.get('[data-cy="dashboard-drafts-count"]').should('contain', '1')

      // Delete the record from my-records page
      cy.visit('/my-space/my-records')
      cy.get('gn-ui-pagination-buttons').find('button').eq(2).click()

      // wait for the record to show up
      cy.get('[data-cy="table-row"]')
        .contains(recordId)
        .should('have.length', 1)

      // click on delete button for that row
      cy.get('[data-cy="table-row"]')
        .filter(`:contains(${recordId})`)
        .first()
        .find('[data-test="record-menu-button"]')
        .last()
        .click()
      cy.get('[data-test="record-menu-delete-button"]').click()
      cy.get('[data-cy="confirm-button"]').click()

      // check that record was deleted (also for case that record was the only one on the page)
      cy.get('[data-cy="table-row"]').should('satisfy', ($rows) => {
        return $rows.length === 0 || !$rows.text().includes(recordId)
      })

      cy.get('gn-ui-notification').should('contain', 'Delete success')

      // check that draft was deleted
      cy.visit('/my-space/my-draft')
      cy.get('[data-cy="table-row"]').should('not.exist')
    })
  })

  describe('create', () => {
    beforeEach(() => {
      // create a record
      cy.get('[data-cy="create-record"]').click()
      cy.url().should('include', '/edit')
      cy.editor_readFormUniqueIdentifier().as('newRecordUuid')
    })

    afterEach(() => {
      // delete the new record
      cy.get<string>('@newRecordUuid').then((uuid) => cy.deleteRecord(uuid))
    })

    it('record creation', () => {
      // it should create the record without error
      cy.get('gn-ui-record-form').should('be.visible') // Check that the record is correctly displayed

      cy.get('gn-ui-record-form')
        .children()
        .eq(0)
        .children()
        .should('have.length', 5)

      cy.get('[data-test="previousNextPageButtons"]')
        .children()
        .eq(0)
        .should('contain.text', 'Come back later')
      cy.get('[data-test="previousNextPageButtons"]')
        .children()
        .eq(1)
        .should('contain.text', 'Next')

      // back navigation should go to search after creating a record
      cy.go('back')
      cy.url().should('include', '/catalog/search')
      cy.go('forward') // go back to edition

      // the created record should have the registered user as point of contact in the data managers section
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

      // the created record should display the uuid in the url, not create a draft and be saved but not published
      cy.url().should('match', /\/edit\/.+/)
      cy.get('[data-cy="dashboard-drafts-count"]').should('not.exist')
      cy.get('[data-cy="save-status"]')
        .find('span')
        .should('have.text', 'Saved - not published')
      cy.get('md-editor-publish-button')
        .find('gn-ui-button')
        .should('have.attr', 'ng-reflect-message', 'Publish this dataset')

      // it the created record should have unknown constraints
      cy.get('[data-test=pageSelectorButtons]')
        .find('gn-ui-button')
        .eq(2)
        .click()
      cy.get('gn-ui-form-field-constraints-shortcuts')
        .find('gn-ui-check-toggle')
        .eq(1)
        .should('have.attr', 'ng-reflect-value', 'true')
    })
  })

  it('undo action', () => {
    // create a record
    cy.get('[data-cy="create-record"]').click()
    cy.url().should('include', '/edit')
    cy.editor_readFormUniqueIdentifier().as('newRecordUuid')

    // should restore the record and refresh the interface
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea')
      .as('abstractField')
      .focus()
    cy.get('@abstractField').should('have.value', '')
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
    cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').eq(1).click()
    cy.editor_findDraftInLocalStorage().then((value) => {
      expect(value).to.not.equal('null')
    })
    cy.get('@abstractField').should('have.value', 'record abstract')

    // make sure the record is published & up to date
    cy.get('[data-cy="undo-button"] button').should('be.disabled')

    // create modified abstract
    cy.get('@abstractField').clear()
    cy.get('@abstractField').focus()
    cy.get('@abstractField').type('draft abstract')
    cy.editor_findDraftInLocalStorage().then((value) => {
      expect(value).to.contain('draft abstract')
    })

    // undo from the action-menu in the dashboard should restore the record
    cy.visit('/my-space/my-draft')
    cy.get('[data-test="record-menu-button"]').click()
    cy.get('[data-test="record-menu-delete-button"]').find('button').click()
    cy.get('[data-test="rollbackMenuSection"]').should('be.visible')
    cy.get('[data-test="rollbackMenuSection"]').find('button').first().click()
    cy.get('[data-cy="table-row"]').should('have.length', 0)
    // check that the rollback was effective
    cy.visit('/catalog/search')
    cy.get('[data-cy="resultItemTitle"]').first().click()

    cy.get('@abstractField').should('have.value', 'record abstract')

    // delete the new record
    cy.get<string>('@newRecordUuid').then((uuid) => cy.deleteRecord(uuid))
  })

  it('duplicate action', () => {
    // it should duplicate the record
    cy.get('.table-header-cell').eq(1).click()

    // make sure the first record is the one we want
    cy.get('gn-ui-results-table')
      .find('[data-cy="resultItemTitle"]')
      .first()
      .invoke('text')
      .should('eq', 'Accroches vélos MEL')

    cy.get('[data-cy="table-row"]')
      .first()
      .find('[data-test="record-menu-button"]')
      .click()
    cy.get('[data-test="record-menu-duplicate-button"]').click()

    cy.get('gn-ui-form-field')
      .first()
      .find('textarea')
      .invoke('val')
      .should('include', 'Copy of record Accroches vélos MEL')

    // delete the new record
    cy.editor_readFormUniqueIdentifier().then((uuid: string) =>
      cy.deleteRecord(uuid)
    )
  })

  it('import action', () => {
    // Open the import overlay
    cy.get('[data-test="import-record"]').click()

    // it should show the import menu overlay
    cy.get('gn-ui-import-record').should('be.visible')
    cy.get('[data-test="importMenuMainSection"]').should('be.visible')

    // import by URL section
    cy.get('[data-test="importFromUrlButton"]').click()

    // it should show the import by URL section
    cy.get('[data-test="importMenuImportExternalFileSection"]').should(
      'be.visible'
    )

    // it should import a record
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
        body: importDatasetRecordAsXmlFixture(),
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

    cy.editor_readFormUniqueIdentifier().as('importedRecordUuid')

    // imported record should be saved right away but not published
    cy.url().should('not.include', 'TEMP')
    cy.get('[data-cy="dashboard-drafts-count"]').should('not.exist')
    cy.get('[data-cy="save-status"]')
      .find('span')
      .should('have.text', 'Saved - not published')
    cy.get('md-editor-publish-button')
      .find('gn-ui-button')
      .should('have.attr', 'ng-reflect-message', 'Publish this dataset')

    cy.visit('/catalog/search')

    // delete the imported record
    cy.get<string>('@importedRecordUuid').then((uuid) => cy.deleteRecord(uuid))

    // Open the import overlay again
    cy.get('[data-test="import-record"]').click()
    cy.get('[data-test="importFromUrlButton"]').click()

    // it should be able to navigate back to the main section
    cy.get(
      '[data-test="importMenuImportExternalFileSectionBackButton"]'
    ).click()

    cy.get('[data-test="importMenuMainSection"]').should('be.visible')
    cy.get('[data-test="importMenuImportExternalFileSection"]').should(
      'not.exist'
    )
  })

  it('drafting', () => {
    // if a user edits the record in the meantime
    cy.visit('/edit/9e1ea778-d0ce-4b49-90b7-37bc0e448300')
    cy.editor_readFormUniqueIdentifier().as('recordUuid')
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').as(
      'abstractField'
    )
    cy.get('@abstractField').clear()
    cy.get('@abstractField').type('modified abstract')
    cy.editor_findDraftInLocalStorage().then((value) => {
      expect(value).to.contain('modified abstract')
    })
    cy.get<string>('@recordUuid').then((uuid) => cy.editor_wrapFirstDraft(uuid))
    cy.clearRecordDrafts()
    cy.visit('/edit/9e1ea778-d0ce-4b49-90b7-37bc0e448300')
    cy.get<string>('@recordUuid').then((uuid) =>
      cy.editor_wrapPreviousDraft(uuid)
    )
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').as(
      'abstractField'
    )
    cy.get('@abstractField').clear()
    cy.get('@abstractField').type('modified by someone else')
    cy.get<string>('@recordUuid').then((uuid) =>
      cy.editor_publishAndReload(uuid)
    )
    cy.window().then((win) => {
      cy.get('@firstDraft').then(function (firstDraft) {
        return win.localStorage.setItem(
          `geonetwork-ui-draft-${this.recordUuid}`,
          firstDraft.toString()
        )
      })
    })
    cy.visit('/edit/9e1ea778-d0ce-4b49-90b7-37bc0e448300')

    // should show the warning banner and the warning menu when publishing
    cy.get('[data-test="draft-alert"]').should('be.visible')
    cy.get('md-editor-publish-button').click()
    cy.get('[data-test="publish-warning"]').should('be.visible')

    // if nobody edits the record in the meantime', () => {
    cy.clearRecordDrafts()
    cy.visit('/edit/9e1ea778-d0ce-4b49-90b7-37bc0e448300')
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').as(
      'abstractField'
    )
    cy.get('@abstractField').clear()
    cy.get('@abstractField').type('modified abstract')
    cy.visit('/catalog/search')

    // should not show any warning
    cy.visit('/edit/9e1ea778-d0ce-4b49-90b7-37bc0e448300')
    cy.get('[data-test="draft-alert"]').should('not.exist')
    cy.get('md-editor-publish-button').click()
    cy.get('[data-test="publish-warning"]').should('not.exist')
  })
})
