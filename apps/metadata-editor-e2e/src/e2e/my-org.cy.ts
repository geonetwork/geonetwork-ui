describe('my-org', () => {
  beforeEach(() => {
    cy.login('barbie', 'p4ssworD_', false)
    cy.intercept({
      method: 'GET',
      url: '/geonetwork/srv/api/userselections/0/101',
    }).as('dataGetFirst')
    cy.visit(`/records/my-org`)
    cy.get('md-editor-dashboard-menu').find('a').first().click()
    cy.wait('@dataGetFirst').its('response.statusCode').should('equal', 200)
  })
  describe('my-org display', () => {
    it('should show my-org name and logo', () => {
      cy.get('h1').should('not.have.text', '')
      cy.get('gn-ui-thumbnail')
    })
    it('should show the user and record count', () => {
      cy.get('[data-cy=link-to-datahub]').should('not.have.text', '')
      cy.get('[data-cy=link-to-users]').should('not.have.text', '')
    })
    it('should show my-org records', () => {
      cy.get('gn-ui-interactive-table .contents').should('have.length.above', 1)
    })
  })
  describe('routing', () => {
    it('should access the datahub with a filter', () => {
      cy.get('[data-cy=link-to-datahub]')
        .should('have.attr', 'href')
        .then((href) => {
          expect(href).to.include('search?publisher=Barbie+Inc')
        })
    })
    it('should access the user list page and show my-org users', () => {
      cy.visit(`/records/my-org`)
      cy.get('md-editor-dashboard-menu').find('a').first().click()
      cy.get('[data-cy=link-to-users]').click()
      cy.url().should('include', '/users/my-org')
      cy.get('gn-ui-interactive-table .contents').should('have.length.above', 1)
      cy.get('h1').should('not.have.text', '')
      cy.get('gn-ui-thumbnail')
    })
  })
})
