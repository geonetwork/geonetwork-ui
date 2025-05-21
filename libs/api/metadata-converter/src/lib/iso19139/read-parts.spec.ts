/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import GEOCAT_CH_DATASET from '../fixtures/geocat-ch.iso19139.dataset.xml'
// @ts-ignore
import { XmlElement } from '@rgrove/parse-xml'
// @ts-ignore
import GEOCAT_CH_SERVICE from '../fixtures/geocat-ch.iso19139.service.xml'
import { pipe } from '../function-utils'
import {
  appendChildren,
  findNestedElement,
  getRootElement,
  parseXmlString,
  removeChildrenByName,
} from '../xml-utils'
import {
  findIdentification,
  getUpdateFrequencyFromCustomPeriod,
  readContacts,
  readDefaultLanguage,
  readOnlineResources,
  readOtherLanguages,
  readOwnerOrganization,
  readSpatialExtents,
  readTemporalExtents,
} from './read-parts'

describe('read parts', () => {
  let recordRootEl: XmlElement

  describe('common functions', () => {
    beforeEach(() => {
      recordRootEl = getRootElement(parseXmlString(GEOCAT_CH_DATASET))
    })
    describe('readDefaultLanguage, readOtherLanguages', () => {
      it('should read default language and otherLanguages separately, keep unsupported languages in ISO3', () => {
        expect(readDefaultLanguage(recordRootEl)).toBe('de')
        expect(readOtherLanguages(recordRootEl)).toEqual([
          'fr',
          'it',
          'en',
          'rm',
          'de',
          'aar',
        ])
      })
    })
    describe('readContacts', () => {
      it('returns an array of individuals with their organization', () => {
        expect(readContacts(recordRootEl)).toEqual([
          {
            address: 'Ittigen, 3063, CH',
            email: 'rolf.giezendanner@are.admin.ch',
            organization: {
              name: 'Bundesamt für Raumentwicklung',
              translations: {
                name: {
                  de: 'Bundesamt für Raumentwicklung',
                  en: 'Federal Office for Spatial Development',
                  fr: 'Office fédéral du développement territorial',
                  it: 'Ufficio federale dello sviluppo territoriale',
                  rm: 'Bundesamt für Raumentwicklung',
                },
              },
            },
            role: 'point_of_contact',
          },
        ])
      })
    })
    describe('readOwnerOrganization', () => {
      it('returns an organization without website', () => {
        expect(readOwnerOrganization(recordRootEl)).toEqual({
          name: 'Bundesamt für Raumentwicklung',
          translations: {
            name: {
              de: 'Bundesamt für Raumentwicklung',
              en: 'Federal Office for Spatial Development',
              fr: 'Office fédéral du développement territorial',
              it: 'Ufficio federale dello sviluppo territoriale',
              rm: 'Bundesamt für Raumentwicklung',
            },
          },
        })
      })
      describe('organization with website', () => {
        beforeEach(() => {
          const contactWithUrl = getRootElement(
            parseXmlString(`
<gmd:contact>
    <gmd:CI_ResponsibleParty>
        <gmd:organisationName>
            <gco:CharacterString>MyOrganization</gco:CharacterString>
        </gmd:organisationName>
        <gmd:contactInfo>
            <gmd:CI_Contact>
                <gmd:address>
                    <gmd:CI_Address>
                        <gmd:electronicMailAddress>
                            <gco:CharacterString>bob@org.net</gco:CharacterString>
                        </gmd:electronicMailAddress>
                    </gmd:CI_Address>
                </gmd:address>
                <gmd:onlineResource>
                    <gmd:CI_OnlineResource>
                        <gmd:linkage>
                            <gmd:URL>https://www.my.org/info</gmd:URL>
                        </gmd:linkage>
                    </gmd:CI_OnlineResource>
                </gmd:onlineResource>
            </gmd:CI_Contact>
        </gmd:contactInfo>
    </gmd:CI_ResponsibleParty>
</gmd:contact>`)
          )
          pipe(
            removeChildrenByName('gmd:contact'),
            appendChildren(() => contactWithUrl)
          )(recordRootEl)
        })
        it('returns an organization with a website', () => {
          expect(readOwnerOrganization(recordRootEl)).toEqual({
            name: 'MyOrganization',
            website: new URL('https://www.my.org/info'),
            translations: {},
          })
        })
      })
    })
    describe('getUpdateFrequencyFromCustomPeriod', () => {
      it('returns null for empty input', () => {
        expect(getUpdateFrequencyFromCustomPeriod('')).toBeNull()
      })
      it('returns null for invalid input', () => {
        expect(getUpdateFrequencyFromCustomPeriod('RSYZ45')).toBeNull()
      })
      it('handles yearly period', () => {
        expect(getUpdateFrequencyFromCustomPeriod('P1Y')).toEqual({
          updatedTimes: 1,
          per: 'year',
        })
      })
      it('handles monthly period of 1 month', () => {
        expect(getUpdateFrequencyFromCustomPeriod('P0Y1M')).toEqual({
          updatedTimes: 1,
          per: 'month',
        })
      })
      it('handles monthly period of more than 1 month', () => {
        expect(getUpdateFrequencyFromCustomPeriod('P0Y3M')).toEqual({
          updatedTimes: 4,
          per: 'year',
        })
      })
      it('handles daily period of 1 day', () => {
        expect(getUpdateFrequencyFromCustomPeriod('P0Y0M1D')).toEqual({
          updatedTimes: 1,
          per: 'day',
        })
      })
      it('handles weekly period of 1 to 7 days', () => {
        expect(getUpdateFrequencyFromCustomPeriod('P0Y0M2D')).toEqual({
          updatedTimes: 3,
          per: 'week',
        })
        expect(getUpdateFrequencyFromCustomPeriod('P0Y0M3D')).toEqual({
          updatedTimes: 2,
          per: 'week',
        })
        expect(getUpdateFrequencyFromCustomPeriod('P0Y0M7D')).toEqual({
          updatedTimes: 1,
          per: 'week',
        })
      })
      it('handles monthly period of more than 7 days', () => {
        expect(getUpdateFrequencyFromCustomPeriod('P0Y0M10D')).toEqual({
          updatedTimes: 3,
          per: 'month',
        })
      })
      it('handles hourly period', () => {
        expect(getUpdateFrequencyFromCustomPeriod('P0Y0M0DT6H')).toEqual({
          updatedTimes: 4,
          per: 'day',
        })
      })
    })
  })

  describe('dataset record', () => {
    beforeEach(() => {
      recordRootEl = getRootElement(parseXmlString(GEOCAT_CH_DATASET))
    })
    describe('readOnlineResources', () => {
      it('returns an array of online resources', () => {
        expect(readOnlineResources(recordRootEl)).toEqual([
          {
            description: 'Vorschau map.geo.admin.ch',
            url: new URL(
              'https://map.geo.admin.ch/?layers=ch.are.alpenkonvention'
            ),
            name: 'Vorschau map.geo.admin.ch',
            translations: {
              description: {
                de: 'Vorschau map.geo.admin.ch',
                en: 'Preview map.geo.admin.ch',
                fr: 'Aperçu map.geo.admin.ch',
                it: 'Previsione map.geo.admin.ch',
              },
              name: {
                de: 'Vorschau map.geo.admin.ch',
                en: 'Preview map.geo.admin.ch',
                fr: 'Aperçu map.geo.admin.ch',
                it: 'Previsione map.geo.admin.ch',
              },
            },
            type: 'link',
          },
          {
            description: 'Webseite des ARE über die Alpenkonvention',
            url: new URL(
              'https://www.are.admin.ch/are/de/home/laendliche-raeume-und-berggebiete/internationale-zusammenarbeit/alpenkonvention.html'
            ),
            translations: {
              description: {
                de: 'Webseite des ARE über die Alpenkonvention',
                fr: "Page web de l'ARE sur la Convention alpine",
              },
            },
            type: 'link',
          },
          {
            description: 'Download von data.geo.admin.ch',
            url: new URL(
              'https://data.geo.admin.ch/browser/index.html#/collections/ch.are.alpenkonvention'
            ),
            mimeType: 'x-gis/x-shapefile',
            translations: {
              description: {
                de: 'Download von data.geo.admin.ch',
                en: 'Download server from geo.admin.ch',
                fr: 'Serveur de téléchargement de geo.admin.ch',
                it: 'Server di download di geo.admin.ch',
              },
            },
            type: 'download',
          },
          {
            accessServiceProtocol: 'wms',
            url: new URL(
              'http://wms.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities&lang=de'
            ),
            description: 'WMS Dienst von geo.admin.ch',
            identifierInService: 'ch.are.alpenkonvention',
            name: 'ch.are.alpenkonvention',
            translations: {
              description: {
                de: 'WMS Dienst von geo.admin.ch',
                en: 'WMS Service from geo.admin.ch',
                fr: 'Service WMS de geo.admin.ch',
                it: 'Servizio WMS di geo.admin.ch',
              },
              name: {
                de: 'ch.are.alpenkonvention',
              },
            },
            type: 'service',
          },
          {
            description: 'Minimales Geodatenmodell in INTERLIS 2.3',
            url: new URL(
              'https://www.are.admin.ch/are/de/home/raumentwicklung-und-raumplanung/grundlagen-und-daten/minimale-geodatenmodelle/alpenkonvention.html'
            ),
            mimeType: 'x-gis/x-shapefile',
            translations: {
              description: {
                de: 'Minimales Geodatenmodell in INTERLIS 2.3',
                fr: 'Modèle de données minimal en INTERLIS 2.3',
              },
            },
            type: 'download',
          },
          {
            description: 'Web-GIS ARE',
            url: new URL(
              'http://map.are.admin.ch/?Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-grau&layers=ch.are.alpenkonvention&layers_opacity=0.2&layers_visibility=true&lang=de'
            ),
            translations: {
              description: {
                de: 'Web-GIS ARE',
                fr: 'Web-SIG ARE',
              },
            },
            type: 'link',
          },
          {
            description: 'Offizielle Homepage der Alpenkonvention',
            url: new URL('http://www.alpconv.org/'),
            translations: {
              description: {
                de: 'Offizielle Homepage der Alpenkonvention',
                en: 'Official Website of the Alpine Convention',
                fr: 'Site web officiel de la Convention alpine',
                it: 'Pagina web ufficiale della Convenzione delle alpi',
              },
            },
            type: 'link',
          },
          {
            description: 'Die Alpenkonvention im Bundesgeoportal',
            url: new URL(
              'http://map.geo.admin.ch/?selectedNode=LT1_1&Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-farbe&layers=ch.are.alpenkonvention&layers_opacity=0.6&layers_visibility=true&lang=de'
            ),
            translations: {
              description: {
                de: 'Die Alpenkonvention im Bundesgeoportal',
                fr: 'La convention alpine dans le géoportail fédéral',
              },
            },
            type: 'link',
          },
          {
            description:
              'Liste der administrativen Einheiten des Alpenraumes in der schweizerischen Eidgenossenschaft',
            url: new URL('http://www.admin.ch/ch/d/sr/0_700_1/app1.html'),
            translations: {
              description: {
                de: 'Liste der administrativen Einheiten des Alpenraumes in der schweizerischen Eidgenossenschaft',
                fr: "Liste des unités administratives de l'espace alpin dans la Confédération suisse",
                it: 'Elenco delle unità amministrative dello spazio alpino nella Confederazione Svizzera',
              },
            },
            type: 'link',
          },
          {
            accessServiceProtocol: 'esriRest',
            url: new URL(
              'https://api3.geo.admin.ch/rest/services/api/MapServer/ch.are.alpenkonvention'
            ),
            description: 'RESTful API von geo.admin.ch',
            identifierInService: 'RESTful API von geo.admin.ch',
            name: 'RESTful API von geo.admin.ch',
            translations: {
              description: {
                de: 'RESTful API von geo.admin.ch',
                en: 'RESTful API from geo.admin.ch',
                fr: 'RESTful API de geo.admin.ch',
                it: 'RESTful API da geo.admin.ch',
                rm: 'RESTful API dad geo.admin.ch',
              },
              name: {
                de: 'RESTful API von geo.admin.ch',
                en: 'RESTful API from geo.admin.ch',
                fr: 'RESTful API de geo.admin.ch',
                it: 'RESTful API da geo.admin.ch',
                rm: 'RESTful API dad geo.admin.ch',
              },
            },
            type: 'service',
          },
          {
            description: 'Permalink opendata.swiss',
            url: new URL(
              'https://opendata.swiss/de/perma/8698bf0b-fceb-4f0f-989b-111e7c4af0a4@bundesamt-fur-raumentwicklung-are'
            ),
            name: 'Permalink opendata.swiss',
            translations: {
              description: {
                de: 'Permalink opendata.swiss',
                en: 'Permalink opendata.swiss',
                fr: 'Permalink opendata.swiss',
                it: 'Permalink opendata.swiss',
              },
              name: {
                de: 'Permalink opendata.swiss',
                en: 'Permalink opendata.swiss',
                fr: 'Permalink opendata.swiss',
                it: 'Permalink opendata.swiss',
              },
            },
            type: 'link',
          },
        ])
      })

      describe('distribution without url', () => {
        beforeEach(() => {
          const linkWithoutUrl = getRootElement(
            parseXmlString(`
<gmd:transferOptions>
    <gmd:MD_DigitalTransferOptions>
        <gmd:onLine>
            <gmd:CI_OnlineResource>
                <gmd:linkage/>
                <gmd:protocol>
                    <gco:CharacterString>WWW:DOWNLOAD</gco:CharacterString>
                </gmd:protocol>
            </gmd:CI_OnlineResource>
        </gmd:onLine>
    </gmd:MD_DigitalTransferOptions>
</gmd:transferOptions>`)
          )
          pipe(
            findNestedElement('gmd:distributionInfo', 'gmd:MD_Distribution'),
            removeChildrenByName('gmd:transferOptions'),
            appendChildren(() => linkWithoutUrl)
          )(recordRootEl)
        })
        it('returns an array of online resources with empty url', () => {
          expect(readOnlineResources(recordRootEl)).toEqual([
            {
              url: new URL('http://missing'),
              mimeType: 'x-gis/x-shapefile',
              type: 'download',
              translations: {},
            },
          ])
        })
      })
    })
    describe('readTemporalExtents', () => {
      describe('no temporal extent', () => {
        it('returns an empty array', () => {
          expect(readTemporalExtents(recordRootEl)).toEqual([])
        })
      })
      describe('instant temporal extent with known time position', () => {
        beforeEach(() => {
          const instantExtent = getRootElement(
            parseXmlString(`
<gmd:temporalElement>
  <gmd:EX_TemporalExtent>
    <gmd:extent>
      <gml:TimeInstant>
        <gml:timePosition>2024-05-24</gml:timePosition>
      </gml:TimeInstant>
    </gmd:extent>
  </gmd:EX_TemporalExtent>
</gmd:temporalElement>`)
          )
          pipe(
            findIdentification(),
            findNestedElement('gmd:extent', 'gmd:EX_Extent'),
            removeChildrenByName('gmd:temporalElement'),
            appendChildren(() => instantExtent)
          )(recordRootEl)
        })
        it('returns an array of temporal extents with only the start attribute', () => {
          expect(readTemporalExtents(recordRootEl)).toEqual([
            {
              start: new Date('2024-05-24'),
            },
          ])
        })
      })
      describe('instant temporal extent with unknown time position', () => {
        beforeEach(() => {
          const instantExtent = getRootElement(
            parseXmlString(`
<gmd:temporalElement>
  <gmd:EX_TemporalExtent>
    <gmd:extent>
      <gml:TimeInstant>
        <gml:timePosition indeterminatePosition="unknown"/>
      </gml:TimeInstant>
    </gmd:extent>
  </gmd:EX_TemporalExtent>
</gmd:temporalElement>`)
          )
          pipe(
            findIdentification(),
            findNestedElement('gmd:extent', 'gmd:EX_Extent'),
            removeChildrenByName('gmd:temporalElement'),
            appendChildren(() => instantExtent)
          )(recordRootEl)
        })
        it('returns an array of temporal extents with only the start attribute set to null', () => {
          expect(readTemporalExtents(recordRootEl)).toEqual([
            {
              start: null,
            },
          ])
        })
      })
      describe('period temporal extent with known begin and end position', () => {
        beforeEach(() => {
          const periodExtent = getRootElement(
            parseXmlString(`
<gmd:temporalElement>
  <gmd:EX_TemporalExtent>
    <gmd:extent>
      <gml:TimePeriod>
        <gml:beginPosition>2024-05-24</gml:beginPosition>
        <gml:endPosition>2024-05-30</gml:endPosition>
      </gml:TimePeriod>
    </gmd:extent>
  </gmd:EX_TemporalExtent>
</gmd:temporalElement>`)
          )
          pipe(
            findIdentification(),
            findNestedElement('gmd:extent', 'gmd:EX_Extent'),
            removeChildrenByName('gmd:temporalElement'),
            appendChildren(() => periodExtent)
          )(recordRootEl)
        })
        it('returns an array of temporal extents with start and end attributes', () => {
          expect(readTemporalExtents(recordRootEl)).toEqual([
            {
              start: new Date('2024-05-24'),
              end: new Date('2024-05-30'),
            },
          ])
        })
      })
      describe('mixed temporal extents', () => {
        beforeEach(() => {
          const periodExtent = getRootElement(
            parseXmlString(`
<gmd:temporalElement>
  <gmd:EX_TemporalExtent>
    <gmd:extent>
      <gml:TimePeriod>
        <gml:beginPosition>2024-05-24</gml:beginPosition>
        <gml:endPosition indeterminatePosition="unknown"/>
      </gml:TimePeriod>
    </gmd:extent>
  </gmd:EX_TemporalExtent>
</gmd:temporalElement>`)
          )
          const instantExtent = getRootElement(
            parseXmlString(`
<gmd:temporalElement>
  <gmd:EX_TemporalExtent>
    <gmd:extent>
      <gml:TimeInstant>
        <gml:timePosition>2024-05-30</gml:timePosition>
      </gml:TimeInstant>
    </gmd:extent>
  </gmd:EX_TemporalExtent>
</gmd:temporalElement>`)
          )
          pipe(
            findIdentification(),
            findNestedElement('gmd:extent', 'gmd:EX_Extent'),
            removeChildrenByName('gmd:temporalElement'),
            appendChildren(
              () => periodExtent,
              () => instantExtent
            )
          )(recordRootEl)
        })
        it('returns an array of mixed temporal extents', () => {
          expect(readTemporalExtents(recordRootEl)).toEqual([
            {
              start: new Date('2024-05-24'),
              end: null,
            },
            {
              start: new Date('2024-05-30'),
            },
          ])
        })
      })
    })
    describe('readSpatialExtents', () => {
      describe('no spatial extent', () => {
        beforeEach(() => {
          pipe(
            findIdentification(),
            findNestedElement('gmd:extent', 'gmd:EX_Extent'),
            removeChildrenByName('gmd:geographicElement')
          )(recordRootEl)
        })
        it('returns an empty array', () => {
          expect(readSpatialExtents(recordRootEl)).toEqual([])
        })
      })
      describe('one spatial extent with one geometry, one bbox and one description', () => {
        beforeEach(() => {
          const spatialExtent = getRootElement(
            parseXmlString(`
<gmd:geographicElement>
    <gmd:EX_GeographicDescription>
        <gmd:geographicIdentifier>
            <gmd:MD_Identifier>
                <gmd:code>
                    <gco:CharacterString>AK</gco:CharacterString>
                </gmd:code>
            </gmd:MD_Identifier>
        </gmd:geographicIdentifier>
    </gmd:EX_GeographicDescription>
    <gmd:EX_GeographicBoundingBox>
        <gmd:westBoundLongitude>
            <gco:Decimal>6.75599105586694</gco:Decimal>
        </gmd:westBoundLongitude>
        <gmd:eastBoundLongitude>
            <gco:Decimal>10.5418236945627</gco:Decimal>
        </gmd:eastBoundLongitude>
        <gmd:southBoundLatitude>
            <gco:Decimal>45.7887442565203</gco:Decimal>
        </gmd:southBoundLatitude>
        <gmd:northBoundLatitude>
            <gco:Decimal>47.5175655551557</gco:Decimal>
        </gmd:northBoundLatitude>
    </gmd:EX_GeographicBoundingBox>
    <gmd:EX_BoundingPolygon>
        <gmd:polygon>
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
        </gmd:polygon>
    </gmd:EX_BoundingPolygon>
</gmd:geographicElement>`)
          )
          pipe(
            findIdentification(),
            findNestedElement('gmd:extent', 'gmd:EX_Extent'),
            removeChildrenByName('gmd:geographicElement'),
            appendChildren(() => spatialExtent)
          )(recordRootEl)
        })
        it('returns an array of spatial extents with geometries, bbox and description', () => {
          expect(readSpatialExtents(recordRootEl)).toEqual([
            {
              geometry: {
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
              },
              bbox: [
                6.75599105586694, 45.7887442565203, 10.5418236945627,
                47.5175655551557,
              ],
              description: 'AK',
              translations: {},
            },
          ])
        })
      })
      describe('three spatial extents, first with description, second with bbox, third with geometry', () => {
        it('returns an array of partial spatial extents with geometries, bbox and description', () => {
          expect(readSpatialExtents(recordRootEl)).toEqual([
            {
              description: 'AK',
              translations: {
                description: {
                  de: 'AK',
                  en: 'AC',
                  fr: 'CA',
                  it: 'CA',
                  rm: 'null',
                },
              },
            },
            {
              bbox: [
                6.75599105586694, 45.7887442565203, 10.5418236945627,
                47.5175655551557,
              ],
              translations: {},
            },
            {
              geometry: {
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
              },
              translations: {},
            },
          ])
        })
      })
      describe('one empty spatial extent', () => {
        beforeEach(() => {
          const spatialExtent = getRootElement(
            parseXmlString(`
<gmd:geographicElement>
  <gmd:EX_BoundingPolygon>
    <gmd:polygon/>
  </gmd:EX_BoundingPolygon>
</gmd:geographicElement>`)
          )
          pipe(
            findIdentification(),
            findNestedElement('gmd:extent', 'gmd:EX_Extent'),
            removeChildrenByName('gmd:geographicElement'),
            appendChildren(() => spatialExtent)
          )(recordRootEl)
        })
        it('returns an empty array', () => {
          expect(readSpatialExtents(recordRootEl)).toEqual([])
        })
      })
    })
  })

  describe('service record', () => {
    beforeEach(() => {
      recordRootEl = getRootElement(parseXmlString(GEOCAT_CH_SERVICE))
    })
    describe('readOnlineResources', () => {
      it('returns an array of resources', () => {
        expect(readOnlineResources(recordRootEl)).toEqual([
          {
            description: 'Verkehrsregelungsanlagen',
            url: new URL('https://metadata.geo.sg.ch/produkte/170'),
            type: 'link',
            translations: {
              description: {
                de: 'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS',
                en: '',
              },
            },
          },
          {
            description: 'Geometadaten Kanton St.Gallen',
            url: new URL('https://metadata.geo.sg.ch/'),
            type: 'link',
            translations: {
              description: {
                de: 'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS',
                en: '',
              },
            },
          },
          {
            description:
              'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS',
            url: new URL(
              'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS'
            ),
            accessServiceProtocol: 'wms',
            type: 'endpoint',
            translations: {
              description: {
                de: 'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS',
                en: '',
              },
            },
          },
        ])
      })

      describe('online resource without url', () => {
        beforeEach(() => {
          const resourceWithoutUrl = getRootElement(
            parseXmlString(`
<gmd:transferOptions>
    <gmd:MD_DigitalTransferOptions>
        <gmd:onLine>
            <gmd:CI_OnlineResource>
                <gmd:linkage>
                    <gmd:URL/>
                </gmd:linkage>
                <gmd:protocol>
                    <gmx:MimeFileType>WWW:LINK-1.0-http--link</gmx:MimeFileType>
                </gmd:protocol>
                <gmd:function>
                    <gmd:CI_OnLineFunctionCode codeListValue="information" codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode" />
                </gmd:function>
            </gmd:CI_OnlineResource>
        </gmd:onLine>
    </gmd:MD_DigitalTransferOptions>
</gmd:transferOptions>`)
          )
          pipe(
            findNestedElement('gmd:distributionInfo', 'gmd:MD_Distribution'),
            removeChildrenByName('gmd:transferOptions'),
            appendChildren(() => resourceWithoutUrl)
          )(recordRootEl)
        })
        it('returns an array of online resources with empty url', () => {
          expect(readOnlineResources(recordRootEl)).toEqual([
            {
              url: new URL('http://missing'),
              type: 'link',
              translations: {},
            },
          ])
        })
      })
    })
  })
})
