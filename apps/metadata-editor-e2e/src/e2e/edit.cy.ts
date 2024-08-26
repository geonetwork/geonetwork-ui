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
      .as('resourceDescriptionPageSelectorButton')
    cy.get('[data-test=pageSelectorButtons]')
      .find('gn-ui-button')
      .eq(1)
      .as('resourcePageSelectorButton')
    cy.get('[data-test=pageSelectorButtons]')
      .find('gn-ui-button')
      .eq(2)
      .as('accessAndContactPageSelectorButton')
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

  describe('record fields', () => {
    describe('contacts for resources', () => {
      beforeEach(() => {
        cy.login('admin', 'admin', false)

        cy.visit('/edit/accroche_velos')

        cy.get('@accessAndContactPageSelectorButton').click()
      })

      it('show the contacts for resource of the dataset', () => {
        cy.get('[data-test=displayedRoles]').children().should('have.length', 1)
      })

      it('show the 5 roles available to add', () => {
        cy.get('[data-test=rolesToPick]').children().should('have.length', 5)
      })

      it('click on a role adds it to the list of displayed role', () => {
        cy.get('[data-test="rolesToPick"]').children().eq(2).click()

        cy.get('[data-test=rolesToPick]').children().should('have.length', 4)

        cy.get('[data-test=displayedRoles]').children().should('have.length', 2)
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
    })
  })

  describe('date range in sortable list', () => {
    it('should keep the date picker open when selecting the start date of a range', () => {
      // add a date range
      cy.get('gn-ui-form-field-temporal-extents gn-ui-button').eq(1).click()
      // open the date picker
      cy.get(
        'gn-ui-form-field-temporal-extents-range mat-datepicker-toggle'
      ).click()
      // select a date
      cy.get('mat-calendar').contains('1').click()
      // the date picker should still be open
      cy.get('mat-calendar').should('be.visible')
    })
  })
})
