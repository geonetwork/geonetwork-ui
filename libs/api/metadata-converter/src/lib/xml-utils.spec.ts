import {
  getRootElement,
  parseXmlString,
  renameElements,
  xmlToString,
} from './xml-utils'
import { XmlElement } from '@rgrove/parse-xml'

describe('xml utils', () => {
  describe('xmlToString', () => {
    it('keeps the XML unchanged when parsing and transforming back to string', () => {
      const input = `<?xml version="1.0" encoding="UTF-8"?>
<MD_Metadata xmlns:gfc="http://www.isotc211.org/2005/gfc" xmlns:gml="http://www.opengis.net/gml/3.2">
    <gmd:fileIdentifier>
        <gco:CharacterString>my-dataset-001</gco:CharacterString>
    </gmd:fileIdentifier>
    <gmd:language>
        <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="fre"/>
    </gmd:language>
    <gmd:CI_ResponsibleParty>
        <gmd:organisationName>
            <gco:CharacterString>Text on...
several lines
####
end.
            </gco:CharacterString>
        </gmd:organisationName>
        <gmd:date>
            <gco:Date>2022-09-01T14:18:19</gco:Date>
        </gmd:date>
        <gmd:dateType>
            <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="creation"/>
        </gmd:dateType>
    </gmd:CI_ResponsibleParty>
</MD_Metadata>
`
      const doc = parseXmlString(input)
      expect(xmlToString(doc)).toEqual(input)
    })
  })

  describe('replaceNamespace', () => {
    let rootEl: XmlElement
    beforeEach(() => {
      rootEl = getRootElement(
        parseXmlString(`
<gmd:MD_Metadata>
    <gmd:locale>
        <gmd:PT_Locale id="FR">
            <gmd:languageCode>
                <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="fre"/>
            </gmd:languageCode>
            <gmd:characterEncoding>
                <gmd:MD_CharacterSetCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode" codeListValue="utf8"/>
            </gmd:characterEncoding>
        </gmd:PT_Locale>
    </gmd:locale>
    <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
            <gmd:citation>
                <gmd:CI_Citation>
                    <gmd:title xsi:type="gmd:PT_FreeText_PropertyType">
                        <gco:CharacterString>Alpenkonvention</gco:CharacterString>
                        <gmd:PT_FreeText>
                            <gmd:textGroup>
                                <gmd:LocalisedCharacterString locale="#DE">Alpenkonvention</gmd:LocalisedCharacterString>
                            </gmd:textGroup>
                            <gmd:textGroup>
                                <gmd:LocalisedCharacterString locale="#FR">Convention des Alpes</gmd:LocalisedCharacterString>
                            </gmd:textGroup>
                            <gmd:textGroup>
                                <gmd:LocalisedCharacterString locale="#IT">Convenzione delle alpi</gmd:LocalisedCharacterString>
                            </gmd:textGroup>
                            <gmd:textGroup>
                                <gmd:LocalisedCharacterString locale="#EN">Alpine Convention</gmd:LocalisedCharacterString>
                            </gmd:textGroup>
                            <gmd:textGroup>
                                <gmd:LocalisedCharacterString locale="#RM">Convenziun da las Alps</gmd:LocalisedCharacterString>
                            </gmd:textGroup>
                        </gmd:PT_FreeText>
                    </gmd:title>
                </gmd:CI_Citation>
            </gmd:citation>
        </gmd:MD_DataIdentification>
    </gmd:identificationInfo>
</gmd:MD_Metadata>`)
      )
      rootEl = renameElements(rootEl, {
        gmd: 'mdb',
        'gmd:PT_Locale': 'lan:PT_Locale',
        'gmd:languageCode': 'lan:languageCode',
        'gmd:LanguageCode': 'lan:LanguageCode',
        'gmd:characterEncoding': 'lan:characterEncoding',
        'gmd:MD_CharacterSetCode': 'lan:MD_CharacterSetCode',
        'gmd:MD_DataIdentification': 'mri:MD_DataIdentification',
        'gmd:citation': 'mri:citation',
        'gmd:CI_Citation': 'cit:CI_Citation',
        'gmd:title': 'cit:title',
      })
    })

    it('renames elements according to given map', () => {
      expect(xmlToString(rootEl)).toEqual(`
<mdb:MD_Metadata>
    <mdb:locale>
        <lan:PT_Locale id="FR">
            <lan:languageCode>
                <lan:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="fre"/>
            </lan:languageCode>
            <lan:characterEncoding>
                <lan:MD_CharacterSetCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode" codeListValue="utf8"/>
            </lan:characterEncoding>
        </lan:PT_Locale>
    </mdb:locale>
    <mdb:identificationInfo>
        <mri:MD_DataIdentification>
            <mri:citation>
                <cit:CI_Citation>
                    <cit:title xsi:type="gmd:PT_FreeText_PropertyType">
                        <gco:CharacterString>Alpenkonvention</gco:CharacterString>
                        <mdb:PT_FreeText>
                            <mdb:textGroup>
                                <mdb:LocalisedCharacterString locale="#DE">Alpenkonvention</mdb:LocalisedCharacterString>
                            </mdb:textGroup>
                            <mdb:textGroup>
                                <mdb:LocalisedCharacterString locale="#FR">Convention des Alpes</mdb:LocalisedCharacterString>
                            </mdb:textGroup>
                            <mdb:textGroup>
                                <mdb:LocalisedCharacterString locale="#IT">Convenzione delle alpi</mdb:LocalisedCharacterString>
                            </mdb:textGroup>
                            <mdb:textGroup>
                                <mdb:LocalisedCharacterString locale="#EN">Alpine Convention</mdb:LocalisedCharacterString>
                            </mdb:textGroup>
                            <mdb:textGroup>
                                <mdb:LocalisedCharacterString locale="#RM">Convenziun da las Alps</mdb:LocalisedCharacterString>
                            </mdb:textGroup>
                        </mdb:PT_FreeText>
                    </cit:title>
                </cit:CI_Citation>
            </mri:citation>
        </mri:MD_DataIdentification>
    </mdb:identificationInfo>
</mdb:MD_Metadata>
`)
    })
  })
})
