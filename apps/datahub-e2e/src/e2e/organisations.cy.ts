import 'cypress-real-events'

describe('organisations', () => {
  beforeEach(() => {
    cy.visit('/home/organisations')
    cy.viewport(1700, 1200)
  })

  describe('general display', () => {
    it('should select the right tab', () => {
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(2)
        .invoke('attr', 'ng-reflect-ng-class')
        .should('eq', 'decoration-primary')
    })
    it('should display the welcome panel', () => {
      cy.get('gn-ui-organisations-sort').should('be.visible')
      cy.get('gn-ui-organisations-sort')
        .find('p')
        .its('text')
        .should('have.length.greaterThan', 0)
      cy.get('gn-ui-organisations-sort')
        .find('gn-ui-dropdown-selector')
        .find('select')
        .children('option')
        .should('have.length', 4)
    })
    it('should display a list of organisations', () => {
      cy.get('gn-ui-organisations')
        .children('div')
        .first()
        .children('gn-ui-content-ghost')
        .eq(1)
        .as('provider')
      cy.get('@provider')
        .find('gn-ui-thumbnail')
        .find('img')
        .should('be.visible')
      cy.get('@provider').find('[data-cy="providerDesc"]').as('txtProvi')
      cy.get('@txtProvi')
        .children('span')
        .its('text')
        .should('have.length.above', 0)
      cy.get('@txtProvi').children('div').find('mat-icon').should('be.visible')
      cy.get('@txtProvi')
        .children('div')
        .children('span')
        .should(($element) => {
          const text = $element.text().trim()
          expect(parseInt(text)).to.not.be.NaN
        })
      cy.get('@txtProvi').children('div').should('have.length.above', 0)
    })
    it('should display navigation options', () => {
      cy.get('gn-ui-pagination')
        .children('div')
        .children('div')
        .first()
        .find('gn-ui-button')
      cy.get('gn-ui-pagination')
        .children('div')
        .children('div')
        .eq(1)
        .find('input')
      cy.get('gn-ui-pagination')
        .children('div')
        .children('div')
        .eq(1)
        .find('gn-ui-button')
        .should('have.length', 2)
    })
  })

  describe('list features', () => {
    let providerOrg
    beforeEach(() => {
      cy.get('[data-cy="providerDesc"]')
        .eq(11)
        .children('span')
        .invoke('text')
        .then((txt) => {
          providerOrg = txt.trim()
        })
    })
    it('should access the related datasets on click', () => {
      cy.get('gn-ui-organisations')
        .children('div')
        .first()
        .children('gn-ui-content-ghost')
        .eq(11)
        .click()
      cy.url()
        .should('include', 'publisher=')
        .and('include', encodeURIComponent(providerOrg))
    })
  })

  describe('page toggle features', () => {
    let proviList = []
    beforeEach(() => {
      cy.get('gn-ui-organisations-sort')
        .find('gn-ui-dropdown-selector')
        .find('select')
        .as('filter')
      cy.get('gn-ui-pagination').children('div').as('pagination')
      cy.get('gn-ui-organisations')
        .children('div')
        .first()
        .children('gn-ui-content-ghost')
        .as('provider')
      cy.get('@provider').find('[data-cy="providerDesc"]').as('txtProvi')
    })

    it('should filter the list A to Z / Z to A', () => {
      cy.get('@filter').select(1)
      function isOrdered(arr, type) {
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i].localeCompare(arr[i + 1]) < 0 && type == 'ZA') {
            return false
          } else if (arr[i].localeCompare(arr[i + 1]) > 0 && type == 'AZ') {
            return false
          }
        }
        return true
      }

      cy.get('@txtProvi')
        .children('span')
        .each(($span) => {
          proviList.push($span.text())
        })
        .then(() => {
          proviList = proviList.map((elmt) => elmt.trim())
          expect(isOrdered(proviList, 'ZA')).to.be.true
          proviList = []
          cy.get('@filter').select(0)
          cy.get('@txtProvi')
            .children('span')
            .each(($span) => {
              proviList.push($span.text())
            })
            .then(() => {
              proviList = proviList.map((elmt) => elmt.trim())
              expect(isOrdered(proviList, 'AZ')).to.be.true
            })
        })
    })
    it('should filter the list by dataset count', () => {
      const thirdOrder = []
      const updatedOrder = []
      const initialOrder = []
      cy.get('@filter').select(0)
      cy.get('[data-cy="orgaName"]')
        .each((item) => {
          const text = item.text().trim()
          initialOrder.push(text)
        })
        .then(() => {
          cy.get('@filter').select(2)
          cy.get('[data-cy="orgaName"]')
            .each((item) => {
              const text = item.text().trim()
              updatedOrder.push(text)
            })
            .then(() => {
              expect(initialOrder).to.not.equal(updatedOrder)
              cy.get('@filter').select(3)
              cy.get('[data-cy="orgaName"]')
                .each((item) => {
                  const text = item.text().trim()
                  thirdOrder.push(text)
                })
                .then(() => {
                  expect(initialOrder).to.not.equal(thirdOrder)
                  expect(updatedOrder).to.not.equal(thirdOrder)
                })
            })
        })
    })
    it('should navigate to next page with button', () => {
      const page1 = []
      const page2 = []
      cy.get('@txtProvi')
        .children('span')
        .each(($span) => {
          page1.push($span.text())
        })
        .then(() => {
          cy.get('@pagination')
            .children('div')
            .first()
            .find('gn-ui-button')
            .click()
          cy.get('@txtProvi')
            .children('span')
            .each(($span) => {
              page2.push($span.text())
            })
            .then(() => {
              expect(page1).to.not.equal(page2)
            })
        })
    })
    it('should go to next page with arrow', () => {
      const page1 = []
      const page2 = []
      cy.get('@txtProvi')
        .children('span')
        .each(($span) => {
          page1.push($span.text())
        })
        .then(() => {
          cy.get('@pagination')
            .children('div')
            .eq(1)
            .find('gn-ui-button')
            .eq(1)
            .click()
          cy.get('@txtProvi')
            .children('span')
            .each(($span) => {
              page2.push($span.text())
            })
            .then(() => {
              expect(page1).to.not.equal(page2)
            })
        })
    })
    it('should navigate between pages with number typed', () => {
      const page1 = []
      const page2 = []
      cy.get('@txtProvi')
        .children('span')
        .each(($span) => {
          page1.push($span.text())
        })
        .then(() => {
          cy.get('@pagination').children('div').eq(1).find('input').type('2')
          cy.get('@txtProvi')
            .children('span')
            .each(($span) => {
              page2.push($span.text())
            })
            .then(() => {
              expect(page1).to.not.equal(page2)
            })
        })
    })
  })
})
