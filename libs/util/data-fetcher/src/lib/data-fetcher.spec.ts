/**
 * @jest-environment jsdom
 */
import fetchMock from 'fetch-mock-jest'
import fs from 'fs'
import path from 'path'
import { readDataset } from './data-fetcher'
import { CsvReader } from './readers/csv'
import { GeojsonReader } from './readers/geojson'
import { sharedFetch, useCache, WfsEndpoint } from '@camptocamp/ogc-client'

jest.mock('@camptocamp/ogc-client', () => ({
  useCache: jest.fn(async (factory) =>
    JSON.parse(JSON.stringify(await factory()))
  ),
  sharedFetch: jest.fn((url) => global.fetch(url)),
  WfsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve(this)
    }
    getVersion() {
      return '2.0.0'
    }
    getFeatureTypes() {
      return [
        {
          name: 'ms:n_mat_eolien_p_r32',
          outputFormats: ['gml'],
          defaultCrs: 'EPSG:4326',
        },
      ]
    }
    getFeatureTypeSummary() {
      return {
        name: 'ms:n_mat_eolien_p_r32',
        outputFormats: ['gml'],
        defaultCrs: 'EPSG:4326',
      }
    }
    getFeatureUrl() {
      return this.url
    }
    getFeatureTypeFull() {
      return Promise.resolve({
        objectCount: 442,
      })
    }
    supportsJson() {
      return false
    }
    supportsStartIndex() {
      return true
    }
  },
}))

describe('data-fetcher', () => {
  beforeEach(() => {
    // this is used to make the HTTP requests pointing at http://localfile
    // to read the fixture files by name and set the correct content type
    fetchMock.get(
      (url) => new URL(url).hostname === 'localfile',
      async (url) => {
        const filePath = path.join(__dirname, '..', new URL(url).pathname)
        let body
        const fileExt = path.extname(filePath)
        const noHeader = url.toLowerCase().indexOf('noheader') > -1
        let contentType
        switch (fileExt) {
          case '.csv':
            body = fs.readFileSync(filePath, { encoding: 'utf8' }) // as string
            contentType = 'text/csv'
            break
          case '.json':
            body = fs.readFileSync(filePath, { encoding: 'utf8' }) // as string
            contentType = 'application/json'
            break
          case '.geojson':
            body = fs.readFileSync(filePath, { encoding: 'utf8' }) // as string
            contentType = 'application/geo+json'
            break
          case '.xls':
            body = fs.readFileSync(filePath, null) // as arraybuffer
            contentType = 'application/vnd.ms-excel'
            break
          case '.xlsx':
            body = fs.readFileSync(filePath, null) // as arraybuffer
            contentType =
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            break
          case '.xml':
            body = fs.readFileSync(filePath, null) // as arraybuffer
            contentType = 'text/xml; subtype="gml/3.2.1";charset=UTF-8'
            break
        }
        return {
          body,
          status: 200,
          headers: noHeader
            ? undefined
            : {
                'Content-Type': contentType,
              },
        }
      },
      {
        sendAsJson: false,
      }
    )
    jest.spyOn(CsvReader.prototype, 'read')
    jest.spyOn(GeojsonReader.prototype, 'read')
  })
  afterEach(() => {
    fetchMock.reset()
    jest.clearAllMocks()
  })
  describe('readDataset', () => {
    describe('network error occurs', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => {
            throw new Error('random network problem')
          }
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          info: expect.stringContaining('random network problem'),
          type: 'network',
          httpStatus: 0,
        })
      })
    })
    describe('HTTP error code received', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({ body: 'something went wrong', status: 403 })
        )
      })
      it('throws a relevant error', () => {
        return expect(
          readDataset('http://bla/abcd.json')
        ).rejects.toMatchObject({
          httpStatus: 403,
        })
      })
    })
    describe('Mime type is not recognized', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({
            body: 'some data in an unsupported format',
            status: 200,
            headers: {
              'Content-Type': 'application/unsupported',
            },
          })
        )
      })
      it('throws a relevant error', () => {
        return expect(readDataset('http://bla/abcd')).rejects.toMatchObject({
          httpStatus: 0,
          info: 'application/unsupported',
          type: 'unsupportedType',
        })
      })
    })
    describe('Mime type is absent', () => {
      beforeEach(() => {
        fetchMock.get(
          () => true,
          () => ({
            status: 200,
          })
        )
      })
      it('throws a relevant error', () => {
        return expect(readDataset('http://bla/abcd.gif')).rejects.toMatchObject(
          {
            type: expect.stringContaining('unknown'),
          }
        )
      })
    })
    describe('CSV file (non geospatial data)', () => {
      it('returns the objects in the file', async () => {
        const csv = await readDataset('http://localfile/fixtures/rephytox.csv')
        expect(csv[0]).toEqual({
          geometry: null,
          properties: {
            'Coordonnées passage : Coordonnées maxx': 1.99866073,
            'Coordonnées passage : Coordonnées maxy': 51.00247775,
            'Coordonnées passage : Coordonnées minx': 1.99866073,
            'Coordonnées passage : Coordonnées miny': 51.00247775,
            'Coordonnées passage : Coordonnées redéfinies': 0,
            'Echantillon : Commentaire': '',
            'Echantillon : Commentaire de qualification': '',
            'Echantillon : Date de qualification': '',
            'Echantillon : Date de validation': null,
            'Echantillon : Identifiant interne': 5380212,
            'Echantillon : Libellé du support': 'Bivalve',
            'Echantillon : Libellé du taxon support': 'Mytilus edulis',
            'Echantillon : Niveau de qualité': 'Non qualifié',
            "Libellé de l'engin de prélévement": 'Main ',
            'Lieu de surveillance : Identifiant': 1001104,
            'Lieu de surveillance : Libellé': 'Oye plage',
            'Lieu de surveillance : Mnémonique': '001-P-022',
            'Passage : Commentaire': '',
            'Passage : Commentaire de qualification': '',
            'Passage : Date': new Date('2008-04-15T00:00'),
            'Passage : Date de qualification': '',
            'Passage : Date de validation': null,
            'Passage : Niveau de qualité': 'Non qualifié',
            'Prélèvement : Commentaire': '',
            'Prélèvement : Commentaire de qualification': '',
            'Prélèvement : Date de qualification': '',
            'Prélèvement : Date de validation': null,
            'Prélèvement : Immersion': 0,
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
            'Résultat : Date de validation': null,
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
            'Résultat : Symbole unité de mesure associé au quadruplet':
              'mg.kg-1',
            'Résultat : Valeur de la mesure': 1.1,
            'Résultat : Valeur qualitative': '',
          },
          type: 'Feature',
        })
      })
    })
    describe('CSV file  (geospatial data)', () => {
      it('returns the objects in the file', async () => {
        const csv = await readDataset(
          'http://localfile/fixtures/eaux-baignades.csv'
        )
        expect(csv[0]).toEqual({
          geometry: null,
          id: '1',
          properties: {
            COMMUNE: 'ANGLEFORT',
            DEP_NOM: 'AIN',
            DEP_NUM: 1,
            FACADE: 'Métropole',
            FRANCE: 'Métropole',
            LAT: null,
            LONG: null,
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
        })
      })
    })
    describe('CSV file (geospatial data, polygons)', () => {
      it('returns the objects in the file', async () => {
        const csv = await readDataset(
          'http://localfile/fixtures/n_tri_lill_inondable_s_059.csv'
        )
        expect(csv[0]).toEqual({
          geometry: null,
          properties: {
            datentree: '2014/04/28',
            datsortie: '',
            est_ref: 'T',
            geo_point_2d: '50.6707388795,3.12919014364',
            geo_shape:
              '{"type": "Polygon", "coordinates": [[[3.130236575335796, 50.67090491119582], [3.130196047181812, 50.670893754384174], [3.130125439956143, 50.67088756464525], [3.130060708753599, 50.67086021750229], [3.130054727309224, 50.670857038069045], [3.129984041095332, 50.67082032848472], [3.129973127038841, 50.670815458161684], [3.129913382013352, 50.670804967468996], [3.129842767795712, 50.670796013649756], [3.129772104845962, 50.67077912701344], [3.129737218571207, 50.67077082679582], [3.129701483522717, 50.670767400220804], [3.129630838418297, 50.67075738740604], [3.129560202839928, 50.67074011474696], [3.12952761792054, 50.670726176531744], [3.12948954526489, 50.67071429902424], [3.129418896435583, 50.67070279644338], [3.129354364974042, 50.67068147910331], [3.129348248238403, 50.67068057014457], [3.129277605476768, 50.670671391687776], [3.129206964156518, 50.67065179462064], [3.129169858009355, 50.6706368200518], [3.129136288853051, 50.670629945127125], [3.129065684737461, 50.670624768819], [3.128995011837286, 50.670609308579806], [3.128966316281854, 50.670592153560484], [3.128924340373513, 50.67057790187465], [3.128853691981017, 50.670566443838936], [3.128824779915709, 50.67054743143591], [3.128783029049124, 50.670538303502305], [3.128712354136129, 50.6705164717115], [3.12868056080572, 50.67050270295193], [3.128641707043342, 50.67049445140144], [3.12857109024058, 50.670495251369246], [3.128500491704133, 50.67049215665287], [3.128429889593509, 50.67048766198871], [3.12835926556623, 50.67048563509952], [3.128288709820203, 50.670499267364384], [3.128275587191795, 50.67050312169485], [3.128218178439842, 50.67053350338606], [3.128167295579174, 50.67054811136943], [3.128147653457073, 50.670559223232864], [3.128077100972724, 50.67059079397759], [3.128073096444349, 50.67059307744774], [3.128070443278575, 50.67063795810101], [3.128077229717219, 50.670641235512576], [3.128147891402413, 50.670652397839696], [3.128218487505666, 50.670654460772724], [3.128289102312713, 50.67065279055033], [3.128359682859011, 50.670648769190585], [3.128430305531155, 50.670650176889275], [3.128500899000195, 50.670651207678894], [3.128571488264486, 50.67065059622947], [3.128642121274498, 50.670656033028116], [3.128701270507386, 50.670682157290244], [3.128712786687018, 50.67068510671143], [3.128783433947726, 50.67069607126823], [3.128854051799123, 50.670706569178236], [3.12891010772934, 50.670726818716055], [3.128924729508478, 50.67072936107498], [3.128995355948543, 50.67074317022289], [3.129050063126999, 50.67077154237412], [3.129066072568328, 50.670775554976096], [3.129136689505304, 50.670785630957376], [3.129200468336664, 50.670816263980264], [3.129207394627525, 50.67081897583537], [3.129278022612412, 50.670833305298984], [3.129346609199469, 50.67086096291947], [3.129348714109228, 50.67086130173213], [3.129419329881256, 50.67087085707333], [3.129490003817872, 50.67089199747086], [3.129517575152819, 50.670905662731315], [3.129560669914921, 50.670921016819186], [3.129631330715412, 50.6709479542136], [3.129635728709819, 50.67095040844225], [3.12970200260002, 50.67096822403337], [3.129768060034338, 50.67099514820583], [3.129772666350974, 50.670996247170486], [3.129843333855963, 50.67101477599904], [3.129913942364241, 50.67102140561133], [3.1299845266682382, 50.671007781378414], [3.130016689349797, 50.67099488829572], [3.130055027756231, 50.6709729611134], [3.130125678550235, 50.67097957261391], [3.130196259176135, 50.67097546047528], [3.130230775074116, 50.67094978620116], [3.130236575335796, 50.67090491119582]]]}',
            id_s_inond: 'SIN_1',
            id_tri: 'FRA_TRI_LILL',
            scenario: '01For',
            typ_inond: 1,
          },
          type: 'Feature',
        })
      })
    })
    describe('JSON file (geospatial data)', () => {
      it('returns the objects in the file', async () => {
        const json = await readDataset(
          'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.json'
        )
        expect(json[0]).toEqual({
          geometry: null,
          id: 25,
          properties: {
            code_dep: '34',
            code_epci: 200017341,
            code_region: '76',
            geo_point_2d: [43.7929180957, 3.37305747018],
            nom_dep: 'HERAULT',
            nom_epci: 'CC Lodévois et Larzac',
            nom_region: 'OCCITANIE',
            st_area_shape: 554841824.0549872,
            st_perimeter_shape: 125726.64842881361,
          },
          type: 'Feature',
        })
      })
    })
    describe('GeoJSON file', () => {
      it('returns the objects in the file', async () => {
        const json = await readDataset(
          'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson'
        )
        expect(json[0]).toEqual({
          geometry: {
            coordinates: [3.37305747018, 43.7929180957],
            type: 'Point',
          },
          properties: {
            code_dep: '34',
            code_epci: 200017341,
            code_region: '76',
            geo_point_2d: [43.7929180957, 3.37305747018],
            nom_dep: 'HERAULT',
            nom_epci: 'CC Lodévois et Larzac',
            nom_region: 'OCCITANIE',
            objectid: 25,
            st_area_shape: 554841824.0549872,
            st_perimeter_shape: 125726.64842881361,
          },
          type: 'Feature',
        })
      })
    })
    describe('Excel file', () => {
      it('returns the objects in the file', async () => {
        const excel = await readDataset(
          'http://localfile/fixtures/ENS_CG02.xls'
        )
        expect(excel[0]).toEqual({
          geometry: null,
          id: 0,
          properties: {
            ENS_POTENT: 'Th 023',
            Gestion: 'o',
            ID_ENS: 'TH 023',
            PERIMETRE: 1448.09054340757,
            SUPERFICIE: 86511.35571961474,
            the_geom:
              'MULTIPOLYGON (((756783.4911681091 6943693.466001436, 756973.9557157363 6943699.033945308, 757071.0605141836 6943710.784083098, 757306.3095355278 6943701.600258818, 757320.4355607403 6943672.737612311, 757354.0916407352 6943616.762834985, 757355.5828327122 6943580.821844398, 757346.3269744576 6943548.564972184, 757324.4667942899 6943512.822329184, 757293.7168386498 6943487.933692504, 757280.9447310865 6943464.688769508, 757277.1234141111 6943437.774987674, 757284.1406655983 6943417.954808124, 757296.5619476133 6943399.885143167, 757298.1904209342 6943380.110736016, 757314.2194736927 6943363.806842901, 757332.2583315391 6943372.63570071, 757373.2519701455 6943334.562767278, 757380.101431174 6943294.983439544, 757157.3195574313 6943291.486489333, 756914.6110583611 6943268.398177572, 756853.2672335848 6943448.560780707, 756832.2154494472 6943508.021309288, 756803.9938767474 6943569.33915255, 756779.3953241408 6943634.219057551, 756783.4911681091 6943693.466001436)))',
          },
          type: 'Feature',
        })
      })
    })
    describe('Gml file', () => {
      it('returns the objects in the file', async () => {
        const gml = await readDataset(
          'http://localfile/fixtures/wfs-gml.xml',
          'gml',
          { namespace: 'ms:n_mat_eolien_p_r32', wfsVersion: '2.0.0' }
        )
        expect(gml[0]).toEqual({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [1.548145, 50.054755, 0],
          },
          properties: {
            boundedBy: [1.548145, 50.054755, 1.548145, 50.054755],
            id_map: 1862,
            id_mat: 1862,
            nom_parc: 'PARC EOLIEN DE CHASSE MAREE II',
            id_eolienn: 'L1.1',
            x_rgf93: 595929,
            y_rgf93: 6996108,
            puissanc_2: 2,
            code_com: 80360,
            nom_commun: 'FRESSENNEVILLE',
            code_arron: 801,
            departemen: 'SO',
            secteur: 'E - SECTEUR OUEST SOMME',
            id_sre: 'E-P',
            ht_max: 127,
            ht_mat: 0,
            type_proce: 'PC',
            etat_proce: 'AB',
            contentieu: 0,
            etat_mat: 'NCO',
            en_service: 'NON',
            etat_eolie: 'AB',
            alt_base: null,
            code_icpe: undefined,
            date_crea: undefined,
            date_decis: null,
            date_depot: undefined,
            date_maj: null,
            date_prod: undefined,
            date_real: undefined,
            diam_rotor: null,
            exploitant: undefined,
            gardesol: null,
            ht_nacelle: null,
            id_parc: undefined,
            id_pc: undefined,
            n_parcel: undefined,
            operateur: undefined,
            precis_pos: undefined,
            srce_geom: undefined,
            sys_coord: undefined,
            x_pc: null,
            y_pc: null,
          },
        })
      })
    })
    describe('Wfs service', () => {
      it('reads the content from the service', async () => {
        const wfs = await readDataset(
          'http://localfile/fixtures/wfs-gml.xml',
          'wfs',
          {
            namespace: 'ms:n_mat_eolien_p_r32',
            wfsVersion: '2.0.0',
          }
        )
        expect(wfs[0]).toEqual({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [1.548145, 50.054755, 0],
          },
          properties: {
            boundedBy: [1.548145, 50.054755, 1.548145, 50.054755],
            id_map: 1862,
            id_mat: 1862,
            nom_parc: 'PARC EOLIEN DE CHASSE MAREE II',
            id_eolienn: 'L1.1',
            x_rgf93: 595929,
            y_rgf93: 6996108,
            puissanc_2: 2,
            code_com: 80360,
            nom_commun: 'FRESSENNEVILLE',
            code_arron: 801,
            departemen: 'SO',
            secteur: 'E - SECTEUR OUEST SOMME',
            id_sre: 'E-P',
            ht_max: 127,
            ht_mat: 0,
            type_proce: 'PC',
            etat_proce: 'AB',
            contentieu: 0,
            etat_mat: 'NCO',
            en_service: 'NON',
            etat_eolie: 'AB',
            alt_base: null,
            code_icpe: undefined,
            date_crea: undefined,
            date_decis: null,
            date_depot: undefined,
            date_maj: null,
            date_prod: undefined,
            date_real: undefined,
            diam_rotor: null,
            exploitant: undefined,
            gardesol: null,
            ht_nacelle: null,
            id_parc: undefined,
            id_pc: undefined,
            n_parcel: undefined,
            operateur: undefined,
            precis_pos: undefined,
            srce_geom: undefined,
            sys_coord: undefined,
            x_pc: null,
            y_pc: null,
          },
        })
      })
    })
    describe('specifying a type hint', () => {
      it('ignores the advertised content type and follows the type hint instead', async () => {
        try {
          await readDataset(
            'http://localfile/fixtures/small.json',
            'csv'
          ).catch(console.warn)
        } catch {} // eslint-disable-line
        expect(CsvReader.prototype.read).toHaveBeenCalled()
      })
    })
    describe('when no header present', () => {
      it('infers type from the file extension (csv)', async () => {
        await readDataset('http://localfile/fixtures/rephytox.csv?noheader')
        expect(CsvReader.prototype.read).toHaveBeenCalled()
      })
      it('infers type from the file extension (geojson)', async () => {
        await readDataset(
          'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson?noheader'
        )
        expect(GeojsonReader.prototype.read).toHaveBeenCalled()
      })
      it('fails if no recognized extension in the url', async () => {
        expect(
          readDataset('http://localfile/fixtures/unrecognized.txt?noheader')
        ).rejects.toMatchObject({
          type: expect.stringContaining('unknown'),
        })
      })
    })
    describe('use ogc-client utils for caching', () => {
      beforeEach(() => {
        readDataset(
          'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson',
          'geojson'
        )
      })
      it('uses cache by default', () => {
        expect(useCache).toHaveBeenCalledTimes(1)
      })
      it('avoids identical concurrent requests', () => {
        expect(sharedFetch).toHaveBeenCalledTimes(1)
      })
    })
    describe('when no use of ogc-client cache', () => {
      beforeEach(() => {
        const cacheActive = false
        readDataset(
          'http://localfile/fixtures/perimetre-des-epci-concernes-par-un-contrat-de-ville.geojson',
          'geojson',
          undefined,
          cacheActive
        )
      })
      it('does not use ogc-client cache', () => {
        expect(useCache).not.toHaveBeenCalled()
      })
    })
  })
})
