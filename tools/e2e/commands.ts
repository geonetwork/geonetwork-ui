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
    login(username?: string, password?: string, redirect?: boolean): void
    signOut(): void
    clearFavorites(): void

    // interaction with gn-ui-dropdown-selector
    openDropdown(): Chainable<JQuery<HTMLElement>>
    selectDropdownOption(value: string): void
    getActiveDropdownOption(): Chainable<JQuery<HTMLButtonElement>>
  }
}

Cypress.Commands.add(
  'login',
  (username = 'admin', password = 'admin', redirect = false) => {
    // first request to get the XSRF cookie
    cy.request({
      method: 'GET',
      url: '/geonetwork/srv/api/me',
      headers: {
        Accept: 'application/json',
      },
    })
    cy.getCookie('XSRF-TOKEN').then((xsrfTokenCookie) => {
      // do the login 2 times because it sometimes doesn't register (?)
      for (let i = 0; i < 2; i++) {
        cy.request({
          method: 'POST',
          url: '/geonetwork/signin',
          body: `username=${username}&password=${password}&_csrf=${xsrfTokenCookie.value}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          followRedirect: false,
        })
      }
    })
    cy.request({
      method: 'GET',
      url: '/geonetwork/srv/api/me',
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Could not log in to GeoNetwork API 😢')
      }
      cy.log('Login to GeoNetwork API successful!')
    })
    if (redirect) cy.visit('/')
    return cy.window()
  }
)

Cypress.Commands.add('signOut', () => {
  cy.visit('/geonetwork/srv/eng/catalog.search#/home')
  cy.get('a[title="User details"]').click()
  cy.get('a[title="Sign out"]').click()
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

  return cy
    .getCookie('XSRF-TOKEN')
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
    cy.get('body').click('bottomLeft') // first click on the document to close other dropdowns
    cy.wrap(dropdownElement).find('button').click()
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
