export const ES_FIXTURE_FULL_RESPONSE = {
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
        _source: {
          docType: 'metadata',
          document: '',
          metadataIdentifier: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          standardNameObject: {
            default: 'ISO 19115:2003/19139 - SEXTANT',
            langfre: 'ISO 19115:2003/19139 - SEXTANT',
          },
          standardVersionObject: { default: '1.0', langfre: '1.0' },
          indexingDate: '2021-08-25T07:36:44Z',
          dateStamp: '2021-04-01T17:38:51.866Z',
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
              website: '',
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
              key: 'otherRestrictions',
              default: 'Autres restrictions',
              langfre: 'Autres restrictions',
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
          publicationDateForResource: ['2018-01-01T00:00:00.000Z'],
          publicationYearForResource: '2018',
          publicationMonthForResource: '2018-01',
          resourceDate: [
            { type: 'creation', date: '2012-01-01T00:00:00.000Z' },
            { type: 'publication', date: '2018-01-01T00:00:00.000Z' },
          ],
          resourceTemporalDateRange: [
            {
              gte: '2012-01-01T00:00:00.000Z',
              lte: '2012-01-01T00:00:00.000Z',
            },
            {
              gte: '2018-01-01T00:00:00.000Z',
              lte: '2018-01-01T00:00:00.000Z',
            },
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
              "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige.\n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclues de la diffusion Surval.\nUne donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se réalise par lieu.\nUn lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes.\n\nAujourd’hui, ce produit met à disposition des données issues d'une sélection de thématiques.\n\nThématiques suivies :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).",
            langfre:
              "Le produit Surval \"Données par paramètre\" met à disposition les données d'observation et de surveillance bancarisées dans Quadrige.\n\nCe produit contient des résultats sur la plupart des paramètres physiques, chimiques et biologiques de description de l'environnement. Les premières données datent par exemple de 1974 pour les paramètres de la qualité générale des eaux et les contaminants, 1987 pour le phytoplancton et les phycotoxines, 1989 pour la microbiologie, du début des années 2000 pour le benthos. \n\nLes données sous moratoire ou les données qualifiées \"Faux\" sont exclues de la diffusion Surval.\nUne donnée validée dans Quadrige aujourd’hui sera disponible dans Surval demain.\n\nL'accès aux données d'observation se réalise par lieu.\nUn lieu de surveillance est un lieu géographique où des observations, des mesures et/ou des prélèvements sont effectués. Il est localisé de façon unique par son emprise cartographique (surface, ligne ou point). Un lieu de mesure peut être utilisé par plusieurs programmes.\n\nAujourd’hui, ce produit met à disposition des données issues d'une sélection de thématiques.\n\nThématiques suivies :\n- Benthos dont récifs coralliens\n- Contaminants chimiques et Écotoxicologie\n- Déchets\n- Microbiologie\n- Phytoplancton et Hydrologie\n- Ressources aquacoles\n- Zooplancton\n- Autres\n\nL'emprise géographique est nationale : la métropole et les départements et régions d'outre-mer (DROM).",
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
            { default: 'Observation', langfre: 'Observation' },
            { default: 'Surveillance', langfre: 'Surveillance' },
            { default: 'Environnement', langfre: 'Environnement' },
            { default: 'Littoral', langfre: 'Littoral' },
            { default: 'Quadrige', langfre: 'Quadrige' },
            { default: 'DCE', langfre: 'DCE' },
            { default: 'DCSMM', langfre: 'DCSMM' },
            { default: 'OSPAR', langfre: 'OSPAR' },
            { default: 'MEDPOL', langfre: 'MEDPOL' },
            {
              default: 'Installations de suivi environnemental',
              langfre: 'Installations de suivi environnemental',
            },
            { default: 'D5: Eutrophisation', langfre: 'D5: Eutrophisation' },
            {
              default: 'D4: Réseaux trophiques',
              langfre: 'D4: Réseaux trophiques',
            },
            {
              default: 'D8: Contaminants chimiques',
              langfre: 'D8: Contaminants chimiques',
            },
            { default: 'D1: Biodiversité', langfre: 'D1: Biodiversité' },
            {
              default: 'D2: Espèces non indigènes',
              langfre: 'D2: Espèces non indigènes',
            },
            {
              default: 'D7: Conditions hydrographiques',
              langfre: 'D7: Conditions hydrographiques',
            },
            {
              default: 'D9: Questions sanitaires',
              langfre: 'D9: Questions sanitaires',
            },
            { default: 'D10: Déchets marins', langfre: 'D10: Déchets marins' },
            { default: 'National', langfre: 'National' },
            { default: 'Observation directe', langfre: 'Observation directe' },
            {
              default: 'Observation par point',
              langfre: 'Observation par point',
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
              default: '/Biogéochimie marine/Pigments',
              langfre: '/Biogéochimie marine/Pigments',
            },
            {
              default:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
              langfre:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
            },
            {
              default: '/Biologie marine/Habitats benthiques',
              langfre: '/Biologie marine/Habitats benthiques',
            },
            {
              default: '/Biologie marine/Organismes pathogènes',
              langfre: '/Biologie marine/Organismes pathogènes',
            },
            {
              default: '/Biologie marine/Phytoplancton',
              langfre: '/Biologie marine/Phytoplancton',
            },
            {
              default: '/Biogéochimie marine/Nutriments (sels nutritifs)',
              langfre: '/Biogéochimie marine/Nutriments (sels nutritifs)',
            },
            {
              default: '/Biologie marine/Toxines',
              langfre: '/Biologie marine/Toxines',
            },
            {
              default: "/Physique de l'Océan/Turbidité",
              langfre: "/Physique de l'Océan/Turbidité",
            },
            {
              default: '/Biologie marine/Matière en suspension',
              langfre: '/Biologie marine/Matière en suspension',
            },
            {
              default: '/Biogéochimie marine/Oxygène dissous',
              langfre: '/Biogéochimie marine/Oxygène dissous',
            },
            {
              default: "/Physique de l'Océan/Salinité",
              langfre: "/Physique de l'Océan/Salinité",
            },
            {
              default: "/Physique de l'Océan/Température",
              langfre: "/Physique de l'Océan/Température",
            },
            {
              default: '/Biologie marine/Zooplancton',
              langfre: '/Biologie marine/Zooplancton',
            },
            {
              default: '/Etat du Milieu/Biogéochimie',
              langfre: '/Etat du Milieu/Biogéochimie',
            },
            {
              default: '/Etat du Milieu/Pollutions',
              langfre: '/Etat du Milieu/Pollutions',
            },
          ],
          isOpenData: 'false',
          'keywordType-theme': [
            {
              default: 'Lieux de surveillance',
              langfre: 'Lieux de surveillance',
            },
            { default: 'Observation', langfre: 'Observation' },
            { default: 'Surveillance', langfre: 'Surveillance' },
            { default: 'Environnement', langfre: 'Environnement' },
            { default: 'Littoral', langfre: 'Littoral' },
            { default: 'Quadrige', langfre: 'Quadrige' },
            { default: 'DCE', langfre: 'DCE' },
            { default: 'DCSMM', langfre: 'DCSMM' },
            { default: 'OSPAR', langfre: 'OSPAR' },
            { default: 'MEDPOL', langfre: 'MEDPOL' },
            {
              default: 'Installations de suivi environnemental',
              langfre: 'Installations de suivi environnemental',
            },
            { default: 'D5: Eutrophisation', langfre: 'D5: Eutrophisation' },
            {
              default: 'D4: Réseaux trophiques',
              langfre: 'D4: Réseaux trophiques',
            },
            {
              default: 'D8: Contaminants chimiques',
              langfre: 'D8: Contaminants chimiques',
            },
            { default: 'D1: Biodiversité', langfre: 'D1: Biodiversité' },
            {
              default: 'D2: Espèces non indigènes',
              langfre: 'D2: Espèces non indigènes',
            },
            {
              default: 'D7: Conditions hydrographiques',
              langfre: 'D7: Conditions hydrographiques',
            },
            {
              default: 'D9: Questions sanitaires',
              langfre: 'D9: Questions sanitaires',
            },
            { default: 'D10: Déchets marins', langfre: 'D10: Déchets marins' },
            { default: 'Observation directe', langfre: 'Observation directe' },
            {
              default: 'Observation par point',
              langfre: 'Observation par point',
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
              default: '/Biogéochimie marine/Pigments',
              langfre: '/Biogéochimie marine/Pigments',
            },
            {
              default:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
              langfre:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
            },
            {
              default: '/Biologie marine/Habitats benthiques',
              langfre: '/Biologie marine/Habitats benthiques',
            },
            {
              default: '/Biologie marine/Organismes pathogènes',
              langfre: '/Biologie marine/Organismes pathogènes',
            },
            {
              default: '/Biologie marine/Phytoplancton',
              langfre: '/Biologie marine/Phytoplancton',
            },
            {
              default: '/Biogéochimie marine/Nutriments (sels nutritifs)',
              langfre: '/Biogéochimie marine/Nutriments (sels nutritifs)',
            },
            {
              default: '/Biologie marine/Toxines',
              langfre: '/Biologie marine/Toxines',
            },
            {
              default: "/Physique de l'Océan/Turbidité",
              langfre: "/Physique de l'Océan/Turbidité",
            },
            {
              default: '/Biologie marine/Matière en suspension',
              langfre: '/Biologie marine/Matière en suspension',
            },
            {
              default: '/Biogéochimie marine/Oxygène dissous',
              langfre: '/Biogéochimie marine/Oxygène dissous',
            },
            {
              default: "/Physique de l'Océan/Salinité",
              langfre: "/Physique de l'Océan/Salinité",
            },
            {
              default: "/Physique de l'Océan/Température",
              langfre: "/Physique de l'Océan/Température",
            },
            {
              default: '/Biologie marine/Zooplancton',
              langfre: '/Biologie marine/Zooplancton',
            },
            {
              default: '/Etat du Milieu/Biogéochimie',
              langfre: '/Etat du Milieu/Biogéochimie',
            },
            {
              default: '/Etat du Milieu/Pollutions',
              langfre: '/Etat du Milieu/Pollutions',
            },
          ],
          'keywordType-place': [{ default: 'National', langfre: 'National' }],
          'th_httpinspireeceuropaeutheme-themeNumber': '1',
          'th_httpinspireeceuropaeutheme-theme': [
            {
              default: 'Installations de suivi environnemental',
              langfre: 'Installations de suivi environnemental',
              link: 'http://inspire.ec.europa.eu/theme/ef',
            },
          ],
          'th_httpinspireeceuropaeutheme-theme_tree': {
            default: ['Installations de suivi environnemental'],
            key: ['http://inspire.ec.europa.eu/theme/ef'],
          },
          'th_dcsmm-descripteurNumber': '8',
          'th_dcsmm-descripteur': [
            { default: 'D5: Eutrophisation', langfre: 'D5: Eutrophisation' },
            {
              default: 'D4: Réseaux trophiques',
              langfre: 'D4: Réseaux trophiques',
            },
            {
              default: 'D8: Contaminants chimiques',
              langfre: 'D8: Contaminants chimiques',
            },
            { default: 'D1: Biodiversité', langfre: 'D1: Biodiversité' },
            {
              default: 'D2: Espèces non indigènes',
              langfre: 'D2: Espèces non indigènes',
            },
            {
              default: 'D7: Conditions hydrographiques',
              langfre: 'D7: Conditions hydrographiques',
            },
            {
              default: 'D9: Questions sanitaires',
              langfre: 'D9: Questions sanitaires',
            },
            { default: 'D10: Déchets marins', langfre: 'D10: Déchets marins' },
          ],
          indexingErrorMsg: [
            'Warning / Keyword D5: Eutrophisation not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D4: Réseaux trophiques not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D8: Contaminants chimiques not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D1: Biodiversité not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D2: Espèces non indigènes not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D7: Conditions hydrographiques not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D9: Questions sanitaires not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword D10: Déchets marins not found in geonetwork.thesaurus.local.theme.dcsmm-descripteur.',
            'Warning / Keyword National not found in geonetwork.thesaurus.local.place.dcsmm.area.',
            'Warning / Keyword Observation directe not found in geonetwork.thesaurus.local.theme.dcsmm-methode.',
            'Warning / Keyword Observation par point not found in geonetwork.thesaurus.local.theme.dcsmm-methode.',
            "Warning / Keyword /Activités humaines/Réseaux d'observation et de surveillance du littoral not found in geonetwork.thesaurus.local.theme.sextant-theme.",
            'Warning / Keyword /Observations in-situ/Réseaux not found in geonetwork.thesaurus.local.theme.type_jeux_donnee.',
            'Warning / Keyword Base de données de recherche not found in geonetwork.thesaurus.local.theme.odatis_thematiques.',
            'Warning / Keyword Dispositifs de surveillance not found in geonetwork.thesaurus.local.theme.odatis_thematiques.',
            'Warning / Keyword /Biologie marine/Bivalves not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biogéochimie marine/Pigments not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biogéochimie marine/Eléments chimiques et contaminants not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Habitats benthiques not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Organismes pathogènes not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Phytoplancton not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biogéochimie marine/Nutriments (sels nutritifs) not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biologie marine/Toxines not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            "Warning / Keyword /Physique de l'Océan/Turbidité not found in geonetwork.thesaurus.local.theme.odatis_variables.",
            'Warning / Keyword /Biologie marine/Matière en suspension not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Biogéochimie marine/Oxygène dissous not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            "Warning / Keyword /Physique de l'Océan/Salinité not found in geonetwork.thesaurus.local.theme.odatis_variables.",
            "Warning / Keyword /Physique de l'Océan/Température not found in geonetwork.thesaurus.local.theme.odatis_variables.",
            'Warning / Keyword /Biologie marine/Zooplancton not found in geonetwork.thesaurus.local.theme.odatis_variables.',
            'Warning / Keyword /Etat du Milieu/Biogéochimie not found in geonetwork.thesaurus.local.theme.simm.thematiques.',
            'Warning / Keyword /Etat du Milieu/Pollutions not found in geonetwork.thesaurus.local.theme.simm.thematiques.',
            "Warning / Field resourceTemporalDateRange /\n                Lower range bound '\n                  1974-01-01T00:00:00\n                  \n                ' can not be\n                greater than upper bound ''.\n                Date range not indexed.",
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
          ],
          th_areaNumber: '1',
          th_area: [{ default: 'National', langfre: 'National' }],
          'th_dcsmm-methodeNumber': '2',
          'th_dcsmm-methode': [
            { default: 'Observation directe', langfre: 'Observation directe' },
            {
              default: 'Observation par point',
              langfre: 'Observation par point',
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
          th_odatis_variablesNumber: '14',
          th_odatis_variables: [
            {
              default: '/Biologie marine/Bivalves',
              langfre: '/Biologie marine/Bivalves',
            },
            {
              default: '/Biogéochimie marine/Pigments',
              langfre: '/Biogéochimie marine/Pigments',
            },
            {
              default:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
              langfre:
                '/Biogéochimie marine/Eléments chimiques et contaminants',
            },
            {
              default: '/Biologie marine/Habitats benthiques',
              langfre: '/Biologie marine/Habitats benthiques',
            },
            {
              default: '/Biologie marine/Organismes pathogènes',
              langfre: '/Biologie marine/Organismes pathogènes',
            },
            {
              default: '/Biologie marine/Phytoplancton',
              langfre: '/Biologie marine/Phytoplancton',
            },
            {
              default: '/Biogéochimie marine/Nutriments (sels nutritifs)',
              langfre: '/Biogéochimie marine/Nutriments (sels nutritifs)',
            },
            {
              default: '/Biologie marine/Toxines',
              langfre: '/Biologie marine/Toxines',
            },
            {
              default: "/Physique de l'Océan/Turbidité",
              langfre: "/Physique de l'Océan/Turbidité",
            },
            {
              default: '/Biologie marine/Matière en suspension',
              langfre: '/Biologie marine/Matière en suspension',
            },
            {
              default: '/Biogéochimie marine/Oxygène dissous',
              langfre: '/Biogéochimie marine/Oxygène dissous',
            },
            {
              default: "/Physique de l'Océan/Salinité",
              langfre: "/Physique de l'Océan/Salinité",
            },
            {
              default: "/Physique de l'Océan/Température",
              langfre: "/Physique de l'Océan/Température",
            },
            {
              default: '/Biologie marine/Zooplancton',
              langfre: '/Biologie marine/Zooplancton',
            },
          ],
          th_thematiquesNumber: '2',
          th_thematiques: [
            {
              default: '/Etat du Milieu/Biogéochimie',
              langfre: '/Etat du Milieu/Biogéochimie',
            },
            {
              default: '/Etat du Milieu/Pollutions',
              langfre: '/Etat du Milieu/Pollutions',
            },
          ],
          allKeywords: {
            geonetworkthesauruslocalthemedcsmmdescripteur: {
              id: 'geonetwork.thesaurus.local.theme.dcsmm-descripteur',
              title: 'DCSMM : Descripteurs',
              theme: 'theme',
              link: '',
              keywords: [
                {
                  default: 'D5: Eutrophisation',
                  langfre: 'D5: Eutrophisation',
                },
                {
                  default: 'D4: Réseaux trophiques',
                  langfre: 'D4: Réseaux trophiques',
                },
                {
                  default: 'D8: Contaminants chimiques',
                  langfre: 'D8: Contaminants chimiques',
                },
                { default: 'D1: Biodiversité', langfre: 'D1: Biodiversité' },
                {
                  default: 'D2: Espèces non indigènes',
                  langfre: 'D2: Espèces non indigènes',
                },
                {
                  default: 'D7: Conditions hydrographiques',
                  langfre: 'D7: Conditions hydrographiques',
                },
                {
                  default: 'D9: Questions sanitaires',
                  langfre: 'D9: Questions sanitaires',
                },
                {
                  default: 'D10: Déchets marins',
                  langfre: 'D10: Déchets marins',
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
                  default: 'Observation directe',
                  langfre: 'Observation directe',
                },
                {
                  default: 'Observation par point',
                  langfre: 'Observation par point',
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
                  default: '/Biogéochimie marine/Pigments',
                  langfre: '/Biogéochimie marine/Pigments',
                },
                {
                  default:
                    '/Biogéochimie marine/Eléments chimiques et contaminants',
                  langfre:
                    '/Biogéochimie marine/Eléments chimiques et contaminants',
                },
                {
                  default: '/Biologie marine/Habitats benthiques',
                  langfre: '/Biologie marine/Habitats benthiques',
                },
                {
                  default: '/Biologie marine/Organismes pathogènes',
                  langfre: '/Biologie marine/Organismes pathogènes',
                },
                {
                  default: '/Biologie marine/Phytoplancton',
                  langfre: '/Biologie marine/Phytoplancton',
                },
                {
                  default: '/Biogéochimie marine/Nutriments (sels nutritifs)',
                  langfre: '/Biogéochimie marine/Nutriments (sels nutritifs)',
                },
                {
                  default: '/Biologie marine/Toxines',
                  langfre: '/Biologie marine/Toxines',
                },
                {
                  default: "/Physique de l'Océan/Turbidité",
                  langfre: "/Physique de l'Océan/Turbidité",
                },
                {
                  default: '/Biologie marine/Matière en suspension',
                  langfre: '/Biologie marine/Matière en suspension',
                },
                {
                  default: '/Biogéochimie marine/Oxygène dissous',
                  langfre: '/Biogéochimie marine/Oxygène dissous',
                },
                {
                  default: "/Physique de l'Océan/Salinité",
                  langfre: "/Physique de l'Océan/Salinité",
                },
                {
                  default: "/Physique de l'Océan/Température",
                  langfre: "/Physique de l'Océan/Température",
                },
                {
                  default: '/Biologie marine/Zooplancton',
                  langfre: '/Biologie marine/Zooplancton',
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
                { default: 'Surveillance', langfre: 'Surveillance' },
                { default: 'Environnement', langfre: 'Environnement' },
                { default: 'Littoral', langfre: 'Littoral' },
                { default: 'Quadrige', langfre: 'Quadrige' },
                { default: 'DCE', langfre: 'DCE' },
                { default: 'DCSMM', langfre: 'DCSMM' },
                { default: 'OSPAR', langfre: 'OSPAR' },
                { default: 'MEDPOL', langfre: 'MEDPOL' },
              ],
            },
          },
          cl_topic: [{ key: 'oceans', default: 'Océans', langfre: 'Océans' }],
          resolutionScaleDenominator: ['5000'],
          MD_LegalConstraintsOtherConstraintsObject: [
            {
              default:
                'Proposition de citation : "Quadrige (2019). Surval - Données par paramètre. Ifremer. https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea", la date du téléchargement des données, la liste des programmes dont les données sont utilisées.',
              langfre:
                'Proposition de citation : "Quadrige (2019). Surval - Données par paramètre. Ifremer. https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea", la date du téléchargement des données, la liste des programmes dont les données sont utilisées.',
            },
          ],
          MD_LegalConstraintsUseLimitationObject: [
            {
              default:
                'Données sous Licence ouverte / Open licence : http://www.etalab.gouv.fr/pages/licence-ouverte-open-licence-5899923.html',
              langfre:
                'Données sous Licence ouverte / Open licence : http://www.etalab.gouv.fr/pages/licence-ouverte-open-licence-5899923.html',
            },
          ],
          licenseObject: {
            default:
              'Proposition de citation : "Quadrige (2019). Surval - Données par paramètre. Ifremer. https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea", la date du téléchargement des données, la liste des programmes dont les données sont utilisées.',
            langfre:
              'Proposition de citation : "Quadrige (2019). Surval - Données par paramètre. Ifremer. https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea", la date du téléchargement des données, la liste des programmes dont les données sont utilisées.',
          },
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
          coordinateSystem: ['WGS 84 (EPSG:4326)'],
          crsDetails: [
            {
              code: 'WGS 84 (EPSG:4326)',
              codeSpace: 'EPSG',
              name: '',
              url: '',
            },
          ],
          specificationConformance: {
            title: 'Inspire specifications',
            date: '2012-01-16',
            explanation: 'Non évalué',
            pass: 'false',
          },
          lineageObject: {
            default:
              'Les données sont bancarisées dans la base de données Quadrige.',
            langfre:
              'Les données sont bancarisées dans la base de données Quadrige.',
          },
          format: [''],
          linkUrl: [
            'http://envlit.ifremer.fr/resultats/quadrige',
            'http://envlit.ifremer.fr/surveillance/presentation',
            'http://archimer.ifremer.fr/doc/00409/52016/',
            'https://www.ifremer.fr/services/wms/surveillance_littorale',
            'https://www.ifremer.fr/services/wfs/surveillance_littorale',
            'https://www.ifremer.fr/services/wps/surval',
            'https://www.ifremer.fr/services/wms/surveillance_littorale',
            'https://www.ifremer.fr/services/wfs/surveillance_littorale',
            'https://www.ifremer.fr/services/wps/surval',
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
            'WWW:LINK-1.0-http--metadata-URL',
          ],
          linkUrlProtocolWWWLINK: [
            'http://envlit.ifremer.fr/resultats/quadrige',
            'http://archimer.ifremer.fr/doc/00409/52016/',
          ],
          link: [
            {
              protocol: 'WWW:LINK',
              url: 'http://envlit.ifremer.fr/resultats/quadrige',
              name: 'La base de données Quadrige',
              description: '',
              function: '',
              applicationProfile: '',
              group: 0,
            },
            {
              protocol: 'WWW:LINK-1.0-http--link',
              url: 'http://envlit.ifremer.fr/surveillance/presentation',
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
              url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
              name: 'surval_parametre_point',
              description: 'Lieu de surveillance (point)',
              function: '',
              applicationProfile: '',
              group: 2,
            },
            {
              protocol: 'OGC:WFS',
              url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
              name: 'surval_parametre_point',
              description: 'Lieu de surveillance (point)',
              function: '',
              applicationProfile:
                '{ "tokenizedFields":{ "PROGRAMME":";", "PARAMETRE":";", "SUPPORT_NIVEAUPRELEVEMENT":";" }, "fields":[ { "name":"PROGRAMME", "label":{ "fr":"Programme de suivi", "en":"Programme de suivi" } },{ "name":"PARAMETRE", "label":{ "fr":"Paramètre", "en":"Paramètre" } },{ "name": "range_Date", "type": "rangeDate", "minField": "DATEMIN", "maxField": "DATEMAX", "label":{ "fr":"Date", "en":"Date" }, "display": "graph" },{ "name":"QUADRIGE_ZONEMARINE", "label":{ "fr":"Zone marine Quadrige", "en":"Zone marine Quadrige" } },{ "name":"DCSMM_SOUS_REGION", "label":{ "fr":"Sous-région marine DCSMM", "en":"Sous-région marine DCSMM" } },{ "name":"DCE_MASSE_EAU", "label":{ "fr":"Masse d’eau DCE", "en":"Masse d’eau DCE" } },{ "name":"SUPPORT_NIVEAUPRELEVEMENT", "label":{ "fr":"Support d’analyse et niveau de prélèvement", "en":"Support d’analyse et niveau de prélèvement" } },{ "name":"LIEU_LIBELLE", "label":{ "fr":"Lieu", "en":"Lieu" } },{ "name":"GRAPHES", "hidden": true, "suffix":"&from=${filtre_range_Date.from}&to=${filtre_range_Date.to}&typeParam=${filtre_PARAMETRE}&support=${filtre_SUPPORT_NIVEAUPRELEVEMENT}" } ], "treeFields": [ "PARAMETRE" ]}',
              group: 2,
            },
            {
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps/surval',
              name: 'r:survalextraction',
              description: "Extraction des données d'observation",
              function: '',
              applicationProfile:
                '{\n                               "inputs":[\n                                  {\n                                     "identifier":"produit_id",\n                                     "defaultValue":"30140",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"programme_suivi",\n                                     "linkedWfsFilter":"PROGRAMME",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"parametres",\n                                     "linkedWfsFilter":"PARAMETRE",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"date_min",\n                                     "linkedWfsFilter":"range_Date.from",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"date_max",\n                                     "linkedWfsFilter":"range_Date.to",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"zone_marine_quadrige",\n                                     "linkedWfsFilter":"QUADRIGE_ZONEMARINE",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"sous_region_marine_dcsmm",\n                                     "linkedWfsFilter":"DCSMM_SOUS_REGION",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"masse_eau_dce",\n                                     "linkedWfsFilter":"DCE_MASSE_EAU",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"supports_niveaux_prelevement",\n                                     "linkedWfsFilter":"SUPPORT_NIVEAUPRELEVEMENT",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"entity_id",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"entity_label",\n                                     "linkedWfsFilter":"LIEU_LIBELLE",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"limits",\n                                     "linkedWfsFilter":"geometry",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"geometry_type",\n                                     "defaultValue":"POINT",\n                            \t\t "hidden": true\n                                  }                \n                               ]\n                            }',
              group: 2,
            },
            {
              protocol: 'OGC:WMS',
              url: 'https://www.ifremer.fr/services/wms/surveillance_littorale',
              name: 'surval_parametre_polygone',
              description: 'Lieu de surveillance (polygone)',
              function: '',
              applicationProfile: '',
              group: 3,
            },
            {
              protocol: 'OGC:WFS',
              url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
              name: 'surval_parametre_polygone',
              description: 'Lieu de surveillance (polygone)',
              function: '',
              applicationProfile:
                '{ "tokenizedFields":{ "PROGRAMME":";", "PARAMETRE":";", "SUPPORT_NIVEAUPRELEVEMENT":";" }, "fields":[ { "name":"PROGRAMME", "label":{ "fr":"Programme de suivi", "en":"Programme de suivi" } },{ "name":"PARAMETRE", "label":{ "fr":"Paramètre", "en":"Paramètre" } },{ "name": "range_Date", "type": "rangeDate", "minField": "DATEMIN", "maxField": "DATEMAX", "label":{ "fr":"Date", "en":"Date" }, "display": "graph" },{ "name":"QUADRIGE_ZONEMARINE", "label":{ "fr":"Zone marine Quadrige", "en":"Zone marine Quadrige" } },{ "name":"DCSMM_SOUS_REGION", "label":{ "fr":"Sous-région marine DCSMM", "en":"Sous-région marine DCSMM" } },{ "name":"DCE_MASSE_EAU", "label":{ "fr":"Masse d’eau DCE", "en":"Masse d’eau DCE" } },{ "name":"SUPPORT_NIVEAUPRELEVEMENT", "label":{ "fr":"Support d’analyse et niveau de prélèvement", "en":"Support d’analyse et niveau de prélèvement" } },{ "name":"LIEU_LIBELLE", "label":{ "fr":"Lieu", "en":"Lieu" } },{ "name":"GRAPHES", "hidden": true, "suffix":"&from=${filtre_range_Date.from}&to=${filtre_range_Date.to}&typeParam=${filtre_PARAMETRE}&support=${filtre_SUPPORT_NIVEAUPRELEVEMENT}" } ], "treeFields": [ "PARAMETRE" ]}',
              group: 3,
            },
            {
              protocol: 'OGC:WPS',
              url: 'https://www.ifremer.fr/services/wps/surval',
              name: 'r:survalextraction',
              description: "Extraction des données d'observation",
              function: '',
              applicationProfile:
                '{\n                               "inputs":[\n                                  {\n                                     "identifier":"produit_id",\n                                     "defaultValue":"30140",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"programme_suivi",\n                                     "linkedWfsFilter":"PROGRAMME",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"parametres",\n                                     "linkedWfsFilter":"PARAMETRE",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"date_min",\n                                     "linkedWfsFilter":"range_Date.from",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"date_max",\n                                     "linkedWfsFilter":"range_Date.to",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"zone_marine_quadrige",\n                                     "linkedWfsFilter":"QUADRIGE_ZONEMARINE",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"sous_region_marine_dcsmm",\n                                     "linkedWfsFilter":"DCSMM_SOUS_REGION",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"masse_eau_dce",\n                                     "linkedWfsFilter":"DCE_MASSE_EAU",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"supports_niveaux_prelevement",\n                                     "linkedWfsFilter":"SUPPORT_NIVEAUPRELEVEMENT",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"entity_id",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"entity_label",\n                                     "linkedWfsFilter":"LIEU_LIBELLE",\n                                     "hidden":true,\n                                     "tokenizeWfsFilterValues":true,\n                                     "wfsFilterValuesDelimiter":";"\n                                  },\n                                  {\n                                     "identifier":"limits",\n                                     "linkedWfsFilter":"geometry",\n                                     "hidden":true\n                                  },\n                                  {\n                                     "identifier":"geometry_type",\n                                     "defaultValue":"AREA",\n                            \t\t "hidden": true\n                                  }       \n                               ]\n                            }',
              group: 3,
            },
            {
              protocol: 'WWW:LINK-1.0-http--metadata-URL',
              url: 'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
              name: 'DOI du jeu de données',
              description: 'DOI du jeu de données',
              function: '',
              applicationProfile: '',
              group: 4,
            },
          ],
          linkUrlProtocolWWWLINK10httplink:
            'http://envlit.ifremer.fr/surveillance/presentation',
          linkUrlProtocolOGCWMS: [
            'https://www.ifremer.fr/services/wms/surveillance_littorale',
            'https://www.ifremer.fr/services/wms/surveillance_littorale',
          ],
          linkUrlProtocolOGCWFS: [
            'https://www.ifremer.fr/services/wfs/surveillance_littorale',
            'https://www.ifremer.fr/services/wfs/surveillance_littorale',
          ],
          linkUrlProtocolOGCWPS: [
            'https://www.ifremer.fr/services/wps/surval',
            'https://www.ifremer.fr/services/wps/surval',
          ],
          linkUrlProtocolWWWLINK10httpmetadataURL:
            'https://doi.org/10.12770/cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          recordGroup: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          isPublishedToAll: 'true',
          recordOwner: 'admin admin',
          uuid: 'cf5048f6-5bbf-4e44-ba74-e6f429af51ea',
          displayOrder: '0',
          popularity: '15',
          userinfo: 'admin|admin|admin|Administrator',
          record: 'record',
          draft: 'n',
          changeDate: '2021-04-01T17:38:51.895Z',
          id: '10420',
          createDate: '2021-03-31T12:17:38.105Z',
          owner: '1',
          groupOwner: '2',
          logo: '/images/logos/cea9bf9f-329a-4583-9092-2dfc7efdcce2.png',
          hasxlinks: 'false',
          groupPublished: ['all', 'sample'],
          featureOfRecord: 'record',
          extra: 'null',
          documentStandard: 'iso19139',
          valid: '-1',
          isTemplate: 'n',
          feedbackCount: '0',
          rating: '0',
          isHarvested: 'false',
          sourceCatalogue: 'cea9bf9f-329a-4583-9092-2dfc7efdcce2',
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
}
