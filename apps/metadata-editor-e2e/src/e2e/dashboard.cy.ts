const fakeUser = {
  username: 'user',
  password: 'Abcde12!',
  email: 'jitewaboh@lagify.com',
  name: 'Homer',
  surname: 'Simpson',
}

const gnBaseUrl = 'http://localhost:8080/geonetwork/srv/eng/'

describe('dashboard', () => {
  let pageOne
  describe('avatar', () => {
    describe('display avatar for user without gravatar hash', () => {
      it('should display placeholder url', () => {
        cy.login('admin', 'admin', false)
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
        cy.login('admin', 'admin', false)
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
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .get('gn-ui-checkbox')
        .each(($checkbox) => cy.wrap($checkbox).click())
      cy.get('[data-cy=records-information]').should(
        'not.have.descendants',
        '[data-test=selected-count]'
      )
    })

    it('should select all records when the "select all" checkbox is checked', () => {
      cy.visit('/catalog/search')
      cy.get('gn-ui-results-table')
        .find('.table-row-cell')
        .get('gn-ui-checkbox')
        .first()
        .click()
      cy.get('[data-test=selected-count]').contains('15 selected')
    })
  })
  describe('columns', () => {
    beforeEach(() => {
      cy.login('admin', 'admin', false)
      cy.visit('/catalog/search')
    })
    it('should display the right info for unpublished records', () => {
      cy.get('[data-cy="create-record"]').click()
      cy.get('gn-ui-form-field[ng-reflect-model=abstract] textarea')
        .as('abstractField')
        .focus()
      cy.get('@abstractField').type('draft abstract')
      cy.editor_readFormUniqueIdentifier().then((recordUuid) => {
        cy.window()
          .its('localStorage')
          .invoke('getItem', `geonetwork-ui-draft-${recordUuid}`)
          .should('contain', 'draft abstract')
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
        .should('contain', ' Not published ')
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
      cy.get('@record').children('div').eq(5).should('contain', ' Published ')
      cy.get('@record').children('div').eq(6).should('not.contain', ' - ')
      cy.clearRecordDrafts()
    })
  })
  describe('navigation', () => {
    beforeEach(() => {
      cy.login('admin', 'admin', false)
      cy.visit('/catalog/search')
    })
    describe('search input', () => {
      it('should filter the dashboard based on the search input', () => {
        cy.get('gn-ui-autocomplete').type('Mat')
        cy.get('mat-option').first().click()
        cy.get('gn-ui-interactive-table')
          .find('[data-cy="table-row"]')
          .should('have.length', '1')
      })
    })
    describe('my records', () => {
      it('should only display records I own', () => {
        cy.get('md-editor-dashboard-menu').find('a').eq(5).click()
        cy.get('gn-ui-results-table')
          .find('[data-cy="table-row"]')
          .find('mat-icon')
          .next()
          .should('contain', 'admin admin')
      })
    })
  })
})
