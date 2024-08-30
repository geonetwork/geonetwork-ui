export const elasticHitsOnlyFixture = () => ({
  hits: {
    max_score: 1,
    hits: [
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
        _score: 1,
        _source: {
          overview: [
            {
              data: 'data:image/png;base64, ',
              url: 'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/20e9e1a1-83c1-4f13-89ef-c19767d6ee18f.png',
            },
          ],
          resourceDate: [
            {
              date: '2013-05-21T00:00:00.000Z',
              type: 'publication',
            },
            {
              date: '2013-05-21T00:00:00.000Z',
              type: 'creation',
            },
          ],
          resourceLanguage: ['eng'],
          resourceIdentifier: [
            {
              code: 'eea_v_3035_10_km_eea-ref-grid-de_2013',
              link: '',
              codeSpace: '',
            },
          ],
          resourceAbstractObject: {
            default: 'The grid is based on proposal ',
            langeng: 'The grid is based on proposal ',
          },
          resourceTemporalDateRange: [
            {
              gte: '2013-05-21T00:00:00.000Z',
              lte: '2013-05-21T00:00:00.000Z',
            },
            {
              gte: '2013-01-01T00:00:00.000Z',
              lte: '2013-12-31T00:00:00.000Z',
            },
          ],
          resourceTitleObject: {
            default: 'EEA reference grid for Germany (10km), May 2013',
            langeng: 'EEA reference grid for Germany (10km), May 2013',
          },
          logo: '/images/logos/e6826118-7280-4638-b1f9-d898e9efe281.png',
          id: '12456',
          uuid: '20e9e1a1-83c1-4f13-89ef-c19767d6ee18f',
          resourceTemporalExtentDateRange: [
            {
              gte: '2013-01-01T00:00:00.000Z',
              lte: '2013-12-31T00:00:00.000Z',
            },
          ],
          resourceType: ['dataset'],
          sourceCatalogue: '6731be1e-6533-44e0-9b8a-580b45e36e80',
          link: [],
        },
        edit: false,
        owner: false,
        isPublishedToAll: false,
        view: false,
        notify: false,
        download: false,
        dynamic: false,
        featured: false,
        guestdownload: false,
        selected: false,
      },
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: '5b35f06e-8c6b-4907-b8f4-39541d170360',
        _score: 1,
        _source: {
          overview: [
            {
              data: 'data:image/png;base64, ',
              url: 'https://sdi.eea.europa.eu/public/catalogue-graphic-overview/5b35f06e-8c6b-4907-b8f4-39541d170360.png',
            },
          ],
          resourceDate: [
            {
              date: '2017-11-01T00:00:00.000Z',
              type: 'creation',
            },
            {
              date: '2017-12-14T00:00:00.000Z',
              type: 'publication',
            },
          ],
          resourceLanguage: ['eng'],
          resourceIdentifier: [
            {
              code: 'eea_v_4258_100_m_uwwtd-sa-rivers_p_2013-2014_v05_r00',
              link: '',
              codeSpace: '',
            },
          ],
          resourceAbstractObject: {
            default: 'Reference layer of the rivers sensitive areas, ',
            langeng: 'Reference layer of the rivers sensitive areas, ',
          },
          resourceTemporalDateRange: [
            {
              gte: '2017-11-01T00:00:00.000Z',
              lte: '2017-11-01T00:00:00.000Z',
            },
            {
              gte: '2017-12-14T00:00:00.000Z',
              lte: '2017-12-14T00:00:00.000Z',
            },
            {
              gte: '2013-01-01T00:00:00.000Z',
              lte: '2014-12-31T00:00:00.000Z',
            },
          ],
          resourceTitleObject: {
            default:
              'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
            langeng:
              'Urban Waste Water Treatment Directive, Sensitive areas - rivers reported under UWWTD data call 2015, Nov. 2017',
          },
          logo: '/images/logos/e6826118-7280-4638-b1f9-d898e9efe281.png',
          id: '12442',
          uuid: '5b35f06e-8c6b-4907-b8f4-39541d170360',
          resourceTemporalExtentDateRange: [
            {
              gte: '2013-01-01T00:00:00.000Z',
              lte: '2014-12-31T00:00:00.000Z',
            },
          ],
          resourceType: ['dataset'],
          sourceCatalogue: '6731be1e-6533-44e0-9b8a-580b45e36e80',
          userSavedCount: '4',
          link: [],
        },
        edit: false,
        owner: false,
        isPublishedToAll: false,
        view: false,
        notify: false,
        download: false,
        dynamic: false,
        featured: false,
        guestdownload: false,
        selected: false,
      },
    ],
  },
})

export const elasticFullResponseFixture = () => ({
  took: 1,
  timed_out: false,
  _shards: { total: 1, successful: 1, skipped: 0, failed: 0 },
  hits: {
    total: { value: 1, relation: 'eq' },
    max_score: 1.0,
    hits: [
      {
        _index: 'gn-records',
        _type: '_doc',
        _id: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
        _score: 1.0,
        _ignored: [
          'resourceAbstractObject.default.keyword',
          'resourceAbstractObject.langfre.keyword',
          'link.applicationProfile.keyword',
        ],
        _source: {
          docType: 'metadata',
          document: '',
          metadataIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          standardNameObject: {
            default: 'ISO 19115:2003/19139 - SEXTANT',
            langfre: 'ISO 19115:2003/19139 - SEXTANT',
          },
          standardVersionObject: { default: '1.0', langfre: '1.0' },
          indexingDate: '2021-10-29T08:41:42.537Z',
          dateStamp: '2021-09-09T10:41:12.000Z',
          mainLanguage: 'fre',
          cl_characterSet: [
            {
              key: 'utf8',
              default: 'Utf8',
              langfre: 'Utf8',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode',
            },
          ],
          resourceType: ['dataset'],
          Org: 'Ifremer',
          pointOfContactOrg: 'Ifremer',
          contact: [
            {
              organisation: 'Ifremer',
              role: 'pointOfContact',
              email: 'q2suppor@ifremer.fr',
              website: 'https://www.ifremer.fr',
              logo: '',
              individual: "Cellule d'administration Quadrige",
              position: "Cellule d'administration Quadrige",
              phone: '',
              address: '',
            },
          ],
          cl_hierarchyLevel: [
            {
              key: 'dataset',
              default: 'Jeu de données',
              langfre: 'Jeu de données',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode',
            },
          ],
          cl_topologyLevel: [
            {
              key: 'geometryOnly',
              default: 'Géométrie seulement',
              langfre: 'Géométrie seulement',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_TopologyLevelCode',
            },
          ],
          cl_geometricObjectType: [
            {
              key: 'composite',
              default: 'Composite',
              langfre: 'Composite',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_GeometricObjectTypeCode',
            },
          ],
          cl_status: [
            {
              key: 'onGoing',
              default: 'Mise à jour continue',
              langfre: 'Mise à jour continue',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode',
            },
          ],
          cl_maintenanceAndUpdateFrequency: [
            {
              key: 'daily',
              default: 'Journalière',
              langfre: 'Journalière',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_MaintenanceFrequencyCode',
            },
          ],
          cl_type: [
            {
              key: 'theme',
              default: 'Thème',
              langfre: 'Thème',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode',
            },
            {
              key: 'place',
              default: 'Localisation',
              langfre: 'Localisation',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode',
            },
          ],
          cl_accessConstraints: [
            {
              key: 'copyright',
              default: 'Droit d’auteur / Droit moral (copyright)',
              langfre: 'Droit d’auteur / Droit moral (copyright)',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode',
            },
          ],
          cl_spatialRepresentationType: [
            {
              key: 'vector',
              default: 'Vecteur',
              langfre: 'Vecteur',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_SpatialRepresentationTypeCode',
            },
          ],
          resourceTitleObject: {
            default: 'Surval - Données par paramètre',
            langfre: 'Surval - Données par paramètre',
          },
          creationDateForResource: ['2012-01-01T00:00:00.000Z'],
          creationYearForResource: '2012',
          creationMonthForResource: '2012-01',
          publicationDateForResource: ['2021-04-01T00:00:00.000Z'],
          publicationYearForResource: '2021',
          publicationMonthForResource: '2021-04',
          resourceDate: [
            { type: 'creation', date: '2012-01-01T00:00:00.000Z' },
            {
              type: 'publication',
              date: '2021-04-01T00:00:00.000Z',
            },
          ],
          resourceTemporalDateRange: [
            {
              gte: '2012-01-01T00:00:00.000Z',
              lte: '2012-01-01T00:00:00.000Z',
            },
            {
              gte: '2021-04-01T00:00:00.000Z',
              lte: '2021-04-01T00:00:00.000Z',
            },
            { gte: '1974-01-01T00:00:00.000Z' },
          ],
          resourceIdentifier: [
            {
              code: 'DOI:10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
              codeSpace: '',
              link: '',
            },
          ],
          resourceAbstractObject: {
            default:
              "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige, validées et qui ne sont pas sous moratoire.\n\nCe système d'information contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants.\n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclus de la diffusion Surval. Une donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se fait par lieu. Un lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes d'observation et de surveillance.\n\nA compter du 29 avril 2021, conformément aux obligations de l’ « Open data », toutes les données validées sans moratoire sont diffusées à J+1 et sans traitement. Ainsi tous les paramètres et tous les programmes Quadrige sont diffusés, et regroupés sous forme de thème :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\nUn thème regroupe un ou plusieurs programmes d'acquisition. Un programme correspond à une mise en œuvre d'un protocole, sur une période et un ensemble de lieux. Chaque programme est placé sous la responsabilité d'un animateur. \n\nPour accompagner le résultat, de nombreuses données sont diffusées (téléchargeables en tant que données d’observation), comme :\n- la description complète du « Paramètre-Support-Fraction-Méthode-Unité »;\n- la description complète des « Passages », « Prélèvements » et « Échantillons »;\n- le niveau de qualification du résultat;\n- une proposition de citation, afin d’identifier tous les organismes contribuant à cette observation.\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).\n\nL'accès au téléchargement direct du jeu de données complet (~ 220 Mo) en date du 9 juillet 2021 s'effectue par ce lien : https://www.ifremer.fr/sextant_doc/surveillance_littorale/surval/data/surval.zip \nL'accès par la carte permet de configurer des extractions et des graphes de visualisation sur demande (email demandé pour le téléchargement).",
            langfre:
              "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige, validées et qui ne sont pas sous moratoire.\n\nCe système d'information contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants.\n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclus de la diffusion Surval. Une donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se fait par lieu. Un lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes d'observation et de surveillance.\n\nA compter du 29 avril 2021, conformément aux obligations de l’ « Open data », toutes les données validées sans moratoire sont diffusées à J+1 et sans traitement. Ainsi tous les paramètres et tous les programmes Quadrige sont diffusés, et regroupés sous forme de thème :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\nUn thème regroupe un ou plusieurs programmes d'acquisition. Un programme correspond à une mise en œuvre d'un protocole, sur une période et un ensemble de lieux. Chaque programme est placé sous la responsabilité d'un animateur. \n\nPour accompagner le résultat, de nombreuses données sont diffusées (téléchargeables en tant que données d’observation), comme :\n- la description complète du « Paramètre-Support-Fraction-Méthode-Unité »;\n- la description complète des « Passages », « Prélèvements » et « Échantillons »;\n- le niveau de qualification du résultat;\n- une proposition de citation, afin d’identifier tous les organismes contribuant à cette observation.\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).\n\nL'accès au téléchargement direct du jeu de données complet (~ 220 Mo) en date du 9 juillet 2021 s'effectue par ce lien : https://www.ifremer.fr/sextant_doc/surveillance_littorale/surval/data/surval.zip \nL'accès par la carte permet de configurer des extractions et des graphes de visualisation sur demande (email demandé pour le téléchargement).",
          },
          cl_resourceCharacterSet: [
            {
              key: 'utf8',
              default: 'Utf8',
              langfre: 'Utf8',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode',
            },
          ],
          OrgForResource: ['Ifremer', 'Ifremer', 'Ifremer'],
          pointOfContactOrgForResource: 'Ifremer',
          contactForResource: [
            {
              organisation: 'Ifremer',
              role: 'pointOfContact',
              email: 'q2_support@ifremer.fr',
              website: '',
              logo: '',
              individual: "Cellule d'Administration Quadrige",
              position: '',
              phone: '',
              address: '',
            },
            {
              organisation: 'Ifremer',
              role: 'author',
              email: 'q2_support@ifremer.fr',
              website: '',
              logo: '',
              individual: 'Quadrige',
              position: '',
              phone: '',
              address: '',
            },
            {
              organisation: 'Ifremer',
              role: 'publisher',
              email: 'q2_support@ifremer.fr',
              website: '',
              logo: '',
              individual: 'Quadrige',
              position: '',
              phone: '',
              address: '',
            },
          ],
          authorOrgForResource: 'Ifremer',
          publisherOrgForResource: 'Ifremer',
          resourceCreditObject: [{ default: 'Ifremer', langfre: 'Ifremer' }],
          hasOverview: 'true',
          overview: [
            {
              url: 'https://sextant.ifremer.fr/geonetwork/srv/api/records/cf5048f6-5bbf-4e44-ba74-e6f429af51ea/attachments/parametres.gif',
              text: { default: 'parametres.gif', langfre: 'parametres.gif' },
            },
          ],
          resourceLanguage: ['fre'],
          inspireTheme_syn: ['Installations de suivi environnemental'],
          inspireTheme: ['environmental monitoring facilities'],
          inspireThemeFirst_syn: 'Installations de suivi environnemental',
          inspireThemeFirst: 'environmental monitoring facilities',
          inspireAnnexForFirstTheme: 'iii',
          inspireAnnex: ['iii'],
          inspireThemeUri: ['http://inspire.ec.europa.eu/theme/ef'],
          inspireThemeNumber: '1',
          hasInspireTheme: 'true',
          tag: [
            {
              default: 'Lieux de surveillance',
              langfre: 'Lieux de surveillance',
            },
            {
              default: 'Observation',
              langfre: 'Observation',
            },
            { default: 'Surveillance', langfre: 'Surveillance' },
            {
              default: 'Environnement',
              langfre: 'Environnement',
            },
            { default: 'Littoral', langfre: 'Littoral' },
            {
              default: 'Quadrige',
              langfre: 'Quadrige',
            },
            { default: 'DCE', langfre: 'DCE' },
            { default: 'DCSMM', langfre: 'DCSMM' },
            {
              default: 'OSPAR',
              langfre: 'OSPAR',
            },
            { default: 'MEDPOL', langfre: 'MEDPOL' },
            {
              default: 'Données ouvertes',
              langfre: 'Données ouvertes',
            },
            { default: 'Open Data', langfre: 'Open Data' },
            {
              default: 'Surval',
              langfre: 'Surval',
            },
            {
              default: 'Installations de suivi environnemental',
              langfre: 'Installations de suivi environnemental',
            },
            { default: 'D8: Contaminants', langfre: 'D8: Contaminants' },
            {
              default: 'D1: Biodiversité',
              langfre: 'D1: Biodiversité',
            },
            {
              default: 'D7: Changements hydrographiques',
              langfre: 'D7: Changements hydrographiques',
            },
            {
              default: 'D4: Réseaux trophiques',
              langfre: 'D4: Réseaux trophiques',
            },
            {
              default: 'D5: Eutrophisation',
              langfre: 'D5: Eutrophisation',
            },
            {
              default: 'D9: Questions sanitaires',
              langfre: 'D9: Questions sanitaires',
            },
            {
              default: 'D10: Déchets marins',
              langfre: 'D10: Déchets marins',
            },
            {
              default: 'D1: Biodiversité - Habitats benthiques',
              langfre: 'D1: Biodiversité - Habitats benthiques',
            },
            {
              default: 'D1: Biodiversité - Habitats pélagiques',
              langfre: 'D1: Biodiversité - Habitats pélagiques',
            },
            {
              default: 'D1: Biodiversité - Poissons',
              langfre: 'D1: Biodiversité - Poissons',
            },
            {
              default: 'D1: Biodiversité - Mammifères',
              langfre: 'D1: Biodiversité - Mammifères',
            },
            {
              default: 'D1: Biodiversité - Tortues',
              langfre: 'D1: Biodiversité - Tortues',
            },
            {
              default: 'D1: Biodiversité - Céphalopodes',
              langfre: 'D1: Biodiversité - Céphalopodes',
            },
            { default: 'National', langfre: 'National' },
            {
              default: 'Observation par point',
              langfre: 'Observation par point',
            },
            {
              default: 'Observation directe',
              langfre: 'Observation directe',
            },
            {
              default:
                "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
              langfre:
                "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
            },
            {
              default: '/Observations in-situ/Réseaux',
              langfre: '/Observations in-situ/Réseaux',
            },
            {
              default: 'Base de données de recherche',
              langfre: 'Base de données de recherche',
            },
            {
              default: 'Dispositifs de surveillance',
              langfre: 'Dispositifs de surveillance',
            },
            {
              default: '/Biologie marine/Bivalves',
              langfre: '/Biologie marine/Bivalves',
            },
            {
              default:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
              langfre:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
            },
            {
              default: "/Physique de l'Océan/Turbidité",
              langfre: "/Physique de l'Océan/Turbidité",
            },
            {
              default: '/Biogéochimie marine/Pigments',
              langfre: '/Biogéochimie marine/Pigments',
            },
            {
              default: '/Biologie marine/Toxines',
              langfre: '/Biologie marine/Toxines',
            },
            {
              default: '/Biologie marine/Phytoplancton',
              langfre: '/Biologie marine/Phytoplancton',
            },
            {
              default: '/Biologie marine/Zooplancton',
              langfre: '/Biologie marine/Zooplancton',
            },
            {
              default: "/Physique de l'Océan/Température",
              langfre: "/Physique de l'Océan/Température",
            },
            {
              default: "/Physique de l'Océan/Salinité",
              langfre: "/Physique de l'Océan/Salinité",
            },
            {
              default: '/Biogéochimie marine/Oxygène dissous',
              langfre: '/Biogéochimie marine/Oxygène dissous',
            },
            {
              default: '/Biologie marine/Organismes pathogènes',
              langfre: '/Biologie marine/Organismes pathogènes',
            },
            {
              default: '/Biologie marine/Organismes marins tropicaux',
              langfre: '/Biologie marine/Organismes marins tropicaux',
            },
            {
              default: '/Biologie marine/Matière en suspension',
              langfre: '/Biologie marine/Matière en suspension',
            },
            {
              default: '/Biogéochimie marine/Nutriments (sels nutritifs)',
              langfre: '/Biogéochimie marine/Nutriments (sels nutritifs)',
            },
            {
              default: '/Biologie marine/Habitats benthiques',
              langfre: '/Biologie marine/Habitats benthiques',
            },
            {
              default: '/Etat du Milieu/Biogéochimie',
              langfre: '/Etat du Milieu/Biogéochimie',
            },
            {
              default: '/Etat du Milieu/Pollutions',
              langfre: '/Etat du Milieu/Pollutions',
            },
            {
              default: '/Etat du Milieu/Littoral',
              langfre: '/Etat du Milieu/Littoral',
            },
            {
              default: '/Etat du Milieu/Habitats',
              langfre: '/Etat du Milieu/Habitats',
            },
            {
              default: '/Etat du Milieu/Espèces',
              langfre: '/Etat du Milieu/Espèces',
            },
            {
              default: 'Brest',
              langfre: 'Brest',
            },
            { default: 'Fort-de-France', langfre: 'Fort-de-France' },
            {
              default: 'Boulogne-sur-Mer',
              langfre: 'Boulogne-sur-Mer',
            },
            { default: 'Nouméa', langfre: 'Nouméa' },
            {
              default: 'Toulon',
              langfre: 'Toulon',
            },
            { default: 'Sète', langfre: 'Sète' },
            { default: 'La Rochelle', langfre: 'La Rochelle' },
          ],
          isOpenData: 'true',
          'keywordType-theme': [
            {
              default: 'Lieux de surveillance',
              langfre: 'Lieux de surveillance',
            },
            { default: 'Observation', langfre: 'Observation' },
            {
              default: 'Surveillance',
              langfre: 'Surveillance',
            },
            { default: 'Environnement', langfre: 'Environnement' },
            {
              default: 'Littoral',
              langfre: 'Littoral',
            },
            { default: 'Quadrige', langfre: 'Quadrige' },
            {
              default: 'DCE',
              langfre: 'DCE',
            },
            { default: 'DCSMM', langfre: 'DCSMM' },
            {
              default: 'OSPAR',
              langfre: 'OSPAR',
            },
            { default: 'MEDPOL', langfre: 'MEDPOL' },
            {
              default: 'Données ouvertes',
              langfre: 'Données ouvertes',
            },
            { default: 'Open Data', langfre: 'Open Data' },
            {
              default: 'Surval',
              langfre: 'Surval',
            },
            {
              default: 'Installations de suivi environnemental',
              langfre: 'Installations de suivi environnemental',
            },
            { default: 'D8: Contaminants', langfre: 'D8: Contaminants' },
            {
              default: 'D1: Biodiversité',
              langfre: 'D1: Biodiversité',
            },
            {
              default: 'D7: Changements hydrographiques',
              langfre: 'D7: Changements hydrographiques',
            },
            {
              default: 'D4: Réseaux trophiques',
              langfre: 'D4: Réseaux trophiques',
            },
            {
              default: 'D5: Eutrophisation',
              langfre: 'D5: Eutrophisation',
            },
            {
              default: 'D9: Questions sanitaires',
              langfre: 'D9: Questions sanitaires',
            },
            {
              default: 'D10: Déchets marins',
              langfre: 'D10: Déchets marins',
            },
            {
              default: 'D1: Biodiversité - Habitats benthiques',
              langfre: 'D1: Biodiversité - Habitats benthiques',
            },
            {
              default: 'D1: Biodiversité - Habitats pélagiques',
              langfre: 'D1: Biodiversité - Habitats pélagiques',
            },
            {
              default: 'D1: Biodiversité - Poissons',
              langfre: 'D1: Biodiversité - Poissons',
            },
            {
              default: 'D1: Biodiversité - Mammifères',
              langfre: 'D1: Biodiversité - Mammifères',
            },
            {
              default: 'D1: Biodiversité - Tortues',
              langfre: 'D1: Biodiversité - Tortues',
            },
            {
              default: 'D1: Biodiversité - Céphalopodes',
              langfre: 'D1: Biodiversité - Céphalopodes',
            },
            {
              default: 'Observation par point',
              langfre: 'Observation par point',
            },
            {
              default: 'Observation directe',
              langfre: 'Observation directe',
            },
            {
              default:
                "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
              langfre:
                "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
            },
            {
              default: '/Observations in-situ/Réseaux',
              langfre: '/Observations in-situ/Réseaux',
            },
            {
              default: 'Base de données de recherche',
              langfre: 'Base de données de recherche',
            },
            {
              default: 'Dispositifs de surveillance',
              langfre: 'Dispositifs de surveillance',
            },
            {
              default: '/Biologie marine/Bivalves',
              langfre: '/Biologie marine/Bivalves',
            },
            {
              default:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
              langfre:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
            },
            {
              default: "/Physique de l'Océan/Turbidité",
              langfre: "/Physique de l'Océan/Turbidité",
            },
            {
              default: '/Biogéochimie marine/Pigments',
              langfre: '/Biogéochimie marine/Pigments',
            },
            {
              default: '/Biologie marine/Toxines',
              langfre: '/Biologie marine/Toxines',
            },
            {
              default: '/Biologie marine/Phytoplancton',
              langfre: '/Biologie marine/Phytoplancton',
            },
            {
              default: '/Biologie marine/Zooplancton',
              langfre: '/Biologie marine/Zooplancton',
            },
            {
              default: "/Physique de l'Océan/Température",
              langfre: "/Physique de l'Océan/Température",
            },
            {
              default: "/Physique de l'Océan/Salinité",
              langfre: "/Physique de l'Océan/Salinité",
            },
            {
              default: '/Biogéochimie marine/Oxygène dissous',
              langfre: '/Biogéochimie marine/Oxygène dissous',
            },
            {
              default: '/Biologie marine/Organismes pathogènes',
              langfre: '/Biologie marine/Organismes pathogènes',
            },
            {
              default: '/Biologie marine/Organismes marins tropicaux',
              langfre: '/Biologie marine/Organismes marins tropicaux',
            },
            {
              default: '/Biologie marine/Matière en suspension',
              langfre: '/Biologie marine/Matière en suspension',
            },
            {
              default: '/Biogéochimie marine/Nutriments (sels nutritifs)',
              langfre: '/Biogéochimie marine/Nutriments (sels nutritifs)',
            },
            {
              default: '/Biologie marine/Habitats benthiques',
              langfre: '/Biologie marine/Habitats benthiques',
            },
            {
              default: '/Etat du Milieu/Biogéochimie',
              langfre: '/Etat du Milieu/Biogéochimie',
            },
            {
              default: '/Etat du Milieu/Pollutions',
              langfre: '/Etat du Milieu/Pollutions',
            },
            {
              default: '/Etat du Milieu/Littoral',
              langfre: '/Etat du Milieu/Littoral',
            },
            {
              default: '/Etat du Milieu/Habitats',
              langfre: '/Etat du Milieu/Habitats',
            },
            {
              default: '/Etat du Milieu/Espèces',
              langfre: '/Etat du Milieu/Espèces',
            },
          ],
          'keywordType-place': [
            { default: 'National', langfre: 'National' },
            {
              default: 'Brest',
              langfre: 'Brest',
            },
            { default: 'Fort-de-France', langfre: 'Fort-de-France' },
            {
              default: 'Boulogne-sur-Mer',
              langfre: 'Boulogne-sur-Mer',
            },
            { default: 'Nouméa', langfre: 'Nouméa' },
            {
              default: 'Toulon',
              langfre: 'Toulon',
            },
            { default: 'Sète', langfre: 'Sète' },
            { default: 'La Rochelle', langfre: 'La Rochelle' },
          ],
          'th_httpinspireeceuropaeutheme-themeNumber': '1',
          'th_httpinspireeceuropaeutheme-theme': [
            {
              default: 'Installations de suivi environnemental',
              langfre: 'Installations de suivi environnemental',
            },
          ],
          indexingErrorMsg: [
            'Warning / Keyword Installations de suivi environnemental not found in geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme.',
            'Warning / Keyword D8: Contaminants not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D1: Biodiversité not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D7: Changements hydrographiques not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D4: Réseaux trophiques not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D5: Eutrophisation not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D9: Questions sanitaires not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D10: Déchets marins not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D1: Biodiversité - Habitats benthiques not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D1: Biodiversité - Habitats pélagiques not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D1: Biodiversité - Poissons not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D1: Biodiversité - Mammifères not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D1: Biodiversité - Tortues not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D1: Biodiversité - Céphalopodes not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword National not found in geonetwork.thesaurus.local.place.dcsmm.area.',
            'Warning / Keyword Observation par point not found in geonetwork.thesaurus.local.theme.dcsmm-methode.',
            'Warning / Keyword Observation directe not found in geonetwork.thesaurus.local.theme.dcsmm-methode.',
            "Warning / Keyword /Activités humaines/Réseaux d'observation et de surveillance du littoral not found in geonetwork.thesaurus.local.theme.sextant-theme.",
            'Warning / Keyword /Observations in-situ/Réseaux not found in geonetwork.thesaurus.local.theme.type_jeux_donnee.',
            'Warning / Keyword Base de données de recherche not found in geonetwork.thesaurus.local.theme.odatis_thematiques.',
            'Warning / Keyword Dispositifs de surveillance not found in geonetwork.thesaurus.local.theme.odatis_thematiques.',
            'Warning / Keyword /Biologie marine/Bivalves not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biogéochimie marine/Eléments chimiques et contaminants not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            "Warning / Keyword /Physique de l'Océan/Turbidité not found in geonetwork.thesaurus.local.theme.odatis_variables.",
            'Warning / Keyword /Biogéochimie marine/Pigments not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Toxines not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Phytoplancton not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Zooplancton not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            "Warning / Keyword /Physique de l'Océan/Température not found in geonetwork.thesaurus.local.theme.odatis_variables.",
            "Warning / Keyword /Physique de l'Océan/Salinité not found in geonetwork.thesaurus.local.theme.odatis_variables.",
            'Warning / Keyword /Biogéochimie marine/Oxygène dissous not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Organismes pathogènes not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Organismes marins tropicaux not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Matière en suspension not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biogéochimie marine/Nutriments (sels nutritifs) not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Habitats benthiques not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Etat du Milieu/Biogéochimie not found in geonetwork.thesaurus.local.theme.simm.thematiques.',
            'Warning / Keyword /Etat du Milieu/Pollutions not found in geonetwork.thesaurus.local.theme.simm.thematiques.',
            'Warning / Keyword /Etat du Milieu/Littoral not found in geonetwork.thesaurus.local.theme.simm.thematiques.',
            'Warning / Keyword /Etat du Milieu/Habitats not found in geonetwork.thesaurus.local.theme.simm.thematiques.',
            'Warning / Keyword /Etat du Milieu/Espèces not found in geonetwork.thesaurus.local.theme.simm.thematiques.',
            'Warning / Keyword Brest not found in geonetwork.thesaurus.local.place.oh_ville.',
            'Warning / Keyword Fort-de-France not found in geonetwork.thesaurus.local.place.oh_ville.',
            'Warning / Keyword Boulogne-sur-Mer not found in geonetwork.thesaurus.local.place.oh_ville.',
            'Warning / Keyword Nouméa not found in geonetwork.thesaurus.local.place.oh_ville.',
            'Warning / Keyword Toulon not found in geonetwork.thesaurus.local.place.oh_ville.',
            'Warning / Keyword Sète not found in geonetwork.thesaurus.local.place.oh_ville.',
            'Warning / Keyword La Rochelle not found in geonetwork.thesaurus.local.place.oh_ville.',
          ],
          indexingError: [
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
            'true',
          ],
          'th_dcsmm-descripteurNumber': '13',
          'th_dcsmm-descripteur': [
            {
              default: 'D8: Contaminants',
              langfre: 'D8: Contaminants',
            },
            {
              default: 'D1: Biodiversité',
              langfre: 'D1: Biodiversité',
            },
            {
              default: 'D7: Changements hydrographiques',
              langfre: 'D7: Changements hydrographiques',
            },
            {
              default: 'D4: Réseaux trophiques',
              langfre: 'D4: Réseaux trophiques',
            },
            {
              default: 'D5: Eutrophisation',
              langfre: 'D5: Eutrophisation',
            },
            {
              default: 'D9: Questions sanitaires',
              langfre: 'D9: Questions sanitaires',
            },
            {
              default: 'D10: Déchets marins',
              langfre: 'D10: Déchets marins',
            },
            {
              default: 'D1: Biodiversité - Habitats benthiques',
              langfre: 'D1: Biodiversité - Habitats benthiques',
            },
            {
              default: 'D1: Biodiversité - Habitats pélagiques',
              langfre: 'D1: Biodiversité - Habitats pélagiques',
            },
            {
              default: 'D1: Biodiversité - Poissons',
              langfre: 'D1: Biodiversité - Poissons',
            },
            {
              default: 'D1: Biodiversité - Mammifères',
              langfre: 'D1: Biodiversité - Mammifères',
            },
            {
              default: 'D1: Biodiversité - Tortues',
              langfre: 'D1: Biodiversité - Tortues',
            },
            {
              default: 'D1: Biodiversité - Céphalopodes',
              langfre: 'D1: Biodiversité - Céphalopodes',
            },
          ],
          th_areaNumber: '1',
          th_area: [{ default: 'National', langfre: 'National' }],
          'th_dcsmm-methodeNumber': '2',
          'th_dcsmm-methode': [
            {
              default: 'Observation par point',
              langfre: 'Observation par point',
            },
            {
              default: 'Observation directe',
              langfre: 'Observation directe',
            },
          ],
          'th_sextant-themeNumber': '1',
          'th_sextant-theme': [
            {
              default:
                "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
              langfre:
                "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
            },
          ],
          th_type_jeux_donneeNumber: '1',
          th_type_jeux_donnee: [
            {
              default: '/Observations in-situ/Réseaux',
              langfre: '/Observations in-situ/Réseaux',
            },
          ],
          th_odatis_thematiquesNumber: '2',
          th_odatis_thematiques: [
            {
              default: 'Base de données de recherche',
              langfre: 'Base de données de recherche',
            },
            {
              default: 'Dispositifs de surveillance',
              langfre: 'Dispositifs de surveillance',
            },
          ],
          th_odatis_variablesNumber: '15',
          th_odatis_variables: [
            {
              default: '/Biologie marine/Bivalves',
              langfre: '/Biologie marine/Bivalves',
            },
            {
              default:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
              langfre:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
            },
            {
              default: "/Physique de l'Océan/Turbidité",
              langfre: "/Physique de l'Océan/Turbidité",
            },
            {
              default: '/Biogéochimie marine/Pigments',
              langfre: '/Biogéochimie marine/Pigments',
            },
            {
              default: '/Biologie marine/Toxines',
              langfre: '/Biologie marine/Toxines',
            },
            {
              default: '/Biologie marine/Phytoplancton',
              langfre: '/Biologie marine/Phytoplancton',
            },
            {
              default: '/Biologie marine/Zooplancton',
              langfre: '/Biologie marine/Zooplancton',
            },
            {
              default: "/Physique de l'Océan/Température",
              langfre: "/Physique de l'Océan/Température",
            },
            {
              default: "/Physique de l'Océan/Salinité",
              langfre: "/Physique de l'Océan/Salinité",
            },
            {
              default: '/Biogéochimie marine/Oxygène dissous',
              langfre: '/Biogéochimie marine/Oxygène dissous',
            },
            {
              default: '/Biologie marine/Organismes pathogènes',
              langfre: '/Biologie marine/Organismes pathogènes',
            },
            {
              default: '/Biologie marine/Organismes marins tropicaux',
              langfre: '/Biologie marine/Organismes marins tropicaux',
            },
            {
              default: '/Biologie marine/Matière en suspension',
              langfre: '/Biologie marine/Matière en suspension',
            },
            {
              default: '/Biogéochimie marine/Nutriments (sels nutritifs)',
              langfre: '/Biogéochimie marine/Nutriments (sels nutritifs)',
            },
            {
              default: '/Biologie marine/Habitats benthiques',
              langfre: '/Biologie marine/Habitats benthiques',
            },
          ],
          th_thematiquesNumber: '5',
          th_thematiques: [
            {
              default: '/Etat du Milieu/Biogéochimie',
              langfre: '/Etat du Milieu/Biogéochimie',
            },
            {
              default: '/Etat du Milieu/Pollutions',
              langfre: '/Etat du Milieu/Pollutions',
            },
            {
              default: '/Etat du Milieu/Littoral',
              langfre: '/Etat du Milieu/Littoral',
            },
            {
              default: '/Etat du Milieu/Habitats',
              langfre: '/Etat du Milieu/Habitats',
            },
            {
              default: '/Etat du Milieu/Espèces',
              langfre: '/Etat du Milieu/Espèces',
            },
          ],
          th_oh_villeNumber: '7',
          th_oh_ville: [
            { default: 'Brest', langfre: 'Brest' },
            {
              default: 'Fort-de-France',
              langfre: 'Fort-de-France',
            },
            { default: 'Boulogne-sur-Mer', langfre: 'Boulogne-sur-Mer' },
            {
              default: 'Nouméa',
              langfre: 'Nouméa',
            },
            { default: 'Toulon', langfre: 'Toulon' },
            {
              default: 'Sète',
              langfre: 'Sète',
            },
            { default: 'La Rochelle', langfre: 'La Rochelle' },
          ],
          allKeywords: {
            geonetworkthesauruslocalthemedcsmmdescripteur: {
              id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
              title: 'DCSMM : Descripteurs',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default: 'D8: Contaminants',
                  langfre: 'D8: Contaminants',
                },
                {
                  default: 'D1: Biodiversité',
                  langfre: 'D1: Biodiversité',
                },
                {
                  default: 'D7: Changements hydrographiques',
                  langfre: 'D7: Changements hydrographiques',
                },
                {
                  default: 'D4: Réseaux trophiques',
                  langfre: 'D4: Réseaux trophiques',
                },
                {
                  default: 'D5: Eutrophisation',
                  langfre: 'D5: Eutrophisation',
                },
                {
                  default: 'D9: Questions sanitaires',
                  langfre: 'D9: Questions sanitaires',
                },
                {
                  default: 'D10: Déchets marins',
                  langfre: 'D10: Déchets marins',
                },
                {
                  default: 'D1: Biodiversité - Habitats benthiques',
                  langfre: 'D1: Biodiversité - Habitats benthiques',
                },
                {
                  default: 'D1: Biodiversité - Habitats pélagiques',
                  langfre: 'D1: Biodiversité - Habitats pélagiques',
                },
                {
                  default: 'D1: Biodiversité - Poissons',
                  langfre: 'D1: Biodiversité - Poissons',
                },
                {
                  default: 'D1: Biodiversité - Mammifères',
                  langfre: 'D1: Biodiversité - Mammifères',
                },
                {
                  default: 'D1: Biodiversité - Tortues',
                  langfre: 'D1: Biodiversité - Tortues',
                },
                {
                  default: 'D1: Biodiversité - Céphalopodes',
                  langfre: 'D1: Biodiversité - Céphalopodes',
                },
              ],
            },
            geonetworkthesauruslocalthemedcsmmmethode: {
              id: 'geonetwork.thesaurus.local.theme.dcsmm-methode',
              title: 'DCSMM : Méthodes de recueil des données',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default: 'Observation par point',
                  langfre: 'Observation par point',
                },
                {
                  default: 'Observation directe',
                  langfre: 'Observation directe',
                },
              ],
            },
            geonetworkthesaurusexternalthemehttpinspireeceuropaeuthemetheme: {
              id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
              title: 'GEMET - INSPIRE themes, version 1.0',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default: 'Installations de suivi environnemental',
                  langfre: 'Installations de suivi environnemental',
                },
              ],
            },
            geonetworkthesauruslocalplaceohville: {
              id: 'geonetwork.thesaurus.local.place.oh_ville',
              title: 'Ocean Hackathon - Ville',
              theme: 'place',
              link: '',
              keywords: [
                { default: 'Brest', langfre: 'Brest' },
                {
                  default: 'Fort-de-France',
                  langfre: 'Fort-de-France',
                },
                { default: 'Boulogne-sur-Mer', langfre: 'Boulogne-sur-Mer' },
                {
                  default: 'Nouméa',
                  langfre: 'Nouméa',
                },
                { default: 'Toulon', langfre: 'Toulon' },
                {
                  default: 'Sète',
                  langfre: 'Sète',
                },
                { default: 'La Rochelle', langfre: 'La Rochelle' },
              ],
            },
            geonetworkthesauruslocalplacedcsmmarea: {
              id: 'geonetwork.thesaurus.local.place.dcsmm.area',
              title: 'Sous-regions marines',
              theme: 'place',
              link: '',
              keywords: [{ default: 'National', langfre: 'National' }],
            },
            geonetworkthesauruslocalthemeodatisthematiques: {
              id: 'geonetwork.thesaurus.local.theme.odatis_thematiques',
              title: 'Thèmatiques ODATIS',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default: 'Base de données de recherche',
                  langfre: 'Base de données de recherche',
                },
                {
                  default: 'Dispositifs de surveillance',
                  langfre: 'Dispositifs de surveillance',
                },
              ],
            },
            geonetworkthesauruslocalthemesextanttheme: {
              id: 'geonetwork.thesaurus.local.theme.sextant-theme',
              title: 'Thèmes Sextant',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default:
                    "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
                  langfre:
                    "/Activités humaines/Réseaux d'observation et de surveillance du littoral",
                },
              ],
            },
            geonetworkthesauruslocalthemesimmthematiques: {
              id: 'geonetwork.thesaurus.local.theme.simm.thematiques',
              title: 'Thématiques - SIMM',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default: '/Etat du Milieu/Biogéochimie',
                  langfre: '/Etat du Milieu/Biogéochimie',
                },
                {
                  default: '/Etat du Milieu/Pollutions',
                  langfre: '/Etat du Milieu/Pollutions',
                },
                {
                  default: '/Etat du Milieu/Littoral',
                  langfre: '/Etat du Milieu/Littoral',
                },
                {
                  default: '/Etat du Milieu/Habitats',
                  langfre: '/Etat du Milieu/Habitats',
                },
                {
                  default: '/Etat du Milieu/Espèces',
                  langfre: '/Etat du Milieu/Espèces',
                },
              ],
            },
            geonetworkthesauruslocalthemetypejeuxdonnee: {
              id: 'geonetwork.thesaurus.local.theme.type_jeux_donnee',
              title: 'Type de jeux de donnée ODATIS',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default: '/Observations in-situ/Réseaux',
                  langfre: '/Observations in-situ/Réseaux',
                },
              ],
            },
            geonetworkthesauruslocalthemeodatisvariables: {
              id: 'geonetwork.thesaurus.local.theme.odatis_variables',
              title: 'Variables ODATIS',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default: '/Biologie marine/Bivalves',
                  langfre: '/Biologie marine/Bivalves',
                },
                {
                  default:
                    '/Biogéochimie marine/Eléments chimiques et contaminants',
                  langfre:
                    '/Biogéochimie marine/Eléments chimiques et contaminants',
                },
                {
                  default: "/Physique de l'Océan/Turbidité",
                  langfre: "/Physique de l'Océan/Turbidité",
                },
                {
                  default: '/Biogéochimie marine/Pigments',
                  langfre: '/Biogéochimie marine/Pigments',
                },
                {
                  default: '/Biologie marine/Toxines',
                  langfre: '/Biologie marine/Toxines',
                },
                {
                  default: '/Biologie marine/Phytoplancton',
                  langfre: '/Biologie marine/Phytoplancton',
                },
                {
                  default: '/Biologie marine/Zooplancton',
                  langfre: '/Biologie marine/Zooplancton',
                },
                {
                  default: "/Physique de l'Océan/Température",
                  langfre: "/Physique de l'Océan/Température",
                },
                {
                  default: "/Physique de l'Océan/Salinité",
                  langfre: "/Physique de l'Océan/Salinité",
                },
                {
                  default: '/Biogéochimie marine/Oxygène dissous',
                  langfre: '/Biogéochimie marine/Oxygène dissous',
                },
                {
                  default: '/Biologie marine/Organismes pathogènes',
                  langfre: '/Biologie marine/Organismes pathogènes',
                },
                {
                  default: '/Biologie marine/Organismes marins tropicaux',
                  langfre: '/Biologie marine/Organismes marins tropicaux',
                },
                {
                  default: '/Biologie marine/Matière en suspension',
                  langfre: '/Biologie marine/Matière en suspension',
                },
                {
                  default: '/Biogéochimie marine/Nutriments (sels nutritifs)',
                  langfre: '/Biogéochimie marine/Nutriments (sels nutritifs)',
                },
                {
                  default: '/Biologie marine/Habitats benthiques',
                  langfre: '/Biologie marine/Habitats benthiques',
                },
              ],
            },
            'otherKeywords-theme': {
              keywords: [
                {
                  default: 'Lieux de surveillance',
                  langfre: 'Lieux de surveillance',
                },
                { default: 'Observation', langfre: 'Observation' },
                {
                  default: 'Surveillance',
                  langfre: 'Surveillance',
                },
                { default: 'Environnement', langfre: 'Environnement' },
                {
                  default: 'Littoral',
                  langfre: 'Littoral',
                },
                { default: 'Quadrige', langfre: 'Quadrige' },
                {
                  default: 'DCE',
                  langfre: 'DCE',
                },
                { default: 'DCSMM', langfre: 'DCSMM' },
                {
                  default: 'OSPAR',
                  langfre: 'OSPAR',
                },
                { default: 'MEDPOL', langfre: 'MEDPOL' },
                {
                  default: 'Données ouvertes',
                  langfre: 'Données ouvertes',
                },
                { default: 'Open Data', langfre: 'Open Data' },
                { default: 'Surval', langfre: 'Surval' },
              ],
            },
          },
          cl_topic: [{ key: 'oceans', default: 'Océans', langfre: 'Océans' }],
          resolutionScaleDenominator: ['5000'],
          MD_ConstraintsUseLimitationObject: [
            {
              default: 'Restriction lié à l’exercice du droit moral',
              langfre: 'Restriction lié à l’exercice du droit moral',
            },
          ],
          geom: {
            type: 'Polygon',
            coordinates: [
              [
                [-180.0, -70.0],
                [180.0, -70.0],
                [180.0, 70.0],
                [-180.0, 70.0],
                [-180.0, -70.0],
              ],
            ],
          },
          location: '0,0',
          resourceTemporalExtentDateRange: [
            { gte: '1974-01-01T00:00:00.000Z' },
          ],
          coordinateSystem: ['WGS 84 (EPSG:4326)'],
          crsDetails: [
            {
              code: 'WGS 84 (EPSG:4326)',
              codeSpace: 'EPSG',
              name: 'WGS 84 (EPSG:4326)',
              url: '',
            },
          ],
          specificationConformance: [
            {
              title: 'Inspire specifications',
              date: '2012-01-16',
              explanation: 'Non évalué',
              pass: 'false',
            },
          ],
          lineageObject: {
            default:
              'Les données sont bancarisées dans la base de données Quadrige.',
            langfre:
              'Les données sont bancarisées dans la base de données Quadrige.',
          },
          format: [''],
          linkUrl: [
            'https://wwz.ifremer.fr/envlit/Quadrige-la-base-de-donnees',
            'https://wwz.ifremer.fr/envlit/Surveillance-du-littoral',
            'http://archimer.ifremer.fr/doc/00409/52016/',
            'http://www.ifremer.fr/services/wms/surveillance_littorale',
            'http://www.ifremer.fr/services/wfs/surveillance_littorale',
            'https://www.ifremer.fr/services/wps3/surval',
            'http://www.ifremer.fr/services/wms/surveillance_littorale',
            'http://www.ifremer.fr/services/wfs/surveillance_littorale',
            'https://www.ifremer.fr/services/wps3/surval',
            'http://www.ifremer.fr/services/wms/surveillance_littorale',
            'http://www.ifremer.fr/services/wfs/surveillance_littorale',
            'https://www.ifremer.fr/services/wps3/surval',
            'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          ],
          linkProtocol: [
            'WWW:LINK',
            'WWW:LINK-1.0-http--link',
            'WWW:LINK',
            'OGC:WMS',
            'OGC:WFS',
            'OGC:WPS',
            'OGC:WMS',
            'OGC:WFS',
            'OGC:WPS',
            'OGC:WMS',
            'OGC:WFS',
            'OGC:WPS',
            'WWW:LINK-1.0-http--metadata-URL',
          ],
          linkUrlProtocolWWWLINK: [
            'https://wwz.ifremer.fr/envlit/Quadrige-la-base-de-donnees',
            'http://archimer.ifremer.fr/doc/00409/52016/',
          ],
          link: [
            {
              protocol: 'WWW:LINK',
              url: 'https://wwz.ifremer.fr/envlit/Quadrige-la-base-de-donnees',
              name: 'La base de données Quadrige',
              description: '',
              function: '',
              applicationProfile: '',
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--link',
              url: 'https://wwz.ifremer.fr/envlit/Surveillance-du-littoral',
              name: 'La surveillance du milieu marin et côtier',
              description: '',
              function: '',
              applicationProfile: '',
              group: 0,
            },
            {
              protocol: 'WWW:LINK',
              url: 'http://archimer.ifremer.fr/doc/00409/52016/',
              name: 'Manuel pour l’utilisation des données REPHY',
              description:
                'Manuel pour l’utilisation des données REPHY. Informations destinées à améliorer la compréhension des fichiers de données REPHY mis à disposition des scientifiques et du public. ODE/VIGIES/17-15. Ifremer, ODE/VIGIES, Coordination REPHY & Cellule Quadrige (2017).',
              function: '',
              applicationProfile: '',
              group: 1,
            },
            {
              protocol: 'OGC:WMS',
              url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
              name: 'surval_parametre_point',
              description: 'Lieu de surveillance (point)',
              function: '',
              applicationProfile: '',
              group: 2,
            },
            {
              protocol: 'OGC:WFS',
              url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
              name: 'surval_parametre_point',
              description: 'Lieu de surveillance (point)',
              function: '',
              applicationProfile:
                '{\n\t\t\t\t\t\t\t"tokenizedFields":{\n\t\t\t\t\t\t\t   "THEME":";",\n\t\t\t\t\t\t\t\t"PROGRAMME":";",\n\t\t\t\t\t\t\t\t"PARAMETRE":";"\n\t\t\t\t\t\t\t},\t\t\t\n\t\t\t\t\t\t\t"fields":[\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t"name":"THEME",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Thème",\n\t\t\t\t\t\t\t\t\t\t"en":"Thème"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t    "name":"PROGRAMME",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Programme de suivi",\n\t\t\t\t\t\t\t\t\t\t"en":"Programme de suivi"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"PARAMETRE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Paramètre",\n\t\t\t\t\t\t\t\t\t\t"en":"Paramètre"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name": "range_Date",\n\t\t\t\t\t\t\t\t\t"type": "rangeDate",\n\t\t\t\t\t\t\t\t\t"minField": "DATEMIN",\n\t\t\t\t\t\t\t\t\t"maxField": "DATEMAX",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Date",\n\t\t\t\t\t\t\t\t\t\t"en":"Date"\n\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t"display": "graph"\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"LIEU_LIBELLE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Lieu",\n\t\t\t\t\t\t\t\t\t\t"en":"Lieu"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t"name":"QUADRIGE_ZONEMARINE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Zone marine Quadrige",\n\t\t\t\t\t\t\t\t\t\t"en":"Zone marine Quadrige"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"DCSMM_SOUS_REGION",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Sous-région marine DCSMM",\n\t\t\t\t\t\t\t\t\t\t"en":"Sous-région marine DCSMM"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"DCE_MASSE_EAU",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Masse d’eau DCE",\n\t\t\t\t\t\t\t\t\t\t"en":"Masse d’eau DCE"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"GRAPHES", \n\t\t\t\t\t\t\t\t\t"hidden": true,\n\t\t\t\t\t\t\t\t\t"suffix":"from=${filtre_range_Date.from}&to=${filtre_range_Date.to}&typeParam=${filtre_PARAMETRE}"\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t"treeFields": [\n\t\t\t\t\t\t\t\t"PARAMETRE"\n\t\t\t\t\t\t\t]}',
              group: 2,
            },
            {
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps3/surval',
              name: 'r:survalextraction30140',
              description: "Extraction des données d'observation",
              function: '',
              applicationProfile:
                '{\n                           "inputs":[\n                              {\n                                 "identifier":"theme",\n                                 "linkedWfsFilter":"THEME",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },      {\n                                 "identifier":"programme_suivi",\n                                 "linkedWfsFilter":"PROGRAMME",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                             {\n                               "identifier":"parametres",\n                               "linkedWfsFilter":"PARAMETRE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\n                             },\n                              {\n                                 "identifier":"date_min",\n                                 "linkedWfsFilter":"range_Date.from",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"date_max",\n                                 "linkedWfsFilter":"range_Date.to",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"zone_marine_quadrige",\n                                 "linkedWfsFilter":"ZONE_MARINE_QUADRIGE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"sous_region_marine_dcsmm",\n                                 "linkedWfsFilter":"SOUS_REGION_MARINE_DCSMM",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"masse_eau_dce",\n                                 "linkedWfsFilter":"MASSE_EAU_DCE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"supports_niveaux_prelevement",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"taxon",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"taxon_group",\n                               "hidden": true\n                              },      \n                              {\n                                 "identifier":"entity_id",\n                               "hidden": true\t\t \n                              },\n                              {\n                                 "identifier":"entity_label",\n                                 "linkedWfsFilter":"LIEU_LIBELLE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\t  \n                              {\n                                 "identifier":"limits",\n                                 "linkedWfsFilter":"geometry",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"geometry_type",\n                                 "defaultValue":"POINT",\n                               "hidden": true\n                              }      \n                           ]\n                        }',
              group: 2,
            },
            {
              protocol: 'OGC:WMS',
              url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
              name: 'surval_parametre_ligne',
              description: 'Lieu de surveillance (ligne)',
              function: '',
              applicationProfile: '',
              group: 3,
            },
            {
              protocol: 'OGC:WFS',
              url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
              name: 'surval_parametre_ligne',
              description: 'Lieu de surveillance (ligne)',
              function: '',
              applicationProfile:
                '{\n\t\t\t\t\t\t\t"tokenizedFields":{\n\t\t\t\t\t\t\t   "THEME":";",\n\t\t\t\t\t\t\t\t"PROGRAMME":";",\n\t\t\t\t\t\t\t\t"PARAMETRE":";"\n\t\t\t\t\t\t\t},\t\t\t\n\t\t\t\t\t\t\t"fields":[\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t"name":"THEME",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Thème",\n\t\t\t\t\t\t\t\t\t\t"en":"Thème"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t    "name":"PROGRAMME",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Programme de suivi",\n\t\t\t\t\t\t\t\t\t\t"en":"Programme de suivi"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"PARAMETRE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Paramètre",\n\t\t\t\t\t\t\t\t\t\t"en":"Paramètre"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name": "range_Date",\n\t\t\t\t\t\t\t\t\t"type": "rangeDate",\n\t\t\t\t\t\t\t\t\t"minField": "DATEMIN",\n\t\t\t\t\t\t\t\t\t"maxField": "DATEMAX",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Date",\n\t\t\t\t\t\t\t\t\t\t"en":"Date"\n\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t"display": "graph"\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"LIEU_LIBELLE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Lieu",\n\t\t\t\t\t\t\t\t\t\t"en":"Lieu"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t"name":"QUADRIGE_ZONEMARINE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Zone marine Quadrige",\n\t\t\t\t\t\t\t\t\t\t"en":"Zone marine Quadrige"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"DCSMM_SOUS_REGION",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Sous-région marine DCSMM",\n\t\t\t\t\t\t\t\t\t\t"en":"Sous-région marine DCSMM"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"DCE_MASSE_EAU",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Masse d’eau DCE",\n\t\t\t\t\t\t\t\t\t\t"en":"Masse d’eau DCE"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"GRAPHES", \n\t\t\t\t\t\t\t\t\t"hidden": true,\n\t\t\t\t\t\t\t\t\t"suffix":"from=${filtre_range_Date.from}&to=${filtre_range_Date.to}&typeParam=${filtre_PARAMETRE}"\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t"treeFields": [\n\t\t\t\t\t\t\t\t"PARAMETRE"\n\t\t\t\t\t\t\t]}',
              group: 3,
            },
            {
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps3/surval',
              name: 'r:survalextraction30140',
              description: "Extraction des données d'observation",
              function: '',
              applicationProfile:
                '{\n                           "inputs":[\n                              {\n                                 "identifier":"theme",\n                                 "linkedWfsFilter":"THEME",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },      {\n                                 "identifier":"programme_suivi",\n                                 "linkedWfsFilter":"PROGRAMME",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                             {\n                               "identifier":"parametres",\n                               "linkedWfsFilter":"PARAMETRE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\n                             },\n                              {\n                                 "identifier":"date_min",\n                                 "linkedWfsFilter":"range_Date.from",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"date_max",\n                                 "linkedWfsFilter":"range_Date.to",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"zone_marine_quadrige",\n                                 "linkedWfsFilter":"ZONE_MARINE_QUADRIGE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"sous_region_marine_dcsmm",\n                                 "linkedWfsFilter":"SOUS_REGION_MARINE_DCSMM",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"masse_eau_dce",\n                                 "linkedWfsFilter":"MASSE_EAU_DCE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"supports_niveaux_prelevement",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"taxon",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"taxon_group",\n                               "hidden": true\n                              },      \n                              {\n                                 "identifier":"entity_id",\n                               "hidden": true\t\t \n                              },\n                              {\n                                 "identifier":"entity_label",\n                                 "linkedWfsFilter":"LIEU_LIBELLE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\t  \n                              {\n                                 "identifier":"limits",\n                                 "linkedWfsFilter":"geometry",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"geometry_type",\n                                 "defaultValue":"LINE",\n                               "hidden": true\n                              }      \n                           ]\n                        }',
              group: 3,
            },
            {
              protocol: 'OGC:WMS',
              url: 'http://www.ifremer.fr/services/wms/surveillance_littorale',
              name: 'surval_parametre_polygone',
              description: 'Lieu de surveillance (polygone)',
              function: '',
              applicationProfile: '',
              group: 4,
            },
            {
              protocol: 'OGC:WFS',
              url: 'http://www.ifremer.fr/services/wfs/surveillance_littorale',
              name: 'surval_parametre_polygone',
              description: 'Lieu de surveillance (polygone)',
              function: '',
              applicationProfile:
                '{\n\t\t\t\t\t\t\t"tokenizedFields":{\n\t\t\t\t\t\t\t   "THEME":";",\n\t\t\t\t\t\t\t\t"PROGRAMME":";",\n\t\t\t\t\t\t\t\t"PARAMETRE":";"\n\t\t\t\t\t\t\t},\t\t\t\n\t\t\t\t\t\t\t"fields":[\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t"name":"THEME",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Thème",\n\t\t\t\t\t\t\t\t\t\t"en":"Thème"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t    "name":"PROGRAMME",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Programme de suivi",\n\t\t\t\t\t\t\t\t\t\t"en":"Programme de suivi"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"PARAMETRE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Paramètre",\n\t\t\t\t\t\t\t\t\t\t"en":"Paramètre"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name": "range_Date",\n\t\t\t\t\t\t\t\t\t"type": "rangeDate",\n\t\t\t\t\t\t\t\t\t"minField": "DATEMIN",\n\t\t\t\t\t\t\t\t\t"maxField": "DATEMAX",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Date",\n\t\t\t\t\t\t\t\t\t\t"en":"Date"\n\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t"display": "graph"\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"LIEU_LIBELLE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Lieu",\n\t\t\t\t\t\t\t\t\t\t"en":"Lieu"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t"name":"QUADRIGE_ZONEMARINE",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Zone marine Quadrige",\n\t\t\t\t\t\t\t\t\t\t"en":"Zone marine Quadrige"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"DCSMM_SOUS_REGION",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Sous-région marine DCSMM",\n\t\t\t\t\t\t\t\t\t\t"en":"Sous-région marine DCSMM"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"DCE_MASSE_EAU",\n\t\t\t\t\t\t\t\t\t"label":{\n\t\t\t\t\t\t\t\t\t\t"fr":"Masse d’eau DCE",\n\t\t\t\t\t\t\t\t\t\t"en":"Masse d’eau DCE"\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},{\n\t\t\t\t\t\t\t\t\t"name":"GRAPHES", \n\t\t\t\t\t\t\t\t\t"hidden": true,\n\t\t\t\t\t\t\t\t\t"suffix":"from=${filtre_range_Date.from}&to=${filtre_range_Date.to}&typeParam=${filtre_PARAMETRE}"\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t"treeFields": [\n\t\t\t\t\t\t\t\t"PARAMETRE"\n\t\t\t\t\t\t\t]}',
              group: 4,
            },
            {
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps3/surval',
              name: 'r:survalextraction30140',
              description: "Extraction des données d'observation",
              function: '',
              applicationProfile:
                '{\n                           "inputs":[\n                              {\n                                 "identifier":"theme",\n                                 "linkedWfsFilter":"THEME",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },      {\n                                 "identifier":"programme_suivi",\n                                 "linkedWfsFilter":"PROGRAMME",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                             {\n                               "identifier":"parametres",\n                               "linkedWfsFilter":"PARAMETRE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\n                             },\n                              {\n                                 "identifier":"date_min",\n                                 "linkedWfsFilter":"range_Date.from",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"date_max",\n                                 "linkedWfsFilter":"range_Date.to",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"zone_marine_quadrige",\n                                 "linkedWfsFilter":"ZONE_MARINE_QUADRIGE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"sous_region_marine_dcsmm",\n                                 "linkedWfsFilter":"SOUS_REGION_MARINE_DCSMM",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"masse_eau_dce",\n                                 "linkedWfsFilter":"MASSE_EAU_DCE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\n                              {\n                                 "identifier":"supports_niveaux_prelevement",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"taxon",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"taxon_group",\n                               "hidden": true\n                              },      \n                              {\n                                 "identifier":"entity_id",\n                               "hidden": true\t\t \n                              },\n                              {\n                                 "identifier":"entity_label",\n                                 "linkedWfsFilter":"LIEU_LIBELLE",\n                               "hidden": true,\n                               "tokenizeWfsFilterValues": true,\n                               "wfsFilterValuesDelimiter": ";"\t\t \n                              },\t  \n                              {\n                                 "identifier":"limits",\n                                 "linkedWfsFilter":"geometry",\n                               "hidden": true\n                              },\n                              {\n                                 "identifier":"geometry_type",\n                                 "defaultValue":"AREA",\n                               "hidden": true\n                              }      \n                           ]\n                        }',
              group: 4,
            },
            {
              protocol: 'WWW:LINK-1.0-http--metadata-URL',
              url: 'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
              name: 'DOI du jeu de données',
              description: 'DOI du jeu de données',
              function: '',
              applicationProfile: '',
              group: 5,
            },
          ],
          linkUrlProtocolWWWLINK10httplink:
            'https://wwz.ifremer.fr/envlit/Surveillance-du-littoral',
          linkUrlProtocolOGCWMS: [
            'http://www.ifremer.fr/services/wms/surveillance_littorale',
            'http://www.ifremer.fr/services/wms/surveillance_littorale',
            'http://www.ifremer.fr/services/wms/surveillance_littorale',
          ],
          linkUrlProtocolOGCWFS: [
            'http://www.ifremer.fr/services/wfs/surveillance_littorale',
            'http://www.ifremer.fr/services/wfs/surveillance_littorale',
            'http://www.ifremer.fr/services/wfs/surveillance_littorale',
          ],
          linkUrlProtocolOGCWPS: [
            'https://www.ifremer.fr/services/wps3/surval',
            'https://www.ifremer.fr/services/wps3/surval',
            'https://www.ifremer.fr/services/wps3/surval',
          ],
          linkUrlProtocolWWWLINK10httpmetadataURL:
            'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          recordGroup: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          isPublishedToAll: 'true',
          recordOwner: 'Test ADMIN',
          uuid: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          displayOrder: '0',
          popularity: 2,
          userinfo: 'testadmin|ADMIN|Test|Administrator',
          record: 'record',
          draft: 'n',
          changeDate: '2021-10-05T12:48:57.678Z',
          id: '11700',
          createDate: '2021-10-05T12:48:57.678Z',
          owner: '100',
          groupOwner: '2',
          logo: '/images/logos/81e8a591-7815-4d2f-a7da-5673192e74c9.png',
          hasxlinks: 'false',
          groupPublished: ['sample', 'all'],
          featureOfRecord: 'record',
          extra: 'null',
          documentStandard: 'iso19139',
          valid: '-1',
          isTemplate: 'n',
          feedbackCount: '0',
          rating: '0',
          isHarvested: 'false',
          sourceCatalogue: '81e8a591-7815-4d2f-a7da-5673192e74c9',
          userSavedCount: '12',
          cl_function: [
            {
              key: 'download',
              default: 'Téléchargement',
              langfre: 'Téléchargement',
              link: 'http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode',
            },
          ],
          revisionDateForResource: ['2021-12-13T00:00:00.000Z'],
          revisionYearForResource: '2021',
          revisionMonthForResource: '2021-12',
          MD_LegalConstraintsUseLimitationObject: [
            {
              default: "Restriction légale d'utilisation à préciser",
              langfre: "Restriction légale d'utilisation à préciser",
            },
          ],
          MD_LegalConstraintsOtherConstraintsObject: [
            {
              default: 'Pas de restriction d’accès public',
              langfre: 'Pas de restriction d’accès public',
              link: 'http://inspire.ec.europa.eu/metadatacodelist/LimitationsOnPublicAccess/noLimitations',
            },
            {
              default:
                'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
              langfre:
                'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
            },
          ],
          licenseObject: [
            {
              default: 'Pas de restriction d’accès public',
              langfre: 'Pas de restriction d’accès public',
              link: 'http://inspire.ec.europa.eu/metadatacodelist/LimitationsOnPublicAccess/noLimitations',
            },
            {
              default:
                'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
              langfre:
                'Licence Ouverte version 2.0  https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf',
            },
          ],
          extentDescriptionObject: [
            {
              default: 'Hauts-de-France (Région)',
              langfre: 'Hauts-de-France (Région)',
            },
          ],
          valid_inspire: '-1',
          xlink: [
            'http://www.eionet.europa.eu/gemet/concept/6279',
            'http://geonetwork-opensource.org/gemet',
            'https://www.geo2france.fr/geonetwork/srv/api/registries/vocabularies/external.theme.gemet',
            'http://geonetwork-opensource.org/administrativeAreaFr#REG_32',
            'https://www.geo2france.fr/catalogue/administrativeEntities',
            'https://www.geo2france.fr/geonetwork/srv/api/registries/vocabularies/external.place.territoires',
            'http://inspire.ec.europa.eu/metadatacodelist/LimitationsOnPublicAccess/noLimitations',
          ],
        },
        edit: false,
        owner: false,
        isPublishedToAll: true,
        view: true,
        notify: false,
        download: true,
        dynamic: true,
        featured: false,
        selected: false,
      },
    ],
  },
})
