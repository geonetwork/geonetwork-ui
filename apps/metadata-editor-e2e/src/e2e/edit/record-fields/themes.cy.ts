/* eslint-disable cypress/no-unnecessary-waiting */

describe('editor form', () => {
  let recordUuid: any

  before(() => {
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
  })

  describe('record fields', () => {
    describe('INSPIRE themes', () => {
      it('should show the current themes', () => {
        cy.get('gn-ui-form-field-inspire-theme')
          .find('gn-ui-badge')
          .should('have.length', 1)
      })
      it('should add a theme', () => {
        cy.editor_wrapPreviousDraft(recordUuid)
        cy.get('gn-ui-form-field-inspire-theme')
          .find('gn-ui-autocomplete')
          .type('a')
        cy.get('mat-option').first().click()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('gn-ui-form-field-inspire-theme')
          .find('gn-ui-badge')
          .should('have.length', 2)
          .last()
          .find('span')
          .should('have.text', 'Biota ')
      })
      it('should close the autocomplete and clear the input after selecting a theme', () => {
        cy.get('gn-ui-form-field-inspire-theme')
          .find('gn-ui-autocomplete')
          .type('a')
        cy.get('mat-option').first().click()
        cy.get('mat-option').should('not.exist')
        cy.get('gn-ui-form-field-inspire-theme')
          .find('gn-ui-autocomplete')
          .find('input')
          .should('have.value', '')
      })
      it('should delete a theme', () => {
        cy.editor_wrapPreviousDraft(recordUuid)
        cy.get('gn-ui-form-field-inspire-theme')
          .find('gn-ui-badge')
          .last()
          .find('gn-ui-button')
          .click()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('gn-ui-form-field-inspire-theme')
          .find('gn-ui-badge')
          .should('have.length', 1)
      })
    })
  })
})
