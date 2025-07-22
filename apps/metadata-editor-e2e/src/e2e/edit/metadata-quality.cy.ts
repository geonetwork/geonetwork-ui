describe('metadata quality', () => {
  let recordUuid: any

  before(() => {
    cy.editor_createRecordCopy().then((uuid) => {
      recordUuid = uuid
    })
  })

  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.visit(`/edit/${recordUuid}`)
  })

  it('should toggle the metadata quality panel', () => {
    // it should toggle the metadata quality panel
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(2).click()
    cy.get('gn-ui-metadata-quality-panel').should('be.visible')
    cy.get('gn-ui-metadata-quality-panel')
      .find('.font-title')
      .should('contain.text', 'Completeness')
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(2).click()
    cy.get('gn-ui-metadata-quality-panel').should('not.exist')

    // it should switch between the metadata quality and multilingual panel
    cy.get('gn-ui-multilingual-panel').should('not.exist')
    cy.get('gn-ui-metadata-quality-panel').should('not.exist')
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(2).click()
    cy.get('gn-ui-metadata-quality-panel').should('be.visible')
    cy.get('gn-ui-multilingual-panel').should('not.exist')
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
    cy.get('gn-ui-multilingual-panel').should('be.visible')
    cy.get('gn-ui-metadata-quality-panel').should('not.exist')
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(2).click()
    cy.get('gn-ui-metadata-quality-panel').should('be.visible')
    cy.get('gn-ui-multilingual-panel').should('not.exist')
  })
})
