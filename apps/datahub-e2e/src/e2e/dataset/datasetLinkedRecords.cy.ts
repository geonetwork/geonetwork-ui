beforeEach(() => {
  // Return a search bucket with various linked records
  // Note: The links to the reuse and service also exist in the dump, but not all the links between the datasets
  cy.intercept(
    'POST',
    '/geonetwork/srv/api/search/records/_search?bucket=bucket&relatedType=fcats&relatedType=hassources',
    {
      fixture: 'alea-de-debordement.json',
    }
  )
})

describe('dataset: linked records', () => {
  beforeEach(() => {
    cy.visit('/dataset/n_tri_lill_inondable_s_059')
  })
  it('should display the linked records section with all associated content', () => {
    // it should display the linked records
    cy.get('datahub-record-linked-records').should('be.visible')

    // it should display the linked records with the correct title
    cy.get('datahub-record-linked-records')
      .find('h2')
      .should('contain', 'Associated content')

    // it should display the source datasets with the correct number of records
    cy.get('datahub-record-internal-links')
      .find('h3')
      .first()
      .as('sourceDatasetsTitle')
      .should('contain', 'Source datasets')
    cy.get('@sourceDatasetsTitle').next('span').should('contain', '(1)')

    // it should display the associated datasets with the correct number of records
    cy.get('datahub-record-internal-links')
      .find('h3')
      .eq(1)
      .as('associatedDatasetsTitle')
      .should('contain', 'Associated datasets')
    cy.get('@associatedDatasetsTitle').next('span').should('contain', '(5)')

    // it should display the associated reuses with the correct number of records
    cy.get('datahub-record-internal-links')
      .find('h3')
      .eq(2)
      .as('associatedReusesTitle')
      .should('contain', 'Associated reuses')
    cy.get('@associatedReusesTitle').next('span').should('contain', '(1)')

    // it should display the associated services with the correct number of records
    cy.get('datahub-record-internal-links')
      .find('h3')
      .eq(3)
      .as('associatedServicesTitle')
      .should('contain', 'Associated services')
    cy.get('@associatedServicesTitle').next('span').should('contain', '(1)')

    // it should generate a total of 8 internal link cards for all linked records
    cy.get('datahub-record-linked-records')
      .find('datahub-record-internal-links')
      .find('gn-ui-internal-link-card')
      .should('have.length', 8)
  })
})
