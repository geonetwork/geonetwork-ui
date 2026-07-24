describe('light edit page', () => {
  // seeded reuse record (also used by datahub-e2e reuse specs) - read only here
  const reuseUuid = '7eb795c2-d612-4b5e-b15e-d985b0f4e697'
  const reuseTitle =
    'Carte dynamique sur la répartition des ongulés sauvages en France'

  it('light edit page tests', () => {
    cy.login('admin', 'admin', false)
    cy.clearRecordDrafts()

    // Display
    // should show the record form without the full editor tools
    cy.visit(`/light-edit/${reuseUuid}`)
    cy.get('gn-ui-record-form').should('be.visible')
    cy.get('md-editor-sidebar').should('not.exist')
    cy.get('md-editor-page-selector').should('not.exist')
    cy.get('md-editor-publish-button').should('not.exist')
    cy.get('[data-cy="undo-button"]').should('not.exist')
    cy.get('[data-cy="save-status"]').should('not.exist')
    cy.get('[data-test="light-edit-background"]').should('exist')
    cy.get('[data-cy="save-button"]').should('be.visible')
    // should not show the leave button without a redirect_on_leave param
    cy.get('[data-cy="leave-button"]').should('not.exist')

    // Leave
    // should navigate to the redirect_on_leave url
    const redirectUrl = `${Cypress.config('baseUrl')}/catalog/search?from=light-edit`
    cy.visit(
      `/light-edit/${reuseUuid}?redirect_on_leave=${encodeURIComponent(
        redirectUrl
      )}`
    )
    cy.get('gn-ui-record-form').should('be.visible')
    cy.get('[data-cy="leave-button"]').should('be.visible').click()
    cy.url().should('include', 'from=light-edit')

    // Save
    // should save the record and show a success notification
    // edit a disposable copy so the seeded record is left untouched
    cy.editor_createRecordCopy(reuseUuid, reuseTitle).then((copyUuid) => {
      cy.visit(`/light-edit/${copyUuid}`)
      cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').as(
        'abstractField'
      )
      cy.get('@abstractField').clear()
      cy.get('@abstractField').type('modified by the light edit e2e test')
      cy.get('[data-cy="save-button"]').click()
      cy.get('gn-ui-notification', { timeout: 15000 }).should(
        'contain',
        'Reuse saved'
      )
      cy.url().should('include', `/light-edit/${copyUuid}`)
    })
  })
})
