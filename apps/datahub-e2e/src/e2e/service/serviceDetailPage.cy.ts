import 'cypress-real-events'

beforeEach(() => {
  cy.intercept(
    'GET',
    '/arcgis/services/AGRICULTURE/SIGEC_PARC_AGRI_ANON__2020/MapServer/WMSServer?SERVICE=WMS&REQUEST=GetCapabilities',
    {
      fixture: 'wallonie-wms-capabilities.xml',
    }
  )
})

describe('service pages', () => {
  beforeEach(() => {
    cy.visit('/service/01ec6ec7-6454-4504-ac95-befb16bacb0e')
  })
  it('should display the service detail page', () => {
    // Navigation bar
    // it should only display the service sections buttons
    cy.get('datahub-record-page')
      .find('gn-ui-service-capabilities')
      .should('exist')
    cy.scrollTo(0, 1000, { ensureScrollable: false })
    cy.window().then((win) => {
      if (win.scrollY > 0) {
        cy.get('datahub-navigation-bar')
          .find('[data-cy="capabilities"]')
          .should('be.visible')
        cy.get('datahub-navigation-bar')
          .find('[data-cy="data-preview"]')
          .should('not.be.visible')
      } else {
        // If the page is not scrollable, the navigation bar should not be visible
        // This occurs on GN 4.2.2 where the related records are not displayed for this service
        cy.get('datahub-record-page')
          .find('datahub-navigation-bar')
          .should('not.be.visible')
      }
    })

    // About
    // it should display the spatial extent
    cy.get('gn-ui-expandable-panel').eq(2).click()
    cy.get('gn-ui-map-container').should('be.visible')

    // Technical information
    // it should display the service capabilities component
    cy.get('gn-ui-service-capabilities').should('be.visible')

    // it should display the layer information when selected
    cy.get('gn-ui-service-capabilities').find('gn-ui-button').eq(1).click()
    cy.get('[data-test="layer-information"]')
      .find('span')
      .eq(1)
      .should('contain', 'Title')

    // it should filter the layer list
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

    // Api links
    // it should not display the API links
    cy.get('datahub-record-apis').should('not.exist')

    // Routing
    // it should display an error message if a service is accessed through the dataset path
    cy.visit('/dataset/01ec6ec7-6454-4504-ac95-befb16bacb0e')
    cy.get('gn-ui-error').should('be.visible')
  })
})
describe('service pages - metadata quality', () => {
  it('display metadata quality widget enabled', () => {
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-metadata-quality.toml',
    })
    cy.visit('/service/00b22798-ec8e-4500-89e8-90eeeda45919')

    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('eql', '100%')
  })
})
