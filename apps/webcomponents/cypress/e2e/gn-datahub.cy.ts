import { defineLocalRedirections } from '../support/local-url-redirects'

beforeEach(() => {
  defineLocalRedirections()
})

it('gn-datahub', () => {
  // the browser language is forced so that the test does not depend on it
  cy.visit('/webcomponents/gn-datahub.html', {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, 'languages', { value: ['en-US'] })
    },
  })

  // store page title for later
  cy.title().should('not.be.empty')
  cy.title().as('initialPageTitle')

  // should display the search bar and header buttons
  cy.get('gn-ui-fuzzy-search', { timeout: 6000 }) // we use a higher timeout because the web component takes a while to boot in dev mode
    .should('be.visible')
  cy.get('datahub-navigation-menu').find('button').should('have.length', 3)

  // should use the language given in the attribute
  cy.get('gn-datahub').invoke('attr', 'text-language', 'fr')
  cy.get('datahub-navigation-menu')
    .find('button')
    .eq(1)
    .should('contain', 'Catalogue')

  // should fall back to the browser language when the attribute is removed
  cy.get('gn-datahub').invoke('removeAttr', 'text-language')
  cy.get('datahub-navigation-menu')
    .find('button')
    .eq(1)
    .invoke('text')
    .invoke('trim')
    .should('equal', 'Catalog')

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
  cy.get('gn-ui-kind-badge').eq(1).click()
  cy.get('gn-ui-results-list gn-ui-results-list-item')
    .first()
    .find('a[href]')
    .invoke('attr', 'href')
    .should('contain', '#/dataset/')
  cy.get('gn-ui-filter-dropdown').should('be.visible')
  cy.title().then(function (pageTitle) {
    expect(pageTitle).to.equal(this.initialPageTitle)
  })
  cy.url().should('contain', '#/search')

  // navigate to a record
  cy.get('gn-ui-kind-badge').eq(1).click()
  cy.get('[data-cy="7eb795c2-d612-4b5e-b15e-d985b0f4e697"]').click()
  cy.get('datahub-record-page').should('be.visible')
  cy.get('datahub-record-header').should('be.visible')
  cy.get('datahub-record-header header .font-title')
    .invoke('text')
    .invoke('trim')
    .should('not.be.empty')
  cy.get('datahub-record-header header .font-title')
    .invoke('text')
    .invoke('trim')
    .as('recordTitle')
  cy.get('@recordTitle').should('not.be.empty')
  cy.get('datahub-record-header')
    .find('gn-ui-favorite-star')
    .should('have.length', 0) // auth related functions are disabled
  cy.title().then(function (pageTitle) {
    expect(pageTitle).to.equal(this.initialPageTitle)
  })
  cy.url().should('match', /#\/(dataset|service|reuse)\//)

  // check internal record links
  cy.get('datahub-record-internal-links gn-ui-internal-link-card')
    .first()
    .find('a[href]')
    .invoke('attr', 'href')
    .should('match', /#\/(dataset|service|reuse)\//)

  // reload & stay on same page
  // cy.reload()
  cy.get('datahub-record-page').should('be.visible')
  cy.get('datahub-record-header header .font-title')
    .invoke('text')
    .invoke('trim')
    .should('not.be.empty')
  cy.get('datahub-record-header header .font-title')
    .invoke('text')
    .invoke('trim')
    .then(function (currentTitle) {
      // record title should be the same as before reload
      expect(currentTitle).to.equal(this.recordTitle)
    })
})

it('gn-datahub keyword filter', () => {
  cy.intercept('GET', '**/datahub-webcomponent-config.toml', {
    fixture: 'config-with-keyword-filter.toml',
  })
  cy.visit('/webcomponents/gn-datahub.html')
  cy.get('datahub-navigation-menu', { timeout: 6000 })
    .find('button')
    .eq(1)
    .click({ force: true })

  // should list the keywords in the filter
  cy.get('gn-ui-dropdown-multiselect[data-cy-field="keyword"]').click()
  cy.get('[role=listbox] input[type=checkbox]').should('have.length.gt', 0)
})
