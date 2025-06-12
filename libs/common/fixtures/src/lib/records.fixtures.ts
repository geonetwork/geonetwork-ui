import {
  CatalogRecord,
  DatasetRecord,
  DatasetSpatialExtent,
  Keyword,
  ServiceRecord,
} from '@geonetwork-ui/common/domain/model/record'

export const datasetRecordsFixture: () => CatalogRecord[] = () => [
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
    resourceCreated: new Date('2022-09-01T14:18:19'),
    resourceUpdated: new Date('2022-12-04T15:12:00'),
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
    keywords: [
      {
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: 'international',
      },
      {
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: 'test',
      },
      {
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: '_another_keyword_',
      },
    ],
    topics: ['testData', 'exampleData'],
    spatialRepresentation: 'grid',
    onlineResources: [
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
      {
        type: 'service',
        url: new URL('https://my-org.net/ogc'),
        accessServiceProtocol: 'ogcFeatures',
        name: 'my:featuretype',
        description: 'This OGC service offers direct download capability',
        identifierInService: 'my:featuretype',
      },
    ],
    lineage: `This record was edited manually to test the conversion processes

As such, **it is not very interesting at all.**`,
    licenses: [
      {
        text: 'Licence ODbL mai 2013 (basée sur ODbL 1.0)',
        url: new URL('https://data.rennesmetropole.fr/pages/licence/'),
      },
    ],
    legalConstraints: [
      {
        text: "Dataset access isn't possible since it does not really exist",
      },
      {
        text: 'Contains sensitive information related to national defense',
      },
    ],
    securityConstraints: [],
    otherConstraints: [],
    spatialExtents: [],
    temporalExtents: [],
    updateFrequency: {
      updatedTimes: 3,
      per: 'month',
    },
    otherLanguages: ['de'],
    defaultLanguage: 'en',
    extras: {
      isPublishedToAll: true,
      edit: true,
      featureTypes: [
        {
          attributeTable: [
            {
              code: 'OBJECTID',
              name: 'OBJECTID',
              link: '',
              definition: 'Object identifier',
              type: 'OID',
            },
            {
              code: 'NOM',
              name: 'Nom',
              link: '',
              definition: 'Nom de la rue',
              type: 'String (48)',
              values: [
                {
                  code: 'Pomme',
                  label: 'Les Pommiers',
                  description: 'Sous les pommiers',
                },
                {
                  code: 'Cotton',
                  label: 'Rue Cotton',
                  description: 'Rue Cotton',
                },
                { code: "Passage de l'échiquier" },
                { description: 'Rue du Charlieu' },
              ],
            },
            {
              code: 'RUE',
              name: 'Rue',
              link: '',
              definition: '',
              type: 'String (50)',
            },
          ],
          code: '',
          aliases: '',
          typeName: "Catalogue d'attributs N°1",
          definition: 'Définition du catalogue d attributs N°1',
          isAbstract: 'false',
        },
        {
          attributeTable: [
            {
              code: 'UniqueObject',
              name: 'unique object ',
              link: '',
              definition: 'this is the only object of this catalog',
              type: 'String (50)',
            },
          ],
          code: '',
          aliases: '',
          typeName: "Catalogue d'attributs N°2",
          definition: 'Définition du catalogue d attributs N°2',
          isAbstract: 'false',
        },
      ],
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
    resourceUpdated: new Date('2022-03-29'),
    title:
      "Plan local d'urbanisme (PLU) dématérialisé - commune d'Avrigny - approbation du 29/03/2022 (Ce lot informe du droit à bâtir sur la commune d'Avrigny)",
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
      {
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: 'planification',
      },
      {
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: 'PLU',
      },
      {
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: "Plan local d'urbanisme",
      },
      {
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: 'données ouvertes',
      },
      {
        thesaurus: { id: 'geonetwork.thesaurus.local' },
        type: 'other',
        label: 'Avrigny*60036',
      },
    ],
    topics: ['Usage des sols', "document d'urbanisme"],
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
      },
      {
        type: 'service',
        url: new URL('https://my-org.net/ogc'),
        accessServiceProtocol: 'ogcFeatures',
        name: 'ogcFeaturesSecondRecord',
        description: 'This OGC service is the second part of the download',
        identifierInService: 'my:featuretype',
      },
    ],
    lineage: `Document d’urbanisme numérisé conformément aux prescriptions nationales du CNIG par le Service d'Information Géographique de l'Agglomération de la Région de Compiègne.
Ce lot de données produit en 2019, a été numérisé à partir du PCI Vecteur de 2019 et contrôlé par le Service d'Information Géographique de l'Agglomération de la Région de Compiègne.`,
    legalConstraints: [],
    securityConstraints: [],
    otherConstraints: [],
    licenses: [
      {
        text: "En dépit des efforts et diligences mis en œuvre pour en vérifier la fiabilité, le fournisseur n’est pas en mesure de garantir l’exactitude, la mise à jour, l’intégrité, l’exhaustivité des données et en particulier que les données sont exemptes d'erreurs, notamment de localisation, d’identification ou d’actualisation ou d’imprécisions. Les données ne sont pas fournies en vue d'une utilisation particulière et aucune garantie quant à leur aptitude à un usage particulier n'est apportée par le fournisseur. En conséquence, les utilisateurs utilisent les données sous leur responsabilité pleine et entière, à leurs risques et périls, sans recours possible contre le fournisseur dont la responsabilité ne saurait être engagée du fait d’un dommage résultant directement ou indirectement de l’utilisation de ces données. En particulier, il appartient aux utilisateurs d’apprécier, sous leur seule responsabilité : – l'opportunité d'utiliser les données ; – la compatibilité des fichiers avec leurs systèmes informatiques ; – l’adéquation des données à leurs besoins ; – qu’ils disposent de la compétence suffisante pour utiliser les données ; – l’opportunité d’utiliser la documentation ou les outils d’analyse fournis ou préconisés, en relation avec l’utilisation des données, le cas échéant. Le fournisseur n’est en aucune façon responsable des éléments extérieurs aux données et notamment des outils d’analyse, matériels, logiciels, réseaux..., utilisés pour consulter et/ou traiter les données, même s’il a préconisé ces éléments. L’utilisateur veille à vérifier que l’actualité des informations mises à disposition est compatible avec l’usage qu’il en fait.",
      },
    ],
    spatialExtents: [],
    temporalExtents: [],
    status: 'completed',
    updateFrequency: 'unknown',
    otherLanguages: ['en', 'de'],
    defaultLanguage: 'fr',
  },
]

export const simpleDatasetRecordFixture = (): DatasetRecord => ({
  uniqueIdentifier: 'my-dataset-001',
  kind: 'dataset',
  otherLanguages: [],
  defaultLanguage: 'en',
  recordUpdated: new Date('2022-02-01T14:12:00.000Z'),
  resourceCreated: new Date('2022-09-01T12:18:19.000Z'),
  resourceUpdated: new Date('2022-12-04T14:12:00.000Z'),
  status: 'ongoing',
  title: 'A very interesting dataset (un jeu de données très intéressant)',
  abstract: `This dataset has been established for testing purposes.`,
  ownerOrganization: { name: 'MyOrganization', translations: {} },
  contacts: [
    {
      email: 'bob@org.net',
      position: 'developer',
      organization: { name: 'MyOrganization', translations: {} },
      role: 'point_of_contact',
      firstName: 'Bob',
      lastName: 'TheGreat',
    },
  ],
  contactsForResource: [],
  keywords: [],
  topics: ['testData'],
  licenses: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  lineage: 'This record was edited manually to test the conversion processes',
  spatialRepresentation: 'grid',
  overviews: [],
  spatialExtents: [],
  temporalExtents: [],
  onlineResources: [
    {
      type: 'download',
      url: new URL('http://my-org.net/download/1.zip'),
      name: 'Direct download',
      description: 'Dataset downloaded as a shapefile',
      mimeType: 'x-gis/x-shapefile',
      translations: {},
    },
  ],
  updateFrequency: { per: 'month', updatedTimes: 3 },
  translations: {},
})

export const simpleDatasetRecordWithFcatsFixture = (): DatasetRecord => ({
  uniqueIdentifier: 'my-dataset-with-fcats',
  extras: {
    featureCatalogIdentifier: 'feature-catalog-identifier',
  },
  kind: 'dataset',
  otherLanguages: [],
  defaultLanguage: 'en',
  recordUpdated: new Date('2022-02-01T14:12:00.000Z'),
  resourceCreated: new Date('2022-09-01T12:18:19.000Z'),
  resourceUpdated: new Date('2022-12-04T14:12:00.000Z'),
  status: 'ongoing',
  title: 'A very interesting dataset with a related feature catalog',
  abstract: `This dataset has been established for testing purposes.`,
  ownerOrganization: { name: 'MyOrganization', translations: {} },
  contacts: [
    {
      email: 'bob@org.net',
      position: 'developer',
      organization: { name: 'MyOrganization', translations: {} },
      role: 'point_of_contact',
      firstName: 'Bob',
      lastName: 'TheGreat',
    },
  ],
  contactsForResource: [],
  keywords: [],
  topics: ['testData'],
  licenses: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  lineage:
    'This record was edited manually to test the feature catalog parsing',
  spatialRepresentation: 'grid',
  overviews: [],
  spatialExtents: [],
  temporalExtents: [],
  onlineResources: [],
  updateFrequency: { per: 'month', updatedTimes: 3 },
  translations: {},
})

export const simpleDatasetRecordAsXmlFixture =
  (): string => `<?xml version="1.0" encoding="UTF-8"?>
<mdb:MD_Metadata xmlns:mdb="http://standards.iso.org/iso/19115/-3/mdb/2.0" xmlns:mcc="http://standards.iso.org/iso/19115/-3/mcc/1.0" xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0" xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/2.0" xmlns:mri="http://standards.iso.org/iso/19115/-3/mri/1.0" xmlns:mco="http://standards.iso.org/iso/19115/-3/mco/1.0" xmlns:gcx="http://standards.iso.org/iso/19115/-3/gcx/1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:mmi="http://standards.iso.org/iso/19115/-3/mmi/1.0" xmlns:mrd="http://standards.iso.org/iso/19115/-3/mrd/1.0" xmlns:mrl="http://standards.iso.org/iso/19115/-3/mrl/2.0">
    <mdb:metadataIdentifier>
        <mcc:MD_Identifier>
            <mcc:code>
                <gco:CharacterString>my-dataset-001</gco:CharacterString>
            </mcc:code>
        </mcc:MD_Identifier>
    </mdb:metadataIdentifier>
    <mdb:metadataScope>
        <mdb:MD_MetadataScope>
            <mdb:resourceScope>
                <mcc:MD_ScopeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ScopeCode" codeListValue="dataset">dataset</mcc:MD_ScopeCode>
            </mdb:resourceScope>
        </mdb:MD_MetadataScope>
    </mdb:metadataScope>
    <mdb:contact>
        <cit:CI_Responsibility>
            <cit:role>
                <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="pointOfContact">pointOfContact</cit:CI_RoleCode>
            </cit:role>
            <cit:party>
                <cit:CI_Organisation>
                    <cit:name>
                        <gco:CharacterString>MyOrganization</gco:CharacterString>
                    </cit:name>
                    <cit:contactInfo>
                        <cit:CI_Contact>
                            <cit:address>
                                <cit:CI_Address>
                                    <cit:electronicMailAddress>
                                        <gco:CharacterString>bob@org.net</gco:CharacterString>
                                    </cit:electronicMailAddress>
                                </cit:CI_Address>
                            </cit:address>
                        </cit:CI_Contact>
                    </cit:contactInfo>
                    <cit:individual>
                        <cit:CI_Individual>
                            <cit:name>
                                <gco:CharacterString>Bob TheGreat</gco:CharacterString>
                            </cit:name>
                            <cit:positionName>
                                <gco:CharacterString>developer</gco:CharacterString>
                            </cit:positionName>
                        </cit:CI_Individual>
                    </cit:individual>
                </cit:CI_Organisation>
            </cit:party>
        </cit:CI_Responsibility>
    </mdb:contact>
    <mdb:dateInfo>
        <cit:CI_Date>
            <cit:date>
                <gco:DateTime>2022-02-01T15:12:00</gco:DateTime>
            </cit:date>
            <cit:dateType>
                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="revision">revision</cit:CI_DateTypeCode>
            </cit:dateType>
        </cit:CI_Date>
    </mdb:dateInfo>
    <mdb:identificationInfo>
        <mri:MD_DataIdentification>
            <mri:citation>
                <cit:CI_Citation>
                    <cit:title>
                        <gco:CharacterString>A very interesting dataset (un jeu de données très intéressant)</gco:CharacterString>
                    </cit:title>
                    <cit:date>
                        <cit:CI_Date>
                            <cit:date>
                                <gco:DateTime>2022-09-01T14:18:19</gco:DateTime>
                            </cit:date>
                            <cit:dateType>
                                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="creation">creation</cit:CI_DateTypeCode>
                            </cit:dateType>
                        </cit:CI_Date>
                    </cit:date>
                    <cit:date>
                        <cit:CI_Date>
                            <cit:date>
                                <gco:DateTime>2022-12-04T15:12:00</gco:DateTime>
                            </cit:date>
                            <cit:dateType>
                                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="revision">revision</cit:CI_DateTypeCode>
                            </cit:dateType>
                        </cit:CI_Date>
                    </cit:date>
                </cit:CI_Citation>
            </mri:citation>
            <mri:abstract>
                <gco:CharacterString>This dataset has been established for testing purposes.</gco:CharacterString>
            </mri:abstract>
            <mri:topicCategory>
                <mri:MD_TopicCategoryCode>testData</mri:MD_TopicCategoryCode>
            </mri:topicCategory>
            <mri:status>
                <mcc:MD_ProgressCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ProgressCode" codeListValue="onGoing">onGoing</mcc:MD_ProgressCode>
            </mri:status>
            <mri:resourceMaintenance>
                <mmi:MD_MaintenanceInformation>
                    <mmi:userDefinedMaintenanceFrequency>
                        <gco:TM_PeriodDuration>P0Y0M10D</gco:TM_PeriodDuration>
                    </mmi:userDefinedMaintenanceFrequency>
                </mmi:MD_MaintenanceInformation>
            </mri:resourceMaintenance>
            <mri:spatialRepresentationType>
                <mcc:MD_SpatialRepresentationTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_SpatialRepresentationTypeCode" codeListValue="grid">grid</mcc:MD_SpatialRepresentationTypeCode>
            </mri:spatialRepresentationType>
        </mri:MD_DataIdentification>
    </mdb:identificationInfo>
    <mdb:distributionInfo>
        <mrd:MD_Distribution>
            <mrd:distributionFormat>
                <mrd:MD_Format>
                    <mrd:formatSpecificationCitation>
                        <cit:CI_Citation>
                            <cit:title>
                                <gco:CharacterString>x-gis/x-shapefile</gco:CharacterString>
                            </cit:title>
                        </cit:CI_Citation>
                    </mrd:formatSpecificationCitation>
                </mrd:MD_Format>
            </mrd:distributionFormat>
            <mrd:transferOptions>
                <mrd:MD_DigitalTransferOptions>
                    <mrd:onLine>
                        <cit:CI_OnlineResource>
                            <cit:linkage>
                                <gco:CharacterString>http://my-org.net/download/1.zip</gco:CharacterString>
                            </cit:linkage>
                            <cit:description>
                                <gco:CharacterString>Dataset downloaded as a shapefile</gco:CharacterString>
                            </cit:description>
                            <cit:name>
                                <gco:CharacterString>Direct download</gco:CharacterString>
                            </cit:name>
                            <cit:protocol>
                                <gco:CharacterString>WWW:DOWNLOAD</gco:CharacterString>
                            </cit:protocol>
                            <cit:function>
                                <cit:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="download"/>
                            </cit:function>
                        </cit:CI_OnlineResource>
                    </mrd:onLine>
                </mrd:MD_DigitalTransferOptions>
            </mrd:transferOptions>
        </mrd:MD_Distribution>
    </mdb:distributionInfo>
    <mdb:resourceLineage>
        <mrl:LI_Lineage>
            <mrl:statement>
                <gco:CharacterString>This record was edited manually to test the conversion processes</gco:CharacterString>
            </mrl:statement>
        </mrl:LI_Lineage>
    </mdb:resourceLineage>
</mdb:MD_Metadata>`

export const duplicateDatasetRecordAsXmlFixture =
  (): string => `<?xml version="1.0" encoding="UTF-8"?>
<mdb:MD_Metadata xmlns:mdb="http://standards.iso.org/iso/19115/-3/mdb/2.0" xmlns:mcc="http://standards.iso.org/iso/19115/-3/mcc/1.0" xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0" xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/2.0" xmlns:mri="http://standards.iso.org/iso/19115/-3/mri/1.0" xmlns:mco="http://standards.iso.org/iso/19115/-3/mco/1.0" xmlns:gcx="http://standards.iso.org/iso/19115/-3/gcx/1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:mmi="http://standards.iso.org/iso/19115/-3/mmi/1.0" xmlns:mrd="http://standards.iso.org/iso/19115/-3/mrd/1.0" xmlns:mrl="http://standards.iso.org/iso/19115/-3/mrl/2.0">
    <mdb:metadataIdentifier>
        <mcc:MD_Identifier>
            <mcc:code>
                <gco:CharacterString>my-dataset-001</gco:CharacterString>
            </mcc:code>
        </mcc:MD_Identifier>
    </mdb:metadataIdentifier>
    <mdb:metadataScope>
        <mdb:MD_MetadataScope>
            <mdb:resourceScope>
                <mcc:MD_ScopeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ScopeCode" codeListValue="dataset">dataset</mcc:MD_ScopeCode>
            </mdb:resourceScope>
        </mdb:MD_MetadataScope>
    </mdb:metadataScope>
    <mdb:contact>
        <cit:CI_Responsibility>
            <cit:role>
                <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="pointOfContact">pointOfContact</cit:CI_RoleCode>
            </cit:role>
            <cit:party>
                <cit:CI_Organisation>
                    <cit:name>
                        <gco:CharacterString>MyOrganization</gco:CharacterString>
                    </cit:name>
                    <cit:contactInfo>
                        <cit:CI_Contact>
                            <cit:address>
                                <cit:CI_Address>
                                    <cit:electronicMailAddress>
                                        <gco:CharacterString>bob@org.net</gco:CharacterString>
                                    </cit:electronicMailAddress>
                                </cit:CI_Address>
                            </cit:address>
                        </cit:CI_Contact>
                    </cit:contactInfo>
                    <cit:individual>
                        <cit:CI_Individual>
                            <cit:name>
                                <gco:CharacterString>Bob TheGreat</gco:CharacterString>
                            </cit:name>
                            <cit:positionName>
                                <gco:CharacterString>developer</gco:CharacterString>
                            </cit:positionName>
                        </cit:CI_Individual>
                    </cit:individual>
                </cit:CI_Organisation>
            </cit:party>
        </cit:CI_Responsibility>
    </mdb:contact>
    <mdb:dateInfo>
        <cit:CI_Date>
            <cit:date>
                <gco:DateTime>2022-02-01T15:12:00</gco:DateTime>
            </cit:date>
            <cit:dateType>
                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="revision">revision</cit:CI_DateTypeCode>
            </cit:dateType>
        </cit:CI_Date>
    </mdb:dateInfo>
    <mdb:identificationInfo>
        <mri:MD_DataIdentification>
            <mri:citation>
                <cit:CI_Citation>
                    <cit:title>
                        <gco:CharacterString>Copy of record A very interesting dataset (un jeu de données très intéressant)</gco:CharacterString>
                    </cit:title>
                    <cit:date>
                        <cit:CI_Date>
                            <cit:date>
                                <gco:DateTime>2022-09-01T14:18:19</gco:DateTime>
                            </cit:date>
                            <cit:dateType>
                                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="creation">creation</cit:CI_DateTypeCode>
                            </cit:dateType>
                        </cit:CI_Date>
                    </cit:date>
                    <cit:date>
                        <cit:CI_Date>
                            <cit:date>
                                <gco:DateTime>2022-12-04T15:12:00</gco:DateTime>
                            </cit:date>
                            <cit:dateType>
                                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="revision">revision</cit:CI_DateTypeCode>
                            </cit:dateType>
                        </cit:CI_Date>
                    </cit:date>
                </cit:CI_Citation>
            </mri:citation>
            <mri:abstract>
                <gco:CharacterString>This dataset has been established for testing purposes.</gco:CharacterString>
            </mri:abstract>
            <mri:topicCategory>
                <mri:MD_TopicCategoryCode>testData</mri:MD_TopicCategoryCode>
            </mri:topicCategory>
            <mri:status>
                <mcc:MD_ProgressCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ProgressCode" codeListValue="onGoing">onGoing</mcc:MD_ProgressCode>
            </mri:status>
            <mri:resourceMaintenance>
                <mmi:MD_MaintenanceInformation>
                    <mmi:userDefinedMaintenanceFrequency>
                        <gco:TM_PeriodDuration>P0Y0M10D</gco:TM_PeriodDuration>
                    </mmi:userDefinedMaintenanceFrequency>
                </mmi:MD_MaintenanceInformation>
            </mri:resourceMaintenance>
            <mri:spatialRepresentationType>
                <mcc:MD_SpatialRepresentationTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_SpatialRepresentationTypeCode" codeListValue="grid">grid</mcc:MD_SpatialRepresentationTypeCode>
            </mri:spatialRepresentationType>
        </mri:MD_DataIdentification>
    </mdb:identificationInfo>
    <mdb:distributionInfo>
        <mrd:MD_Distribution>
            <mrd:distributionFormat>
                <mrd:MD_Format>
                    <mrd:formatSpecificationCitation>
                        <cit:CI_Citation>
                            <cit:title>
                                <gco:CharacterString>x-gis/x-shapefile</gco:CharacterString>
                            </cit:title>
                        </cit:CI_Citation>
                    </mrd:formatSpecificationCitation>
                </mrd:MD_Format>
            </mrd:distributionFormat>
            <mrd:transferOptions>
                <mrd:MD_DigitalTransferOptions>
                    <mrd:onLine>
                        <cit:CI_OnlineResource>
                            <cit:linkage>
                                <gco:CharacterString>http://my-org.net/download/1.zip</gco:CharacterString>
                            </cit:linkage>
                            <cit:description>
                                <gco:CharacterString>Dataset downloaded as a shapefile</gco:CharacterString>
                            </cit:description>
                            <cit:name>
                                <gco:CharacterString>Direct download</gco:CharacterString>
                            </cit:name>
                            <cit:protocol>
                                <gco:CharacterString>WWW:DOWNLOAD</gco:CharacterString>
                            </cit:protocol>
                            <cit:function>
                                <cit:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="download"/>
                            </cit:function>
                        </cit:CI_OnlineResource>
                    </mrd:onLine>
                </mrd:MD_DigitalTransferOptions>
            </mrd:transferOptions>
        </mrd:MD_Distribution>
    </mdb:distributionInfo>
    <mdb:resourceLineage>
        <mrl:LI_Lineage>
            <mrl:statement>
                <gco:CharacterString>This record was edited manually to test the conversion processes</gco:CharacterString>
            </mrl:statement>
        </mrl:LI_Lineage>
    </mdb:resourceLineage>
</mdb:MD_Metadata>`

export const importDatasetRecordAsXmlFixture = (): string => `
  <gmd:MD_Metadata
	xmlns:gmd="http://www.isotc211.org/2005/gmd"
	xmlns:gco="http://www.isotc211.org/2005/gco"
	xmlns:srv="http://www.isotc211.org/2005/srv"
	xmlns:gmx="http://www.isotc211.org/2005/gmx"
	xmlns:gts="http://www.isotc211.org/2005/gts"
	xmlns:gsr="http://www.isotc211.org/2005/gsr"
	xmlns:gmi="http://www.isotc211.org/2005/gmi"
	xmlns:gml="http://www.opengis.net/gml/3.2"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.isotc211.org/2005/gmd http://schemas.opengis.net/csw/2.0.2/profiles/apiso/1.0.0/apiso.xsd">
	<gmd:language>
		<gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="eng"/>
	</gmd:language>
	<gmd:characterSet>
		<gmd:MD_CharacterSetCode codeListValue="utf8" codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode"/>
	</gmd:characterSet>
	<gmd:contact>
		<gmd:CI_ResponsibleParty>
			<gmd:individualName gco:nilReason="missing">
				<gco:CharacterString/>
			</gmd:individualName>
			<gmd:organisationName gco:nilReason="missing">
				<gco:CharacterString/>
			</gmd:organisationName>
			<gmd:positionName gco:nilReason="missing">
				<gco:CharacterString/>
			</gmd:positionName>
			<gmd:role>
				<gmd:CI_RoleCode codeListValue="pointOfContact" codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode"/>
			</gmd:role>
		</gmd:CI_ResponsibleParty>
	</gmd:contact>
	<gmd:dateStamp>
		<gco:DateTime>2024-05-31T10:18:45.429Z</gco:DateTime>
	</gmd:dateStamp>
	<gmd:metadataStandardName>
		<gco:CharacterString>ISO 19115:2003/19139</gco:CharacterString>
	</gmd:metadataStandardName>
	<gmd:metadataStandardVersion>
		<gco:CharacterString>1.0</gco:CharacterString>
	</gmd:metadataStandardVersion>
	<gmd:identificationInfo>
		<gmd:MD_DataIdentification>
			<gmd:citation>
				<gmd:CI_Citation>
					<gmd:title>
						<gco:CharacterString>Record with no link</gco:CharacterString>
					</gmd:title>
					<gmd:date>
						<gmd:CI_Date>
							<gmd:date>
								<gco:DateTime>2024-05-31T11:00:00+00:00</gco:DateTime>
							</gmd:date>
							<gmd:dateType>
								<gmd:CI_DateTypeCode codeListValue="publication" codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode"/>
							</gmd:dateType>
						</gmd:CI_Date>
					</gmd:date>
					<gmd:edition gco:nilReason="missing">
						<gco:CharacterString/>
					</gmd:edition>
				</gmd:CI_Citation>
			</gmd:citation>
			<gmd:abstract>
				<gco:CharacterString>Read the abstract and supplemental information provided in the Vector template for more details.</gco:CharacterString>
			</gmd:abstract>
			<gmd:purpose gco:nilReason="missing">
				<gco:CharacterString/>
			</gmd:purpose>
			<gmd:status>
				<gmd:MD_ProgressCode codeListValue="onGoing" codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode"/>
			</gmd:status>
			<gmd:language>
				<gco:CharacterString>eng</gco:CharacterString>
			</gmd:language>
			<gmd:characterSet>
				<gmd:MD_CharacterSetCode codeListValue="utf8" codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode"/>
			</gmd:characterSet>
			<gmd:topicCategory>
				<gmd:MD_TopicCategoryCode>boundaries</gmd:MD_TopicCategoryCode>
			</gmd:topicCategory>
			<gmd:supplementalInformation gco:nilReason="missing">
				<gco:CharacterString/>
			</gmd:supplementalInformation>
		</gmd:MD_DataIdentification>
	</gmd:identificationInfo>
</gmd:MD_Metadata>`

export const simpleServiceRecordFixture = (): ServiceRecord => ({
  abstract: `Ce service de visualisation WMS permet de consulter la série de couches de données "Sites de gestion des déchets miniers - Série".`,
  kind: 'service',
  recordUpdated: new Date('2023-03-17T07:38:08.875Z'),
  recordPublished: null,
  ownerOrganization: null,
  licenses: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  contacts: [],
  contactsForResource: [],
  keywords: [],
  topics: [],
  spatialExtents: [],
  overviews: [],
  defaultLanguage: null,
  otherLanguages: [],
  title: 'Sites de gestion des déchets miniers - Service de visualisation WMS',
  onlineResources: [
    {
      name: 'Rapport de disponibilité du service WMS',
      description:
        'Ce service de visualisation WMS permet de consulter la série de couches de données "Sites de gestion des déchets miniers - Série".',
      mimeType: 'text/html',
      type: 'link',
      url: new URL(
        'https://geoservices.wallonie.be/rapportDisponibilite/wms/sites_de_gestion_des_dechets_miniers_srie.html'
      ),
      accessRestricted: false,
    },
  ],
  uniqueIdentifier: '00b22798-ec8e-4500-89e8-90eeeda45919',
  landingPage: new URL(
    'http://localhost:4200/geonetwork/srv/fre/catalog.search#/metadata/00b22798-ec8e-4500-89e8-90eeeda45919'
  ),
  extras: {
    isPublishedToAll: true,
    id: '723',
    isHarvested: true,
    ownerInfo: 'admin|admin|admin|Administrator',
    edit: true,
  },
  recordCreated: new Date('2023-03-17T07:38:08.875Z'),
})

export const NATIONAL_KEYWORD = {
  key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/national',
  label: 'National',
  description: '',
  type: 'theme',
}

export const SAMPLE_PLACE_KEYWORDS: Keyword[] = [
  // these keywords come from a thesaurus available locally
  {
    key: 'uri1',
    label: 'Berlin',
    thesaurus: {
      id: '1',
      name: 'places',
    },
    type: 'place',
    bbox: [13.27, 52.63, 52.5, 13.14],
  },
  {
    key: 'uri2',
    label: 'Hamburg',
    thesaurus: {
      id: '1',
      name: 'places',
    },
    type: 'place',
    bbox: [10.5, 53.66, 53.53, 10],
  },
  // this keyword is available locally but has no extent linked to it
  {
    key: 'uri3',
    label: 'Munich',
    thesaurus: {
      id: '1',
      name: 'places',
    },
    type: 'place',
    bbox: [11.64, 48.65, 48.51, 11.5],
  },
  // this keyword comes from a thesaurus not available locally
  {
    label: 'Europe',
    thesaurus: {
      id: '2',
      name: 'otherPlaces',
    },
    type: 'place',
  },
  // this keyword has no thesaurus
  {
    label: 'Narnia',
    type: 'place',
  },
]

// records coming from XML do not have a key or a bbox in them
export const SAMPLE_PLACE_KEYWORDS_FROM_XML = SAMPLE_PLACE_KEYWORDS.map(
  ({ label, thesaurus, type }) => ({
    label,
    type,
    ...(thesaurus && { thesaurus }),
  })
)

export const SAMPLE_SPATIAL_EXTENTS: DatasetSpatialExtent[] = [
  // these extents are linked to keywords known locally
  {
    description: 'uri1',
    bbox: [13.5, 52.5, 14.5, 53.5],
  },
  {
    description: 'uri2',
    bbox: [10, 53.5, 11, 53.4],
  },
  {
    description: 'uri4',
    bbox: [11.5, 48.5, 11.5, 48.3],
  },
  // this extent is linked to a keyword not available locally
  {
    description: 'URI-Paris',
    bbox: [1, 2, 3, 4],
  },
  // this extent is not linked to any keyword
  {
    bbox: [5, 6, 7, 8],
  },
]

export const SAMPLE_RECORD = {
  ...datasetRecordsFixture()[0],
  spatialExtents: SAMPLE_SPATIAL_EXTENTS,
  keywords: [
    ...datasetRecordsFixture()[0].keywords,
    ...SAMPLE_PLACE_KEYWORDS_FROM_XML,
  ],
}

export const multilingualDatasetFixture: () => DatasetRecord = () => ({
  kind: 'dataset',
  defaultLanguage: 'en',
  otherLanguages: ['fr', 'de'],
  title: 'English Title',
  abstract: 'English Abstract',
  lineage: 'English Lineage',
  translations: {
    title: { fr: 'Titre Français', de: 'Titel DE' },
    abstract: { fr: 'Résumé Français', de: 'Beschreibung DE' },
    lineage: { fr: 'Généalogie Français', de: 'Lineage DE' },
  },
  keywords: [
    {
      label: 'Keyword EN',
      description: 'Keyword Desc EN',
      type: 'theme',
      translations: {
        label: { fr: 'Mot-clé FR', de: 'Schlusselwort DE' },
        description: { fr: 'Description FR', de: 'Schlusselwort DE' },
      },
    },
  ],
  onlineResources: [],
  licenses: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  contacts: [],
  contactsForResource: [],
  ownerOrganization: {
    name: 'Org EN',
    translations: {
      name: { fr: 'Org FR', de: 'Org DE' },
    },
  },
  spatialExtents: [
    {
      description: 'Extent EN',
      translations: {
        description: { fr: 'Étendue FR', de: 'Bereich DE' },
      },
    },
  ],
  temporalExtents: [],
  status: 'ongoing',
  uniqueIdentifier: 'ABCD-EFGH',
  overviews: [],
  topics: [],
  recordUpdated: null,
})
