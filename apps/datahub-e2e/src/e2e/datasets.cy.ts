describe('datasets', () => {
  beforeEach(() => {
    cy.visit('/home/search')
    cy.viewport(1700, 1200)
  })

  describe('general display', () => {
    it('should select the right tab', () => {
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(1)
        .invoke('attr', 'ng-reflect-ng-class')
        .should('eq', 'decoration-primary')
    })
    it('should display the news feed with a few news', () => {
      cy.get('gn-ui-results-list').should('have.length.gt', 0)
      cy.get('gn-ui-results-list').should('have.length.lt', 11)
    })
    it('should display four filter buttons', () => {
      cy.get('datahub-search-filters')
        .find('gn-ui-filter-dropdown')
        .filter(':visible')
        .should('have.length', 2)
      cy.get('datahub-search-filters')
        .children('div')
        .children('div')
        .eq(1)
        .find('gn-ui-button')
      cy.get('datahub-search-filters').find('gn-ui-sort-by')
    })
    it('should display the "add more" button', () => {
      cy.get('[data-cy="addMoreBtn"]')
    })
  })

  describe('display of dataset previews', () => {
    beforeEach(() => {
      cy.get('gn-ui-record-preview-row')
        .children('div')
        .filter(
          '[title="INSEE - Part des ménages présents depuis 5 ans ou plus dans leur logement actuel (2010)"]'
        )
        .as('dataset')
    })
    it('should display the image', () => {
      cy.get('@dataset').find('gn-ui-thumbnail').should('be.visible')
    })
    it('should display the title', () => {
      cy.get('@dataset')
        .find('div')
        .filter('[data-cy="recordTitle"]')
        .should('be.visible')
    })
    it('should display the summary', () => {
      cy.get('@dataset')
        .find('div')
        .filter('[data-cy="recordAbstract"]')
        .should('be.visible')
    })
    it('should display the provider', () => {
      cy.get('@dataset')
        .find('div')
        .filter('[data-cy="recordOrg"]')
        .should('be.visible')
    })
    it('should display the star and like count', () => {
      cy.get('@dataset')
        .find('div')
        .filter('[data-cy="recordFav"]')
        .should('be.visible')
    })
  })
})
