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
    // login(email: string, password: string): void
    loginGN(username: string, password: string, redirect?: boolean): void
    signOutGN(): void
  }
}
//
// -- This is a parent command --
/*Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password)
})*/

Cypress.Commands.add(
  'loginGN',
  (username: string, password: string, redirect = true) => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Jsonix')) return false
      if (err.message.includes('postMessage')) return false
    })

    cy.visit('/geonetwork/srv/eng/catalog.signin?debug') // this will point to a 404
    cy.get('#inputUsername').type(username, { force: true })
    cy.get('#inputPassword').type(password, { force: true })
    cy.get('[name="gnSigninForm"]').submit()
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
