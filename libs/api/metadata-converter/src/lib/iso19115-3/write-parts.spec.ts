import { GENERIC_DATASET_RECORD } from '../fixtures/generic.records'
import {
  writeContacts,
  writeContactsForResource,
  writeDefaultLanguage,
  writeOnlineResources,
  writeOtherLanguages,
  writeRecordCreated,
  writeResourceCreated,
  writeResourcePublished,
  writeResourceUpdated,
  writeSpatialRepresentation,
} from './write-parts'
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

  describe('write dates', () => {
    it('writes the record dates', () => {
      const modified = {
        ...datasetRecord,
        resourcePublished: new Date('2024-01-01T00:00:00'),
      }
      writeRecordCreated(modified, rootEl)
      writeResourceCreated(modified, rootEl)
      writeResourceUpdated(modified, rootEl)
      writeResourcePublished(modified, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <mdb:dateInfo>
        <cit:CI_Date>
            <cit:date>
                <gco:DateTime>2021-11-15T09:00:00</gco:DateTime>
            </cit:date>
            <cit:dateType>
                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="creation">creation</cit:CI_DateTypeCode>
            </cit:dateType>
        </cit:CI_Date>
    </mdb:dateInfo>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <mri:citation>
                <cit:CI_Citation>
                    <cit:date>
                        <cit:CI_Date>
                            <cit:date>
                                <gco:DateTime>2022-09-01T14:18:19</gco:DateTime>
                            </cit:date>
                            <cit:dateType>
                                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="creation">creation</cit:CI_DateTypeCode>
                            </cit:dateType>
                        </cit:CI_Date>
                    </cit:date>
                    <cit:date>
                        <cit:CI_Date>
                            <cit:date>
                                <gco:DateTime>2022-12-04T15:12:00</gco:DateTime>
                            </cit:date>
                            <cit:dateType>
                                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="revision">revision</cit:CI_DateTypeCode>
                            </cit:dateType>
                        </cit:CI_Date>
                    </cit:date>
                    <cit:date>
                        <cit:CI_Date>
                            <cit:date>
                                <gco:DateTime>2024-01-01T00:00:00</gco:DateTime>
                            </cit:date>
                            <cit:dateType>
                                <cit:CI_DateTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_DateTypeCode" codeListValue="publication">publication</cit:CI_DateTypeCode>
                            </cit:dateType>
                        </cit:CI_Date>
                    </cit:date>
                </cit:CI_Citation>
            </mri:citation>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
    it('delete date if the date is not present in the record', () => {
      // first write dates
      writeRecordCreated(datasetRecord, rootEl)
      writeResourceCreated(datasetRecord, rootEl)
      writeResourceUpdated(datasetRecord, rootEl)
      const modified = {
        ...datasetRecord,
        recordCreated: null,
        resourceUpdated: null,
        resourceCreated: null,
        resourcePublished: null,
      }
      writeRecordCreated(modified, rootEl)
      writeResourceCreated(modified, rootEl)
      writeResourceUpdated(modified, rootEl)
      writeResourcePublished(modified, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <mri:citation>
                <cit:CI_Citation/>
            </mri:citation>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
  })

  describe('writeOnlineResources', () => {
    const distributionShp = GENERIC_DATASET_RECORD.onlineResources[0]
    const distributionLink = GENERIC_DATASET_RECORD.onlineResources[2]

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
        onlineResources: [distributionShp, distributionLink],
      }
      writeContactsForResource(datasetRecord, rootEl)
      writeOnlineResources(datasetRecord, rootEl)
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
      // add some online resources first
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
      writeOnlineResources(
        {
          ...datasetRecord,
          contactsForResource: [],
          onlineResources: [distributionLink],
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
        <cit:CI_Responsibility>
            <cit:role>
                <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="pointOfContact">pointOfContact</cit:CI_RoleCode>
            </cit:role>
            <cit:party>
                <cit:CI_Organisation>
                    <cit:contactInfo>
                        <cit:CI_Contact>
                            <cit:address>
                                <cit:CI_Address>
                                    <cit:electronicMailAddress>
                                        <gco:CharacterString>aaa@bbb.ccc</gco:CharacterString>
                                    </cit:electronicMailAddress>
                                </cit:CI_Address>
                            </cit:address>
                        </cit:CI_Contact>
                    </cit:contactInfo>
                    <cit:individual>
                        <cit:CI_Individual>
                            <cit:name>
                                <gco:CharacterString>John</gco:CharacterString>
                            </cit:name>
                        </cit:CI_Individual>
                    </cit:individual>
                </cit:CI_Organisation>
            </cit:party>
        </cit:CI_Responsibility>
    </gmd:contact>
    <gmd:contact>
        <cit:CI_Responsibility>
            <cit:role>
                <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="contributor">contributor</cit:CI_RoleCode>
            </cit:role>
            <cit:party>
                <cit:CI_Organisation>
                    <cit:name>
                        <gco:CharacterString>ACME</gco:CharacterString>
                    </cit:name>
                    <cit:contactInfo>
                        <cit:CI_Contact>
                            <cit:address>
                                <cit:CI_Address>
                                    <cit:electronicMailAddress>
                                        <gco:CharacterString>abc@def.ghi</gco:CharacterString>
                                    </cit:electronicMailAddress>
                                </cit:CI_Address>
                            </cit:address>
                        </cit:CI_Contact>
                    </cit:contactInfo>
                    <cit:individual>
                        <cit:CI_Individual>
                            <cit:name>
                                <gco:CharacterString>Doe</gco:CharacterString>
                            </cit:name>
                        </cit:CI_Individual>
                    </cit:individual>
                </cit:CI_Organisation>
            </cit:party>
        </cit:CI_Responsibility>
    </gmd:contact>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <mri:pointOfContact>
                <cit:CI_Responsibility>
                    <cit:role>
                        <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="pointOfContact">pointOfContact</cit:CI_RoleCode>
                    </cit:role>
                    <cit:party>
                        <cit:CI_Organisation>
                            <cit:contactInfo>
                                <cit:CI_Contact>
                                    <cit:address>
                                        <cit:CI_Address>
                                            <cit:electronicMailAddress>
                                                <gco:CharacterString>aaa@bbb.ccc</gco:CharacterString>
                                            </cit:electronicMailAddress>
                                        </cit:CI_Address>
                                    </cit:address>
                                </cit:CI_Contact>
                            </cit:contactInfo>
                            <cit:individual>
                                <cit:CI_Individual>
                                    <cit:name>
                                        <gco:CharacterString>John</gco:CharacterString>
                                    </cit:name>
                                </cit:CI_Individual>
                            </cit:individual>
                        </cit:CI_Organisation>
                    </cit:party>
                </cit:CI_Responsibility>
            </mri:pointOfContact>
            <mri:pointOfContact>
                <cit:CI_Responsibility>
                    <cit:role>
                        <cit:CI_RoleCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode" codeListValue="contributor">contributor</cit:CI_RoleCode>
                    </cit:role>
                    <cit:party>
                        <cit:CI_Organisation>
                            <cit:name>
                                <gco:CharacterString>ACME</gco:CharacterString>
                            </cit:name>
                            <cit:contactInfo>
                                <cit:CI_Contact>
                                    <cit:address>
                                        <cit:CI_Address>
                                            <cit:electronicMailAddress>
                                                <gco:CharacterString>abc@def.ghi</gco:CharacterString>
                                            </cit:electronicMailAddress>
                                        </cit:CI_Address>
                                    </cit:address>
                                </cit:CI_Contact>
                            </cit:contactInfo>
                            <cit:individual>
                                <cit:CI_Individual>
                                    <cit:name>
                                        <gco:CharacterString>Doe</gco:CharacterString>
                                    </cit:name>
                                </cit:CI_Individual>
                            </cit:individual>
                        </cit:CI_Organisation>
                    </cit:party>
                </cit:CI_Responsibility>
            </mri:pointOfContact>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</root>`)
    })
  })

  describe('writeSpatialRepresentation', () => {
    it('writes the corresponding element', () => {
      writeSpatialRepresentation(datasetRecord, rootEl)
      expect(rootAsString()).toEqual(`<root>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <mri:spatialRepresentationType>
                <mcc:MD_SpatialRepresentationTypeCode codeList="https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_SpatialRepresentationTypeCode" codeListValue="grid">grid</mcc:MD_SpatialRepresentationTypeCode>
            </mri:spatialRepresentationType>
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
  describe('writeLanguages + writeDefaultLanguage', () => {
    it('writes only default language when no otherLanguages provided', () => {
      datasetRecord.defaultLanguage = 'fr'
      datasetRecord.otherLanguages = []

      writeDefaultLanguage(datasetRecord, rootEl)
      writeOtherLanguages(datasetRecord, rootEl)

      expect(rootAsString()).toEqual(`<root>
    <mdb:defaultLocale>
        <lan:PT_Locale id="FR">
            <lan:language>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="fre"/>
            </lan:language>
        </lan:PT_Locale>
    </mdb:defaultLocale>
</root>`)
    })

    it('writes supported and unsupported other languages correctly', () => {
      datasetRecord.defaultLanguage = 'fr'
      datasetRecord.otherLanguages = ['en', 'de', 'it', 'aar']

      writeDefaultLanguage(datasetRecord, rootEl)
      writeOtherLanguages(datasetRecord, rootEl)

      expect(rootAsString()).toEqual(`<root>
    <mdb:defaultLocale>
        <lan:PT_Locale id="FR">
            <lan:language>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="fre"/>
            </lan:language>
        </lan:PT_Locale>
    </mdb:defaultLocale>
    <mdb:otherLocale>
        <lan:PT_Locale id="EN">
            <lan:language>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="eng"/>
            </lan:language>
        </lan:PT_Locale>
    </mdb:otherLocale>
    <mdb:otherLocale>
        <lan:PT_Locale id="DE">
            <lan:language>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="ger"/>
            </lan:language>
        </lan:PT_Locale>
    </mdb:otherLocale>
    <mdb:otherLocale>
        <lan:PT_Locale id="IT">
            <lan:language>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="ita"/>
            </lan:language>
        </lan:PT_Locale>
    </mdb:otherLocale>
    <mdb:otherLocale>
        <lan:PT_Locale id="AAR">
            <lan:language>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="aar"/>
            </lan:language>
        </lan:PT_Locale>
    </mdb:otherLocale>
</root>`)
    })
  })
})
