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
    describe('Access and constraints', () => {
      beforeEach(() => {
        cy.get('@accessContactPageBtn').click()
      })
      describe('licenses', () => {
        it('should select a new license and show it on reload', () => {
          cy.get('gn-ui-form-field-license')
            .find('button')
            .children('div')
            .first()
            .invoke('text')
            .should('eq', ' Unknown or absent ')
          cy.editor_wrapPreviousDraft(recordUuid)
          cy.get('gn-ui-form-field-license')
            .find('gn-ui-dropdown-selector')
            .openDropdown()
            .children('button')
            .eq(2)
            .click()
          cy.editor_publishAndReload(recordUuid)
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@accessContactPageBtn').click()
          cy.get('gn-ui-form-field-license')
            .find('button')
            .children('div')
            .first()
            .invoke('text')
            .should('eq', ' Creative Commons CC-0 ')
        })
      })
      describe('constraints', () => {
        it('should add a few constraints and show it on reload', () => {
          cy.editor_wrapPreviousDraft(recordUuid)
          cy.get('[data-cy=legalConstraints]')
            .find('gn-ui-button[data-cy=add-constraint-btn] button')
            .click()
          cy.get('[data-cy=legalConstraints]')
            .find('textarea')
            .last()
            .type('new legal constraint')

          // add from shortcuts
          cy.get('[data-cy=constraints-shortcut-btns]')
            .find('gn-ui-button')
            .eq(1)
            .click()
          cy.get('[data-cy=securityConstraints]')
            .find('textarea')
            .last()
            .type('new security constraint')

          // add from shortcuts
          cy.get('[data-cy=constraints-shortcut-btns]')
            .find('gn-ui-button')
            .eq(2)
            .click()
          cy.get('[data-cy=otherConstraints]')
            .find('textarea')
            .last()
            .type('new other constraint')
          cy.get('[data-cy=otherConstraints]')
            .find('gn-ui-button[data-cy=add-url-btn] button')
            .click()
          cy.get('[data-cy=otherConstraints]')
            .find('gn-ui-url-input')
            .last()
            .find('input')
            .type('http://www.example.com/abcd/1234')

          cy.screenshot({ capture: 'fullPage' })
          cy.editor_publishAndReload(recordUuid)
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@accessContactPageBtn').click()

          cy.get('[data-cy=legalConstraints]')
            .find('gn-ui-constraint-card')
            .should('have.length', 5)
          cy.get('[data-cy=legalConstraints]')
            .find('textarea')
            .last()
            .invoke('val')
            .should('eq', 'new legal constraint')

          cy.get('[data-cy=securityConstraints]')
            .find('gn-ui-constraint-card')
            .should('have.length', 1)
          cy.get('[data-cy=securityConstraints]')
            .find('textarea')
            .last()
            .invoke('val')
            .should('eq', 'new security constraint')

          cy.get('[data-cy=otherConstraints]')
            .find('gn-ui-constraint-card')
            .should('have.length', 1)
          cy.get('[data-cy=otherConstraints]')
            .find('textarea')
            .last()
            .invoke('val')
            .should('eq', 'new other constraint')
          cy.get('[data-cy=otherConstraints]')
            .find('gn-ui-url-input input')
            .invoke('val')
            .should('include', 'http://www.example.com/abcd/1234')
        })

        it('should enable "no applicable constraints" and stay enabled', () => {
          cy.editor_wrapPreviousDraft(recordUuid)
          cy.get('[data-cy=constraints-shortcut-toggles]')
            .find('gn-ui-check-toggle label')
            .eq(0)
            .click()

          cy.editor_publishAndReload(recordUuid)
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@accessContactPageBtn').click()

          cy.get('[data-cy=constraints-shortcut-toggles]')
            .find('gn-ui-check-toggle input[type=checkbox]')
            .eq(0)
            .invoke('val')
            .should('eq', 'on')

          // constraints are hidden
          cy.get('[data-cy=legalConstraints]').should('not.exist')
          cy.get('[data-cy=securityConstraints]').should('not.exist')
          cy.get('[data-cy=otherConstraints]').should('not.exist')

          // uncheck toggle
          cy.get('[data-cy=constraints-shortcut-toggles]')
            .find('gn-ui-check-toggle label')
            .eq(0)
            .click()

          // remaining constraints are shown
          cy.get('[data-cy=legalConstraints]').should('not.exist')
          cy.get('[data-cy=securityConstraints]')
            .find('gn-ui-constraint-card')
            .should('have.length', 1)
          cy.get('[data-cy=otherConstraints]')
            .find('gn-ui-constraint-card')
            .should('have.length', 1)
        })
      })
      describe('data managers', () => {
        describe('contacts for resources', () => {
          beforeEach(() => {
            cy.get('@accessContactPageBtn').click()
          })

          it('show the contacts for resource of the dataset', () => {
            cy.get('[data-test=displayedRoles]')
              .children()
              .should('have.length', 3)
          })

          it('delete a contact for resource', () => {
            cy.get('[data-test=displayedRoles]')
              .children()
              .find('gn-ui-contact-card')
              .should('have.length', 3)
            cy.editor_wrapPreviousDraft(recordUuid)

            // delete 2 out of 3 contacts
            cy.get('[data-test=displayedRoles] [data-test=remove-item]')
              .first()
              .click()
            cy.get('[data-test=displayedRoles] [data-test=remove-item]')
              .first()
              .click()

            cy.editor_publishAndReload(recordUuid)
            cy.get('@saveStatus').should('eq', 'record_up_to_date')
            cy.get('@accessContactPageBtn').click()
            cy.get('[data-test=displayedRoles]')
              .children()
              .find('gn-ui-contact-card')
              .should('have.length', 1)
          })

          it('show the roles available to add', () => {
            cy.get('[data-test=rolesToPick]')
              .children()
              .should('have.length', 18)
          })

          it('click on a role adds it to the list of displayed role', () => {
            cy.get('[data-test="rolesToPick"]').children().eq(2).click()
            cy.get('[data-test=rolesToPick]')
              .children()
              .should('have.length', 17)
            cy.get('[data-test=displayedRoles]')
              .children()
              .should('have.length', 2)
          })

          it('add a contact for resource', () => {
            cy.get('[data-test=displayedRoles]')
              .children()
              .find('gn-ui-contact-card')
              .should('have.length', 1)
            cy.editor_wrapPreviousDraft(recordUuid)

            cy.get('[data-test=displayedRoles]')
              .find('gn-ui-autocomplete')
              .type('bar')

            cy.get('mat-option')
              .should('have.text', ' Barbara Roberts (Barbie Inc.) ')
              .click()
            cy.editor_publishAndReload(recordUuid)
            cy.get('@accessContactPageBtn').click()
            cy.get('@saveStatus').should('eq', 'record_up_to_date')
            cy.get('[data-test=displayedRoles]')
              .children()
              .find('gn-ui-contact-card')
              .should('have.length', 2)
          })
        })
      })
    })
  })
})
