export const wmsRecordLinkFixture = () => ({
  description: 'Lieu de surveillance (point)',
  name: 'surval_parametre_point',
  accessServiceProtocol: 'OGC:WMS',
  url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
})

export const wpsRecordLinkFixture = () => ({
  description: "Extraction des données d'observation",
  name: 'r:survalextraction',
  accessServiceProtocol: 'OGC:WPS',
  url: 'https://www.ifremer.fr/services/wps/surval',
})

export const wwwRecordLinkFixture = () => ({
  description: '',
  name: 'La base de données Quadrige',
  praccessServiceProtocolotocol: 'WWW:LINK',
  url: 'http://envlit.ifremer.fr/resultats/quadrige',
})

export const doiRecordLinkFixture = () => ({
  accessServiceProtocol: 'WWW:DOI',
  description: 'DOI for the resource',
  url: 'http://doi.org/123-456-678',
})

export const wfsRecordLinkFixture = () => ({
  description: 'Lieu de surveillance (point)',
  name: 'surval_parametre_point',
  accessServiceProtocol: 'OGC:WFS',
  url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
})
