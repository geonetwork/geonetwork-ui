import {
  DatasetRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'

export const GEOCAT_CH_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier: '8698bf0b-fceb-4f0f-989b-111e7c4af0a4',
  kind: 'dataset',
  ownerOrganization: {
    name: 'Bundesamt für Raumentwicklung',
  },
  contacts: [
    {
      email: 'rolf.giezendanner@are.admin.ch',
      role: 'point_of_contact',
      address: 'Ittigen, 3063, CH',
      organization: {
        name: 'Bundesamt für Raumentwicklung',
      },
    },
  ],
  contactsForResource: [
    {
      email: 'rolf.giezendanner@are.admin.ch',
      role: 'point_of_contact',
      address: 'Ittigen, 3063, CH',
      organization: {
        name: 'Bundesamt für Raumentwicklung',
      },
    },
    {
      email: 'info@are.admin.ch',
      role: 'owner',
      organization: {
        name: 'Bundesamt für Raumentwicklung',
      },
    },
  ],
  recordUpdated: new Date('2022-02-22T19:40:06'),
  resourceCreated: new Date('1999-01-01T00:00:00'),
  resourceUpdated: new Date('2009-01-01'),
  title: 'Alpenkonvention',
  abstract: `Perimeter der Alpenkonvention in der Schweiz. Die Alpenkonvention ist ein völkerrechtlicher Vertrag zwischen den acht Alpenländern Deutschland, Frankreich, Italien, Liechtenstein, Monaco, Österreich, Schweiz, Slowenien sowie der Europäischen Union. Das Ziel des Übereinkommens ist der Schutz der Alpen durch eine sektorübergreifende, ganzheitliche und nachhaltige Politik.`,
  overviews: [],
  topics: ['planningCadastre', 'planningCadastre_Planning'],
  keywords: [
    {
      thesaurus: {
        name: 'geocat.ch',
        id: 'geonetwork.thesaurus.local.theme.geocat.ch',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
        ),
      },
      type: 'theme',
      label: 'Aufbewahrungs- und Archivierungsplanung AAP - Bund',
    },
    {
      thesaurus: {
        name: 'geocat.ch',
        id: 'geonetwork.thesaurus.local.theme.geocat.ch',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
        ),
      },
      type: 'theme',
      label: 'Geobasisdaten',
    },
    {
      thesaurus: {
        name: 'geocat.ch',
        id: 'geonetwork.thesaurus.local.theme.geocat.ch',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
        ),
      },
      type: 'theme',
      label: 'e-geo.ch',
    },
    {
      label: 'opendata.swiss',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.geocat.ch',
        name: 'geocat.ch',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Nachhaltige Entwicklung',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Raumplanung',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Bergschutz',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Bodenschutz',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Umweltpolitik',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Umweltpolitik',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Verkehr',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Verkehr',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Verkehr',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Umweltüberwachung',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.inspire-theme',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.inspire-theme'
        ),
      },
      type: 'theme',
    },
    {
      label: 'Verwaltungseinheiten',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.inspire-theme',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.inspire-theme'
        ),
      },
      type: 'theme',
    },
    {
      label: 'BGDI Bundesgeodaten-Infrastruktur',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.geocat.ch',
        name: 'geocat.ch',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
        ),
      },
      type: 'theme',
    },
  ],
  spatialRepresentation: 'vector',
  onlineResources: [
    {
      type: 'link',
      url: new URL('https://map.geo.admin.ch/?layers=ch.are.alpenkonvention'),
      name: 'Vorschau map.geo.admin.ch',
      description: 'Vorschau map.geo.admin.ch',
    },
    {
      type: 'link',
      url: new URL(
        'https://www.are.admin.ch/are/de/home/laendliche-raeume-und-berggebiete/internationale-zusammenarbeit/alpenkonvention.html'
      ),
      description: 'Webseite des ARE über die Alpenkonvention',
    },
    {
      type: 'download',
      url: new URL(
        'https://data.geo.admin.ch/browser/index.html#/collections/ch.are.alpenkonvention'
      ),
      description: 'Download von data.geo.admin.ch',
      mimeType: 'x-gis/x-shapefile',
    },
    {
      type: 'service',
      url: new URL(
        'http://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities&lang=de'
      ),
      accessServiceProtocol: 'wms',
      identifierInService: 'ch.are.alpenkonvention',
      name: 'ch.are.alpenkonvention',
      description: 'WMS Dienst von geo.admin.ch',
    },
    {
      type: 'download',
      url: new URL(
        'https://www.are.admin.ch/are/de/home/raumentwicklung-und-raumplanung/grundlagen-und-daten/minimale-geodatenmodelle/alpenkonvention.html'
      ),
      description: 'Minimales Geodatenmodell in INTERLIS 2.3',
      mimeType: 'x-gis/x-shapefile',
    },
    {
      type: 'link',
      url: new URL(
        'http://map.are.admin.ch/?Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-grau&layers=ch.are.alpenkonvention&layers_opacity=0.2&layers_visibility=true&lang=de'
      ),
      description: 'Web-GIS ARE',
    },
    {
      type: 'link',
      url: new URL('http://www.alpconv.org'),
      description: 'Offizielle Homepage der Alpenkonvention',
    },
    {
      type: 'link',
      url: new URL(
        'http://map.geo.admin.ch/?selectedNode=LT1_1&Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-farbe&layers=ch.are.alpenkonvention&layers_opacity=0.6&layers_visibility=true&lang=de'
      ),
      description: 'Die Alpenkonvention im Bundesgeoportal',
    },
    {
      type: 'link',
      url: new URL('http://www.admin.ch/ch/d/sr/0_700_1/app1.html'),
      description:
        'Liste der administrativen Einheiten des Alpenraumes in der schweizerischen Eidgenossenschaft',
    },
    {
      type: 'service',
      url: new URL(
        'https://api3.geo.admin.ch/rest/services/api/MapServer/ch.are.alpenkonvention'
      ),
      accessServiceProtocol: 'esriRest',
      name: 'RESTful API von geo.admin.ch',
      description: 'RESTful API von geo.admin.ch',
    },
    {
      type: 'link',
      url: new URL(
        'https://opendata.swiss/de/perma/8698bf0b-fceb-4f0f-989b-111e7c4af0a4@bundesamt-fur-raumentwicklung-are'
      ),
      name: 'Permalink opendata.swiss',
      description: 'Permalink opendata.swiss',
    },
  ],
  lineage:
    'Digitalisiert nach den administrativen Einheiten der Schweiz, die im Anhang des Übereinkommens erscheinen.',
  licenses: [
    {
      text: "Licence passée entre l'Office fédéral de l'environnement (OFEV), et le canton de Fribourg, représenté par la Coordination SIT (SITel)",
    },
  ],
  legalConstraints: [
    {
      text: `1. Nutzungsbestimmung

Diese Geodaten unterliegen folgenden Nutzungsbeschränkungen:

- Sie dürfen nicht vervielfältigt, verbreitet und/oder weiter zugänglich gemacht werden.

- Sie dürfen nicht kommerziell genutzt werden.

- Sie dürfen ausschliesslich zu vorgegebenen Zwecken genutzt werden.

- Sie dürfen ausschliesslich zu dem unter 4. beschriebenen Zweck genutzt werden.

Die Quelle ist zu bezeichnen: „Quelle: Stadt Zürich“.`,
    },
  ],
  securityConstraints: [],
  otherConstraints: [],
  // data quality?
  spatialExtents: [
    {
      description: 'AK',
    },
    {
      bbox: [
        6.75599105586694, 45.7887442565203, 10.5418236945627, 47.5175655551557,
      ],
    },
    {
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [6.777075, 45.827119, 0],
              [6.755991, 47.517566, 0],
              [10.541824, 47.477984, 0],
              [10.446252, 45.788744, 0],
              [6.777075, 45.827119, 0],
            ],
          ],
        ],
      },
    },
  ],
  temporalExtents: [],
  status: 'completed',
  updateFrequency: 'asNeeded',
  defaultLanguage: 'de',
  otherLanguages: ['fr', 'it', 'en', 'rm'],
}

export const GEOCAT_CH_SERVICE_RECORD: ServiceRecord = {
  uniqueIdentifier: '4a008c24-ecf1-4430-b7e7-cb76b2856bad-8371',
  kind: 'service',
  ownerOrganization: {
    name: 'Amt für Raumentwicklung und Geoinformation (SG)',
    website: new URL('https://www.sg.ch/bauen/geoinformation/datenbezug.html'),
  },
  contacts: [
    {
      email: 'geodaten@sg.ch',
      role: 'resource_provider',
      phone: '+41(0)58 229 31 47',
      address: 'St. Gallen, 9001, CH',
      organization: {
        name: 'Amt für Raumentwicklung und Geoinformation (SG)',
        website: new URL(
          'https://www.sg.ch/bauen/geoinformation/datenbezug.html'
        ),
      },
    },
  ],
  contactsForResource: [
    {
      email: 'geodaten@sg.ch',
      role: 'other',
      phone: '+41(0)58 229 31 47',
      address: 'St. Gallen, 9001, CH',
      organization: {
        name: 'Amt für Raumentwicklung und Geoinformation (SG)',
        website: new URL(
          'https://www.sg.ch/bauen/geoinformation/datenbezug.html'
        ),
      },
    },
    {
      email: 'geodaten@sg.ch',
      role: 'publisher',
      phone: '+41(0)58 229 31 47',
      address: 'St. Gallen, 9001, CH',
      organization: {
        name: 'Amt für Raumentwicklung und Geoinformation (SG)',
        website: new URL(
          'https://www.sg.ch/bauen/geoinformation/datenbezug.html'
        ),
      },
    },
  ],
  recordUpdated: new Date('2022-03-07T01:15:51+01:00'),
  resourceCreated: new Date('2021-09-15'),
  resourceUpdated: new Date('2021-09-17'),
  title: 'Verkehrsregelungsanlagen (WMS)',
  abstract: `Diese Karte beinhaltet die Verkehrsregelungsanlagen des Kantons St.Gallen.`,
  overviews: [
    {
      url: new URL(
        'https://services.geo.sg.ch/wss/service/metadaten/guest/vorschau/SG00170.V.jpg'
      ),
      description: 'Vorschaubild',
    },
  ],
  topics: [],
  keywords: [
    {
      label: 'Verkehr',
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
        ),
      },
      type: 'other',
    },
    {
      label: 'opendata.swiss',
      thesaurus: {
        id: 'geonetwork.thesaurus.local.theme.geocat.ch',
        name: 'geocat.ch',
        url: new URL(
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/local.theme.geocat.ch'
        ),
      },
      type: 'other',
    },
  ],
  onlineResources: [
    {
      type: 'link',
      url: new URL('https://metadata.geo.sg.ch/produkte/170'),
      description: 'Verkehrsregelungsanlagen',
    },
    {
      type: 'link',
      url: new URL('https://metadata.geo.sg.ch'),
      description: 'Geometadaten Kanton St.Gallen',
    },
    {
      type: 'endpoint',
      endpointUrl: new URL(
        'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS'
      ),
      protocol: 'wms',
      description:
        'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS',
    },
  ],
  licenses: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  defaultLanguage: 'de',
  otherLanguages: ['en'],
}
