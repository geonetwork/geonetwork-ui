import { defineLocalRedirections } from '../support/local-url-redirects'

beforeEach(() => {
  defineLocalRedirections()
})

it('gn-search-input', () => {
  cy.visit('/webcomponents/gn-search-input.html')

  // should display the search bar, button and placeholder
  cy.get('gn-ui-fuzzy-search').should('be.visible')
  cy.get('gn-ui-autocomplete').should('have.length.gt', 0)
  cy.get('ng-icon')
    .first()
    .should('have.attr', 'name', 'iconoirSearch')
    .and('be.visible')

  // should display the search with autocomplete result
  cy.get('gn-ui-fuzzy-search').type('velo')
  cy.get('mat-option').should('have.text', ' Accroches vélos MEL ')

  // should go to the dataset page when clicking on the autocomplete result
  cy.get('mat-option').should('have.text', ' Accroches vélos MEL ').click()
  cy.url().should('include', '/dataset/')
  cy.go('back')

  // should not display the feature catalog dataset
  cy.get('gn-ui-fuzzy-search').type('catalog')
  cy.get('mat-option').should('not.have.text', 'Feature Catalog')

  // should create a cancel icon when typing
  cy.get('ng-icon').first().should('have.attr', 'name', 'matClose')

  // should delete text input on click on cancel button
  cy.get('ng-icon[name=matClose]').click()
  cy.get('gn-ui-autocomplete').find('input').should('have.value', '')
})
