describe('dataset feature catalog - Multiple feature types', () => {
  beforeEach(() => {
    cy.visit('/dataset/n_tri_lill_inondable_s_059')
  })

  it('should display the feature catalog section and quicklink', () => {
    cy.get('#feature-catalog').should('exist')
    cy.get('[data-cy="feature-catalog"]').should('exist')
  })

  it('should display collapsed feature type panels', () => {
    cy.get('#feature-catalog gn-ui-expandable-panel').as('panels')
    cy.get('@panels').should('have.length.gt', 1)

    cy.get('@panels').each(($panel) => {
      cy.wrap($panel)
        .find('[data-cy="feature-type-content"]')
        .should('not.exist')
    })

    cy.get('@panels').first().click()
    cy.get('@panels')
      .first()
      .find('[data-cy="feature-type-content"]')
      .should('be.visible')
    cy.get('@panels')
      .last()
      .find('[data-cy="feature-type-content"]')
      .should('not.exist')
  })

  it('should display both total objects and attributes counts', () => {
    cy.get('[data-cy="total-objects"]').as('objectsCount')
    cy.get('[data-cy="total-attributes"]').as('attributesCount')

    cy.get('@objectsCount')
      .invoke('text')
      .then((initialObjects) => {
        cy.get('@attributesCount')
          .invoke('text')
          .then((initialAttributes) => {
            cy.get('#feature-catalog input[type="text"]').type('test')

            cy.get('@objectsCount')
              .invoke('text')
              .should('not.eq', initialObjects)
            cy.get('@attributesCount')
              .invoke('text')
              .should('not.eq', initialAttributes)

            cy.get('#feature-catalog input[type="text"]').clear()

            cy.get('@objectsCount').invoke('text').should('eq', initialObjects)
            cy.get('@attributesCount')
              .invoke('text')
              .should('eq', initialAttributes)
          })
      })
  })

  it('should filter feature types and update counts based on search', () => {
    cy.get('#feature-catalog input[type="text"]').type('Zone')
    cy.get('#feature-catalog gn-ui-expandable-panel').should('have.length', 1)
    cy.get('[data-cy="feature-type-content"]').should('be.visible')
    cy.get('[data-cy="total-objects"]').should('contain', '1')
    cy.get('[data-cy="total-attributes"]').should('contain', '9')

    cy.get('#feature-catalog input[type="text"]').clear().type('Zone autre')
    cy.get('#feature-catalog gn-ui-expandable-panel').should('have.length', 0)
    cy.get('[data-cy="total-objects"]').should('contain', '0')
    cy.get('[data-cy="total-attributes"]').should('contain', '0')
  })
})
