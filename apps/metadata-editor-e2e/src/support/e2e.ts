// ***********************************************************
// This example support/index.js is processed and
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

import installLogsCollector from 'cypress-terminal-report/src/installLogsCollector.js'
import './commands'
import { VIEWPORT_SIZE } from '../../../../tools/e2e/settings'

installLogsCollector()

before(() => {
  // this is for the first run
  window.localStorage.setItem('geonetwork-ui-language', 'en')
})

beforeEach(() => {
  cy.viewport(VIEWPORT_SIZE[0], VIEWPORT_SIZE[1])

  // all tests should show english translations
  window.localStorage.setItem('geonetwork-ui-language', 'en')
})
