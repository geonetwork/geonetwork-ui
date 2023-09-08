describe('dashboard', () => {
  describe('pagination', () => {
    let originalList
    let newList
    it('should display different results on click on arrow', () => {
      cy.visit('/')
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .first()
        .as('pageOne')

      cy.get('@pageOne')
        .invoke('text')
        .then((list) => {
          originalList = list.trim()
          cy.get('gn-ui-pagination-buttons').find('gn-ui-button').last().click()
          cy.get('gn-ui-record-table')
            .find('.record-table-col')
            .first()
            .invoke('text')
            .then((list) => {
              newList = list.trim()
              expect(newList).not.to.be(originalList)
            })
        })
    })
    it('should display different results on click on specific page', () => {
      cy.get('gn-ui-pagination-buttons').find('gn-ui-button').eq(1).click()
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .first()
        .invoke('text')
        .then((list) => {
          newList = list.trim()
          expect(newList).to.be(originalList)
        })
    })
  })

  // NEEDS TO WAIT UNTIL STYLE IS DONE
  describe('sorting', () => {
    let originalList
    let newList
    it('should order the result list on click', () => {
      cy.visit('/')
      cy.get('gn-ui-record-table')
        .find('.record-table-col')
        .first()
        .as('pageOne')

      cy.get('@pageOne')
        .invoke('text')
        .then((list) => {
          originalList = list.trim()
          cy.get('.record-table-header').first().click()
          cy.get('gn-ui-sort').find('gn-ui-button').first().click()
          cy.get('gn-ui-record-table')
            .find('.record-table-col')
            .first()
            .invoke('text')
            .then((list) => {
              newList = list.trim()
              expect(newList).not.to.be(originalList)
            })
        })
    })
  })
})
