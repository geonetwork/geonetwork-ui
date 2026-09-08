import 'cypress-real-events'

describe('datasets', () => {
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

  // closes the dropdown overlay currently open, if any
  const closeDropdown = () =>
    cy.get('body').then(($body) => {
      if ($body.find('.cdk-overlay-backdrop').length) {
        cy.get('.cdk-overlay-backdrop').click()
      }
    })

  // opens the filter dropdown at the given index and reads its options
  const openFilter = (index: number) => {
    closeDropdown()
    cy.get('@filters').eq(index).click()
    getFilterOptions()
  }

  beforeEach(() => {
    cy.visit('/search')

    // aliases
    cy.get('gn-ui-results-list-item').as('results')
    cy.get('[data-cy="ed34db28-5dd4-480f-bf29-dc08f0086131"]').as(
      'sampleResult'
    )
    cy.get('[data-cy="04bcec79-5b25-4b16-b635-73115f7456e4"]').as('inseeResult')
    cy.get('@results')
      .then(($results) => $results.length)
      .as('resultsCount')
    cy.get('gn-ui-filter-dropdown').as('filters')
    cy.get('gn-ui-sort-by').find('gn-ui-dropdown-selector').as('sortBy')
    cy.get('[data-cy="addMoreBtn"]').as('addMoreBtn')
  })

  it('should display the search results and the dataset previews', () => {
    // General display
    // it should only display two filters initially and an expand button
    cy.get('@filters').filter(':visible').should('have.length', 2)
    cy.get('datahub-search-filters')
      .find('[data-cy=filters-expand]')
      .filter(':visible')
      .should('have.length', 1)
    cy.screenshot({ capture: 'viewport' })

    // it should select the right tab
    cy.get('datahub-navigation-menu')
      .find('button')
      .eq(1)
      .invoke('attr', 'ng-reflect-ng-class')
      .should('eq', 'decoration-primary')

    // it should display the results as rows
    cy.get('gn-ui-results-list-item')
      .first()
      .find('gn-ui-record-preview-row')
      .should('have.length', 1)

    // it should display more than 10 results
    cy.get('@addMoreBtn').click() // show all results
    cy.get('@results').should('have.length.above', 10)

    // Sorting
    // it should sort by resource dates initially
    cy.get('@sortBy')
      .getActiveDropdownOption()
      .invoke('attr', 'data-cy-value')
      .should('equal', 'desc,resourceDate.date')

    // it should not offer the quality score sorting when the widget is not enabled
    cy.get('@sortBy').openDropdown().find('button').should('have.length', 3)
    closeDropdown()

    // Display of dataset previews
    // it should display a placeholder for sampleResult and a logo for inseeResult
    cy.get('@sampleResult')
      .find('gn-ui-thumbnail')
      .find('img')
      .invoke('attr', 'src')
      .should(
        'eql',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH5gkNDCUFYjA1nwAAA1pJREFUeNrtnW2TmjAURh8CLlTdrmun///3tZ22+zLuYlehH7jsMGogwRiiec4MM44K6D3x3hAwAIQQQgghhJDYSM5cPwNQAMgBpACUg22GTg2gArAD8A9AKY+9CsgALAF8YRsGALwDeAWw9yGgALCKoKWP+WU8iwxjUsudLBj83sZciIiPSwhoWz7pJ5dUZFQXlEXOZ/DNeTBt3JnhBpc9aacGsOn0BuoIUk3b+5trGnEC4B7Ak4sUlInRU+wB/JbgVxG18KrTBc01EmYmcTFJQUVPy/9zTh/4BthLDOqeenB2DdBtZBN58LsSNpcUoEtTJWM/GIvMhQDde9j6h2OhXAjo6/2Q/lgkLgSQC0IBFEABZEKyiaQv5AAv7fSlS+lPVxRwOXTnEtoTPAs04yfRHGMoz8F/HOiaJfKeggLc78dmOHsVS33y9SUXsDuLlsg6FOAw/fhYhwI0pJ7WoQASpoC9p3UoQEPpaR0K0LCB3fB1e6KfAhxRweAKgQ5PsQxJ+CzCJYC/A7+EWt4TzVCE77GgEsBPHA/G7QBswcE4b+noVRZ2QxkCCqAAQgEUQCiAAggFUAChAAogFEABhAJcfT9FAdOxQuB/ML9lAfdo/qWYy2MK8EiO5mrrliUCvdIudAEzWWzQzWuxwjRnAK9WwAzAWhZTCe3l7cryNQrQBL/txZhKGGrlwc36ogIPfvdzfhuQsDDM80EVZXUFwe+mEJ2EOwBfLfYTTFFWVxL8Qwl3nedSye1jjhEyCjAPflfCWiScU1iDKMrqyoJ/KOFxRDf1sCg/xCxgTPC7EnIHn6GYsiirKw2+ayYryorBn7YoKwb/qCgntywg1OBPdqSsGPyTRXnp07gvPgD8AAl6KIICCAVQAAlLwOg5MSNi9NyqJgKqAHpQoZNZxs5KgG7SDN7AZzgWOxcCtprn5/wVfLb+uWXsrASUPXlvHbmETGKQjBVgMitVJTuaaQS2t/GoEMeE3onEor2jlK4RvwN4G1u9T4n6zp6PMTWAXzCYdCq12OCOhdeYZzT3mIErAW1Fr+HmNOAt82KSesYIAJoRzR2aIVumo+Ms8WwT/HOOZlM0Y+Zzxv2zp/gCTzfzPOyGtdfgp7LEcDvbvSxbWXg/HUIIIYQQQogx/wHLoX7NoCMFPwAAAABJRU5ErkJggg=='
      )
    cy.get('@sampleResult')
      .find('gn-ui-thumbnail')
      .children('div')
      .invoke('attr', 'data-cy-is-placeholder')
      .should('equal', 'true')
    cy.get('@inseeResult')
      .find('gn-ui-thumbnail')
      .children('div')
      .invoke('attr', 'data-cy-is-placeholder')
      .should('equal', 'false')

    // it should display the title, the summary, the organization and the star and like count
    cy.get('@sampleResult').find('[data-cy="recordTitle"]').should('be.visible')
    cy.get('@sampleResult')
      .find('[data-cy="recordAbstract"]')
      .should('be.visible')
    cy.get('@sampleResult').find('[data-cy="recordOrg"]').should('be.visible')
    cy.get('@sampleResult').find('[data-cy="recordFav"]').should('be.visible')

    // Interactions with dataset
    // it should show a popover with login link when hovering the favorite star while not logged in
    cy.get('@sampleResult').find('gn-ui-favorite-star').eq(0).as('favoriteStar')
    cy.get('@favoriteStar').trigger('mouseenter')
    cy.get('[id^="tippy-"]', { timeout: 10000 })
      .find('a')
      .invoke('attr', 'href')
      .should('include', 'catalog.signin')
    cy.screenshot({ capture: 'viewport' })

    // it should open the dataset page in the same application on click
    cy.get('@sampleResult').click()
    cy.url().should('match', /^http:\/\/localhost:[0-9]+\/dataset\/.+/)
  })

  it('should toggle the favorite star of a dataset when logged in', () => {
    cy.login()
    cy.visit('/search')

    cy.get('@sampleResult').find('gn-ui-favorite-star').eq(0).as('favoriteStar')
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

  it('should filter the results with the advanced filters', () => {
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

    // it should display all filters
    cy.get('@filters').filter(':visible').should('have.length', 13)
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
        'spatialExtent',
      ])
    cy.screenshot({ capture: 'viewport' })

    // Organization filter
    // it should have options and no duplicates
    openFilter(0)
    cy.get('@options').should('have.length.above', 0)
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // it should have an accurate count of data per org
    cy.get('@optionsLabel').should('eql', [
      'Agence wallonne du Patrimoine (SPW - Territoire, Logement, Patrimoine, Énergie - Agence wallonne du Patrimoine) (1)',
      'atmo Hauts-de-France (1)',
      'Barbie Inc. (1)',
      'Bundesamt für Raumentwicklung (1)',
      "Canton du Valais - Service de l'environnement (SEN) - Protection des sols (1)",
      'Cellule informatique et géomatique (SPW - Intérieur et Action sociale - Direction fonctionnelle et d’appui) (1)',
      'Cellule SIG (DATT) TEST (3)',
      'Coordination, Services et Informations Géographiques (COSIG), swisstopo (1)',
      "Direction de l'Action sociale (SPW - Intérieur et Action sociale - Département de l'Action sociale - Direction de l'Action sociale) (1)",
      "Direction de l'Intégration des géodonnées (SPW - Secrétariat général - SPW Digital - Département de la Géomatique - Direction de l'Intégration des géodonnées) (10)",
      'DREAL (1)',
      "DREAL HdF (Direction Régionale de l'Environnement de l'Aménagement et du Logement des Hauts de France) (1)",
      'Fédération Départementale de la Chasse (2)',
      'Fédération Nationale de la Chasse (2)',
      'Géo2France (1)',
      "Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département de la Géomatique - Direction de l'Intégration des géodonnées) (12)",
      'Métropole Européenne de Lille (2)',
      'Moi même (1)',
      'Office France de la Biodiversité (2)',
      'Région Hauts-de-France (1)',
      'Réseau 66fae6c2 sauvages OFB-FNC-FDC (1)',
      'Réseau Ongulés sauvages OFB-FNC-FDC (1)',
      'Service public de Wallonie (SPW) (12)',
      "Société Publique de Gestion de l'Eau (SPGE) (1)",
    ])
    cy.screenshot({ capture: 'viewport' })

    // it should filter by owner org and give the correct results count
    cy.get('@options').eq(14).click()
    cy.get('@resultsCount').then((resultsCount) => {
      cy.get('@results').should('have.length.below', resultsCount) // wait for results change
    })
    cy.get('@options')
      .eq(14)
      .then((option) => {
        const optionText = option.text().trim()
        const matches = /^(.*) \((\d+)\)$/.exec(optionText)
        const orgName = matches[1]
        const resultCount = parseInt(matches[2])
        return [orgName, resultCount]
      })
      .as('nameAndCount')
    cy.get<[string, number]>('@nameAndCount').then(
      ([orgName, resultsCount]) => {
        cy.get('@results')
          .find('[data-cy="recordOrgName"]')
          .then((orgs) => {
            const orgNames = orgs.toArray().map((org) => org.innerText.trim())
            expect(orgNames).to.eql(new Array(resultsCount).fill(orgName))
          })
      }
    )

    // it shows all results if another click on option
    cy.get('@options').eq(14).click()
    cy.get('@resultsCount').then((resultsCount) => {
      cy.get('@results').should('have.length', resultsCount)
    })

    // it increases the result count when adding another option
    cy.get('@options').eq(14).click()
    cy.get('@options').eq(10).click()
    cy.get<[string, number]>('@nameAndCount').then(([, resultsCount]) => {
      cy.get('@results').should('have.length.above', resultsCount) // wait for results change
    })

    // it shows all results again when clearing the filter
    closeDropdown()
    cy.get('@filters').eq(0).find('[data-test="dropdown-clear"]').click()
    cy.get('@resultsCount').then((resultsCount) => {
      cy.get('@results').should('have.length', resultsCount)
    })

    // Format filter
    // it should have options and no duplicates
    openFilter(1)
    cy.get('@options').should('have.length.above', 0)
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // createDate filter
    // it should have options and no duplicates
    openFilter(2)
    cy.get('@options').should('have.length.above', 0)
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // Theme filter
    // it should have options and no duplicates
    openFilter(3)
    cy.get('@options').should('have.length.above', 0)
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // isSpatial filter
    // it should have options and no duplicates
    openFilter(5)
    cy.get('@options').should('have.length.above', 0)
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // Licence filter
    // it should have options and no duplicates
    openFilter(5)
    cy.get('@options').should('have.length.above', 0)
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // Inspire keyword filter
    // it should have options and no duplicates
    openFilter(6)
    cy.get('@options').should('have.length.above', 0)
    cy.get('@optionsLabel')
      .invoke('slice', 0, 3)
      .should('eql', [
        'Administrative units (2)',
        'Environmental monitoring facilities (2)',
        'Land use (1)',
      ])
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // Keyword filter
    // it should have options and no duplicates
    openFilter(7)
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
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // Resource type filter
    // it should have options and no duplicates
    openFilter(8)
    cy.get('@options').should('have.length.above', 0)
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // Representation type filter
    // it should have options and no duplicates
    openFilter(9)
    cy.get('@options').should('have.length.above', 0)
    cy.get<string[]>('@optionsLabelWithoutCount').then(checkHasDuplicates)

    // Multiple filters
    // it shows only one result when combining an org and a theme
    openFilter(0)
    cy.get('@options').eq(1).click()
    closeDropdown()
    openFilter(3)
    cy.get('@options').eq(-2).click()
    closeDropdown()
    cy.get('@resultsCount').then((resultsCount) => {
      cy.get('@results').should('have.length.below', resultsCount)
    })

    // it shows all results again when clearing all filters
    cy.get('[data-cy="clearFilters"]').click()
    cy.get('@resultsCount').then((resultsCount) => {
      cy.get('@results').should('have.length', resultsCount)
    })
  })

  it('should filter the results on a geometry and on a spatial extent', () => {
    const geojsonFile = 'src/fixtures/spatial-extent-rhone-valley.geojson'
    // bbox of the polygon held by the fixture above
    const bboxSearchParam = 'spatialExtent=7.5,46.1,7.8,46.3'
    // record whose spatial extent intersects the bbox of the fixture
    const rhoneRecordUuid = 'a8b5e6c0-c21d-4c32-b8f9-10830215890a'

    const openSpatialExtentDropdown = () =>
      cy.get('@spatialExtentFilter').find('button').first().click('left')

    const importFile = (file: Cypress.FileReference) =>
      cy.get('[data-cy="importGeojson"]').uploadFile(file)

    const expectNoSpatialExtentInUrl = () =>
      cy
        .location('search')
        .should((search) => expect(search).not.to.contain('spatialExtent'))

    // Filter by geometry
    // this will enable spatial filtering
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-geometry.toml',
    })
    cy.visit('/search?_sort=-_score')

    // it boosts records in the provided geometry
    cy.get('gn-ui-results-list-item')
      .eq(0)
      .find('[data-cy=recordTitle]')
      .invoke('text')
      .invoke('trim')
      .should('eql', 'Cartographie des sols agricoles de la plaine du Rhône')
    cy.screenshot({ capture: 'viewport' })

    // Spatial extent filter
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-spatial-extent-filter.toml',
    })
    cy.visit('/search')
    cy.get('gn-ui-filter-dropdown gn-ui-spatial-extent-dropdown').as(
      'spatialExtentFilter'
    )
    cy.get('[data-cy="resultsHitsFound"]').as('hits')

    // it filters the search on the bbox of an imported GeoJSON file
    cy.get('@hits').should('contain.text', '33 ')
    openSpatialExtentDropdown()
    importFile(geojsonFile)
    cy.location('search').should((search) =>
      expect(decodeURIComponent(search)).to.contain(bboxSearchParam)
    )
    cy.get('@hits').should('contain.text', '7 ')
    cy.get(`[data-cy="${rhoneRecordUuid}"]`).should('exist')

    // it labels the selection after the imported file
    cy.get('[data-test="spatial-extent-selected-item"]').should(
      'contain.text',
      'bbox from spatial-extent-rhone-valley.geojson'
    )
    cy.get('@spatialExtentFilter').should('contain.text', '1')
    cy.screenshot({ capture: 'viewport' })

    // it clears the filter and restores all results when removing the selection
    cy.get('[data-test="spatial-extent-selected-item"]').click()
    cy.get('[data-test="spatial-extent-selected-item"]').should('not.exist')
    expectNoSpatialExtentInUrl()
    cy.get('@hits').should('contain.text', '33 ')

    // it restores the filter from the URL and labels it as pre-selected
    cy.visit(`/search?${bboxSearchParam}`)
    cy.get('@hits').should('contain.text', '7 ')
    cy.get(`[data-cy="${rhoneRecordUuid}"]`).should('exist')
    cy.get('@spatialExtentFilter').should('contain.text', '1')
    openSpatialExtentDropdown()
    cy.get('[data-test="spatial-extent-selected-item"]').should(
      'contain.text',
      'Pre-selected bbox'
    )
    cy.screenshot({ capture: 'viewport' })

    // it can be removed like a bbox imported from a file
    cy.get('[data-test="spatial-extent-selected-item"]').click()
    expectNoSpatialExtentInUrl()
    cy.get('@hits').should('contain.text', '33 ')

    // it notifies the user when the file has an unsupported extension
    importFile({
      contents: Cypress.Buffer.from('{}'),
      fileName: 'area-of-interest.txt',
      mimeType: 'text/plain',
    })
    cy.get('gn-ui-notification')
      .should('contain.text', 'GeoJSON import error')
      .and('contain.text', 'could not be read as a valid GeoJSON')

    // it notifies the user when the file is not valid JSON
    importFile({
      contents: Cypress.Buffer.from('not json at all'),
      fileName: 'broken.geojson',
      mimeType: 'application/geo+json',
    })
    cy.get('gn-ui-notification')
      .should('have.length', 1) // the previous notification was replaced
      .and('contain.text', 'could not be read as a valid GeoJSON')

    // it notifies the user when the file holds no geometry
    importFile({
      contents: Cypress.Buffer.from(
        '{"type":"FeatureCollection","features":[]}'
      ),
      fileName: 'no-geometry.geojson',
      mimeType: 'application/geo+json',
    })
    cy.get('gn-ui-notification').should(
      'contain.text',
      'No geometry could be found in the file'
    )

    // it notifies the user when the file is above the maximum size given in the configuration
    importFile({
      contents: Cypress.Buffer.alloc(2 * 1048576, '0'),
      fileName: 'too-large.geojson',
      mimeType: 'application/geo+json',
    })
    cy.get('gn-ui-notification').should(
      'contain.text',
      'The file exceeds the maximum allowed size (1 MB)'
    )
    cy.screenshot({ capture: 'viewport' })

    // none of them applied a filter
    cy.get('[data-test="spatial-extent-selected-item"]').should('not.exist')
    expectNoSpatialExtentInUrl()
    cy.get('@hits').should('contain.text', '33 ')

    // it dismisses the error notification when a valid file is imported
    importFile(geojsonFile)
    cy.get('gn-ui-notification').should('not.exist')
    cy.get('@hits').should('contain.text', '7 ')
  })

  it('should display the metadata quality widget when enabled', () => {
    // this will enable metadata quality widget
    cy.intercept('GET', '/assets/configuration/default.toml', {
      fixture: 'config-with-metadata-quality.toml',
    })
    cy.visit('/search')

    // it should display quality widget
    cy.get('@sortBy').selectDropdownOption('desc,resourceDate.date')
    cy.get(
      '[data-cy="ed34db28-5dd4-480f-bf29-dc08f0086131"] gn-ui-progress-bar'
    ).should('have.attr', 'ng-reflect-value', 100)

    // it should display results sorted by quality score
    cy.get('@sortBy').selectDropdownOption('desc,qualityScore')
    cy.get('gn-ui-progress-bar')
      .eq(0)
      .should('have.attr', 'ng-reflect-value', 100)
    cy.screenshot({ capture: 'viewport' })
  })
})
