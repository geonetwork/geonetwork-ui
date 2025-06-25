import 'cypress-real-events'

describe('reuse pages', () => {
  beforeEach(() => {
    cy.visit('/reuse/7eb795c2-d612-4b5e-b15e-d985b0f4e697')
  })
  describe('Header', () => {
    it('should display a link to the reuse', () => {
      cy.get('datahub-header-record')
        .find('header')
        .find('a')
        .first()
        .should('be.visible')
        .should(
          'have.attr',
          'href',
          'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=reseau_cerf_lizmap'
        )
        .and('have.attr', 'target', '_blank')
    })
  })
  describe('Navigation bar', () => {
    it('should not display navigation bar on unscrollable page', () => {
      cy.get('datahub-record-page')
        .find('datahub-navigation-bar')
        .should('not.be.visible')
    })
    // skip as the page currently does not contain enough content to scroll
    it.skip('should only display the reuse sections buttons', () => {
      cy.get('datahub-navigation-bar')
        .find('[data-cy="capabilities"]')
        .should('not.be.visible')
      cy.get('datahub-navigation-bar')
        .find('[data-cy="data-preview"]')
        .should('not.be.visible')
    })
  })
  describe('About', () => {
    it('should display the spatial extent', () => {
      cy.get('gn-ui-expandable-panel').eq(1).click()
      cy.get('gn-ui-map-container').should('be.visible')
    })
  })
  describe('Links', () => {
    it('should not display the API links', () => {
      cy.get('datahub-record-apis').should('not.exist')
    })
    it('should not display the download links', () => {
      cy.get('gn-ui-download-links').should('not.exist')
    })
  })
  describe('Routing', () => {
    it('should display an error message if a service is accessed throught another path', () => {
      cy.visit('/service/7eb795c2-d612-4b5e-b15e-d985b0f4e697')
      cy.get('gn-ui-error').should('be.visible')
    })
  })
})
