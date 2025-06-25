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
    describe('distribution resources', () => {
      beforeEach(() => {
        cy.get('@resourcePageBtn').click()
      })
      it('adds a resource', () => {
        // item count before adding
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-online-resource-card'
        ).should('have.length', 0)
        cy.editor_wrapPreviousDraft(recordUuid)
        // add a service distribution
        cy.get('[data-cy="online-resources-type"] button').eq(1).click()
        cy.get('gn-ui-online-service-resource-input mat-radio-button')
          .contains('WPS')
          .click()
        cy.get('gn-ui-form-field-online-resources')
          .find('gn-ui-url-input')
          .find('input')
          .first()
          .type('http://example.com/wps')
        cy.get('gn-ui-online-service-resource-input')
          .find('[data-cy="identifier-in-service"]')
          .type('A process name as identifier in service')
        cy.get('gn-ui-form-field-online-resources').find('button').eq(2).click()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('@resourcePageBtn').click()
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
      })
      it('modifies a resource', () => {
        cy.get('gn-ui-form-field-online-resources gn-ui-online-resource-card')
          .eq(0)
          .as('resourceService')
        cy.get('@resourceService')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'A process name as identifier in service')
        cy.editor_wrapPreviousDraft(recordUuid)
        // open modify dialog
        cy.get('@resourceService').find('button[data-test=card-modify]').click()
        cy.get('gn-ui-modal-dialog gn-ui-text-area')
          .find('textarea')
          .type('new description')
        cy.get('gn-ui-modal-dialog [data-cy=confirm-button]').click()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@resourcePageBtn').click()
        cy.get('@resourceService')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'new description')
        cy.get('@resourceService').scrollIntoView()
        cy.screenshot({ capture: 'viewport' })
      })
      it('deletes a resource', () => {
        // item count before deleting
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
        cy.editor_wrapPreviousDraft(recordUuid)
        // delete the first item
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-sortable-list [data-test=remove-item]'
        )
          .eq(0)
          .click()
        cy.editor_publishAndReload(recordUuid)
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('@resourcePageBtn').click()
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-online-resource-card'
        ).should('have.length', 0)
      })
    })
  })
})
