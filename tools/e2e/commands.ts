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
    addUser(
      username: string,
      password: string,
      email: string,
      name: string,
      surname: string
    ): void
    clearFavorites(): void
    clearRecordDrafts(): void
    deleteRecord(uuid: string): void
    editor_createRecordCopy(): Chainable<string | number | string[]>
    editor_readFormUniqueIdentifier(): Chainable<string | number | string[]>
    editor_wrapPreviousDraft(uuid: string): void
    editor_wrapFirstDraft(uuid: string): void
    editor_publishAndReload(uuid: string): void
    editor_findDraftInLocalStorage(): Chainable<string | number | string[]>
    addTranslationKey(): void
    removeTranslationKey(): void
    editor_addLanguages(uuid: string): void

    // interaction with gn-ui-dropdown-selector
    openDropdown(): Chainable<JQuery<HTMLElement>>
    selectDropdownOption(value: string): void
    getActiveDropdownOption(): Chainable<JQuery<HTMLButtonElement>>

    clickOnBody(): void
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

Cypress.Commands.add('addUser', (username, password, email, name, surname) => {
  cy.getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      cy.request({
        url: `/geonetwork/srv/api/users`,
        method: 'PUT',
        body: JSON.stringify({
          id: '',
          username: username,
          password: password,
          name: name,
          surname: surname,
          profile: 'RegisteredUser',
          addresses: [
            { address: '', city: '', state: '', zip: '', country: '' },
          ],
          emailAddresses: [email],
          organisation: '',
          enabled: true,
          groupsRegisteredUser: [],
          groupsEditor: [],
          groupsReviewer: [],
          groupsUserAdmin: [],
        }),
        failOnStatusCode: false, // it will fail if the user is already there
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token,
        },
      }).then((response) => {
        if (!response.isOkStatusCode) {
          cy.log(`User ${username} was not created (probably already there)`)
          return
        }
        cy.log(`User ${username} created successfully!`)
      })
    })
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

Cypress.Commands.add('clickOnBody', () => {
  cy.get('body').click(0, 0)
})

Cypress.Commands.add('clearRecordDrafts', () => {
  cy.window().then((window) => {
    const items = { ...window.localStorage }
    const draftKeys = Object.keys(items).filter((key) =>
      key.startsWith('geonetwork-ui-draft-')
    )
    draftKeys.forEach((key) => window.localStorage.removeItem(key))
    cy.log(`Cleared ${draftKeys.length} draft(s).`)
  })
  cy.reload()
})

Cypress.Commands.add('deleteRecord', (uuid: string) => {
  cy.getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      cy.request({
        url: `/geonetwork/srv/api/records/${uuid}`,
        method: 'DELETE',
        failOnStatusCode: false, // it will fail if the user is already there
        headers: {
          accept: 'application/json',
          'X-XSRF-TOKEN': token,
        },
      }).then((response) => {
        if (!response.isOkStatusCode) {
          cy.log(`Record ${uuid} could not be deleted (probably already gone?)`)
          return
        }
        cy.log(`Record ${uuid} deleted successfully!`)
      })
    })
})

Cypress.Commands.add('editor_createRecordCopy', () => {
  cy.login('admin', 'admin', false)
  cy.viewport(1920, 2400)

  cy.clearRecordDrafts()

  // Clear any existing copy of the test record
  cy.visit('/catalog/search')
  cy.get('gn-ui-fuzzy-search input').type('station épuration{enter}')
  cy.get('[data-cy="table-row"]')
    .should('have.length.lt', 10) // making sure the records were updated
    .then((rows$) => {
      if (rows$.length === 1) {
        return
      }
      // there is a copy: delete it
      cy.get('[data-test="record-menu-button"]').eq(0).click()
      cy.get('[data-test="record-menu-delete-button"]').click()
      cy.get('[data-cy="confirm-button"]').click()
      cy.log('An existing copy of the test record was found and deleted.')
    })

  // Duplicate & publish the Stations d'épuration record
  cy.get('gn-ui-fuzzy-search input').type(
    '{selectAll}{del}station épuration{enter}'
  )
  cy.get('[data-cy="table-row"]')
    .first()
    .should('contain.text', "Stations d'épuration")
    .find('[data-test="record-menu-button"]')
    .click()
  cy.get('[data-test="record-menu-duplicate-button"]').click()
  cy.url().should('include', '/duplicate/')
  // because new records are saved by default, they are not drafts and can be published
  cy.get('md-editor-publish-button').click()

  // Open the copy
  cy.visit('/catalog/search')
  cy.get('gn-ui-fuzzy-search input').type('station épuration copy{enter}')
  cy.get('[data-cy="table-row"]').first().children('div').eq(2).click()
  cy.url().should('include', '/edit/')
  return cy.editor_readFormUniqueIdentifier()
})

Cypress.Commands.add('editor_readFormUniqueIdentifier', () => {
  // wait for the url to contain edit
  cy.url().should('contain', '/edit/')
  cy.url().then((url) => {
    if (url.includes('/edit/')) {
      return url.split('edit/').pop()
    }
  })
})

Cypress.Commands.add('editor_findDraftInLocalStorage', () => {
  cy.window().then((win) => {
    cy.get('body', { timeout: 10000 })
      .should(() => {
        const keys = Object.keys(win.localStorage)
        const matchingKey = keys.find((key) =>
          key.startsWith('geonetwork-ui-draft-')
        )

        expect(matchingKey).to.not.be.undefined
      })
      .then(() => {
        const keys = Object.keys(win.localStorage)
        const matchingKey = keys.find((key) =>
          key.startsWith('geonetwork-ui-draft-')
        )
        return win.localStorage.getItem(matchingKey)
      })
  })
})

// this needs a recordUuid to have been wrapped
Cypress.Commands.add('editor_wrapFirstDraft', (uuid: string) => {
  cy.window()
    .its('localStorage')
    .invoke('getItem', `geonetwork-ui-draft-${uuid}`)
    .then((previousDraft) => {
      cy.wrap(previousDraft).as('firstDraft')
    })
})

// this needs a recordUuid to have been wrapped
Cypress.Commands.add('editor_wrapPreviousDraft', (uuid: string) => {
  cy.window()
    .its('localStorage')
    .invoke('getItem', `geonetwork-ui-draft-${uuid}`)
    .then((previousDraft) => {
      cy.wrap(previousDraft).as('previousDraft')
    })
})

// this needs a recordUuid and a previousDraft to have been wrapped
Cypress.Commands.add('editor_publishAndReload', (uuid: string) => {
  // nesting thens as Cypress doesn't seem to support the "all" operator
  //https://github.com/cypress-io/cypress/issues/915
  cy.get('@previousDraft').then((previousDraft) => {
    cy.window()
      .its('localStorage')
      .invoke('getItem', `geonetwork-ui-draft-${uuid}`)
      .should('not.eq', previousDraft)
  })

  // publish the record
  cy.intercept({
    method: 'PUT',
    pathname: '**/records',
  }).as('insertRecord')
  cy.get('md-editor-publish-button').click()
  cy.wait('@insertRecord')

  // wait for the draft to be deleted on publication
  cy.window()
    .its('localStorage')
    .invoke('getItem', `geonetwork-ui-draft-${uuid}`)
    .should('be.null')

  // reload the page
  cy.visit(`/edit/${uuid}`)
})

Cypress.Commands.add('editor_addLanguages', (uuid) => {
  cy.get('[data-test="langAvailable"]').eq(3).click()
  cy.get('[data-test="langAvailable"]').eq(7).click()
  cy.editor_wrapPreviousDraft(uuid)
  cy.get('[data-test="validateSelection"').click()

  cy.editor_publishAndReload(uuid)

  cy.get('md-editor-top-toolbar').find('gn-ui-button').eq(1).click()
})

Cypress.Commands.add('addTranslationKey', () => {
  cy.getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      cy.request({
        url: `/geonetwork/srv/api/i18n/db/translations?replace=true`,
        method: 'PUT',
        body: JSON.stringify([
          {
            fieldName: 'application-banner',
            langId: 'eng',
            id: 0,
            value:
              'This is a warning message that should be shown when the key is set',
          },
        ]),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': token,
        },
      })
    })
})

Cypress.Commands.add('removeTranslationKey', () => {
  cy.getCookie('XSRF-TOKEN')
    .its('value')
    .then(function (token) {
      cy.request({
        url: `/geonetwork/srv/api/i18n/db/translations/application-banner`,
        method: 'DELETE',
        headers: { accept: 'application/json', 'X-XSRF-TOKEN': token },
      })
    })
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
