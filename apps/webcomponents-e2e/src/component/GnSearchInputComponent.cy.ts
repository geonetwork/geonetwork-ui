import { GnSearchInputComponent } from '../../../webcomponents/src/app/components/gn-search-input/gn-search-input.component'

describe('BaseInplaceTextArea', () => {
  beforeEach(() => {
    cy.viewport(370, 1024)
  })

  describe('non renseigné', () => {
    beforeEach(() => {
      cy.mount(GnSearchInputComponent, {})
    })

    it('devrait afficher un placeholder', () => {
      cy.get('[data-test="inplace-text-area-display-placeholder"]').should(
        'contain',
        'Saisir un intitulé'
      )
    })
  })
})
