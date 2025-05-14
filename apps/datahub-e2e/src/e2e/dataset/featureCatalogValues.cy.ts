describe('dataset feature catalog - Single feature type', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      '/geonetwork/srv/api/search/records/_search?bucket=bucket&relatedType=fcats',
      {
        fixture: '_search_n_tri_lill_inondable.json',
      }
    )
  })

  beforeEach(() => {
    cy.visit('/dataset/accroche_velos')
  })

  it('should display the right columns for each feature types', () => {
    // Test the first attribute type, that does not have "Values" column
    cy.get('gn-ui-feature-catalog-list gn-ui-expandable-panel')
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
      .should('have.length', 36)

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
      .should('have.length', 45)
  })
})
