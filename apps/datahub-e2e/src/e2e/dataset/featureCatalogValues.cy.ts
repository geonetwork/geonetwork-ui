describe('dataset feature catalog - Single feature type', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      '/geonetwork/srv/api/search/records/_search?bucket=bucket&relatedType=fcats*',
      {
        fixture: '_search_Exemple_de_catalogue_ISO19110_de_la_BDTOPO.json',
      }
    )
  })

  beforeEach(() => {
    cy.visit('/dataset/50aa3037-ac17-4c0d-ad15-b43a5a0929ae')
  })

  it('should display the right columns for each feature types', () => {
    // Test the first attribute type, that does not have "Values" column
    cy.get('gn-ui-feature-catalog-list gn-ui-expandable-panel', {
      timeout: 50000,
    })
      .eq(0)
      .as('firstExpandableFeatType')
    cy.get('@firstExpandableFeatType').click()

    // Check if column titles are ok
    cy.get('@firstExpandableFeatType')
      .find('[data-cy="expandable-panel-content"]')
      .should('be.visible')
    cy.get('@firstExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(0)
      .should('have.text', ' Type ')
    cy.get('@firstExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(1)
      .should('have.text', ' Name ')
    cy.get('@firstExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(2)
      .should('have.text', ' Code ')
    cy.get('@firstExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(3)
      .should('have.text', ' Description ')

    // Check that there are the right count of cells content
    cy.get('@firstExpandableFeatType')
      .find('[data-test="cell-content"]')
      .should('have.length', 44)

    // Close first panel
    cy.get('@firstExpandableFeatType')
      .find('[data-cy="expandable-panel-header"]')
      .click()

    // Test the second attribute type, that DOES have "Values" column
    cy.get('gn-ui-feature-catalog-list gn-ui-expandable-panel')
      .eq(1)
      .as('secondExpandableFeatType')
    cy.get('@secondExpandableFeatType').click()

    // Check if column titles are ok
    cy.get('@secondExpandableFeatType')
      .find('[data-cy="expandable-panel-content"]')
      .should('be.visible')
    cy.get('@secondExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(0)
      .should('have.text', ' Type ')
    cy.get('@secondExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(1)
      .should('have.text', ' Name ')
    cy.get('@secondExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(2)
      .should('have.text', ' Code ')
    cy.get('@secondExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(3)
      .should('have.text', ' Description ')
    cy.get('@secondExpandableFeatType')
      .find('[data-test="column-label"]')
      .eq(4)
      .should('have.text', ' Values ')

    // Check that there are the right count of cells content
    cy.get('@secondExpandableFeatType')
      .find('[data-test="cell-content"]')
      .should('have.length', 50)

    // Open the popin
    cy.get('@secondExpandableFeatType')
      .find('[data-cy="values-cell-popin-trigger"]')
      .eq(0)
      .as('secondExpandableFeatTypeCellPopin')
      .find('button')
      .eq(0)
      .click()

    // Scroll, because otherwise popin does not display
    cy.scrollTo(0, 700)
    cy.get('[data-cy="feat-catalog-scrollable"]').scrollTo('top')

    // Popin should display
    cy.get('[data-cy="cell-popin-content"]')
      .as('cellPopinContent')
      .should('be.visible')

    // Check popin content
    cy.get('@cellPopinContent').should('contain', 'Bananeraie')
    cy.get('@cellPopinContent').should('contain', 'Bois')
    cy.get('@cellPopinContent').should('contain', 'Canne à sucre')
    cy.get('@cellPopinContent').get('li').should('have.length', 17)

    // Check if popin closes correctly
    cy.get('[data-cy="cell-popin-close"]').click()
    cy.get('@cellPopinContent').should('not.exist')
  })
})
