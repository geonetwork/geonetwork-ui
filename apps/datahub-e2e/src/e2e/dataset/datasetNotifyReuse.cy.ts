import 'cypress-real-events'
import { lt } from 'semver'

describe('Declare a reuse', () => {
  before(function () {
    // declaring a reuse persists a record through saveRecord(), which requires
    // the GeoNetwork publication API v4.2.5+; skip the suite on older backends.
    cy.request({
      url: '/geonetwork/srv/api/site/settings?key=system/platform/version',
      headers: { accept: 'application/json' },
    })
      .its('body')
      .then((body) => {
        const version = body['system/platform/version']
        if (lt(version, '4.2.5')) {
          this.skip()
        }
      })
  })

  beforeEach(() => {
    // reuse_form_url is optional and disabled in the default config, so the
    // reuse feature is opt-in: serve a config that enables it for these tests
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-reuse-form.toml',
    })
  })

  describe('when not logged in', () => {
    it('hides the reuse feature', () => {
      cy.visit('/dataset/accroche_velos')
      cy.get('datahub-record-metadata').should('exist')

      // it should not display the reuse button
      cy.get('gn-ui-notify-reuse-form').should('not.exist')
    })
  })

  describe('when logged in', () => {
    it('declares a reuse', () => {
      cy.login('barbie', 'p4ssworD_')
      cy.visit('/dataset/accroche_velos')
      // stub window.open so navigating to the editor doesn't leave the page
      cy.window().then((win) => cy.stub(win, 'open').as('windowOpen'))
      cy.get('gn-ui-notify-reuse-form').as('reuseForm')

      // it should display the reuse button
      cy.get('@reuseForm').should('be.visible')
      cy.get('@reuseForm')
        .find('gn-ui-button')
        .first()
        .should('contain.text', 'Declare a reuse')

      // it should open the form with a title and three fields
      cy.get('@reuseForm').find('gn-ui-button').first().click()
      cy.get('.cdk-overlay-container').as('overlay')
      cy.get('@overlay').should('contain.text', 'Declare a reuse')
      cy.get('@overlay').find('gn-ui-text-input').should('have.length', 3)

      // it should pre-fill the email with the logged-in user's email
      cy.get('@overlay')
        .find('gn-ui-text-input input')
        .eq(2)
        .invoke('val')
        .should('eq', 'barbie@email.org')

      // it should keep submit disabled until the required fields are filled
      cy.get('@overlay')
        .find('gn-ui-button')
        .last()
        .find('button')
        .should('be.disabled')
      cy.get('@overlay')
        .find('gn-ui-text-input input')
        .eq(0)
        .type('My great reuse')

      // an invalid url keeps submit disabled (the url format is validated)
      cy.get('@overlay').find('gn-ui-text-input input').eq(1).type('not-a-url')
      cy.get('@overlay')
        .find('gn-ui-button')
        .last()
        .find('button')
        .should('be.disabled')

      cy.get('@overlay').find('gn-ui-text-input input').eq(1).clear()
      cy.get('@overlay')
        .find('gn-ui-text-input input')
        .eq(1)
        .type('https://example.com/my-reuse')
      cy.get('@overlay')
        .find('gn-ui-button')
        .last()
        .find('button')
        .should('not.be.disabled')

      // it should show an error toast and keep the editor closed when saving fails
      cy.intercept(
        { method: 'PUT', pathname: '**/records' },
        { statusCode: 500, body: {} }
      ).as('saveRecordError')
      cy.get('@overlay').find('gn-ui-button').last().find('button').click()
      cy.wait('@saveRecordError')
      cy.get('gn-ui-notification').should(
        'contain.text',
        'Error saving the reuse'
      )
      cy.get('@windowOpen').should('not.have.been.called')

      // it should close the overlay with the close button
      cy.get('@reuseForm').find('gn-ui-button').first().click()
      cy.get('@overlay').find('gn-ui-button[aria-label="Close"]').click()
      cy.get('.cdk-overlay-container').should(
        'not.contain.text',
        'Declare a reuse'
      )

      // it should submit the reuse, close the overlay and open the editor
      cy.intercept(
        { method: 'PUT', pathname: '**/records' },
        {
          statusCode: 201,
          body: {
            metadataInfos: {
              '12345': [{ uuid: 'new-reuse-uuid' }],
            },
          },
        }
      ).as('saveRecord')
      cy.get('@reuseForm').find('gn-ui-button').first().click()
      cy.get('@overlay')
        .find('gn-ui-text-input input')
        .eq(0)
        .type('My great reuse')
      cy.get('@overlay')
        .find('gn-ui-text-input input')
        .eq(1)
        .type('https://example.com/my-reuse')
      cy.get('@overlay').find('gn-ui-button').last().find('button').click()
      // the serialized record carries the entered title (linking the reuse
      // back to the source dataset)
      cy.wait('@saveRecord')
        .its('request.body')
        .should('contain', 'My great reuse')
      cy.get('.cdk-overlay-container').should(
        'not.contain.text',
        'Declare a reuse'
      )
      cy.get('@windowOpen').should(
        'have.been.calledWith',
        'http://my-metadata-editor/edit/new-reuse-uuid',
        '_self'
      )
    })
  })
})
