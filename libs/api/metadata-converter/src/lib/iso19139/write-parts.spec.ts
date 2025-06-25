import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import { XmlElement } from '@rgrove/parse-xml'
import { GENERIC_DATASET_RECORD } from '../fixtures/generic.records'
import {
  createElement,
  getRootElement,
  parseXmlString,
  xmlToString,
} from '../xml-utils'
import {
  getISODuration,
  writeContacts,
  writeContactsForResource,
  writeDefaultLanguage,
  writeKeywords,
  writeLanguages,
  writeLegalConstraints,
  writeOnlineResources,
  writeOtherConstraints,
  writeResourceCreated,
  writeResourcePublished,
  writeResourceUpdated,
  writeSecurityConstraints,
  writeSpatialExtents,
  writeSpatialRepresentation,
  writeTemporalExtents,
} from './write-parts'

describe('write parts', () => {
  let rootEl: XmlElement
  let datasetRecord: DatasetRecord

  function rootAsString() {
    return xmlToString(rootEl).trim()
  }

  beforeEach(() => {
    rootEl = createElement('root')()
    datasetRecord = { ...GENERIC_DATASET_RECORD }
  })

  describe('write dates', () => {
    it('writes the record dates', () => {
      const modified = {
        ...datasetRecord,
        resourcePublished: new Date('2024-01-01T00:00:00'),
      }
      writeResourceCreated(modified, rootEl)
      writeResourceUpdated(modified, rootEl)
      writeResourcePublished(modified, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:citation>
                <gmd:CI_Citation>
                    <gmd:date>
                        <gmd:CI_Date>
                            <gmd:date>
                                <gco:DateTime>2022-09-01T14:18:19</gco:DateTime>
                            </gmd:date>
                            <gmd:dateType>
                                <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="creation"/>
                            </gmd:dateType>
                        </gmd:CI_Date>
                    </gmd:date>
                    <gmd:date>
                        <gmd:CI_Date>
                            <gmd:date>
                                <gco:DateTime>2022-12-04T15:12:00</gco:DateTime>
                            </gmd:date>
                            <gmd:dateType>
                                <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="revision"/>
                            </gmd:dateType>
                        </gmd:CI_Date>
                    </gmd:date>
                    <gmd:date>
                        <gmd:CI_Date>
                            <gmd:date>
                                <gco:DateTime>2024-01-01T00:00:00</gco:DateTime>
                            </gmd:date>
                            <gmd:dateType>
                                <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication"/>
                            </gmd:dateType>
                        </gmd:CI_Date>
                    </gmd:date>
                </gmd:CI_Citation>
            </gmd:citation>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
    it('delete date if the date is not present in the record', () => {
      // first write dates
      writeResourceCreated(datasetRecord, rootEl)
      writeResourceUpdated(datasetRecord, rootEl)
      const modified = {
        ...datasetRecord,
        resourceUpdated: null,
        resourceCreated: null,
        resourcePublished: null,
      }
      writeResourceCreated(modified, rootEl)
      writeResourceUpdated(modified, rootEl)
      writeResourcePublished(modified, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:citation>
                <gmd:CI_Citation/>
            </gmd:citation>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
  })

  describe('writeOnlineResources', () => {
    const distributionShp = GENERIC_DATASET_RECORD.onlineResources[0]
    const distributionLink = GENERIC_DATASET_RECORD.onlineResources[2]

    it('writes several online resources', () => {
      writeOnlineResources(
        {
          ...datasetRecord,
          onlineResources: [distributionShp, distributionLink],
        },
        rootEl
      )
      expect(rootAsString()).toEqual(`<root>
    <gmd:distributionInfo>
        <gmd:MD_Distribution>
            <gmd:distributionFormat>
                <gmd:MD_Format>
                    <gmd:name>
                        <gco:CharacterString>x-gis/x-shapefile</gco:CharacterString>
                    </gmd:name>
                    <gmd:version>
                        <gco:CharacterString>1.0</gco:CharacterString>
                    </gmd:version>
                </gmd:MD_Format>
            </gmd:distributionFormat>
            <gmd:transferOptions>
                <gmd:MD_DigitalTransferOptions>
                    <gmd:onLine>
                        <gmd:CI_OnlineResource>
                            <gmd:linkage>
                                <gmd:URL>http://my-org.net/download/1.zip</gmd:URL>
                            </gmd:linkage>
                            <gmd:description>
                                <gco:CharacterString>Dataset downloaded as a shapefile</gco:CharacterString>
                            </gmd:description>
                            <gmd:name>
                                <gco:CharacterString>Direct download</gco:CharacterString>
                            </gmd:name>
                            <gmd:protocol>
                                <gco:CharacterString>WWW:DOWNLOAD</gco:CharacterString>
                            </gmd:protocol>
                            <gmd:function>
                                <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="download"/>
                            </gmd:function>
                        </gmd:CI_OnlineResource>
                    </gmd:onLine>
                </gmd:MD_DigitalTransferOptions>
            </gmd:transferOptions>
        </gmd:MD_Distribution>
    </gmd:distributionInfo>
    <gmd:distributionInfo>
        <gmd:MD_Distribution>
            <gmd:transferOptions>
                <gmd:MD_DigitalTransferOptions>
                    <gmd:onLine>
                        <gmd:CI_OnlineResource>
                            <gmd:linkage>
                                <gmd:URL>https://my-org.net/docs/1234.pdf</gmd:URL>
                            </gmd:linkage>
                            <gmd:description>
                                <gco:CharacterString>A link to the online documentation in PDF; please forgive the typos.</gco:CharacterString>
                            </gmd:description>
                            <gmd:name>
                                <gco:CharacterString>Documentation</gco:CharacterString>
                            </gmd:name>
                            <gmd:protocol>
                                <gco:CharacterString>WWW:LINK</gco:CharacterString>
                            </gmd:protocol>
                            <gmd:function>
                                <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="information"/>
                            </gmd:function>
                        </gmd:CI_OnlineResource>
                    </gmd:onLine>
                </gmd:MD_DigitalTransferOptions>
            </gmd:transferOptions>
        </gmd:MD_Distribution>
    </gmd:distributionInfo>
</root>`)
    })

    it('removes existing ones', () => {
      // add some online resources first
      const sample = parseXmlString(`
<root>
    <gmd:distributionInfo xmlns:comp="http://www.geocat.ch/2003/05/gateway/GM03Comprehensive" xmlns:xalan="http://xml.apache.org/xalan" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:che="http://www.geocat.ch/2008/che" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:gts="http://www.isotc211.org/2005/gts" xmlns:gsr="http://www.isotc211.org/2005/gsr" xmlns:gmi="http://www.isotc211.org/2005/gmi" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xlink="http://www.w3.org/1999/xlink">
        <gmd:MD_Distribution>
            <gmd:distributionFormat xlink:show="embed" uuidref="5533f00e-57f9-4f4d-b2a2-560fee4b32ad" xlink:href="local://srv/api/registries/entries/5533f00e-57f9-4f4d-b2a2-560fee4b32ad?lang=ger,fre,ita,eng,roh&amp;">
                <gmd:MD_Format>
                    <gmd:name>
                        <gco:CharacterString>ESRI Shapefile</gco:CharacterString>
                    </gmd:name>
                    <gmd:version>
                        <gco:CharacterString>-</gco:CharacterString>
                    </gmd:version>
                </gmd:MD_Format>
            </gmd:distributionFormat>
            <gmd:transferOptions>
                <gmd:MD_DigitalTransferOptions>
                    <gmd:onLine>
                        <gmd:CI_OnlineResource>
                            <gmd:linkage>
                                <gmd:URL>https://map.geo.admin.ch/?layers=ch.are.alpenkonvention</gmd:URL>
                            </gmd:linkage>
                            <gmd:protocol>
                                <gco:CharacterString>MAP:Preview</gco:CharacterString>
                            </gmd:protocol>
                            <gmd:name xsi:type="gmd:PT_FreeText_PropertyType">
                                <gco:CharacterString>Vorschau map.geo.admin.ch</gco:CharacterString>
                                <gmd:PT_FreeText>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#DE">Vorschau map.geo.admin.ch</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#FR">Aperçu map.geo.admin.ch</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#IT">Previsione map.geo.admin.ch</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#EN">Preview map.geo.admin.ch</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                </gmd:PT_FreeText>
                            </gmd:name>
                            <gmd:description xsi:type="gmd:PT_FreeText_PropertyType">
                                <gco:CharacterString>Vorschau map.geo.admin.ch</gco:CharacterString>
                                <gmd:PT_FreeText>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#DE">Vorschau map.geo.admin.ch</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#FR">Aperçu map.geo.admin.ch</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#IT">Previsione map.geo.admin.ch</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#EN">Preview map.geo.admin.ch</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                </gmd:PT_FreeText>
                            </gmd:description>
                        </gmd:CI_OnlineResource>
                    </gmd:onLine>
                </gmd:MD_DigitalTransferOptions>
            </gmd:transferOptions>
        </gmd:MD_Distribution>
    </gmd:distributionInfo>
    <gmd:distributionInfo>
        <gmd:MD_Distribution>
            <gmd:transferOptions>
                <gmd:MD_DigitalTransferOptions>
                    <gmd:onLine>
                        <gmd:CI_OnlineResource>
                            <gmd:linkage>
                                <gmd:URL>https://my-org.net/wfs</gmd:URL>
                            </gmd:linkage>
                            <gmd:description>
                                <gco:CharacterString>This WFS service offers direct download capability</gco:CharacterString>
                            </gmd:description>
                            <gmd:name>
                                <gco:CharacterString>my:featuretype</gco:CharacterString>
                            </gmd:name>
                            <gmd:protocol>
                                <gco:CharacterString>OGC:WFS</gco:CharacterString>
                            </gmd:protocol>
                            <gmd:function>
                                <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="download"/>
                            </gmd:function>
                        </gmd:CI_OnlineResource>
                    </gmd:onLine>
                </gmd:MD_DigitalTransferOptions>
            </gmd:transferOptions>
        </gmd:MD_Distribution>
    </gmd:distributionInfo>
</root>`)
      rootEl = getRootElement(sample)
      writeOnlineResources(
        {
          ...datasetRecord,
          onlineResources: [
            {
              ...distributionLink,
              translations: {
                description: {
                  fr: "Un lien vers la documentation en ligne en PDF ; veuillez pardonner les fautes d'orthographes.",
                  de: 'Ein Link zur Online-Dokumentation im PDF-Format; Bitte verzeihen Sie die Tippfehler.',
                },
              },
            },
          ],
        },
        rootEl
      )
      expect(rootAsString()).toEqual(`<root>
    <gmd:distributionInfo>
        <gmd:MD_Distribution>
            <gmd:transferOptions>
                <gmd:MD_DigitalTransferOptions>
                    <gmd:onLine>
                        <gmd:CI_OnlineResource>
                            <gmd:linkage>
                                <gmd:URL>https://my-org.net/docs/1234.pdf</gmd:URL>
                            </gmd:linkage>
                            <gmd:description>
                                <gco:CharacterString>A link to the online documentation in PDF; please forgive the typos.</gco:CharacterString>
                                <gmd:PT_FreeText>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#EN">A link to the online documentation in PDF; please forgive the typos.</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#FR">Un lien vers la documentation en ligne en PDF ; veuillez pardonner les fautes d'orthographes.</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                    <gmd:textGroup>
                                        <gmd:LocalisedCharacterString locale="#DE">Ein Link zur Online-Dokumentation im PDF-Format; Bitte verzeihen Sie die Tippfehler.</gmd:LocalisedCharacterString>
                                    </gmd:textGroup>
                                </gmd:PT_FreeText>
                            </gmd:description>
                            <gmd:name>
                                <gco:CharacterString>Documentation</gco:CharacterString>
                            </gmd:name>
                            <gmd:protocol>
                                <gco:CharacterString>WWW:LINK</gco:CharacterString>
                            </gmd:protocol>
                            <gmd:function>
                                <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode" codeListValue="information"/>
                            </gmd:function>
                        </gmd:CI_OnlineResource>
                    </gmd:onLine>
                </gmd:MD_DigitalTransferOptions>
            </gmd:transferOptions>
        </gmd:MD_Distribution>
    </gmd:distributionInfo>
</root>`)
    })
  })

  describe('writeTemporalExtents', () => {
    it('removes and writes several temporal extents', () => {
      // add some temporal extents first
      const sample = parseXmlString(`
<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:extent>
                <gmd:EX_Extent>
                    <gmd:temporalElement>
                        <gmd:EX_TemporalExtent>
                            <gmd:extent>
                                <gml:TimePeriod>
                                    <gml:beginPosition>2021-01-01</gml:beginPosition>
                                    <gml:endPosition>2021-01-31</gml:endPosition>
                                </gml:TimePeriod>
                            </gmd:extent>
                        </gmd:EX_TemporalExtent>
                    </gmd:temporalElement>
                </gmd:EX_Extent>
            </gmd:extent>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
      rootEl = getRootElement(sample)
      writeTemporalExtents(
        {
          ...datasetRecord,
          temporalExtents: [
            {
              start: new Date('2024-05-24'),
              end: null,
            },
            {
              start: new Date('2024-05-30'),
            },
          ],
        },
        rootEl
      )
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:extent>
                <gmd:EX_Extent>
                    <gmd:temporalElement>
                        <gmd:EX_TemporalExtent>
                            <gmd:extent>
                                <gml:TimePeriod>
                                    <gml:beginPosition>2024-05-24</gml:beginPosition>
                                    <gml:endPosition indeterminatePosition="unknown"/>
                                </gml:TimePeriod>
                            </gmd:extent>
                        </gmd:EX_TemporalExtent>
                    </gmd:temporalElement>
                    <gmd:temporalElement>
                        <gmd:EX_TemporalExtent>
                            <gmd:extent>
                                <gml:TimeInstant>
                                    <gml:timePosition>2024-05-30</gml:timePosition>
                                </gml:TimeInstant>
                            </gmd:extent>
                        </gmd:EX_TemporalExtent>
                    </gmd:temporalElement>
                </gmd:EX_Extent>
            </gmd:extent>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
  })

  describe('writeSpatialExtents', () => {
    it('removes and writes several spatial extents', () => {
      // add some spatial extents first
      const sample = parseXmlString(`
<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:extent>
                <gmd:EX_Extent>
                    <gmd:geographicElement>
                        <gmd:EX_GeographicDescription>
                            <gmd:geographicIdentifier>
                                <gmd:MD_Identifier>
                                    <gmd:code>
                                        <gco:CharacterString>Some previous description</gco:CharacterString>
                                    </gmd:code>
                                </gmd:MD_Identifier>
                            </gmd:geographicIdentifier>
                        </gmd:EX_GeographicDescription>
                    </gmd:geographicElement>
                </gmd:EX_Extent>
            </gmd:extent>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
      rootEl = getRootElement(sample)
      writeSpatialExtents(
        {
          ...datasetRecord,
          spatialExtents: [
            {
              description: 'AK',
            },
            {
              bbox: [
                6.75599105586694, 45.7887442565203, 10.5418236945627,
                47.5175655551557,
              ],
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
            },
          ],
        },
        rootEl
      )
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:extent>
                <gmd:EX_Extent>
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
                    </gmd:geographicElement>
                    <gmd:geographicElement>
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
                    </gmd:geographicElement>
                    <gmd:geographicElement>
                        <gmd:EX_BoundingPolygon>
                            <gmd:polygon>
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
                            </gmd:polygon>
                        </gmd:EX_BoundingPolygon>
                    </gmd:geographicElement>
                </gmd:EX_Extent>
            </gmd:extent>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
  })

  describe('writeKeywords', () => {
    it('writes keywords grouped by thesaurus', () => {
      writeKeywords(datasetRecord, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="other"/>
                    </gmd:type>
                    <gmd:thesaurusName>
                        <gmd:CI_Citation>
                            <gmd:title>
                                <gco:CharacterString>geonetwork.thesaurus.local</gco:CharacterString>
                            </gmd:title>
                            <gmd:identifier>
                                <gmd:MD_Identifier>
                                    <gmd:code>
                                        <gco:CharacterString>geonetwork.thesaurus.local</gco:CharacterString>
                                    </gmd:code>
                                </gmd:MD_Identifier>
                            </gmd:identifier>
                        </gmd:CI_Citation>
                    </gmd:thesaurusName>
                    <gmd:keyword>
                        <gco:CharacterString>international</gco:CharacterString>
                    </gmd:keyword>
                    <gmd:keyword>
                        <gco:CharacterString>test</gco:CharacterString>
                    </gmd:keyword>
                    <gmd:keyword>
                        <gco:CharacterString>_another_keyword_</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
                    </gmd:type>
                    <gmd:thesaurusName>
                        <gmd:CI_Citation>
                            <gmd:title>
                                <gco:CharacterString>geonetwork.thesaurus.theme</gco:CharacterString>
                            </gmd:title>
                            <gmd:identifier>
                                <gmd:MD_Identifier>
                                    <gmd:code>
                                        <gco:CharacterString>geonetwork.thesaurus.theme</gco:CharacterString>
                                    </gmd:code>
                                </gmd:MD_Identifier>
                            </gmd:identifier>
                        </gmd:CI_Citation>
                    </gmd:thesaurusName>
                    <gmd:keyword>
                        <gco:CharacterString>test theme</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="place"/>
                    </gmd:type>
                    <gmd:thesaurusName>
                        <gmd:CI_Citation>
                            <gmd:title>
                                <gco:CharacterString>geonetwork.thesaurus.place</gco:CharacterString>
                            </gmd:title>
                            <gmd:identifier>
                                <gmd:MD_Identifier>
                                    <gmd:code>
                                        <gco:CharacterString>geonetwork.thesaurus.place</gco:CharacterString>
                                    </gmd:code>
                                </gmd:MD_Identifier>
                            </gmd:identifier>
                        </gmd:CI_Citation>
                    </gmd:thesaurusName>
                    <gmd:keyword>
                        <gco:CharacterString>test place</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
                    </gmd:type>
                    <gmd:keyword>
                        <gco:CharacterString>themeNoThesaurus</gco:CharacterString>
                    </gmd:keyword>
                    <gmd:keyword>
                        <gco:CharacterString>themeNoThesaurus 2</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="temporal"/>
                    </gmd:type>
                    <gmd:keyword>
                        <gco:CharacterString>temporalNoThesaurus</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })

    it('removes existing ones', () => {
      // add some keywords first
      const sample = parseXmlString(`
<root>
    <gmd:identificationInfo >
        <gmd:MD_DataIdentification>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:keyword>
                        <gco:CharacterString>Usage des sols</gco:CharacterString>
                    </gmd:keyword>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode"
                                                codeListValue="theme"/>
                    </gmd:type>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:keyword>
                        <gco:CharacterString>Bla</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
      rootEl = getRootElement(sample)
      writeKeywords(
        {
          ...datasetRecord,
          keywords: [
            {
              label: 'abcd',
              type: 'place',
              thesaurus: {
                id: 'abcd',
                url: new URL('http://abcd.com'),
                name: 'A thesaurus',
              },
            },
          ],
        },
        rootEl
      )
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="place"/>
                    </gmd:type>
                    <gmd:thesaurusName>
                        <gmd:CI_Citation>
                            <gmd:title>
                                <gco:CharacterString>A thesaurus</gco:CharacterString>
                            </gmd:title>
                            <gmd:identifier>
                                <gmd:MD_Identifier>
                                    <gmd:code>
                                        <gmx:Anchor xlink:href="http://abcd.com/">abcd</gmx:Anchor>
                                    </gmd:code>
                                </gmd:MD_Identifier>
                            </gmd:identifier>
                        </gmd:CI_Citation>
                    </gmd:thesaurusName>
                    <gmd:keyword>
                        <gco:CharacterString>abcd</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })

    it('correctly adds a thesaurus to an existing keyword', () => {
      // add some keywords first
      const sample = parseXmlString(`
<root>
    <gmd:identificationInfo >
        <gmd:MD_DataIdentification>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:keyword>
                        <gco:CharacterString>Usage des sols</gco:CharacterString>
                    </gmd:keyword>
                    <gmd:keyword>
                        <gco:CharacterString>Agriculture</gco:CharacterString>
                    </gmd:keyword>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode"
                                                codeListValue="theme"/>
                    </gmd:type>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
      rootEl = getRootElement(sample)
      writeKeywords(
        {
          ...datasetRecord,
          keywords: [
            {
              label: 'Usage des sols',
              type: 'theme',
            },
            {
              label: 'Agriculture',
              type: 'theme',
              thesaurus: {
                id: 'abcd',
                url: new URL('http://abcd.com'),
                name: 'A thesaurus',
              },
            },
          ],
        },
        rootEl
      )
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
                    </gmd:type>
                    <gmd:keyword>
                        <gco:CharacterString>Usage des sols</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
            <gmd:descriptiveKeywords>
                <gmd:MD_Keywords>
                    <gmd:type>
                        <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
                    </gmd:type>
                    <gmd:thesaurusName>
                        <gmd:CI_Citation>
                            <gmd:title>
                                <gco:CharacterString>A thesaurus</gco:CharacterString>
                            </gmd:title>
                            <gmd:identifier>
                                <gmd:MD_Identifier>
                                    <gmd:code>
                                        <gmx:Anchor xlink:href="http://abcd.com/">abcd</gmx:Anchor>
                                    </gmd:code>
                                </gmd:MD_Identifier>
                            </gmd:identifier>
                        </gmd:CI_Citation>
                    </gmd:thesaurusName>
                    <gmd:keyword>
                        <gco:CharacterString>Agriculture</gco:CharacterString>
                    </gmd:keyword>
                </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
  })

  describe('writeContacts', () => {
    it('works with incomplete contacts', () => {
      const contacts = [
        {
          firstName: 'John',
          role: 'point_of_contact',
          email: 'aaa@bbb.ccc',
        },
        {
          lastName: 'Doe',
          role: 'contributor',
          email: 'abc@def.ghi',
          organization: {
            name: 'ACME',
          },
        },
      ]
      const modified: DatasetRecord = {
        ...datasetRecord,
        contacts,
        contactsForResource: contacts,
      }
      writeContacts(modified, rootEl)
      writeContactsForResource(modified, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:contact>
        <gmd:CI_ResponsibleParty>
            <gmd:individualName>
                <gco:CharacterString>John</gco:CharacterString>
            </gmd:individualName>
            <gmd:contactInfo>
                <gmd:CI_Contact>
                    <gmd:address>
                        <gmd:CI_Address>
                            <gmd:electronicMailAddress>
                                <gco:CharacterString>aaa@bbb.ccc</gco:CharacterString>
                            </gmd:electronicMailAddress>
                        </gmd:CI_Address>
                    </gmd:address>
                </gmd:CI_Contact>
            </gmd:contactInfo>
            <gmd:role>
                <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode" codeListValue="pointOfContact"/>
            </gmd:role>
        </gmd:CI_ResponsibleParty>
    </gmd:contact>
    <gmd:contact>
        <gmd:CI_ResponsibleParty>
            <gmd:individualName>
                <gco:CharacterString>Doe</gco:CharacterString>
            </gmd:individualName>
            <gmd:organisationName>
                <gco:CharacterString>ACME</gco:CharacterString>
            </gmd:organisationName>
            <gmd:contactInfo>
                <gmd:CI_Contact>
                    <gmd:address>
                        <gmd:CI_Address>
                            <gmd:electronicMailAddress>
                                <gco:CharacterString>abc@def.ghi</gco:CharacterString>
                            </gmd:electronicMailAddress>
                        </gmd:CI_Address>
                    </gmd:address>
                </gmd:CI_Contact>
            </gmd:contactInfo>
            <gmd:role>
                <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode" codeListValue="contributor"/>
            </gmd:role>
        </gmd:CI_ResponsibleParty>
    </gmd:contact>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:pointOfContact>
                <gmd:CI_ResponsibleParty>
                    <gmd:individualName>
                        <gco:CharacterString>John</gco:CharacterString>
                    </gmd:individualName>
                    <gmd:contactInfo>
                        <gmd:CI_Contact>
                            <gmd:address>
                                <gmd:CI_Address>
                                    <gmd:electronicMailAddress>
                                        <gco:CharacterString>aaa@bbb.ccc</gco:CharacterString>
                                    </gmd:electronicMailAddress>
                                </gmd:CI_Address>
                            </gmd:address>
                        </gmd:CI_Contact>
                    </gmd:contactInfo>
                    <gmd:role>
                        <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode" codeListValue="pointOfContact"/>
                    </gmd:role>
                </gmd:CI_ResponsibleParty>
            </gmd:pointOfContact>
            <gmd:pointOfContact>
                <gmd:CI_ResponsibleParty>
                    <gmd:individualName>
                        <gco:CharacterString>Doe</gco:CharacterString>
                    </gmd:individualName>
                    <gmd:organisationName>
                        <gco:CharacterString>ACME</gco:CharacterString>
                    </gmd:organisationName>
                    <gmd:contactInfo>
                        <gmd:CI_Contact>
                            <gmd:address>
                                <gmd:CI_Address>
                                    <gmd:electronicMailAddress>
                                        <gco:CharacterString>abc@def.ghi</gco:CharacterString>
                                    </gmd:electronicMailAddress>
                                </gmd:CI_Address>
                            </gmd:address>
                        </gmd:CI_Contact>
                    </gmd:contactInfo>
                    <gmd:role>
                        <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode" codeListValue="contributor"/>
                    </gmd:role>
                </gmd:CI_ResponsibleParty>
            </gmd:pointOfContact>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
  })

  describe('getISODuration', () => {
    it('keeps a partial weekly period', () => {
      expect(
        getISODuration({
          updatedTimes: 3,
          per: 'week',
        })
      ).toEqual('P0Y0M2D')
      expect(
        getISODuration({
          updatedTimes: 2,
          per: 'week',
        })
      ).toEqual('P0Y0M3D')
    })
  })

  describe('writeSpatialRepresentation', () => {
    it('writes the corresponding element', () => {
      writeSpatialRepresentation(datasetRecord, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:spatialRepresentationType>
                <gmd:MD_SpatialRepresentationTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_SpatialRepresentationTypeCode" codeListValue="grid"/>
            </gmd:spatialRepresentationType>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
    it('clears the corresponding element if the record has no spatial representation', () => {
      writeSpatialRepresentation(datasetRecord, rootEl)
      const modified: DatasetRecord = {
        ...datasetRecord,
        spatialRepresentation: null,
      }
      writeSpatialRepresentation(modified, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification/>
    </gmd:identificationInfo>
</root>`)
    })
  })

  describe('write constraints', () => {
    it('writes elements without deleting others, remove empty constraints', () => {
      writeSecurityConstraints(datasetRecord, rootEl)
      writeLegalConstraints(datasetRecord, rootEl)
      writeOtherConstraints(datasetRecord, rootEl)
      writeLegalConstraints({ ...datasetRecord, legalConstraints: [] }, rootEl)
      writeOtherConstraints(
        {
          ...datasetRecord,
          otherConstraints: [
            {
              text: 'new constraint',
            },
          ],
        },
        rootEl
      )
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:resourceConstraints>
                <gmd:MD_SecurityConstraints>
                    <gmd:classification>
                        <gmd:MD_ClassificationCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ClassificationCode" codeListValue="restricted"/>
                    </gmd:classification>
                    <gmd:useLimitation>
                        <gmx:Anchor xlink:href="https://security.org/document.pdf">Contains sensitive information related to national defense</gmx:Anchor>
                        <gmd:PT_FreeText>
                            <gmd:textGroup>
                                <gmd:LocalisedCharacterString locale="#EN">Contains sensitive information related to national defense</gmd:LocalisedCharacterString>
                            </gmd:textGroup>
                            <gmd:textGroup>
                                <gmd:LocalisedCharacterString locale="#FR">Contient des informations sensibles liées à la défense nationale</gmd:LocalisedCharacterString>
                            </gmd:textGroup>
                        </gmd:PT_FreeText>
                    </gmd:useLimitation>
                </gmd:MD_SecurityConstraints>
            </gmd:resourceConstraints>
            <gmd:resourceConstraints>
                <gmd:MD_Constraints>
                    <gmd:useLimitation>
                        <gco:CharacterString>new constraint</gco:CharacterString>
                    </gmd:useLimitation>
                </gmd:MD_Constraints>
            </gmd:resourceConstraints>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
  })
  describe('writeLanguages + writeDefaultLanguage', () => {
    it('writes only default language when no otherLanguages provided', () => {
      datasetRecord.defaultLanguage = 'fr'
      datasetRecord.otherLanguages = []

      writeDefaultLanguage(datasetRecord, rootEl)
      writeLanguages(datasetRecord, rootEl)

      expect(rootAsString()).toEqual(`<root>
    <gmd:language>
        <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="fre"/>
    </gmd:language>
</root>`)
    })

    it('writes supported and unsupported other languages correctly', () => {
      datasetRecord.defaultLanguage = 'fr'
      datasetRecord.otherLanguages = ['en', 'de', 'it', 'aar']

      writeDefaultLanguage(datasetRecord, rootEl)
      writeLanguages(datasetRecord, rootEl)

      expect(rootAsString()).toEqual(`<root>
    <gmd:language>
        <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="fre"/>
    </gmd:language>
    <gmd:locale>
        <gmd:PT_Locale id="FR">
            <gmd:languageCode>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="fre"/>
            </gmd:languageCode>
        </gmd:PT_Locale>
    </gmd:locale>
    <gmd:locale>
        <gmd:PT_Locale id="EN">
            <gmd:languageCode>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="eng"/>
            </gmd:languageCode>
        </gmd:PT_Locale>
    </gmd:locale>
    <gmd:locale>
        <gmd:PT_Locale id="DE">
            <gmd:languageCode>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="ger"/>
            </gmd:languageCode>
        </gmd:PT_Locale>
    </gmd:locale>
    <gmd:locale>
        <gmd:PT_Locale id="IT">
            <gmd:languageCode>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="ita"/>
            </gmd:languageCode>
        </gmd:PT_Locale>
    </gmd:locale>
    <gmd:locale>
        <gmd:PT_Locale id="AAR">
            <gmd:languageCode>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="aar"/>
            </gmd:languageCode>
        </gmd:PT_Locale>
    </gmd:locale>
</root>`)
    })
  })
})
