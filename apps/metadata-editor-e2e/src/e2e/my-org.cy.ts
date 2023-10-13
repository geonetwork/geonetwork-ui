describe('my-org', () => {
  beforeEach(() => {
    cy.loginGN('barbie', 'p4ssworD_', false)
    cy.visit(`/records/my-org`)
    cy.get('md-editor-dashboard-menu').find('a').first().click()
    cy.get('main').children('div').first().children('div').eq(1).as('linkGroup')
  })
  describe('my-org display', () => {
    it('should show my-org name and logo', () => {
      cy.get('h1').should('not.have.text', '')
      cy.get('gn-ui-thumbnail')
    })
    it('should show the user and record count', () => {
      cy.get('@linkGroup')
        .find('a')
        .children('span')
        .first()
        .should('not.have.text', '')
      cy.get('@linkGroup')
        .find('gn-ui-button')
        .children('span')
        .first()
        .should('not.have.text', '')
    })
    it('should show my-org records', () => {
      cy.get('.grid').should('have.length.above', 0)
    })
  })
  describe('routing', () => {
    it('should access the datahub with a filter', () => {
      cy.get('@linkGroup').find('a').click()
      cy.url().should('include', 'search/publisher=')
    })
    it('should access the user list page and show my-org users', () => {
      cy.visit(`/records/my-org`)
      cy.get('md-editor-dashboard-menu').find('a').first().click()
      cy.get('@linkGroup').find('gn-ui-button').click()
      cy.url().should('include', '/users/my-org')
      cy.get('.grid').should('have.length.above', 0)
      cy.get('h1').should('not.have.text', '')
      cy.get('gn-ui-thumbnail')
    })
  })
})
