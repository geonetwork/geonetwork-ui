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

  describe('about record fields', () => {
    beforeEach(() => {
      cy.get('gn-ui-record-form')
        .children('div')
        .first()
        .children('div')
        .eq(2)
        .as('aboutSection')
    })

    it('resource identifier', () => {
      // it shows the resource identifier
      cy.get('@aboutSection')
        .find('gn-ui-form-field-simple')
        .first()
        .find('input')
        .invoke('val')
        .should('eq', 'UWWTD_WASTE_WATER_TREATMENT')

      // it edits and saves the resource identifier
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field-simple').first().find('input').clear()
      cy.get('gn-ui-form-field-simple')
        .first()
        .find('input')
        .type('Test - resource identifier')
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-form-field-simple')
        .first()
        .find('input')
        .invoke('val')
        .should('eq', 'Test - resource identifier')
    })
    it('resource created', () => {
      cy.get('@aboutSection')
        .find('gn-ui-form-field-date')
        .eq(0)
        .as('resourceCreatedField')

      // it shows the resource creation date
      cy.get('@resourceCreatedField')
        .find('input')
        .invoke('val')
        .should('eq', '1/1/2005')

      // it edits and saves the resource creation date
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('@resourceCreatedField')
        .find('input')
        .type('{selectall}{del}01/01/2019{enter}')
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('@resourceCreatedField')
        .find('input')
        .invoke('val')
        .should('eq', '1/1/2019')
    })
    it('resource updated', () => {
      cy.get('@aboutSection')
        .find('gn-ui-form-field-date')
        .eq(1)
        .as('resourceUpdatedField')

      // it shows the resource update date
      cy.get('@resourceUpdatedField')
        .find('input')
        .invoke('val')
        .should('eq', '11/1/2019')

      // it edits and saves the resource update date
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('@resourceUpdatedField')
        .find('input')
        .type('{selectall}{del}01/01/2019{enter}')
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('@resourceUpdatedField')
        .find('input')
        .invoke('val')
        .should('eq', '1/1/2019')
    })
    it('update frequency', () => {
      // when the regularity switch is on
      // it should allow to select a frequency
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field-update-frequency')
        .find('gn-ui-dropdown-selector')
        .openDropdown()
        .children('button')
        .eq(3)
        .click()
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-form-field-update-frequency')
        .find('gn-ui-dropdown-selector')
        .getActiveDropdownOption()
        .find('span')
        .invoke('text')
        .should('eq', ' Data is updated each day ')

      cy.clickOnBody()

      // when the regularity switch is off
      // it should show default frequency
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field-update-frequency')
        .find('gn-ui-check-toggle label')
        .click()
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-form-field-update-frequency')
        .find('gn-ui-dropdown-selector')
        .find('button')
        .find('div')
        .invoke('text')
        .should('eq', ' Data is repeatedly and frequently updated ')
    })
    it('temporal extents', () => {
      // it should show the two extents buttons
      cy.get('gn-ui-form-field-temporal-extents')
        .find('gn-ui-button')
        .should('have.length', 2)

      // it adds a time instant
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field-temporal-extents')
        .find('gn-ui-button')
        .first()
        .click()
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-form-field-temporal-extents')
        .find('gn-ui-date-picker')
        .should('be.visible')

      // it adds a time period
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field-temporal-extents')
        .find('gn-ui-button')
        .eq(1)
        .click()
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-form-field-temporal-extents')
        .find('gn-ui-date-range-picker')
        .should('be.visible')

      // it should delete dates
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field-temporal-extents')
        .find('[data-test="remove-item"]')
        .first()
        .click()
      cy.get('gn-ui-form-field-temporal-extents')
        .find('[data-test="remove-item"]')
        .first()
        .click()
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-form-field-temporal-extents')
        .find('[data-test="remove-item"]')
        .should('have.length', 0)

      // date picker in sortable list
      // it should keep the date picker open when selecting the start date of a range
      cy.get('gn-ui-form-field-temporal-extents gn-ui-button').eq(1).click()
      cy.get('gn-ui-form-field-temporal-extents')
        .find('[data-cy=date-picker-button]')
        .click()
      cy.get('mat-calendar').contains('1').click()
      cy.get('mat-calendar').should('be.visible')
    })
  })
})
