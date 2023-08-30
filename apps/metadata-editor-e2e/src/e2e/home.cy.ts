const fakeUser = {
  username: 'user',
  password: 'Abcde12!',
  email: 'jitewaboh@lagify.com',
  name: 'Homer',
  surname: 'Simpson',
}

const gnBaseUrl = 'http://localhost:8080/geonetwork/srv/eng/'

describe('avatar', () => {
  describe('display avatar for user without gravatar hash', () => {
    it('should display placeholder url', () => {
      cy.loginGN('admin', 'admin', false)
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
      cy.loginGN('admin', 'admin', false)
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
      cy.loginGN(fakeUser.username, fakeUser.password)
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
