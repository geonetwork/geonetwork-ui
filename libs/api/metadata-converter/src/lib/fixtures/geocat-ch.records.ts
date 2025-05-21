import {
  DatasetRecord,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'

export const GEOCAT_CH_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier: '8698bf0b-fceb-4f0f-989b-111e7c4af0a4',
  kind: 'dataset',
  ownerOrganization: {
    name: 'Bundesamt für Raumentwicklung',
    translations: {
      name: {
        en: 'Federal Office for Spatial Development',
        fr: 'Office fédéral du développement territorial',
        it: 'Ufficio federale dello sviluppo territoriale',
        rm: 'Bundesamt für Raumentwicklung',
      },
    },
  },
  contacts: [
    {
      email: 'rolf.giezendanner@are.admin.ch',
      role: 'point_of_contact',
      address: 'Ittigen, 3063, CH',
      organization: {
        name: 'Bundesamt für Raumentwicklung',
        translations: {
          name: {
            en: 'Federal Office for Spatial Development',
            fr: 'Office fédéral du développement territorial',
            it: 'Ufficio federale dello sviluppo territoriale',
            rm: 'Bundesamt für Raumentwicklung',
          },
        },
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
        translations: {
          name: {
            en: 'Federal Office for Spatial Development',
            fr: 'Office fédéral du développement territorial',
            it: 'Ufficio federale dello sviluppo territoriale',
            rm: 'Bundesamt für Raumentwicklung',
          },
        },
      },
    },
    {
      email: 'info@are.admin.ch',
      role: 'owner',
      organization: {
        name: 'Bundesamt für Raumentwicklung',
        translations: {},
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
  resourceIdentifier: 'ch.are.alpenkonvention',
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
      translations: {
        label: {
          en: 'Conservation and archiving planning AAP - Confederation',
          fr: "Planification de la conservation et de l'archivage AAP - Conféderation",
          it: 'Pianificazione della conservazione e dell’archiviazione AAP - Confederazione',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'official geodata',
          fr: 'géodonnées de base',
          it: 'geodati di base',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'e-geo.ch',
          fr: 'e-geo.ch',
          it: 'e-geo.ch',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'opendata.swiss',
          fr: 'opendata.swiss',
          it: 'opendata.swiss',
          rm: 'opendata.swiss',
        },
      },
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
      translations: {
        label: {
          en: 'sustainable development',
          fr: 'développement durable',
          it: 'sviluppo sostenibile',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'physical planning',
          fr: "planification de l'espace physique",
          it: 'pianificazione dello spazio fisico',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'mountain protection',
          fr: 'protection de la montagne',
          it: 'protezione della montagna',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'soil conservation',
          fr: 'conservation du sol',
          it: 'conservazione del suolo',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'environmental policy',
          fr: 'politique environnementale',
          it: 'politica ambientale',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'environmental policy',
          fr: 'politique environnementale',
          it: 'politica ambientale',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'transport',
          fr: 'transport',
          it: 'trasporti',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'transport',
          fr: 'transport',
          it: 'trasporti',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'transport',
          fr: 'transport',
          it: 'trasporti',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'Environmental monitoring facilities',
          fr: 'Installations de suivi environnemental',
          it: 'Impianti di monitoraggio ambientale',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'Administrative units',
          fr: 'Unités administratives',
          it: 'Unità amministrative',
          rm: '',
        },
      },
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
      translations: {
        label: {
          en: 'FSDI Federal Spatial Data Infrastructure',
          fr: 'IFDG l’Infrastructure Fédérale de données géographiques',
          it: 'IFDG Infrastruttura federale dei dati geografici',
        },
      },
    },
  ],
  spatialRepresentation: 'vector',
  onlineResources: [
    {
      type: 'link',
      url: new URL('https://map.geo.admin.ch/?layers=ch.are.alpenkonvention'),
      name: 'Vorschau map.geo.admin.ch',
      description: 'Vorschau map.geo.admin.ch',
      translations: {
        description: {
          en: 'Preview map.geo.admin.ch',
          fr: 'Aperçu map.geo.admin.ch',
          it: 'Previsione map.geo.admin.ch',
        },
        name: {
          en: 'Preview map.geo.admin.ch',
          fr: 'Aperçu map.geo.admin.ch',
          it: 'Previsione map.geo.admin.ch',
        },
      },
    },
    {
      type: 'link',
      url: new URL(
        'https://www.are.admin.ch/are/de/home/laendliche-raeume-und-berggebiete/internationale-zusammenarbeit/alpenkonvention.html'
      ),
      description: 'Webseite des ARE über die Alpenkonvention',
      translations: {
        description: {
          fr: "Page web de l'ARE sur la Convention alpine",
        },
      },
    },
    {
      type: 'download',
      url: new URL(
        'https://data.geo.admin.ch/browser/index.html#/collections/ch.are.alpenkonvention'
      ),
      description: 'Download von data.geo.admin.ch',
      mimeType: 'x-gis/x-shapefile',
      translations: {
        description: {
          en: 'Download server from geo.admin.ch',
          fr: 'Serveur de téléchargement de geo.admin.ch',
          it: 'Server di download di geo.admin.ch',
        },
      },
    },
    {
      type: 'service',
      url: new URL(
        'http://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities&lang=de'
      ),
      accessServiceProtocol: 'wms',
      description: 'WMS Dienst von geo.admin.ch',
      identifierInService: 'ch.are.alpenkonvention',
      name: 'ch.are.alpenkonvention',
      translations: {
        description: {
          en: 'WMS Service from geo.admin.ch',
          fr: 'Service WMS de geo.admin.ch',
          it: 'Servizio WMS di geo.admin.ch',
        },
      },
    },
    {
      type: 'download',
      url: new URL(
        'https://www.are.admin.ch/are/de/home/raumentwicklung-und-raumplanung/grundlagen-und-daten/minimale-geodatenmodelle/alpenkonvention.html'
      ),
      description: 'Minimales Geodatenmodell in INTERLIS 2.3',
      mimeType: 'x-gis/x-shapefile',
      translations: {
        description: {
          fr: 'Modèle de données minimal en INTERLIS 2.3',
        },
      },
    },
    {
      type: 'link',
      url: new URL(
        'http://map.are.admin.ch/?Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-grau&layers=ch.are.alpenkonvention&layers_opacity=0.2&layers_visibility=true&lang=de'
      ),
      description: 'Web-GIS ARE',
      translations: {
        description: {
          fr: 'Web-SIG ARE',
        },
      },
    },
    {
      type: 'link',
      url: new URL('http://www.alpconv.org'),
      description: 'Offizielle Homepage der Alpenkonvention',
      translations: {
        description: {
          en: 'Official Website of the Alpine Convention',
          fr: 'Site web officiel de la Convention alpine',
          it: 'Pagina web ufficiale della Convenzione delle alpi',
        },
      },
    },
    {
      type: 'link',
      url: new URL(
        'http://map.geo.admin.ch/?selectedNode=LT1_1&Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-farbe&layers=ch.are.alpenkonvention&layers_opacity=0.6&layers_visibility=true&lang=de'
      ),
      description: 'Die Alpenkonvention im Bundesgeoportal',
      translations: {
        description: {
          fr: 'La convention alpine dans le géoportail fédéral',
        },
      },
    },
    {
      type: 'link',
      url: new URL('http://www.admin.ch/ch/d/sr/0_700_1/app1.html'),
      description:
        'Liste der administrativen Einheiten des Alpenraumes in der schweizerischen Eidgenossenschaft',
      translations: {
        description: {
          fr: "Liste des unités administratives de l'espace alpin dans la Confédération suisse",
          it: 'Elenco delle unità amministrative dello spazio alpino nella Confederazione Svizzera',
        },
      },
    },
    {
      type: 'service',
      url: new URL(
        'https://api3.geo.admin.ch/rest/services/api/MapServer/ch.are.alpenkonvention'
      ),
      accessServiceProtocol: 'esriRest',
      description: 'RESTful API von geo.admin.ch',
      identifierInService: 'RESTful API von geo.admin.ch',
      name: 'RESTful API von geo.admin.ch',
      translations: {
        description: {
          en: 'RESTful API from geo.admin.ch',
          fr: 'RESTful API de geo.admin.ch',
          it: 'RESTful API da geo.admin.ch',
          rm: 'RESTful API dad geo.admin.ch',
        },
        name: {
          en: 'RESTful API from geo.admin.ch',
          fr: 'RESTful API de geo.admin.ch',
          it: 'RESTful API da geo.admin.ch',
          rm: 'RESTful API dad geo.admin.ch',
        },
      },
    },
    {
      type: 'link',
      url: new URL(
        'https://opendata.swiss/de/perma/8698bf0b-fceb-4f0f-989b-111e7c4af0a4@bundesamt-fur-raumentwicklung-are'
      ),
      name: 'Permalink opendata.swiss',
      description: 'Permalink opendata.swiss',
      translations: {
        description: {
          en: 'Permalink opendata.swiss',
          fr: 'Permalink opendata.swiss',
          it: 'Permalink opendata.swiss',
        },
        name: {
          en: 'Permalink opendata.swiss',
          fr: 'Permalink opendata.swiss',
          it: 'Permalink opendata.swiss',
        },
      },
    },
  ],
  lineage:
    'Digitalisiert nach den administrativen Einheiten der Schweiz, die im Anhang des Übereinkommens erscheinen.',
  licenses: [
    {
      text: "Licence passée entre l'Office fédéral de l'environnement (OFEV), et le canton de Fribourg, représenté par la Coordination SIT (SITel)",
      translations: {
        text: {
          fr: "Licence passée entre l'Office fédéral de l'environnement (OFEV), et le canton de Fribourg, représenté par la Coordination SIT (SITel)",
        },
      },
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
      translations: {},
    },
  ],
  securityConstraints: [],
  otherConstraints: [],
  // data quality?
  spatialExtents: [
    {
      description: 'AK',
      translations: {
        description: {
          en: 'AC',
          fr: 'CA',
          it: 'CA',
          rm: 'null',
        },
      },
    },
    {
      bbox: [
        6.75599105586694, 45.7887442565203, 10.5418236945627, 47.5175655551557,
      ],
      translations: {},
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
      translations: {},
    },
  ],
  temporalExtents: [],
  status: 'completed',
  updateFrequency: 'asNeeded',
  defaultLanguage: 'de',
  otherLanguages: ['fr', 'it', 'en', 'rm', 'aar'],
  translations: {
    abstract: {
      en: 'The perimeters of the Alpine Convention in Switzerland. The Alpine Convention is an international treaty between the eight Alpine countries: Germany, France, Italy, Liechtenstein, Monaco, Austria, Switzerland and Slovenia, plus the European Union. The aim of the treaty is to protect the Alps by means of cross-sectoral, integrated and sustainable policies.',
      fr: 'Périmètre de la Convention alpine en Suisse. La Convention alpine est un traité de droit international conclu par huit Etats alpins (Allemagne, Autriche, France, Italie, Liechtenstein, Monaco, Suisse, Slovénie) et l`Union européenne. L`accord vise à assurer la préservation et la protection des Alpes à travers une politique plurisectorielle, globale et durable.',
      it: "Il perimetro della Convenzione delle Alpi. La Convenzione delle Alpi è un trattato internazionale tra gli otto Paesi alpini Germania, Francia, Italia, Liechtenstein, Monaco, Austria, Svizzera, Slovenia e l'Unione europea. Lo scopo della Convenzione è la conservazione e la protezione delle Alpi mediante una politica intersettoriale, globale e durevole.",
      rm: "Perimeter da la Convenziun da las Alps en Svizra. La Convenziun da las Alps è in contract internaziunal tranter ils otg pajais alpins (Austria, Frantscha, Germania, Italia, Liechtenstein, Monaco, Slovenia, Svizra) e l'Uniun europeica. La convenziun ha la finamira da proteger las Alps cun agid d'ina politica intersecturiala, cumplessiva e duraivla.",
    },
    title: {
      en: 'Alpine Convention',
      fr: 'Convention des Alpes',
      it: 'Convenzione delle alpi',
      rm: 'Convenziun da las Alps',
    },
  },
}

export const GEOCAT_CH_SERVICE_RECORD: ServiceRecord = {
  uniqueIdentifier: '4a008c24-ecf1-4430-b7e7-cb76b2856bad-8371',
  kind: 'service',
  ownerOrganization: {
    name: 'Amt für Raumentwicklung und Geoinformation (SG)',
    website: new URL('https://www.sg.ch/bauen/geoinformation/datenbezug.html'),
    translations: {
      name: {
        en: '',
      },
    },
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
        translations: {
          name: {
            en: '',
          },
        },
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
        translations: {
          name: {
            en: '',
          },
        },
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
        translations: {
          name: {
            en: '',
          },
        },
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
          'https://geocat-dev.dev.bgdi.ch/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      type: 'other',
      translations: {
        label: {
          en: '',
        },
      },
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
      translations: {
        label: {
          en: '',
        },
      },
    },
  ],
  onlineResources: [
    {
      type: 'link',
      url: new URL('https://metadata.geo.sg.ch/produkte/170'),
      description: 'Verkehrsregelungsanlagen',
      translations: {
        description: {
          en: '',
        },
      },
    },
    {
      type: 'link',
      url: new URL('https://metadata.geo.sg.ch'),
      description: 'Geometadaten Kanton St.Gallen',
      translations: {
        description: {
          en: '',
        },
      },
    },
    {
      type: 'endpoint',
      url: new URL(
        'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS'
      ),
      accessServiceProtocol: 'wms',
      description:
        'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS',
      translations: {
        description: {
          en: '',
        },
      },
    },
  ],
  licenses: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  defaultLanguage: 'de',
  otherLanguages: ['en'],
  translations: {
    abstract: {
      en: '',
    },
    title: {
      en: '',
    },
  },
  spatialExtents: [
    {
      bbox: [
        8.749927283333331, 46.853613697777774, 9.697637729444445, 47.5586926625,
      ],
      translations: {},
    },
  ],
}
