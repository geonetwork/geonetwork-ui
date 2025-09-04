import 'cypress-real-events'

describe('User feedback', () => {
  describe('When userFeedbacks are enabled', () => {
    it('when not logged in', () => {
      cy.visit('/dataset/accroche_velos')
      cy.get('datahub-record-user-feedbacks').as('userFeedback')

      // it should sort comments
      cy.get('gn-ui-user-feedback-item')
        .find('[data-cy="commentText"]')
        .first()
        .then((div) => {
          const firstCommentBeforeSort = div.text().trim()
          cy.get('@userFeedback')
            .find('gn-ui-dropdown-selector')
            .openDropdown()
            .children('button')
            .eq(1)
            .click()

          cy.get('gn-ui-user-feedback-item')
            .find('[data-cy="commentText"]')
            .first()
            .invoke('text')
            .invoke('trim')
            .should('not.eq', firstCommentBeforeSort)
        })

      // it shouldn't be able to comment
      cy.get('datahub-record-user-feedbacks')
        .find('gn-ui-text-area')
        .should('not.exist')
    })

    it('when logged in', () => {
      cy.login()
      cy.visit('/dataset/accroche_velos')

      // it should publish a comment
      cy.get('datahub-record-user-feedbacks')
        .find('gn-ui-text-area')
        .first()
        .should('exist')
        .type('Something')

      cy.get('datahub-record-user-feedbacks')
        .find('gn-ui-button')
        .eq(1)
        .should('exist')

      // it should answer to a comment
      cy.get('gn-ui-user-feedback-item')
        .find('gn-ui-text-area')
        .first()
        .should('exist')
        .type('Something')

      cy.get('gn-ui-user-feedback-item')
        .find('gn-ui-button')
        .eq(0)
        .should('exist')
    })
  })
  describe('When userFeedbacks are not enabled', () => {
    beforeEach(() => {
      cy.login()
      cy.disableUserFeedbacks()
    })
    it('should not display the userFeedbacks section', () => {
      cy.visit('/dataset/accroche_velos')
      cy.get('datahub-record-user-feedbacks').should('not.exist')
    })
  })
})
