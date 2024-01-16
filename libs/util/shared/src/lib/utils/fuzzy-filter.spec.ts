import { createFuzzyFilter } from './fuzzy-filter'

const TEST_CASES = [
  {
    value: `ARS / Agence régionale de santé`,
    matched: [
      'santé',
      'SANTE',
      'ars',
      'agence sante',
      'regio',
      'de',
      'de agenc',
      'de sant',
      '/',
      'gen',
      'gen sant',
    ],
    notMatched: ['régions'],
  },
  {
    value: `Université de l'Ingénierie`,
    matched: [
      'ingen',
      'univers',
      'ITE',
      'UNIV ingénierie',
      'l',
      'l de',
      'un',
      "l'ingen",
      'genie',
    ],
    notMatched: ['lingen'],
  },
  {
    value: `Direction de l'Action sociale (SPW - Intérieur et Action sociale - Département de l'Action sociale - Direction de l'Action sociale)`,
    matched: [
      'dir action',
      'spw',
      'social',
      "l'ac",
      'spw interieur',
      '(spw)',
      '(',
      '-',
    ],
    notMatched: ['lact', 'societe'],
  },
  {
    value: `Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département de la Géomatique - Direction de l'Intégration des géodonnées)`,
    matched: [
      'cart',
      'CARTO',
      'Spw',
      'digit',
      'géomatique',
      'geo',
      'donnee',
      'données',
    ],
    notMatched: ['carte', 'cartograph', 'digitale'],
  },
  {
    value: `Bundesamt für Raumentwicklung`,
    matched: ['fur', 'für', 'Amt'],
    notMatched: [],
  },
  {
    value: `Géo2France`,
    matched: ['france', 'geo', 'geo2fr'],
    notMatched: ['geofrance'],
  },
  {
    value: `atmo Hauts-de-France`,
    matched: ['ATMO', 'france', 'fr', 'haut'],
    notMatched: ['hautsdefrance'],
  },
  {
    value: `Métropole Européenne de Lille`,
    matched: ['europe', 'euro', 'en', 'métro'],
    notMatched: [],
  },
  {
    value: `Insee, RP exploitation complémentaire`,
    matched: ['compl'],
    notMatched: [],
  },
  {
    value: `Insee-DGFIP-Cnaf-Cnav-CCMSA, Fichier localisé social et fiscal`,
    matched: ['local', 'soci', 'INSEE', 'dgfip', 'ccmsa'],
    notMatched: [],
  },
  {
    value: `DDTM 29 (Direction Départementale des Territoires et de la Mer du Finistère)`,
    matched: ['ddtm', '29', 'mer', 'fin'],
    notMatched: ['finie', 'terre'],
  },
  { value: `SOeS, Sit@del2`, matched: ['soes'], notMatched: ['sitadel'] },
  {
    value: `Centre National des Œuvres Universitaires et Scolaires (CNOUS)`,
    matched: ['oeuvres', 'ŒUVRE', '(cnous)', 'cnous'],
    notMatched: [],
  },
  { value: `Bâle`, matched: ['bale', 'BALE', 'bâLE', 'bàle'], notMatched: [] },
  {
    value: `special chars are ignored`,
    matched: [';', '/', '!', ',.', '({#~|@`)'],
    notMatched: [],
  },
  {
    value: `line 1;
line 2`,
    matched: ['line', '1', '2', ';'],
    notMatched: ['0'],
  },
]

describe('createFuzzyFilter', () => {
  describe.each(TEST_CASES)(`For value "$value"`, (testCase) => {
    if (testCase.matched.length) {
      it.each(testCase.matched)('is matched by "%s"', (matched) => {
        const filter = createFuzzyFilter(matched)
        expect(filter(testCase.value)).toBe(true)
      })
    }
    if (testCase.notMatched.length) {
      it.each(testCase.notMatched)('is not matched by "%s"', (notMatched) => {
        const filter = createFuzzyFilter(notMatched)
        expect(filter(testCase.value)).toBe(false)
      })
    }
  })
})
