import { XmlElement } from '@rgrove/parse-xml'
import { Geometry } from 'geojson'
import GML32 from 'ol/format/GML32'
import GeoJSON from 'ol/format/GeoJSON'
import { parse } from 'ol/xml'
import {
  createDocument,
  getRootElement,
  parseXmlString,
  xmlToString,
} from '../../xml-utils'

export function readGeometry(el: XmlElement): Geometry {
  const xmlDoc = createDocument(el)
  xmlDoc.root.attributes['xmlns'] = 'http://www.opengis.net/gml/3.2'
  const gmlString = xmlToString(xmlDoc)
  const doc = parse(gmlString)
  // we need an intermediate node to be able to parse the GML
  const node = document.createElement('pre')
  node.appendChild(doc.documentElement)
  const gml32Format = new GML32()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const geometry = gml32Format.readGeometryFromNode(node)
  const geojsonFormat = new GeoJSON()
  return geojsonFormat.writeGeometryObject(geometry)
}

export function writeGeometry(geometryObject: Geometry): XmlElement {
  const geojsonFormat = new GeoJSON()
  const geometry = geojsonFormat.readGeometry(geometryObject)
  const gml32Format = new GML32()
  const node = gml32Format.writeGeometryNode(geometry)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const element = node.firstElementChild as HTMLElement
  const gmlString = new XMLSerializer().serializeToString(element)
  return getRootElement(parseXmlString(gmlString))
}
