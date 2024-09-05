// eslint-disable-next-line @nx/enforce-module-boundaries
import { simpleDatasetRecordAsXmlFixture } from '@geonetwork-ui/common/fixtures'

describe('import', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')
  })

  describe('import a record', () => {
    beforeEach(() => {
      // Open the import overlay
      cy.get('[data-test="import-record"]').click()
    })

    it('should show the import menu overlay', () => {
      cy.get('gn-ui-import-record').should('be.visible')
      cy.get('[data-test="importMenuMainSection"]').should('be.visible')
    })

    describe('import by URL section', () => {
      beforeEach(() => {
        cy.get('[data-test="importFromUrlButton"]').click()
      })

      it('should show the import by URL section', () => {
        cy.get('[data-test="importMenuImportExternalFileSection"]').should(
          'be.visible'
        )
      })

      it('should show the import by URL section', () => {
        cy.get('[data-test="importMenuImportExternalFileSection"]').should(
          'be.visible'
        )
      })

      it('should import a record', () => {
        cy.get('[data-test="importMenuImportExternalFileSection"]')
          .find('gn-ui-url-input')
          .type('http://www.marvelous-record/xml/download')

        cy.intercept(
          {
            method: 'GET',
            url: /\/xml\/download$/,
          },
          {
            statusCode: 200,
            body: simpleDatasetRecordAsXmlFixture(),
          }
        ).as('importUrlRequest')

        cy.get('gn-ui-url-input').find('gn-ui-button').find('button').click()

        // Check that the record is correctly displayed
        cy.get('gn-ui-record-form').should('be.visible')

        cy.get('gn-ui-record-form')
          .find('gn-ui-form-field')
          .eq(0)
          .find('input')
          .invoke('val')
          .should('contain', 'Copy')
      })

      it('should be able to navigate back to the main section', () => {
        cy.get(
          '[data-test="importMenuImportExternalFileSectionBackButton"]'
        ).click()

        cy.get('[data-test="importMenuMainSection"]').should('be.visible')
        cy.get('[data-test="importMenuImportExternalFileSection"]').should(
          'not.exist'
        )
      })
    })
  })
})
