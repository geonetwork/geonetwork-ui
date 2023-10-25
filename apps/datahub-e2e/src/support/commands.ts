// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(): void
    clearFavorites(): void

    // interaction with gn-ui-dropdown-selector
    openDropdown(): Chainable<JQuery<HTMLElement>>
    selectDropdownOption(value: string): void
    getActiveDropdownOption(): Chainable<JQuery<HTMLButtonElement>>
  }
}

Cypress.Commands.add('login', () => {
  // ignore error coming from GN
  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Jsonix')) return false
    if (err.message.includes('postMessage')) return false
  })

  cy.visit('/geonetwork/srv/eng/catalog.signin?debug&redirect=blargz') // this will point to a 404
  cy.get('#inputUsername').type('admin', { force: true })
  cy.get('#inputPassword').type('admin', { force: true })
  cy.get('[name="gnSigninForm"]').submit()
})

/**
 * This will most likely fail if the user is not logged in!
 */
Cypress.Commands.add('clearFavorites', () => {
  cy.request({
    url: '/geonetwork/srv/api/me',
    headers: { accept: 'application/json' },
  })
    .its('body')
    .its('id')
    .as('myId')

  cy.window().then(function () {
    cy.request({
      url: `/geonetwork/srv/api/userselections/0/${this.myId}`,
      headers: { accept: 'application/json' },
    })
      .its('body')
      .as('favoritesId')
  })

  cy.getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      const favoritesId = this.favoritesId || []
      cy.request({
        url: `/geonetwork/srv/api/userselections/0/${
          this.myId
        }?uuid=${favoritesId.join('&uuid=')}`,
        method: 'DELETE',
        headers: { accept: 'application/json', 'X-XSRF-TOKEN': token },
      })
    })
})

// previous value should be a <gn-ui-dropdown-selector> component
Cypress.Commands.add(
  'openDropdown',
  { prevSubject: true },
  (dropdownElement) => {
    cy.get('body').click() // first click on the document to close other dropdowns
    const width = dropdownElement.width()
    const height = dropdownElement.height()
    cy.wrap(dropdownElement).click(width - 10, height / 2) // click on the right size to avoid the label
    return cy.get('.cdk-overlay-container').find('[role=listbox]')
  }
)

// previous value should be a <gn-ui-dropdown-selector> component
Cypress.Commands.add(
  'selectDropdownOption',
  { prevSubject: true },
  (dropdownElement, value: string) => {
    cy.wrap(dropdownElement)
      .openDropdown()
      .find(`[data-cy-value="${value}"]`)
      .click()
  }
)

// previous value should be a <gn-ui-dropdown-selector> component
Cypress.Commands.add(
  'getActiveDropdownOption',
  { prevSubject: true },
  (dropdownElement) => {
    return cy.wrap(dropdownElement).openDropdown().find(`[data-cy-active]`)
  }
)

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
