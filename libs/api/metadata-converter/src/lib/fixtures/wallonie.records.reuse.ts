import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'

export const WALLONIE_REUSE_SPW_RECORD: ReuseRecord = {
  uniqueIdentifier: '83809bcd-1763-4d28-b820-2b9828083ba5',
  resourceIdentifier: '83809bcd-1763-4d28-b820-2b9828083ba5',
  kind: 'reuse',
  otherLanguages: [],
  defaultLanguage: 'fr',
  recordCreated: new Date('2019-04-02T12:31:52.000Z'),
  recordUpdated: new Date('2024-07-22T11:52:39.049Z'),
  resourceCreated: new Date('2017-06-01T00:00:00.000Z'),
  resourcePublished: new Date('2018-04-01T00:00:00.000Z'),
  reuseType: 'application',
  title: 'Cartographie des données du SPW territoire',
  abstract:
    "Application cartographique présentant des données du SPW territoire (Aménagement du territoire, Logement, Patrimoine et Energie).\n\nCette application propose une trentaine de couches de données thématiques regroupées dans cinq grands thèmes : 1) Aménagement du territoire et urbanisme, 2) Application particulière du CoDT, 3) Logement, 4) Patrimoine et 5) Applications spécifiques. Par thème, il est possible de consulter les couches de données individuellement à partir d'une liste prédéfinie, de consulter leurs métadonnées et leur légende.\n\n\nUne identification des données présentes sur le territoire est possible de trois manières différentes : fine, étendue ou par parcelle. Des liens sont prévus pour visualiser aisément les dossiers, et donc toute la partie documentaire. Le résultat peut être sauvé et exporté en pdf ou en xml.\n\nDes recherches (commune, rue, parcelle, coordonnées) sont également possibles, tout comme une impression.\n\nUne aide en ligne est mise à disposition.",
  ownerOrganization: {
    name: "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
    translations: {},
  },
  contacts: [
    {
      email: 'jeanchristophe.sainte@spw.wallonie.be',
      organization: {
        name: "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
        translations: {},
      },
      role: 'point_of_contact',
    },
  ],
  contactsForResource: [
    {
      email: 'donnees.territoire@spw.wallonie.be',
      organization: {
        name: "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
        translations: {},
      },
      role: 'point_of_contact',
    },
    {
      email: 'jeanchristophe.sainte@spw.wallonie.be',
      organization: {
        name: "Direction de la gestion des informations territoriales (SPW - Territoire, Logement, Patrimoine, Énergie - Département de l'Aménagement du territoire et de l'Urbanisme - Direction de la gestion des informations territoriales)",
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
      label: 'Cartes anciennes',
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
      label: 'Aménagement du territoire',
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
      label: 'Logement et habitat',
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
      label: 'Risques et contraintes',
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
      label: 'Plans et règlements',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Aménagement du Territoire et Urbanisme',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Cahiers de Charges Urbanistiques et Environnementaux',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Campings',
      type: 'theme',
      translations: {},
    },
    {
      label:
        "Commissions Consultatives d'Aménagement du Territoire et de Mobilité",
      type: 'theme',
      translations: {},
    },
    {
      label: 'Communes en décentralisation',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Lotissements',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Parcs Résidentiels de Week-End',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Périmètres de Reconnaissance Economique',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Plan de Secteur',
      type: 'theme',
      translations: {},
    },
    {
      label: "Plans Communaux d'Aménagement",
      type: 'theme',
      translations: {},
    },
    {
      label: "Plan d'Habitat Permanent",
      type: 'theme',
      translations: {},
    },
    {
      label: 'Rapports Urbanistiques et Environnementaux',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Règlement Général sur les Bâtisses en Site Rural',
      type: 'theme',
      translations: {},
    },
    {
      label: "Règlements Communaux d'Urbanisme",
      type: 'theme',
      translations: {},
    },
    {
      label: 'Remembrement urbain',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Rénovation urbaine',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Revitalisation urbaine',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Schémas de Structure Communaux',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Sites À Réaménager',
      type: 'theme',
      translations: {},
    },
    {
      label: "Terrils à considérer en matière d'aménagement du territoire",
      type: 'theme',
      translations: {},
    },
    {
      label: 'Zones agro-géographiques',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Zones franches urbaines',
      type: 'theme',
      translations: {},
    },
    {
      label: "Zones Protégées en matière d'Urbanisme",
      type: 'theme',
      translations: {},
    },
    {
      label: 'Logement',
      type: 'theme',
      translations: {},
    },
    {
      label: "Zones d'Initiative Privilégiée",
      type: 'theme',
      translations: {},
    },
    {
      label: 'Patrimoine',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Biens classés et zones de protection',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Biens exceptionnels',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Biens mondiaux',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Liste de sauvegarde',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Inventaire du patrimoine immobilier culturel',
      type: 'theme',
      translations: {},
    },
    {
      label: "Application de l'article 127 du CWATUPE",
      type: 'theme',
      translations: {},
    },
    {
      label: 'Cartes de Vander Maelen 1850',
      type: 'theme',
      translations: {},
    },
    {
      label: 'PCA',
      type: 'theme',
      translations: {},
    },
    {
      label: 'CCUE',
      type: 'theme',
      translations: {},
    },
    {
      label: 'RGBSR',
      type: 'theme',
      translations: {},
    },
    {
      label: 'PDS',
      type: 'theme',
      translations: {},
    },
    {
      label: 'RUE',
      type: 'theme',
      translations: {},
    },
    {
      label: 'RUE',
      type: 'theme',
      translations: {},
    },
    {
      label: 'RCU',
      type: 'theme',
      translations: {},
    },
    {
      label: 'SSC',
      type: 'theme',
      translations: {},
    },
    {
      label: 'SAR',
      type: 'theme',
      translations: {},
    },
    {
      label: 'ZIP',
      type: 'theme',
      translations: {},
    },
    {
      label: 'cartographie en ligne',
      type: 'theme',
      translations: {},
    },
    {
      label: 'application WebGIS',
      type: 'theme',
      translations: {},
    },
    {
      label: 'visualisateur',
      type: 'theme',
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
  ],
  topics: [],
  licenses: [
    {
      text: "Les mentions légales et contraintes accessibles depuis l'application s'appliquent",
      translations: {},
    },
  ],
  legalConstraints: [
    {
      text: "Aucune contrainte d'accès à l'application.",
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
      text: "L'utilisation des applications nécessite l'installation de trois plugins gratuits (PDF, DjVu et Flashplayer) pour la visualisation des données cartographiques, les informations documentaires alphanumériques qui y sont directement liées et les pièces scannées associées aux dossiers (dans les données documentaires). Téléchargement possible via l'application.",
      translations: {},
    },
    {
      text: "Les mentions légales accessibles depuis l'application s'appliquent.",
      translations: {},
    },
    {
      text: "Les limites d'utilisation des données et services s'appliquent.",
      translations: {},
    },
    {
      text: "L'information peut être utilisée gratuitement pour un usage personnel ou dans un cadre administratif (par exemple afin de compléter un formulaire destiné à l'administration) et à condition de citer clairement la source.",
      translations: {},
    },
    {
      text: 'Toute reproduction et/ou représentation et/ou rediffusion, en tout ou partie, sur tout support électronique ou non, présent ou futur, ayant un caractère commercial, est interdite sauf autorisation expresse et préalable.',
      translations: {},
    },
    {
      text: "Les données géographiques disponibles au départ de l'application n'ont aucune valeur légale et sont mises à disposition de l'utilisateur à titre indicatif.",
      translations: {},
    },
  ],
  overviews: [
    {
      url: new URL(
        'https://metawal.wallonie.be/geonetwork/srv/api/records/83809bcd-1763-4d28-b820-2b9828083ba5/attachments/SPWTerritoire.PNG'
      ),
      description: 'SPWTerritoire.PNG',
    },
  ],
  onlineResources: [
    {
      type: 'link',
      url: new URL('http://geoapps.wallonie.be/webgisdgo4'),
      name: 'Application de consultation des couches de données de la DGO4',
      description:
        'Application permettant la visualisation cartographique par thématique des couches de référence de la DGO4 du SPW.',
      translations: {},
    },
    {
      type: 'link',
      url: new URL(
        'http://lampspw.wallonie.be/dgo4/site_thema/index.php/synthese'
      ),
      name: 'Données documentaires de la DGO4',
      description:
        'Informations complémentaires sur les couches de données proposées par la DGO4',
      translations: {},
    },
  ],
  translations: {},
  landingPage: new URL(
    'https://metawal.wallonie.be/geonetwork/srv/api/records/83809bcd-1763-4d28-b820-2b9828083ba5'
  ),
  lineage: "L'application a été développée sur base de l'API GeoViewer",
  temporalExtents: [],
}
