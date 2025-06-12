import 'cypress-real-events'

describe('organizations', () => {
  beforeEach(() => {
    cy.visit('/home/organisations')

    // aliases
    cy.get('gn-ui-organisations-filter')
      .find('gn-ui-dropdown-selector')
      .as('sort')
    cy.get('gn-ui-pagination').children('div').as('pagination')
    cy.get('gn-ui-organisations')
      .find('gn-ui-organisation-preview')
      .as('organizations')
    cy.get('@organizations')
      .find('[data-cy="organizationName"]')
      .as('organizationsName')
    cy.get('@organizations')
      .find('[data-cy="organizationDesc"]')
      .as('organizationsDesc')
    cy.get('@organizations')
      .find('[data-cy="organizationRecordsCount"]')
      .as('organizationsRecordsCount')
    cy.get('gn-ui-organisations-filter')
      .find('gn-ui-search-input')
      .as('organisationsSearch')
    cy.get('gn-ui-organisations')
      .find('gn-ui-organisations-result')
      .as('organisationsResult')
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
      cy.get('gn-ui-organisations-filter').should('be.visible')
      cy.get('@sort').openDropdown().children('button').should('have.length', 4)
    })
    it('should display organizations with thumbnail, title and description', () => {
      cy.get('@organizations').find('gn-ui-thumbnail').should('be.visible')
      cy.get('@organizationsName').its('text').should('have.length.above', 0)
      cy.get('@organizationsDesc').its('text').should('have.length.above', 0)
      cy.get('@organizationsRecordsCount')
        .its('text')
        .should('have.length.above', 0)
      cy.screenshot({ capture: 'viewport' })
    })
    it('should display organization information', () => {
      cy.get('@organizationsName')
        .eq(3)
        .invoke('text')
        .should('contain', 'Bundesamt für Raumentwicklung')
      cy.get('@organizationsDesc')
        .eq(3)
        .invoke('text')
        .should('contain', 'Bundesamt für Raumentwicklung')
      cy.get('@organizationsRecordsCount')
        .eq(3)
        .invoke('text')
        .should('contain', '1')
    })
    it('should display an actual logo', () => {
      cy.get('@organizations')
        .eq(2)
        .find('img')
        .should('have.attr', 'src')
        .and('contain', 'GN3.png')
    })
    it('should display navigation options', () => {
      cy.get('@pagination').should('be.visible')
    })
  })

  describe('list features', () => {
    it('should open the organization page', () => {
      cy.get('@organizationsName')
        .eq(11)
        .then(($clickedName) => {
          cy.get('@organizations').eq(11).click()
          const expectedUrlPart = encodeURIComponent($clickedName.text().trim())
            .replace(/\(/g, '%28') // Remplace '(' by '%28'
            .replace(/\)/g, '%29') // Remplace ')' by '%29'

          cy.url().should('contain', `organization/${expectedUrlPart}`)
        })
    })
  })

  describe('navigation features', () => {
    const getInnerTexts = ($elts): string[] => {
      return $elts.toArray().map((elt) => elt.innerText.trim())
    }
    const orderBy = (array: string[], dir: -1 | 1): string[] => {
      return array.sort((a, b) => dir * a.localeCompare(b))
    }

    it('should order the list alphabetically (asc)', () => {
      cy.get('@sort').selectDropdownOption('asc,name')
      cy.get('@organizationsName').then(($orgsName) => {
        const orderedNames = getInnerTexts($orgsName)
        expect(orderedNames).to.eql(orderBy(orderedNames, 1))
      })
    })
    it('should order the list alphabetically (desc)', () => {
      cy.get('@sort').selectDropdownOption('desc,name')
      cy.get('@organizationsName').then(($orgsName) => {
        const orderedNames = getInnerTexts($orgsName)
        expect(orderedNames).to.eql(orderBy(orderedNames, -1))
      })
    })
    it('should order the list by dataset count (asc)', () => {
      cy.get('@sort').selectDropdownOption('asc,recordCount')
      cy.get('@organizationsRecordsCount').then(($orgsRecordsCount) => {
        const orderedCounts = getInnerTexts($orgsRecordsCount)
        expect(orderedCounts).to.eql(orderBy(orderedCounts, 1))
      })
    })
    it('should order the list by dataset count (desc)', () => {
      cy.get('@sort').selectDropdownOption('desc,recordCount')
      cy.get('@organizationsRecordsCount').then(($orgsRecordsCount) => {
        const orderedCounts = getInnerTexts($orgsRecordsCount)
        expect(orderedCounts).to.eql(orderBy(orderedCounts, -1))
      })
    })
    it('should navigate to next page with button', () => {
      cy.get('@pagination').children('div').first().find('gn-ui-button').click()
    })
    it('should go to next page with arrow', () => {
      cy.then(() => {
        cy.get('@pagination').find('[data-cy=next-page]').click()
        cy.get('@organizations').should('have.length', 10)
      })
    })
    it('should go back to the first page with arrow', () => {
      cy.then(() => {
        cy.get('@pagination').find('[data-cy=next-page]').click()
        cy.get('@pagination').find('[data-cy=prev-page]').click()
        cy.get('@organizations').should('have.length', 12)
      })
    })
  })

  describe('search filter', () => {
    it('should display filtered results ignoring accents and case', () => {
      cy.get('@organisationsSearch').type('geo2france')
      cy.get('@organizationsName').should('have.length', 1)
      cy.get('@organisationsResult').should('contain', '1')
      cy.get('@organizationsName')
        .eq(0)
        .invoke('text')
        .should('contain', 'Géo2France')
    })
    it('should display filtered results containing multiple words', () => {
      cy.get('@organisationsSearch').type('dreal hdf')
      cy.get('@organizationsName').should('have.length', 1)
      cy.get('@organisationsResult').should('contain', '1')
      cy.get('@organizationsName')
        .eq(0)
        .invoke('text')
        .should('contain', 'DREAL HdF')
    })
    it('should display multiple results and refine search', () => {
      cy.get('@organisationsSearch').type('de Li')
      cy.get('@organizationsName').should('have.length', 3)
      cy.get('@organisationsResult').should('contain', '3')
      cy.get('@organisationsSearch').type('lle')
      cy.get('@organizationsName').should('have.length', 1)
      cy.get('@organisationsResult').should('contain', '1')
    })
    it('should display a message for no results found', () => {
      cy.get('@organisationsSearch').type('An organisation that does not exist')
      cy.get('@organisationsResult').should('contain', 'No organizations found')
    })
    it('should display filtered results after navigation to second page', () => {
      cy.get('@pagination').children('div').first().find('gn-ui-button').click()
      cy.get('@organisationsSearch').type('geo2france')
      cy.get('@organizationsName').should('have.length', 1)
      cy.get('@organisationsResult').should('contain', '1')
      cy.get('@organizationsName')
        .eq(0)
        .invoke('text')
        .should('contain', 'Géo2France')
      cy.screenshot({ capture: 'viewport' })
    })
  })
})
