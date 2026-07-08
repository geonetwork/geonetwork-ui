describe('reuse delete', () => {
  beforeEach(() => {
    // the delete button only shows when the reuse form is configured
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-reuse-form.toml',
    })
    // log in as admin, who has edit rights on the reuse
    cy.login()
    cy.visit('/reuse/7eb795c2-d612-4b5e-b15e-d985b0f4e697')
  })

  it('deletes a reuse, navigating to search on success and showing an error otherwise', () => {
    cy.get('[data-cy="deleteReuseButton"]').should('be.visible')

    // on error: stay on the reuse page and show an error notification
    // (the DELETE is stubbed so the seeded record is never actually removed)
    cy.intercept('DELETE', '**/api/records/*', { statusCode: 500 }).as(
      'deleteFail'
    )
    cy.get('[data-cy="deleteReuseButton"]').click()
    cy.wait('@deleteFail')
    cy.get('gn-ui-notification').should('contain.text', 'Error deleting reuse')
    cy.url().should('include', '/reuse/7eb795c2-d612-4b5e-b15e-d985b0f4e697')

    // on success: navigate to the search page
    cy.intercept('DELETE', '**/api/records/*', { statusCode: 204 }).as(
      'deleteOk'
    )
    cy.get('[data-cy="deleteReuseButton"]').click()
    cy.wait('@deleteOk')
    cy.url().should('include', '/search')
  })
})
