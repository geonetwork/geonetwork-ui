import { parseCsv } from './csv'

describe('parseCsv', () => {
  describe('valid CSV with id', () => {
    it('returns a parsed object', () => {
      expect(
        parseCsv(`OBJID,DEP_NOM,DEP_NUM,FRANCE,FACADE,TYPE,TRANSITION,COMMUNE,POINT,LONG,LAT,QEB_2013,QEB_2014,QEB_2015,QEB_2016,QEB_2017,QEB_2018,QEB_2019,QEB_2020
"1",AIN,"01",Métropole,Métropole,douce,,ANGLEFORT,PLAN D'EAU D'ANGLEFORT,,,,,,,,,5N,5N`)
      ).toEqual([
        {
          geometry: null,
          id: '1',
          properties: {
            COMMUNE: 'ANGLEFORT',
            DEP_NOM: 'AIN',
            DEP_NUM: '01',
            FACADE: 'Métropole',
            FRANCE: 'Métropole',
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
          },
          type: 'Feature',
        },
      ])
    })
  })
  describe('valid CSV without id', () => {
    it('returns a parsed object', () => {
      expect(
        parseCsv(`object;code_epci;nom_epci;code_dep;nom_dep;code_region;nom_region;st_area(shape);st_perimeter(shape);geo_point_2d
25;200017341;CC Lodévois et Larzac;34;HERAULT;76;OCCITANIE;554841824.0549872;125726.64842881361;43.7929180957,3.37305747018
`)
      ).toEqual([
        {
          geometry: null,
          properties: {
            code_dep: '34',
            code_epci: '200017341',
            code_region: '76',
            geo_point_2d: '43.7929180957,3.37305747018',
            nom_dep: 'HERAULT',
            nom_epci: 'CC Lodévois et Larzac',
            nom_region: 'OCCITANIE',
            object: '25',
            'st_area(shape)': '554841824.0549872',
            'st_perimeter(shape)': '125726.64842881361',
          },
          type: 'Feature',
        },
      ])
    })
  })
  describe('invalid CSV', () => {
    it('throws a relevant error', () => {
      expect(() =>
        parseCsv(`Passage : Commentaire;Lieu de surveillance : Identifiant;Lieu de surveillance : Mnémonique;Lieu de surveillance : Libellé;Passage : Date;Coordonnées passage : Coordonnées minx;Coordonnées passage : Coordonnées maxx;Coordonnées passage : Coordonnées miny;Coordonnées passage : Coordonnées maxy;Coordonnées passage : Coordonnées redéfinies;Prélèvement : Commentaire;Libellé de l'engin de prélévement;Prélèvement : Niveau;Prélèvement : Immersion;Prélèvement : Immersion Min;Prélèvement : Immersion Max;Prélèvement : Symbole de l'unité d'immersion;Prélèvement : Unité d'immersion;Echantillon : Commentaire;Echantillon : Identifiant interne;Echantillon : Libellé du support;Echantillon : Libellé du taxon support;Résultat : Code paramètre;Résultat : Libellé paramètre;Résultat : Libellé support;Résultat : Libellé fraction;Résultat : Libellé méthode;Résultat : Libellé précision;Résultat : Valeur de la mesure;Résultat : Valeur qualitative;Résultat : Symbole unité de mesure associé au quadruplet;Résultat : Libellé unité de mesure associé au quadruplet;Résultat : Commentaires;Résultat : Service analyste : Libellé;Passage : Date de validation;Passage : Date de qualification;Passage : Niveau de qualité;Passage : Commentaire de qualification;Prélèvement : Date de validation;Prélèvement : Date de qualification;Prélèvement : Niveau de qualité;Prélèvement : Commentaire de qualification;Echantillon : Date de validation;Echantillon : Date de qualification;Echantillon : Niveau de qualité;Echantillon : Commentaire de qualification;Résultat : Date de validation;Résultat : Date de qualification;Résultat : Niveau de qualité;Résultat : Commentaire de qualification;Prélèvement : Service préleveur : Code;Prélèvement : Service préleveur : Libellé
;1001104;"001-P-022;Oye plage;15/04/2008;1.99866073;1.99866073;51.00247775;51.00247775;0;;Main ;Emergé;0;;;m;Mètre;;5380212;Bivalve;Mytilus edulis;ASP;Toxines ASP;Bivalve;Chair totale égouttée;CL/UV toxines amnésiantes - mg/kg;;1.1;;mg.kg-1;Milligramme par kilogramme;;Laboratoire Environnement Ressources de Bretagne Occidentale;;;Non qualifié;;;;Non qualifié;;;;Non qualifié;;;;Non qualifié;;PDG-ODE-LITTORAL-LERBL;Laboratoire Environnement Ressources de Boulogne-sur-Mer
`)
      ).toThrowError('CSV parsing failed')
    })
  })
})
