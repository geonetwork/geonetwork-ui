describe('dataset: header', () => {
  it('should display the header with the navigation bar', () => {
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-languages.toml',
    })
    // no-link-error block
    // it shouldn't be there if there are links
    cy.visit('/dataset/a3774ef6-809d-4dd1-984f-9254f49cbd0a')
    cy.get('[data-test=dataset-has-no-link-block]').should('not.exist')

    // HEADER
    // it should display back button and return to the dataset list
    cy.get('datahub-record-page')
      .find('[data-cy="backButton"]')
      .eq(0)
      .should('be.visible')
      .click()
    cy.url().should('include', '/search')
    cy.go('back')

    // it should display the favorite star
    cy.get('datahub-record-page')
      .find('gn-ui-favorite-star')
      .eq(0)
      .should('be.visible')

    // it should display the language switcher
    cy.get('datahub-record-page')
      .find('gn-ui-language-switcher')
      .eq(0)
      .should('be.visible')

    // it should display the title
    cy.get('datahub-header-record')
      .find('header')
      .find('.font-title')
      .invoke('text')
      .invoke('trim')
      .should('not.eql', '')
    cy.screenshot({ capture: 'fullPage' })

    // it should display the data type, last update and status
    cy.visit('/dataset/01491630-78ce-49f3-b479-4b30dabc4c69')
    cy.get('[data-test="metadataBadges"]').as('infoBar')
    cy.get('@infoBar').children().should('have.length', 4)

    // it should display the thumbnail image and magnify
    cy.get('header')
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

    // NAVIGATION BAR
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    // wait for the page to load before scrolling
    cy.get('datahub-record-data-preview').should('exist')

    // it should NOT be visible before scrolling down
    cy.get('datahub-record-page')
      .find('datahub-navigation-bar')
      .should('not.be.visible')
    cy.scrollTo(0, 1000)

    // it should display the back button (in navigation bar and hide in header)
    cy.get('datahub-record-page')
      .find('[data-cy="backButton"]')
      .eq(1)
      .should('be.visible')

    cy.get('datahub-record-page')
      .find('[data-cy="backButton"]')
      .eq(0)
      .should('not.be.visible')

    // it should display the favorite star (in navigation bar and hide in header)
    cy.get('datahub-record-page')
      .find('gn-ui-favorite-star')
      .eq(1)
      .should('be.visible')

    cy.get('datahub-record-page')
      .find('gn-ui-favorite-star')
      .eq(0)
      .should('not.be.visible')

    // it should display the language switcher (in navigation bar and hide in header)
    cy.get('datahub-record-page')
      .find('gn-ui-language-switcher')
      .eq(1)
      .should('be.visible')

    cy.get('datahub-record-page')
      .find('gn-ui-language-switcher')
      .eq(0)
      .should('not.be.visible')

    // it should display only the dataset sections
    cy.get('datahub-navigation-bar')
      .find('[data-cy="capabilities"]')
      .should('not.be.visible')
    cy.get('datahub-navigation-bar')
      .find('[data-cy="data-preview"]')
      .should('be.visible')

    // it should display the gnUiAnchorLinkInViewClass when scrolling to the anchor
    cy.get('#data-preview').should('be.visible')
    cy.get('#data-preview').should('be.visible').scrollIntoView()
    cy.get('[data-cy="data-preview"]').should(
      'have.class',
      '!border-b-primary border-b-[3px]'
    )

    // it should scroll down when clicking on anchor title
    cy.get('datahub-record-page')
      .find('datahub-record-downloads')
      .should('exist')
    cy.get('datahub-record-downloads').should('be.visible')
    cy.get('[data-cy="resources"]').click({ force: true })
    cy.window().its('scrollY').should('be.gt', 0)
  })
  // NAVIGATION BAR on mobile
  it('should display the navigation bar on mobile', () => {
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-languages.toml',
    })
    cy.viewport(375, 667)
    cy.visit('/dataset/04bcec79-5b25-4b16-b635-73115f7456e4')

    // wait for the page to load before scrolling
    cy.get('datahub-record-data-preview').should('exist')

    // it should NOT be visible before scrolling down
    cy.get('datahub-record-page')
      .find('datahub-navigation-bar')
      .should('not.be.visible')
    cy.get('#data-preview').scrollIntoView()

    //it should display only the (active) data-preview section anchor
    cy.get('datahub-navigation-bar')
      .find('[data-cy="data-preview-mobile-title"]')
      .should('be.visible')
    cy.get('datahub-navigation-bar')
      .find('[data-cy="resources-mobile-menu"]')
      .should('not.be.visible')
  })
})
