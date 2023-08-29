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
  }
}

Cypress.Commands.add('login', () => {
  // ignore error coming from GN
  Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Jsonix')) return false
    if (err.message.includes('postMessage')) return false
  })

  cy.visit('/geonetwork/srv/eng/catalog.signin?debug')
  cy.get('#inputUsername').type('admin', { force: true })
  cy.get('#inputPassword').type('admin', { force: true })
  cy.get('[name="gnSigninForm"]').submit()
})

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
