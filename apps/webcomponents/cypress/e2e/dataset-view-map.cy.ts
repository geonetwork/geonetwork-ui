import 'cypress-real-events'

beforeEach(() => {
  // GEOSERVER stubs
  cy.intercept(
    'GET',
    '/geoserver/insee/ows?SERVICE=WMS&REQUEST=GetCapabilities',
    {
      fixture: 'insee-wms-getcapabilities.xml',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/ows?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&STYLES=&TRANSPARENT=true&LAYERS=rectangles_200m_menage_erbm*',
    {
      fixture: 'insee-rectangles_200m_menage_erbm.png',
    }
  )
})

describe('gn-dataset-view-map', () => {
  beforeEach(() => {
    cy.visit('/webcomponents/gn-dataset-view-map.sample.html')
  })

  it('should display the map and the legend', () => {
    cy.get('gn-ui-map-container').should('be.visible')
    cy.get('gn-ui-map-legend').should('be.visible')
    cy.screenshot({ capture: 'fullPage' })
  })

  it('should open a popup on layer click', () => {
    cy.get('canvas').realClick()
    cy.get('gn-ui-feature-detail')
    cy.screenshot({ capture: 'fullPage' })
  })
})
