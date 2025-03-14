/**
 * @jest-environment jsdom
 */
import { GmlReader, parseGml } from './gml'
import fetchMock from 'fetch-mock-jest'
import path from 'path'
import fs from 'fs/promises'
import { useCache } from '@camptocamp/ogc-client'

//todo: fix this test, to run without mocking useCache
jest.mock('@camptocamp/ogc-client', () => ({
  useCache: jest.fn(async (factory) =>
    JSON.parse(JSON.stringify(await factory()))
  ),
  sharedFetch: jest.fn((url) => global.fetch(url)),
}))

const singleFeatureValidGml = `<?xml version='1.0' encoding="UTF-8" ?>
<wfs:FeatureCollection
  xmlns:ms="http://mapserver.gis.umn.edu/mapserver"
  xmlns:gml="http://www.opengis.net/gml/3.2"
  xmlns:wfs="http://www.opengis.net/wfs/2.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://mapserver.gis.umn.edu/mapserver https://ogc.geo-ide.developpement-durable.gouv.fr/wxs?map=/opt/data/carto/geoide-catalogue/1.4/org_38148/aab5f309-86ca-4e8b-8411-c8a02963b673.internet.map&amp;SERVICE=WFS&amp;VERSION=2.0.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=ms:n_mat_eolien_p_r32&amp;OUTPUTFORMAT=application%2Fgml%2Bxml%3B%20version%3D3.2 http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd http://www.opengis.net/gml/3.2 http://schemas.opengis.net/gml/3.2.1/gml.xsd"
  timeStamp="2023-07-17T11:23:51" numberMatched="unknown" numberReturned="10"
  next="https://ogc.geo-ide.developpement-durable.gouv.fr/wxs?map=/opt/data/carto/geoide-catalogue/1.4/org_38148/aab5f309-86ca-4e8b-8411-c8a02963b673.internet.map&amp;SERVICE=WFS&amp;REQUEST=GetFeature&amp;VERSION=2.0.0&amp;TYPENAMES=ms%3An_mat_eolien_p_r32&amp;OUTPUTFORMAT=application%2Fgml%2Bxml%3B%20version%3D3.2&amp;COUNT=10&amp;SRSNAME=EPSG%3A4326&amp;STARTINDEX=10">
  <wfs:boundedBy>
    <gml:Envelope srsName="urn:ogc:def:crs:EPSG::4326">
      <gml:lowerCorner>50.054713 1.548145</gml:lowerCorner>
      <gml:upperCorner>50.432854 2.097876</gml:upperCorner>
    </gml:Envelope>
  </wfs:boundedBy>
  <wfs:member>
    <ms:n_mat_eolien_p_r32>
      <gml:boundedBy>
        <gml:Envelope srsName="urn:ogc:def:crs:EPSG::4326">
          <gml:lowerCorner>50.054755 1.548145</gml:lowerCorner>
          <gml:upperCorner>50.054755 1.548145</gml:upperCorner>
        </gml:Envelope>
      </gml:boundedBy>
      <ms:geometry>
        <gml:Point gml:id=".1" srsName="urn:ogc:def:crs:EPSG::4326">
          <gml:pos>50.054755 1.548145</gml:pos>
        </gml:Point>
      </ms:geometry>
      <ms:id_map>1862</ms:id_map>
      <ms:id_mat>1862</ms:id_mat>
      <ms:code_icpe></ms:code_icpe>
      <ms:id_parc></ms:id_parc>
      <ms:nom_parc>PARC EOLIEN DE CHASSE MAREE II</ms:nom_parc>
      <ms:id_pc></ms:id_pc>
      <ms:operateur></ms:operateur>
      <ms:exploitant></ms:exploitant>
      <ms:date_crea></ms:date_crea>
      <ms:id_eolienn>L1.1</ms:id_eolienn>
      <ms:x_rgf93>595929.000000000000000</ms:x_rgf93>
      <ms:y_rgf93>6996108.000000000000000</ms:y_rgf93>
      <ms:x_pc></ms:x_pc>
      <ms:y_pc></ms:y_pc>
      <ms:sys_coord></ms:sys_coord>
      <ms:alt_base></ms:alt_base>
      <ms:n_parcel></ms:n_parcel>
      <ms:puissanc_2>2.000000000000000</ms:puissanc_2>
      <ms:code_com>80360</ms:code_com>
      <ms:nom_commun>FRESSENNEVILLE</ms:nom_commun>
      <ms:code_arron>801</ms:code_arron>
      <ms:departemen>SO</ms:departemen>
      <ms:secteur>E - SECTEUR OUEST SOMME</ms:secteur>
      <ms:id_sre>E-P</ms:id_sre>
      <ms:ht_max>127.000000000000000</ms:ht_max>
      <ms:ht_mat>0.000000000000000</ms:ht_mat>
      <ms:ht_nacelle></ms:ht_nacelle>
      <ms:diam_rotor></ms:diam_rotor>
      <ms:gardesol></ms:gardesol>
      <ms:type_proce>PC</ms:type_proce>
      <ms:etat_proce>AB</ms:etat_proce>
      <ms:date_depot></ms:date_depot>
      <ms:date_decis></ms:date_decis>
      <ms:contentieu>0</ms:contentieu>
      <ms:etat_mat>NCO</ms:etat_mat>
      <ms:date_real></ms:date_real>
      <ms:date_prod></ms:date_prod>
      <ms:en_service>NON</ms:en_service>
      <ms:etat_eolie>AB</ms:etat_eolie>
      <ms:date_maj></ms:date_maj>
      <ms:srce_geom></ms:srce_geom>
      <ms:precis_pos></ms:precis_pos>
    </ms:n_mat_eolien_p_r32>
  </wfs:member>
</wfs:FeatureCollection>
`
describe('Gml parsing', () => {
  describe('parseCsv', () => {
    describe('valid CSV with id', () => {
      it('returns a parsed object', () => {
        expect(
          parseGml(singleFeatureValidGml, 'ms:n_mat_eolien_p_r32', '2.0.0')
        ).toEqual({
          items: [
            {
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
              },
            },
          ],
          properties: [
            { label: 'boundedBy', name: 'boundedBy', type: 'string' },
            { label: 'id_map', name: 'id_map', type: 'number' },
            { label: 'id_mat', name: 'id_mat', type: 'number' },
            { label: 'code_icpe', name: 'code_icpe', type: 'string' },
            { label: 'id_parc', name: 'id_parc', type: 'string' },
            { label: 'nom_parc', name: 'nom_parc', type: 'string' },
            { label: 'id_pc', name: 'id_pc', type: 'string' },
            { label: 'operateur', name: 'operateur', type: 'string' },
            { label: 'exploitant', name: 'exploitant', type: 'string' },
            { label: 'date_crea', name: 'date_crea', type: 'string' },
            { label: 'id_eolienn', name: 'id_eolienn', type: 'string' },
            { label: 'x_rgf93', name: 'x_rgf93', type: 'number' },
            { label: 'y_rgf93', name: 'y_rgf93', type: 'number' },
            { label: 'x_pc', name: 'x_pc', type: 'string' },
            { label: 'y_pc', name: 'y_pc', type: 'string' },
            { label: 'sys_coord', name: 'sys_coord', type: 'string' },
            { label: 'alt_base', name: 'alt_base', type: 'string' },
            { label: 'n_parcel', name: 'n_parcel', type: 'string' },
            { label: 'puissanc_2', name: 'puissanc_2', type: 'number' },
            { label: 'code_com', name: 'code_com', type: 'number' },
            { label: 'nom_commun', name: 'nom_commun', type: 'string' },
            { label: 'code_arron', name: 'code_arron', type: 'number' },
            { label: 'departemen', name: 'departemen', type: 'string' },
            { label: 'secteur', name: 'secteur', type: 'string' },
            { label: 'id_sre', name: 'id_sre', type: 'string' },
            { label: 'ht_max', name: 'ht_max', type: 'number' },
            { label: 'ht_mat', name: 'ht_mat', type: 'number' },
            { label: 'ht_nacelle', name: 'ht_nacelle', type: 'string' },
            { label: 'diam_rotor', name: 'diam_rotor', type: 'string' },
            { label: 'gardesol', name: 'gardesol', type: 'string' },
            { label: 'type_proce', name: 'type_proce', type: 'string' },
            { label: 'etat_proce', name: 'etat_proce', type: 'string' },
            { label: 'date_depot', name: 'date_depot', type: 'string' },
            { label: 'date_decis', name: 'date_decis', type: 'string' },
            { label: 'contentieu', name: 'contentieu', type: 'number' },
            { label: 'etat_mat', name: 'etat_mat', type: 'string' },
            { label: 'date_real', name: 'date_real', type: 'string' },
            { label: 'date_prod', name: 'date_prod', type: 'string' },
            { label: 'en_service', name: 'en_service', type: 'string' },
            { label: 'etat_eolie', name: 'etat_eolie', type: 'string' },
            { label: 'date_maj', name: 'date_maj', type: 'string' },
            { label: 'srce_geom', name: 'srce_geom', type: 'string' },
            { label: 'precis_pos', name: 'precis_pos', type: 'string' },
          ],
        })
      })
    })
    describe('invalid namespace', () => {
      it('throws a relevant error', () => {
        expect(() =>
          parseGml(singleFeatureValidGml, 'ws:wrongNamespace', '2.0.0')
        ).toThrowError("Couldn't retrieve namespace url")
      })
    })
    describe('invalid CSV bacause of wrong outputCrs', () => {
      it('returns a parsed object', () => {
        expect(() =>
          parseGml(
            `<?xml version='1.0' encoding="UTF-8" ?>
<wfs:FeatureCollection
   xmlns:ms="http://mapserver.gis.umn.edu/mapserver"
   xmlns:gml="http://www.opengis.net/gml/3.2"
   xmlns:wfs="http://www.opengis.net/wfs/2.0"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://mapserver.gis.umn.edu/mapserver https://ogc.geo-ide.developpement-durable.gouv.fr/wxs?map=/opt/data/carto/geoide-catalogue/1.4/org_38148/aab5f309-86ca-4e8b-8411-c8a02963b673.internet.map&amp;SERVICE=WFS&amp;VERSION=2.0.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=ms:n_mat_eolien_p_r32&amp;OUTPUTFORMAT=application%2Fgml%2Bxml%3B%20version%3D3.2 http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd http://www.opengis.net/gml/3.2 http://schemas.opengis.net/gml/3.2.1/gml.xsd"
   timeStamp="2023-07-12T13:32:39" numberMatched="5433" numberReturned="5433">
      <wfs:boundedBy>
       <gml:Envelope srsName="urn:ogc:def:crs:EPSG::2154">
       <gml:lowerCorner>590769.000000 6866850.000000</gml:lowerCorner>
       <gml:upperCorner>787539.000000 7105685.000000</gml:upperCorner>
       </gml:Envelope>
      </wfs:boundedBy>
<!-- WARNING: No featureid defined for typename 'n_mat_eolien_p_r32'. Output will not validate. -->
    <wfs:member>
      <ms:n_mat_eolien_p_r32>
        <gml:boundedBy>
         <gml:Envelope srsName="urn:ogc:def:crs:EPSG::2154">
         <gml:lowerCorner>595929.000000 6996108.000000</gml:lowerCorner>
         <gml:upperCorner>595929.000000 6996108.000000</gml:upperCorner>
         </gml:Envelope>
        </gml:boundedBy>
        <ms:geometry>
          <gml:Point gml:id=".1" srsName="urn:ogc:def:crs:EPSG::2154">
            <gml:pos>595929.000000 6996108.000000</gml:pos>
          </gml:Point>
        </ms:geometry>
        <ms:id_map>1862</ms:id_map>
        <ms:id_mat>1862</ms:id_mat>
        <ms:code_icpe></ms:code_icpe>
        <ms:id_parc></ms:id_parc>
        <ms:nom_parc>PARC EOLIEN DE CHASSE MAREE II</ms:nom_parc>
        <ms:id_pc></ms:id_pc>
        <ms:operateur></ms:operateur>
        <ms:exploitant></ms:exploitant>
        <ms:date_crea></ms:date_crea>
        <ms:id_eolienn>L1.1</ms:id_eolienn>
        <ms:x_rgf93>595929.000000000000000</ms:x_rgf93>
        <ms:y_rgf93>6996108.000000000000000</ms:y_rgf93>
        <ms:x_pc></ms:x_pc>
        <ms:y_pc></ms:y_pc>
        <ms:sys_coord></ms:sys_coord>
        <ms:alt_base></ms:alt_base>
        <ms:n_parcel></ms:n_parcel>
        <ms:puissanc_2>2.000000000000000</ms:puissanc_2>
        <ms:code_com>80360</ms:code_com>
        <ms:nom_commun>FRESSENNEVILLE</ms:nom_commun>
        <ms:code_arron>801</ms:code_arron>
        <ms:departemen>SO</ms:departemen>
        <ms:secteur>E - SECTEUR OUEST SOMME</ms:secteur>
        <ms:id_sre>E-P</ms:id_sre>
        <ms:ht_max>127.000000000000000</ms:ht_max>
        <ms:ht_mat>0.000000000000000</ms:ht_mat>
        <ms:ht_nacelle></ms:ht_nacelle>
        <ms:diam_rotor></ms:diam_rotor>
        <ms:gardesol></ms:gardesol>
        <ms:type_proce>PC</ms:type_proce>
        <ms:etat_proce>AB</ms:etat_proce>
        <ms:date_depot></ms:date_depot>
        <ms:date_decis></ms:date_decis>
        <ms:contentieu>0</ms:contentieu>
        <ms:etat_mat>NCO</ms:etat_mat>
        <ms:date_real></ms:date_real>
        <ms:date_prod></ms:date_prod>
        <ms:en_service>NON</ms:en_service>
        <ms:etat_eolie>AB</ms:etat_eolie>
        <ms:date_maj></ms:date_maj>
        <ms:srce_geom></ms:srce_geom>
        <ms:precis_pos></ms:precis_pos>
      </ms:n_mat_eolien_p_r32>
    </wfs:member>
</wfs:FeatureCollection>`,
            'ms:n_mat_eolien_p_r32',
            '2.0.0'
          )
        ).toThrowError("Couldn't parse WFS with GML features")
      })
    })
  })

  describe('GmlReader', () => {
    let reader: GmlReader
    let cacheActive = true
    beforeEach(() => {
      jest.clearAllMocks()
      fetchMock.get(
        (url) => new URL(url).hostname === 'localfile',
        async (url) => {
          const filePath = path.join(__dirname, '../..', new URL(url).pathname)
          return {
            body: await fs.readFile(filePath, 'utf8'),
            status: 200,
            headers: {
              'Content-Type': 'text/csv',
            },
          }
        },
        {
          sendAsJson: false,
        }
      )
      reader = new GmlReader(
        'http://localfile/fixtures/wfs-gml.xml',
        'ms:n_mat_eolien_p_r32',
        '2.0.0',
        cacheActive
      )
      reader.load()
    })
    afterEach(() => {
      fetchMock.reset()
    })
    describe('#info', () => {
      it('returns dataset info', async () => {
        await expect(reader.info).resolves.toEqual({
          itemsCount: 10,
        })
      })
    })
    describe('#properties', () => {
      it('returns properties info', async () => {
        await expect(reader.properties).resolves.toEqual([
          { label: 'boundedBy', name: 'boundedBy', type: 'string' },
          { label: 'id_map', name: 'id_map', type: 'number' },
          { label: 'id_mat', name: 'id_mat', type: 'number' },
          { label: 'code_icpe', name: 'code_icpe', type: 'string' },
          { label: 'id_parc', name: 'id_parc', type: 'string' },
          { label: 'nom_parc', name: 'nom_parc', type: 'string' },
          { label: 'id_pc', name: 'id_pc', type: 'string' },
          { label: 'operateur', name: 'operateur', type: 'string' },
          { label: 'exploitant', name: 'exploitant', type: 'string' },
          { label: 'date_crea', name: 'date_crea', type: 'string' },
          { label: 'id_eolienn', name: 'id_eolienn', type: 'string' },
          { label: 'x_rgf93', name: 'x_rgf93', type: 'number' },
          { label: 'y_rgf93', name: 'y_rgf93', type: 'number' },
          { label: 'x_pc', name: 'x_pc', type: 'number' },
          { label: 'y_pc', name: 'y_pc', type: 'number' },
          { label: 'sys_coord', name: 'sys_coord', type: 'string' },
          { label: 'alt_base', name: 'alt_base', type: 'number' },
          { label: 'n_parcel', name: 'n_parcel', type: 'string' },
          { label: 'puissanc_2', name: 'puissanc_2', type: 'number' },
          { label: 'code_com', name: 'code_com', type: 'number' },
          { label: 'nom_commun', name: 'nom_commun', type: 'string' },
          { label: 'code_arron', name: 'code_arron', type: 'number' },
          { label: 'departemen', name: 'departemen', type: 'string' },
          { label: 'secteur', name: 'secteur', type: 'string' },
          { label: 'id_sre', name: 'id_sre', type: 'string' },
          { label: 'ht_max', name: 'ht_max', type: 'number' },
          { label: 'ht_mat', name: 'ht_mat', type: 'number' },
          { label: 'ht_nacelle', name: 'ht_nacelle', type: 'number' },
          { label: 'diam_rotor', name: 'diam_rotor', type: 'number' },
          { label: 'gardesol', name: 'gardesol', type: 'number' },
          { label: 'type_proce', name: 'type_proce', type: 'string' },
          { label: 'etat_proce', name: 'etat_proce', type: 'string' },
          { label: 'date_depot', name: 'date_depot', type: 'string' },
          { label: 'date_decis', name: 'date_decis', type: 'date' },
          { label: 'contentieu', name: 'contentieu', type: 'number' },
          { label: 'etat_mat', name: 'etat_mat', type: 'string' },
          { label: 'date_real', name: 'date_real', type: 'string' },
          { label: 'date_prod', name: 'date_prod', type: 'string' },
          { label: 'en_service', name: 'en_service', type: 'string' },
          { label: 'etat_eolie', name: 'etat_eolie', type: 'string' },
          { label: 'date_maj', name: 'date_maj', type: 'date' },
          { label: 'srce_geom', name: 'srce_geom', type: 'string' },
          { label: 'precis_pos', name: 'precis_pos', type: 'string' },
        ])
      })
    })
    describe('#read', () => {
      let start
      beforeEach(() => {
        start = performance.now()
      })
      afterEach(() => {
        console.log(
          `"${expect.getState().currentTestName}" took ${(
            performance.now() - start
          ).toFixed(1)}ms`
        )
      })
      describe('#selectAll', () => {
        it('reads all data items', async () => {
          const items = await reader.selectAll().read()
          expect(items.length).toEqual(10)
          expect(items[0]).toEqual({
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
      describe('#select', () => {
        it('reads only certain fields', async () => {
          const items = await reader.select('nom_parc', 'x_rgf93').read()
          expect(items.length).toEqual(10)
          expect(items[0]).toEqual({
            geometry: null,
            properties: {
              nom_parc: 'PARC EOLIEN DE CHASSE MAREE II',
              x_rgf93: 595929.0,
            },
            type: 'Feature',
          })
        })
      })
      describe('#limit', () => {
        it('reads only a certain range of items', async () => {
          const items = await reader.limit(2, 3).read()
          expect(items.length).toEqual(3)
          expect(items[0]).toEqual({
            geometry: null,
            properties: expect.objectContaining({
              id_eolienn: 'L1.3',
            }),
            type: 'Feature',
          })
        })
      })
      describe('#orderBy', () => {
        it('reads only a certain range of items', async () => {
          const items = await reader
            .orderBy(
              ['desc', 'Lieu de surveillance : Mnémonique'],
              ['asc', 'Prélèvement : Date de validation'],
              ['desc', 'Echantillon : Identifiant interne']
            )
            .read()
          expect(items.length).toEqual(10)
          expect(items.slice(0, 3)).toEqual([
            {
              geometry: null,
              properties: expect.objectContaining({
                id_eolienn: 'L1.1',
                x_rgf93: 595929.0,
              }),
              type: 'Feature',
            },
            {
              geometry: null,
              properties: expect.objectContaining({
                id_eolienn: 'L1.2',
                x_rgf93: 596404.0,
              }),
              type: 'Feature',
            },
            {
              geometry: null,
              properties: expect.objectContaining({
                id_eolienn: 'L1.3',
                x_rgf93: 596825.0,
              }),
              type: 'Feature',
            },
          ])
        })
      })
      describe('#aggregate', () => {
        it('aggregates all records', async () => {
          const items = await reader
            .groupBy(['all'])
            .aggregate(
              ['count'],
              ['max', 'ht_max'],
              ['min', 'ht_max'],
              ['sum', 'ht_max'],
              ['average', 'ht_max']
            )
            .read()
          expect(items).toEqual([
            {
              geometry: null,
              properties: {
                'average(ht_max)': 127.5,
                'count()': 10,
                'max(ht_max)': 130,
                'min(ht_max)': 126,
                'sum(ht_max)': 1275,
              },
              type: 'Feature',
            },
          ])
        })
        it('aggregates by distinct values', async () => {
          const items = await reader
            .groupBy(['distinct', 'puissanc_2'])
            .aggregate(
              ['count'],
              ['max', 'ht_max'],
              ['min', 'ht_max'],
              ['sum', 'ht_max'],
              ['average', 'ht_max']
            )
            .read()
          expect(items).toEqual([
            {
              geometry: null,
              properties: {
                'average(ht_max)': 128.5,
                'count()': 6,
                'distinct(puissanc_2)': 2,
                'max(ht_max)': 130,
                'min(ht_max)': 127,
                'sum(ht_max)': 771,
              },
              type: 'Feature',
            },
            {
              geometry: null,
              properties: {
                'average(ht_max)': 126,
                'count()': 4,
                'distinct(puissanc_2)': 2.75,
                'max(ht_max)': 126,
                'min(ht_max)': 126,
                'sum(ht_max)': 504,
              },
              type: 'Feature',
            },
          ])
        })
      })
      describe('#where', () => {
        it('filters records', async () => {
          const items = await reader
            .where([
              'or',
              ['>', 'puissanc_2', 2],
              ['=', 'nom_commun', 'FRESSENNEVILLE'],
            ])
            .read()
          expect(items.length).toEqual(7)
          expect(items[0]).toEqual({
            geometry: null,
            properties: expect.objectContaining({
              nom_commun: 'FRESSENNEVILLE',
            }),
            type: 'Feature',
          })
        })
      })
    })
    describe('When cache should be used', () => {
      it('uses the cache', async () => {
        const useCacheSpy = jest.spyOn({ useCache }, 'useCache')
        await reader.read()
        expect(useCacheSpy).toHaveBeenCalledTimes(1)
      })
    })
    describe('When cache should not be used', () => {
      beforeAll(() => {
        cacheActive = false
      })
      it('does not use the cache', async () => {
        const useCacheSpy = jest.spyOn({ useCache }, 'useCache')
        await reader.read()
        expect(useCacheSpy).not.toHaveBeenCalled()
      })
    })
  })
})
