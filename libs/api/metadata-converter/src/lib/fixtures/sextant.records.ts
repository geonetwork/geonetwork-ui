import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export const SEXTANT_BATHYMETRY_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier: '370ab490-e8b4-11df-b733-005056987263',
  title:
    'MNT de Bathymétrie de la zone du Golo - Campagne Sigolo (réalisé en 2008, résolution 25m)',
  contacts: [
    {
      role: 'custodian',
      email: 'gmcarto@ifremer.fr',
      firstName: 'Ifremer - Géosciences Marines',
    },
    {
      email: 'gmcarto@ifremer.fr',
      firstName: 'Ifremer - Géosciences Marines',
      role: 'processor',
    },
    {
      email: 'gmcarto@ifremer.fr',
      firstName: 'Ifremer - Géosciences Marines',
      role: 'processor',
    },
  ],
  contactsForResource: [],
  landingPage: new URL(
    'https://sextant.ifremer.fr/geonetwork/api/collections/main/items/370ab490-e8b4-11df-b733-005056987263'
  ),
  distributions: [
    {
      description: 'Cartographie - Géosciences Marines Ifremer',
      name: '',
      type: 'link',
      url: new URL('http://wwz.ifremer.fr/drogm/Cartographie'),
    },
  ],
  keywords: [],
  kind: 'dataset',
  languages: [],
  legalConstraints: [],
  licenses: [],
  otherConstraints: [],
  overviews: [],
  securityConstraints: [],
  spatialExtents: [],
  temporalExtents: [],
  topics: [],
  abstract: `Modèle bathymétrique (MNT) d'une partie de l'édifice sédimentaire sous-marin du Golo, à l'Est du Cap Corse. Les données ont été acquises lors de la campagne océanographique Sigolo en 2008, avec les sondeurs multifaisceaux EM300 et EM1000.
                Le pas de la grille est de 25m.
                Produit interne Ifremer.`,
  lineage: undefined,
  ownerOrganization: undefined,
  recordUpdated: undefined,
  status: undefined,
  updateFrequency: undefined,
}
