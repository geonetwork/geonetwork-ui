import { deepFreeze } from './utils/freeze'

export const RECORD_LINK_FIXTURE_WMS = deepFreeze({
  description: 'Lieu de surveillance (point)',
  name: 'surval_parametre_point',
  protocol: 'OGC:WMS',
  url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
})
export const RECORD_LINK_FIXTURE_WPS = deepFreeze({
  description: "Extraction des données d'observation",
  name: 'r:survalextraction',
  protocol: 'OGC:WPS',
  url: 'https://www.ifremer.fr/services/wps/surval',
})
export const RECORD_LINK_FIXTURE_WWW_LINK = deepFreeze({
  description: '',
  name: 'La base de données Quadrige',
  protocol: 'WWW:LINK',
  url: 'http://envlit.ifremer.fr/resultats/quadrige',
})
export const RECORD_LINK_FIXTURE_DOI = deepFreeze({
  protocol: 'WWW:DOI',
  description: 'DOI for the resource',
  url: 'http://doi.org/123-456-678',
})
export const RECORD_LINK_FIXTURE_WFS = deepFreeze({
  description: 'Lieu de surveillance (point)',
  name: 'surval_parametre_point',
  protocol: 'OGC:WFS',
  url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
})
