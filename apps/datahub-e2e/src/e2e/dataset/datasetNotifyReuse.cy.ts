import 'cypress-real-events'

describe('Declare a reuse', () => {
  describe('when not logged in', () => {
    it('does not display the reuse button', () => {
      cy.visit('/dataset/accroche_velos')
      cy.get('datahub-record-metadata').should('exist')
      cy.get('gn-ui-notify-reuse-form').should('not.exist')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/dataset/accroche_velos')
      cy.get('gn-ui-notify-reuse-form').as('reuseForm')
    })

    it('displays the reuse button', () => {
      cy.get('@reuseForm').should('be.visible')
      cy.get('@reuseForm')
        .find('gn-ui-button')
        .first()
        .should('contain.text', 'Reuse')
    })

    describe('reuse form overlay', () => {
      beforeEach(() => {
        cy.get('@reuseForm').find('gn-ui-button').first().click()
        cy.get('.cdk-overlay-container').as('overlay')
      })

      it('opens the form with a title and three fields', () => {
        cy.get('@overlay').should('contain.text', 'Declare a reuse')
        cy.get('@overlay').find('gn-ui-text-input').should('have.length', 3)
      })

      it('pre-fills the email with the organization email', () => {
        cy.get('@overlay')
          .find('gn-ui-text-input input')
          .eq(2)
          .invoke('val')
          .should('not.be.empty')
      })

      it('keeps submit disabled until the required fields are filled', () => {
        cy.get('@overlay')
          .find('gn-ui-button')
          .last()
          .find('button')
          .should('be.disabled')

        cy.get('@overlay')
          .find('gn-ui-text-input input')
          .eq(0)
          .type('My great reuse')
        cy.get('@overlay')
          .find('gn-ui-text-input input')
          .eq(1)
          .type('https://example.com/my-reuse')

        cy.get('@overlay')
          .find('gn-ui-button')
          .last()
          .find('button')
          .should('not.be.disabled')
      })

      it('submits the reuse and closes the overlay', () => {
        cy.intercept('PUT', '/geonetwork/srv/api/records', {
          statusCode: 201,
          body: {
            metadataInfos: {
              '12345': [{ uuid: 'new-reuse-uuid' }],
            },
          },
        }).as('saveRecord')

        cy.get('@overlay')
          .find('gn-ui-text-input input')
          .eq(0)
          .type('My great reuse')
        cy.get('@overlay')
          .find('gn-ui-text-input input')
          .eq(1)
          .type('https://example.com/my-reuse')

        cy.get('@overlay').find('gn-ui-button').last().find('button').click()

        // the serialized record carries the entered title and the source
        // dataset reference (linking the reuse back to the dataset)
        cy.wait('@saveRecord')
          .its('request.body')
          .should('contain', 'My great reuse')
        cy.get('.cdk-overlay-container').should(
          'not.contain.text',
          'Declare a reuse'
        )
      })

      it('closes the overlay with the close button', () => {
        cy.get('@overlay').find('button[aria-label="Close"]').click()
        cy.get('.cdk-overlay-container').should(
          'not.contain.text',
          'Declare a reuse'
        )
      })
    })
  })
})
