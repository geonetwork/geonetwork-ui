beforeEach(() => {
  // GEOSERVER stubs
  cy.intercept(
    'GET',
    '/geoserver/insee/ows?SERVICE=WFS&REQUEST=GetCapabilities',
    {
      fixture: 'insee-wfs-getcapabilities.xml',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&RESULTTYPE=hits&COUNT=1',
    {
      fixture: 'insee-wfs-table-hits.xml',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=DescribeFeatureType&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm',
    {
      fixture: 'insee-wfs-describe-feature-type.xml',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&SRSNAME=EPSG%3A4326',
    {
      fixture: 'insee-wfs-table-data.json',
    }
  )
})

describe('gn-dataset-view-chart', () => {
  beforeEach(() => {
    cy.visit('/webcomponents/gn-dataset-view-chart.sample.html')
  })

  it('should display the chart & dropdowns', () => {
    cy.get('gn-ui-chart').should('not.match', ':empty')
    cy.get('gn-ui-chart-view')
      .find('gn-ui-dropdown-selector')
      .filter(':visible')
      .as('drop')
    cy.get('@drop').should('have.length', 4)
    cy.screenshot({ capture: 'fullPage' })
  })
  it('should change the chart on options change', () => {
    cy.get('gn-ui-chart-view')
      .find('gn-ui-dropdown-selector')
      .filter(':visible')
      .as('drop')
    cy.get('@drop').eq(0).selectDropdownOption('pie')
    cy.get('@drop').eq(2).selectDropdownOption('men')
    cy.get('@drop').eq(3).selectDropdownOption('average')
    cy.screenshot({ capture: 'fullPage' })
    // No attributes to verify chart change in webcomponents
  })
})
