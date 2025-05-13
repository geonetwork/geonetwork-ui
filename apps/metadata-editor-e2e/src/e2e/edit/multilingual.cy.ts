describe('Multilingual panel', () => {
  let recordUuid: any

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
        cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').first().click()
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
