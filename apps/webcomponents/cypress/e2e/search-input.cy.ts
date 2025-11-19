describe('gn-search-input', () => {
  beforeEach(() => {
    cy.visit('/webcomponents/gn-search-input.sample.html')
  })

  describe('general display', () => {
    it('should display the search bar, button and placeholder', () => {
      cy.get('gn-ui-fuzzy-search').should('be.visible')
      cy.get('gn-ui-autocomplete').should('have.length.gt', 0)
      cy.get('ng-icon')
        .first()
        .should('have.attr', 'name', 'iconoirSearch')
        .and('be.visible')
    })
  })

  describe('search actions', () => {
    it('should display the search with autocomplete result', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('mat-option').should('have.text', ' Accroches vélos MEL ')
    })
    it('should go to the dataset page when clicking on the autocomplete result', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('mat-option').should('have.text', ' Accroches vélos MEL ').click()
      cy.url().should('include', '/dataset/')
    })
    it('should not display the feature catalog dataset', () => {
      cy.get('gn-ui-fuzzy-search').type('catalog')
      cy.get('mat-option').should('not.have.text', 'Feature Catalog')
    })
  })

  describe('reset search actions', () => {
    it('should create a cancel icon when typing', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('ng-icon').first().should('have.attr', 'name', 'matClose')
    })
    it('should delete text input on click on cancel button', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('ng-icon')
        .first()
        .should('have.attr', 'name', 'matClose')
        .trigger('click', { waitForAnimations: false })
      cy.get('gn-ui-autocomplete').find('input').should('have.value', '')
    })
  })
})
