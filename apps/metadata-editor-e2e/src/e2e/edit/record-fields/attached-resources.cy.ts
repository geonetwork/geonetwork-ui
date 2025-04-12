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
      .eq(1)
      .as('resourcePageBtn')
  })

  describe('record fields', () => {
    describe('attached resources', () => {
      beforeEach(() => {
        cy.get('@resourcePageBtn').click()
      })
      it('adds a resource', () => {
        // item count before adding
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
        cy.editor_wrapPreviousDraft(recordUuid)
        // upload readme file
        cy.get('gn-ui-form-field-online-link-resources label').selectFile(
          'src/fixtures/readme.txt'
        )
        cy.editor_publishAndReload(recordUuid)
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('@resourcePageBtn').click()
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 2)
      })
      it('modifies a resource', () => {
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        )
          .eq(1)
          .as('readmeLink')
        cy.get('@readmeLink')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'readme.txt')
        cy.editor_wrapPreviousDraft(recordUuid)
        // open modify dialog
        cy.get('@readmeLink').find('button[data-test=card-modify]').click()
        cy.get('gn-ui-modal-dialog gn-ui-text-input')
          .find('input')
          .type('{selectall}{del}new title!')
        cy.get('gn-ui-modal-dialog gn-ui-text-area')
          .find('textarea')
          .type('new description')
        cy.get('gn-ui-modal-dialog [data-cy=confirm-button]').click()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@resourcePageBtn').click()
        cy.get('@readmeLink')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'new description')
        cy.get('@readmeLink').scrollIntoView()
        cy.screenshot({ capture: 'viewport' })
      })
      it('deletes a resource', () => {
        // item count before deleting
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 2)
        cy.editor_wrapPreviousDraft(recordUuid)
        // delete the second item
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-sortable-list [data-test=remove-item]'
        )
          .eq(1)
          .click()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('@resourcePageBtn').click()
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
      })
    })
  })
})
