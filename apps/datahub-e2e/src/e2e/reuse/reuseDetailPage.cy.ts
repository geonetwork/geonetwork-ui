import 'cypress-real-events'

describe('reuse pages', () => {
  it('reuse detail page tests', () => {
    cy.visit('/reuse/7eb795c2-d612-4b5e-b15e-d985b0f4e697')
    // Header
    // should display a link to the reuse
    cy.get('datahub-header-record')
      .find('header')
      .find('a')
      .first()
      .should('be.visible')
      .should(
        'have.attr',
        'href',
        'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=reseau_cerf_lizmap'
      )
      .and('have.attr', 'target', '_blank')

    // Navigation bar
    // should not display navigation bar on unscrollable page
    cy.get('datahub-record-page')
      .find('datahub-navigation-bar')
      .should('not.be.visible')

    // skip as the page currently does not contain enough content to scroll
    // should only display the reuse sections buttons
    // cy.get('datahub-navigation-bar')
    //   .find('[data-cy="capabilities"]')
    //   .should('not.be.visible')
    // cy.get('datahub-navigation-bar')
    //   .find('[data-cy="data-preview"]')
    //   .should('not.be.visible')

    // About
    // should display the spatial extent
    cy.get('gn-ui-expandable-panel').eq(2).click()
    cy.get('gn-ui-map-container').should('be.visible')

    // Links
    // should not display the API links
    cy.get('datahub-record-apis').should('not.exist')

    // should not display the download links
    cy.get('gn-ui-download-links').should('not.exist')

    // Routing
    // should display an error message if a reuse is accessed through another path
    cy.visit('/service/7eb795c2-d612-4b5e-b15e-d985b0f4e697')
    cy.get('gn-ui-error').should('be.visible')

    //Metadata quality widget
    function scoreIs87Percent() {
      // it should display the score
      cy.get('gn-ui-metadata-quality gn-ui-progress-bar')
        .eq(0)
        .find('[data-cy=progressPercentage]')
        .invoke('text')
        .invoke('trim')
        .should('eql', '87%')
      // 7 OK , 1 Warning
      cy.get('gn-ui-metadata-quality')
        .find('gn-ui-popover')
        .first()
        .trigger('mouseenter')
      cy.get(
        'gn-ui-metadata-quality-item ng-icon[ng-reflect-name="matCheck"]'
      ).should('have.length', 7)
      cy.get(
        'gn-ui-metadata-quality-item ng-icon[ng-reflect-name="matWarningAmber"]'
      ).should('have.length', 1)
    }

    // this will enable metadata quality widget
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-metadata-quality.toml',
    })

    // Score is 75% (for a reuse)
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

    // Score is 87% (for a document that is classified as a reuse)
    cy.visit('/reuse/03b2709e-8adf-490a-91f5-b95b97ddef02')
    scoreIs87Percent()

    // Score is 87% (for a dataset that is classified as a reuse)
    cy.visit('/reuse/c6ba473c-2fe7-4fe8-bf3e-055c8f69df67')
    scoreIs87Percent()
  })
})
