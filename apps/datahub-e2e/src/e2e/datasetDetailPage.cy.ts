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

describe('dataset pages', () => {
  beforeEach(() => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
  })

  describe('GENERAL : display & functions', () => {
    describe('no-link-error block', () => {
      it("shouldn't be there if there are links", () => {
        cy.visit('/dataset/a3774ef6-809d-4dd1-984f-9254f49cbd0a')
        cy.get('[data-test=dataset-has-no-link-block]').should('not.exist')
      })
    })

    describe('navigation bar', () => {
      it('should display the navigation bar', () => {
        cy.get('datahub-record-page')
          .find('datahub-navigation-bar')
          .should('exist')
        cy.get('datahub-record-page')
          .find('[data-cy="backButton"]')
          .should('exist')
        cy.get('datahub-record-page')
          .find('gn-ui-favorite-star')
          .should('exist')
      })
      it('should scroll down when clicking on anchor title', () => {
        //wait for page content to load (download section needing most time)
        cy.get('#downloads').should('be.visible')
        cy.get('[data-cy="resources"]').as('anchorLink')
        cy.get('@anchorLink').click({ force: true })
        cy.window().then((win) => {
          const scrollPosition = win.scrollY
          expect(scrollPosition).to.be.greaterThan(0)
        })
      })
      it('should display the gnUiAnchorLinkInViewClass when scrolling to the anchor', () => {
        //wait for page content to load (download section needing most time)
        cy.get('#downloads').should('be.visible')
        cy.get('#resources').should('be.visible').scrollIntoView()
        cy.get('[data-cy="resources"]').should(
          'have.class',
          '!border-b-primary border-b-4'
        )
      })
    })

    describe('header', () => {
      it('should display the title, favorite star group and arrow back', () => {
        cy.get('datahub-header-record')
          .children('header')
          .find('.font-title')
          .should(($element) => {
            const text = $element.text().trim()
            expect(text).not.to.equal('')
          })
        cy.get('datahub-header-record')
          .children('header')
          .find('gn-ui-favorite-star')
        cy.get('datahub-header-record')
          .children('header')
          .find('[data-cy="backButton"]')
        cy.screenshot({ capture: 'fullPage' })
      })
      it('should display the data type, last update and status', () => {
        cy.visit('/dataset/01491630-78ce-49f3-b479-4b30dabc4c69')
        cy.get('datahub-header-record')
          .children('header')
          .find('.font-title')
          .next()
          .as('infoBar')
        cy.get('@infoBar').children().should('have.length', 3)
      })
      it('should return to the dataset list', () => {
        cy.get('datahub-header-record')
          .children('header')
          .find('[data-cy="backButton"]')
          .click()
        cy.url().should('include', '/search')
      })
    })
  })

  describe('ABOUT SECTION : display & functions', () => {
    describe('display', () => {
      it('should display the description', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-markdown-parser')
          .should(($element) => {
            const text = $element.text().trim()
            expect(text).not.to.equal('')
          })
      })
      it('should display the read more button and expand description', () => {
        cy.visit('/dataset/01491630-78ce-49f3-b479-4b30dabc4c69')
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-max-lines')
          .as('maxLines')
        cy.get('@maxLines').find('.ease-out').should('exist')
        cy.get('[data-cy=readMoreButton]').click()
        cy.get('@maxLines').find('.ease-in').should('exist')
      })
      it('should display the thumbnail image and magnify', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-image-overlay-preview')
          .as('overlay')
          .should('have.length', 1)
        cy.get('@overlay').find('gn-ui-button').click()
        cy.get('[class="basicLightbox__placeholder"]')
          .as('lightbox')
          .find('img')
          .should('have.length', 1)
        cy.get('body').click()
        cy.get('@lightbox').should('have.length', 0)
      })
      it('should display the contact details', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .should('have.length', 1)
        cy.get('[data-cy="contact-email"]')
          .invoke('text')
          .should('include', '@')
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-catalog')
          .should('have.length', 1)
      })
      it('should display the catalog details', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-catalog')
          .children('div')
          .children('p')
          .eq(1)
          .should(($element) => {
            const text = $element.text().trim()
            expect(text).not.to.equal('')
          })
      })
      it('should display the keywords', () => {
        cy.get('gn-ui-expandable-panel').eq(2).click()
        cy.get('gn-ui-badge').should('have.length.gt', 0)
      })
      it('should display three expandable panels', () => {
        cy.get('datahub-record-metadata')
          .find('gn-ui-expandable-panel')
          .should('have.length', 3)
      })
      describe('about section', () => {
        it('should display the lineage', () => {
          cy.get('datahub-record-metadata')
            .find('[id="about"]')
            .find('gn-ui-markdown-parser')
            .should(($element) => {
              const text = $element.text().trim()
              expect(text).not.to.equal('')
            })
        })
        it('should display the data producer elements', () => {
          cy.get('datahub-record-metadata')
            .find('[id="about"]')
            .find('gn-ui-thumbnail')
            .should('be.visible')
          cy.get('datahub-record-metadata')
            .find('[data-cy="organization-name"]')
            .parent()
            .children('div')
            .should('have.length', 4)
        })
        it('should display the resource creation date (for resource), the publication date (for resource), the frequency, the languages and the temporal extent', () => {
          cy.get('datahub-record-metadata')
            .find('[id="about"]')
            .find('gn-ui-expandable-panel')
            .eq(1)
            .click()
          cy.get('gn-ui-expandable-panel')
            .eq(1)
            .children('div')
            .eq(1)
            .children('div')
            .eq(2)
            .children('div')
            .as('aboutContent')
          cy.get('@aboutContent').should('have.length', 5)
          cy.get('@aboutContent')
            .eq(0)
            .children('p')
            .eq(1)
            .should('contain.text', '9/22/2020')
          cy.get('@aboutContent')
            .eq(1)
            .children('p')
            .eq(1)
            .should('contain.text', '3/17/2024')
        })
        it('should not display the same text twice in the constraints', () => {
          // this dataset has the same text for the license and the legal constraints
          cy.visit('/dataset/9e1ea778-d0ce-4b49-90b7-37bc0e448300')
          cy.get('datahub-record-metadata')
            .find('gn-ui-expandable-panel')
            .first()
            .click()
          cy.get('datahub-record-metadata')
            .find('gn-ui-expandable-panel')
            .first()
            .children('div')
            .eq(1)
            .children('div')
            .should('have.length', 1)
        })
      })
    })
    describe('features', () => {
      let keyword
      it('should go to provider website on click', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .children('div')
          .children('div')
          .find('a')
          .first()
          .as('proviLink')

        cy.get('@proviLink')
          .invoke('attr', 'href')
          .then((link) => {
            expect(link).to.eq('https://www.geo2france.fr/')
          })
      })
      it('should go to dataset search page when clicking on org name and filter by org', () => {
        cy.get('[data-cy="organization-name"]').eq(1).click()
        cy.url().should('include', '/search?organization=')
      })
      it('should go to dataset search page when clicking on keyword and filter by keyword', () => {
        cy.get('gn-ui-expandable-panel').eq(2).click()

        cy.get('gn-ui-badge').should('have.length.gt', 0).eq(1).as('keyword')

        cy.get('@keyword').then((key) => {
          keyword = key.text().toUpperCase()
          cy.get('@keyword').first().click()
          cy.url().should('include', '/search?q=')
          cy.get('gn-ui-fuzzy-search')
            .find('input')
            .should('have.value', keyword)
        })
      })
      it('should open the lightbox', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-thumbnail')
          .eq(1)
          .next()
          .find('gn-ui-button')
          .click()
        cy.get('.basicLightbox--visible')
        cy.screenshot({ capture: 'viewport' })
      })
    })

    describe('metadata quality widget enabled', () => {
      beforeEach(() => {
        // this will enable metadata quality widget
        cy.intercept('GET', '/assets/configuration/default.toml', {
          fixture: 'config-with-metadata-quality.toml',
        })
        cy.reload()
      })
      describe('Score is less than 100%', () => {
        it('should display the score', () => {
          cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
            .eq(0)
            .should('have.attr', 'ng-reflect-value', 87)
          cy.screenshot({ capture: 'fullPage' })
        })
        it('should not check all the criteria', () => {
          cy.get('gn-ui-metadata-quality').find('ng-icon').realHover()
          cy.get('gn-ui-metadata-quality-item')
            .find('ng-icon')
            .eq(4)
            .should('have.attr', 'ng-reflect-name', 'matWarningAmber')
        })
      })
      describe('Score is 100%', () => {
        beforeEach(() => {
          cy.visit('/dataset/6d0bfdf4-4e94-48c6-9740-3f9facfd453c')
        })
        it('should display the score', () => {
          cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
            .eq(0)
            .should('have.attr', 'ng-reflect-value', 100)
        })
        it('should check all the criteria if score is 100%', () => {
          cy.get('gn-ui-metadata-quality').find('ng-icon').realHover()
          cy.get('gn-ui-metadata-quality-item')
            .find('ng-icon')
            .eq(4)
            .should('have.attr', 'ng-reflect-name', 'matCheck')
        })
      })
    })
  })

  describe('PREVIEW SECTION : display & functions', () => {
    beforeEach(() => {
      cy.get('datahub-record-metadata')
        .find('[id="preview"]')
        .first()
        .as('previewSection')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(0)
        .as('mapTab')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(1)
        .as('tableTab')
      cy.get('@previewSection')
        .find('.mat-mdc-tab-labels')
        .children('div')
        .eq(2)
        .as('chartTab')
    })
    describe('display', () => {
      it('should display the tabs', () => {
        cy.get('@previewSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .should('have.length', 3)
      })
      it('should display the dataset dropdown with at least 1 option', () => {
        cy.get('@previewSection')
          .find('gn-ui-dropdown-selector')
          .openDropdown()
          .children('button')
          .should('have.length.gt', 1)
      })
      describe('Source under the max features limit', () => {
        it('should display the map and the legend', () => {
          cy.get('@previewSection')
            .find('gn-ui-map-container')
            .should('be.visible')

          cy.get('@previewSection')
            .find('gn-ui-map-legend')
            .should('be.visible')
        })
        it('should display the table with 10 rows', () => {
          cy.get('@tableTab').click()
          cy.get('@previewSection')
            .find('gn-ui-data-table')
            .should('be.visible')
          cy.get('@previewSection')
            .find('gn-ui-data-table')
            .find('table')
            .find('tbody')
            .children('tr')
            .should('have.length', 10)
          cy.screenshot({ capture: 'fullPage' })
        })
        it('should display the chart & dropdowns', () => {
          cy.get('@chartTab').click()
          cy.get('@previewSection')
            .find('gn-ui-chart')
            .should('not.match', ':empty')
          cy.get('@previewSection')
            .find('gn-ui-chart-view')
            .find('gn-ui-dropdown-selector')
            .filter(':visible')
            .as('drop')
          cy.get('@drop').should('have.length', 4)
          cy.screenshot({ capture: 'fullPage' })
        })
        describe('features', () => {
          it('MAP : should open a popup on layer click', () => {
            cy.get('@previewSection').find('canvas').realClick()
            cy.request({
              method: 'GET',
              url: ' https://www.geo2france.fr/geoserver/insee/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=rectangles_200m_menage_erbm&LAYERS=rectangles_200m_menage_erbm&INFO_FORMAT=application%2Fjson&I=249&J=65&WIDTH=296&HEIGHT=296&CRS=EPSG%3A3857&STYLES=&BBOX=-24459.849051256402%2C6237261.508070382%2C337545.9169073383%2C6599267.274028977',
              failOnStatusCode: false,
            })
            cy.get('@previewSection').find('gn-ui-feature-detail')
          })
          describe('TABLE', () => {
            beforeEach(() => {
              cy.get('@previewSection')
                .find('.mat-mdc-tab-labels')
                .children('div')
                .eq(1)
                .click()
              cy.get('@previewSection')
                .find('gn-ui-data-table')
                .find('table')
                .as('table')
            })

            it('TABLE sort: should sort the table on column click', () => {
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
            it('TABLE pagination: should display 10 rows with different data when clicking next page', () => {
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
                  cy.get('@table')
                    .find('tbody')
                    .children('tr')
                    .should('have.length', 10)
                })
            })
          })
          it('CHART : should change the chart on options change', () => {
            cy.get('@previewSection')
              .find('.mat-mdc-tab-labels')
              .children('div')
              .eq(2)
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
          })
        })
      })
      describe('WFS over the max features limit', () => {
        beforeEach(() => {
          cy.intercept('GET', '/assets/configuration/default.toml', {
            fixture: 'config-with-max-features.toml',
          })
          cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
        })
        it('should not show the map and chart previews and display an error message', () => {
          cy.get('@previewSection')
            .find('gn-ui-dropdown-selector')
            .openDropdown()
            .children('button')
            .eq(1)
            .click()
          cy.get('gn-ui-map-container').should('not.exist')
          cy.get('gn-ui-popup-alert').should('be.visible')
          cy.get('@chartTab').click()
          cy.get('gn-ui-chart').should('not.exist')
          cy.get('gn-ui-popup-alert').should('be.visible')
        })
        it('should still show the table preview', () => {
          cy.get('@tableTab').click()
          cy.get('gn-ui-data-table').should('be.visible')
          cy.get('gn-ui-popup-alert').should('not.exist')
        })
      })
      it('should display the sharing options', () => {
        cy.get('gn-ui-data-view-share').should('be.visible')
      })
    })
    // skip for now as modifying dump on my side breaks all tests on GN 4.2.2
    describe.skip('restricted access', () => {
      beforeEach(() => {
        cy.visit('dataset/e27e7006-fdf9-4004-b6c5-af2a5a5c025c')
      })
      it('MAP: should display the access restriction message for WMS and WFS', () => {
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
      })
      it('TABLE: should display the access restriction message for WFS', () => {
        cy.get('@tableTab').click()
        cy.get('gn-ui-popup-alert')
          .should('be.visible')
          .should('have.text', 'Access to this resource is restricted')
      })
      it('CHART: should display the access restriction message for WFS', () => {
        cy.get('@chartTab').click()
        cy.get('gn-ui-popup-alert')
          .should('be.visible')
          .should('have.text', 'Access to this resource is restricted')
      })
    })
  })

  describe('DOWNLOADS : display & functions', () => {
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

  describe('LINKS : display & functions', () => {
    describe('display', () => {
      it('should have external, API and internal links with one option', () => {
        cy.get('datahub-record-otherlinks')
          .find('gn-ui-link-card')
          .should('have.length.gt', 0)
        cy.get('datahub-record-apis')
          .find('gn-ui-api-card')
          .should('have.length.gt', 0)
      })
      it('should not display carousel dot button for 4 link cards', () => {
        cy.get('datahub-record-otherlinks')
          .find('.pagination-dot')
          .should('exist')
      })
      it('should not display carousel dot button for 2 API cards', () => {
        cy.get('datahub-record-apis')
          .find('.pagination-dot')
          .should('not.exist')
      })
    })
    describe('features', () => {
      it('goes to external link on click', () => {
        cy.get('datahub-record-otherlinks')
          .find('gn-ui-link-card')
          .first()
          .children('a')
          .as('proviLink')

        cy.get('@proviLink')
          .invoke('attr', 'href')
          .then((link) => {
            expect(link).to.eq(
              'https://www.data.gouv.fr/fr/datasets/donnees-carroyees-a-200-m-sur-la-population/'
            )
          })
      })
      it('copies the API path on click', () => {
        cy.get('datahub-record-apis')
          .find('gn-ui-copy-text-button')
          .find('button')
          .first()
          .realClick()
        // attempt to make the whole page focused
        cy.get('body').focus()
        cy.get('body').realClick()
        cy.window().then((win) => {
          win.navigator.clipboard.readText().then((text) => {
            expect(text).to.eq('https://www.geo2france.fr/geoserver/insee/ows')
          })
        })
      })
      describe('related records', () => {
        beforeEach(() => {
          cy.visit('/dataset/a3774ef6-809d-4dd1-984f-9254f49cbd0a')
        })
        it('should display the related records', () => {
          cy.get('#related')
            .find('datahub-record-related-records')
            .find('gn-ui-related-record-card')
            .should('have.length.gt', 0)
        })
        it('should display a similar related record', () => {
          cy.get('#related')
            .find('datahub-record-related-records')
            .find('gn-ui-related-record-card')
            .first()
            .find('h4')
            .should(
              'have.text',
              ` Metadata for E2E testing purpose. (this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut) `
            )
        })
        it('goes to dataset on click', () => {
          let targetLink
          cy.get('#related')
            .find('datahub-record-related-records')
            .find('gn-ui-related-record-card')
            .first()
            .children('a')
            .as('proviLink')

          cy.get('@proviLink')
            .invoke('attr', 'href')
            .then((link) => {
              targetLink = link
              cy.get('@proviLink').invoke('removeAttr', 'target').click()
              cy.url().should('include', targetLink)
            })
        })
      })

      describe('When there is no link', () => {
        beforeEach(() => {
          cy.visit('/dataset/a3774ef6-809d-4dd1-984f-9254f49cbd0a')
        })
        it('do not display the no-link-error warning initially, only after loading', () => {
          // wait for metadata info to show up
          cy.get('gn-ui-metadata-info').should('exist')
          // first, the block is not visible
          cy.get('[data-test="dataset-has-no-link-block"]').should('not.exist')
          // then the block shows up
          cy.get('[data-test="dataset-has-no-link-block"]').should('exist')
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

describe('api cards', () => {
  beforeEach(() => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
    cy.get('gn-ui-api-card').eq(1).as('firstCard')
  })

  it('should display the open panel button', () => {
    cy.get('@firstCard')
      .find('button')
      .children('ng-icon')
      .eq(1)
      .invoke('attr', 'name')
      .should('equal', 'iconoirSettings')
  })
  it('should open and close the panel on click on open panel button', () => {
    cy.get('@firstCard').find('button').eq(1).click()
    cy.get('gn-ui-record-api-form').should('be.visible')
    cy.screenshot({ capture: 'fullPage' })
    cy.get('@firstCard').find('button').eq(1).click()
    cy.get('gn-ui-record-api-form').should('not.be.visible')
  })
})

describe('api form', () => {
  describe('When the api link is ok', () => {
    beforeEach(() => {
      cy.visit('/dataset/accroche_velos')
      cy.get('gn-ui-api-card').first().find('button').eq(1).click()
      cy.get('gn-ui-record-api-form').children('div').as('apiForm')
    })
    it('should have request inputs', () => {
      cy.get('@apiForm').find('gn-ui-text-input').should('have.length', 2)
      cy.get('@apiForm')
        .find('gn-ui-dropdown-selector')
        .should('have.length', 1)
      cy.get('@apiForm')
        .children('div')
        .first()
        .children('div')
        .first()
        .find('button')
        .should('have.length', 1)
      cy.get('@apiForm').find('gn-ui-copy-text-button').should('have.length', 1)
    })
    it('should change url on input change', () => {
      cy.get('@apiForm')
        .find('gn-ui-copy-text-button')
        .find('input')
        .invoke('val')
        .then((url) => {
          cy.get('@apiForm').find('gn-ui-text-input').first().clear()
          cy.get('@apiForm').find('gn-ui-text-input').first().type('54')
          cy.get('@apiForm')
            .find('gn-ui-copy-text-button')
            .find('input')
            .invoke('val')
            .should('not.eq', url)
            .and('include', '54')
        })
    })
    it('should set limit to zero on click on "All" button', () => {
      cy.get('@apiForm').find('gn-ui-text-input').first().clear()
      cy.get('@apiForm').find('gn-ui-text-input').first().type('54')
      cy.get('@apiForm').find('input[type="checkbox"]').check()
      cy.get('@apiForm')
        .find('gn-ui-text-input')
        .first()
        .should('have.value', '')
    })
    it('should reset all 3 inputs and link on click', () => {
      cy.get('@apiForm').find('gn-ui-text-input').first().as('firstInput')
      cy.get('@firstInput').clear()
      cy.get('@firstInput').type('54')

      cy.get('@apiForm').find('gn-ui-text-input').eq(1).as('secondInput')
      cy.get('@secondInput').clear()
      cy.get('@secondInput').type('87')

      cy.get('@apiForm').find('gn-ui-dropdown-selector').as('dropdown')
      cy.get('@dropdown').eq(0).selectDropdownOption('application/geo+json')

      cy.get('@apiForm')
        .find('gn-ui-copy-text-button')
        .find('input')
        .invoke('val')
        .should('include', 'f=geojson&limit=54&offset=87')

      cy.get('@apiForm').children('div').first().find('button').first().click()

      cy.get('@firstInput').find('input').should('have.value', '')
      cy.get('@secondInput').find('input').should('have.value', '')
      cy.get('@apiForm')
        .find('gn-ui-dropdown-selector')
        .find('button')
        .children('div')
        .should('have.text', ' JSON ')
      cy.get('@apiForm')
        .find('gn-ui-copy-text-button')
        .find('input')
        .invoke('val')
        .should('include', 'f=application%2Fjson&limit=-1')
    })
    it('should close the panel on click', () => {
      cy.get('gn-ui-record-api-form').prev().find('button').click()
      cy.get('gn-ui-record-api-form').should('not.be.visible')
    })
    it('should switch to other card url if card already open', () => {
      cy.get('@apiForm')
        .find('gn-ui-copy-text-button')
        .find('input')
        .invoke('val')
        .then((url) => {
          cy.get('@apiForm').find('gn-ui-text-input').first().clear()
          cy.get('@apiForm').find('gn-ui-text-input').first().type('54')
          cy.get('gn-ui-api-card').eq(1).find('button').eq(1).click()
          cy.get('@apiForm')
            .find('gn-ui-copy-text-button')
            .find('input')
            .invoke('val')
            .should('not.eq', url)
        })
    })
  })
})

describe('userFeedback', () => {
  describe('when not logged in', () => {
    beforeEach(() => {
      cy.visit('/dataset/accroche_velos')
      cy.get('datahub-record-user-feedbacks').as('userFeedback')
    })
    it('should sort comments', () => {
      cy.get('gn-ui-user-feedback-item')
        .find('[data-cy="commentText"]')
        .as('commentText')

      cy.get('@commentText')
        .first()
        .then((div) => {
          const firstCommentBeforeSort = div.text().trim()
          cy.get('@userFeedback')
            .find('gn-ui-dropdown-selector')
            .openDropdown()
            .children('button')
            .eq(1)
            .click()

          cy.get('gn-ui-user-feedback-item')
            .find('[data-cy="commentText"]')
            .first()
            .invoke('text')
            .invoke('trim')
            .should('not.eq', firstCommentBeforeSort)
        })
    })
    it("shouldn't be able to comment", () => {
      cy.get('datahub-record-user-feedbacks')
        .find('gn-ui-text-area')
        .should('not.exist')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/dataset/accroche_velos')
    })
    it('should publish a comment', () => {
      cy.get('datahub-record-user-feedbacks')
        .find('gn-ui-text-area')
        .first()
        .should('exist')
        .type('Something')

      cy.get('datahub-record-user-feedbacks')
        .find('gn-ui-button')
        .eq(1)
        .should('exist')
    })
    it('should answer to a comment', () => {
      cy.get('gn-ui-user-feedback-item')
        .find('gn-ui-text-area')
        .first()
        .should('exist')
        .type('Something')

      cy.get('gn-ui-user-feedback-item')
        .find('gn-ui-button')
        .eq(0)
        .should('exist')
    })
  })
})

describe('When the metadata does not exists', () => {
  beforeEach(() => {
    cy.visit('/dataset/xyz')
  })
  it('should display an error message', () => {
    cy.get('gn-ui-error').should('exist')
    cy.screenshot({ capture: 'viewport' })
  })
})
