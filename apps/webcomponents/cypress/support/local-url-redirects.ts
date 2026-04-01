/**
 * This file contains a series of intercepts made to have the e2e tests work locally.
 * These replicate the URL redirections previously done via sed in the bash build script.
 * These used to be done in the `prepare-wc-pages` script on the HTML samples
 */

export function defineLocalRedirections() {
  // general redirection to the local geonetwork from the docker-composition
  cy.intercept('https://*/geonetwork/**', (req) => {
    req.url = req.url.replace(
      /^https:\/\/.+\/geonetwork/,
      'http://localhost:8080/geonetwork'
    )

    // this will only change some values inside the bodies
    const bodyStr = JSON.stringify(req.body)
    req.body = JSON.parse(
      bodyStr.replace(
        '9da51f58-15c6-4325-82b1-2cf6c8e75d0f',
        '04bcec79-5b25-4b16-b635-73115f7456e4'
      )
    )
  }).as('toGeoNetworkApi')

  // makes the redirection to a datahub instance work
  cy.intercept('https://www.geo2france.fr/datahub/**', (req) => {
    req.url = req.url.replace('https://www.geo2france.fr/datahub', '/datahub')
  }).as('toDatahubApp')

  // works around the OWS proxy present for some datasets
  cy.intercept('https://www.geo2france.fr/mapstore/proxy/?url=**', (req) => {
    const proxiedUrl = req.url.replace(
      'https://www.geo2france.fr/mapstore/proxy/?url=',
      ''
    )
    req.url = decodeURIComponent(proxiedUrl)
  }).as('workdAroundOwsProxy')
}
