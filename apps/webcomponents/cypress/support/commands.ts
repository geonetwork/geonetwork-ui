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
    // interaction with gn-ui-dropdown-selector
    openDropdown(): Chainable<JQuery<HTMLElement>>
    selectDropdownOption(value: string): void
  }
}

// previous value should be a <gn-ui-dropdown-selector> component
Cypress.Commands.add(
  'openDropdown',
  { prevSubject: true },
  (dropdownElement) => {
    cy.get('body').click('bottomLeft') // first click on the document to close other dropdowns
    cy.wrap(dropdownElement).find('button').click()
    return cy.get('.gn-ui-overlay-container').find('[role=listbox]')
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
