/* eslint-disable cypress/no-unnecessary-waiting */

describe('editor form', () => {
  let recordUuid: any

  beforeEach(() => {
    cy.editor_createRecordCopy().then((uuid) => {
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
              'include',
              "Copy of record Stations d'épuration selon la directive Eaux Résiduelles Urbaines (91/271/CEE) en Wallonie"
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
  })
})
