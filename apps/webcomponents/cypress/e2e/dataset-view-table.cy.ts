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
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=oid%2Cidk%2Cmen%2Cmen_occ5%2Cpt_men_occ5&COUNT=10&SRSNAME=EPSG%3A4326',
    {
      fixture: 'insee-wfs-table-data.json',
    }
  )
  cy.intercept(
    'GET',
    'geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=&COUNT=10&SRSNAME=EPSG%3A4326',
    {
      fixture: 'insee-wfs-table-data.json',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&SRSNAME=EPSG%3A4326',
    {
      fixture: 'insee-wfs-table-data.json',
    }
  )
  //Note: The real WFS of this example responds with an error to this request due to a missing primary key in the table
  cy.intercept(
    'GET',
    'geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=oid%2Cidk%2Cmen%2Cmen_occ5%2Cpt_men_occ5&COUNT=10&SRSNAME=EPSG%3A4326&STARTINDEX=10',
    {
      fixture: 'insee-wfs-table-data-page2.json',
    }
  )
  cy.intercept(
    'GET',
    'geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=oid%2Cidk%2Cmen%2Cmen_occ5%2Cpt_men_occ5&COUNT=10&SRSNAME=EPSG%3A4326&SORTBY=idk+A',
    {
      fixture: 'insee-wfs-table-data-sort-idk-a.json',
    }
  )
  cy.intercept(
    'GET',
    'geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=oid%2Cidk%2Cmen%2Cmen_occ5%2Cpt_men_occ5&COUNT=10&SRSNAME=EPSG%3A4326&SORTBY=idk+D',
    {
      fixture: 'insee-wfs-table-data-sort-idk-d.json',
    }
  )
})

describe('gn-dataset-view-table', () => {
  beforeEach(() => {
    cy.visit('/webcomponents/gn-dataset-view-table.sample.html')
    cy.get('gn-ui-data-table').should('be.visible')
    cy.get('gn-ui-data-table').find('table').as('table')
  })

  it('should display the table with 10 rows', () => {
    cy.get('@table').find('tbody').children('tr').should('have.length', 10)
    cy.screenshot({ capture: 'fullPage' })
  })

  it('should sort the table on column click', () => {
    cy.get('@table').find('th').eq(1).click()
    cy.get('@table')
      .find('td')
      .eq(1)
      .invoke('text')
      .then((firstValue) => {
        cy.get('@table').find('th').eq(1).click()
        cy.get('@table')
          .find('td')
          .eq(1)
          .invoke('text')
          .should('not.eq', firstValue)
      })
  })

  it('should display 10 rows with different data when clicking next page', () => {
    cy.get('mat-paginator').as('pagination')
    cy.get('@table')
      .find('td')
      .eq(1)
      .invoke('text')
      .then((firstValue) => {
        cy.get('@pagination').find('button').eq(2).click()
        cy.get('@table')
          .find('td')
          .eq(1)
          .invoke('text')
          .should('not.eq', firstValue)
        cy.get('@table').find('tbody').children('tr').should('have.length', 10)
      })
  })
})
