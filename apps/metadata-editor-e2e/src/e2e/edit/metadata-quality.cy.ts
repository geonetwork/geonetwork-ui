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

    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').as(
      'abstractField'
    )
  })

  it('metadata quality widget & panel', () => {
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
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(2).click()
    cy.get('gn-ui-metadata-quality-panel').should('not.exist')
    cy.get('gn-ui-multilingual-panel').should('not.exist')

    // it should display abstract property checked when present
    cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(2).click()
    cy.get('gn-ui-metadata-quality-panel').should('be.visible')
    cy.get('gn-ui-metadata-quality-panel')
      .find('[data-cy="md-quality-btn-editor.record.form.field.abstract"]')
      .as('abstractButton')
    cy.get('@abstractButton').find('span').should('contain.text', 'Abstract')
    cy.get('@abstractButton')
      .find('ng-icon')
      .should('have.attr', 'name', 'iconoirBadgeCheck')

    // it should display quality widget correctly (100%)
    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('eql', '100%')

    // it should display abstract property as missing when empty
    cy.get('@abstractField').clear()
    cy.get('@abstractButton')
      .find('ng-icon')
      .should('have.attr', 'name', 'iconoirSystemShut')

    // it should update quality widget (88%)
    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('eql', '88%')

    // it should update quality widget (100%)
    cy.get('@abstractField').type('modified abstract')
    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('eql', '100%')
  })
})
