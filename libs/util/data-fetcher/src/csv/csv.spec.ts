import fs from 'fs/promises'
import path from 'path'
import fetchMock from 'fetch-mock-jest'
import { openCsv } from './csv'

describe('CSV utils', () => {
  beforeEach(() => {
    fetchMock.get(
      (url) => new URL(url).hostname === 'localfile',
      async (url) =>
        await fs.readFile(
          path.join(__dirname, '..', new URL(url).pathname),
          'utf8'
        )
    )
  })
  describe('openCsv', () => {
    describe('valid file (non geospatial data)', () => {
      it('returns the objects in the file', async () => {
        const csv = await openCsv('http://localfile/fixtures/rephytox.csv')
        expect(csv[0]).toEqual({
          'Coordonnées passage : Coordonnées maxx': '1.99866073',
          'Coordonnées passage : Coordonnées maxy': '51.00247775',
          'Coordonnées passage : Coordonnées minx': '1.99866073',
          'Coordonnées passage : Coordonnées miny': '51.00247775',
          'Coordonnées passage : Coordonnées redéfinies': '0',
          'Echantillon : Commentaire': '',
          'Echantillon : Commentaire de qualification': '',
          'Echantillon : Date de qualification': '',
          'Echantillon : Date de validation': '',
          'Echantillon : Identifiant interne': '5380212',
          'Echantillon : Libellé du support': 'Bivalve',
          'Echantillon : Libellé du taxon support': 'Mytilus edulis',
          'Echantillon : Niveau de qualité': 'Non qualifié',
          "Libellé de l'engin de prélévement": 'Main ',
          'Lieu de surveillance : Identifiant': '1001104',
          'Lieu de surveillance : Libellé': 'Oye plage',
          'Lieu de surveillance : Mnémonique': '001-P-022',
          'Passage : Commentaire': '',
          'Passage : Commentaire de qualification': '',
          'Passage : Date': '15/04/2008',
          'Passage : Date de qualification': '',
          'Passage : Date de validation': '',
          'Passage : Niveau de qualité': 'Non qualifié',
          'Prélèvement : Commentaire': '',
          'Prélèvement : Commentaire de qualification': '',
          'Prélèvement : Date de qualification': '',
          'Prélèvement : Date de validation': '',
          'Prélèvement : Immersion': '0',
          'Prélèvement : Immersion Max': '',
          'Prélèvement : Immersion Min': '',
          'Prélèvement : Niveau': 'Emergé',
          'Prélèvement : Niveau de qualité': 'Non qualifié',
          'Prélèvement : Service préleveur : Code': 'PDG-ODE-LITTORAL-LERBL',
          'Prélèvement : Service préleveur : Libellé':
            'Laboratoire Environnement Ressources de Boulogne-sur-Mer',
          "Prélèvement : Symbole de l'unité d'immersion": 'm',
          "Prélèvement : Unité d'immersion": 'Mètre',
          'Résultat : Code paramètre': 'ASP',
          'Résultat : Commentaire de qualification': '',
          'Résultat : Commentaires': '',
          'Résultat : Date de qualification': '',
          'Résultat : Date de validation': '',
          'Résultat : Libellé fraction': 'Chair totale égouttée',
          'Résultat : Libellé méthode': 'CL/UV toxines amnésiantes - mg/kg',
          'Résultat : Libellé paramètre': 'Toxines ASP',
          'Résultat : Libellé précision': '',
          'Résultat : Libellé support': 'Bivalve',
          'Résultat : Libellé unité de mesure associé au quadruplet':
            'Milligramme par kilogramme',
          'Résultat : Niveau de qualité': 'Non qualifié',
          'Résultat : Service analyste : Libellé':
            'Laboratoire Environnement Ressources de Bretagne Occidentale',
          'Résultat : Symbole unité de mesure associé au quadruplet': 'mg.kg-1',
          'Résultat : Valeur de la mesure': '1.1',
          'Résultat : Valeur qualitative': '',
        })
      })
    })
    describe('valid file (geospatial data)', () => {
      it('returns the objects in the file', async () => {
        const csv = await openCsv(
          'http://localfile/fixtures/eaux-baignades.csv'
        )
        expect(csv[0]).toEqual({
          COMMUNE: 'ANGLEFORT',
          DEP_NOM: 'AIN',
          DEP_NUM: '01',
          FACADE: 'Métropole',
          FRANCE: 'Métropole',
          ID: '1',
          LAT: '',
          LONG: '',
          POINT: "PLAN D'EAU D'ANGLEFORT",
          QEB_2013: '',
          QEB_2014: '',
          QEB_2015: '',
          QEB_2016: '',
          QEB_2017: '',
          QEB_2018: '',
          QEB_2019: '5N',
          QEB_2020: '5N',
          TRANSITION: '',
          TYPE: 'douce',
        })
      })
    })
    describe('file with error', () => {
      it('returns a rejected promise', () => {
        return expect(
          openCsv('http://localfile/fixtures/invalid.csv')
        ).rejects.toThrowError('CSV parsing failed')
      })
    })
  })
})
