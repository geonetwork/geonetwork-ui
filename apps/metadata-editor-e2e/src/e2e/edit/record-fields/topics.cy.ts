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
    describe('topics', () => {
      it('should show the current topics', () => {
        cy.get('gn-ui-form-field-topics')
          .find('gn-ui-badge')
          .should('have.length', 1)
      })
      it('should add a topic', () => {
        cy.editor_wrapPreviousDraft(recordUuid)
        cy.get('gn-ui-form-field-topics')
          .find('gn-ui-dropdown-multiselect')
          .click()
        cy.get('label').eq(4).click()
        cy.clickOnBody()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('gn-ui-form-field-topics')
          .find('gn-ui-badge')
          .should('have.length', 2)
          .last()
          .find('span')
          .should('have.text', 'Economy ')
      })
      it('should delete a topic', () => {
        cy.editor_wrapPreviousDraft(recordUuid)
        cy.get('gn-ui-form-field-topics')
          .find('gn-ui-badge')
          .last()
          .find('gn-ui-button')
          .click()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('gn-ui-form-field-topics')
          .find('gn-ui-badge')
          .should('have.length', 1)
      })
    })
  })
})
