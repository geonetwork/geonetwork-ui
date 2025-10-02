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
  cy.intercept('GET', '/data/ogcapi?f=json', {
    fixture: 'ogcapi.json',
  })
})

describe('Sections', () => {
  it('About section', () => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    // it should display the description
    cy.get('datahub-record-metadata')
      .find('[id="about"]')
      .find('gn-ui-markdown-parser')
      .invoke('text')
      .invoke('trim')
      .should('not.eql', '')

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
      .find('[data-cy="metadata-organization"]')
      .children('div')
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
    cy.get('@aboutContent').should('have.length', 4)
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

    // it should go to dataset search page when clicking on org name and filter by org
    cy.get('[data-cy="organization-name-link"]').eq(0).click()
    cy.url().should('include', '/search?organization=')
  })

  it('Metadata quality widget', () => {
    // this will enable metadata quality widget
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-metadata-quality.toml',
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
    cy.get('gn-ui-metadata-quality')
      .find('gn-ui-popover')
      .first()
      .trigger('mouseenter')
    cy.get('gn-ui-metadata-quality-item')
      .find('ng-icon')
      .eq(3)
      .should('have.attr', 'ng-reflect-name', 'matWarningAmber')
    //87%, 7 OK , 1 Warning
    cy.get(
      'gn-ui-metadata-quality-item ng-icon[ng-reflect-name="matCheck"]'
    ).should('have.length', 7)
    cy.get(
      'gn-ui-metadata-quality-item ng-icon[ng-reflect-name="matWarningAmber"]'
    ).should('have.length', 1)
    // Score is 100%
    cy.visit('/dataset/6d0bfdf4-4e94-48c6-9740-3f9facfd453c')

    // it should display the score
    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('eql', '100%')
    //100%, 8 OK , 0 Warning
    cy.get('gn-ui-metadata-quality')
      .find('gn-ui-popover')
      .first()
      .trigger('mouseenter')
    cy.get(
      'gn-ui-metadata-quality-item ng-icon[ng-reflect-name="matCheck"]'
    ).should('have.length', 8)
    cy.get(
      'gn-ui-metadata-quality-item ng-icon[ng-reflect-name="matWarningAmber"]'
    ).should('have.length', 0)

    // Score for a Reuse is 75%
    cy.visit('/reuse/7eb795c2-d612-4b5e-b15e-d985b0f4e697')

    // it should display the score
    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('eql', '75%')
    // 6 OK , 2 Warning
    cy.get('gn-ui-metadata-quality')
      .find('gn-ui-popover')
      .first()
      .trigger('mouseenter')
    cy.get(
      'gn-ui-metadata-quality-item ng-icon[ng-reflect-name="matCheck"]'
    ).should('have.length', 6)
    cy.get(
      'gn-ui-metadata-quality-item ng-icon[ng-reflect-name="matWarningAmber"]'
    ).should('have.length', 2)
    // Score for a Service is 83%
    cy.visit('/service/00916a35-786b-4569-9da6-71ca64ca54b1')

    // it should display the score
    cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
      .eq(0)
      .find('[data-cy=progressPercentage]')
      .invoke('text')
      .invoke('trim')
      .should('match', /^(100|83)%$/) // may be different on GN v4.2.2
  })

  it('Downloads section', () => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    // it should have a list of downloads based on the WFS capabilities
    cy.get('datahub-record-downloads')
      .find('gn-ui-block-list gn-ui-download-item [data-cy="download-format"]')
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

    // it should have filter buttons for each download types + all and others
    cy.get('[data-cy="download-format-filters"]')
      .find('gn-ui-button')
      .should('have.length', 6)
    cy.get('[data-cy="download-format-filters"]')
      .find('gn-ui-button')
      .then((buttons) => {
        const formats = buttons
          .toArray()
          .map((button) => button.getAttribute('data-format'))
        expect(formats).to.eql(['all', 'csv', 'excel', 'json', 'shp', 'others'])
      })

    // it filters the download list on format filter click
    cy.get('[data-cy="download-format-filters"]')
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
        .invoke('text')
        .invoke('trim')
        .should('eq', filterFormat)
    })
    cy.screenshot({ capture: 'fullPage' })

    // it downloads a file on click
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

    // it displays the full list after clicking two times on one filter
    cy.get('datahub-record-downloads')
      .find('gn-ui-button')
      .children('button')
      .eq(3)
      .as('filterFormat')
    cy.get('@filterFormat').click()
    cy.get('datahub-record-downloads')
      .find('[data-cy="download-format"]')
      .filter(':visible')
      .its('length')
      .then((l1) => {
        cy.get('@filterFormat').click()
        cy.get('datahub-record-downloads')
          .find('[data-cy="download-format"]')
          .filter(':visible')
          .its('length')
          .then((l2) => expect(l2).to.not.equal(l1))
      })
  })

  it('Links section', () => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
    cy.get('datahub-record-otherlinks').as('otherLinks')

    // display on desktop
    //it should display links in a grid layout
    cy.viewport(1200, 800)
    cy.get('@otherLinks').find('gn-ui-block-list').should('be.visible')
    cy.get('@otherLinks').find('gn-ui-carousel').should('not.exist')

    //it should not show pagination when 4 links or less
    cy.viewport(1200, 800)
    cy.get('@otherLinks').find('gn-ui-pagination-dots').should('not.be.visible')
    cy.get('@otherLinks')
      .find('gn-ui-previous-next-buttons')
      .should('not.exist')

    //it should display links in a carousel
    cy.viewport(375, 667)
    cy.get('@otherLinks').find('gn-ui-carousel').should('be.visible')
    cy.get('@otherLinks').find('gn-ui-block-list').should('not.exist')
    //it should show pagination dots in carousel
    cy.get('@otherLinks')
      .find('gn-ui-carousel gn-ui-pagination-dots')
      .should('be.visible')

    //it should maintain link functionality in both layoutss
    // Test on mobile
    cy.viewport(375, 667)
    cy.get('@otherLinks')
      .find('gn-ui-external-link-card')
      .first()
      .find('a')
      .should('have.attr', 'href')
      .and('not.be.empty')

    //Test on desktop
    cy.viewport(1200, 800)
    cy.get('@otherLinks')
      .find('gn-ui-external-link-card')
      .first()
      .find('a')
      .should('have.attr', 'href')
      .and('not.be.empty')

    // it should have external, API and internal links with one option
    cy.get('datahub-record-otherlinks')
      .find('gn-ui-external-link-card')
      .should('have.length.gt', 0)
    cy.get('datahub-record-apis')
      .find('gn-ui-api-card')
      .should('have.length.gt', 0)

    // it should not display carousel dot button for 4 link cards
    cy.get('datahub-record-otherlinks')
      .find('.pagination-dot')
      .should('not.exist')

    // it should not display carousel dot button for 2 API cards
    cy.get('datahub-record-apis').find('.pagination-dot').should('not.exist')

    // it goes to external link on click
    cy.get('datahub-record-otherlinks')
      .find('gn-ui-external-link-card')
      .first()
      .children('a')
      .as('proviLink')

    cy.get('@proviLink')
      .invoke('attr', 'href')
      .should(
        'eql',
        'https://www.data.gouv.fr/fr/datasets/donnees-carroyees-a-200-m-sur-la-population/'
      )

    // it copies the API path on click
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

    // API cards
    cy.get('gn-ui-block-list gn-ui-api-card').eq(1).as('firstCard')

    // it should display the open panel button
    cy.get('@firstCard')
      .find('button')
      .children('ng-icon')
      .eq(1)
      .invoke('attr', 'name')
      .should('equal', 'iconoirSettings')

    // it should open and close the panel on click on open panel button
    cy.get('@firstCard').find('button').eq(1).click({ force: true })
    cy.get('gn-ui-record-api-form').should('be.visible')
    cy.screenshot({ capture: 'fullPage' })
    cy.get('@firstCard').find('button').eq(1).click()
    cy.get('gn-ui-record-api-form').should('not.be.visible')
  })

  it('Related records section', () => {
    cy.visit('/dataset/a3774ef6-809d-4dd1-984f-9254f49cbd0a')

    // it should display the related records
    cy.get('datahub-record-internal-links')
      .find('gn-ui-internal-link-card')
      .should('have.length.gt', 0)

    // it should display a similar related record
    cy.get('datahub-record-internal-links')
      .find('gn-ui-internal-link-card')
      .first()
      .find('[data-cy="recordTitle"]')
      .should(
        'have.text',
        ` Metadata for E2E testing purpose. (this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut, this title is too long and should be cut) `
      )

    // it goes to dataset on click
    cy.get('datahub-record-internal-links')
      .find('gn-ui-internal-link-card')
      .first()
      .children('a')
      .as('proviLink')

    cy.get('@proviLink')
      .invoke('attr', 'href')
      .then((link) => {
        const targetLink = link
        cy.get('@proviLink')
          .invoke('removeAttr', 'target') // this prevents having a target="_blank" attribute
          .click()
        cy.url().should('include', targetLink)
      })

    // When there is no link
    cy.visit('/dataset/a3774ef6-809d-4dd1-984f-9254f49cbd0a')

    // it does not display the no-link-error warning initially, only after loading
    // wait for metadata info to show up
    cy.get('gn-ui-metadata-info').should('exist')
    // first, the block is not visible
    cy.get('[data-test="dataset-has-no-link-block"]').should('not.exist')
    // then the block shows up
    cy.get('[data-test="dataset-has-no-link-block"]').should('exist')
  })
})

it('record with file distributions', () => {
  cy.visit('/dataset/n_tri_lill_inondable_s_059')
  cy.get('datahub-record-metadata')
    .find('[id="preview"]')
    .first()
    .as('previewSection')
  cy.get('@previewSection')
    .find('.mat-mdc-tab-labels')
    .children('div')
    .eq(2)
    .click()

  // it should display the onlineResources by priority
  cy.get('@previewSection')
    .find('gn-ui-dropdown-selector')
    .last()
    .openDropdown()
    .children('button')
    .then((options) => options.toArray().map((el) => el.innerText.trim()))
    .should('deep.eq', ['csv (csv)', 'json (json)', 'geojson (geojson)'])

  cy.screenshot({ capture: 'viewport' })
})

it('API query form', () => {
  cy.visit('/dataset/accroche_velos')
  cy.get('gn-ui-block-list gn-ui-api-card').first().find('button').eq(1).click()
  cy.get('gn-ui-record-api-form').children('div').as('apiForm')
  cy.get('@apiForm').find('gn-ui-text-input').first().as('firstInput')
  cy.get('@apiForm').find('gn-ui-text-input').eq(1).as('secondInput')

  // it should have request inputs
  cy.get('@apiForm').find('gn-ui-text-input').should('have.length', 2)
  cy.get('@apiForm').find('gn-ui-dropdown-selector').should('have.length', 1)
  cy.get('@apiForm')
    .children('div')
    .first()
    .children('div')
    .first()
    .find('button')
    .should('have.length', 1)
  cy.get('@apiForm').find('gn-ui-copy-text-button').should('have.length', 1)

  // it should change url on input change
  cy.get('@apiForm')
    .find('gn-ui-copy-text-button')
    .find('input')
    .invoke('val')
    .then((url) => {
      cy.get('@firstInput').type('{selectAll}{backspace}54')
      cy.get('@apiForm')
        .find('gn-ui-copy-text-button')
        .find('input')
        .invoke('val')
        .should('not.eq', url)
        .and('include', '54')
    })

  // it should set limit to zero on click on "All" button
  cy.get('@firstInput').type('{selectAll}{backspace}54')
  cy.get('@apiForm').find('input[type="checkbox"]').check()
  cy.get('@firstInput').should('have.value', '')

  // it should reset all 3 inputs and link on click
  cy.get('@apiForm').find('input[type="checkbox"]').uncheck()
  cy.get('@firstInput').type('{selectAll}{backspace}54')

  cy.get('@secondInput').type('{selectAll}{backspace}87')

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

  // it should switch to other card url if card already open
  cy.get('@apiForm')
    .find('gn-ui-copy-text-button')
    .find('input')
    .invoke('val')
    .then((url) => {
      cy.get('@firstInput').type('{selectAll}{backspace}54')
      cy.get('gn-ui-block-list gn-ui-api-card')
        .eq(1)
        .find('button')
        .eq(1)
        .click()
      cy.get('@apiForm')
        .find('gn-ui-copy-text-button')
        .find('input')
        .invoke('val')
        .should('not.eq', url)
    })

  // it should close the panel on click
  cy.get('gn-ui-record-api-form').prev().find('button').click()
  cy.get('gn-ui-record-api-form').should('not.be.visible')
})

it('When the metadata does not exists', () => {
  cy.visit('/dataset/xyz')

  // it should display an error message
  cy.get('gn-ui-error').should('exist')
  cy.screenshot({ capture: 'viewport' })
})
