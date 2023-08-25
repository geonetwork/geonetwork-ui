import { DatasetRecord } from '@geonetwork-ui/common/domain/record'
import { deepFreeze } from './utils/freeze'

export const DATASET_RECORDS: DatasetRecord[] = deepFreeze([
  {
    uniqueIdentifier: 'my-dataset-001',
    kind: 'dataset',
    ownerOrganization: {
      name: 'MyOrganization',
      website: new URL('https://www.my.org/info'),
      logoUrl: new URL('https://www.my.org/logo.png'),
      description: 'A generic organization',
    },
    contacts: [
      {
        email: 'bob@org.net',
        role: 'author',
        organization: {
          name: 'MyOrganization',
          website: new URL('https://www.my.org/info'),
          logoUrl: new URL('https://www.my.org/logo.png'),
          description: 'A generic organization',
        },
        firstName: 'Bob',
        lastName: 'TheGreat',
        position: 'developer',
      },
      {
        email: 'john@org2.com',
        role: 'custodian',
        organization: {
          name: 'Another Organization',
          website: new URL('https://www.another.org/docs'),
        },
        position: 'manager',
      },
    ],
    contactsForResource: [
      {
        email: 'bill@org2.com',
        role: 'author',
        organization: {
          name: 'Another Organization',
          website: new URL('https://www.another.org/docs'),
        },
        firstName: 'bill',
      },
    ],
    status: 'ongoing',
    recordCreated: new Date('2022-02-01T15:12:00'),
    recordUpdated: new Date('2022-02-01T15:12:00'),
    datasetCreated: new Date('2022-09-01T14:18:19'),
    datasetUpdated: new Date('2022-12-04T15:12:00'),
    title: 'A very interesting dataset (un jeu de données très intéressant)',
    abstract: `# Introduction
This dataset has been established for testing purposes.

## Details
This is a section about details. Here is an HTML tag: <img src="http://google.com" />. And [a link](https://google.com).

## Informations intéressantes
Cette section contient des *caractères internationaux* (ainsi que des "caractères spéciaux"). 'çàü^@/~^&`,
    overviews: [
      {
        url: new URL('http://my-org.net/one.png'),
        description: 'An overview',
      },
      {
        url: new URL('http://my-org.net/two.png'),
      },
    ],
    keywords: ['international', 'test', '_another_keyword_'],
    themes: ['testData', 'exampleData'],
    spatialRepresentation: 'grid',
    distributions: [
      {
        type: 'download',
        url: new URL('http://my-org.net/download/1.zip'),
        mimeType: 'x-gis/x-shapefile',
        name: 'Direct download',
        description: 'Dataset downloaded as a shapefile',
      },
      {
        type: 'download',
        url: new URL('http://my-org.net/download/2.geojson'),
        mimeType: 'application/geo+json',
        name: 'Direct download',
      },
      {
        type: 'link',
        url: new URL('https://my-org.net/docs/1234.pdf'),
        name: 'Documentation',
        description:
          'A link to the online documentation in PDF; please forgive the typos.',
      },
      {
        type: 'service',
        url: new URL('https://my-org.net/wfs'),
        accessServiceProtocol: 'wfs',
        name: 'my:featuretype', // FIXME: same as identifier otherwise it will be lost in iso...
        description: 'This WFS service offers direct download capability',
        identifierInService: 'my:featuretype',
      },
    ],
    lineage: `This record was edited manually to test the conversion processes

As such, **it is not very interesting at all.**`,
    useLimitations: [
      'Should only be used as a testing tool',
      'Might cause minor annoyance in people',
    ],
    licenses: [
      {
        text: 'Licence ODbL mai 2013 (basée sur ODbL 1.0)',
        url: new URL('https://data.rennesmetropole.fr/pages/licence/'),
      },
    ],
    accessConstraints: [
      {
        text: "Dataset access isn't possible since it does not really exist",
        type: 'other',
      },
      {
        text: 'Contains sensitive information related to national defense',
        type: 'security',
      },
    ],
    spatialExtents: [],
    temporalExtents: [],
    updateFrequency: {
      updatedTimes: 3,
      per: 'month',
    },
  },
  {
    uniqueIdentifier: '7d002c4c-92ef-4b9f-a568-d732f740b99e',
    // parentuuid: 0822db32-0122-41ee-b6fd-a6934c386288 ???
    kind: 'dataset',
    ownerOrganization: {
      name: 'GeoCompiegnois',
    },
    contacts: [
      {
        email: 'sig@agglo-compiegne.fr',
        role: 'point_of_contact',
        organization: {
          name: 'GeoCompiegnois',
        },
      },
    ],
    contactsForResource: [],
    recordCreated: new Date('2022-04-15T14:18:19'),
    recordUpdated: new Date('2022-04-15T14:18:19'),
    datasetUpdated: new Date('2022-03-29'),
    title:
      "Plan local d'urbanisme (PLU) dématérialisé - commune d'Avrigny - approbation du 29/03/2022",
    abstract: `Plan local d'urbanisme (PLU) dématérialisé - commune d'Avrigny - approbation du 29/03/2022.

Ce lot informe du droit à bâtir sur la commune d'Avrigny.
Ce PLUi/PLU/POS/CC est numérisé conformément aux prescriptions nationales du CNIG et contient les pièces administratives, le rapport de présentation, le PADD, le règlement, les annexes, les orientations d'aménagement et les données géographiques.

Malgré l'attention portée à la création de ces données, il est rappelé que seuls les documents papier font foi et sont opposables d'un point de vue juridique.`,
    overviews: [
      {
        url: new URL(
          'http://geo.compiegnois.fr/documents/metadata/DATA_PLU_apercu.jpg'
        ),
      },
    ],
    keywords: [
      'planification',
      'PLU',
      "Plan local d'urbanisme",
      'données ouvertes',
      'Avrigny*60036',
    ],
    themes: ['Usage des sols', "document d'urbanisme"],
    spatialRepresentation: 'vector',
    distributions: [
      {
        type: 'download',
        url: new URL(
          'http://geo.compiegnois.fr/documents/metiers/urba/docurba/60036_PLU_20220329.zip'
        ),
        name: 'Télécharger les données géographiques et les pièces écrites disponibles', // name or desc?
        description: 'Téléchargement du fichier',
        mimeType: 'x-gis/x-shapefile',
      },
    ],
    lineage: `Document d’urbanisme numérisé conformément aux prescriptions nationales du CNIG par le Service d'Information Géographique de l'Agglomération de la Région de Compiègne.
Ce lot de données produit en 2019, a été numérisé à partir du PCI Vecteur de 2019 et contrôlé par le Service d'Information Géographique de l'Agglomération de la Région de Compiègne.`,
    accessConstraints: [],
    useLimitations: ["Aucune condition ne s'applique", 'Licence Ouverte 2.0'],
    licenses: [
      {
        text: "En dépit des efforts et diligences mis en œuvre pour en vérifier la fiabilité, le fournisseur n’est pas en mesure de garantir l’exactitude, la mise à jour, l’intégrité, l’exhaustivité des données et en particulier que les données sont exemptes d'erreurs, notamment de localisation, d’identification ou d’actualisation ou d’imprécisions. Les données ne sont pas fournies en vue d'une utilisation particulière et aucune garantie quant à leur aptitude à un usage particulier n'est apportée par le fournisseur. En conséquence, les utilisateurs utilisent les données sous leur responsabilité pleine et entière, à leurs risques et périls, sans recours possible contre le fournisseur dont la responsabilité ne saurait être engagée du fait d’un dommage résultant directement ou indirectement de l’utilisation de ces données. En particulier, il appartient aux utilisateurs d’apprécier, sous leur seule responsabilité : – l'opportunité d'utiliser les données ; – la compatibilité des fichiers avec leurs systèmes informatiques ; – l’adéquation des données à leurs besoins ; – qu’ils disposent de la compétence suffisante pour utiliser les données ; – l’opportunité d’utiliser la documentation ou les outils d’analyse fournis ou préconisés, en relation avec l’utilisation des données, le cas échéant. Le fournisseur n’est en aucune façon responsable des éléments extérieurs aux données et notamment des outils d’analyse, matériels, logiciels, réseaux..., utilisés pour consulter et/ou traiter les données, même s’il a préconisé ces éléments. L’utilisateur veille à vérifier que l’actualité des informations mises à disposition est compatible avec l’usage qu’il en fait.",
      },
    ],
    spatialExtents: [],
    temporalExtents: [],
    status: 'completed',
    updateFrequency: 'unknown',
  },
])
