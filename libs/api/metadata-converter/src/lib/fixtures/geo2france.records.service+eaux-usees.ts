import { ServiceRecord } from '@geonetwork-ui/common/domain/model/record'

export const GEO2FRANCE_SERVICE_EAUXUSEES_RECORD: ServiceRecord = {
  uniqueIdentifier: 'be052079-f1f6-4f6f-a722-cbf11deb40eb',
  resourceIdentifier: 'https://id.eaufrance.fr/meta/ODP_WFS',
  kind: 'service',
  otherLanguages: [],
  defaultLanguage: 'fr',
  recordUpdated: new Date('2024-05-29T11:58:54.326Z'),
  resourceCreated: new Date('2019-12-02T00:00:00.000Z'),
  title:
    'Service web géographique OGC (WFS) du référentiel des Stations de traitement des eaux usées - Ouvrages de dépollution',
  abstract:
    "Le service web (WFS) du référentiel des Stations de traitement des eaux permet de télécharger les ouvrages impliqués dans la dépollution des eaux usées. Les différents concepts définis dans le scénario d'échange du référentiel Stations de traitement des eaux usées du Sandre sont diffusés par ce service.",
  ownerOrganization: {
    name: 'Sandre',
    translations: {},
  },
  contacts: [
    {
      email: 'sandre@sandre.eaufrance.fr',
      role: 'point_of_contact',
      organization: {
        name: 'Sandre',
        translations: {},
      },
      address: 'OIEau, 15 rue Edouard Chamberland, 87000, France',
    },
  ],
  contactsForResource: [
    {
      email: 'sandre@sandre.eaufrance.fr',
      role: 'custodian',
      organization: {
        name: 'Sandre',
        translations: {},
      },
      address: 'OIEau, 15 Rue Edouad Chamberland, 87000, France',
    },
  ],
  keywords: [
    {
      label: 'WFS',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Ouvrage de dépollution',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Rapportage',
      type: 'theme',
      translations: {},
    },
    {
      label: 'ODP',
      type: 'theme',
      translations: {},
    },
    {
      label: 'SysTraitementEauxUsees',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Données ouvertes',
      type: 'theme',
      translations: {},
    },
    {
      label: "Services d'utilité publique et services publics",
      type: 'theme',
      translations: {},
    },
    {
      label: 'France métropolitaine',
      type: 'theme',
      translations: {},
    },
    {
      label: 'hvd',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: null,
        name: 'Champ géographique',
      },
      label: 'National',
      type: 'other',
      translations: {},
    },
    {
      thesaurus: {
        id: 'Registre de thème INSPIRE',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL('http://inspire.ec.europa.eu/theme'),
      },
      label: "Services d'utilité publique et services publics",
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: null,
        name: 'COMMISSION REGULATION (EC) No 1205/2008 of 3 December 2008 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards metadata, Part D 4, Classification of Spatial Data Services',
      },
      label: 'Service d’accès aux éléments',
      type: 'other',
      translations: {},
    },
    {
      thesaurus: {
        id: null,
        name: 'INSPIRE priority data set',
      },
      label: 'Directive 2012/18/EU',
      type: 'other',
      translations: {},
    },
    {
      thesaurus: {
        id: null,
        name: 'INSPIRE priority data set',
      },
      label:
        'Urban waste-water treatment plants (Urban Waste Water Treatment Directive)',
      type: 'other',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.high-value-dataset-category-skos-ap-eu',
        name: 'High-value dataset categories',
        url: new URL(
          'https://www.sandre.eaufrance.fr/atlas/srv/api/registries/vocabularies/external.theme.high-value-dataset-category-skos-ap-eu'
        ),
      },
      label: 'Observation de la terre et environnement',
      type: 'theme',
      translations: {},
    },
  ],
  topics: [],
  licenses: [],
  legalConstraints: [
    {
      url: new URL(
        'http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations'
      ),
      text: 'No limitations on public access',
      translations: {},
    },
    {
      url: new URL(
        'http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply'
      ),
      text: 'No conditions apply to access and use',
      translations: {},
    },
  ],
  securityConstraints: [],
  spatialExtents: [
    {
      bbox: [-61.798, -21.371, 55.855, 51.088],
      translations: {},
    },
  ],
  otherConstraints: [],
  overviews: [],
  onlineResources: [
    {
      type: 'endpoint',
      url: new URL(
        'https://services.sandre.eaufrance.fr/geo/odp?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetCapabilities'
      ),
      accessServiceProtocol: 'wfs',
      description:
        'Ouvrages de dépollution - Système de traitement des eaux usées - France entière',
      translations: {},
    },
  ],
  translations: {},
}
