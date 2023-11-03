import 'cypress-real-events'

describe('dataset pages', () => {
  beforeEach(() => {
    // dataset without API, preview or downloads
    // cy.visit('/dataset/011963da-afc0-494c-a2cc-5cbd59e122e4')
    // dataset with map error
    // cy.visit('/dataset/6d0bfdf4-4e94-48c6-9740-3f9facfd453c')
    // dataset with stuff greyed out & unknown data types
    // cy.visit('/dataset/8698bf0b-fceb-4f0f-989b-111e7c4af0a4')
    // dataset with pretty much everything
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

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
      '/geoserver/insee/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=rectangles_200m_menage_erbm*',
      {
        fixture: 'insee-rectangles_200m_menage_erbm.png',
      }
    )
    cy.intercept(
      'GET',
      '/geoserver/insee/ows?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=application%2Fjson*',
      {
        fixture: 'insee-rectangles_200m_menage_erbm.json',
      }
    )
    cy.intercept(
      'GET',
      '/geoserver/insee/ows?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=insee%3Arectangles_200m_menage_erbm&OUTPUTFORMAT=csv',
      {
        fixture: 'population-millesimee-communes-francaises.csv',
      }
    )
    cy.intercept(
      'GET',
      '/explore/dataset/population-millesimee-communes-francaises/download?format=csv&timezone=Europe/Berlin&use_labels_for_header=false',
      {
        fixture: 'population-millesimee-communes-francaises.csv',
      }
    )
  })

  describe('GENERAL : display & functions', () => {
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
          .find('gn-ui-navigation-button')
      })
      it('should return to the dataset list', () => {
        cy.get('datahub-header-record')
          .children('header')
          .find('gn-ui-navigation-button')
          .click()
        cy.url().should('include', '/search')
      })
    })
    describe('navigation bar', () => {
      it('should display the navigation  bar with 4 sections', () => {
        cy.get('datahub-navigation-bar')
          .find('button')
          .filter(':visible')
          .should('have.length', 4)
      })
      it('should scroll down/up to the clicked section', () => {
        cy.get('datahub-navigation-bar')
          .find('button')
          .filter(':visible')
          .as('navBtns')
        cy.get('@navBtns').eq(3).click()
        cy.get('datahub-record-otherlinks').should('be.visible')
      })
    })
  })

  describe('ABOUT SECTION : display & functions', () => {
    describe('display', () => {
      it('should display the description', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-info')
          .find('gn-ui-content-ghost')
          .children('p')
          .should(($element) => {
            const text = $element.text().trim()
            expect(text).not.to.equal('')
          })
      })
      it('should display the contact details', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .should('have.length', 1)
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .children('div')
          .children('a')
          .eq(0)
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
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-info')
          .children('div')
          .eq(1)
          .children('gn-ui-badge')
          .should('have.length.gt', 0)
      })
      it('should display the lineage and usage tabs', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-info')
          .find('gn-ui-expandable-panel')
      })
    })
    describe('features', () => {
      let targetLink
      let keyword
      it('should go to provider website on click', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .children('div')
          .children('div')
          .find('a')
          .as('proviLink')

        cy.get('@proviLink')
          .invoke('attr', 'href')
          .then((link) => {
            targetLink = link
            cy.get('@proviLink').invoke('removeAttr', 'target').click()
            cy.url().should('include', targetLink)
          })
      })
      it('should go to dataset search page when clicking on org name and filter by org', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-contact')
          .children('div')
          .children('div')
          .children('div')
          .first()
          .click()
        cy.url().should('include', '/search?publisher=')
      })
      it('should go to dataset search page when clicking on keyword and filter by keyword', () => {
        cy.get('datahub-record-metadata')
          .find('[id="about"]')
          .find('gn-ui-metadata-info')
          .children('div')
          .eq(1)
          .children('gn-ui-badge')
          .first()
          .as('keyword')

        cy.get('@keyword')
          .children('div')
          .then((key) => {
            keyword = key.text().toUpperCase()
            cy.get('@keyword').click()
            cy.url().should('include', '/search?q=')
            cy.get('gn-ui-fuzzy-search')
              .find('input')
              .should('have.value', keyword)
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
      it('should display the map', () => {
        cy.get('@previewSection').find('gn-ui-map').should('be.visible')
      })
      it('should display the table', () => {
        cy.get('@previewSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(1)
          .click()
        cy.get('@previewSection').find('gn-ui-table').should('be.visible')
        cy.get('@previewSection')
          .find('gn-ui-table')
          .find('table')
          .find('tbody')
          .children('tr')
          .should('have.length.gt', 0)
      })
      it('should display the chart & dropdowns', () => {
        cy.get('@previewSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(2)
          .click()
        cy.get('@previewSection')
          .find('gn-ui-chart')
          .should('not.match', ':empty')
        cy.get('@previewSection')
          .find('gn-ui-chart-view')
          .find('gn-ui-dropdown-selector')
          .filter(':visible')
          .as('drop')
        cy.get('@drop').should('have.length', 4)
        cy.get('@drop').each((dropdown) => {
          cy.wrap(dropdown)
            .openDropdown()
            .find('button')
            .should('have.length.greaterThan', 0)
        })
      })
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
      it('TABLE : should scroll', () => {
        cy.get('@previewSection')
          .find('.mat-mdc-tab-labels')
          .children('div')
          .eq(1)
          .click()
        cy.get('@previewSection').find('gn-ui-table').find('table').as('table')
        cy.get('@table').scrollTo('bottom', { ensureScrollable: false })

        cy.get('@table').find('tr:last-child').should('be.visible')
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

  describe('DOWNLOADS : display & functions', () => {
    describe('display', () => {
      it('should have at least one download button', () => {
        cy.get('datahub-record-downloads')
          .find('gn-ui-download-item')
          .should('have.length.gt', 0)
      })
      it('should have one button per download type + all and others', () => {
        cy.get('[data-cy="download-format"]').then((format) => {
          const formatString = format.text()
          cy.get('datahub-record-downloads')
            .find('gn-ui-button')
            .children('button')
            .then((btn) => {
              const buttons = btn.text()
              let btnList = []
              buttons.split(' ').map((btnVal) => btnList.push(btnVal.trim()))
              btnList = btnList.filter((item) => item !== '')
              expect(btnList).to.include('All')
              btnList.forEach((format) => {
                const allowedFormats = ['csv', 'excel', 'json', 'shp']
                if (allowedFormats.includes(format)) {
                  expect(formatString).to.contain(format)
                } else if (!allowedFormats.includes(format)) {
                  if (format == 'geojson') {
                    expect(formatString).to.contain('json')
                  } else {
                    expect(btnList).to.include('Others')
                  }
                }
              })
            })
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
            cy.get('[data-cy="download-format"]')
              .filter(':visible')
              .then((format) => {
                const formatOutput = format.text().trim()
                expect(formatOutput).to.eq(filterFormat)
              })
          })
        })
        it('downloads a file on click', () => {
          cy.get('datahub-record-downloads')
            .find('gn-ui-download-item')
            .first()
            .click()
          cy.exec('ls cypress/downloads').then((result) => {
            const fileList = result.stdout.split('\n')

            const isFileDownloaded = fileList[0]
            expect(/\S/.test(isFileDownloaded)).to.be.true
          })
        })
        it('displays the full list after clicking two times on one filter', () => {
          cy.get('gn-ui-data-downloads')
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
        cy.get('#related-records')
          .find('datahub-record-related-records')
          .find('gn-ui-related-record-card')
          .should('have.length.gt', 0)
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
          .click({ force: true })
        // attempt to make the whole page focused
        cy.get('body').focus()
        cy.get('body').realClick()
        cy.window().then((win) => {
          win.navigator.clipboard.readText().then((text) => {
            expect(text).to.eq('https://www.geo2france.fr/geoserver/insee/ows')
          })
        })
      })
      it('goes to dataset on click', () => {
        let targetLink
        cy.get('#related-records')
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

  it('should display the distributions by priority', () => {
    cy.get('@previewSection')
      .find('gn-ui-dropdown-selector')
      .last()
      .openDropdown()
      .children('button')
      .then((options) => options.toArray().map((el) => el.innerText.trim()))
      .should('deep.eq', ['csv (csv)', 'json (json)', 'geojson (geojson)'])
  })
})
