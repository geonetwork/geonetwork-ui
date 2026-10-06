import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export const MEL_FEATURECATALOG_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier: '1f7c8d9f-3363-4512-ad3a-064fb6b851bc',
  kind: 'dataset',
  otherLanguages: [],
  defaultLanguage: 'fr',
  recordCreated: new Date('2025-11-04T15:47:22Z'),
  recordUpdated: new Date('2026-10-05T08:40:46.464848Z'),
  resourceCreated: new Date('2023-10-27T00:00:00'),
  resourcePublished: new Date('2025-11-04'),
  title: 'Schéma cyclable 2035 - liaisons - Plan de mobilité',
  abstract:
    'L\'action n°35 du Plan de Mobilité de la Métropole Européenne de Lille présente le schéma cyclable métropolitain à horizon 2035. \n\nLa donnée proposée ici décrit la déclinaison en trois niveaux hiérarchiques des axes du schéma cyclable : \n- **le réseau Vélo+** pour la desserte des grandes destinations métropolitaines, \n- **le réseau intercommunal métropolitain** pour la desserte des pôles générateurs principaux, \n- **le réseau cyclable de proximité** qui assure la diffusion fine et permet de faire le lien avec les générateurs de trafic et les cœurs de quartiers.  \n  \n### Détail\nLes entités disposant du code INSEE "0000" sont situées en-dehors du périmètre MEL.\n  \n### Donnée associée à consulter : \n*Schéma cyclable 2035 - points durs - Plan de mobilité - MEL - 2023-2035*\n  \n### Contexte\nLe schéma directeur cyclable métropolitain 2035 s’ancre sur le schéma Métropole Cyclable 2020. Il en propose une vision renforcée. Il est le fruit d’une réflexion territorialisée dont l’objectif est de proposer un réseau intercommunal adapté à la géographie des territoires et aux pratiques cyclables qui ne sont pas les même en ville et à la campagne. \n\n- En milieu rural, les liaisons proposées permettront de relier les bourgs et les villages tout en organisant le rabattement vers les stations de transport collectif majeures : gares et terminus métro. Elles permettront d’accéder aux grands ensembles scolaires et zones d’emploi. Elles porteront également les déplacements longues distances vers les zones urbaines denses. \n- En zone urbaine, les liaisons inscrites au réseau intercommunal porteront les déplacements intercommunaux et inter-quartiers. Ce réseau s’articule avec le réseau de transport collectif urbain et s’appuie sur la hiérarchisation des voies. \n\n     - Il permettra de desservir la totalité des communes de la Métropole Européenne de Lille. \n     - Il assurera aussi une desserte directe de 90 % de la population, 94 % des emplois et 93 % des effectifs scolaires projetés à horizon 2035.\n\n### Le Schéma Directeur Cyclable Métropolitain\nLe schéma directeur cyclable métropolitain 2035 s’appuie en premier lieu sur un diagnostic complet ayant permis de mettre en lumière de nouveaux enjeux sur le territoire, notamment en regard des développements projetés et des évolutions comportementales à l’œuvre. \n  \nCe nouveau schéma directeur est aussi et surtout le fruit d’une concertation avec les communes de la Métropole Européenne de Lille et d’une collaboration technique active de l’association droit au vélo. Il a été construit en interface avec les territoires limitrophes.   \n  \nSa compatibilité avec les nouvelles lignes de transports en site propre et le schéma cible des véloroutes et voies vertes a été considérée.',
  ownerOrganization: {
    name: 'Métropole Européenne de Lille',
    translations: {},
  },
  contacts: [
    {
      email: 'opendata@lillemetropole.fr',
      address: '2, boulevard des Cités Unies, Lille, 59040',
      organization: {
        name: 'Métropole Européenne de Lille',
        translations: {},
      },
      role: 'point_of_contact',
    },
  ],
  contactsForResource: [
    {
      email: 'opendata@lillemetropole.fr',
      address: '2, boulevard des Cités Unies, Lille, 59040',
      organization: {
        name: 'Métropole Européenne de Lille',
        translations: {},
      },
      role: 'originator',
    },
    {
      email: 'opendata@lillemetropole.fr',
      address: '2, boulevard des Cités Unies, Lille, 59040',
      organization: {
        name: 'Métropole Européenne de Lille',
        translations: {},
      },
      role: 'distributor',
    },
    {
      email: 'datamobilite@lillemetropole.fr, mfontaine@lillemetropole.fr',
      address: '2, boulevard des Cités Unies, Lille, 59040',
      organization: {
        name: 'Métropole Européenne de Lille',
        translations: {},
      },
      role: 'point_of_contact',
    },
  ],
  keywords: [
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.local.place.mel',
        name: 'Territoires MEL',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/local.place.mel'
        ),
      },
      label: 'Métropole Européenne de Lille',
      type: 'place',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL(
          'http://localhost:8080/geonetwork/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
        ),
      },
      label: '',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      label: '',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.thesaurus_mot_cle_thematique_categories',
        name: 'Catégories',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/external.theme.thesaurus_mot_cle_thematique_categories'
        ),
      },
      label: 'Mobilité, transports, déplacement',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement',
        name: 'Mobilité, Transports, Déplacement',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement'
        ),
      },
      label: 'Pistes cyclables',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement',
        name: 'Mobilité, Transports, Déplacement',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement'
        ),
      },
      label: 'Schéma cyclable',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement',
        name: 'Mobilité, Transports, Déplacement',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement'
        ),
      },
      label: 'Vélos',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement',
        name: 'Mobilité, Transports, Déplacement',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement'
        ),
      },
      label: 'Plan de mobilité',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement',
        name: 'Mobilité, Transports, Déplacement',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement'
        ),
      },
      label: 'Cyclisme',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement',
        name: 'Mobilité, Transports, Déplacement',
        url: new URL(
          'https://data.lillemetropole.fr/geonetwork/srv/api/registries/vocabularies/external.theme.thesaurus_mot_cle_thematique_mobilite_transports_deplacement'
        ),
      },
      label: 'Cyclable',
      type: 'theme',
      translations: {},
    },
  ],
  topics: ['transportation'],
  licenses: [],
  legalConstraints: [
    {
      text: 'Licence Ouverte v2.0 (Etalab)',
      translations: {},
    },
    {
      text: 'Utilisation libre sous réserve de mentionner la source (a minima le nom du producteur) et la date de sa dernière mise à jour',
      translations: {},
    },
  ],
  securityConstraints: [],
  otherConstraints: [],
  overviews: [],
  spatialExtents: [
    {
      bbox: [
        2.78913293567365, 50.4997300394295, 3.272498092970729, 50.7945765614518,
      ],
      translations: {},
    },
  ],
  onlineResources: [
    {
      type: 'service',
      url: new URL(
        'https://data.lillemetropole.fr/geoserver/ogc/features/v1/collections/mel_mobilite_et_transport:sc_schema_cyclable_pm35_2023/items'
      ),
      accessServiceProtocol: 'ogcFeatures',
      identifierInService: 'Schéma cyclable 2035 - liaisons - Plan de mobilité',
      name: 'Schéma cyclable 2035 - liaisons - Plan de mobilité',
      description: 'Schéma cyclable 2035 - liaisons - Plan de mobilité',
      translations: {},
    },
    {
      type: 'service',
      url: new URL('https://data.lillemetropole.fr/geoserver/ows'),
      accessServiceProtocol: 'wfs',
      identifierInService:
        'mel_mobilite_et_transport:sc_schema_cyclable_pm35_2023',
      name: 'mel_mobilite_et_transport:sc_schema_cyclable_pm35_2023',
      description: 'Schéma cyclable 2035 - liaisons - Plan de mobilité',
      translations: {},
    },
    {
      type: 'service',
      url: new URL('https://data.lillemetropole.fr/geoserver/ows'),
      accessServiceProtocol: 'wms',
      identifierInService:
        'mel_mobilite_et_transport:sc_schema_cyclable_pm35_2023',
      name: 'mel_mobilite_et_transport:sc_schema_cyclable_pm35_2023',
      description: 'Schéma cyclable 2035 - liaisons - Plan de mobilité',
      translations: {},
    },
    {
      type: 'link',
      url: new URL(
        'https://plandemobilite2035.lillemetropole.fr/schema-cyclable/'
      ),
      name: 'Documentation',
      description: 'Lien vers la carte dynamique « schéma cyclable »',
      translations: {},
    },
  ],
  translations: {},
  landingPage: new URL(
    'https://data.lillemetropole.fr/catalogue/dataset/1f7c8d9f-3363-4512-ad3a-064fb6b851bc'
  ),
  status: 'completed',
  lineage: null,
  sourceRecords: [],
  associatedRecords: [],
  temporalExtents: [
    {
      start: new Date('2023-10-27'),
      end: new Date('2035-12-31'),
    },
  ],
  updateFrequency: 'notPlanned',
  featureTypeDescriptions: [
    {
      name: 'schéma cyclable - liaisons',
      description: 'Liaisons du schéma directeur cyclable de la MEL',
      attributes: [
        {
          name: 'objectid',
          description: "Identifiant de l'objet (clé primaire)",
          type: 'numeric(38)',
          code: 'OBJECTID',
        },
        {
          name: 'code_insee',
          description: 'Code INSEE de la commune',
          type: 'varchar(8)',
          code: 'CODE_INSEE',
        },
        {
          name: 'velo_plus',
          description:
            "Permet de savoir si l'objet décrit un tronçon faisant parti du réseau vélo + : Oui - le tronçon fait partie intégrante du réseau vélo+ /Non - le tronçon ne fait pas partie du réseau vélo+ /Option - le tronçon pourrait éventuellement faire partie du réseau réseau vélo+ / Variante - le tronçon pourrait être utilisé en lieu et place d'un autre pour répondre à un trajet équivalent",
          type: 'varchar(256)',
        },
        {
          name: 'r_ppal',
          description:
            "Permet de savoir si l'objet décrit un tronçon faisant parti du réseau Intercommunal : Oui - le tronçon fait partie intégrante du réseau intercommunal / Non - le tronçon ne fait pas partie du réseau intercommunal / Option : le tronçon pourrait éventuellement faire partie du réseau intercommunal / Variante : le tronçon pourrait être utilisé en lieu et place d'un autre pour répondre à un trajet équivalent",
          type: 'varchar(256)',
        },
        {
          name: 'r_scdr',
          description:
            "Permet de savoir si l'objet décrit un tronçon faisant parti du réseau de proximité : Oui - le tronçon fait partie intégrante du réseau cyclable de proximité / Non - le tronçon ne fait pas partie du réseau cyclable de proximité",
          type: 'varchar(256)',
        },
        {
          name: 'test_niveau_difficulte',
          description:
            '[Données pour tester valeurs de liste]: Donne une note de difficulté (1-5) du tronçon.',
          type: 'varchar(256)',
          cardinality: '1..1',
          values: [
            { code: '1', label: 'Très facile' },
            { code: '2', label: 'Facile' },
            { code: '3', label: 'Moyen' },
            { code: '4', label: 'Difficile' },
            { code: '5', label: 'Très difficile' },
          ],
        },
        {
          name: 'geom',
          description: 'Géométrie de type ligne simple',
          type: 'geometry',
        },
      ],
    },
  ],
}

export const MEL_FEATURECATALOG_DATASET_RECORD_EDITED: DatasetRecord = {
  ...MEL_FEATURECATALOG_DATASET_RECORD,
  featureTypeDescriptions: [
    {
      name: 'schéma cyclable - liaisons',
      description: 'Liaisons du schéma directeur cyclable 2035 de la MEL',
      attributes: [
        {
          name: 'objectid',
          description: "Identifiant de l'objet (clé primaire)",
          type: 'numeric(38)',
          code: 'OBJECTID',
        },
        {
          name: 'code_insee',
          description: 'Code INSEE de la commune',
          type: 'varchar(8)',
        },
        {
          name: 'velo_plus',
          description:
            'Appartenance au réseau vélo+ : Oui / Non / Option / Variante',
          type: 'varchar(256)',
        },
        {
          name: 'r_ppal',
          description:
            "Permet de savoir si l'objet décrit un tronçon faisant parti du réseau Intercommunal : Oui - le tronçon fait partie intégrante du réseau intercommunal / Non - le tronçon ne fait pas partie du réseau intercommunal / Option : le tronçon pourrait éventuellement faire partie du réseau intercommunal / Variante : le tronçon pourrait être utilisé en lieu et place d'un autre pour répondre à un trajet équivalent",
          type: 'varchar(256)',
        },
        {
          name: 'test_niveau_difficulte',
          description:
            '[Données pour tester valeurs de liste]: Donne une note de difficulté (1-5) du tronçon.',
          type: 'varchar(256)',
          cardinality: '1..1',
          values: [
            {
              code: '1',
              label: 'Très facile',
            },
            {
              code: '2',
              label: 'Facile',
            },
            {
              code: '3',
              label: 'Moyen',
            },
            {
              code: '4',
              label: 'Difficile',
            },
            {
              code: '5',
              label: 'Très difficile',
            },
            {
              code: '6',
              label: 'Extrême',
            },
          ],
        },
        {
          name: 'geom',
          description: 'Géométrie de type ligne simple',
          type: 'geometry',
        },
        {
          name: 'longueur',
          description: 'Longueur du tronçon en mètres',
          type: 'numeric',
          code: 'LONGUEUR',
        },
      ],
    },
  ],
}
