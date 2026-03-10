// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands'

beforeEach(() => {
  // Vitepress might throw errors when click events are bounced back to the document by GeoNetwork-UI
  Cypress.on(
    'uncaught:exception',
    (err) => !err.message.includes('el.matches is not a function')
  )
})
