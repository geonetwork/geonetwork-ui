/* eslint-disable cypress/no-unnecessary-waiting */

describe('editor form', () => {
  let recordUuid: any
  before(() => {
    cy.login('admin', 'admin', false)
    cy.viewport(1920, 2400)

    cy.clearRecordDrafts()

    // Clear any existing copy of the test record
    cy.visit('/catalog/search')
    cy.get('gn-ui-fuzzy-search input').type('station épuration{enter}')
    cy.get('[data-cy="table-row"]')
      .should('have.length.lt', 10) // making sure the records were updated
      .then((rows$) => {
        if (rows$.length === 1) {
          return
        }
        // there is a copy: delete it
        cy.get('[data-test="record-menu-button"]').eq(0).click()
        cy.get('[data-test="record-menu-delete-button"]').click()
        cy.get('[data-cy="confirm-button"]').click()
        cy.log('An existing copy of the test record was found and deleted.')
      })

    // Duplicate & publish the Stations d'épuration record
    cy.get('gn-ui-fuzzy-search input').type(
      '{selectAll}{del}station épuration{enter}'
    )
    cy.get('[data-cy="table-row"]')
      .first()
      .should('contain.text', "Stations d'épuration")
      .find('[data-test="record-menu-button"]')
      .click()
    cy.get('[data-test="record-menu-duplicate-button"]').click()
    cy.url().should('include', '/duplicate/')
    cy.editor_findDraftInLocalStorage().then((value) => {
      expect(value).to.not.equal(null)
    })
    cy.get('md-editor-publish-button').click()

    // Open the copy
    cy.visit('/catalog/search')
    cy.get('gn-ui-fuzzy-search input').type('station épuration copy{enter}')
    cy.get('[data-cy="table-row"]').first().children('div').eq(2).click()
    cy.url().should('include', '/edit/')
    cy.editor_readFormUniqueIdentifier().then((uuid) => {
      recordUuid = uuid
    })
  })
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')
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

  describe('form display', () => {
    it('opens the first page by default', () => {
      cy.get('@accessContactPageBtn').click()
      cy.visit('/catalog/search')
      cy.get('@recordUuid').then((recordUuid) => {
        cy.visit(`/edit/${recordUuid}`)
      })
      cy.get('@abstractField').should('be.visible')
    })
    it('form shows correctly', () => {
      cy.get('gn-ui-record-form').should('be.visible')
      cy.get('gn-ui-record-form gn-ui-form-field').should('have.length.gt', 0)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.screenshot({ capture: 'fullPage' })
    })

    it('keeps the draft record', () => {
      cy.get('@abstractField').clear()
      cy.get('@abstractField').type('modified abstract')
      cy.get('@recordUuid').then((recordUuid) => {
        cy.window()
          .its('localStorage')
          .invoke('getItem', `geonetwork-ui-draft-${recordUuid}`)
          .should('contain', 'modified abstract')
      })

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
            .find('textarea')
            .invoke('val')
            .should(
              'eq',
              "Stations d'épuration selon la directive Eaux Résiduelles Urbaines (91/271/CEE) en Wallonie (Copy)"
            )
        })
        it('shows very long titles entirely', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field').first().find('textarea').focus()
          cy.focused().clear()
          cy.get('gn-ui-form-field').first().find('textarea').focus()
          cy.focused().type(
            'Metadata for E2E testing purpose. (this title is very long and should take several lines, so we can test the behavior of the title field when it is very long. just keep going until it hits 4 lines, now it should be long enough)'
          )
          cy.get('gn-ui-form-field').first().invoke('height').should('eq', 156)
        })
        it('edits and saves the title', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field').first().find('textarea').focus()
          cy.focused().clear()
          cy.get('gn-ui-form-field').first().find('textarea').focus()
          cy.focused().type('Test record modified')
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field')
            .first()
            .find('textarea')
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
          cy.editor_wrapPreviousDraft()
          cy.get('@abstractField').clear()
          cy.get('@abstractField').type('modified abstract')
          cy.editor_publishAndReload()
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
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-image-input').find('gn-ui-button').eq(1).click()
          cy.editor_publishAndReload()
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
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-overviews label').selectFile(
            'src/fixtures/sample.png'
          )
          cy.editor_publishAndReload()
          cy.intercept({
            method: 'GET',
            url: '**/attachments/sample.png',
          }).as('importUrlRequest')
          cy.get('@importUrlRequest')
            .its('response.statusCode')
            .should('eq', 200)
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
      describe('resource identifier', () => {
        it('shows the resource identifier', () => {
          cy.get('@aboutSection')
            .find('gn-ui-form-field-simple')
            .first()
            .find('input')
            .invoke('val')
            .should('eq', 'UWWTD_WASTE_WATER_TREATMENT')
        })
        it('edits and saves the resource identifiert', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-simple').first().find('input').clear()
          cy.get('gn-ui-form-field-simple')
            .first()
            .find('input')
            .type('Test - resource identifier')
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-simple')
            .first()
            .find('input')
            .invoke('val')
            .should('eq', 'Test - resource identifier')
        })
      })
      describe('resource created', () => {
        beforeEach(() => {
          cy.get('@aboutSection')
            .find('gn-ui-form-field-date')
            .eq(0)
            .as('resourceCreatedField')
        })
        it('shows the resource creation date', () => {
          cy.get('@resourceCreatedField')
            .find('input')
            .invoke('val')
            .should('eq', '1/1/2005')
        })
        it('edits and saves the resource creation date', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('@resourceCreatedField')
            .find('input')
            .type('{selectall}{del}01/01/2019{enter}')
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@resourceCreatedField')
            .find('input')
            .invoke('val')
            .should('eq', '1/1/2019')
        })
      })
      describe('resource updated', () => {
        beforeEach(() => {
          cy.get('@aboutSection')
            .find('gn-ui-form-field-date')
            .eq(1)
            .as('resourceUpdatedField')
        })
        it('shows the resource update date', () => {
          cy.get('@resourceUpdatedField')
            .find('input')
            .invoke('val')
            .should('eq', '11/1/2019')
        })
        it('edits and saves the resource update date', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('@resourceUpdatedField')
            .find('input')
            .type('{selectall}{del}01/01/2019{enter}')
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('@resourceUpdatedField')
            .find('input')
            .invoke('val')
            .should('eq', '1/1/2019')
        })
      })
      describe('update frequency', () => {
        describe('when the regularity switch is on', () => {
          it('should allow to select a frequency', () => {
            cy.editor_wrapPreviousDraft()
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-check-toggle label')
              .click()
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-dropdown-selector')
              .openDropdown()
              .children('button')
              .eq(3)
              .click()
            cy.editor_publishAndReload()
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
            cy.editor_wrapPreviousDraft()
            cy.get('gn-ui-form-field-update-frequency')
              .find('gn-ui-check-toggle label')
              .click()
            cy.editor_publishAndReload()
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
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-button')
            .first()
            .click()
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-date-picker')
            .should('be.visible')
        })
        it('adds a time period', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-button')
            .eq(1)
            .click()
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-temporal-extents')
            .find('gn-ui-date-range-picker')
            .should('be.visible')
        })
        it('should delete dates', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-temporal-extents')
            .find('[data-test="remove-item"]')
            .first()
            .click()
          cy.get('gn-ui-form-field-temporal-extents')
            .find('[data-test="remove-item"]')
            .first()
            .click()
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-temporal-extents')
            .find('[data-test="remove-item"]')
            .should('have.length', 0)
        })
        describe('date picker in sortable list', () => {
          it('should keep the date picker open when selecting the start date of a range', () => {
            cy.get('gn-ui-form-field-temporal-extents gn-ui-button')
              .eq(1)
              .click()
            cy.get('gn-ui-form-field-temporal-extents')
              .find('[data-cy=date-picker-button]')
              .click()
            cy.get('mat-calendar').contains('1').click()
            cy.get('mat-calendar').should('be.visible')
          })
        })
      })
    })
    describe('classification', () => {
      describe('keywords', () => {
        it('should show the current keywords', () => {
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .should('have.length', 41)
        })
        it('should add a keyword', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-autocomplete')
            .type('a')
          cy.get('mat-option').first().click()
          cy.editor_publishAndReload()
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
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .last()
            .find('gn-ui-button')
            .click()
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-keywords')
            .find('gn-ui-badge')
            .should('have.length', 41)
        })
      })
    })
    describe('geographical coverage', () => {
      it('should show a map', () => {
        cy.get('gn-ui-form-field-spatial-extent')
          .find('gn-ui-map-container')
          .should('be.visible')
      })
      describe('spatial extents', () => {
        it('should display place keywords', () => {
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-autocomplete')
            .should('have.length', 1)
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-badge')
            .should('have.length', 1)
        })
        it('should allow to delete and add a place keywords', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-badge')
            .find('gn-ui-button')
            .click()
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-badge')
            .should('have.length', 0)
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-autocomplete')
            .type('a')
          cy.get('mat-option').eq(1).click()
          cy.editor_publishAndReload()
          cy.get('@saveStatus').should('eq', 'record_up_to_date')
          cy.get('gn-ui-form-field-spatial-extent')
            .find('gn-ui-badge')
            .should('have.length', 1)
        })
      })
    })
    describe('distribution resources', () => {
      beforeEach(() => {
        cy.get('@resourcePageBtn').click()
      })
      it('adds a resource', () => {
        // item count before adding
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-online-resource-card'
        ).should('have.length', 0)
        cy.editor_wrapPreviousDraft()
        // add a service distribution
        cy.get('[data-cy="online-resources-type"] button').eq(1).click()
        cy.get('gn-ui-online-service-resource-input mat-radio-button')
          .contains('WMS')
          .click()
        cy.get('gn-ui-online-service-resource-input')
          .find('[data-cy="identifier-in-service"]')
          .type('A layer name as identifier in service')
        cy.get('gn-ui-form-field-online-resources')
          .find('gn-ui-url-input')
          .find('input')
          .type('http://example.com/wms')
        cy.get('gn-ui-form-field-online-resources')
          .find('gn-ui-url-input')
          .find('button')
          .click()
        cy.editor_publishAndReload()
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('@resourcePageBtn').click()
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
      })
      it('modifies a resource', () => {
        cy.get('gn-ui-form-field-online-resources gn-ui-online-resource-card')
          .eq(0)
          .as('wmsService')
        cy.get('@wmsService')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'A layer name as identifier in service')
        cy.editor_wrapPreviousDraft()
        // open modify dialog
        cy.get('@wmsService').find('button[data-test=card-modify]').click()
        cy.get(
          'gn-ui-modal-dialog [data-cy="identifier-in-service"] input'
        ).clear()
        cy.get(
          'gn-ui-modal-dialog [data-cy="identifier-in-service"] input'
        ).type('{selectAll}{backspace}new identifier')
        cy.get('gn-ui-modal-dialog [data-cy=confirm-button]').click()
        cy.editor_publishAndReload()
        cy.get('@resourcePageBtn').click()
        cy.get('@wmsService')
          .find('[data-test=card-title]')
          .invoke('text')
          .invoke('trim')
          .should('eql', 'new identifier')
        cy.get('@wmsService').scrollIntoView()
        cy.screenshot({ capture: 'viewport' })
      })
      it('deletes a resource', () => {
        // item count before deleting
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
        cy.editor_wrapPreviousDraft()
        // delete the first item
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-sortable-list [data-test=remove-item]'
        )
          .eq(0)
          .click()
        cy.editor_publishAndReload()
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('@resourcePageBtn').click()
        cy.get(
          'gn-ui-form-field-online-resources gn-ui-online-resource-card'
        ).should('have.length', 0)
      })
    })
    describe('attached resources', () => {
      beforeEach(() => {
        cy.get('@resourcePageBtn').click()
      })
      it('adds a resource', () => {
        // item count before adding
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
        cy.editor_wrapPreviousDraft()
        // upload readme file
        cy.get('gn-ui-form-field-online-link-resources label').selectFile(
          'src/fixtures/readme.txt'
        )
        cy.editor_publishAndReload()
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
        cy.editor_wrapPreviousDraft()
        // open modify dialog
        cy.get('@readmeLink').find('button[data-test=card-modify]').click()
        cy.get('gn-ui-modal-dialog gn-ui-text-input')
          .find('input')
          .type('{selectall}{del}new title!')
        cy.get('gn-ui-modal-dialog gn-ui-text-area')
          .find('textarea')
          .type('new description')
        cy.get('gn-ui-modal-dialog [data-cy=confirm-button]').click()
        cy.editor_publishAndReload()
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
        // item count before deleting
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 2)
        cy.editor_wrapPreviousDraft()
        // delete the second item
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-sortable-list [data-test=remove-item]'
        )
          .eq(1)
          .click()
        cy.editor_publishAndReload()
        cy.get('@saveStatus').should('eq', 'record_up_to_date')
        cy.get('@resourcePageBtn').click()
        cy.get(
          'gn-ui-form-field-online-link-resources gn-ui-online-resource-card'
        ).should('have.length', 1)
      })
    })
    describe('Access and constraints', () => {
      beforeEach(() => {
        cy.get('@accessContactPageBtn').click()
      })
      // TEMPORARY - to be removed when the open data switch is back
      // describe('Open data switch', () => {
      //   beforeEach(() => {
      //     cy.get('@accessContactPageBtn').click()
      //   })
      //   describe('When the open data switch is unchecked', () => {
      //     it('should display the licence form field', () => {
      //       cy.get('gn-ui-form-field-license').should('be.visible')
      //       cy.get('gn-ui-form-field-license')
      //         .find('button')
      //         .children('div')
      //         .first()
      //         .invoke('text')
      //         .should('eq', ' Creative Commons CC-BY ')
      //     })
      //   })
      //   describe('When the open data switch is checked', () => {
      //     it('should not display the licence form field', () => {
      //       cy.get('[data-cy="openDataToggle"]').click()
      //       cy.get('gn-ui-form-field-license').should('not.exist')
      //     })
      //   })
      // })
      describe('licenses', () => {
        it('should select a new license and show it on reload', () => {
          cy.get('gn-ui-form-field-license')
            .find('button')
            .children('div')
            .first()
            .invoke('text')
            .should('eq', ' Creative Commons CC-BY ')
          cy.editor_wrapPreviousDraft()
          cy.get('gn-ui-form-field-license')
            .find('gn-ui-dropdown-selector')
            .openDropdown()
            .children('button')
            .eq(2)
            .click()
          cy.editor_publishAndReload()
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
          cy.editor_wrapPreviousDraft()
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
          cy.editor_publishAndReload()
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
            .should('eq', 'http://www.example.com/abcd/1234')
        })

        it('should enable "no applicable constraints" and stay enabled', () => {
          cy.editor_wrapPreviousDraft()
          cy.get('[data-cy=constraints-shortcut-toggles]')
            .find('gn-ui-check-toggle label')
            .eq(0)
            .click()

          cy.editor_publishAndReload()
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
            cy.editor_wrapPreviousDraft()

            // delete 2 out of 3 contacts
            cy.get('[data-test=displayedRoles] [data-test=remove-item]')
              .first()
              .click()
            cy.get('[data-test=displayedRoles] [data-test=remove-item]')
              .first()
              .click()

            cy.editor_publishAndReload()
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
              .should('have.length', 4)
          })

          it('click on a role adds it to the list of displayed role', () => {
            cy.get('[data-test="rolesToPick"]').children().eq(2).click()
            cy.get('[data-test=rolesToPick]')
              .children()
              .should('have.length', 3)
            cy.get('[data-test=displayedRoles]')
              .children()
              .should('have.length', 2)
          })

          it('add a contact for resource', () => {
            cy.get('[data-test=displayedRoles]')
              .children()
              .find('gn-ui-contact-card')
              .should('have.length', 1)
            cy.editor_wrapPreviousDraft()

            cy.get('[data-test=displayedRoles]')
              .find('gn-ui-autocomplete')
              .type('bar')

            cy.get('mat-option')
              .should('have.text', ' Barbara Roberts (Barbie Inc.) ')
              .click()
            cy.editor_publishAndReload()
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
