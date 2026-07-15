// Skipped: every test here requires opening /light-edit/<reuse-uuid> to
// actually show the record form, which depends on Gn4Repository.canEdit()
// allowing kind === 'reuse'. That relaxation is a separate, undecided
// authorization change (see PR #1607's own to-do) and is not shipped with
// this PR. Un-skip once that change lands (either here or in its own PR).
describe.skip('light edit page', () => {
  // seeded reuse record (also used by datahub-e2e reuse specs)
  const reuseUuid = '7eb795c2-d612-4b5e-b15e-d985b0f4e697'

  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.clearRecordDrafts()
  })

  describe('display', () => {
    beforeEach(() => {
      cy.visit(`/light-edit/${reuseUuid}`)
    })
    it('shows the record form without the full editor tools', () => {
      cy.get('gn-ui-record-form').should('be.visible')
      cy.get('md-editor-sidebar').should('not.exist')
      cy.get('md-editor-page-selector').should('not.exist')
      cy.get('md-editor-publish-button').should('not.exist')
      cy.get('[data-cy="undo-button"]').should('not.exist')
      cy.get('[data-cy="save-status"]').should('not.exist')
      cy.get('[data-test="light-edit-background"]').should('exist')
      cy.get('[data-cy="leave-button"]').should('be.visible')
      cy.get('[data-cy="save-button"]').should('be.visible')
    })
  })

  describe('save', () => {
    it('saves the record and shows a success notification', () => {
      cy.visit(`/light-edit/${reuseUuid}`)
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
      cy.url().should('include', `/light-edit/${reuseUuid}`)
    })
  })

  describe('leave', () => {
    it('navigates to the redirect_on_leave url', () => {
      const redirectUrl = `${Cypress.config('baseUrl')}/catalog/search?from=light-edit`
      cy.visit(
        `/light-edit/${reuseUuid}?redirect_on_leave=${encodeURIComponent(
          redirectUrl
        )}`
      )
      cy.get('gn-ui-record-form').should('be.visible')
      cy.get('[data-cy="leave-button"]').click()
      cy.url().should('include', 'from=light-edit')
    })
    it('falls back to the dashboard when the param is absent', () => {
      cy.visit(`/light-edit/${reuseUuid}`)
      cy.get('gn-ui-record-form').should('be.visible')
      cy.get('[data-cy="leave-button"]').click()
      cy.url().should('include', '/catalog/search')
      cy.url().should('not.include', 'from=light-edit')
    })
  })
})
