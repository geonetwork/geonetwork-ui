describe('editor form', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)

    // Alpine convention record
    cy.visit('/edit/8698bf0b-fceb-4f0f-989b-111e7c4af0a4')

    cy.clearRecordDrafts()

    // aliases
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').as(
      'abstractField'
    )
    cy.get('@abstractField').invoke('val').as('abstractFieldInitialValue')
    cy.get('[data-cy=save-status]')
      .invoke('attr', 'data-cy-value')
      .as('saveStatus')
  })

  it('form shows correctly', () => {
    cy.get('gn-ui-record-form').should('be.visible')
    cy.get('gn-ui-record-form gn-ui-form-field').should('have.length.gt', 0)
    cy.get('@abstractField')
      .invoke('val')
      .should('contain', 'Perimeter der Alpenkonvention in der Schweiz.')
    cy.get('@saveStatus').should('eq', 'record_up_to_date')
    cy.screenshot({ capture: 'fullPage' })
  })

  it('draft record is kept', () => {
    cy.get('@abstractField').clear()
    cy.get('@abstractField').type('modified abstract')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000) // waiting for draft saving to kick in
    cy.reload()
    cy.get('@abstractField').invoke('val').should('eq', 'modified abstract')
    cy.get('@saveStatus').should('eq', 'draft_changes_pending')

    cy.clearRecordDrafts()

    cy.get('@saveStatus').should('eq', 'record_up_to_date')
    cy.get('@abstractField')
      .invoke('val')
      .should('contain', 'Perimeter der Alpenkonvention in der Schweiz.')
  })

  it('saving record works', () => {
    cy.get('@abstractField').clear()
    cy.get('@abstractField').type('modified abstract before saving')
    cy.get('md-editor-publish-button').click()
    cy.get('@saveStatus').should('eq', 'record_up_to_date')

    // restore abstract
    cy.get('@abstractField').clear()
    cy.get('@abstractField').then(function (field) {
      cy.wrap(field).type(this.abstractFieldInitialValue)
    })
    cy.get('md-editor-publish-button').click()
  })
})
