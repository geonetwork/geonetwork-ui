import 'cypress-real-events'

describe('service pages', () => {
  beforeEach(() => {
    cy.visit('/service/01ec6ec7-6454-4504-ac95-befb16bacb0e')
  })
  describe('About', () => {
    it('should display the spatial extent', () => {
      cy.get('gn-ui-expandable-panel').eq(2).click()
      cy.get('gn-ui-map-container').should('be.visible')
    })
  })
  describe('Technical information', () => {
    it('should display the service capabilities component', () => {
      cy.get('gn-ui-service-capabilities').should('be.visible')
    })
    it('should display the layer information when selected', () => {
      cy.get('gn-ui-service-capabilities').find('gn-ui-button').eq(1).click()
      cy.get('[data-test="layer-information"]')
        .find('span')
        .eq(1)
        .should('contain', 'Title')
    })
    it('should filter the layer list', () => {
      cy.get('gn-ui-service-capabilities')
        .find('[data-test="layer-list"]')
        .find('gn-ui-button')
        .should('have.length', 3)
      cy.get('gn-ui-service-capabilities')
        .find('gn-ui-text-input')
        .type('catég{enter}')
      cy.get('gn-ui-service-capabilities')
        .find('[data-test="layer-list"]')
        .find('gn-ui-button')
        .should('have.length', 1)
    })
  })
  describe('Api links', () => {
    it('should not display the API links', () => {
      cy.get('datahub-record-apis').should('not.exist')
    })
  })
  describe('Routing', () => {
    it('should display an error message if a service is accessed throught the dataset path', () => {
      cy.visit('/dataset/01ec6ec7-6454-4504-ac95-befb16bacb0e')
      cy.get('gn-ui-error').should('be.visible')
    })
  })
})
