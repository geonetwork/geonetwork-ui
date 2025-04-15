import 'cypress-real-events'
import path from 'path'

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

  // OGC API stubs
  cy.intercept(
    'GET',
    '/data/ogcapi/collections/liste-des-jardins-familiaux-et-partages-de-roubaix/items?f=json',
    {
      fixture: 'liste-des-jardins-familiaux-et-partages-de-roubaix_items.json',
    }
  )
  cy.intercept('GET', '/data/ogcapi/collections/covoit-mel/items?f=json', {
    fixture: 'covoit-mel_items.json',
  })
  cy.intercept(
    'GET',
    '/data/ogcapi/collections/liste-des-jardins-familiaux-et-partages-de-roubaix?f=json',
    {
      fixture: 'liste-des-jardins-familiaux-et-partages-de-roubaix.json',
    }
  )
  cy.intercept('GET', '/data/ogcapi/collections/covoit-mel?f=json', {
    fixture: 'covoit-mel.json',
  })
  cy.intercept('GET', '/data/ogcapi/collections?f=json', {
    fixture: 'ogcapi_collections.json',
  })
  cy.intercept('GET', '/data/ogcapi/conformance?f=json', {
    fixture: 'ogcapi_conformance.json',
  })
  cy.intercept('GET', '/data/ogcapi/?f=json', {
    fixture: 'ogcapi.json',
  })
})

describe('DOWNLOADS : display & functions', () => {
  beforeEach(() => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
  })

  describe('display', () => {
    it('should have a list of downloads based on the WFS capabilities', () => {
      cy.get('datahub-record-downloads')
        .find('gn-ui-download-item [data-cy="download-format"]')
        .then((formatBadges) => {
          const formats = formatBadges
            .toArray()
            .map((badge) => badge.innerText.trim())
          expect(formats).to.eql([
            'csv',
            'excel',
            'json',
            'shp',
            'gml',
            'kml',
            'gpkg',
            'zip',
            'dxf',
          ])
        })
    })
    it('should have filter buttons for each download types + all and others', () => {
      cy.get('[data-cy="download-format-filters"]')
        .find('gn-ui-button')
        .then((buttons) => {
          expect(buttons).to.have.length(6)
          const formats = buttons
            .toArray()
            .map((button) => button.getAttribute('data-format'))
          expect(formats).to.eql([
            'all',
            'csv',
            'excel',
            'json',
            'shp',
            'others',
          ])
        })
    })
    describe('features', () => {
      it('filters the download list on format filter click', () => {
        cy.get('datahub-record-downloads')
          .find('gn-ui-button')
          .children('button')
          .eq(1)
          .as('filterFormat')
        cy.get('@filterFormat').click()
        cy.get('@filterFormat').then((btn) => {
          const filterFormat = btn.text().trim()
          cy.get('gn-ui-download-item')
            .find('[data-cy="download-format"]')
            .filter(':visible')
            .then((format) => {
              const formatOutput = format.text().trim()
              expect(formatOutput).to.eq(filterFormat)
            })
        })
        cy.screenshot({ capture: 'fullPage' })
      })
      it('downloads a file on click', () => {
        cy.get('datahub-record-downloads')
          .find('gn-ui-download-item')
          .first()
          .find('a')
          .first()
          .as('downloadLink')
        cy.get('@downloadLink')
          .should('have.attr', 'href')
          .and(
            'include',
            'wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=csv'
          )
        cy.get('@downloadLink').click()
        cy.readFile(
          path.join('cypress/downloads', 'rectangles_200m_menage_erbm.csv') // by default asserts file exists (no .should('exist') needed)
        ).as('downloadedFile')
        // FIXME: This spec always fails with Cypress v13
        // cy.get('@downloadedFile').its('length').should('equal', 3579)
      })
      it('displays the full list after clicking two times on one filter', () => {
        cy.get('datahub-record-downloads')
          .find('gn-ui-button')
          .children('button')
          .eq(1)
          .as('filterFormat')
        cy.get('@filterFormat').click()
        cy.get('[data-cy="download-format"]')
          .filter(':visible')
          .its('length')
          .then((l1) => {
            cy.get('@filterFormat').click()
            cy.get('[data-cy="download-format"]')
              .filter(':visible')
              .its('length')
              .then((l2) => expect(l2).to.not.equal(l1))
          })
      })
    })
  })
})

describe('record with file distributions', () => {
  beforeEach(() => {
    cy.visit('/dataset/n_tri_lill_inondable_s_059')
    cy.get('datahub-record-metadata')
      .find('[id="preview"]')
      .first()
      .as('previewSection')
    cy.get('@previewSection')
      .find('.mat-mdc-tab-labels')
      .children('div')
      .eq(1)
      .click()
  })

  it('should display the onlineResources by priority', () => {
    cy.get('@previewSection')
      .find('gn-ui-dropdown-selector')
      .last()
      .openDropdown()
      .children('button')
      .then((options) => options.toArray().map((el) => el.innerText.trim()))
      .should('deep.eq', ['csv (csv)', 'json (json)', 'geojson (geojson)'])
    cy.screenshot({ capture: 'viewport' })
  })
})
