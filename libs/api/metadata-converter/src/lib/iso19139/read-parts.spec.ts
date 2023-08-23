/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import GEO2FRANCE_PLU_DATASET from '../fixtures/geo2france.iso19139.plu.xml'
// @ts-ignore
import GEOCAT_CH_DATASET from '../fixtures/geocat-ch.iso19139.dataset.xml'
// @ts-ignore
import GEOCAT_CH_SERVICE from '../fixtures/geocat-ch.iso19139.service.xml'
import {
  readContacts,
  readDistributions,
  readOnlineResources,
  readOwnerOrganization,
} from './read-parts'
import {
  appendChildren,
  findNestedElement,
  getRootElement,
  parseXmlString,
  removeChildrenByName,
} from '../xml-utils'
import { pipe } from '../function-utils'
import { XmlElement } from '@rgrove/parse-xml'

describe('read parts', () => {
  let recordRootEl: XmlElement

  describe('common functions', () => {
    beforeEach(() => {
      recordRootEl = getRootElement(parseXmlString(GEOCAT_CH_DATASET))
    })
    describe('readContacts', () => {
      it('returns an array of individuals with their organization', () => {
        expect(readContacts(recordRootEl)).toEqual([
          {
            email: 'rolf.giezendanner@are.admin.ch',
            organization: {
              name: 'Bundesamt für Raumentwicklung',
            },
            role: 'point_of_contact',
          },
          {
            email: 'info@are.admin.ch',
            organization: {
              name: 'Bundesamt für Raumentwicklung',
            },
            role: 'owner',
          },
        ])
      })
    })
    describe('readOwnerOrganization', () => {
      it('returns an organization without website', () => {
        expect(readOwnerOrganization(recordRootEl)).toEqual({
          name: 'Bundesamt für Raumentwicklung',
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
          })
        })
      })
    })
  })

  describe('dataset record', () => {
    beforeEach(() => {
      recordRootEl = getRootElement(parseXmlString(GEOCAT_CH_DATASET))
    })
    describe('readDistributions', () => {
      it('returns an array of distributions', () => {
        expect(readDistributions(recordRootEl)).toEqual([
          {
            description: 'Vorschau map.geo.admin.ch',
            url: new URL(
              'https://map.geo.admin.ch/?layers=ch.are.alpenkonvention'
            ),
            name: 'Vorschau map.geo.admin.ch',
            type: 'link',
          },
          {
            description: 'Webseite des ARE über die Alpenkonvention',
            url: new URL(
              'https://www.are.admin.ch/are/de/home/laendliche-raeume-und-berggebiete/internationale-zusammenarbeit/alpenkonvention.html'
            ),
            type: 'link',
          },
          {
            description: 'Download von data.geo.admin.ch',
            url: new URL(
              'https://data.geo.admin.ch/browser/index.html#/collections/ch.are.alpenkonvention'
            ),
            mimeType: 'x-gis/x-shapefile',
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
            type: 'service',
          },
          {
            description: 'Minimales Geodatenmodell in INTERLIS 2.3',
            url: new URL(
              'https://www.are.admin.ch/are/de/home/raumentwicklung-und-raumplanung/grundlagen-und-daten/minimale-geodatenmodelle/alpenkonvention.html'
            ),
            mimeType: 'x-gis/x-shapefile',
            type: 'download',
          },
          {
            description: 'Web-GIS ARE',
            url: new URL(
              'http://map.are.admin.ch/?Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-grau&layers=ch.are.alpenkonvention&layers_opacity=0.2&layers_visibility=true&lang=de'
            ),
            type: 'link',
          },
          {
            description: 'Offizielle Homepage der Alpenkonvention',
            url: new URL('http://www.alpconv.org/'),
            type: 'link',
          },
          {
            description: 'Die Alpenkonvention im Bundesgeoportal',
            url: new URL(
              'http://map.geo.admin.ch/?selectedNode=LT1_1&Y=660000&X=190000&zoom=1&bgLayer=ch.swisstopo.pixelkarte-farbe&layers=ch.are.alpenkonvention&layers_opacity=0.6&layers_visibility=true&lang=de'
            ),
            type: 'link',
          },
          {
            description:
              'Liste der administrativen Einheiten des Alpenraumes in der schweizerischen Eidgenossenschaft',
            url: new URL('http://www.admin.ch/ch/d/sr/0_700_1/app1.html'),
            type: 'link',
          },
          {
            accessServiceProtocol: 'esriRest',
            url: new URL(
              'https://api3.geo.admin.ch/rest/services/api/MapServer/ch.are.alpenkonvention'
            ),
            description: 'RESTful API von geo.admin.ch',
            name: 'RESTful API von geo.admin.ch',
            type: 'service',
          },
          {
            description: 'Permalink opendata.swiss',
            url: new URL(
              'https://opendata.swiss/de/perma/8698bf0b-fceb-4f0f-989b-111e7c4af0a4@bundesamt-fur-raumentwicklung-are'
            ),
            name: 'Permalink opendata.swiss',
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
        it('returns an array of distributions with empty url', () => {
          expect(readDistributions(recordRootEl)).toEqual([
            {
              url: new URL('http://missing'),
              mimeType: 'x-gis/x-shapefile',
              type: 'download',
            },
          ])
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
          },
          {
            description: 'Geometadaten Kanton St.Gallen',
            url: new URL('https://metadata.geo.sg.ch/'),
            type: 'link',
          },
          {
            description:
              'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS',
            endpointUrl: new URL(
              'https://services.geo.sg.ch/wss/service/SG00170_WMS/guest?request=GetCapabilities&service=WMS'
            ),
            protocol: 'wms',
            type: 'endpoint',
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
                    <gco:CharacterString>WWW:LINK-1.0-http--link</gco:CharacterString>
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
        it('returns an array of distributions with empty url', () => {
          expect(readOnlineResources(recordRootEl)).toEqual([
            {
              url: new URL('http://missing'),
              type: 'link',
            },
          ])
        })
      })
    })
  })
})
