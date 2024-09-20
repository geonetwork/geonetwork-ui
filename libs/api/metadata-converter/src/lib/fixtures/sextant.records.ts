import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export const SEXTANT_BATHYMETRY_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier: '370ab490-e8b4-11df-b733-005056987263',
  title:
    'MNT de Bathymétrie de la zone du Golo - Campagne Sigolo (réalisé en 2008, résolution 25m)',
  contacts: [],
  contactsForResource: [
    {
      role: 'custodian',
      email: 'gmcarto@ifremer.fr',
      firstName: 'Ifremer',
      lastName: '- Géosciences Marines',
    },
    {
      email: 'gmcarto@ifremer.fr',
      firstName: 'Ifremer',
      lastName: '- Géosciences Marines',
      role: 'processor',
    },
    {
      email: 'gmcarto@ifremer.fr',
      firstName: 'Ifremer',
      lastName: '- Géosciences Marines',
      role: 'processor',
    },
  ],
  landingPage: new URL(
    'https://sextant.ifremer.fr/geonetwork/api/collections/main/items/370ab490-e8b4-11df-b733-005056987263'
  ),
  onlineResources: [
    {
      description: 'Cartographie - Géosciences Marines Ifremer',
      name: '',
      type: 'link',
      url: new URL('http://wwz.ifremer.fr/drogm/Cartographie'),
    },
  ],
  keywords: [],
  kind: 'dataset',
  otherLanguages: [],
  legalConstraints: [],
  licenses: [],
  otherConstraints: [],
  overviews: [],
  securityConstraints: [],
  spatialExtents: [
    {
      geometry: {
        coordinates: [
          [
            [9.449999, 42.283333],
            [10.033471, 42.283333],
            [10.033471, 42.86684],
            [9.449999, 42.86684],
            [9.449999, 42.283333],
          ],
        ],
        type: 'Polygon',
      },
    },
  ],
  temporalExtents: [],
  topics: [
    '/Milieu physique/Bathymétrie/MNT',
    'Altitude',
    'fond marin',
    'morphologie sous-marine',
    'Bathymétrie',
    'Modèle Numérique de Terrain',
    'Corse',
    'Méditerranée',
    'France',
    'Géophysique',
  ],
  abstract: `Modèle bathymétrique (MNT) d'une partie de l'édifice sédimentaire sous-marin du Golo, à l'Est du Cap Corse. Les données ont été acquises lors de la campagne océanographique Sigolo en 2008, avec les sondeurs multifaisceaux EM300 et EM1000.
                Le pas de la grille est de 25m.
                Produit interne Ifremer.`,
  lineage: '',
  ownerOrganization: null,
  recordUpdated: new Date('2020-06-03T22:34:05.000Z'),
  resourceUpdated: new Date('2020-06-03T22:34:05.000Z'),
  status: 'completed',
  updateFrequency: 'unknown',
}
