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
      cy.get('gn-ui-results-list').should('be.visible')
    })
    it('should display the "show more" button', () => {
      cy.get('[data-cy="addMoreBtn"]').should('be.visible')
    })
    it('should display the orga and dataset link buttons', () => {
      cy.get('[ng-reflect-title="datasets"]').should('be.visible')
      cy.get('[ng-reflect-title="organisations"]').should('be.visible')
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
      let initialList
      let newList
      cy.get('gn-ui-results-list-item').then((firstlist) => {
        initialList = firstlist
        cy.get('[data-cy="addMoreBtn"]').trigger('click')
        cy.get('gn-ui-results-list-item').then((secondlist) => {
          newList = secondlist
          expect(newList).to.not.equal(initialList)
        })
      })
    })
  })

  describe('button link actions', () => {
    it('goes to the dataset page upon clicking', () => {
      cy.get('[href="/search"]').click()
      cy.url().should('include', '/search')
    })
    it('goes to the organisations page upon clicking', () => {
      cy.get('[href="/organisations"]').click()
      cy.url().should('include', '/organisations')
    })
  })
})
