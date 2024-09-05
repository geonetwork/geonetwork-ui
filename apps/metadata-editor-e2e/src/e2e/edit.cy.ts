/* eslint-disable cypress/no-unnecessary-waiting */

import { before } from 'node:test'

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
    it('form shows correctly', () => {
      cy.get('gn-ui-record-form').should('be.visible')
      cy.get('gn-ui-record-form gn-ui-form-field').should('have.length.gt', 0)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.screenshot({ capture: 'fullPage' })
    })

    it('keeps the draft record', () => {
      cy.get('@abstractField').clear()
      cy.get('@abstractField').type('modified abstract')
      cy.wait(1200) // waiting for draft saving to kick in
      cy.reload()
      cy.get('@abstractField').invoke('val').should('eq', 'modified abstract')
      cy.get('@saveStatus').should('eq', 'draft_changes_pending')

      cy.clearRecordDrafts()

      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('@abstractField')
        .invoke('val')
        .should('contain', 'Perimeter der Alpenkonvention in der Schweiz.')
    })
  })
  describe('record fields', () => {
    describe('header', () => {
      describe('title', () => {
        it('shows the title', () => {
          cy.get('gn-ui-form-field')
            .first()
            .find('input')
            .invoke('val')
            .should('eq', 'Alpenkonvention')
        })
        it('edits and saves the title', () => {
          cy.get('gn-ui-form-field').first().find('input').type(' modified')
          cy.wait(1200)
          cy.get('md-editor-publish-button').click()
          cy.visit('/edit/8698bf0b-fceb-4f0f-989b-111e7c4af0a4')
          cy.get('gn-ui-form-field')
            .first()
            .find('input')
            .invoke('val')
            .should('eq', 'Alpenkonvention modified')

          cy.get('gn-ui-form-field').first().find('input').clear()
          cy.get('gn-ui-form-field')
            .first()
            .find('input')
            .type('Alpenkonvention')
          cy.wait(1200)
          cy.get('md-editor-publish-button').click()
        })
      })
      describe('abstract', () => {
        it('shows the abstract', () => {
          cy.get('@abstractField')
            .invoke('val')
            .should('contain', 'Perimeter der Alpenkonvention in der Schweiz.')
        })
        it('edits and saves the abstract', () => {
          cy.get('@abstractField').clear()
          cy.get('@abstractField').type('modified abstract before saving')
          cy.wait(1200)
          cy.get('md-editor-publish-button').click()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')

          // restore abstract
          cy.get('@abstractField').clear()
          cy.get('@abstractField').then(function (field) {
            cy.wrap(field).type(this.abstractFieldInitialValue)
          })
          cy.wait(1200)
          cy.get('md-editor-publish-button').click()
        })
      })
      describe('graphic overview', () => {
        it('shows the graphic overview', () => {
          cy.get('gn-ui-image-input').should('be.visible')
        })
        it('allows to add images to the graphic overview by URL', () => {
          cy.get('gn-ui-image-input')
            .find('gn-ui-button')
            .find('button')
            .click()
          cy.get('gn-ui-url-input').should('be.visible')
        })
        it('allows to add an alternate text', () => {
          cy.visit('/edit/011963da-afc0-494c-a2cc-5cbd59e122e4')
          cy.get('gn-ui-image-input').find('gn-ui-button').eq(2).click()
          cy.get('gn-ui-image-input')
            .find('gn-ui-text-input')
            .should('be.visible')
        })
        it('allows to delete images from the graphic overview', () => {
          cy.visit('/edit/011963da-afc0-494c-a2cc-5cbd59e122e4')
          cy.get('gn-ui-image-input').find('img').should('have.length', 1)
          cy.get('gn-ui-image-input').find('gn-ui-button').eq(1).click()
          cy.get('gn-ui-image-input').find('img').should('have.length', 0)
        })
      })
    })
    describe('about', () => {
      beforeEach(() => {
        cy.get('gn-ui-record-form')
          .children('div')
          .first()
          .children('div')
          .eq(1)
          .as('aboutSection')
      })
      describe('unique identifier', () => {
        it('shows the unique identifier', () => {
          cy.get('@aboutSection')
            .find('gn-ui-form-field')
            .eq(0)
            .find('gn-ui-form-field-simple')
            .find('input')
            .invoke('val')
            .should('eq', '8698bf0b-fceb-4f0f-989b-111e7c4af0a4')
        })
      })
      describe('resource updated', () => {
        beforeEach(() => {
          cy.visit('/edit/011963da-afc0-494c-a2cc-5cbd59e122e4')
        })
        it('shows the resource update date', () => {
          cy.get('@aboutSection')
            .find('gn-ui-form-field-resource-updated')
            .find('input')
            .invoke('val')
            .should('eq', '11/1/2019')
        })
        it('edits and saves the resource update date', () => {
          cy.get('@aboutSection')
            .find('gn-ui-form-field-resource-updated')
            .find('mat-datepicker-toggle')
            .click()
          cy.get('mat-month-view')
            .find('tbody')
            .find('tr')
            .eq(3)
            .find('td')
            .first()
            .click()
          cy.wait(1200)
          cy.get('md-editor-publish-button').click()
          cy.visit('/edit/011963da-afc0-494c-a2cc-5cbd59e122e4')
          cy.get('@aboutSection')
            .find('gn-ui-form-field-resource-updated')
            .find('input')
            .invoke('val')
            .should('eq', '11/17/2019')

          // restore date
          cy.get('@aboutSection')
            .find('gn-ui-form-field-resource-updated')
            .find('mat-datepicker-toggle')
            .click()
          cy.get('mat-month-view')
            .find('tbody')
            .find('tr')
            .first()
            .find('td')
            .eq(1)
            .click()
          cy.wait(1200)
          cy.get('md-editor-publish-button').click()
        })
      })
      describe.only('update frequency', () => {
        describe('when the regularity switch is on', () => {
          it('should allow to select a frequency', () => {
            cy.get('gn-ui-form-field-update-frequency').find(
              'gn-ui-check-toggle'
            )
          })
        })
        describe('when the regularity switch is off', () => {
          it('should not allow to select a frequency', () => {
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-dropdown-selector')
              .find('button')
              .should('be.disabled')
          })
          it('should show the default frequency value', () => {})
        })
        // dont forget to restore the initial state
      })
      describe('temporal extents', () => {
        it('should show the two extents buttons', () => {})
        it('adds a time instant', () => {})
        it('adds a time period', () => {})
        describe('date picker in sortable list', () => {
          it('should keep the date picker open when selecting the start date of a range', () => {
            cy.get('gn-ui-form-field-temporal-extents gn-ui-button')
              .eq(1)
              .click()
            cy.get(
              'gn-ui-form-field-temporal-extents-range mat-datepicker-toggle'
            ).click()
            cy.get('mat-calendar').contains('1').click()
            cy.get('mat-calendar').should('be.visible')
          })
          it('should delete dates', () => {})
          it('should order dates', () => {})
          it('should save and show the right dates on reload', () => {
            // dont forget to restore the initial state
          })
        })
      })
    })
    describe('geographical coverage', () => {
      describe('spatial extents', () => {
        it('should show a map', () => {})
        it('should select and show a place keyword from the dropdown', () => {})
        it('should save and display the new value on reload', () => {
          // dont forget to restore the initial state
        })
      })
    })
    describe('classification', () => {
      describe('keywords', () => {
        it('should show the current keywords', () => {})
        it('should add a keyword', () => {})
        it('should delete a keyword', () => {})
        it('should show the right keywords on reload', () => {
          // dont forget to restore the initial state
        })
      })
    })
    describe('Access and constraints', () => {
      describe('Open data switch', () => {
        describe('When the open data switch is checked', () => {
          beforeEach(() => {
            cy.visit('/edit/accroche_velos')
            cy.get('md-editor-page-selector')
              .find('gn-ui-button')
              .last()
              .click()
          })
          it('should not display the licence form field', () => {
            cy.get('gn-ui-form-field-license').should('not.exist')
          })
          it('should display the license form field when toggled', () => {
            cy.get('[data-cy="openDataToggle"]').click()
            cy.get('gn-ui-form-field-license').should('be.visible')
            cy.get('gn-ui-form-field-license')
              .find('button')
              .children('div')
              .first()
              .invoke('text')
              .should('eq', ' Open Licence (Etalab) ')
          })
        })
        describe('When the open data switch is unchecked', () => {
          beforeEach(() => {
            cy.visit(
              '/edit/fr-120066022-jdd-f20f8125-877e-46dc-8cf8-2a8a372045eb'
            )
            cy.get('md-editor-page-selector')
              .find('gn-ui-button')
              .last()
              .click()
          })
          it('should display the licence form field', () => {
            cy.get('gn-ui-form-field-license').should('be.visible')
            cy.get('gn-ui-form-field-license')
              .find('button')
              .children('div')
              .first()
              .invoke('text')
              .should('eq', ' Creative Commons CC-BY ')
          })
          it('should hide the license form field when toggled', () => {
            cy.get('[data-cy="openDataToggle"]').click()
            cy.get('gn-ui-form-field-license').should('not.exist')
          })
        })
      })
      describe('licenses', () => {
        it('should select a new license and show it on reload', () => {})
      })
    })
    describe('attached resources', () => {
      beforeEach(() => {
        cy.get('@resourcePageSelectorButton').click()
      })
      it('adds, modifies, deletes a resource', () => {
        // original item count
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 7)
        // upload readme file
        cy.get('gn-ui-form-field-online-link-resources label').selectFile(
          'src/fixtures/readme.txt'
        )
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 8)
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        )
          .eq(7)
          .as('readmeLink')
        cy.get('@readmeLink')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'readme.txt')
        // open modify dialog
        cy.get('@readmeLink').find('button[data-test=card-modify]').click()
        cy.get('gn-ui-modal-dialog gn-ui-text-input')
          .find('input')
          .type('{selectall}{del}new title!')
        cy.get('gn-ui-modal-dialog gn-ui-text-area')
          .find('textarea')
          .type('new description')
        cy.get('gn-ui-modal-dialog [data-cy=confirm-button]').click()
        cy.get('@readmeLink')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'new title!')
        cy.get('@readmeLink').scrollIntoView()
        cy.screenshot({ capture: 'viewport' })
        // delete item
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-sortable-list [data-cy=remove-item]'
        )
          .eq(7)
          .click()
        // original item count
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 7)
      })
    })

    describe('Spatial coverage', () => {
      it('toggle between national and regional spatial coverage', () => {
        cy.get('gn-ui-form-field-spatial-extent')
          .find('gn-ui-switch-toggle')
          .should('exist')

        cy.get('gn-ui-form-field-spatial-extent')
          .find('gn-ui-switch-toggle')
          .find('mat-button-toggle')
          .eq(0)
          .click()
        cy.get('gn-ui-form-field-spatial-extent')
          .find('mat-button-toggle')
          .eq(0)
          .should('have.class', 'mat-button-toggle-checked')
        cy.get('gn-ui-form-field-spatial-extent')
          .find('mat-button-toggle')
          .eq(1)
          .should('not.have.class', 'mat-button-toggle-checked')

        cy.get('gn-ui-form-field-spatial-extent')
          .find('gn-ui-switch-toggle')
          .find('mat-button-toggle')
          .eq(1)
          .click()
        cy.get('gn-ui-form-field-spatial-extent')
          .find('mat-button-toggle')
          .eq(1)
          .should('have.class', 'mat-button-toggle-checked')
        cy.get('gn-ui-form-field-spatial-extent')
          .find('mat-button-toggle')
          .eq(0)
          .should('not.have.class', 'mat-button-toggle-checked')
      })

      it('should display place keywords', () => {
        cy.get('gn-ui-form-field-spatial-extent')
          .find('gn-ui-autocomplete')
          .should('have.length', 1)
        cy.get('gn-ui-form-field-spatial-extent')
          .find('gn-ui-autocomplete')
          .type('afr')
        cy.get('mat-option').should('have.length', 10)
        cy.get('mat-option').eq(0).click()
        cy.get('gn-ui-form-field-spatial-extent')
          .find('gn-ui-badge')
          .should('have.length', 4)
        cy.get('gn-ui-form-field-spatial-extent')
          .find('gn-ui-badge')
          .eq(0)
          .find('span')
          .should('have.text', 'Africa ')
      })
    })
  })

  describe('Keywords', () => {
    beforeEach(() => {
      cy.get('@accessAndContactPageSelectorButton').click()
    })

    it('should display keywords without place keywords', () => {
      cy.get('gn-ui-form-field-keywords')
        .find('gn-ui-badge')
        .should('have.length', 19)
      cy.get('gn-ui-form-field-keywords')
        .find('gn-ui-badge')
        .find('span')
        .each(($span) => {
          cy.wrap($span).should('not.have.text', 'Africa ')
        })
    })

    it('should add a keyword', () => {
      cy.get('gn-ui-form-field-keywords')
        .find('gn-ui-autocomplete')
        .should('have.length', 1)
      cy.get('gn-ui-form-field-keywords').find('gn-ui-autocomplete').click()
      cy.get('mat-option').should('have.length', 10)
      cy.get('mat-option').eq(0).click()
      cy.get('gn-ui-form-field-keywords')
        .find('gn-ui-badge')
        .should('have.length', 20)
      cy.get('gn-ui-form-field-keywords')
        .find('gn-ui-badge')
        .eq(19)
        .find('span')
        .should('have.text', 'Addresses ')
    })

    it('should remove a keyword', () => {
      cy.get('gn-ui-form-field-keywords')
        .find('gn-ui-badge')
        .should('have.length', 19)
      cy.get('gn-ui-form-field-keywords')
        .find('gn-ui-badge')
        .eq(0)
        .find('button')
        .click()
      cy.get('gn-ui-form-field-keywords')
        .find('gn-ui-badge')
        .should('have.length', 18)
    })

    describe('data managers', () => {
      describe('contacts for resources', () => {
        beforeEach(() => {
          cy.login('admin', 'admin', false)
          cy.visit('/edit/accroche_velos')
          cy.get('@accessContactPageBtn').click()
        })

        it('show the contacts for resource of the dataset', () => {
          cy.get('[data-test=displayedRoles]')
            .children()
            .should('have.length', 1)
        })

        it('show the 5 roles available to add', () => {
          cy.get('[data-test=rolesToPick]').children().should('have.length', 5)
        })

        it('click on a role adds it to the list of displayed role', () => {
          cy.get('[data-test="rolesToPick"]').children().eq(2).click()
          cy.get('[data-test=rolesToPick]').children().should('have.length', 4)
          cy.get('[data-test=displayedRoles]')
            .children()
            .should('have.length', 2)
        })

        it('add a contact for resource', () => {
          cy.get('[data-test=displayedRoles]')
            .children()
            .find('gn-ui-contact-card')
            .should('have.length', 1)

          cy.get('[data-test=displayedRoles]')
            .find('gn-ui-autocomplete')
            .type('bar')

          cy.get('mat-option')
            .should('have.text', ' Barbara Roberts (Barbie Inc.) ')
            .click()

          cy.get('[data-test=displayedRoles]')
            .children()
            .find('gn-ui-contact-card')
            .should('have.length', 2)
        })

        it('delete a contact for resource', () => {
          cy.get('[data-test=displayedRoles]')
            .children()
            .find('gn-ui-contact-card')
            .should('have.length', 1)

          cy.get('[data-test=displayedRoles]')
            .children()
            .get('[data-test=removeContactButton]')
            .click()

          cy.get('[data-test=displayedRoles]')
            .children()
            .find('gn-ui-contact-card')
            .should('not.exist')
        })
      })
    })

    describe('date range in sortable list', () => {
      it('should keep the date picker open when selecting the start date of a range', () => {
        // add a date range
        cy.get('gn-ui-form-field-temporal-extents gn-ui-button').eq(1).click()
        // open the date picker
        cy.get(
          'gn-ui-form-field-temporal-extents [data-cy=date-picker-button] button'
        ).click()
        // select a date
        cy.get('mat-calendar').contains('1').click()
        // the date picker should still be open
        cy.get('mat-calendar').should('be.visible')
      })
    })
  })
})
