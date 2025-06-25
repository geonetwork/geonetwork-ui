const fakeUser = {
  username: 'e2e_specific_user',
  password: 'Abcde12!',
  email: 'jitewaboh@lagify.com',
  name: 'Homer',
  surname: 'Simpson',
}

before(() => {
  cy.login('admin', 'admin', false)
  cy.addUser(
    fakeUser.username,
    fakeUser.password,
    fakeUser.email,
    fakeUser.name,
    fakeUser.surname
  )
})

describe('dashboard (landing page)', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)
    cy.clearRecordDrafts()
    cy.visit('/')
  })

  it('home page', () => {
    // it redirects to search
    cy.url().should('include', '/catalog/search')

    // it should display default avatar (monsterid)
    cy.get('gn-ui-avatar')
      .children('img')
      .should('have.attr', 'src')
      .should('eq', 'https://www.gravatar.com/avatar/?d=monsterid')

    // it should display the correct amount of records
    cy.get('gn-ui-results-table')
      .find('[data-cy="table-row"]')
      .should('have.length', '15')

    // MULTILINGUAL

    // it should show a multilingual icon when the record is multilingual
    cy.get('gn-ui-results-table')
      .find('[data-cy-title="Leitungskataster Fernwärme AEW Energie AG"]')
      .find('[data-cy="multilingual-indicator"]')
      .should('exist')

    // it should NOT show a multilingual icon when the record is NOT multilingual
    cy.get('gn-ui-results-table')
      .find(
        '[data-cy-title="Zones de collecte de déchets en porte à porte - par flux de collecte, jour et horaire de tournée"]'
      )
      .find('[data-cy="multilingual-indicator"]')
      .should('not.exist')

    // PAGINATION

    // it should display different results on click on arrow
    cy.get('gn-ui-results-table')
      .find('.table-row-cell')
      .eq(1)
      .invoke('text')
      .invoke('trim')
      .as('pageOneFirstRecord')

    // go to page 2 (url)
    cy.visit('/catalog/search?_page=2')
    cy.get('gn-ui-results-table')
      .find('.table-row-cell')
      .eq(1)
      .invoke('text')
      .invoke('trim')
      .then(function (text) {
        expect(text).not.to.equal(this.pageOneFirstRecord)
      })

    // go back to page 1 (click)
    cy.get('gn-ui-pagination-buttons').find('gn-ui-button').first().click()
    cy.get('gn-ui-results-table')
      .find('.table-row-cell')
      .eq(1)
      .invoke('text')
      .invoke('trim')
      .then(function (text) {
        expect(text).to.equal(this.pageOneFirstRecord)
      })
    // FIXME: this test should pass but it doesn't!
    // cy.url().should('include', '_page=1')

    // CHECKBOXES

    // it should show the correct amount of selected records when they are selected
    cy.get('gn-ui-results-table')
      .find('.table-row-cell')
      .get('gn-ui-checkbox')
      .each((checkbox, i) => {
        if (i < 3) {
          cy.wrap(checkbox).click()
        }
      })
    cy.get('[data-test=selected-count]').contains('3 selected')

    // clear selection
    cy.get('gn-ui-results-table')
      .find('.table-row-cell')
      .get('gn-ui-checkbox')
      .each((checkbox, i) => {
        if (i < 3) {
          cy.wrap(checkbox).click()
        }
      })

    // it should show nothing when none are selected
    cy.get('[data-cy=records-information]').should(
      'not.have.descendants',
      '[data-test=selected-count]'
    )

    // SORTING

    // it should order the result list on click
    cy.get('gn-ui-results-table')
      .find('.table-row-cell')
      .eq(1)
      .invoke('text')
      .invoke('trim')
      .as('originalFirstItem')

    // order by title descending
    cy.get('.table-header-cell').eq(1).click()
    cy.url().should('include', 'sort=resourceTitleObject.default.keyword')
    cy.get('.table-header-cell').eq(1).click()
    cy.url().should('include', 'sort=-resourceTitleObject.default.keyword')

    // this is wrapped in a then call because we want to have access to `this.originalFirstItem`
    cy.get('gn-ui-results-table').then(function (table) {
      cy.wrap(table)
        .find('.table-row-cell')
        .eq(1)
        .invoke('text')
        .invoke('trim')
        .should('not.equal', this.originalFirstItem)
    })
  })

  it('Account settings access', () => {
    // it should navigate to the account settings page
    cy.get('md-editor-sidebar')
      .find('[data-cy=account-link]')
      .invoke('removeAttr', 'target')
      .click()
    cy.url().should('include', '/admin.console')
  })

  it('author and publishing status', () => {
    // create a draft record
    cy.get('[data-cy="create-record"]').click()
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').focus()
    cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea').type(
      'draft abstract'
    )
    cy.editor_readFormUniqueIdentifier().as('newRecordUuid')
    cy.go('back')

    // it should display the right info for unpublished records
    cy.get('gn-ui-results-table').find('[data-cy="table-row"]').as('records')
    cy.get('@records')
      .children('div')
      .eq(4)
      .find('span')
      .invoke('text')
      .should('eq', 'admin admin')
    cy.get('@records')
      .children('div')
      .eq(5)
      .should('include.text', 'Not published')
    cy.get('@records').children('div').eq(6).should('contain', ' - ')

    // delete the new record to not leak to other tests
    cy.get<string>('@newRecordUuid').then((uuid) => cy.deleteRecord(uuid))

    // it should display the right info for published records
    cy.get('md-editor-dashboard-menu').find('a').eq(1).click()
    cy.get('gn-ui-results-table')
      .find('[data-cy="table-row"]')
      .eq(1)
      .as('record')
    cy.get('@record')
      .children('div')
      .eq(4)
      .find('span')
      .invoke('text')
      .should('eq', 'admin admin')
    cy.get('@record')
      .children('div')
      .eq(5)
      .find('span')
      .should('include.text', 'Published')
    cy.get('@record').children('div').eq(6).should('not.contain', ' - ')
  })

  it('my records', () => {
    // navigate
    cy.get('md-editor-dashboard-menu').find('a').eq(1).click()

    // it should only display records I own
    cy.get('gn-ui-results-table')
      .find('[data-cy="table-row"]')
      .find('ng-icon')
      .next()
      .should('contain', 'admin admin')

    // it should display the correct amount of records
    cy.get('md-editor-dashboard-menu').find('a').eq(1).click()
    cy.get('gn-ui-results-table')
      .find('[data-cy="table-row"]')
      .should('have.length', '15')

    // it should sort the records by title
    cy.get('md-editor-dashboard-menu').find('a').eq(1).click()
    cy.get('gn-ui-results-table')
      .find('[data-cy="table-row"]')
      .first()
      .invoke('text')
      .then((firstRecord) => {
        cy.get('gn-ui-results-table').find('.table-header-cell').eq(1).click()
        cy.get('gn-ui-results-table')
          .find('[data-cy="table-row"]')
          .first()
          .invoke('text')
          .should('not.eq', firstRecord)
      })
  })

  it('search', () => {
    function checkDashboardFiltered() {
      cy.get('gn-ui-autocomplete').type('{selectall}{del}velo{enter}')
      cy.get('gn-ui-interactive-table')
        .find('[data-cy="table-row"]')
        .should('have.length', '1')
    }
    function checkAutocompleteSelected() {
      cy.get('gn-ui-autocomplete').type('{selectall}{del}velo')
      cy.get('mat-option').first().click()
      cy.url().should('include', '/edit/accroche_velos')
      cy.go('back')
      cy.url().should('not.include', '/edit/accroche_velos')
    }

    // allRecords search input
    // it should filter the dashboard based on the search input
    checkDashboardFiltered()

    // it should navigate to the record selected in the autocomplete
    checkAutocompleteSelected()

    // it should clear the search input when navigating to my records
    cy.get('gn-ui-autocomplete').type('velo')
    cy.get('md-editor-dashboard-menu').find('a').eq(2).click()
    cy.get('gn-ui-autocomplete').should('have.value', '')

    // myRecords search input
    cy.visit('/my-space/my-records')

    // it should filter the dashboard based on the search input
    checkDashboardFiltered()

    // it should navigate to the record selected in the autocomplete
    checkAutocompleteSelected()

    // it should clear the search input when navigating to all records
    cy.get('gn-ui-autocomplete').type('velo')
    cy.get('md-editor-dashboard-menu').find('a').first().click()
    cy.get('gn-ui-autocomplete').should('have.value', '')

    // it should allow to search in the entire catalog
    cy.get('gn-ui-autocomplete').type('mat{enter}')
    cy.get('gn-ui-interactive-table')
      .find('[data-cy="table-row"]')
      .should('have.length', '1')
    cy.url().should('include', '/search?q=mat')
    cy.url().should('not.include', 'owner')

    // it should not show the feature catalog
    cy.get('gn-ui-autocomplete').type('catalog')
    cy.get('mat-option').should('not.have.text', 'Feature Catalog')
  })

  describe('search filters', () => {
    function selectUser(index = 0, openDropdown = true) {
      if (openDropdown) {
        cy.get('md-editor-search-filters').find('gn-ui-button').first().click()
      }
      cy.get('.cdk-overlay-container')
        .find('input[type="checkbox"]')
        .eq(index)
        .check()
    }
    function deselectUsers(openDropdown = true) {
      if (openDropdown) {
        cy.get('md-editor-search-filters').find('gn-ui-button').first().click()
      }
      cy.get('.cdk-overlay-container')
        .find('input[type="checkbox"]')
        .each(($checkbox) => cy.wrap($checkbox).uncheck())
    }
    function selectDateRange() {
      cy.get('mat-calendar-header').find('button').first().click()
      cy.get('mat-multi-year-view').contains('button', '2024').click()
      cy.get('mat-year-view').contains('button', 'AUG').click()
      cy.get('mat-month-view').contains('button', '1').click()
      cy.get('mat-month-view').contains('button', '30').click()
    }
    function checkFilterByChangeDate() {
      cy.get('gn-ui-interactive-table')
        .find('[data-cy="table-row"]')
        .should('have.length', '1')
      cy.get('gn-ui-results-table')
        .find('[data-cy="resultItemTitle"]')
        .each(($resultItemTitle) => {
          cy.wrap($resultItemTitle)
            .invoke('text')
            .should('eq', 'Accroches vélos MEL')
        })
    }
    it('allRecords search filter', () => {
      // it should contain filter component with two search filters
      cy.get('md-editor-search-filters')
        .find('gn-ui-button')
        .should('have.length', 2)

      // it should filter the record list by user (Barbara Roberts)
      selectUser(1)
      cy.get('gn-ui-interactive-table')
        .find('[data-cy="table-row"]')
        .should('have.length', '5')
      cy.get('gn-ui-results-table')
        .find('[data-cy="ownerInfo"]')
        .each(($ownerInfo) => {
          cy.wrap($ownerInfo).invoke('text').should('eq', 'Barbara Roberts')
        })

      // it should filter the record list by last update (changeDate)
      deselectUsers(false)
      cy.clickOnBody()
      cy.get('md-editor-search-filters').find('gn-ui-button').eq(1).click()
      selectDateRange()
      checkFilterByChangeDate()

      // it should display the expand icon for the date range dropdown correctly
      cy.get('md-editor-search-filters')
        .find('gn-ui-date-range-dropdown')
        .find('ng-icon')
        .should('have.attr', 'ng-reflect-name', 'matExpandMore')
      cy.get('md-editor-search-filters').find('gn-ui-button').eq(1).click()
      cy.get('md-editor-search-filters')
        .find('gn-ui-date-range-dropdown')
        .find('ng-icon')
        .should('have.attr', 'ng-reflect-name', 'matExpandLess')
    })
    it('myRecords search filters', () => {
      cy.visit('/my-space/my-records')

      // it should contain filter component with one search filter
      cy.get('md-editor-search-filters')
        .find('gn-ui-button')
        .should('have.length', 1)

      // it should filter the record list by last update (changeDate)
      cy.get('md-editor-search-filters').find('gn-ui-button').first().click()
      selectDateRange()
      checkFilterByChangeDate()
    })
    it('allRecord search filters summary', () => {
      // it should not display anything without selected filters
      cy.get('gn-ui-search-filters-summary-item').should('not.exist')

      // SELECTING USERS
      selectUser(1)

      // it should display a label for badges of selected users
      cy.get('gn-ui-search-filters-summary')
        .find('[data-cy="filterSummaryLabel"]')
        .invoke('text')
        .should('eq', 'Editor: ')

      // it should display the badge for a selected user
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .should('have.length', 1)
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .invoke('text')
        .should('eq', 'Barbara Roberts')

      // it should display a second badge for a second selected user
      selectUser(0, false)
      cy.clickOnBody()
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .should('have.length', 2)
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .eq(1)
        .invoke('text')
        .should('eq', 'admin admin')

      // it should remove one of two badges when a badge cross is clicked
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .eq(0)
        .find('ng-icon')
        .click()
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .should('have.length', 1)

      // SELECTING DATE RANGE
      deselectUsers()
      cy.clickOnBody()
      cy.get('md-editor-search-filters').find('gn-ui-button').eq(1).click()
      selectDateRange()

      // it should display a label for the date range
      cy.get('gn-ui-search-filters-summary')
        .find('[data-cy="filterSummaryLabel"]')
        .invoke('text')
        .should('eq', 'Updated: ')

      // it should display the badge for the selected date range
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .invoke('text')
        .should('eq', '01.08.2024 - 30.08.2024')

      // it should remove the badge when the badge cross is clicked
      cy.clickOnBody()
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .find('ng-icon')
        .click()
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .should('not.exist')

      // SELECTING MULTIPLE FILTERS (users and date range)', () => {
      selectUser(0)
      cy.clickOnBody()
      cy.get('md-editor-search-filters').find('gn-ui-button').eq(1).click()
      selectDateRange()

      // it should display both badges
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .should('have.length', 2)

      // it should clear all filters when the clear button is clicked
      cy.get('gn-ui-search-filters-summary').find('button').last().click()
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .should('have.length', 0)
      cy.get('gn-ui-search-filters-summary-item').should('not.exist')
    })
    it('myRecords search filters summary', () => {
      cy.visit('/my-space/my-records')

      // it should not display anything without selected filters
      cy.get('gn-ui-search-filters-summary-item').should('not.exist')

      // SELECTING DATE RANGE

      cy.get('md-editor-search-filters').find('gn-ui-button').eq(0).click()
      selectDateRange()

      // it should display a label for the date range
      cy.get('gn-ui-search-filters-summary')
        .find('[data-cy="filterSummaryLabel"]')
        .invoke('text')
        .should('eq', 'Updated: ')

      // it should display the badge for the selected date range
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .invoke('text')
        .should('eq', '01.08.2024 - 30.08.2024')

      // it should remove the badge when the badge cross is clicked
      cy.clickOnBody()
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .find('ng-icon')
        .click()
      cy.get('gn-ui-search-filters-summary')
        .find('gn-ui-badge')
        .should('not.exist')
    })
  })
})

describe('editing restrictions as non admin', () => {
  beforeEach(() => {
    cy.login('barbie', 'p4ssworD_', false)
    cy.visit('/')
  })

  it('editing access restrictions', () => {
    // it should not have edit rights on other organization records
    cy.get('gn-ui-results-table')
      .find('[data-cy="table-row"]')
      .first()
      .as('record')
    cy.get('@record')
      .children('div')
      .eq(4)
      .find('span')
      .invoke('text')
      .should('eq', 'admin admin')
    cy.get('@record').should(
      'have.attr',
      'title',
      'You are not an editor of the allowed groups'
    )
    cy.get('@record').children('div').eq(2).click()
    cy.url().should('include', '/catalog/')
    cy.get('@record').find('[data-test="record-menu-button"]').click()
    cy.get('[data-test="record-menu-delete-button"]')
      .find('button')
      .should('be.disabled')
    cy.get('body').click()

    // it should have edit rights on their organization records
    cy.get('gn-ui-results-table')
      .find('[data-cy="table-row"]')
      .eq(4)
      .as('record')
    cy.get('@record')
      .children('div')
      .eq(4)
      .find('span')
      .invoke('text')
      .should('eq', 'Barbara Roberts')
    cy.get('@record').children('div').eq(2).click()
    cy.url().should('include', '/edit/')

    // it should not allow the user to directly access other organization records and let them go back to the catalog
    cy.visit('/edit/accroche_velos')
    cy.get('md-editor-page-error').should('be.visible')
    cy.get('md-editor-page-error').find('a').click()
    cy.url().should('include', '/catalog/search')
  })
})

describe('Logging in and out', () => {
  it('when the user is not logged in', () => {
    // it redirects to the login page
    cy.visit('/')
    cy.url().should('include', '/catalog.signin?redirect=')
  })

  it('logging out', () => {
    cy.login('admin', 'admin', false)
    cy.visit('/catalog/search')

    // wait for results
    cy.get('gn-ui-results-table')
      .find('[data-cy=table-row]')
      .should('have.length.above', 1)

    // it logs out the user
    cy.get('gn-ui-avatar').should('be.visible')
    cy.get('md-editor-sidebar').find('[data-cy=logout-button]').click()
    cy.url().should('include', '/catalog.signin?redirect=')
    cy.get('gn-ui-avatar').should('not.exist')
  })
})
