describe('light edit page', () => {
  let reuseUuid: any

  beforeEach(() => {
    cy.editor_createRecordCopy(
      '7eb795c2-d612-4b5e-b15e-d985b0f4e697', // reuse record
      'ongulés', // one result search term
      'johndoe',
      'p4ssworD_'
    ).then((uuid) => {
      reuseUuid = uuid
    })
  })

  it('light edit page tests', () => {
    cy.login('johndoe', 'p4ssworD_', false)

    // Display
    // should not show the leave button without a redirect_on_leave param
    cy.visit(`/light-edit/${reuseUuid}`)
    cy.get('[data-cy="leave-button"]').should('not.exist')

    // should show the record form without the full editor tools
    cy.get('gn-ui-record-form').should('be.visible')
    cy.get('md-editor-sidebar').should('not.exist')
    cy.get('md-editor-page-selector').should('not.exist')
    cy.get('md-editor-publish-button').should('not.exist')
    cy.get('[data-cy="undo-button"]').should('not.exist')
    cy.get('[data-cy="save-status"]').should('not.exist')
    cy.get('[data-test="light-edit-background"]').should('exist')
    cy.get('[data-cy="save-button"]').should('be.visible')

    // Leave
    // should navigate to the redirect_on_leave url
    const redirectUrl = `${Cypress.config('baseUrl')}/catalog/search?from=light-edit`
    cy.visit(
      `/light-edit/${reuseUuid}?redirect_on_leave=${encodeURIComponent(
        redirectUrl
      )}`
    )
    cy.get('[data-cy="leave-button"]').should('be.visible').click()
    cy.url().should('include', 'from=light-edit')

    // Save
    // should save the record and show a success notification
    cy.visit(`/light-edit/${reuseUuid}`)
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').as(
      'abstractField'
    )
    cy.get('@abstractField').type(
      '{selectall}{del}modified by the light edit e2e test'
    )
    cy.get('gn-ui-image-input').find('img').should('have.length', 1)
    cy.get('gn-ui-image-input').find('gn-ui-button').eq(1).click()
    cy.get('gn-ui-image-input').find('img').should('have.length', 0)
    cy.get('gn-ui-form-field-overviews label').selectFile(
      'src/fixtures/sample.png'
    )
    cy.get('gn-ui-image-input').find('img').should('have.length', 1)
    cy.intercept({
      method: 'PUT',
      pathname: '**/records',
    }).as('insertRecord')
    cy.get('[data-cy="save-button"]').click()
    cy.wait('@insertRecord')
    cy.get('gn-ui-notification').should('contain', 'Reuse saved')
    // reload the page to check that the changes were persisted
    cy.intercept({
      method: 'GET',
      url: '**/attachments/sample.png',
    }).as('importUrlRequest')
    cy.visit(`/light-edit/${reuseUuid}`)
    cy.get('@abstractField').should(
      'contain.value',
      'modified by the light edit e2e test'
    )
    cy.get('@importUrlRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]) // the backend may respond with a "not changed" code
    cy.get('gn-ui-image-input').find('img').should('have.length', 1)
  })
})
