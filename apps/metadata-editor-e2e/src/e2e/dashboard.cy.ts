describe('dashboard', () => {
  let pageOne
  describe('pagination', () => {
    it('should display different results on click on arrow', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .first()
        .invoke('text')
        .then((text) => {
          pageOne = text
        })
      cy.get('gn-ui-pagination-buttons').find('gn-ui-button').last().click()
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text).not.to.equal(pageOne)
          cy.url().should('include', 'page=2')
        })
    })
    it('should display different results on click on specific page and change url', () => {
      cy.visit('/records/search?_page=2')
      cy.get('gn-ui-pagination-buttons').find('gn-ui-button').eq(1).click()
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .first()
        .invoke('text')
        .then((text) => {
          expect(text).to.equal(pageOne)
          cy.url().should('include', 'page=1')
        })
    })
  })

  describe('sorting', () => {
    let originalFirstItem
    let newFirstItem
    it('should order the result list on click', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .first()
        .invoke('text')
        .then((list) => {
          originalFirstItem = list.trim()
          cy.get('.record-table-header').first().click()
          cy.get('gn-ui-record-table')
            .find('.record-table-col')
            .first()
            .invoke('text')
            .then((list) => {
              newFirstItem = list.trim()
              expect(newFirstItem).not.to.equal(originalFirstItem)
              cy.url().should(
                'include',
                'sort=resourceTitleObject.default.keyword'
              )
            })
        })
    })
  })

  describe('checkboxes', () => {
    it('should show the correct amount of selected records when they are selected', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .get('[type="checkbox"]')
        .eq(2)
        .click()
      cy.get('.selected-records').contains('1 selected')
    })

    it('should show nothing when none are selected', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .get('mat-checkbox.mat-primary')
        .each(($checkbox) => cy.wrap($checkbox).click())
      cy.get('.records-information').should(
        'not.have.descendants',
        '.selected-records'
      )
    })

    it('should select all records when the "select all" checkbox is checked', () => {
      cy.visit('/records/all')
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .get('mat-checkbox.mat-primary')
        .first()
        .click()
      cy.get('.selected-records').contains('12 selected')
    })
  })
})
