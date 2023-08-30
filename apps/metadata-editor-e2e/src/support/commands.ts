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
    cy.visit('http://localhost:8080/geonetwork/srv/eng/catalog.search#/home')
    cy.get('.cookie-warning-actions').then(($cookie) => {
      if ($cookie.is(':visible')) {
        $cookie.find('button').eq(0).click()
        cy.scrollTo('top')
      }
    })

    cy.wait(250)
    cy.get('li.signin-dropdown').click()
    cy.get('#inputUsername').type(username)
    cy.get('#inputPassword').type(password)
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
