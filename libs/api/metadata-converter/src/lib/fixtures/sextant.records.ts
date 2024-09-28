import {
  CatalogRecord,
  DatasetRecord,
} from '@geonetwork-ui/common/domain/model/record'

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
      translations: {},
    },
  ],
  keywords: [],
  kind: 'dataset',
  otherLanguages: [],
  defaultLanguage: 'fr',
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
  translations: {},
}

export const SEXTANT_CURRENTS_DATASET_RECORD: CatalogRecord = {
  abstract:
    "Position hebdomadaire des trois principaux fronts du Courant Circumpolaire Antarctique (ACC, Antarctic Circumpolar Current) : le Front Polaire (PF) et les branches nord et sud du front subantarctique (SAF-N et SAF-S), à partir de données altimétriques de topographie dynamique absolue (ADT).\n\n                    Les positions moyennes et la variabilité temporelle des principaux fronts polaires de l'océan Austral sont calculées à partir des données Copernicus Absolute Dynamic Topography (https://doi.org/10.48670/moi-00148\n\n                    La technique originale, développée par Sallée et al. (2008), suppose que les iso-contours de la topographie dynamique absolue (ADT) des satellites peuvent être des proxys pour la définition hydrographique traditionnelle de subsurface des principaux fronts de l'océan Austral. Cette version comprend des mises à jour avec les définitions suivantes :\n\n                    -Le front polaire (PF) est associé au contour de -0,30 m de l'ADT ;\n                    - La branche sud (principale) du front subantarctique (SAF) est associée au contour de -0,10 m ADT\n                    - La branche nord du Front subantarctique (SAF-N) est associée au contour de 0 m ADT.\n\n                    Ce produit est expérimental.\n\n                    Référence:\n                    - Auger, M. Etude de la variabilité de l’océan Austral à partir de 25 ans de mesures SURVOSTRAL. Masters Report, University Toulouse III, 2018. https://zenodo.org/doi/10.5281/zenodo.4094959\n                    - Sallée, J. B., K. Speer, and R. Morrow, 2008: Response of the Antarctic Circumpolar Current to Atmospheric Variability. J. Climate, 21, 3020–3039, https://doi.org/10.1175/2007JCLI1702.1",
  contacts: [],
  contactsForResource: [
    {
      email: 'ctoh_products@legos.obs-mip.fr',
      organization: {
        name: 'CTOH/LEGOS',
        translations: {},
      },
      role: 'originator',
    },
    {
      email: 'aviso@altimetry.fr',
      organization: {
        name: 'AVISO',
        translations: {},
      },
      role: 'point_of_contact',
    },
    {
      email: 'missing@missing.com',
      organization: {
        name: 'CNES',
        translations: {},
      },
      role: 'funder',
    },
    {
      email: 'missing@missing.com',
      organization: {
        name: 'AVISO',
        translations: {},
      },
      role: 'distributor',
    },
  ],
  defaultLanguage: 'fr',
  otherLanguages: ['en'],
  keywords: [
    {
      label: '',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.sextant-theme',
        name: 'Thèmes Sextant',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/local.theme.sextant-theme'
        ),
      },
      type: 'theme',
      translations: {},
    },
    {
      label: '',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
        ),
      },
      type: 'theme',
      translations: {},
    },
    {
      label: 'CDS-SAT-AVISO',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.odatis_centre_donnees',
        name: 'Centre de données ODATIS',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/local.theme.odatis_centre_donnees'
        ),
      },
      type: 'theme',
      translations: {
        label: {
          en: 'CDS-SAT-AVISO',
        },
      },
    },
    {
      label: '',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.odatis_variables',
        name: 'Variables ODATIS',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/local.theme.odatis_variables'
        ),
      },
      type: 'theme',
      translations: {},
    },
    {
      label: "Données d'observation",
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.type_jeux_donnee',
        name: 'Type de jeux de donnée ODATIS',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/local.theme.type_jeux_donnee'
        ),
      },
      type: 'theme',
      translations: {
        label: {
          en: 'Observational data',
        },
      },
    },
    {
      label: 'Télédétection',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.odatis_thematiques',
        name: 'Thèmatiques ODATIS',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/local.theme.odatis_thematiques'
        ),
      },
      type: 'theme',
      translations: {
        label: {
          en: 'Remote sensing',
        },
      },
    },
    {
      label: 'front positions',
      type: 'theme',
      translations: {},
    },
    {
      label: '',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.IR',
        name: 'Infrastructures de recherche',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/local.theme.IR'
        ),
      },
      type: 'theme',
      translations: {},
    },
    {
      label: 'SNO-CTOH',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.SNO',
        name: "Services Nationaux d'Observation",
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/local.theme.SNO'
        ),
      },
      type: 'theme',
      translations: {
        label: {
          en: 'SNO-CTOH',
        },
      },
    },
    {
      label: 'Courants',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.NVS.OD1',
        name: 'ODATIS aggregation parameters and Essential Variable names',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/external.theme.NVS.OD1'
        ),
      },
      type: 'theme',
      translations: {
        label: {
          en: 'Currents',
        },
      },
    },
    {
      label: 'Hauteur de la surface de la mer',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.NVS.OD1',
        name: 'ODATIS aggregation parameters and Essential Variable names',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/external.theme.NVS.OD1'
        ),
      },
      type: 'theme',
      translations: {
        label: {
          en: 'Sea surface height',
        },
      },
    },
    {
      label: '/Ocean Circulation/Ocean Currents',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.GCMDparameter',
        name: 'Cersat - GCMD parameter',
        url: new URL(
          'https://sextant.ifremer.fr/geonetwork/srv/api/registries/vocabularies/external.theme.GCMDparameter'
        ),
      },
      type: 'theme',
      translations: {
        label: {
          en: '/Ocean Circulation/Ocean Currents',
        },
      },
    },
  ],
  kind: 'dataset',
  landingPage: new URL(
    'https://sextant.ifremer.fr/geonetwork/srv/api/records/74ce72b9-0196-4eca-abfe-8600f69bd5c4'
  ),
  legalConstraints: [],
  licenses: [
    {
      text: '',
      translations: {},
    },
    {
      text: 'These are standard products as stated in the licence agreement: https://www.aviso.altimetry.fr/fileadmin/documents/data/License_Aviso.pdf\n                            Citation: When using the Antarctic Circumpolar Current (ACC) - fronts product, please cite "The Antarctic Circumpolar Current (ACC) - fronts product DOI: 10.24400/527896/a01-2023.004 was produced by CTOH and distributed by AVISO+ (https://www.aviso.altimetry.fr/) with support from CNES."',
      translations: {
        text: {
          en: 'These are standard products as stated in the licence agreement: https://www.aviso.altimetry.fr/fileadmin/documents/data/License_Aviso.pdf\n                                    Citation: When using the Antarctic Circumpolar Current (ACC) - fronts product, please cite "The Antarctic Circumpolar Current (ACC) - fronts product DOI: 10.24400/527896/a01-2023.004 was produced by CTOH and distributed by AVISO+ (https://www.aviso.altimetry.fr/) with support from CNES."',
        },
      },
    },
    {
      text: 'None',
      translations: {},
    },
  ],
  lineage:
    'Sallée, J.B.; Speer, K and Morrow, R. Southern Ocean fronts and their variability to climate modes, Journ. of Climate, 2008, Vol. 21(12), pp. 3020-3039',
  onlineResources: [
    {
      name: 'Digital Object Identifier (DOI)',
      type: 'link',
      url: new URL('https://doi.org/10.24400/527896/a01-2023.004'),
      translations: {},
    },
    {
      description: "Plus d'information sur AVISO",
      name: 'Web link (URL)',
      type: 'link',
      url: new URL(
        'https://www.aviso.altimetry.fr/fr/donnees/produits/produits-a-valeur-ajoutee/produit-fronts-acc.html'
      ),
      translations: {
        description: {
          en: 'Further information on AVISO',
        },
      },
    },
    {
      description: 'Manuel utilisateur',
      name: 'Web link (URL)',
      type: 'link',
      url: new URL(
        'https://www.aviso.altimetry.fr/fileadmin/documents/data/tools/hdbk_ACC_fronts.pdf'
      ),
      translations: {
        description: {
          en: 'User Handbook',
        },
      },
    },
    {
      description: 'THREDDS',
      mimeType: 'NetCDF',
      name: 'Accès Thredds fichier SubantarcticFront',
      type: 'download',
      url: new URL(
        'https://dataterra:odatis@tds-odatis.aviso.altimetry.fr/thredds/catalog/dataset-antarctic-circumpolar-current-fronts-weekly.xml/catalog.html?dataset=dataset-antarctic-circumpolar-current-fronts-weekly.xml/CTOH_SubantarcticFront_weekly_1993_2023.nc'
      ),
      translations: {
        description: {
          en: 'THREDDS',
        },
      },
    },
    {
      description: 'THREDDS',
      mimeType: 'NetCDF',
      name: 'Accès Thredds fichier Polar Front',
      type: 'download',
      url: new URL(
        'https://dataterra:odatis@tds-odatis.aviso.altimetry.fr/thredds/catalog/dataset-antarctic-circumpolar-current-fronts-weekly.xml/catalog.html?dataset=dataset-antarctic-circumpolar-current-fronts-weekly.xml/CTOH_PolarFront_weekly_1993_2023.nc'
      ),
      translations: {
        description: {
          en: 'THREDDS',
        },
      },
    },
    {
      description: 'THREDDS',
      mimeType: 'NetCDF',
      name: 'Accès Thredds fichier NorthernSubantarcticFront',
      type: 'download',
      url: new URL(
        'https://dataterra:odatis@tds-odatis.aviso.altimetry.fr/thredds/catalog/dataset-antarctic-circumpolar-current-fronts-weekly.xml/catalog.html?dataset=dataset-antarctic-circumpolar-current-fronts-weekly.xml/CTOH_NorthernSubantarcticFront_weekly_1993_2023.nc'
      ),
      translations: {
        description: {
          en: 'THREDDS',
        },
      },
    },
    {
      accessServiceProtocol: 'wms',
      description: 'NorthernSubantarcticFront',
      type: 'service',
      url: new URL(
        'https://dataterra:odatis@tds-odatis.aviso.altimetry.fr/thredds/wms/dataset-antarctic-circumpolar-current-fronts-weekly.xml/CTOH_NorthernSubantarcticFront_weekly_1993_2023.nc?service=WMS&version=1.3.0&request=GetCapabilities'
      ),
      translations: {
        description: {
          en: 'NorthernSubantarcticFront',
        },
      },
    },
    {
      accessServiceProtocol: 'wms',
      description: 'PolarFront',
      type: 'service',
      url: new URL(
        'https://dataterra:odatis@tds-odatis.aviso.altimetry.fr/thredds/wms/dataset-antarctic-circumpolar-current-fronts-weekly.xml/CTOH_PolarFront_weekly_1993_2023.nc?service=WMS&version=1.3.0&request=GetCapabilities'
      ),
      translations: {
        description: {
          en: 'PolarFront',
        },
      },
    },
    {
      accessServiceProtocol: 'wms',
      description: 'SAF position computed from Copernicus global ADT',
      type: 'service',
      url: new URL(
        'https://dataterra:odatis@tds-odatis.aviso.altimetry.fr/thredds/wms/dataset-antarctic-circumpolar-current-fronts-weekly.xml/CTOH_SubantarcticFront_weekly_1993_2023.nc?service=WMS&version=1.3.0&request=GetCapabilities'
      ),
      translations: {
        description: {
          en: 'SubantarcticFront',
        },
      },
    },
  ],
  otherConstraints: [],
  overviews: [
    {
      url: new URL('http://missing/'),
    },
    {
      description:
        'Mean Polar Fronts positions during the week 2012/03/05. Credits Cnes/LEGOS/CTOH.',
      url: new URL(
        'https://sextant.ifremer.fr/geonetwork/srv/api/records/74ce72b9-0196-4eca-abfe-8600f69bd5c4/attachments/CTOH_ACC_Frontplot_extr.png'
      ),
    },
  ],
  ownerOrganization: {
    name: 'CTOH/LEGOS',
    translations: {},
  },
  recordCreated: new Date('2023-12-06T14:16:42.416Z'),
  recordUpdated: new Date('2024-09-17T13:54:59.711Z'),
  resourcePublished: new Date('2023-03-14T00:00:00.000Z'),
  securityConstraints: [],
  spatialExtents: [
    {
      bbox: [-180, -66, 180, -35],
      translations: {},
    },
  ],
  spatialRepresentation: 'grid',
  status: 'under_development',
  temporalExtents: [
    {
      end: new Date('2023-12-01T00:00:00.000Z'),
      start: new Date('1993-01-01T00:00:00.000Z'),
    },
  ],
  title: 'Position des fronts du Courant Circumpolaire Antarctique',
  topics: ['oceans'],
  translations: {
    abstract: {
      en: 'Weekly position of the three main fronts of the Antarctic Circumpolar Current (ACC) - the Polar Front, and the northern and southern branches of the Subantarctic Front (SAF-N and SAF-S).\n                            The mean and time-varying positions of the main Southern Ocean polar fronts are calculated from the Copernicus Absolute Dynamic Topography data: the global 0.25° x 0.25° daily product (https://doi.org/10.48670/moi-00148\n                            This dataset is used to monitor the position of the three main fronts of the Antarctic Circumpolar Current (ACC) - the Polar Front, and the northern and southern branches of the Subantarctic Front (SAF-N and SAF-S).\n                            The original technique, developed by Sallée et al. (2008), assumes that iso-contours of satellite absolute dynamic topography (ADT) can be proxies for the traditional sub-surface hydrographic definition of the main Southern Ocean fronts. The technique identifies an ADT contour that coincides with a maximum sea surface height gradient. This version includes updates with the following definitions :\n                            - Polar Front (PF) is associated with the -0.30 m ADT contour;\n                            - Southern (main) branch of the Subantarctic Front (SAF) with the -0.10 m ADT contour;\n                            - Northern branch of the Subantarctic Front (SAF-N) with the 0 m ADT contour.\n\n                            The product is an experimental product.\n\n                            References:\n                            - Auger, M. Etude de la variabilité de l’océan Austral à partir de 25 ans de mesures SURVOSTRAL. Masters Report, University Toulouse III, 2018. https://zenodo.org/doi/10.5281/zenodo.4094959\n                            - Sallée, J. B., K. Speer, and R. Morrow, 2008: Response of the Antarctic Circumpolar Current to Atmospheric Variability. J. Climate, 21, 3020–3039, https://doi.org/10.1175/2007JCLI1702.1',
    },
    title: {
      en: 'Position of the Antarctic Circumpolar Current fronts',
    },
  },
  uniqueIdentifier: '74ce72b9-0196-4eca-abfe-8600f69bd5c4',
  updateFrequency: 'unknown',
}
