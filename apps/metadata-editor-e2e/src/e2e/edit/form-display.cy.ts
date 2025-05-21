/* eslint-disable cypress/no-unnecessary-waiting */

describe('editor form', () => {
  let recordUuid: any

  beforeEach(() => {
    cy.editor_createRecordCopy().then((uuid) => {
      recordUuid = uuid
    })
  })

  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit(`/edit/${recordUuid}`)

    // aliases
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').as(
      'abstractField'
    )
    cy.get('@abstractField').invoke('val').as('abstractFieldInitialValue')
    cy.get('[data-cy=save-status]')
      .invoke('attr', 'data-cy-value')
      .as('saveStatus')
    cy.get('[data-test=pageSelectorButtons]')
      .find('gn-ui-button')
      .eq(0)
      .as('descriptionPageBtn')
    cy.get('[data-test=pageSelectorButtons]')
      .find('gn-ui-button')
      .eq(1)
      .as('resourcePageBtn')
    cy.get('[data-test=pageSelectorButtons]')
      .find('gn-ui-button')
      .eq(2)
      .as('accessContactPageBtn')
  })

  describe('form display', () => {
    it('opens the first page by default', () => {
      cy.get('@accessContactPageBtn').click()
      cy.visit(`/edit/${recordUuid}`)

      cy.get('@abstractField').should('be.visible')
    })
    it('form shows correctly', () => {
      cy.get('gn-ui-record-form').should('be.visible')
      cy.get('gn-ui-record-form gn-ui-form-field').should('have.length.gt', 0)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.screenshot({ capture: 'fullPage' })
    })

    it('keeps the draft record', () => {
      cy.get('@abstractField').clear()
      cy.get('@abstractField').type('modified abstract')
      cy.window()
        .its('localStorage')
        .invoke('getItem', `geonetwork-ui-draft-${recordUuid}`)
        .should('contain', 'modified abstract')

      cy.reload()
      cy.get('@abstractField').invoke('val').should('eq', 'modified abstract')
      cy.get('@saveStatus').should('eq', 'draft_changes_pending')

      cy.clearRecordDrafts()

      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('@abstractField')
        .invoke('val')
        .should('contain', 'Cette couche de points reprend les informations')
    })
  })
})
