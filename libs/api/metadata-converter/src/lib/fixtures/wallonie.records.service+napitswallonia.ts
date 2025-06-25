import { ServiceRecord } from '@geonetwork-ui/common/domain/model/record'

export const WALLONIE_SERVICE_NAPITSWALLONIA_RECORD: ServiceRecord = {
  uniqueIdentifier: 'fe1c1a3d-c75b-435c-a1d1-48426818f54d',
  resourceIdentifier: 'fe1c1a3d-c75b-435c-a1d1-48426818f54d',
  kind: 'service',
  otherLanguages: [],
  defaultLanguage: 'fr',
  recordCreated: new Date('2023-12-18T12:25:26.465Z'),
  recordUpdated: new Date('2024-10-15T07:37:39.350Z'),
  resourceUpdated: new Date('2023-12-18T00:00:00.000Z'),
  resourcePublished: new Date('2023-12-18T00:00:00.000Z'),
  title: 'Service OGC API Records du catalogue NAP-ITS-Wallonia',
  abstract:
    "Point d'accès OGC API Records du catalogue NAP-ITS-Wallonia contenant la description des données régionales de mobilité telles que demandé par la législation sur les systèmes de transport intelligents.",
  ownerOrganization: {
    name: 'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
    translations: {},
  },
  contacts: [
    {
      email: 'helpdesk.carto@spw.wallonie.be',
      organization: {
        name: 'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
        translations: {},
      },
      role: 'point_of_contact',
    },
  ],
  contactsForResource: [
    {
      email: 'helpdesk.carto@spw.wallonie.be',
      organization: {
        name: 'Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
        translations: {},
      },
      role: 'point_of_contact',
    },
    {
      email: 'helpdesk.carto@spw.wallonie.be',
      organization: {
        name: 'Gestion et valorisation de la donnée (SPW - Secrétariat général - SPW Digital - Département Données transversales - Gestion et valorisation de la donnée)',
        translations: {},
      },
      role: 'custodian',
    },
    {
      email: 'missing@missing.com',
      organization: {
        name: 'Service public de Wallonie (SPW)',
        website: new URL('https://geoportail.wallonie.be/'),
        translations: {},
      },
      role: 'owner',
    },
    {
      email: 'helpdesk.carto@spw.wallonie.be',
      organization: {
        name: 'Service public de Wallonie (SPW)',
        translations: {},
      },
      role: 'distributor',
    },
  ],
  keywords: [
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
        name: 'Thèmes du géoportail wallon',
        url: new URL(
          'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
        ),
      },
      label: 'Mobilité (autre)',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
        name: 'Thèmes du géoportail wallon',
        url: new URL(
          'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
        ),
      },
      label: 'Données de base (autre)',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
        name: 'Thèmes du géoportail wallon',
        url: new URL(
          'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
        ),
      },
      label: 'Mobilité',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.Themes_geoportail_wallon_hierarchy',
        name: 'Thèmes du géoportail wallon',
        url: new URL(
          'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.Themes_geoportail_wallon_hierarchy'
        ),
      },
      label: 'Données de base',
      type: 'theme',
      translations: {},
    },
    {
      label: 'métadonnées',
      type: 'other',
      translations: {},
    },
    {
      label: 'ISO',
      type: 'other',
      translations: {},
    },
    {
      label: 'CSW',
      type: 'other',
      translations: {},
    },
    {
      label: '19115',
      type: 'other',
      translations: {},
    },
    {
      label: '19139',
      type: 'other',
      translations: {},
    },
    {
      label: 'description',
      type: 'other',
      translations: {},
    },
    {
      label: 'MobilityDCAT',
      type: 'other',
      translations: {},
    },
    {
      label: 'DCAT',
      type: 'other',
      translations: {},
    },
    {
      label: 'MMTIS',
      type: 'other',
      translations: {},
    },
    {
      label: 'SRTI',
      type: 'other',
      translations: {},
    },
    {
      label: 'ITS',
      type: 'other',
      translations: {},
    },
    {
      label: 'NAP',
      type: 'other',
      translations: {},
    },
    {
      label: 'transportdata',
      type: 'other',
      translations: {},
    },
    {
      label: 'RTTI',
      type: 'other',
      translations: {},
    },
    {
      label: 'SSTP',
      type: 'other',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.infraSIG',
        name: 'Mots-clés InfraSIG',
        url: new URL(
          'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.infraSIG'
        ),
      },
      label: 'Reporting INSPIRENO',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory',
        name: 'Classification of spatial data services',
        url: new URL(
          'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialDataServiceCategory-SpatialDataServiceCategory'
        ),
      },
      label: 'Service de catalogue',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope',
        name: 'Champ géographique',
        url: new URL(
          'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope'
        ),
      },
      label: 'Régional',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet-theme',
        name: 'GEMET themes',
        url: new URL(
          'https://metawal.wallonie.be/geonetwork/srv/api/registries/vocabularies/external.theme.gemet-theme'
        ),
      },
      label: 'transport',
      type: 'theme',
      translations: {},
    },
  ],
  topics: ['transportation'],
  licenses: [],
  legalConstraints: [
    {
      url: new URL(
        'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations'
      ),
      text: 'No limitations to public access',
      translations: {},
    },
    {
      text: "Aucune contrainte d'utilisation ne s'applique",
      translations: {},
    },
  ],
  securityConstraints: [],
  spatialExtents: [
    {
      bbox: [2.75, 49.45, 6.5, 50.85],
      translations: {},
    },
  ],
  otherConstraints: [
    {
      text: "Aucune condition ne s'applique",
      translations: {},
    },
  ],
  overviews: [
    {
      url: new URL(
        'https://metawal.wallonie.be/geonetwork/srv/api/records/fe1c1a3d-c75b-435c-a1d1-48426818f54d/attachments/echangeur.png'
      ),
      description: 'echangeur.png',
    },
  ],
  onlineResources: [
    {
      type: 'endpoint',
      url: new URL(
        'https://metawal.wallonie.be/geonetwork/api/collections/napits'
      ),
      accessServiceProtocol: 'other',
      description: "Point d'accès OGC API Records pour NAP-ITS-Wallonia.",
      translations: {},
    },
  ],
  translations: {},
  landingPage: new URL(
    'https://metawal.wallonie.be/geonetwork/srv/api/records/fe1c1a3d-c75b-435c-a1d1-48426818f54d'
  ),
}
