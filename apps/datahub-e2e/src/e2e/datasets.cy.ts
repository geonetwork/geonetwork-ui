import 'cypress-real-events'

describe('datasets', () => {
  beforeEach(() => {
    cy.visit('/search')

    // aliases
    cy.get('gn-ui-results-list-item').as('results')
    cy.get('[data-cy="9e1ea778-d0ce-4b49-90b7-37bc0e448300"]').as(
      'sampleResult'
    )
    cy.get('@results')
      .then(($results) => $results.length)
      .as('resultsCount')
    cy.get('gn-ui-filter-dropdown').as('filters')
    cy.get('gn-ui-sort-by').find('gn-ui-dropdown-selector').as('sortBy')
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
      cy.screenshot({ capture: 'viewport' })
    })
    it('should sort by change date initially', () => {
      cy.get('@sortBy')
        .getActiveDropdownOption()
        .invoke('attr', 'data-cy-value')
        .should('equal', 'desc,changeDate')
    })
  })

  describe('display of dataset previews', () => {
    it('should display a logo for first and a placeholder for second result', () => {
      cy.get('@sortBy').selectDropdownOption('desc,createDate') // this makes the order reliable
      cy.get('@sampleResult')
        .find('gn-ui-thumbnail')
        .children('div')
        .invoke('attr', 'data-cy-is-placeholder')
        .should('equal', 'false')
      cy.get('@sampleResult')
        .find('gn-ui-thumbnail')
        .find('img')
        .invoke('attr', 'src')
        .should(
          'eql',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5gkNDCUFYjA1nwAAA1pJREFUeNrtnW2TmjAURh8CLlTdrmun///3tZ22+zLuYlehH7jsMGogwRiiec4MM44K6D3x3hAwAIQQQgghhJDYSM5cPwNQAMgBpACUg22GTg2gArAD8A9AKY+9CsgALAF8YRsGALwDeAWw9yGgALCKoKWP+WU8iwxjUsudLBj83sZciIiPSwhoWz7pJ5dUZFQXlEXOZ/DNeTBt3JnhBpc9aacGsOn0BuoIUk3b+5trGnEC4B7Ak4sUlInRU+wB/JbgVxG18KrTBc01EmYmcTFJQUVPy/9zTh/4BthLDOqeenB2DdBtZBN58LsSNpcUoEtTJWM/GIvMhQDde9j6h2OhXAjo6/2Q/lgkLgSQC0IBFEABZEKyiaQv5AAv7fSlS+lPVxRwOXTnEtoTPAs04yfRHGMoz8F/HOiaJfKeggLc78dmOHsVS33y9SUXsDuLlsg6FOAw/fhYhwI0pJ7WoQASpoC9p3UoQEPpaR0K0LCB3fB1e6KfAhxRweAKgQ5PsQxJ+CzCJYC/A7+EWt4TzVCE77GgEsBPHA/G7QBswcE4b+noVRZ2QxkCCqAAQgEUQCiAAggFUAChAAogFEABhAJcfT9FAdOxQuB/ML9lAfdo/qWYy2MK8EiO5mrrliUCvdIudAEzWWzQzWuxwjRnAK9WwAzAWhZTCe3l7cryNQrQBL/txZhKGGrlwc36ogIPfvdzfhuQsDDM80EVZXUFwe+mEJ2EOwBfLfYTTFFWVxL8Qwl3nedSye1jjhEyCjAPflfCWiScU1iDKMrqyoJ/KOFxRDf1sCg/xCxgTPC7EnIHn6GYsiirKw2+ayYryorBn7YoKwb/qCgntywg1OBPdqSsGPyTRXnp07gvPgD8AAl6KIICCAVQAAlLwOg5MSNi9NyqJgKqAHpQoZNZxs5KgG7SDN7AZzgWOxcCtprn5/wVfLb+uWXsrASUPXlvHbmETGKQjBVgMitVJTuaaQS2t/GoEMeE3onEor2jlK4RvwN4G1u9T4n6zp6PMTWAXzCYdCq12OCOhdeYZzT3mIErAW1Fr+HmNOAt82KSesYIAJoRzR2aIVumo+Ms8WwT/HOOZlM0Y+Zzxv2zp/gCTzfzPOyGtdfgp7LEcDvbvSxbWXg/HUIIIYQQQogx/wHLoX7NoCMFPwAAAABJRU5ErkJggg=='
        )
      cy.get('@results')
        .first()
        .find('gn-ui-thumbnail')
        .children('div')
        .invoke('attr', 'data-cy-is-placeholder')
        .should('equal', 'true')
    })
    it('should display the title', () => {
      cy.get('@sampleResult')
        .find('[data-cy="recordTitle"]')
        .should('be.visible')
    })
    it('should display the summary', () => {
      cy.get('@sampleResult')
        .find('[data-cy="recordAbstract"]')
        .should('be.visible')
    })
    it('should display the organization', () => {
      cy.get('@sampleResult').find('[data-cy="recordOrg"]').should('be.visible')
    })
    it('should display the star and like count', () => {
      cy.get('@sampleResult').find('[data-cy="recordFav"]').should('be.visible')
    })
  })

  describe('interactions with dataset', () => {
    beforeEach(() => {
      cy.get('@sampleResult')
        .find('gn-ui-favorite-star')
        .eq(0)
        .as('favoriteStar')
    })
    it('should open the dataset page in the same application on click', () => {
      cy.get('@sampleResult').click()
      cy.url().should('match', /^http:\/\/localhost:[0-9]+\/dataset\/.+/)
    })
    describe('not logged in', () => {
      it('should show a popover with login link when hovering the favorite star', () => {
        cy.get('@favoriteStar').trigger('mouseenter')
        cy.get('[id^="tippy-"]', { timeout: 10000 })
          .find('a')
          .invoke('attr', 'href')
          .should('include', 'catalog.signin')
        cy.screenshot({ capture: 'viewport' })
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
        cy.screenshot({ capture: 'viewport' })
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
      expect(hasDuplicates).to.eql(false)
    }

    beforeEach(() => {
      // this will enable all available filters
      cy.intercept('GET', '/assets/configuration/default.toml', {
        fixture: 'config-with-all-filters.toml',
      })
      cy.visit('/search')

      // expand filters
      cy.get('datahub-search-filters')
        .find('[data-cy=filters-expand]')
        .find('button')
        .click()
    })
    it('should display all filters', () => {
      cy.get('@filters').filter(':visible').should('have.length', 12)
      cy.get('@filters')
        .children()
        .then(($dropdowns) =>
          $dropdowns
            .toArray()
            .map((dropdown) => dropdown.getAttribute('data-cy-field'))
        )
        .should('eql', [
          'organization',
          'format',
          'publicationYear',
          'topic',
          'isSpatial',
          'license',
          'inspireKeyword',
          'keyword',
          'resourceType',
          'representationType',
          'producerOrg',
          'publisherOrg',
        ])
      cy.screenshot({ capture: 'viewport' })
    })

    describe('organization filter', () => {
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
          cy.get('@options').eq(13).click()
          cy.get('@resultsCount').then((resultsCount) => {
            cy.get('@results').should('have.length.below', resultsCount) // wait for results change
          })
          cy.get('@options')
            .eq(13)
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
                .find('[data-cy="recordOrgName"]')
                .then((orgs) => {
                  const orgNames = orgs
                    .toArray()
                    .map((org) => org.innerText.trim())
                  expect(orgNames).to.eql(new Array(resultsCount).fill(orgName))
                })
            }
          )
        })

        it('shows all results if another click on option', () => {
          cy.get('@options').eq(13).click()
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
          'Barbie Inc. (1)',
          'Bundesamt für Raumentwicklung (1)',
          "Canton du Valais - Service de l'environnement (SEN) - Protection des sols (1)",
          'Cellule informatique et géomatique (SPW - Intérieur et Action sociale - Direction fonctionnelle et d’appui) (1)',
          'Coordination, Services et Informations Géographiques (COSIG), swisstopo (1)',
          "Direction de l'Action sociale (SPW - Intérieur et Action sociale - Département de l'Action sociale - Direction de l'Action sociale) (1)",
          "Direction de l'Intégration des géodonnées (SPW - Secrétariat général - SPW Digital - Département de la Géomatique - Direction de l'Intégration des géodonnées) (10)",
          'DREAL (1)',
          "DREAL HdF (Direction Régionale de l'Environnement de l'Aménagement et du Logement des Hauts de France) (1)",
          'Fédération Départementale de la Chasse (1)',
          'Fédération Nationale de la Chasse (1)',
          'Géo2France (1)',
          "Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département de la Géomatique - Direction de l'Intégration des géodonnées) (12)",
          'Métropole Européenne de Lille (2)',
          'Moi même (1)',
          'Office France de la Biodiversité (1)',
          'Région Hauts-de-France (1)',
          'Réseau Ongulés sauvages OFB-FNC-FDC (1)',
          'Service public de Wallonie (SPW) (12)',
          "Société Publique de Gestion de l'Eau (SPGE) (1)",
        ])
        cy.screenshot({ capture: 'viewport' })
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

    describe('inspire keyword filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(6).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
        cy.get('@optionsLabel')
          .invoke('slice', 0, 3)
          .should('eql', [
            'Administrative units (1)',
            'Environmental monitoring facilities (2)',
            'Land use (1)',
          ])
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })
    })

    describe('keyword filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(7).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
        cy.get('@optionsLabel')
          .invoke('slice', 0, 8)
          .should('eql', [
            'Région wallonne (12)',
            'Reporting INSPIRENO (8)',
            'Nature et environnement (7)',
            'Sol et sous-sol (6)',
            'pollution (4)',
            'Agriculture (3)',
            'Aménagement du territoire (3)',
            'DONNEE OUVERTE (3)',
          ])
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })
    })

    describe('resource type filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(8).click()
        getFilterOptions()
      })
      it('should have options', () => {
        cy.get('@options').should('have.length.above', 0)
      })
      it('should not have duplicates', () => {
        cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)
      })
    })

    describe('representation type filter', () => {
      beforeEach(() => {
        cy.get('@filters').eq(9).click()
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
        // filter by org
        cy.get('@filters').eq(0).click()
        getFilterOptions()
        cy.get('@options').eq(1).click()
        cy.get('body').click()

        // filter by theme
        cy.get('@filters').eq(3).click()
        getFilterOptions()
        cy.get('@options').eq(-2).click()
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

    describe('filter by geometry', () => {
      beforeEach(() => {
        // this will enable spatial filtering
        cy.intercept('GET', '/assets/configuration/default.toml', {
          fixture: 'config-with-geometry.toml',
        })
        cy.visit('/search?_sort=-_score')
      })
      it('boosts records in the provided geometry', () => {
        cy.get('gn-ui-results-list-item')
          .eq(0)
          .find('[data-cy=recordTitle]')
          .invoke('text')
          .invoke('trim')
          .should(
            'eql',
            'Cartographie des sols agricoles de la plaine du Rhône'
          )
        cy.screenshot({ capture: 'viewport' })
      })
    })
  })

  describe('metadata quality', () => {
    describe('metadata quality widget not enabled', () => {
      it('should not show quality score sorting', () => {
        cy.get('@sortBy').find('button').click()
        cy.get('.cdk-overlay-container')
          .find('[role=listbox]')
          .find('button')
          .should('have.length', 4)
      })
    })

    describe('metadata quality widget enabled', () => {
      beforeEach(() => {
        // this will enable metadata quality widget
        cy.intercept('GET', '/assets/configuration/default.toml', {
          fixture: 'config-with-metadata-quality.toml',
        })
        cy.visit('/search')
      })

      it('should display quality widget', () => {
        cy.get('@sortBy').selectDropdownOption('desc,createDate')
        cy.get(
          '[data-cy="9e1ea778-d0ce-4b49-90b7-37bc0e448300"] gn-ui-progress-bar'
        ).should('have.attr', 'ng-reflect-value', 100)
      })

      it('should display results sorted by quality score', () => {
        cy.get('@sortBy').selectDropdownOption('desc,qualityScore')
        cy.get('gn-ui-progress-bar')
          .eq(0)
          .should('have.attr', 'ng-reflect-value', 100)
        cy.screenshot({ capture: 'viewport' })
      })
    })
  })
})
