import { defineLocalRedirections } from '../support/local-url-redirects'

beforeEach(() => {
  defineLocalRedirections()
})

it('gn-datahub', () => {
  cy.visit('/webcomponents/gn-datahub.html')

  // store page title for later
  cy.title().should('not.be.empty')
  cy.title().as('initialPageTitle')

  // should display the search bar and header buttons
  cy.get('gn-ui-fuzzy-search').should('be.visible')
  cy.get('datahub-navigation-menu').find('button').should('have.length', 3)

  // should display news page
  cy.get('datahub-last-created').should('be.visible')
  cy.get('gn-ui-results-list gn-ui-results-list-item').should(
    'have.length.gt',
    0
  )
  cy.get('gn-ui-figure').should('have.length', 2)

  // navigate to organization & show results
  cy.get('datahub-navigation-menu').find('button').eq(2).click({ force: true })
  cy.get('gn-ui-organisations-filter').should('be.visible')
  cy.get('gn-ui-organisations')
    .find('gn-ui-organisation-preview')
    .should('have.length.above', 0)
  cy.title().then(function (pageTitle) {
    expect(pageTitle).to.equal(this.initialPageTitle)
  })
  cy.url().should('contain', '#/organisations')

  // navigate to search & show results
  cy.get('datahub-navigation-menu').find('button').eq(1).click({ force: true })
  cy.get('gn-ui-results-list').should('be.visible')
  cy.get('gn-ui-results-list gn-ui-results-list-item').should(
    'have.length.above',
    0
  )
  cy.get('gn-ui-filter-dropdown').should('be.visible')
  cy.title().then(function (pageTitle) {
    expect(pageTitle).to.equal(this.initialPageTitle)
  })
  cy.url().should('contain', '#/search')

  // navigate to a record
  cy.get('gn-ui-results-list gn-ui-results-list-item').eq(0).click()
  cy.get('datahub-record-page').should('be.visible')
  cy.get('datahub-header-record').should('be.visible')
  cy.get('datahub-header-record header .font-title')
    .invoke('text')
    .invoke('trim')
    .should('not.be.empty')
  cy.get('datahub-header-record header .font-title')
    .invoke('text')
    .invoke('trim')
    .as('recordTitle')
  cy.get('@recordTitle').should('not.be.empty')
  cy.get('datahub-header-record')
    .find('gn-ui-favorite-star')
    .should('have.length', 0) // auth related functions are disabled
  cy.title().then(function (pageTitle) {
    expect(pageTitle).to.equal(this.initialPageTitle)
  })
  cy.url().should('contain', '#/dataset/')

  // reload & stay on same page
  // cy.reload()
  cy.get('datahub-record-page').should('be.visible')
  cy.get('datahub-header-record header .font-title')
    .invoke('text')
    .invoke('trim')
    .should('not.be.empty')
  cy.get('datahub-header-record header .font-title')
    .invoke('text')
    .invoke('trim')
    .then(function (currentTitle) {
      // record title should be the same as before reload
      expect(currentTitle).to.equal(this.recordTitle)
    })
})
