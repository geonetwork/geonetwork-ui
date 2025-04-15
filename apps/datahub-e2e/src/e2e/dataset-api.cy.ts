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

describe('LINKS : display & functions', () => {
  beforeEach(() => {
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')
  })

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
      cy.get('datahub-record-apis').find('.pagination-dot').should('not.exist')
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
