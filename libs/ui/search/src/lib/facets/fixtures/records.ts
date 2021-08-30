export const RECORDS_SUMMARY_FIXTURE = [
  {
    id: '139',
    uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
    title: 'metadata 1',
    abstract: 'this is the abstract of metadata 1',
    metadataUrl:
      'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    updateFrequency: 'Final',
    logoUrl:
      'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png',
    viewable: true,
    downloadable: true,
  },
  {
    id: '139',
    uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
    title: 'metadata 2',
    abstract:
      'this is the abstract of metadata 2. This abstract will contain some extra dummy text just to see how it displays on more than one line',
    metadataUrl:
      'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    updateFrequency: 'Final',
    logoUrl:
      'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png',
    viewable: true,
    downloadable: true,
  },
  {
    id: '139',
    uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
    title: 'metadata 3',
    abstract: 'this is the abstract of metadata 3',
    metadataUrl:
      'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    updateFrequency: 'Final',
    logoUrl:
      'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png',
    viewable: true,
    downloadable: true,
  },
  {
    id: '139',
    uuid: 'd2f30aa4-867e-40b9-9c37-3cb21f541008',
    title: 'metadata 4',
    abstract: 'this is the abstract of metadata 4',
    metadataUrl:
      'https://sdi.eea.europa.eu/catalogue/srv/api/records/c88e743d-e838-49e1-8c80-54f26bcf4ab8',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    updateFrequency: 'Final',
    logoUrl:
      'https://www.geograndest.fr/geonetwork/images/logos/b1b10881-2a33-472f-b99b-7576a6f84025.png',
    viewable: true,
    downloadable: true,
  },
]

export const RECORDS_FULL_FIXTURE = [
  {
    abstract:
      "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige.\n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclues de la diffusion Surval.\nUne donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se réalise par lieu.\nUn lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes.\n\nAujourd’hui, ce produit met à disposition des données issues d'une sélection de thématiques.\n\nThématiques suivies :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).",
    updatedOn: new Date('2021-04-01T17:38:51.895Z'),
    createdOn: new Date('2021-03-31T12:17:38.105Z'),
    dataCreatedOn: new Date('2012-01-01T00:00:00.000Z'),
    id: '10420',
    links: [
      {
        description: 'Lieu de surveillance (point)',
        name: 'surval_parametre_point',
        protocol: 'OGC:WMS',
        url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
      },
      {
        description: 'Lieu de surveillance (point)',
        name: 'surval_parametre_point',
        protocol: 'OGC:WFS',
        url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
      },
      {
        description: "Extraction des données d'observation",
        name: 'r:survalextraction',
        protocol: 'OGC:WPS',
        url: 'https://www.ifremer.fr/services/wps/surval',
      },
      {
        description: 'Lieu de surveillance (polygone)',
        name: 'surval_parametre_polygone',
        protocol: 'OGC:WMS',
        url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
      },
      {
        description: 'Lieu de surveillance (polygone)',
        name: 'surval_parametre_polygone',
        protocol: 'OGC:WFS',
        url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
      },
      {
        description: "Extraction des données d'observation",
        name: 'r:survalextraction',
        protocol: 'OGC:WPS',
        url: 'https://www.ifremer.fr/services/wps/surval',
      },
      {
        description: '',
        name: 'La base de données Quadrige',
        protocol: 'WWW:LINK',
        url: 'http://envlit.ifremer.fr/resultats/quadrige',
      },
      {
        description: '',
        name: 'La surveillance du milieu marin et côtier',
        protocol: 'WWW:LINK-1.0-http--link',
        url: 'http://envlit.ifremer.fr/surveillance/presentation',
      },
      {
        description:
          'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
        name: 'Manuel pour l’utilisation des données REPHY',
        protocol: 'WWW:LINK',
        url: 'http://archimer.ifremer.fr/doc/00409/52016/',
      },
      {
        description: 'DOI du jeu de données',
        name: 'DOI du jeu de données',
        protocol: 'WWW:LINK-1.0-http--metadata-URL',
        url: 'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
      },
    ],
    logoUrl:
      '/geonetwork/images/logos/cea9bf9f-329a-4583-9092-2dfc7efdcce2.png',
    mainLanguage: 'fre',
    metadataUrl: 'url',
    thumbnailUrl:
      'https://sextant.ifremer.fr/geonetwork/srv/api/records/cf5048f6-5bbf-4e44-ba74-e6f429af51ea/attachments/parametres.gif',
    title: 'Surval - Données par paramètre',
    uuid: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
    viewable: true,
    downloadable: true,
  },
]
