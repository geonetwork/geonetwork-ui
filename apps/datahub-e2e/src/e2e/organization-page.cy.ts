import 'cypress-real-events'

describe('organizations', () => {
  beforeEach(() => {
    cy.visit('organization/Barbie%20Inc.')

    // aliases
    cy.get('[data-cy="backButton"]').as('backButton')
    cy.get('[data-test="organizationHeaderName"]').as('organizationHeaderName')
    cy.get('[data-test="organizationHeaderWebsiteLink"]').as(
      'organizationHeaderWebsiteLink'
    )
    cy.get('[data-test="organizationDescription"]').as(
      'organizationDescription'
    )
    cy.get('gn-ui-max-lines').contains('Read more').as('readMoreButton')
    cy.get('[data-test="organizationLogo"]').as('organizationLogo')
    cy.get('[data-test="organizationDatasetCount"]').as(
      'organizationDatasetCount'
    )
    cy.get('[data-test="organizationEmail"]').as('organizationEmail')
    cy.get('[data-test="orgPageLasPubDat"]').as('orgPageLasPubDat')
    cy.get('[data-test="routerLinkButton"]').as('routerLinkButton')
  })

  describe('general display', () => {
    describe('header', () => {
      describe('back button', () => {
        beforeEach(() => {
          cy.visit('organisations')
          cy.visit('organization/Barbie%20Inc.')
        })

        it('back button goes to the previous visited page', () => {
          cy.get('@backButton').click()
          cy.url().should('include', '/organisations')
        })
      })

      it('should display the organization name', () => {
        cy.get('@organizationHeaderName').should('contain', 'Barbie Inc.')
      })

      it('should display the organization website link', () => {
        cy.get('@organizationHeaderWebsiteLink')
          .should('be.visible')
          .should('have.attr', 'href', 'https://www.barbie-inc.com/')
          .and('have.attr', 'target', '_blank')
      })
    })

    describe('details', () => {
      describe('left column', () => {
        it('should display the organization description', () => {
          cy.get('@organizationDescription').should('be.visible')
        })

        it('click on read more should expand the organization description', () => {
          let initialDescription
          let newDescription

          cy.get('@organizationDescription').then((firstDescription) => {
            initialDescription = firstDescription
            cy.get('@readMoreButton').trigger('click')
            cy.get('@organizationDescription').then((secondDescription) => {
              newDescription = secondDescription
              expect(newDescription).to.not.equal(initialDescription)
            })
          })
        })
      })

      describe('right column', () => {
        it('should display the organization logo', () => {
          cy.get('@organizationLogo').should('be.visible')
        })

        it('should display the organization dataset count', () => {
          cy.get('@organizationDatasetCount').should('be.visible')
        })

        it('a click on the organization dataset count should open the dataset search page filtered on the organization', () => {
          cy.get('@organizationDatasetCount').then(($link) => {
            const url = $link.prop('href')
            cy.wrap($link).click()

            cy.url().should('eq', url)
          })
        })

        it('should display the organization email', () => {
          cy.get('@organizationEmail')
            .should('be.visible')
            .and('have.attr', 'href', 'mailto:contact@barbie-inc.com')
        })
      })

      describe('last published datasets', () => {
        it('should display the last published datasets', () => {
          cy.get('@orgPageLasPubDat').should('be.visible')
        })

        it('should display the search all button', () => {
          cy.get('@routerLinkButton').should('be.visible')
        })

        it('a click on the search all button should open the dataset search page filtered on the organization', () => {
          cy.get('@routerLinkButton').then(($link) => {
            const url = $link.prop('href')
            cy.wrap($link).click()

            cy.url().should('eq', url)
          })
        })
      })
    })
  })
})
