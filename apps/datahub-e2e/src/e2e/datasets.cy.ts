import 'cypress-real-events'

describe('datasets', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('/search')
    cy.viewport(1700, 1200)

    // aliases
    cy.get('gn-ui-results-list-item').find('a').as('results')
    cy.get('@results').first().as('firstResult')
    cy.get('@results')
      .then(($results) => $results.length)
      .as('resultsCount')
    cy.get('gn-ui-filter-dropdown').as('filters')
    cy.get('gn-ui-sort-by').as('sortBy')
    cy.get('[data-cy="addMoreBtn"]').as('addMoreBtn')
  })

  describe('general display', () => {
    beforeEach(() => {
      cy.get('@addMoreBtn').click() // show all results
    })
    it('should select the right tab', () => {
      cy.get('datahub-navigation-menu')
        .find('button')
        .eq(1)
        .invoke('attr', 'ng-reflect-ng-class')
        .should('eq', 'decoration-primary')
    })
    it('should display more than 10 results', () => {
      cy.get('@results').should('have.length.above', 10)
    })
    it('should display the results as rows', () => {
      cy.get('gn-ui-results-list-item')
        .first()
        .find('gn-ui-record-preview-row')
        .should('have.length', 1)
    })
    it('should only display two filters initially and an expand button', () => {
      cy.get('@filters').filter(':visible').should('have.length', 2)
      cy.get('datahub-search-filters')
        .find('[data-cy=filters-expand]')
        .filter(':visible')
        .should('have.length', 1)
    })
    it('should sort by relevance initially', () => {
      cy.get('@sortBy')
        .find('option:checked')
        .invoke('val')
        .should('equal', 'desc,_score')
    })
  })

  describe('display of dataset previews', () => {
    it('should display a logo for first and a placeholder for second result', () => {
      cy.get('@sortBy').find('select').select('desc,createDate') // this makes the order reliable
      cy.get('@firstResult')
        .find('gn-ui-thumbnail')
        .children('div')
        .invoke('attr', 'data-cy-is-placeholder')
        .should('equal', 'false')
      cy.get('@firstResult')
        .find('gn-ui-thumbnail')
        .find('img')
        .invoke('attr', 'src')
        .should(
          'eql',
          'https://www.geocat.ch/geonetwork/srv/api/records/a8b5e6c0-c21d-4c32-b8f9-10830215890a/attachments/SEN_CartesThematiquesSols.png'
        )
      cy.get('@results')
        .eq(1)
        .find('gn-ui-thumbnail')
        .children('div')
        .invoke('attr', 'data-cy-is-placeholder')
        .should('equal', 'true')
    })
    it('should display the title', () => {
      cy.get('@firstResult')
        .find('[data-cy="recordTitle"]')
        .should('be.visible')
    })
    it('should display the summary', () => {
      cy.get('@firstResult')
        .find('[data-cy="recordAbstract"]')
        .should('be.visible')
    })
    it('should display the organization', () => {
      cy.get('@firstResult').find('[data-cy="recordOrg"]').should('be.visible')
    })
    it('should display the star and like count', () => {
      cy.get('@firstResult').find('[data-cy="recordFav"]').should('be.visible')
    })
  })

  describe('interactions with dataset', () => {
    beforeEach(() => {
      cy.get('@firstResult')
        .find('gn-ui-favorite-star')
        .eq(0)
        .as('favoriteStar')
    })
    it('should open the dataset page in the same application on click', () => {
      cy.get('@firstResult').click()
      cy.url().should('match', /^http:\/\/localhost:[0-9]+\/dataset\/.+/)
    })
    describe('not logged in', () => {
      it('should show a popover with login link when hovering the favorite star', () => {
        cy.get('@favoriteStar').trigger('mouseenter')
        cy.get('[id="tippy-1"]')
          .find('a')
          .invoke('attr', 'href')
          .should('include', 'catalog.signin')
      })
    })
    describe('when logged in', () => {
      beforeEach(() => {
        cy.login()
        cy.visit('/search')
      })
      it('should toggle the dataset favorite star after a click', () => {
        cy.get('@favoriteStar').find('span').invoke('text').as('initialCount')
        cy.get('@favoriteStar').click()
        cy.get('@favoriteStar')
          .find('span')
          .invoke('text')
          .then((text) => {
            cy.get('@initialCount').should('not.eq', text)
          })
      })
    })
  })

  describe('filtering options', () => {
    const getFilterOptions = () => {
      cy.get('[id^=dropdown-multiselect-] label').as('options')
      cy.get('@options')
        .then((options) =>
          options.toArray().map((element) => element.innerText.trim())
        )
        .as('optionsLabel')
      cy.get('@options')
        .then((options) =>
          options.toArray().map((element) =>
            element.innerText
              .trim()
              .replace(/\(\d+\)$/, '')
              .trim()
          )
        )
        .as('optionsLabelWithoutCount')
    }

    const checkHasDuplicates = (options: string[]) => {
      const hasDuplicates = options.some(
        (text, index) => options.indexOf(text) !== index
      )
      expect(hasDuplicates).to.be.false
    }

    beforeEach(() => {
      // expand filters
      cy.get('datahub-search-filters')
        .find('[data-cy=filters-expand]')
        .find('button')
        .click()
    })
    it('should display all filters', () => {
      cy.get('@filters').filter(':visible').should('have.length', 6)
      cy.get('@filters')
        .children()
        .then(($dropdowns) =>
          $dropdowns
            .toArray()
            .map((dropdown) => dropdown.getAttribute('data-cy-field'))
        )
        .should('eql', [
          'publisher',
          'format',
          'publicationYear',
          'topic',
          'isSpatial',
          'license',
        ])
    })

    describe('publisher filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(0).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })

      describe('filter by one option', () => {
        beforeEach(() => {
          cy.get('@options').eq(11).click()
          cy.get('@resultsCount').then((resultsCount) => {
            cy.get('@results').should('have.length.below', resultsCount) // wait for results change
          })
          cy.get('@options')
            .eq(11)
            .then((option) => {
              const optionText = option.text().trim()
              const matches = /^(.*) \((\d+)\)$/.exec(optionText)
              const orgName = matches[1]
              const resultCount = parseInt(matches[2])
              return [orgName, resultCount]
            })
            .as('nameAndCount')
        })

        it('should filter by owner org and give the correct results count', () => {
          cy.get<[string, number]>('@nameAndCount').then(
            ([orgName, resultsCount]) => {
              cy.get('@results')
                .find('[data-cy="recordOrg"]')
                .then((orgs) => {
                  const orgNames = orgs
                    .toArray()
                    .map((org) => org.innerText.trim())
                  expect(orgNames).to.eql(
                    new Array(resultsCount).fill(orgName.toUpperCase())
                  )
                })
            }
          )
        })

        it('shows all results if another click on option', () => {
          cy.get('@options').eq(11).click()
          cy.get('@resultsCount').then((resultsCount) => {
            cy.get('@results').should('have.length', resultsCount)
          })
        })

        describe('add another option', () => {
          beforeEach(() => {
            cy.get('@options').eq(10).click()
          })
          it('increases the result count', () => {
            cy.get<[string, number]>('@nameAndCount').then(
              ([, resultsCount]) => {
                cy.get('@results').should('have.length.above', resultsCount) // wait for results change
              }
            )
          })

          describe('clearing all filters', () => {
            beforeEach(() => {
              cy.get('body').click() // close dropdown
              cy.get('@filters')
                .eq(0)
                .find('[data-cy="clearSelection"]')
                .click()
            })
            it('shows all results again', () => {
              cy.get('@resultsCount').then((resultsCount) => {
                cy.get('@results').should('have.length', resultsCount)
              })
            })
          })
        })
      })

      it('should have an accurate count of data per org', () => {
        cy.get('@optionsLabel').should('eql', [
          'Agence wallonne du Patrimoine (SPW - Territoire, Logement, Patrimoine, Énergie - Agence wallonne du Patrimoine) (1)',
          'atmo Hauts-de-France (1)',
          'Bundesamt für Raumentwicklung (1)',
          "Canton du Valais - Service de l'environnement (SEN) - Protection des sols (1)",
          'Cellule informatique et géomatique (SPW - Intérieur et Action sociale - Direction fonctionnelle et d’appui) (1)',
          "Direction de l'Action sociale (SPW - Intérieur et Action sociale - Département de l'Action sociale - Direction de l'Action sociale) (1)",
          'DREAL (1)',
          "DREAL HdF (Direction Régionale de l'Environnement de l'Aménagement et du Logement des Hauts de France) (1)",
          'Géo2France (1)',
          "Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département de la Géomatique - Direction de l'Intégration des géodonnées) (2)",
          'Métropole Européenne de Lille (1)',
          'Région Hauts-de-France (2)',
          'Service public de Wallonie (SPW) (2)',
          "Société Publique de Gestion de l'Eau (SPGE) (1)",
        ])
      })
    })

    describe('format filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(1).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })
    })

    describe('createDate filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(2).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })
    })

    describe('theme filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(3).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })
    })

    describe('isSpatial filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(4).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })
    })

    describe('licence filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(5).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })
    })

    describe('multiple filters', () => {
      beforeEach(() => {
        cy.get('datahub-search-filters').scrollIntoView()

        // filter by org
        cy.get('@filters').eq(0).click()
        getFilterOptions()
        cy.get('@options').eq(1).click()
        cy.get('body').click()

        // filter by theme
        cy.get('@filters').eq(3).click()
        getFilterOptions()
        cy.get('@options').last().click()
        cy.get('body').click()
      })
      it('shows only one result', () => {
        cy.get('@resultsCount').then((resultsCount) => {
          cy.get('@results').should('have.length.below', resultsCount)
        })
      })

      describe('clearing all filters', () => {
        beforeEach(() => {
          cy.get('[data-cy="clearFilters"]').click()
        })
        it('shows all results again', () => {
          cy.get('@resultsCount').then((resultsCount) => {
            cy.get('@results').should('have.length', resultsCount)
          })
        })
      })
    })
  })

  describe('sorting results', () => {
    describe('sort by popularity', () => {
      beforeEach(() => {
        cy.get('@sortBy').find('select').select('desc,userSavedCount')
        cy.get('@results')
          .find('gn-ui-favorite-star')
          .find('span')
          .then(($counts) =>
            $counts.toArray().map((span) => parseInt(span.innerText.trim()))
          )
          .as('favoriteCount')
      })
      it('should sort the list by popularity', () => {
        cy.get<number[]>('@favoriteCount').then((favoritesCount) => {
          const ordered = favoritesCount.sort((a, b) => b - a)
          expect(favoritesCount).to.eql(ordered)
        })
      })
    })
    describe('sort by date', () => {
      beforeEach(() => {
        cy.get('@results')
          .find('[data-cy="recordTitle"]')
          .then(($titles) =>
            $titles.toArray().map((title) => title.innerText.trim())
          )
          .as('initialResultTitles')
        cy.get('@sortBy').find('select').select('desc,createDate')
      })
      it('changes the results order', () => {
        cy.get('@initialResultTitles').then((initialResultTitles) => {
          cy.get('@results')
            .find('[data-cy="recordTitle"]')
            .then(($titles) =>
              $titles.toArray().map((title) => title.innerText.trim())
            )
            .should('not.eql', initialResultTitles)
        })
      })
    })
  })
})
