describe('header', () => {
  beforeEach(() => cy.visit('/'))

  describe('general display', () => {
    it('should display the title', () => {
      cy.get('[data-cy="dh-title"]').should('be.visible')
    })
    it('should display the header image', () => {
      cy.get('header')
        .should('have.css', 'background')
        .and('include', 'header_bg.webp')
    })
    it('should display the search bar, button and placeholder', () => {
      cy.get('gn-ui-fuzzy-search').should('be.visible')
      cy.get('gn-ui-autocomplete').should('have.length.gt', 0)
      cy.get('ng-icon')
        .first()
        .should('have.attr', 'name', 'iconoirSearch')
        .and('be.visible')
    })
    it('display three buttons that go to other pages on click', () => {
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(0)
        .click({ force: true })
      cy.url().should('include', '/news')
      cy.visit('/')
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(1)
        .click({ force: true })
      cy.url().should('include', '/search')
      cy.visit('/')
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(2)
        .click({ force: true })
      cy.url().should('include', '/organisations')
    })
    it('hide navigation buttons when scrolling down', () => {
      cy.scrollTo(0, 1000)
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(0)
        .should('not.be.visible')
    })
  })

  describe('search actions', () => {
    it('should display the search with autocomplete result', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('mat-option').should('have.text', ' Accroches vélos MEL ')
    })
    it('should lead to the dataset page when clicking on the autocomplete result', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('mat-option').should('have.text', ' Accroches vélos MEL ').click()
      cy.url().should('include', '/dataset/')
    })
    it('should display the search results on click on icon', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('ng-icon')
        .eq(1)
        .should('have.attr', 'name', 'iconoirSearch')
        .trigger('click', { waitForAnimations: false })
      cy.get('gn-ui-record-preview-row').should('have.length', 1)
      cy.get('gn-ui-record-preview-row')
        .find('a')
        .first()
        .should('have.attr', 'title', 'Accroches vélos MEL')
      cy.screenshot({ capture: 'viewport' })
    })
    it('should display the search results on enter touch', () => {
      cy.get('gn-ui-fuzzy-search').type('velo{enter}')
      cy.get('gn-ui-record-preview-row').should('have.length', 1)
      cy.get('gn-ui-record-preview-row')
        .find('a')
        .first()
        .should('have.attr', 'title', 'Accroches vélos MEL')
    })
    it('should go to dataset page when click on the autocomplete result', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('mat-option').should('have.text', ' Accroches vélos MEL ')
      cy.get('mat-option').click()
      cy.url().should('include', '/dataset/')
    })
  })

  describe('reset search actions', () => {
    it('should create a cancel icon when typing', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('ng-icon').first().should('have.attr', 'name', 'matClose')
    })
    it('should delete text input on click on cancel button', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('ng-icon')
        .first()
        .should('have.attr', 'name', 'matClose')
        .trigger('click', { waitForAnimations: false })
      cy.get('gn-ui-autocomplete').find('input').should('have.value', '')
    })
    describe('when on search url path', () => {
      it('should reset search results on click on cancel button', () => {
        cy.visit('/search')
        cy.get('gn-ui-fuzzy-search').type('velo')
        cy.get('ng-icon')
          .first()
          .should('have.attr', 'name', 'matClose')
          .trigger('click', { waitForAnimations: false })
        cy.get('gn-ui-record-preview-row').should('have.length.gt', 1)
      })
    })
    describe('when on news url path', () => {
      it('should stay on news url path', () => {
        cy.visit('/')
        cy.get('gn-ui-fuzzy-search').type('velo')
        cy.get('ng-icon')
          .first()
          .should('have.attr', 'name', 'matClose')
          .trigger('click', { waitForAnimations: false })
        cy.url().should('include', '/news')
      })
    })
  })

  describe('filter and sort', () => {
    beforeEach(() => {
      cy.visit('/search')
      cy.get('gn-ui-record-preview-row').as('initialList')
      cy.visit('/news')
    })

    it('should create two filter buttons upon loading page', () => {
      cy.get('gn-ui-fuzzy-search')
        .next()
        .find('button')
        .should('have.length', 2)
    })

    it('should sort results by latest date', () => {
      cy.get('gn-ui-fuzzy-search').next().find('button').first().click()
      cy.get('gn-ui-record-preview-row').should('not.eq', '@initialList')
      cy.get('gn-ui-sort-by gn-ui-dropdown-selector')
        .getActiveDropdownOption()
        .invoke('attr', 'data-cy-value')
        .should('equal', 'desc,createDate')
      cy.screenshot({ capture: 'viewport' })
    })
    it('should filter results by popularity', () => {
      cy.get('gn-ui-fuzzy-search').next().find('button').eq(1).click()
      cy.get('gn-ui-record-preview-row').should('not.eq', '@initialList')
      cy.get('gn-ui-sort-by gn-ui-dropdown-selector')
        .getActiveDropdownOption()
        .invoke('attr', 'data-cy-value')
        .should('equal', 'desc,userSavedCount')
    })
  })
})
