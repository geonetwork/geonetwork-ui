import { parseXmlString, xmlToString } from './xml-utils'

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
})
