describe('Multilingual panel', () => {
  it('Multilingual mode', () => {
    cy.editor_createRecordCopy().as('recordUuid')

    cy.login('admin', 'admin', false)
    cy.get<string>('@recordUuid').then((recordUuid) =>
      cy.visit(`/edit/${recordUuid}`)
    )

    // Opens the multilingual panel and shows the switch button, no edit menu access
    cy.get('gn-ui-multilingual-panel').should('not.exist')
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
    cy.get('gn-ui-multilingual-panel').should('be.visible')

    cy.get('gn-ui-multilingual-panel')
      .find('gn-ui-check-toggle')
      .should('have.attr', 'ng-reflect-value', 'false')
    cy.get('[data-test="activateSelection"]').should('not.exist')

    // Language addition

    // should show the available languages when switching to multilingual
    cy.get('gn-ui-multilingual-panel').find('gn-ui-check-toggle').click()
    cy.get('gn-ui-multilingual-panel')
      .find('[data-test="langAvailable"]')
      .its('length')
      .should('be.oneOf', [21, 27]) // depends on the GeoNetwork version

    // should access the editor menu and persist the new languages selection on reload
    cy.get<string>('@recordUuid').then((recordUuid) =>
      cy.editor_addLanguages(recordUuid)
    )

    cy.get('[data-test="langSwitch"]').should('have.length', 3)

    // Language removal
    // should ask for confirmation when removing languages and keep the selection if cancelled
    cy.get('gn-ui-multilingual-panel')
      .find('[data-test="activateSelection"]')
      .click()
    cy.get('[data-test="langAvailable"]').eq(3).click()
    cy.get('[data-test="validateSelection"').click()
    cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').first().click()
    cy.get('[data-test="langSwitch"]').should('have.length', 3)

    // should remove languages from the record and persist on reload
    cy.get('gn-ui-multilingual-panel')
      .find('[data-test="activateSelection"]')
      .click()
    cy.get('[data-test="langAvailable"]').eq(3).click()
    cy.get<string>('@recordUuid').then((recordUuid) =>
      cy.editor_wrapPreviousDraft(recordUuid)
    )
    cy.get('[data-test="validateSelection"').click()
    cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').eq(1).click()
    cy.get<string>('@recordUuid').then((recordUuid) =>
      cy.editor_publishAndReload(recordUuid)
    )

    // open multilingual panel
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
    cy.get('gn-ui-multilingual-panel').should('be.visible')
    cy.get('[data-test="langSwitch"]').should('have.length', 2)

    // Switching back to monolingual
    // should ask for confirmation and keep the selection if cancelled
    cy.get('gn-ui-multilingual-panel')
      .find('[data-test="activateSelection"]')
      .click()
    cy.get('gn-ui-multilingual-panel').find('gn-ui-check-toggle').click()
    cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').first().click()
    cy.get('[data-test="langSwitch"]').should('have.length', 2)

    // should remove all languages
    cy.get('[data-test="langSwitch"]').should('have.length', 2)
    cy.get('gn-ui-multilingual-panel')
      .find('[data-test="activateSelection"]')
      .click()
    cy.get('gn-ui-multilingual-panel').find('gn-ui-check-toggle').click()
    cy.get('gn-ui-confirmation-dialog').find('gn-ui-button').eq(1).click()
    cy.get('[data-test="langSwitch"]').should('not.exist')
  })

  it('Switching default language', () => {
    const multilingualRecord = '8698bf0b-fceb-4f0f-989b-111e7c4af0a4'
    const multilingualRecordTitle = 'alpenkonvention'
    cy.editor_createRecordCopy(multilingualRecord, multilingualRecordTitle).as(
      'recordUuid'
    )

    cy.login('admin', 'admin', false)
    cy.get<string>('@recordUuid').then((recordUuid) =>
      cy.visit(`/edit/${recordUuid}`)
    )

    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
    cy.get('[data-test="langSwitch"]')
      .eq(2)
      .find('span')
      .eq(2)
      .should('have.text', 'Default')
    cy.get('[data-test="activateSelection"]').click()
    cy.get('gn-ui-multilingual-panel')
      .find('[data-test="langAvailable"][data-test-lang="de"]')
      .find('gn-ui-button')
      .should('have.attr', 'ng-reflect-disabled', 'true')
    cy.get('gn-ui-form-field[ng-reflect-model=title] textarea')
      .invoke('val')
      .should('contain', 'Copy of record Alpenkonvention')
    cy.get<string>('@recordUuid').then((recordUuid) =>
      cy.editor_wrapPreviousDraft(recordUuid)
    )
    cy.get('[data-test="activateSelection"]').click()
    cy.get('[data-test="langSwitch"]').eq(1).find('button').eq(1).click()
    cy.get('gn-ui-action-menu').find('gn-ui-button').first().click()
    cy.get<string>('@recordUuid').then((recordUuid) =>
      cy.editor_publishAndReload(recordUuid)
    )

    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()

    // should display the default label next to the new language
    cy.get('[data-test="langSwitch"]')
      .eq(1)
      .find('span')
      .eq(2)
      .should('have.text', 'Default')

    // should not allow to delete the new default language
    cy.get('[data-test="activateSelection"]').click()
    cy.get('gn-ui-multilingual-panel')
      .find('[data-test="langAvailable"][data-test-lang="fr"]')
      .find('gn-ui-button')
      .should('have.attr', 'ng-reflect-disabled', 'true')

    // should display the translated fields in the right language
    cy.get('gn-ui-form-field[ng-reflect-model=title] textarea')
      .invoke('val')
      .should('contain', 'Copy of record Convention des Alpes')
  })
})
