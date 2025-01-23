import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'

export const GEO2FRANCE_REUSE_ONGULES_RECORD: ReuseRecord = {
  uniqueIdentifier: '7eb795c2-d612-4b5e-b15e-d985b0f4e697',
  kind: 'reuse',
  otherLanguages: [],
  defaultLanguage: 'fr',
  recordUpdated: new Date('2024-09-26T13:34:25.803Z'),
  resourceCreated: new Date('2024-05-27T00:00:00.000Z'),
  title: 'Carte dynamique sur la répartition des ongulés sauvages en France',
  abstract:
    "----------------------------\nContexte & objectifs\n----------------------------\n\nDans le cadre de ses missions, l’OFB (anciennement l’ONC puis l’ONCFS) réalise le suivi des populations de grands ongulés sauvages en France métropolitaine. \nPour réaliser cette tâche complexe un réseau de correspondants départementaux, l’actuel réseau « Ongulés sauvages OFB-FNC-FDC » a été créée en 1985, et fonctionne grâce à la collaboration entre l’OFB et les fédérations nationale (FNC) et départementales des chasseurs (FDC). \n\nLes données ont été compilées à partir des données fournies par les Interlocuteurs techniques des FDC du Réseau Ongulés sauvages OFB-FNC-FDC pour toutes les espèces d'ongulés sauvages présentes en France métropolitaine.\n\n----------------------------\nLes espèces concernées\n----------------------------\n\nLes espèces concernées sont les suivantes : \nBouquetin des Alpes (Capra ibex)\nBouquetin ibérique (Capra pyrenaica)\nCerf élaphe (Cervus elaphus)\nCerf sika (Cervus nippon)\nChamois (Rupicapra rupicapra)\nDaim (Dama dama)\nIsard (Rupicapra pyrenaica)\nMouflon de Corse (Ovis gmelinii musimon)\nMouflon méditerranéen (Ovis gmelini musimon x Ovis sp.)\nMuntjac de Chine (Muntiacus reevesi)\net le Mouflon à manchettes (Ammotragus lervia).\n\n----------------------------\nProtocole et limites d'utilisations \n----------------------------\nLa méthode se basant sur des connaissances locales de la présence de populations établies par des professionnels connaissant bien leur territoire, la notion d’échantillonnage qualifiée d’\"exhaustif\" est crédible.\nLe travail est réalisé par unité de population, c’est-à-dire par secteur occupé par au minimum un groupe d’individus adultes susceptibles de se rencontrer et d’établir entre eux des rapports sociaux et génétiques (reproduction). Il peut donc exister des individus isolés présents en dehors des zones délimitées par ce programme.\nPour des raisons administratives l’inventaire est fait par département. Ainsi pour une population à cheval sur plusieurs départements chaque portion départementale constitue une zone. Un département peut abriter plusieurs zones. \nLes données sont vérifiées, harmonisées et validées par l’administrateur(rice) national(e) du réseau tous les 5 ans (avec un rythme différents selon les espèces).\n\n----------------------------\nFréquence de mise à jour\n----------------------------\n\npériodique \n\n----------------------------\nOutils\n----------------------------\n\nLes données de chacune de ces espèces sont consultables sur la carte interactive de l'espèce. créées à partir de l'outil Lizmap.",
  ownerOrganization: {
    name: 'Office français de la biodiversité',
    translations: {},
  },
  contacts: [
    {
      email: 'cartotheque@ofb.gouv.fr',
      role: 'point_of_contact',
      organization: {
        name: 'Office français de la biodiversité',
        translations: {},
      },
    },
  ],
  contactsForResource: [
    {
      email: 'reseau.ongules-sauvages@ofb.gouv.fr',
      role: 'author',
      organization: {
        name: 'Réseau Ongulés sauvages OFB-FNC-FDC',
        translations: {},
      },
    },
    {
      email: 'reseau.ongules-sauvages@ofb.gouv.fr',
      role: 'owner',
      organization: {
        name: 'Office France de la Biodiversité',
        translations: {},
      },
    },
    {
      email: '',
      role: 'owner',
      organization: {
        name: 'Fédération Nationale de la Chasse',
        translations: {},
      },
    },
    {
      email: '',
      role: 'resource_provider',
      organization: {
        name: 'Fédération Départementale de la Chasse',
        translations: {},
      },
    },
  ],
  keywords: [
    {
      label: 'Tableaux de chasse',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Ongulés',
      type: 'theme',
      translations: {},
    },
    {
      label: 'Départements',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.excel2skos-case-usage-thematique-2023-06-08',
        name: 'Thématique OFB',
        url: new URL(
          'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-thematique-2023-06-08'
        ),
      },
      label: 'réseaux',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.excel2skos-case-usage-thematique-2023-06-08',
        name: 'Thématique OFB',
        url: new URL(
          'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-thematique-2023-06-08'
        ),
      },
      label: 'espèces',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.excel2skos-case-usage-geographie-2023-11-24',
        name: 'Thesaurus géographique',
        url: new URL(
          'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.excel2skos-case-usage-geographie-2023-11-24'
        ),
      },
      label: 'France métropolitaine',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      label: 'espèce animale',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.gemet',
        name: 'GEMET',
        url: new URL(
          'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.gemet'
        ),
      },
      label: 'chasse',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL(
          'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
        ),
      },
      label: 'Répartition des espèces',
      type: 'theme',
      translations: {},
    },
    {
      thesaurus: {
        id: 'geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme',
        name: 'GEMET - INSPIRE themes, version 1.0',
        url: new URL(
          'https://data.ofb.fr/catalogue/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme'
        ),
      },
      label: 'Unités administratives',
      type: 'theme',
      translations: {},
    },
  ],
  topics: [],
  licenses: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  overviews: [
    {
      url: new URL(
        'https://data.ofb.fr/catalogue/Donnees-geographiques-OFB/api/records/7eb795c2-d612-4b5e-b15e-d985b0f4e697/attachments/OFB.png'
      ),
    },
  ],
  spatialExtents: [
    {
      bbox: [-7.3131, 40.4671, 11.9303, 51.7141],
      translations: {},
    },
  ],
  onlineResources: [
    {
      type: 'link',
      name: 'Carte dynamique de répartition du Cerf élaphe',
      url: new URL(
        'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=reseau_cerf_lizmap'
      ),
      translations: {},
    },
    {
      type: 'link',
      name: 'Carte dynamique de répartition du Mouflon méditerranéen',
      url: new URL(
        'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOM'
      ),
      translations: {},
    },
    {
      type: 'link',
      name: 'Carte dynamique de répartition du Mouflon de Corse',
      url: new URL(
        'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_MOC'
      ),
      translations: {},
    },
    {
      type: 'link',
      name: "Carte dynamique de répartition de l'ISARD",
      url: new URL(
        'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_ISA'
      ),
      translations: {},
    },
    {
      type: 'link',
      name: 'Carte dynamique de répartition du Chamois',
      url: new URL(
        'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_CHA'
      ),
      translations: {},
    },
    {
      type: 'link',
      name: 'Carte dynamique de répartition du Bouquetin des Alpes',
      url: new URL(
        'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOQ'
      ),
      translations: {},
    },
    {
      type: 'link',
      name: 'Carte dynamique de répartition du Bouquetin ibérique',
      url: new URL(
        'https://lizmap.ofb.fr/ofb/reseau_ongules/index.php/view/map?repository=repartition&project=ongules_2022_BOI'
      ),
      translations: {},
    },
  ],
  translations: {},
  lineage: null,
  temporalExtents: [
    {
      start: null,
    },
  ],
  reuseType: 'map',
}
