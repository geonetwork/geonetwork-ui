describe('Multilingual panel', () => {
  let recordUuid: any
  describe('Add and remove languages', () => {
    before(() => {
      cy.editor_createRecordCopy().then((uuid) => {
        recordUuid = uuid
      })
    })

    beforeEach(() => {
      cy.login('admin', 'admin', false)
      cy.visit(`/edit/${recordUuid}`)
    })

    it('Opens the multilingual panel and shows the switch button, no edit menu access', () => {
      cy.get('gn-ui-multilingual-panel').should('not.exist')
      cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
      cy.get('gn-ui-multilingual-panel').should('be.visible')

      cy.get('gn-ui-multilingual-panel')
        .find('gn-ui-check-toggle')
        .should('have.attr', 'ng-reflect-value', 'false')
      cy.get('[data-test="activateSelection"]').should('not.exist')
    })
    describe('Switching to multilingual', () => {
      describe('Language addition', () => {
        it('should show the available languages when switching to multilingual', () => {
          cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
          cy.get('gn-ui-multilingual-panel').find('gn-ui-check-toggle').click()
          cy.get('gn-ui-multilingual-panel')
            .find('[data-test="langAvailable"]')
            .should('have.length', 21)
        })
        it('should access the editor menu and persist the new languages selection on reload', () => {
          cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
          cy.get('gn-ui-multilingual-panel').find('gn-ui-check-toggle').click()
          cy.editor_addLanguages(recordUuid)

          cy.get('[data-test="langSwitch"]').should('have.length', 3)
        })
      })
      describe('Language removal', () => {
        it('should ask for confirmation when removing languages and keep the selection if cancelled', () => {
          cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
          cy.get('gn-ui-multilingual-panel')
            .find('[data-test="activateSelection"]')
            .click()
          cy.get('[data-test="langAvailable"]').eq(3).click()
          cy.get('[data-test="validateSelection"').click()
          cy.get('gn-ui-confirmation-dialog')
            .find('gn-ui-button')
            .first()
            .click()
          cy.get('[data-test="langSwitch"]').should('have.length', 3)
        })
        it('should remove languages from the record and persist on reload', () => {
          cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
          cy.get('gn-ui-multilingual-panel')
            .find('[data-test="activateSelection"]')
            .click()
          cy.get('[data-test="langAvailable"]').eq(3).click()
          cy.editor_wrapPreviousDraft(recordUuid)
          cy.get('[data-test="validateSelection"').click()
          cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').eq(1).click()
          cy.editor_publishAndReload(recordUuid)
          cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
          cy.get('[data-test="langSwitch"]').should('have.length', 2)
        })
      })
    })
    describe('Switching back to monolingual', () => {
      it('should ask for confirmation and keep the selection if cancelled', () => {
        cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
        cy.get('[data-test="langSwitch"]').should('have.length', 2)
        cy.get('gn-ui-multilingual-panel')
          .find('[data-test="activateSelection"]')
          .click()
        cy.get('gn-ui-multilingual-panel').find('gn-ui-check-toggle').click()
        cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').first().click()
        cy.get('[data-test="langSwitch"]').should('have.length', 2)
      })
      it('should remove all languages', () => {
        cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
        cy.get('[data-test="langSwitch"]').should('have.length', 2)
        cy.get('gn-ui-multilingual-panel')
          .find('[data-test="activateSelection"]')
          .click()
        cy.get('gn-ui-multilingual-panel').find('gn-ui-check-toggle').click()
        cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').eq(1).click()
        cy.get('[data-test="langSwitch"]').should('not.exist')
      })
    })
  })
  describe('Switching default language', () => {
    const multilingualRecord = '8698bf0b-fceb-4f0f-989b-111e7c4af0a4'
    before(() => {
      cy.login('admin', 'admin', false)
      cy.visit(`/edit/${multilingualRecord}`)
      cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
      cy.get('[data-test="langSwitch"]')
        .eq(2)
        .find('span')
        .eq(2)
        .should('have.text', 'Default')
      cy.get('[data-test="activateSelection"]').click()
      cy.get('gn-ui-multilingual-panel')
        .find('[data-test="langAvailable"]')
        .eq(9)
        .find('gn-ui-button')
        .should('have.attr', 'ng-reflect-disabled', 'true')
      cy.get('gn-ui-form-field[ng-reflect-model=title] textarea')
        .invoke('val')
        .should('eq', 'Alpenkonvention')
      cy.editor_wrapPreviousDraft(multilingualRecord)
      cy.get('[data-test="activateSelection"]').click()
      cy.get('[data-test="langSwitch"]').eq(1).find('button').eq(1).click()
      cy.get('gn-ui-action-menu').find('gn-ui-button').first().click()
      cy.editor_publishAndReload(multilingualRecord)
    })
    beforeEach(() => {
      cy.login('admin', 'admin', false)
      cy.visit(`/edit/${multilingualRecord}`)
      cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
    })
    it('should display the default label next to the new language', () => {
      cy.get('[data-test="langSwitch"]')
        .eq(1)
        .find('span')
        .eq(2)
        .should('have.text', 'Default')
    })
    it('should not allow to delete the new default language', () => {
      cy.get('[data-test="activateSelection"]').click()
      cy.get('gn-ui-multilingual-panel')
        .find('[data-test="langAvailable"]')
        .eq(8)
        .find('gn-ui-button')
        .should('have.attr', 'ng-reflect-disabled', 'true')
    })
    it('should display the translated fields in the right language', () => {
      cy.get('gn-ui-form-field[ng-reflect-model=title] textarea')
        .invoke('val')
        .should('eq', 'Convention des Alpes')
    })
  })
})
