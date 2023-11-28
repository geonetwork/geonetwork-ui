// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/* eslint-disable cypress/no-unnecessary-waiting */
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    loginGN(username: string, password: string, redirect?: boolean): void
    signOutGN(): void
  }
}

Cypress.Commands.add(
  'loginGN',
  (username: string, password: string, redirect = true) => {
    // first request to get the XSRF cookie
    cy.request({
      method: 'GET',
      url: '/geonetwork/srv/api/me',
      headers: {
        Accept: 'application/json, text/plain, */*',
      },
    })
    cy.getCookie('XSRF-TOKEN').then((xsrfTokenCookie) => {
      cy.request({
        method: 'POST',
        url: '/geonetwork/signin',
        body: `username=${username}&password=${password}&_csrf=${xsrfTokenCookie.value}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    })
    if (redirect) cy.visit('/')
  }
)

Cypress.Commands.add('signOutGN', () => {
  cy.visit('http://localhost:8080/geonetwork/srv/eng/catalog.search#/home')
  cy.get('a[title="User details"]').click()
  cy.get('a[title="Sign out"]').click()
})
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
