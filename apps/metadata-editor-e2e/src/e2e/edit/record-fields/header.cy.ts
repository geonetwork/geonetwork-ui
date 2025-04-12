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

  describe('header', () => {
    it('title', () => {
      // it shows the title
      cy.get('gn-ui-form-field')
        .first()
        .find('textarea')
        .invoke('val')
        .should(
          'include',
          "Copy of record Stations d'épuration selon la directive Eaux Résiduelles Urbaines (91/271/CEE) en Wallonie"
        )

      // it shows very long titles entirely
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field').first().find('textarea').focus()
      cy.focused().clear()
      cy.get('gn-ui-form-field').first().find('textarea').focus()
      cy.focused().type(
        'Metadata for E2E testing purpose. (this title is very long and should take several lines, so we can test the behavior of the title field when it is very long. just keep going until it hits 4 lines, now it should be long enough)'
      )
      cy.get('gn-ui-form-field').first().invoke('height').should('eq', 156)

      // it edits and saves the title
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field').first().find('textarea').focus()
      cy.focused().clear()
      cy.get('gn-ui-form-field').first().find('textarea').focus()
      cy.focused().type('Test record modified')
      cy.clickOnBody() // make sure the blur event is called
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-form-field')
        .first()
        .find('textarea')
        .invoke('val')
        .should('eq', 'Test record modified')
    })

    it('abstract', () => {
      // it shows the abstract
      cy.get('@abstractField')
        .invoke('val')
        .should('contain', 'Cette couche de points reprend les informations')

      // it edits and saves the abstract
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('@abstractField').clear()
      cy.get('@abstractField').type('modified abstract')
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('@abstractField').invoke('val').should('eq', 'modified abstract')
    })

    it('graphic overview', () => {
      // it shows the graphic overview
      cy.get('gn-ui-image-input').should('be.visible')

      // it allows to delete images from the graphic overview
      cy.get('gn-ui-image-input').find('img').should('have.length', 1)
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-image-input').find('gn-ui-button').eq(1).click()
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-image-input').find('img').should('have.length', 0)

      // it allows to add overviews by URL
      cy.get('gn-ui-image-input').find('gn-ui-button').find('button').click()
      cy.get('gn-ui-url-input').should('be.visible')

      // it adds overviews
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-form-field-overviews label').selectFile(
        'src/fixtures/sample.png'
      )
      cy.editor_publishAndReload(recordUuid)
      cy.intercept({
        method: 'GET',
        url: '**/attachments/sample.png',
      }).as('importUrlRequest')
      cy.get('@importUrlRequest').its('response.statusCode').should('eq', 200)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-image-input').find('img').should('have.length', 1)

      // it allows to add an alternative text
      cy.get('gn-ui-image-input').find('gn-ui-button').eq(2).click()
      cy.get('gn-ui-image-input').find('gn-ui-text-input').should('be.visible')

      // it shows and modifies alternative text for an image
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('gn-ui-text-input input').type(
        '{selectall}{backspace}This is an alternative text for the test image'
      )
      cy.editor_publishAndReload(recordUuid)
      cy.get('@saveStatus').should('eq', 'record_up_to_date')
      cy.get('gn-ui-image-input').find('gn-ui-button').eq(2).click()
      cy.get('gn-ui-text-input input')
        .invoke('val')
        .should('eq', 'This is an alternative text for the test image')
    })

    it('image field', () => {
      cy.get('[data-cy="delete-image"]').click()

      // it allows switching between URL input and file upload
      // First add by URL
      cy.get('gn-ui-image-input').find('gn-ui-button').find('button').click()
      cy.get('gn-ui-url-input').should('be.visible')
      cy.get('gn-ui-url-input input').type('http://example.com/image.jpg')

      // Then try to upload a file - URL input should disappear
      cy.get('gn-ui-form-field-overviews label').selectFile(
        'src/fixtures/sample.png'
      )
      cy.get('gn-ui-url-input').should('not.exist')

      // Try URL input again - should clear previous file
      cy.get('gn-ui-image-input').find('[data-cy="delete-image"]').click()
      cy.get('gn-ui-url-input').should('be.visible')

      // it handles drag and drop file upload
      // First add by URL
      cy.get('gn-ui-url-input input').type('http://example.com/image.jpg')

      // Then drag and drop a file
      cy.get('gn-ui-form-field-overviews label').selectFile(
        'src/fixtures/sample.png',
        { action: 'drag-drop' }
      )

      // URL input should be hidden
      cy.get('gn-ui-url-input').should('not.exist')

      cy.get('[data-cy="delete-image"]').click()

      // it shows icon and error messages when uploading non image file
      // Drag and drop non file image
      cy.get('input[type="file"]').selectFile(
        {
          contents: Cypress.Buffer.from('test file content'),
          fileName: 'test.txt',
          mimeType: 'text/plain',
        },
        { action: 'drag-drop', force: true }
      )

      // Error display should show
      cy.get('[data-cy="imgErrorIcon"]').should('be.visible')
      cy.get('[data-cy="imgInputMsgPrimary"]').should(
        'contain',
        'The image could not be uploaded'
      )

      // it shows icon and error messages when invalid image url
      // Emulate error with an invalid image url
      cy.get('[data-cy="imgUrlBtn"]').find('button').click()
      cy.get('[data-cy="imgUrlInput"]')
        .find('input')
        .type('https://overview.img/42x42.png')
      cy.get('[data-cy="imgUrlInput"]').find('button').click()

      // Error display should show
      cy.get('[data-cy="imgErrorIcon"]').should('be.visible')
      cy.get('[data-cy="imgInputMsgPrimary"]').should(
        'contain',
        'The image could not be uploaded'
      )
    })
  })
})
