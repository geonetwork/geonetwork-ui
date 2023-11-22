describe('my-org', () => {
  beforeEach(() => {
    cy.loginGN('barbie', 'p4ssworD_', false)
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:4200/geonetwork/srv/api/userselections/0/101',
    }).as('dataGetFirst')
    cy.visit(`/records/my-org`)
    cy.get('md-editor-dashboard-menu').find('a').first().click()
    cy.wait('@dataGetFirst').its('response.statusCode').should('equal', 200)
    cy.get('main').children('div').first().as('linkGroup')
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
      cy.get('@linkGroup')
        .find('a')
        .should('have.attr', 'href')
        .then((href) => {
          expect(href).to.include('search?publisher=Barbie+Inc')
        })
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
