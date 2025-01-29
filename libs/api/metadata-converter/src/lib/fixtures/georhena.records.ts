import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'

export const GEORHENA_REUSE_SOLAIRE_RECORD: ReuseRecord = {
  uniqueIdentifier: '015e6d20-0d69-4ae7-adfe-85c588aac141',
  resourceIdentifier: '04_2022_301',
  kind: 'reuse',
  otherLanguages: ['de', 'en'],
  defaultLanguage: 'fr',
  recordUpdated: new Date('2024-11-04T10:13:51.413Z'),
  resourceCreated: new Date('2022-11-30T00:00:00.000Z'),
  resourcePublished: new Date('2023-03-20T00:00:00.000Z'),
  title:
    "Production d'énergie renouvelable de type solaire thermique par km² en 2016",
  abstract:
    "Cette carte représente la production d'énergie renouvelable de type solaire thermique en kWh/km² par commune sur le Rhin supérieur. Le solaire thermique est la chaleur produite par les chauffe-eau solaires collectifs et individuels ainsi que par les systèmes solaires combinés (chauffage et eau chaude sanitaire).",
  ownerOrganization: {
    name: "GeoRhena: Système d'Information Géographique du Rhin Supérieur",
    website: new URL('http://www.georhena.eu/'),
    translations: {
      name: {
        de: 'GeoRhena: Geographische Informationssystem des Oberrheins',
        en: 'GeoRhena: Geographical Information System of the Upper Rhine',
      },
    },
  },
  contacts: [
    {
      email: 'missing@missing.com',
      role: 'author',
      organization: {
        name: "GeoRhena: Système d'Information Géographique du Rhin Supérieur",
        website: new URL('http://www.georhena.eu/'),
        translations: {
          name: {
            de: 'GeoRhena: Geographische Informationssystem des Oberrheins',
            en: 'GeoRhena: Geographical Information System of the Upper Rhine',
          },
        },
      },
      address: "100, avenue d'Alsace, COLMAR, 68000, FR",
    },
  ],
  contactsForResource: [
    {
      email: 'contact@georhena.eu',
      role: 'processor',
      organization: {
        name: 'GeoRhena',
        translations: {
          name: {
            de: 'GeoRhena',
            en: 'GeoRhena',
          },
        },
      },
      address: "100, avenue d'Alsace, COLMAR, 68000, FRANCE",
      phone: '00 33 3 89 30 63 91',
    },
    {
      email: 'contact@atmo-grandest.eu',
      role: 'custodian',
      organization: {
        name: 'ATMO Grand Est',
        website: new URL('https://www.atmo-grandest.eu/'),
        translations: {
          name: {
            de: 'ATMO Grand Est',
            en: 'ATMO Grand Est',
          },
        },
      },
      address: '5, rue de Madrid, Schiltigheim, 67300, France',
      phone: '+33 (0)3 69 24 73 73',
    },
  ],
  keywords: [
    {
      label: 'Carte',
      type: 'other',
      translations: {
        label: {
          de: 'Karte',
          en: 'Map',
        },
      },
    },
    {
      label: 'Rhin Supérieur',
      type: 'other',
      translations: {
        label: {
          de: 'Oberrhein',
          en: 'Upper Rhine',
        },
      },
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET - Concepts, version 2.4',
        url: new URL(
          'https://geoportal.georhena.eu/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      label: "production d'énergie électrique",
      type: 'theme',
      translations: {
        label: {
          de: 'Elektrizitätserzeugung',
          en: 'electricity generation',
        },
      },
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET - Concepts, version 2.4',
        url: new URL(
          'https://geoportal.georhena.eu/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      label: "source d'énergie renouvelable",
      type: 'theme',
      translations: {
        label: {
          de: 'Erneuerbare Energiequelle',
          en: 'renewable energy source',
        },
      },
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET - Concepts, version 2.4',
        url: new URL(
          'https://geoportal.georhena.eu/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      label: 'énergie solaire',
      type: 'theme',
      translations: {
        label: {
          de: 'Solarenergie',
          en: 'solar energy',
        },
      },
    },
  ],
  topics: ['environment'],
  licenses: [],
  legalConstraints: [
    {
      text: "Pas d'autre limitation",
      translations: {
        text: {
          de: 'Keine andere Einschränkung',
          en: 'No other limitation',
        },
      },
    },
  ],
  securityConstraints: [],
  otherConstraints: [
    {
      text: 'Licence CC BY',
      translations: {
        text: {
          de: 'Licence CC BY',
          en: 'Licence CC BY',
        },
      },
    },
  ],
  overviews: [
    {
      url: new URL(
        'https://geoportal.georhena.eu/geonetwork/srv/api/records/015e6d20-0d69-4ae7-adfe-85c588aac141/attachments/04_2022_301.png'
      ),
      description: '04_2022_301.png',
    },
  ],
  spatialExtents: [],
  onlineResources: [
    {
      type: 'link',
      url: new URL(
        'https://www.georhena.eu/sites/default/files/Cartes/04_2022_301.pdf'
      ),
      name: 'Téléchargement du Pdf',
      translations: {
        name: {
          de: 'Pdf herunterladen',
          en: 'Pdf Download',
        },
      },
    },
  ],
  translations: {
    title: {
      de: 'Produktion von erneuerbarer Energie aus Solarthermie pro km² im 2016',
      en: 'Solar thermal renewable energy production per km² in 2016',
    },
    abstract: {
      de: 'Diese Karte stellt die Produktion von erneuerbarer Energie aus Solarthermie in kWh/km² pro Gemeinde am Oberrhein dar. Die Solarthermie ist die Wärme, die durch kollektive, individuelle sowie Gemeinschafts-Solaranlagen erzeugt wird (Heizung sowie Warmwasseraufbereitung).',
      en: 'This map shows the production of renewable energy of the solar thermal type in kWh/km² per municipality on the Upper Rhine. Solar thermal is the heat produced by collective and individual solar water heaters as well as combined solar systems (heating and domestic hot water).',
    },
  },
  lineage: null,
  temporalExtents: [
    {
      start: new Date('2016-01-01T00:00:00.000Z'),
      end: new Date('2016-12-31T00:00:00.000Z'),
    },
  ],
  reuseType: 'map',
}
