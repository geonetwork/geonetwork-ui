const fakeUser = {
  username: 'user',
  password: 'Abcde12!',
  email: 'jitewaboh@lagify.com',
  name: 'Homer',
  surname: 'Simpson',
}

const gnBaseUrl = 'http://localhost:8080/geonetwork/srv/eng/'

describe('dashboard (authenticated)', () => {
  beforeEach(() => {
    cy.login('admin', 'admin', false)
  })

  let pageOne
  describe('avatar', () => {
    describe('display avatar for user without gravatar hash', () => {
      it('should display placeholder url', () => {
        cy.visit(`${gnBaseUrl}admin.console#/organization`)
        cy.get('#gn-btn-user-add').click()
        cy.get('#username').type(fakeUser.username)
        cy.get('#gn-user-password').type(fakeUser.password)
        cy.get('#gn-user-password2').type(fakeUser.password)
        cy.get('[name="name"]').type(fakeUser.name)
        cy.get('[name="surname"]').type(fakeUser.surname)
        cy.get('[name="email"]').type(fakeUser.email)
        cy.get('.fa-save').click()

        cy.visit(`${gnBaseUrl}admin.console#/settings`)
        cy.get('[id="system/users/identicon"]').type('{selectAll}{del}')
        cy.get('#gn-btn-settings-save').click()

        cy.visit('/')
        cy.get('gn-ui-avatar')
          .children('img')
          .should('have.attr', 'src')
          .should('eq', 'https://www.gravatar.com/avatar/?d=mp')
      })
      it('should display monsterid', () => {
        cy.visit(`${gnBaseUrl}admin.console#/settings`)
        cy.get('[id="system/users/identicon"]').type(
          '{selectAll}gravatar:monsterid'
        )
        cy.get('#gn-btn-settings-save').click()

        cy.visit('/')
        cy.get('gn-ui-avatar')
          .children('img')
          .should('have.attr', 'src')
          .should('eq', 'https://www.gravatar.com/avatar/?d=monsterid')
      })
    })
    describe('display avatar for user with hash', () => {
      it('should display the correct profile picture', () => {
        cy.login(fakeUser.username, fakeUser.password, true)
        cy.get('gn-ui-avatar')
          .children('img')
          .should('have.attr', 'src')
          .should(
            'eq',
            'https://www.gravatar.com/avatar/09abd59eb5653a7183ba812b8261f48b?d=monsterid'
          )
      })
    })
  })
  describe('pagination', () => {
    it('should display different results on click on arrow', () => {
      cy.visit('/catalog/search')
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .first()
        .invoke('text')
        .then((text) => {
          pageOne = text
        })
    })
    //TODO remove skip when dump contains more than 15 records
    it.skip('should display different results on click on specific page and change url', () => {
      cy.visit('/catalog/search?_page=2')
      cy.get('gn-ui-pagination-buttons').find('gn-ui-button').eq(1).click()
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text).to.equal(pageOne)
          cy.url().should('include', 'page=1')
        })
      cy.get('gn-ui-pagination-buttons').find('gn-ui-button').last().click()
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text).not.to.equal(pageOne)
          cy.url().should('include', 'page=2')
        })
    })
  })

  describe('sorting', () => {
    it('should order the result list on click', () => {
      cy.visit('/catalog/search')
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
  })

  describe('checkboxes', () => {
    it('should show the correct amount of selected records when they are selected', () => {
      cy.visit('/catalog/search')
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .get('gn-ui-checkbox')
        .eq(2)
        .click()
      cy.get('[data-test=selected-count]').contains('1 selected')
    })

    it('should show nothing when none are selected', () => {
      cy.visit('/catalog/search')
      cy.get('[data-cy=records-information]').should(
        'not.have.descendants',
        '[data-test=selected-count]'
      )
    })
  })
  describe('columns', () => {
    beforeEach(() => {
      cy.visit('/catalog/search')
    })
    it('should display the right info for unpublished records', () => {
      cy.get('[data-cy="create-record"]').click()
      cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea')
        .as('abstractField')
        .focus()
      cy.get('@abstractField').type('draft abstract')
      cy.editor_findDraftInLocalStorage().then((value) => {
        expect(value).to.contain('draft abstract')
      })
      cy.visit('/my-space/my-draft')
      cy.get('gn-ui-results-table').find('[data-cy="table-row"]').as('draft')
      cy.get('@draft').should('have.length', 1)
      cy.get('@draft')
        .children('div')
        .eq(4)
        .find('span')
        .invoke('text')
        .should('eq', '')
      cy.get('@draft')
        .children('div')
        .eq(5)
        .should('include.text', 'Not published')
      cy.get('@draft').children('div').eq(6).should('contain', ' - ')
      cy.clearRecordDrafts()
    })
    it('should display the right info for published records', () => {
      cy.visit('/catalog/search')
      cy.get('md-editor-dashboard-menu').find('a').eq(5).click()
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
      cy.get('@record')
        .children('div')
        .eq(5)
        .find('span')
        .should('include.text', 'Published')
      cy.get('@record').children('div').eq(6).should('not.contain', ' - ')
      cy.clearRecordDrafts()
    })
  })

  describe('navigation', () => {
    beforeEach(() => {
      cy.visit('/catalog/search')
    })
    describe('all records', () => {
      it('should display the correct amount of records', () => {
        cy.get('gn-ui-results-table')
          .find('[data-cy="table-row"]')
          .should('have.length', '15')
      })
    })
    describe('my records', () => {
      it('should only display records I own', () => {
        cy.get('md-editor-dashboard-menu').find('a').eq(3).click()
        cy.get('gn-ui-results-table')
          .find('[data-cy="table-row"]')
          .find('ng-icon')
          .next()
          .should('contain', 'admin admin')
      })
      it('should display the correct amount of records', () => {
        cy.get('md-editor-dashboard-menu').find('a').eq(3).click()
        cy.get('gn-ui-results-table')
          .find('[data-cy="table-row"]')
          .should('have.length', '11')
      })
      it('should sort the records by title', () => {
        cy.get('md-editor-dashboard-menu').find('a').eq(3).click()
        cy.get('gn-ui-results-table')
          .find('[data-cy="table-row"]')
          .first()
          .invoke('text')
          .then((firstRecord) => {
            cy.get('gn-ui-results-table')
              .find('.table-header-cell')
              .eq(1)
              .click()
            cy.get('gn-ui-results-table')
              .find('[data-cy="table-row"]')
              .first()
              .invoke('text')
              .should('not.eq', firstRecord)
          })
      })
    })
  })

  describe('search', () => {
    function checkDashboardFiltered() {
      cy.get('gn-ui-autocomplete').type('velo{enter}')
      cy.get('gn-ui-interactive-table')
        .find('[data-cy="table-row"]')
        .should('have.length', '1')
    }
    function checkAutocompleteSelected() {
      cy.get('gn-ui-autocomplete').type('velo')
      cy.get('mat-option').first().click()
      cy.url().should('include', '/edit/accroche_velos')
    }
    describe('allRecords search input', () => {
      beforeEach(() => {
        cy.visit('/catalog/search')
      })
      it('should filter the dashboard based on the search input', () => {
        checkDashboardFiltered()
      })
      it('should navigate to the record selected in the autocomplete', () => {
        checkAutocompleteSelected()
      })
      it('should clear the search input when navigating to my records', () => {
        cy.get('gn-ui-autocomplete').type('velo')
        cy.get('md-editor-dashboard-menu').find('a').eq(5).click()
        cy.get('gn-ui-autocomplete').should('have.value', '')
      })
    })
    describe('myRecords search input', () => {
      beforeEach(() => {
        cy.login('admin', 'admin', false)
        cy.visit('/my-space/my-records')
      })
      it('should filter the dashboard based on the search input', () => {
        checkDashboardFiltered()
      })
      it('should navigate to the record selected in the autocomplete', () => {
        checkAutocompleteSelected()
      })
      it('should clear the search input when navigating to all records', () => {
        cy.get('gn-ui-autocomplete').type('velo')
        cy.get('md-editor-dashboard-menu').find('a').first().click()
        cy.get('gn-ui-autocomplete').should('have.value', '')
      })
      it('should allow to search in the entire catalog', () => {
        cy.get('gn-ui-autocomplete').type('mat{enter}')
        cy.get('gn-ui-interactive-table')
          .find('[data-cy="table-row"]')
          .should('have.length', '1')
        cy.url().should('include', '/search?q=mat')
        cy.url().should('not.include', 'owner')
      })
    })
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
    function selectDateRange() {
      cy.get('mat-calendar-header').find('button').first().click()
      cy.get('mat-multi-year-view').contains('button', '2024').click()
      cy.get('mat-year-view').contains('button', 'AUG').click()
      cy.get('mat-month-view').contains('button', '1').click()
      cy.get('mat-month-view').contains('button', '30').click()
    }
    function closeDropDown() {
      cy.get('body').click(0, 0)
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
    describe('allRecords search filter', () => {
      beforeEach(() => {
        cy.visit('/catalog/search')
      })
      it('should contain filter component with two search filters', () => {
        cy.get('md-editor-search-filters')
          .find('gn-ui-button')
          .should('have.length', 2)
      })
      it('should filter the record list by user (Barbara Roberts)', () => {
        selectUser(1)
        cy.get('gn-ui-interactive-table')
          .find('[data-cy="table-row"]')
          .should('have.length', '5')
        cy.get('gn-ui-results-table')
          .find('[data-cy="ownerInfo"]')
          .each(($ownerInfo) => {
            cy.wrap($ownerInfo).invoke('text').should('eq', 'Barbara Roberts')
          })
      })
      it('should filter the record list by last update (changeDate)', () => {
        cy.get('md-editor-search-filters').find('gn-ui-button').eq(1).click()
        selectDateRange()
        checkFilterByChangeDate()
      })
      it('should display the expand icon for the date range dropdown correctly', () => {
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
    })
    describe('myRecords search filters', () => {
      beforeEach(() => {
        cy.visit('/my-space/my-records')
      })
      it('should contain filter component with one search filter', () => {
        cy.get('md-editor-search-filters')
          .find('gn-ui-button')
          .should('have.length', 1)
      })
      it('should filter the record list by last update (changeDate)', () => {
        cy.get('md-editor-search-filters').find('gn-ui-button').first().click()
        selectDateRange()
        checkFilterByChangeDate()
      })
    })
    describe('allRecord search filters summary', () => {
      beforeEach(() => {
        cy.visit('/catalog/search')
      })
      it('should not display anything without selected filters', () => {
        cy.get('gn-ui-search-filters-summary-item').should('not.exist')
      })
      describe('selecting users', () => {
        beforeEach(() => {
          selectUser(1)
        })
        it('should display a label for badges of selected users', () => {
          cy.get('gn-ui-search-filters-summary')
            .find('[data-cy="filterSummaryLabel"]')
            .invoke('text')
            .should('eq', 'Editor: ')
        })
        it('should display the badge for a selected user', () => {
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .should('have.length', 1)
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .invoke('text')
            .should('eq', 'Barbara Roberts')
        })
        it('should display a second badge for a second selected user', () => {
          selectUser(0, false)
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .should('have.length', 2)
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .eq(1)
            .invoke('text')
            .should('eq', 'admin admin')
        })
        it('should remove one of two badges when a badge cross is clicked', () => {
          selectUser(0, false)
          closeDropDown()
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .eq(0)
            .find('ng-icon')
            .click()
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .should('have.length', 1)
        })
      })
      describe('selecting date range', () => {
        beforeEach(() => {
          cy.get('md-editor-search-filters').find('gn-ui-button').eq(1).click()
          selectDateRange()
        })
        it('should display a label for the date range', () => {
          cy.get('gn-ui-search-filters-summary')
            .find('[data-cy="filterSummaryLabel"]')
            .invoke('text')
            .should('eq', 'Updated: ')
        })
        it('should display the badge for the selected date range', () => {
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .invoke('text')
            .should('eq', '01.08.2024 - 30.08.2024')
        })
        it('should remove the badge when the badge cross is clicked', () => {
          closeDropDown()
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .find('ng-icon')
            .click()
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .should('not.exist')
        })
      })
      describe('selecting multiple filters (users and date range)', () => {
        beforeEach(() => {
          selectUser(0)
          closeDropDown()
          cy.get('md-editor-search-filters').find('gn-ui-button').eq(1).click()
          selectDateRange()
        })
        it('should display both badges', () => {
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .should('have.length', 2)
        })
        it('should clear all filters when the clear button is clicked', () => {
          cy.get('gn-ui-search-filters-summary').find('button').last().click()
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .should('have.length', 0)
          cy.get('gn-ui-search-filters-summary-item').should('not.exist')
        })
      })
    })
    describe('myRecords search filters summary', () => {
      beforeEach(() => {
        cy.visit('/my-space/my-records')
      })
      it('should not display anything without selected filters', () => {
        cy.get('gn-ui-search-filters-summary-item').should('not.exist')
      })
      describe('selecting date range', () => {
        beforeEach(() => {
          cy.get('md-editor-search-filters').find('gn-ui-button').eq(0).click()
          selectDateRange()
        })
        it('should display a label for the date range', () => {
          cy.get('gn-ui-search-filters-summary')
            .find('[data-cy="filterSummaryLabel"]')
            .invoke('text')
            .should('eq', 'Updated: ')
        })
        it('should display the badge for the selected date range', () => {
          cy.get('gn-ui-search-filters-summary')
            .find('gn-ui-badge')
            .invoke('text')
            .should('eq', '01.08.2024 - 30.08.2024')
        })
        it('should remove the badge when the badge cross is clicked', () => {
          closeDropDown()
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
  })
  describe('Account settings access', () => {
    it('should navigate to the account settings page', () => {
      cy.visit('/catalog/search')
      cy.get('md-editor-sidebar')
        .find('[data-cy=account-link]')
        .invoke('removeAttr', 'target')
        .click()
      cy.url().should('include', '/admin.console')
    })
  })
})

describe('Logging in and out', () => {
  describe('when the user is not logged in', () => {
    beforeEach(() => {
      cy.visit('/catalog/search')
    })
    it('redirects to the login page', () => {
      cy.url().should('include', '/catalog.signin?redirect=')
    })
  })
  describe('Logging out', () => {
    beforeEach(() => {
      cy.login('admin', 'admin', false)
      cy.visit('/catalog/search')
      // wait for results
      cy.get('gn-ui-results-table')
        .find('[data-cy=table-row]')
        .should('have.length.above', 1)
    })
    it('logs out the user', () => {
      cy.get('gn-ui-avatar').should('be.visible')
      cy.get('md-editor-sidebar').find('[data-cy=logout-button]').click()
      cy.url().should('include', '/catalog.signin?redirect=')
      cy.get('gn-ui-avatar').should('not.exist')
    })
  })
})
