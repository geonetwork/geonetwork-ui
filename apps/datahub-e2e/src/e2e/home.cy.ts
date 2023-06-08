describe('header', () => {
  beforeEach(() => cy.visit('/home/news'))

  describe('general display', () => {
    it('should select the right tab', () => {
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(0)
        .invoke('attr', 'ng-reflect-ng-class')
        .should('eq', 'decoration-primary')
    })
    it('should display the news feed', () => {
      cy.get('gn-ui-results-list')
    })
    it('should display the "show more" button', () => {
      cy.get('[data-cy="addMoreBtn"]')
    })
    it('should display the orga and dataset link buttons', () => {
      cy.get('[ng-reflect-title="datasets"]')
      cy.get('[ng-reflect-title="organisations"]')
    })

    describe('news feed display', () => {
      it('should have a few datasets listed', () => {
        cy.get('gn-ui-results-list').should('have.length.gt', 0)
        cy.get('gn-ui-results-list').should('have.length.lt', 11)
      })
    })

    describe('link buttons display', () => {
      it('datasets : should display the icon', () => {
        cy.get('[ng-reflect-title="datasets"]')
          .find('mat-icon')
          .should('have.text', ' folder_open ')
      })
      it('organisations : should display the icon', () => {
        cy.get('[ng-reflect-title="organisations"]')
          .find('mat-icon')
          .should('have.text', ' corporate_fare ')
      })
    })
  })

  describe('news feed actions', () => {
    it('opens a dataset page upon clicking', () => {
      cy.get('gn-ui-results-list-item').eq(3).click()
      cy.url().should('include', '/dataset/')
    })
    it('adds more datasets to the news feed upon clicking on "show more"', () => {
      cy.get('gn-ui-results-list-item').as('initialList')
      cy.get('[data-cy="addMoreBtn"]').trigger('click')
      cy.get('gn-ui-results-list-item').should('not.eq', '@initialList')
    })

    // TODO : add a dataset to favorite/vote for dataset (?) (needs login)
  })

  describe('button link actions', () => {
    it('goes to the dataset page upon clicking', () => {
      cy.get('[href="/home/search"]').click()
      cy.url().should('include', '/home/search')
    })
    it('goes to the organisations page upon clicking', () => {
      cy.get('[href="/home/organisations"]').click()
      cy.url().should('include', '/home/organisations')
    })
  })
})
