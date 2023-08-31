describe('dashboard', () => {
  let originalList
  let newList
  describe('pagination', () => {
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
})
