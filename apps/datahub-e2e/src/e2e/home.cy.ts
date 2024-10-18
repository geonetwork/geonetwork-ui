/* eslint-disable cypress/no-unnecessary-waiting */
import 'cypress-real-events'

describe('home', () => {
  beforeEach(() => cy.visit('/'))

  describe('general display', () => {
    it('should end up on the news page', () => {
      cy.url().should('match', /^http:\/\/localhost:[0-9]+\/news$/)
    })
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
      cy.get('body').then((body$) => {
        cy.viewport(body$.width(), body$.height())
        cy.screenshot({ capture: 'viewport' })
      })
    })
    it('should display the orga and dataset link buttons', () => {
      cy.get('gn-ui-figure').should('have.length', 2)
    })

    describe('news feed display', () => {
      it('should have a few datasets listed', () => {
        cy.get('gn-ui-results-list').should('have.length.gt', 0)
        cy.get('gn-ui-results-list').should('have.length.lt', 11)
      })
    })

    describe('link buttons display', () => {
      it('datasets : should display the icon', () => {
        cy.get('gn-ui-figure')
          .eq(0)
          .find('ng-icon')
          .should('have.attr', 'ng-reflect-name', 'tablerFolderOpen')
      })
      it('organisations : should display the icon', () => {
        cy.get('gn-ui-figure')
          .eq(1)
          .find('ng-icon')
          .should('have.attr', 'ng-reflect-name', 'matCorporateFare')
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

  describe('my favorites button', () => {
    beforeEach(() => {
      cy.login()
      cy.clearFavorites()
      cy.visit('/')
    })
    beforeEach(() => {
      // select the 6th record as the new favorite
      cy.get('gn-ui-results-list-item').eq(6).as('favoriteItem')
      cy.get('@favoriteItem')
        .find('[data-cy=recordTitle]')
        .invoke('text')
        .as('favoriteTitle')
      cy.get('@favoriteItem').find('gn-ui-favorite-star button').click()

      // wait for the favorite count to change before filtering
      cy.get('@favoriteItem')
        .find('[data-test=favorite-count]')
        .invoke('text')
        .should('eq', '1')

      // show my favorites only
      cy.get('datahub-header-badge-button[label$=favorites] button').click({
        force: true,
      })
    })
    it('only shows one record, same as the favorite one', () => {
      cy.get('gn-ui-results-list-item').should('have.length', 1)
      cy.get('gn-ui-results-list-item')
        .eq(0)
        .find('[data-cy=recordTitle]')
        .invoke('text')
        .then(function (resultTitle) {
          expect(resultTitle).to.eql(this.favoriteTitle)
        })
      cy.screenshot({ capture: 'viewport' })
    })
  })
})
