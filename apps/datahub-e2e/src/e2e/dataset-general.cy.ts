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
  it('GENERAL : display & functions', () => {
    // no-link-error block
    // it shouldn't be there if there are links
    cy.visit('/dataset/a3774ef6-809d-4dd1-984f-9254f49cbd0a')
    cy.get('[data-test=dataset-has-no-link-block]').should('not.exist')

    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    // navigation bar
    // it should display the navigation bar, with favorite star and arrow back
    cy.get('datahub-record-page').find('datahub-navigation-bar').should('exist')
    cy.get('datahub-record-page').find('[data-cy="backButton"]').should('exist')
    cy.get('datahub-record-page').find('gn-ui-favorite-star').should('exist')

    // it should display the gnUiAnchorLinkInViewClass when scrolling to the anchor
    cy.get('#user-feedbacks').should('be.visible')
    cy.get('#user-feedbacks').should('be.visible').scrollIntoView()
    cy.get('[data-cy="user-feedbacks"]').should(
      'have.class',
      '!border-b-primary border-b-4'
    )

    // it should scroll down when clicking on anchor title
    cy.get('datahub-record-downloads').should('be.visible')
    cy.get('[data-cy="resources"]').click({ force: true })
    cy.window().its('scrollY').should('be.gt', 0)

    // it should return to the dataset list
    cy.get('datahub-record-page').find('[data-cy="backButton"]').click()
    cy.url().should('include', '/search')
    cy.go('back')

    // header
    // it should display the title
    cy.get('datahub-header-record')
      .children('header')
      .find('.font-title')
      .invoke('text')
      .invoke('trim')
      .should('not.eql', '')
    cy.screenshot({ capture: 'fullPage' })

    // it should display the data type, last update and status
    cy.visit('/dataset/01491630-78ce-49f3-b479-4b30dabc4c69')
    cy.get('[data-test="metadataBadges"]').as('infoBar')
    cy.get('@infoBar').children().should('have.length', 4)
  })

  it('ABOUT SECTION : display & functions', () => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    describe('navigation bar', () => {
      it('should display the navigation bar, with favorite star and arrow back', () => {
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
      it('should display the gnUiAnchorLinkInViewClass when scrolling to the anchor', () => {
        cy.get('#user-feedbacks').should('be.visible')
        cy.get('#user-feedbacks').should('be.visible').scrollIntoView()
        cy.get('[data-cy="user-feedbacks"]').should(
          'have.class',
          '!border-b-primary border-b-4'
        )
      })
      it('should scroll down when clicking on anchor title', () => {
        cy.get('datahub-record-downloads').should('be.visible')
        cy.get('[data-cy="resources"]').click({ force: true })
        // Wait for scroll animation to complete
        cy.window().then((win) => {
          cy.wrap(win).its('scrollY').should('be.greaterThan', 0)
        })
        cy.window().then((win) => {
          const scrollPosition = win.scrollY
          expect(scrollPosition).to.be.greaterThan(0)
        })
      })
      it('should return to the dataset list', () => {
        cy.get('datahub-record-page').find('[data-cy="backButton"]').click()
        cy.url().should('include', '/search')
      })
    })

    // it should display the read more button and expand description
    cy.visit('/dataset/01491630-78ce-49f3-b479-4b30dabc4c69')
    cy.get('datahub-record-metadata')
      .find('[id="about"]')
      .find('gn-ui-max-lines')
      .as('maxLines')
    cy.get('@maxLines').find('.ease-out').should('exist')
    cy.get('[data-cy=readMoreButton]').click()
    cy.get('@maxLines').find('.ease-in').should('exist')
    cy.go('back')

    // it should display the thumbnail image and magnify
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

    // it should display the contact details
    cy.get('datahub-record-metadata')
      .find('[id="about"]')
      .find('gn-ui-metadata-contact')
      .should('have.length', 1)
    cy.get('[data-cy="contact-email"]').invoke('text').should('include', '@')
    cy.get('datahub-record-metadata')
      .find('[id="about"]')
      .find('gn-ui-metadata-catalog')
      .should('have.length', 1)

    // it should display the catalog details
    cy.get('datahub-record-metadata')
      .find('[id="about"]')
      .find('gn-ui-metadata-catalog')
      .children('div')
      .children('p')
      .eq(1)
      .invoke('text')
      .invoke('trim')
      .should('not.eql', '')

    // it should display the keywords
    cy.get('gn-ui-badge').should('have.length.gt', 0)

    // it should display three expandable panels
    cy.get('datahub-record-metadata')
      .find('gn-ui-expandable-panel')
      .should('have.length', 3)

    // it should display the lineage
    cy.get('datahub-record-metadata')
      .find('[id="about"]')
      .find('gn-ui-markdown-parser')
      .invoke('text')
      .invoke('trim')
      .should('not.eq', '')

    // it should display the data producer elements
    cy.get('datahub-record-metadata')
      .find('[id="about"]')
      .find('gn-ui-thumbnail')
      .should('be.visible')
    cy.get('datahub-record-metadata')
      .find('[data-cy="organization-name"]')
      .parent()
      .children('div')
      .should('have.length', 4)

    // it should display the resource creation date (for resource), the publication date (for resource), the frequency, the languages and the temporal extent
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

    // it should not display the same text twice in the constraints

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

    cy.go('back')

    // it should go to provider website on click
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
      .should('eq', 'https://www.geo2france.fr/')

    // it should go to dataset search page when clicking on keyword and filter by keyword
    cy.get('gn-ui-badge').should('have.length.gt', 0).eq(2).as('keyword')

    cy.get('@keyword').invoke('text').invoke('toUpperCase').as('keywordText')
    cy.get('@keyword').first().click()
    cy.url().should('include', '/search?q=')
    cy.get('gn-ui-fuzzy-search')
      .find('input')
      .then(function (input) {
        cy.wrap(input).should('have.value', this.keywordText)
      })
    cy.go('back')

    // it should open the lightbox
    cy.get('datahub-record-metadata')
      .find('[id="about"]')
      .find('gn-ui-thumbnail')
      .eq(1)
      .next()
      .find('gn-ui-button')
      .click()
    cy.get('.basicLightbox--visible')
    cy.screenshot({ capture: 'viewport' })
    cy.clickOnBody()

    // it should go to dataset search page when clicking on org name and filter by org
    cy.get('[data-cy="organization-name"]').eq(1).click()
    cy.url().should('include', '/search?organization=')
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
            .find('gn-ui-expandable-panel')
            .each(($panel) => {
              // Open all expandable panels to see the data
              cy.wrap($panel).find('.title').click()
            })

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
        cy.get('[data-cy="organization-name-link"]').click()
        cy.url().should('include', '/search?organization=')
      })
      it('should go to dataset search page when clicking on keyword and filter by keyword', () => {
        cy.get('gn-ui-badge').should('have.length.gt', 0).eq(2).as('keyword')

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
          .find('gn-ui-expandable-panel')
          .each(($panel) => {
            // Open all expandable panels to see the data
            cy.wrap($panel).find('.title').click()
          })

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

    // Score is less than 100%
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    // it should display the score
    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('eql', '87%')
    cy.screenshot({ capture: 'fullPage' })

    // it should not check all the criteria
    cy.get('gn-ui-metadata-quality').find('gn-ui-popover').trigger('mouseenter')
    cy.get('gn-ui-metadata-quality-item')
      .find('ng-icon')
      .eq(4)
      .should('have.attr', 'ng-reflect-name', 'matWarningAmber')

    // Score is 100%
    cy.visit('/dataset/6d0bfdf4-4e94-48c6-9740-3f9facfd453c')

    // it should display the score
    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('eql', '100%')

    // it should check all the criteria if score is 100
    cy.get('gn-ui-metadata-quality').find('gn-ui-popover').trigger('mouseenter')
    cy.get('gn-ui-metadata-quality-item')
      .find('ng-icon')
      .eq(4)
      .should('have.attr', 'ng-reflect-name', 'matCheck')
  })

  it('PREVIEW SECTION : display & functions', () => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

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
})
