describe('feature catalog', () => {
  describe('ISO19115-3 dataset', () => {
    let recordUuid: string

    beforeEach(() => {
      cy.editor_createRecordCopy('accroche_velos', 'Accroches vélos MEL').then(
        (uuid) => {
          recordUuid = uuid
        }
      )
    })

    beforeEach(() => {
      cy.login('admin', 'admin', false)
      cy.visit(`/edit/${recordUuid}`)
      cy.get('[data-test=pageSelectorButtons] gn-ui-button').eq(1).click()
    })

    it('edits, deletes and creates the feature catalog table', () => {
      // shows the first feature type
      cy.get('[data-test=feature-catalog-name] input').should(
        'have.value',
        'Accroches vélos MEL'
      )
      cy.get('[data-test=feature-catalog-description] textarea').should(
        'have.value',
        ''
      )

      // edits and saves the name and description
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('[data-test=feature-catalog-name] input').clear()
      cy.get('[data-test=feature-catalog-name] input').type('Bike racks')
      cy.get('[data-test=feature-catalog-description] textarea').type(
        'Bike racks of the MEL'
      )
      cy.editor_publishAndReload(recordUuid)
      cy.get('[data-test=pageSelectorButtons] gn-ui-button').eq(1).click()
      cy.get('[data-test=feature-catalog-name] input').should(
        'have.value',
        'Bike racks'
      )
      cy.get('[data-test=feature-catalog-description] textarea').should(
        'have.value',
        'Bike racks of the MEL'
      )

      // deletes the feature catalog after confirmation
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('[data-test=feature-catalog-delete]').click()
      cy.get('[data-cy=confirm-button]').click()
      cy.get('[data-test=feature-catalog-table]').should('not.exist')
      cy.editor_publishAndReload(recordUuid)
      cy.get('[data-test=pageSelectorButtons] gn-ui-button').eq(1).click()
      cy.get('[data-test=feature-catalog-table]').should('not.exist')

      // creates a new table
      cy.editor_wrapPreviousDraft(recordUuid)
      cy.get('[data-test=feature-catalog-create]').click()
      cy.get('[data-test=feature-catalog-name] input').should('have.value', '')
      cy.get('[data-test=feature-catalog-name] input').type('New table')
      cy.editor_publishAndReload(recordUuid)
      cy.get('[data-test=pageSelectorButtons] gn-ui-button').eq(1).click()
      cy.get('[data-test=feature-catalog-name] input').should(
        'have.value',
        'New table'
      )

      cy.deleteRecord(recordUuid)
    })
  })

  describe('ISO19139 dataset', () => {
    beforeEach(() => {
      cy.login('admin', 'admin', false)
      cy.visit('/edit/ee965118-2416-4d48-b07e-bbc696f002c2')
      cy.get('[data-test=pageSelectorButtons] gn-ui-button').eq(1).click()
    })

    it('does not show the feature catalog section', () => {
      cy.get('gn-ui-form-field-online-resources').should('exist')
      cy.get('gn-ui-form-field-feature-catalog').should('not.exist')
    })
  })
})
