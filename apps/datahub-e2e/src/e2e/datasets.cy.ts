import 'cypress-real-events'
import { find } from 'cypress/types/lodash'

describe('datasets', () => {
  beforeEach(() => {
    cy.visit('/home/search')
    cy.viewport(1700, 1200)
  })

  describe('general display', () => {
    it('should select the right tab', () => {
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(1)
        .invoke('attr', 'ng-reflect-ng-class')
        .should('eq', 'decoration-primary')
    })
    it('should display the news feed with a few news', () => {
      cy.get('gn-ui-results-list-item').should('have.length.gt', 0)
      cy.get('gn-ui-results-list-item').should('have.length.lt', 11)
    })
    it('should display four filter buttons', () => {
      cy.get('datahub-search-filters')
        .find('gn-ui-filter-dropdown')
        .filter(':visible')
        .should('have.length', 2)
      cy.get('datahub-search-filters')
        .children('div')
        .children('div')
        .eq(1)
        .find('gn-ui-button')
      cy.get('datahub-search-filters').find('gn-ui-sort-by')
    })
    it('should display the "add more" button', () => {
      cy.get('[data-cy="addMoreBtn"]')
    })
  })

  describe('display of dataset previews', () => {
    beforeEach(() => {
      cy.get('gn-ui-record-preview-row').children('div').first().as('dataset')
    })
    it('should display the image', () => {
      cy.get('@dataset').find('gn-ui-thumbnail').should('be.visible')
    })
    it('should display the title', () => {
      cy.get('@dataset')
        .find('div')
        .filter('[data-cy="recordTitle"]')
        .should('be.visible')
    })
    it('should display the summary', () => {
      cy.get('@dataset')
        .find('div')
        .filter('[data-cy="recordAbstract"]')
        .should('be.visible')
    })
    it('should display the provider', () => {
      cy.get('@dataset')
        .find('div')
        .filter('[data-cy="recordOrg"]')
        .should('be.visible')
    })
    it('should display the star and like count', () => {
      cy.get('@dataset')
        .find('div')
        .filter('[data-cy="recordFav"]')
        .should('be.visible')
    })
  })

  describe('list actions', () => {
    beforeEach(() => {
      cy.get('gn-ui-record-preview-row').children('div').first().as('dataset')
    })
    it('should open the dataset page on click', () => {
      cy.get('@dataset').click()
      cy.url().should('include', '/dataset/')
    })
    it('should add the dataset to favorites on click on star', () => {
      cy.get('gn-ui-favorite-star').eq(0).as('favoriteStar')
      cy.get('@favoriteStar').trigger('mouseenter')
      cy.get('[id="tippy-1"]').find('a').click()
      cy.url().should('include', 'signin')
      cy.get('input').filter(':visible').as('login')
      cy.get('@login').first().type('admin')
      cy.get('@login').eq(1).type('admin')
      cy.get('[name="gnSigninForm"').find('button').click()
      cy.url().should('include', '/home/search')
      cy.get('@favoriteStar').find('span').invoke('text').as('initialCount')
      cy.get('@favoriteStar').find('gn-ui-star-toggle').find('button').click()
      cy.get('@favoriteStar')
        .find('span')
        .invoke('text')
        .should('not.eq', '@initalCount')
    })
    it('should add more datasets to the list on click on "add more"', () => {
      cy.get('gn-ui-results-list-item').as('initialList')
      cy.get('[data-cy="addMoreBtn"]').trigger('click')
      cy.get('gn-ui-results-list-item').should('not.eq', '@initialList')
    })
  })

  describe('list actions', () => {
    beforeEach(() => {
      cy.get('datahub-search-filters')
        .find('gn-ui-filter-dropdown')
        .as('filters')
    })
    it('should display all filters on click on button', () => {
      cy.get('datahub-search-filters')
        .children('div')
        .children('div')
        .eq(1)
        .find('gn-ui-button')
        .click()
      cy.get('@filters').filter(':visible').should('have.length', 8)
    })
    describe('have the right options in filters', () => {
      beforeEach(() => {
        cy.get('datahub-search-filters')
          .children('div')
          .children('div')
          .eq(1)
          .find('gn-ui-button')
          .click()
        cy.get('[data-cy="addMoreBtn"]').trigger('click')
        cy.get('@filters').first().click()
      })

      it('should not have duplicates', () => {
        let dropdownOptions = []
        cy.get('[id^=dropdown-multiselect-]').then((dropdown) => {
          const options = dropdown.find('label')
          const regex = /\(\d+\)/g
          dropdownOptions = options
            .map((index, element) =>
              Cypress.$(element).text().replace(regex, '').trim()
            )
            .get()
          const hasDuplicates = dropdownOptions.some(
            (text, index) => dropdownOptions.indexOf(text) !== index
          )
          expect(hasDuplicates).to.be.false
        })
      })
      it('should contain all organizations', () => {
        cy.get('[id^=dropdown-multiselect-]').then((dropdown) => {
          const options = dropdown.find('label')
          const regex = /\(\d+\)/g
          const dropdownOptions = options
            .map((index, element) =>
              Cypress.$(element).text().replace(regex, '').trim()
            )
            .get()

          cy.get('[data-cy="recordOrg"]')
            .invoke('text')
            .then((value) => {
              const listOptions = value.split('  ').map((item) => item.trim())
              const uniqueListOptions = [...new Set(listOptions)]

              uniqueListOptions.forEach((item) => {
                expect(dropdownOptions.includes(item)).to.be.true
              })
            })
        })
      })
      it('should have an accurate count of data per org', () => {
        const dropdownOptions = []
        const listOptions = []

        cy.get('[id^=dropdown-multiselect-]').then((dropdown) => {
          const options = dropdown.find('label')
          const regex = /\(\d+\)/g
          options.map((index, element) => {
            dropdownOptions.push([
              Cypress.$(element).text().replace(regex, '').trim(),
              Number(
                Cypress.$(element)
                  .text()
                  .match(regex)[0]
                  .replace('(', '')
                  .replace(')', '')
              ),
            ])
          })
        })

        cy.get('[data-cy="recordOrg"]')
          .invoke('text')
          .then((value) => {
            const listProv = value.split('  ').map((item) => item.trim())
            const occurrences = {}

            for (let i = 0; i < listProv.length; i++) {
              const str = listProv[i]
              occurrences[str] = occurrences[str] ? occurrences[str] + 1 : 1
            }

            for (const str in occurrences) {
              listOptions.push([str, Number(occurrences[str])])
            }

            listOptions.forEach((item) => {
              expect(
                dropdownOptions.find(
                  (opt) => opt[0] === item[0] && opt[1] === item[1]
                )
              ).to.not.be.undefined
            })
          })
      })
    })

    describe('filter the list on click on options', () => {
      let filterLength
      beforeEach(() => {
        cy.visit('/home/search')
        cy.get('[data-cy="addMoreBtn"]').trigger('click')
        cy.get('@filters')
          .its('length')
          .then((len) => {
            filterLength = len
          })
      })
      it('first option then second option', () => {
        for (let i = 0; i < filterLength; i++) {
          cy.visit('/home/search')
          cy.get('[data-cy="addMoreBtn"]').trigger('click')
          cy.get('datahub-search-filters')
            .children('div')
            .children('div')
            .eq(1)
            .find('gn-ui-button')
            .click()
          cy.get('@filters').eq(i).click()
          let expectedCount
          const regex = /\(\d+\)/g
          cy.get('[id^=dropdown-multiselect-]').each(($dropdown) => {
            const label = $dropdown.prev('label')

            if (label.text() !== '') {
              cy.wrap($dropdown).select('OptionValue')
              cy.get('[id^=dropdown-multiselect-]')
                .find('label')
                .eq(0)
                .find('span')
                .invoke('text')
                .then((val) => {
                  expectedCount = Number(
                    val.match(regex)[0].replace('(', '').replace(')', '')
                  )
                  cy.get('[id^=dropdown-multiselect-]')
                    .find('label')
                    .eq(0)
                    .find('input')
                    .click()
                  cy.get('gn-ui-results-list-item').should(
                    'have.length',
                    expectedCount
                  )

                  cy.get('[id^=dropdown-multiselect-]')
                    .find('label')
                    .eq(1)
                    .as('provider2')
                    .find('span')
                    .invoke('text')
                    .then((val) => {
                      expectedCount =
                        expectedCount +
                        Number(
                          val.match(regex)[0].replace('(', '').replace(')', '')
                        )
                      cy.get('@provider2').find('input').click()

                      cy.get('gn-ui-results-list-item').should(
                        'have.length',
                        expectedCount
                      )
                    })
                })
            } else {
              cy.log('Skipping dropdown with no label')
            }
          })
        }
      })
    })
    describe('filter the list upon removal of options', () => {
      let filterLength
      beforeEach(() => {
        cy.get('@filters')
          .its('length')
          .then((len) => {
            filterLength = len
          })
      })
      it('from option list', () => {
        for (let i = 0; i < filterLength; i++) {
          cy.visit('/home/search')
          cy.get('[data-cy="addMoreBtn"]').trigger('click')
          cy.get('datahub-search-filters')
            .children('div')
            .children('div')
            .eq(1)
            .find('gn-ui-button')
            .click()
          cy.get('@filters').eq(i).click()
          cy.get('[id^=dropdown-multiselect-]').each(($dropdown) => {
            const label = $dropdown.prev('label')

            if (label.text() !== '') {
              cy.get('[id^=dropdown-multiselect-]')
                .find('label')
                .eq(0)
                .find('input')
                .as('opt1')
                .click()
              cy.get('[id^=dropdown-multiselect-]')
                .find('label')
                .eq(1)
                .find('input')
                .as('opt2')
                .click()
              cy.get('gn-ui-results-list-item').then(($element) => {
                const initialLength = $element.length
                cy.wrap(initialLength).as('initialLength')
                cy.get('@opt2').click()
                cy.get('gn-ui-results-list-item').then(($element) => {
                  cy.get('@initialLength').then((initialLength) => {
                    expect($element.length).to.be.lessThan(
                      Number(initialLength)
                    )
                    expect($element.length).to.be.greaterThan(0)
                  })
                })
              })
            } else {
              cy.log('Skipping dropdown with no label')
            }
          })
        }
      })
      it('from selected options block', () => {
        for (let i = 0; i < filterLength; i++) {
          cy.visit('/home/search')
          cy.get('[data-cy="addMoreBtn"]').trigger('click')
          cy.get('datahub-search-filters')
            .children('div')
            .children('div')
            .eq(1)
            .find('gn-ui-button')
            .click()
          cy.get('@filters').eq(i).click()
          cy.get('[id^=dropdown-multiselect-]').each(($dropdown) => {
            const label = $dropdown.prev('label')

            if (label.text() !== '') {
              cy.get('gn-ui-results-list-item').then(($element) => {
                const initialLength = $element.length
                cy.wrap(initialLength).as('initialLength')
                cy.get('[id^=dropdown-multiselect-]')
                  .find('label')
                  .eq(0)
                  .find('input')
                  .click()
                cy.get('[id^=dropdown-multiselect-]')
                  .find('label')
                  .eq(1)
                  .find('input')
                  .click()
                cy.get('[id^=dropdown-multiselect-]')
                  .children('div')
                  .first()
                  .find('button')
                  .first()
                  .click()
                cy.get('gn-ui-results-list-item').then(($element) => {
                  cy.get('@initialLength').then((initialLength) => {
                    expect($element.length).to.be.lessThan(
                      Number(initialLength)
                    )
                    expect($element.length).to.be.greaterThan(0)
                  })
                })
              })
            } else {
              cy.log('Skipping dropdown with no label')
            }
          })
        }
      })

      it('from filter clear button', () => {
        for (let i = 0; i < filterLength; i++) {
          cy.visit('/home/search')
          cy.get('[data-cy="addMoreBtn"]').trigger('click')
          cy.get('datahub-search-filters')
            .children('div')
            .children('div')
            .eq(1)
            .find('gn-ui-button')
            .click()
          cy.get('@filters').eq(i).click()
          cy.get('[id^=dropdown-multiselect-]').each(($dropdown) => {
            const label = $dropdown.prev('label')

            if (label.text() !== '') {
              cy.get('gn-ui-results-list-item').then(($element) => {
                const initialLength = $element.length
                cy.wrap(initialLength).as('initialLength')
                cy.get('[id^=dropdown-multiselect-]')
                  .find('label')
                  .eq(0)
                  .find('input')
                  .click()
                cy.get('[id^=dropdown-multiselect-]')
                  .find('label')
                  .eq(1)
                  .find('input')
                  .click()
                cy.get('[id^=dropdown-multiselect-]')
                  .children('div')
                  .first()
                  .find('button')
                  .first()
                  .click()
                cy.get('gn-ui-results-list-item').then(($element) => {
                  cy.get('@initialLength').then((initialLength) => {
                    expect($element.length).to.be.lessThan(
                      Number(initialLength)
                    )
                    expect($element.length).to.be.greaterThan(0)
                  })
                })
              })
            } else {
              cy.log('Skipping dropdown with no label')
            }
          })
        }
      })

      it.only('from cross button', () => {
        cy.visit('/home/search')
        cy.get('[data-cy="addMoreBtn"]').realClick()
        cy.get('datahub-search-filters')
          .children('div')
          .children('div')
          .eq(1)
          .find('gn-ui-button')
          .click()
        cy.get('@filters').eq(1).click()
        cy.get('gn-ui-results-list-item').then(($element) => {
          const initialLength = $element.length
          cy.wrap(initialLength).as('initialLength')
          cy.get('[id^=dropdown-multiselect-]')
            .find('label')
            .eq(0)
            .find('input')
            .click()
          cy.get('[id^=dropdown-multiselect-]')
            .find('label')
            .eq(1)
            .find('input')
            .click()
          cy.get('@filters')
            .eq(1)
            .find('gn-ui-button')
            .children('button')
            .realClick()
          cy.get('@filters')
            .eq(1)
            .find('gn-ui-button')
            .children('button')
            .children('button')
            .realClick()
          cy.get('[data-cy="addMoreBtn"]').click()
          cy.get('gn-ui-results-list-item').then(($element) => {
            cy.get('@initialLength').then((initialLength) => {
              expect($element.length).to.equal(initialLength)
            })
          })
        })
      })
    })

    describe('multiple filters', () => {
      let listLength
      beforeEach(() => {
        cy.get('[data-cy="addMoreBtn"]').trigger('click')
        cy.get('gn-ui-results-list-item')
          .its('length')
          .then((len) => {
            listLength = len
          })
      })
      it('should change on adding new filter', () => {
        cy.get('@filters').eq(1).click()
        cy.get('[id^=dropdown-multiselect-]')
          .find('label')
          .eq(0)
          .find('input')
          .click()
        cy.get('gn-ui-results-list-item').then(($element) => {
          const newLength = $element.length
          cy.wrap(newLength).as('newLength')
          cy.get('@newLength').should('be.lessThan', Number(listLength))
          cy.get('@filters').eq(1).realClick()
          cy.get('@filters').eq(0).realClick()
          cy.get('[id^=dropdown-multiselect-]')
            .find('label')
            .eq(2)
            .find('input')
            .click()
          cy.get('gn-ui-results-list-item').then(($element) => {
            cy.get('@newLength').then((newLength) => {
              expect($element.length).to.be.lessThan(Number(newLength))
            })
          })
        })
      })
      it('should change the list once on removing one filter', () => {
        cy.get('@filters').eq(1).click()
        cy.get('[id^=dropdown-multiselect-]')
          .find('label')
          .eq(0)
          .find('input')
          .click()
        cy.get('@filters').eq(1).realClick()
        cy.get('@filters').eq(0).realClick()
        cy.get('[id^=dropdown-multiselect-]')
          .find('label')
          .eq(2)
          .find('input')
          .click()
        cy.get('gn-ui-results-list-item').then(($element) => {
          const newLength = $element.length
          cy.wrap(newLength).as('newLength')
          cy.get('[id^=dropdown-multiselect-]')
            .find('label')
            .eq(2)
            .find('input')
            .click()
          cy.get('gn-ui-results-list-item').then(($element) => {
            cy.get('@newLength').then((newLength) => {
              expect($element.length).to.be.greaterThan(Number(newLength))
            })
          })
        })
      })
    })

    describe('sort and clear filters', () => {
      let listLength
      beforeEach(() => {
        cy.get('[data-cy="addMoreBtn"]').trigger('click')
        cy.get('gn-ui-results-list-item')
          .its('length')
          .then((len) => {
            listLength = len
          })
        cy.get('datahub-search-filters')
          .children('div')
          .children('div')
          .eq(1)
          .find('gn-ui-button')
          .click()
      })
      it('should clear all applied filters on click', () => {
        cy.get('@filters').eq(0).click()
        cy.get('[id^=dropdown-multiselect-]')
          .find('label')
          .eq(0)
          .find('input')
          .click({ force: true })
        cy.get('@filters').eq(0).realClick()
        cy.get('@filters').eq(1).realClick()
        cy.get('[id^=dropdown-multiselect-]')
          .find('label')
          .eq(0)
          .find('input')
          .realClick()
        cy.get('gn-ui-results-list-item').should(
          'have.length.lessThan',
          listLength
        )
        cy.get('@filters').eq(1).realClick()
        cy.get('[data-cy="clearFilters"]').realClick()
        cy.get('gn-ui-results-list-item').then(($element) => {
          expect($element.length).to.equal(Number(listLength))
        })
      })
      it('should sort the list by popularity', () => {
        cy.get('gn-ui-results-list-item').as('initialList')
        cy.get('datahub-search-filters')
          .find('gn-ui-dropdown-selector')
          .find('select')
          .select(2)
        cy.get('gn-ui-results-list-item').should('not.eq', '@initialList')
        cy.get('gn-ui-favorite-star')
          .find('span')
          .invoke('text')
          .then(($element) => {
            let outputOrder = false
            for (let i = 0; i < $element.length - 1; i++) {
              if (parseInt($element[i]) < parseInt($element[i + 1])) {
                outputOrder = false
              } else {
                outputOrder = true
              }
              expect(outputOrder).to.be.true
            }
          })
      })
      it('should sort the list by date', () => {
        cy.get('gn-ui-results-list-item').as('initialList')
        cy.get('datahub-search-filters')
          .find('gn-ui-dropdown-selector')
          .find('select')
          .select(1)
        cy.get('gn-ui-results-list-item').should('not.eq', '@initialList')
      })
      it('should sort the list by relevance', () => {
        cy.get('datahub-search-filters')
          .find('gn-ui-dropdown-selector')
          .find('select')
          .select(1)
        cy.get('gn-ui-results-list-item').as('initialList')
        cy.get('datahub-search-filters')
          .find('gn-ui-dropdown-selector')
          .find('select')
          .select(0)
        cy.get('gn-ui-results-list-item').should('not.eq', '@initialList')
      })
    })
  })
})
