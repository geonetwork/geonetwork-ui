import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export const GEO2FRANCE_PLU_DATASET_RECORD: DatasetRecord = {
  uniqueIdentifier: '7d002c4c-92ef-4b9f-a568-d732f740b99e',
  // parentuuid: 0822db32-0122-41ee-b6fd-a6934c386288 ???
  kind: 'dataset',
  ownerOrganization: {
    name: 'GeoCompiegnois',
    translations: {},
  },
  contacts: [
    {
      email: 'sig@agglo-compiegne.fr',
      role: 'point_of_contact',
      organization: {
        name: 'GeoCompiegnois',
        translations: {},
      },
    },
  ],
  contactsForResource: [
    {
      email: 'sig@agglo-compiegne.fr',
      role: 'point_of_contact',
      organization: {
        name: 'GeoCompiegnois',
        translations: {},
      },
    },
  ],
  recordUpdated: new Date('2022-04-15T14:18:19'),
  resourcePublished: new Date('2022-05-01'),
  resourceUpdated: new Date('2022-03-29'),
  title:
    "Plan local d'urbanisme (PLU) dématérialisé - commune d'Avrigny - approbation du 29/03/2022",
  // data revision: 2022-03-29 ???
  abstract: `Plan local d'urbanisme (PLU) dématérialisé - commune d'Avrigny - approbation du 29/03/2022.

Ce lot informe du droit à bâtir sur la commune d'Avrigny.
Ce PLUi/PLU/POS/CC est numérisé conformément aux prescriptions nationales du CNIG et contient les pièces administratives, le rapport de présentation, le PADD, le règlement, les annexes, les orientations d'aménagement et les données géographiques.

Malgré l'attention portée à la création de ces données, il est rappelé que seuls les documents papier font foi et sont opposables d'un point de vue juridique.`,
  // status: completed ???
  overviews: [
    {
      url: new URL(
        'http://geo.compiegnois.fr/documents/metadata/DATA_PLU_apercu.jpg'
      ),
    },
  ],
  keywords: [
    {
      thesaurus: {
        name: 'GEMET - INSPIRE themes, version 1.0',
        id: 'geonetwork.thesaurus.external.theme.inspire-theme',
        url: new URL(
          'http://geo.compiegnois.fr/geonetwork/srv/eng/thesaurus.download?ref=external.theme.inspire-theme'
        ),
      },
      type: 'theme',
      label: 'Usage des sols',
      translations: {},
    },
    {
      thesaurus: {
        name: 'GEMET - Concepts, version 2.4',
        id: 'geonetwork.thesaurus.external.theme.gemet',
        url: new URL(
          'http://geo.compiegnois.fr/geonetwork/srv/eng/thesaurus.download?ref=external.theme.gemet'
        ),
      },
      type: 'theme',
      label: "document d'urbanisme",
      translations: {},
    },
    {
      type: 'other',
      label: 'planification',
      translations: {},
    },
    {
      type: 'other',
      label: 'PLU',
      translations: {},
    },
    {
      type: 'other',
      label: "Plan local d'urbanisme",
      translations: {},
    },
    {
      type: 'other',
      label: 'données ouvertes',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.place.GeoCompiegnois',
        name: 'Collectivités du Pays Compiégnois',
        url: new URL(
          'http://geo.compiegnois.fr/geonetwork/srv/eng/thesaurus.download?ref=external.place.GeoCompiegnois'
        ),
      },
      type: 'place',
      label: 'Avrigny*60036',
      translations: {},
    },
  ],
  topics: ['planningCadastre'],
  spatialRepresentation: 'vector',
  onlineResources: [
    {
      type: 'download',
      url: new URL(
        'http://geo.compiegnois.fr/documents/metiers/urba/docurba/60036_PLU_20220329.zip'
      ),
      name: 'Télécharger les données géographiques et les pièces écrites disponibles', // name or desc?
      description: 'Téléchargement du fichier',
      mimeType: 'x-gis/x-shapefile',
      translations: {},
    },
  ],
  lineage: `Document d’urbanisme numérisé conformément aux prescriptions nationales du CNIG par le Service d'Information Géographique de l'Agglomération de la Région de Compiègne.
Ce lot de données produit en 2019, a été numérisé à partir du PCI Vecteur de 2019 et contrôlé par le Service d'Information Géographique de l'Agglomération de la Région de Compiègne.`,
  licenses: [
    {
      text: "En dépit des efforts et diligences mis en œuvre pour en vérifier la fiabilité, le fournisseur n’est pas en mesure de garantir l’exactitude, la mise à jour, l’intégrité, l’exhaustivité des données et en particulier que les données sont exemptes d'erreurs, notamment de localisation, d’identification ou d’actualisation ou d’imprécisions. Les données ne sont pas fournies en vue d'une utilisation particulière et aucune garantie quant à leur aptitude à un usage particulier n'est apportée par le fournisseur. En conséquence, les utilisateurs utilisent les données sous leur responsabilité pleine et entière, à leurs risques et périls, sans recours possible contre le fournisseur dont la responsabilité ne saurait être engagée du fait d’un dommage résultant directement ou indirectement de l’utilisation de ces données. En particulier, il appartient aux utilisateurs d’apprécier, sous leur seule responsabilité : – l'opportunité d'utiliser les données ; – la compatibilité des fichiers avec leurs systèmes informatiques ; – l’adéquation des données à leurs besoins ; – qu’ils disposent de la compétence suffisante pour utiliser les données ; – l’opportunité d’utiliser la documentation ou les outils d’analyse fournis ou préconisés, en relation avec l’utilisation des données, le cas échéant. Le fournisseur n’est en aucune façon responsable des éléments extérieurs aux données et notamment des outils d’analyse, matériels, logiciels, réseaux..., utilisés pour consulter et/ou traiter les données, même s’il a préconisé ces éléments. L’utilisateur veille à vérifier que l’actualité des informations mises à disposition est compatible avec l’usage qu’il en fait.",
      translations: {},
    },
    { text: "Aucune condition ne s'applique", translations: {} },
    { text: 'Licence Ouverte 2.0', translations: {} },
  ],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  // data quality?
  spatialExtents: [
    {
      bbox: [2.5587, 49.3677, 2.5934, 49.4051],
      translations: {},
    },
  ],
  temporalExtents: [],
  status: 'completed',
  updateFrequency: 'unknown',
  defaultLanguage: 'fr',
  otherLanguages: [],
  translations: {},
  resourceIdentifier:
    'https://www.geoportail-urbanisme.gouv.fr/document/60036_PLU_20220329',
}
