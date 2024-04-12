import { GENERIC_DATASET_RECORD } from '../fixtures/generic.records'
import { writeContactsForResource, writeDistributions } from './write-parts'
import {
  createElement,
  getRootElement,
  parseXmlString,
  xmlToString,
} from '../xml-utils'
import { XmlElement } from '@rgrove/parse-xml'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

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

  describe('writeDistributions', () => {
    const distributionShp = GENERIC_DATASET_RECORD.distributions[0]
    const distributionLink = GENERIC_DATASET_RECORD.distributions[2]

    it('writes one distributionInfo per link, format in iso19115-3, reuses a distribution info with distributor contact', () => {
      datasetRecord = {
        ...datasetRecord,
        contactsForResource: [
          {
            role: 'distributor',
            firstName: 'Jim',
            email: 'jim@mail.org',
            organization: {
              name: 'Org',
            },
          },
        ],
        distributions: [distributionShp, distributionLink],
      }
      writeContactsForResource(datasetRecord, rootEl)
      writeDistributions(datasetRecord, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification/>
    </gmd:identificationInfo>
    <gmd:distributionInfo>
        <gmd:MD_Distribution>
            <mrd:distributor>
                <mrd:MD_Distributor>
                    <mrd:distributorContact>
                        <cit:CI_Responsibility>
                            <cit:role>
                                <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="distributor">distributor</cit:CI_RoleCode>
                            </cit:role>
                            <cit:party>
                                <cit:CI_Organisation>
                                    <cit:name>
                                        <gco:CharacterString>Org</gco:CharacterString>
                                    </cit:name>
                                    <cit:contactInfo>
                                        <cit:CI_Contact>
                                            <cit:address>
                                                <cit:CI_Address>
                                                    <cit:electronicMailAddress>
                                                        <gco:CharacterString>jim@mail.org</gco:CharacterString>
                                                    </cit:electronicMailAddress>
                                                </cit:CI_Address>
                                            </cit:address>
                                        </cit:CI_Contact>
                                    </cit:contactInfo>
                                    <cit:individual>
                                        <cit:CI_Individual>
                                            <cit:name>
                                                <gco:CharacterString>Jim</gco:CharacterString>
                                            </cit:name>
                                        </cit:CI_Individual>
                                    </cit:individual>
                                </cit:CI_Organisation>
                            </cit:party>
                        </cit:CI_Responsibility>
                    </mrd:distributorContact>
                </mrd:MD_Distributor>
            </mrd:distributor>
            <mrd:distributionFormat>
                <mrd:MD_Format>
                    <mrd:formatSpecificationCitation>
                        <cit:CI_Citation>
                            <cit:title>
                                <gco:CharacterString>x-gis/x-shapefile</gco:CharacterString>
                            </cit:title>
                        </cit:CI_Citation>
                    </mrd:formatSpecificationCitation>
                </mrd:MD_Format>
            </mrd:distributionFormat>
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

    it('removes existing ones, keeping distributor info if not empty', () => {
      // add some distributions first
      const sample = parseXmlString(`<root>
    <gmd:distributionInfo xmlns:comp="http://www.geocat.ch/2003/05/gateway/GM03Comprehensive" xmlns:xalan="http://xml.apache.org/xalan" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:che="http://www.geocat.ch/2008/che" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:gts="http://www.isotc211.org/2005/gts" xmlns:gsr="http://www.isotc211.org/2005/gsr" xmlns:gmi="http://www.isotc211.org/2005/gmi" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xlink="http://www.w3.org/1999/xlink">
        <gmd:MD_Distribution>
            <mrd:distributor>
                <mrd:MD_Distributor>
                    <mrd:distributorContact>
                        <cit:CI_Responsibility>
                            <cit:role>
                                <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="distributor">distributor</cit:CI_RoleCode>
                            </cit:role>
                            <cit:party>
                                <cit:CI_Organisation>
                                    <cit:name>
                                        <gco:CharacterString>Org</gco:CharacterString>
                                    </cit:name>
                                    <cit:contactInfo>
                                        <cit:CI_Contact>
                                            <cit:address>
                                                <cit:CI_Address>
                                                    <cit:electronicMailAddress>
                                                        <gco:CharacterString>jim@mail.org</gco:CharacterString>
                                                    </cit:electronicMailAddress>
                                                </cit:CI_Address>
                                            </cit:address>
                                        </cit:CI_Contact>
                                    </cit:contactInfo>
                                    <cit:individual>
                                        <cit:CI_Individual>
                                            <cit:name>
                                                <gco:CharacterString>Jim</gco:CharacterString>
                                            </cit:name>
                                        </cit:CI_Individual>
                                    </cit:individual>
                                </cit:CI_Organisation>
                            </cit:party>
                        </cit:CI_Responsibility>
                    </mrd:distributorContact>
                </mrd:MD_Distributor>
            </mrd:distributor>
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
      writeDistributions(
        {
          ...datasetRecord,
          contactsForResource: [],
          distributions: [distributionLink],
        },
        rootEl
      )
      expect(rootAsString()).toEqual(`<root>
    <gmd:distributionInfo xmlns:comp="http://www.geocat.ch/2003/05/gateway/GM03Comprehensive" xmlns:xalan="http://xml.apache.org/xalan" xmlns:geonet="http://www.fao.org/geonetwork" xmlns:che="http://www.geocat.ch/2008/che" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:gmx="http://www.isotc211.org/2005/gmx" xmlns:gts="http://www.isotc211.org/2005/gts" xmlns:gsr="http://www.isotc211.org/2005/gsr" xmlns:gmi="http://www.isotc211.org/2005/gmi" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xlink="http://www.w3.org/1999/xlink">
        <gmd:MD_Distribution>
            <mrd:distributor>
                <mrd:MD_Distributor>
                    <mrd:distributorContact>
                        <cit:CI_Responsibility>
                            <cit:role>
                                <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="distributor">distributor</cit:CI_RoleCode>
                            </cit:role>
                            <cit:party>
                                <cit:CI_Organisation>
                                    <cit:name>
                                        <gco:CharacterString>Org</gco:CharacterString>
                                    </cit:name>
                                    <cit:contactInfo>
                                        <cit:CI_Contact>
                                            <cit:address>
                                                <cit:CI_Address>
                                                    <cit:electronicMailAddress>
                                                        <gco:CharacterString>jim@mail.org</gco:CharacterString>
                                                    </cit:electronicMailAddress>
                                                </cit:CI_Address>
                                            </cit:address>
                                        </cit:CI_Contact>
                                    </cit:contactInfo>
                                    <cit:individual>
                                        <cit:CI_Individual>
                                            <cit:name>
                                                <gco:CharacterString>Jim</gco:CharacterString>
                                            </cit:name>
                                        </cit:CI_Individual>
                                    </cit:individual>
                                </cit:CI_Organisation>
                            </cit:party>
                        </cit:CI_Responsibility>
                    </mrd:distributorContact>
                </mrd:MD_Distributor>
            </mrd:distributor>
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
  })
})
