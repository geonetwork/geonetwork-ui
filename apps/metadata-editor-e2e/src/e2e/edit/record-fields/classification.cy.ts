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
    cy.get('[data-test=pageSelectorButtons]')
      .find('gn-ui-button')
      .eq(2)
      .as('accessContactPageBtn')
  })

  describe('record fields', () => {
    describe('classification', () => {
      describe('keywords', () => {
        it('should show the current keywords', () => {
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .should('have.length', 41)
        })
        it('should add a keyword', () => {
          cy.editor_wrapPreviousDraft(recordUuid)
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-autocomplete')
            .type('a')
          cy.get('mat-option').first().click()
          cy.editor_publishAndReload(recordUuid)
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .should('have.length', 42)
            .last()
            .find('span')
            .should('have.text', 'Addresses ')
        })
        it('should close the autocomplete and clear the input after selecting a keyword', () => {
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-autocomplete')
            .type('a')
          cy.get('mat-option').first().click()
          cy.get('mat-option').should('not.exist')
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-autocomplete')
            .find('input')
            .should('have.value', '')
        })
        it('should delete a keyword', () => {
          cy.editor_wrapPreviousDraft(recordUuid)
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .last()
            .find('gn-ui-button')
            .click()
          cy.editor_publishAndReload(recordUuid)
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .should('have.length', 41)
        })
      })
    })
  })
})
