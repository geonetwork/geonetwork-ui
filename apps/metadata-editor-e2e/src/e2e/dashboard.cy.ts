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
})
