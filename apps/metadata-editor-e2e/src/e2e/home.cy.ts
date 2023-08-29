describe('header', () => {
  const fakeUser = {
    username: 'user',
    password: 'Abcde12!',
    email: 'jitewaboh@lagify.com',
    name: 'Homer',
    surname: 'Simpson',
  }

  before(() => {
    cy.visit('/geonetwork')
    cy.get('.cookie-warning-actions').find('button').eq(0).click()
    cy.scrollTo('top')
    cy.loginGN('admin', 'admin', false)
    cy.get('a[title="Admin console"]').click()
    cy.get('.fa-group').click()
    cy.get('#gn-btn-user-add').click()
    cy.get('#username').type(fakeUser.username)
    cy.get('#gn-user-password').type(fakeUser.password)
    cy.get('#gn-user-password2').type(fakeUser.password)
    cy.get('[name="name"]').type(fakeUser.name)
    cy.get('[name="surname"]').type(fakeUser.surname)
    cy.get('[name="email"]').type(fakeUser.email)
    cy.get('.fa-save').click()
  })

  describe('general display', () => {
    it('should display the correct placeholder and profile picture', () => {
      cy.visit('/')
      cy.get('gn-ui-avatar')
        .children('img')
        .should('have.attr', 'src')
        .should('eq', 'https://www.gravatar.com/avatar/?d=mp')
      cy.signOutGN()
      cy.loginGN(fakeUser.username, fakeUser.password)
      cy.get('gn-ui-avatar')
        .children('img')
        .should('have.attr', 'src')
        .should(
          'eq',
          'https://www.gravatar.com/avatar/09abd59eb5653a7183ba812b8261f48b?d=mp'
        )
      cy.signOutGN()

      cy.get('a[title="Admin console"]').click()
      cy.get('.fa-gear').click()
      cy.get('[id="system/users/identicon"]').type(
        '{selectAll}gravatar:monsteridc'
      )
      cy.get('#gn-btn-settings-save').click()
      cy.visit('/')
    })
  })
})
