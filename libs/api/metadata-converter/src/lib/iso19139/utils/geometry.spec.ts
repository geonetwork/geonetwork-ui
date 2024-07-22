import { Geometry } from 'geojson'
import { getRootElement, parseXmlString, xmlToString } from '../../xml-utils'
import { readGeometry, writeGeometry } from './geometry'

describe('geometry utils', () => {
  describe('readGeometry', () => {
    it('parses the GML to a Geometry object', () => {
      const input = `
<gml:MultiSurface>
    <gml:surfaceMember>
        <gml:Polygon>
            <gml:exterior>
                <gml:LinearRing>
                    <gml:posList srsDimension="2">6.777075 45.827119 6.755991 47.517566 10.541824 47.477984 10.446252 45.788744 6.777075 45.827119</gml:posList>
                </gml:LinearRing>
            </gml:exterior>
        </gml:Polygon>
    </gml:surfaceMember>
</gml:MultiSurface>
`
      const el = getRootElement(parseXmlString(input))
      expect(readGeometry(el)).toEqual({
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [6.777075, 45.827119, 0],
              [6.755991, 47.517566, 0],
              [10.541824, 47.477984, 0],
              [10.446252, 45.788744, 0],
              [6.777075, 45.827119, 0],
            ],
          ],
        ],
      })
    })
  })

  describe('writeGeometry', () => {
    it('serializes the Geometry object into an XmlElement', () => {
      const input = {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [6.777075, 45.827119, 0],
              [6.755991, 47.517566, 0],
              [10.541824, 47.477984, 0],
              [10.446252, 45.788744, 0],
              [6.777075, 45.827119, 0],
            ],
          ],
        ],
      } as Geometry

      const element = writeGeometry(input)
      expect(xmlToString(element)).toEqual(`
<MultiSurface xmlns="http://www.opengis.net/gml/3.2">
    <surfaceMember>
        <Polygon>
            <exterior>
                <LinearRing>
                    <posList srsDimension="2">6.777075 45.827119 6.755991 47.517566 10.541824 47.477984 10.446252 45.788744 6.777075 45.827119</posList>
                </LinearRing>
            </exterior>
        </Polygon>
    </surfaceMember>
</MultiSurface>
`)
    })
  })
})
