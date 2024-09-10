/* eslint-disable cypress/no-unnecessary-waiting */

describe('editor form', () => {
  let recordUuid
  before(() => {
    cy.login('admin', 'admin', false)

    cy.clearRecordDrafts()
    // Duplicate a record to manipulate it at will
    cy.visit('/catalog/search')
    cy.get('.table-header-cell').eq(1).click()
    cy.get('.table-header-cell').eq(1).click()
    cy.get('[data-cy="table-row"]')
      .first()
      .find('[data-test="record-menu-button"]')
      .click()
    cy.get('[data-test="record-menu-duplicate-button"]').click()
    cy.wait(1200)
    cy.get('md-editor-publish-button').click()

    cy.visit('/catalog/search')
    cy.get('.table-header-cell').eq(1).click()
    cy.get('.table-header-cell').eq(1).click()
    cy.get('[data-cy="table-row"]').first().children('div').eq(2).click()

    cy.get('gn-ui-record-form')
      .children('div')
      .first()
      .children('div')
      .eq(1)
      .find('gn-ui-form-field')
      .eq(0)
      .find('gn-ui-form-field-simple')
      .find('input')
      .invoke('val')
      .then((uuid) => {
        recordUuid = uuid
      })
  })
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.wrap(recordUuid).as('recordUuid')

    cy.get('@recordUuid').then((recordUuid) => {
      cy.visit(`/edit/${recordUuid}`)
    })
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

  after(() => {
    cy.visit('/catalog/search')
    cy.get('.table-header-cell').eq(1).click()
    cy.get('.table-header-cell').eq(1).click()
    cy.get('[data-test="record-menu-button"]').first().click()
    cy.get('[data-test="record-menu-delete-button"]').click()
    cy.get('[data-cy="confirm-button"]').click()
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
        .should('contain', 'Cette couche de points reprend les informations')
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
            .should(
              'eq',
              "Stations d'épuration selon la directive Eaux Résiduelles Urbaines (91/271/CEE) en Wallonie (Copy)"
            )
        })
        it('edits and saves the title', () => {
          cy.get('gn-ui-form-field').first().find('input').clear()
          cy.get('gn-ui-form-field')
            .first()
            .find('input')
            .type('Test record modified')
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field')
            .first()
            .find('input')
            .invoke('val')
            .should('eq', 'Test record modified')
        })
      })
      describe('abstract', () => {
        it('shows the abstract', () => {
          cy.get('@abstractField')
            .invoke('val')
            .should(
              'contain',
              'Cette couche de points reprend les informations'
            )
        })
        it('edits and saves the abstract', () => {
          cy.get('@abstractField').clear()
          cy.get('@abstractField').type('modified abstract')
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@abstractField')
            .invoke('val')
            .should('eq', 'modified abstract')
        })
      })
      describe('graphic overview', () => {
        it('shows the graphic overview', () => {
          cy.get('gn-ui-image-input').should('be.visible')
        })
        it('allows to delete images from the graphic overview', () => {
          cy.get('gn-ui-image-input').find('img').should('have.length', 1)
          cy.get('gn-ui-image-input').find('gn-ui-button').eq(1).click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-image-input').find('img').should('have.length', 0)
        })
        it('allows to add overviews by URL', () => {
          cy.get('gn-ui-image-input')
            .find('gn-ui-button')
            .find('button')
            .click()
          cy.get('gn-ui-url-input').should('be.visible')
        })
        it('adds overviews', () => {
          cy.get('gn-ui-form-field-overviews label').selectFile(
            'src/fixtures/sample.png'
          )
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-image-input').find('img').should('have.length', 1)
        })
        it('allows to add an alternate text', () => {
          cy.get('gn-ui-image-input').find('gn-ui-button').eq(2).click()
          cy.get('gn-ui-image-input')
            .find('gn-ui-text-input')
            .should('be.visible')
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
            .then((val) => {
              cy.get('@recordUuid').should('eq', val)
            })
        })
      })
      describe('resource updated', () => {
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
          cy.get('body').click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@aboutSection')
            .find('gn-ui-form-field-resource-updated')
            .find('input')
            .invoke('val')
            .should('eq', '11/17/2019')
        })
      })
      describe('update frequency', () => {
        describe('when the regularity switch is on', () => {
          it('should allow to select a frequency', () => {
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-check-toggle')
              .click()
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-dropdown-selector')
              .openDropdown()
              .children('button')
              .eq(3)
              .click()
            cy.publishAndReload()
            cy.get('@saveStatus').should('eq', 'record_up_to_date')
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-dropdown-selector')
              .getActiveDropdownOption()
              .find('span')
              .invoke('text')
              .should('eq', ' 2 times per week ')
          })
        })
        describe('when the regularity switch is off', () => {
          it('should show default frequency', () => {
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-check-toggle')
              .click()
            cy.publishAndReload()
            cy.get('@saveStatus').should('eq', 'record_up_to_date')
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-dropdown-selector')
              .find('button')
              .find('div')
              .invoke('text')
              .should('eq', ' Once per day ')
          })
        })
      })
      describe('temporal extents', () => {
        it('should show the two extents buttons', () => {
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-button')
            .should('have.length', 2)
        })
        it('adds a time instant', () => {
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-button')
            .first()
            .click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-date-picker')
            .should('be.visible')
        })
        it('adds a time period', () => {
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-button')
            .eq(1)
            .click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-date-range-picker')
            .should('be.visible')
        })
        it('should delete dates', () => {
          cy.get('gn-ui-form-field-temporal-extents')
            .find('[data-cy="remove-item"]')
            .first()
            .click()
          cy.get('gn-ui-form-field-temporal-extents')
            .find('[data-cy="remove-item"]')
            .first()
            .click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-temporal-extents')
            .find('[data-cy="remove-item"]')
            .should('have.length', 0)
        })
        describe('date picker in sortable list', () => {
          it('should keep the date picker open when selecting the start date of a range', () => {
            cy.get('gn-ui-form-field-temporal-extents gn-ui-button')
              .eq(1)
              .click()
            cy.get('gn-ui-form-field-temporal-extents')
              .find('mat-datepicker-toggle')
              .click()
            cy.get('mat-calendar').contains('1').click()
            cy.get('mat-calendar').should('be.visible')
          })
        })
      })
    })
    describe('geographical coverage', () => {
      describe('spatial extents', () => {
        it('should show a map', () => {
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-map')
            .should('be.visible')
        })
        it('should allow to delete place keywords', () => {
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-badge')
            .find('gn-ui-button')
            .click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-badge')
            .should('have.length', 0)
        })
        it('should select and show a place keyword from the dropdown', () => {
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-autocomplete')
            .click()
          cy.get('mat-option').eq(1).click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-badge')
            .should('have.length', 1)
        })
      })
      describe('Spatial coverage', () => {
        it('toggle between national and regional spatial coverage', () => {
          cy.get('gn-ui-switch-toggle').should('exist')

          cy.get('gn-ui-switch-toggle').find('mat-button-toggle').eq(0).click()
          cy.get('mat-button-toggle')
            .eq(0)
            .should('have.class', 'mat-button-toggle-checked')
          cy.get('mat-button-toggle')
            .eq(1)
            .should('not.have.class', 'mat-button-toggle-checked')

          cy.get('gn-ui-switch-toggle').find('mat-button-toggle').eq(1).click()
          cy.get('mat-button-toggle')
            .eq(1)
            .should('have.class', 'mat-button-toggle-checked')
          cy.get('mat-button-toggle')
            .eq(0)
            .should('not.have.class', 'mat-button-toggle-checked')
        })
      })
    })
    describe('attached resources', () => {
      beforeEach(() => {
        cy.get('@resourcePageBtn').click()
      })
      it('adds a resource', () => {
        // original item count
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
        // upload readme file
        cy.get('gn-ui-form-field-online-link-resources label').selectFile(
          'src/fixtures/readme.txt'
        )
        cy.publishAndReload()
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
        // open modify dialog
        cy.get('@readmeLink').find('button[data-test=card-modify]').click()
        cy.get('gn-ui-modal-dialog gn-ui-text-input')
          .find('input')
          .type('{selectall}{del}new title!')
        cy.get('gn-ui-modal-dialog gn-ui-text-area')
          .find('textarea')
          .type('new description')
        cy.get('gn-ui-modal-dialog [data-cy=confirm-button]').click()
        cy.publishAndReload()
        cy.get('@resourcePageBtn').click()
        cy.get('@readmeLink')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'new title!')
        cy.get('@readmeLink').scrollIntoView()
        cy.screenshot({ capture: 'viewport' })
      })
      it('deletes a resource', () => {
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-sortable-list [data-cy=remove-item]'
        )
          .eq(1)
          .click()
        // original item count
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
        cy.publishAndReload()
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('@resourcePageBtn').click()
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
      })
    })
    describe('classification', () => {
      beforeEach(() => {
        cy.get('@accessContactPageBtn').click()
      })
      describe('keywords', () => {
        it('should show the current keywords', () => {
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .should('have.length', 42)
        })
        it('should add a keyword', () => {
          cy.get('gn-ui-form-field-keywords').find('gn-ui-autocomplete').click()
          cy.get('mat-option').first().click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@accessContactPageBtn').click()
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .should('have.length', 43)
        })
        it('should delete a keyword', () => {
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .last()
            .find('gn-ui-button')
            .click()
          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@accessContactPageBtn').click()
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .should('have.length', 42)
        })
      })
    })
    describe('Access and constraints', () => {
      describe('Open data switch', () => {
        beforeEach(() => {
          cy.get('@accessContactPageBtn').click()
        })
        describe('When the open data switch is unchecked', () => {
          it('should display the licence form field', () => {
            cy.get('gn-ui-form-field-license').should('be.visible')
            cy.get('gn-ui-form-field-license')
              .find('button')
              .children('div')
              .first()
              .invoke('text')
              .should('eq', ' Creative Commons CC-BY ')
          })
        })
        describe('When the open data switch is checked', () => {
          it('should not display the licence form field', () => {
            cy.get('[data-cy="openDataToggle"]').click()
            cy.get('gn-ui-form-field-license').should('not.exist')
          })
        })
      })
      describe('licenses', () => {
        beforeEach(() => {
          cy.get('@accessContactPageBtn').click()
        })
        it('should select a new license and show it on reload', () => {
          cy.get('gn-ui-form-field-license')
            .find('button')
            .children('div')
            .first()
            .invoke('text')
            .should('eq', ' Creative Commons CC-BY ')
          cy.get('gn-ui-form-field-license')
            .find('gn-ui-dropdown-selector')
            .openDropdown()
            .children('button')
            .eq(2)
            .click()
          cy.publishAndReload()
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

          cy.get('[data-test=removeContactButton]').first().click()
          cy.get('[data-test=removeContactButton]').first().click()
          cy.get('[data-test=removeContactButton]').first().click()

          cy.publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@accessContactPageBtn').click()
          cy.get('[data-test=displayedRoles]')
            .children()
            .find('gn-ui-contact-card')
            .should('have.length', 1)
        })

        it('show the roles available to add', () => {
          cy.get('[data-test=rolesToPick]').children().should('have.length', 4)
        })

        it('click on a role adds it to the list of displayed role', () => {
          cy.get('[data-test="rolesToPick"]').children().eq(2).click()
          cy.get('[data-test=rolesToPick]').children().should('have.length', 3)
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
          cy.publishAndReload()
          cy.get('@accessContactPageBtn').click()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('[data-test=displayedRoles]')
            .children()
            .find('gn-ui-contact-card')
            .should('have.length', 2)
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
