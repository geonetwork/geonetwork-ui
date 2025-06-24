describe('header', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

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
    it('should display the search results on click on icon and close suggestions', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('mat-option').should('have.length.above', 0)
      cy.get('ng-icon')
        .eq(1)
        .should('have.attr', 'name', 'iconoirSearch')
        .trigger('click', { waitForAnimations: false })
      cy.get('gn-ui-record-preview-row').should('have.length', 1)
      cy.get('mat-option').should('have.length', 0)
      cy.get('gn-ui-record-preview-row')
        .find('[data-cy="recordTitle"]')
        .first()
        .should('contain', 'Accroches vélos MEL')
      cy.screenshot({ capture: 'viewport' })
    })
    it('should display the search results on enter touch and close suggestions', () => {
      cy.get('gn-ui-fuzzy-search').type('velo{enter}')
      cy.get('gn-ui-record-preview-row').should('have.length', 1)
      cy.get('mat-option').should('have.length', 0)
      cy.get('gn-ui-record-preview-row')
        .find('[data-cy="recordTitle"]')
        .first()
        .should('contain', 'Accroches vélos MEL')
    })
    it('should go to dataset page when click on the autocomplete result', () => {
      cy.get('gn-ui-fuzzy-search').type('velo')
      cy.get('mat-option').should('have.text', ' Accroches vélos MEL ')
      cy.get('mat-option').click()
      cy.url().should('include', '/dataset/')
    })
    it('should not display the feature catalog dataset', () => {
      cy.get('gn-ui-fuzzy-search').type('catalog')
      cy.get('mat-option').should('not.have.text', 'Feature Catalog')
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

  describe('Warning banner', () => {
    beforeEach(() => cy.addTranslationKey())
    it('should display a warning banner if the translation key exists and display the message', () => {
      cy.visit('/search')
      cy.get('gn-ui-application-banner').should(
        'have.text',
        'This is a warning message that should be shown when the key is set'
      )
    })
    it('should not display the banner when the translation is deleted', () => {
      cy.removeTranslationKey()
      cy.visit('/search')
      cy.get('gn-ui-application-banner').should('not.exist')
    })
  })
})
