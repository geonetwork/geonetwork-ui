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
    '/geoserver/insee/ows?SERVICE=WMS&REQUEST=GetCapabilities',
    {
      fixture: 'insee-wfs-getcapabilities.xml',
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
    'geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson&PROPERTYNAME=oid%2Cidk%2Cmen%2Cmen_occ5%2Cpt_men_occ5&COUNT=10&SRSNAME=EPSG%3A4326&SORTBY=idk+D',
    {
      fixture: 'insee-wfs-table-data-sort-idk.json',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/ows?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&STYLES=&TRANSPARENT=true&LAYERS=rectangles_200m_menage_erbm*',
    {
      fixture: 'insee-rectangles_200m_menage_erbm.png',
    }
  )
  cy.intercept(
    'GET',
    '/geoserver/insee/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=csv',
    {
      fixture: 'insee-rectangles_200m_menage_erbm.csv',
    }
  )

  // OPENDATASOFT stub
  cy.intercept(
    'GET',
    '/explore/dataset/population-millesimee-communes-francaises/download?format=csv&timezone=Europe/Berlin&use_labels_for_header=false',
    {
      fixture: 'population-millesimee-communes-francaises.csv',
    }
  )
})

describe('Preview section', () => {
  it('display & functions', () => {
    // Testing a dataset with TMS endpoint in error
    cy.visit('/dataset/zzz_nl_test_wfs_syth_la_ciotat')

    // it should show the map and display an error message
    cy.get('gn-ui-map-container').should('exist')
    cy.get('gn-ui-popup-alert').should('be.visible')

    // it should have API links
    cy.get('datahub-record-apis')
      .find('gn-ui-api-card')
      .should('have.length.gt', 0)

    // Testing a dataset for default behavior on preview section
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    cy.get('datahub-record-metadata')
      .find('[id="preview"]')
      .first()
      .as('previewSection')
    cy.get('@previewSection')
      .find('.mat-mdc-tab-labels')
      .children('div')
      .eq(1)
      .as('mapTab')
    cy.get('@previewSection')
      .find('.mat-mdc-tab-labels')
      .children('div')
      .eq(2)
      .as('tableTab')
    cy.get('@previewSection')
      .find('.mat-mdc-tab-labels')
      .children('div')
      .eq(3)
      .as('chartTab')

    // it should display the tabs
    cy.get('@previewSection')
      .find('.mat-mdc-tab-labels')
      .children('div')
      .should('have.length', 4)

    // it should display the dataset dropdown with at least 1 option
    cy.get('@previewSection')
      .find('gn-ui-dropdown-selector')
      .eq(0)
      .openDropdown()
      .children('button')
      .should('have.length.gt', 1)
    cy.clickOnBody()

    // it checks if style selector is disabled when no style is available
    cy.get('@previewSection')
      .find('gn-ui-dropdown-selector')
      .eq(1)
      .should('exist')
      .should('have.attr', 'ng-reflect-disabled', 'true')

    // Source under the max features limit

    // it should display the map and the legend
    cy.get('@previewSection').find('gn-ui-map-container').should('be.visible')
    cy.get('@previewSection').find('gn-ui-map-legend').should('be.visible')

    // MAP : should open a popup on layer click
    cy.get('@previewSection').find('canvas').realClick()
    cy.get('@previewSection').find('gn-ui-feature-detail')

    // it should display the table with 10 rows
    cy.get('@tableTab').click()
    cy.get('@previewSection').find('gn-ui-data-table').should('be.visible')
    cy.get('@previewSection')
      .find('gn-ui-data-table')
      .find('table')
      .find('tbody')
      .children('tr')
      .should('have.length', 10)
    cy.screenshot({ capture: 'fullPage' })

    // it should display the chart & dropdowns
    cy.get('@chartTab').click()
    cy.get('@previewSection').find('gn-ui-chart').should('not.match', ':empty')
    cy.get('@previewSection')
      .find('gn-ui-chart-view')
      .find('gn-ui-dropdown-selector')
      .filter(':visible')
      .as('drop')
    cy.get('@drop').should('have.length', 4)
    cy.screenshot({ capture: 'fullPage' })

    // TABLE
    cy.get('@previewSection')
      .find('.mat-mdc-tab-labels')
      .children('div')
      .eq(2)
      .click()
    cy.get('@previewSection').find('gn-ui-data-table').find('table').as('table')

    // TABLE sort: should sort the table on column click
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

    // TABLE pagination: should display 10 rows with different data when clicking next page
    cy.get('@previewSection').find('mat-paginator').as('pagination')
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

    // CHART : should change the chart on options change
    cy.get('@previewSection')
      .find('.mat-mdc-tab-labels')
      .children('div')
      .eq(3)
      .click()
    cy.get('@previewSection')
      .find('gn-ui-chart-view')
      .find('gn-ui-dropdown-selector')
      .filter(':visible')
      .as('drop')
    cy.get('@drop').eq(0).selectDropdownOption('pie')
    cy.get('@drop').eq(2).selectDropdownOption('men')
    cy.get('@drop').eq(3).selectDropdownOption('average')
    cy.get('@previewSection')
      .find('gn-ui-chart')
      .invoke('attr', 'ng-reflect-type')
      .should('include', 'pie')
    cy.get('@previewSection')
      .find('gn-ui-chart')
      .invoke('attr', 'ng-reflect-value-property')
      .should('include', 'average(men)')

    // WFS over the max features limit

    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-max-features.toml',
    })
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    // it should not show the map and chart previews and display an error message
    cy.get('@previewSection')
      .find('gn-ui-dropdown-selector')
      .eq(0)
      .openDropdown()
      .children('button')
      .eq(1)
      .click()
    cy.get('gn-ui-map-container').should('not.exist')
    cy.get('gn-ui-popup-alert').should('be.visible')
    cy.get('@chartTab').click()
    cy.get('gn-ui-chart').should('not.exist')
    cy.get('gn-ui-popup-alert').should('be.visible')

    // it should still show the table preview
    cy.get('@tableTab').click()
    cy.get('gn-ui-data-table').should('be.visible')
    cy.get('gn-ui-popup-alert').should('not.exist')

    // it should display the sharing options
    cy.get('gn-ui-data-view-share').should('be.visible')
  })

  // skip for now as modifying dump on my side breaks all tests on GN 4.2.2
  it.skip('restricted access', () => {
    cy.visit('dataset/e27e7006-fdf9-4004-b6c5-af2a5a5c025c')

    // MAP: should display the access restriction message for WMS and WFS
    cy.get('@mapTab').click()
    // WMS
    cy.get('gn-ui-popup-alert')
      .should('be.visible')
      .should('have.text', 'Access to this resource is restricted')
    // WFS
    cy.get('gn-ui-dropdown-selector')
      .eq(0)
      .openDropdown()
      .children('button')
      .eq(1)
      .click()
    cy.get('gn-ui-popup-alert')
      .should('be.visible')
      .should('have.text', 'Access to this resource is restricted')

    // TABLE: should display the access restriction message for WFS
    cy.get('@tableTab').click()
    cy.get('gn-ui-popup-alert')
      .should('be.visible')
      .should('have.text', 'Access to this resource is restricted')

    // CHART: should display the access restriction message for WFS
    cy.get('@chartTab').click()
    cy.get('gn-ui-popup-alert')
      .should('be.visible')
      .should('have.text', 'Access to this resource is restricted')
  })
  describe('Dataviz configuration', () => {
    beforeEach(() => {
      cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
      cy.get('datahub-record-metadata')
        .find('[id="preview"]')
        .first()
        .as('previewSection')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(0)
        .as('configTab')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(1)
        .as('mapTab')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(2)
        .as('tableTab')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(3)
        .as('chartTab')
    })
    it('should NOT show the config saving btn when logged out', () => {
      cy.get('@configTab').find('gn-ui-button').should('not.exist')
    })
    describe('Logged in as admin', () => {
      beforeEach(() => {
        cy.login()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
      })
      it('should show the config saving btn', () => {
        cy.get('@configTab')
          .find('gn-ui-button')
          .should('have.text', ' Set as default preview ')
      })
      it('should save and use a map config with TMS styles', () => {
        cy.visit('/dataset/zzz_nl_test_wfs_syth_la_ciotat')
        cy.get('@previewSection')
          .find('gn-ui-dropdown-selector')
          .eq(0)
          .selectDropdownOption(
            'Plan IGN Tuiles vectorielles (TMS)-https://data.geopf.fr/tms/1.0.0/PLAN.IGN'
          )
        // TMS styles need time to load
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get('@previewSection')
          .find('gn-ui-dropdown-selector')
          .eq(1)
          .selectDropdownOption('4')
        cy.get('@configTab').find('gn-ui-button').click()
        cy.visit('/dataset/zzz_nl_test_wfs_syth_la_ciotat')
        cy.get('@mapTab').invoke('attr', 'aria-selected').should('eq', 'true')
        cy.get('@previewSection')
          .find('gn-ui-dropdown-selector')
          .eq(0)
          .invoke('attr', 'ng-reflect-selected')
          .should('include', 'Plan IGN Tuiles vectorielles')
        cy.get('@previewSection')
          .find('gn-ui-dropdown-selector')
          .eq(1)
          .invoke('attr', 'ng-reflect-selected')
          .should('eq', '4')
      })
      it('should save and use a table config', () => {
        cy.get('@tableTab').click()
        cy.get('@configTab').find('gn-ui-button').click()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        cy.get('@tableTab').invoke('attr', 'aria-selected').should('eq', 'true')
      })
      it('should save and use a chart config with custom props', () => {
        cy.get('@chartTab').click()
        // everytime a dropdown option is selected the tab goes back to table view in e2e tests
        cy.get('@chartTab').click()
        cy.get('@previewSection')
          .find('gn-ui-chart-view')
          .find('gn-ui-dropdown-selector')
          .filter(':visible')
          .as('drop')
        cy.get('@drop').eq(0).selectDropdownOption('pie')
        cy.get('@drop').eq(2).selectDropdownOption('men')
        cy.get('@drop').eq(3).selectDropdownOption('average')
        cy.get('@configTab').find('gn-ui-button').click()
        cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        cy.get('@chartTab').invoke('attr', 'aria-selected').should('eq', 'true')
        cy.get('@previewSection')
          .find('gn-ui-chart')
          .invoke('attr', 'ng-reflect-type')
          .should('include', 'pie')
        cy.get('@previewSection')
          .find('gn-ui-chart')
          .invoke('attr', 'ng-reflect-value-property')
          .should('include', 'average(men)')
      })
      describe('When config points to map layer but layer has been removed', () => {
        beforeEach(() => {
          cy.intercept(
            'POST',
            '/geonetwork/srv/api/search/records/_search?bucket=bucket&relatedType=fcats&relatedType=hassources',
            {
              fixture: 'tms-record-source-removed.json',
            }
          )
          cy.visit('/dataset/zzz_nl_test_wfs_syth_la_ciotat')
        })
        it('should ignore the config and select the first link of view', () => {
          cy.get('@previewSection')
            .find('gn-ui-dropdown-selector')
            .eq(0)
            .invoke('text')
            .should('include', 'la_ciotat')
          cy.get('@previewSection')
            .find('gn-ui-dropdown-selector')
            .eq(1)
            .should('exist')
            .should('have.attr', 'ng-reflect-disabled', 'true')
        })
      })
    })
  })
})
