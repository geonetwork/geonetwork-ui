import { getRootElement, parseXmlString } from '../xml-utils'
import {
  readContacts,
  readOwnerOrganization,
  readResourceContacts,
} from './read-parts'
import {
  Individual,
  Organization,
} from '@geonetwork-ui/common/domain/model/record'

describe('read parts', () => {
  describe('readContacts, readContactsForResource, readOwnerOrganization', () => {
    let contacts: Array<Individual>
    let contactsForResource: Array<Individual>
    let ownerOrg: Organization

    describe('all possible types of contacts', () => {
      beforeEach(() => {
        const withContacts = getRootElement(
          parseXmlString(`
<mdb:MD_Metadata>
  <mdb:contact>
    <cit:CI_Responsibility>
      <cit:role>
        <cit:CI_RoleCode codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode"
                 codeListValue="custodian"/>
      </cit:role>
      <cit:party>
        <cit:CI_Organisation>
          <cit:name>
            <gco:CharacterString>Direction Asset Management (SPW - Mobilité et Infrastructures - Direction Asset Management)</gco:CharacterString>
          </cit:name>
          <cit:contactInfo>
            <cit:CI_Contact>
              <cit:address>
                <cit:CI_Address>
                  <cit:deliveryPoint>
                    <gco:CharacterString>Boulevard du Nord, 8</gco:CharacterString>
                  </cit:deliveryPoint>
                  <cit:city>
                    <gco:CharacterString>Namur</gco:CharacterString>
                  </cit:city>
                  <cit:postalCode>
                    <gco:CharacterString>5000</gco:CharacterString>
                  </cit:postalCode>
                  <cit:country>
                    <gco:CharacterString>Belgique</gco:CharacterString>
                  </cit:country>
                  <cit:electronicMailAddress>
                    <gco:CharacterString>frederic.plumier@spw.wallonie.be</gco:CharacterString>
                  </cit:electronicMailAddress>
                </cit:CI_Address>
              </cit:address>
            </cit:CI_Contact>
          </cit:contactInfo>
          <cit:individual>
            <cit:CI_Individual>
              <cit:name>
                <gco:CharacterString>Frédéric Plumier</gco:CharacterString>
              </cit:name>
              <cit:positionName>
                <gco:CharacterString>Attaché</gco:CharacterString>
              </cit:positionName>
            </cit:CI_Individual>
          </cit:individual>
        </cit:CI_Organisation>
      </cit:party>
    </cit:CI_Responsibility>
  </mdb:contact>
  <mdb:contact>
    <cit:CI_Responsibility>
      <cit:role>
        <cit:CI_RoleCode 
          codeList="https://schemas.isotc211.org/19115/resources/Codelist/cat/codelists.xml#CI_RoleCode"
          codeListValue="owner"/>
      </cit:role>
      <cit:party>
        <cit:CI_Organisation>
          <cit:name>
            <gco:CharacterString>OpenWork Ltd</gco:CharacterString>
          </cit:name>
          <cit:contactInfo>
            <cit:CI_Contact>
              <cit:address>
                <cit:CI_Address>
                  <cit:electronicMailAddress>
                    <gco:CharacterString>name@email.org</gco:CharacterString>
                  </cit:electronicMailAddress>
                </cit:CI_Address>
              </cit:address>
            </cit:CI_Contact>
          </cit:contactInfo>
          <cit:individual>
            <cit:CI_Individual>
              <cit:name>
                <gco:CharacterString>Metadata Bob</gco:CharacterString>
              </cit:name>
              <cit:positionName gco:nilReason="missing">
                <gco:CharacterString/>
              </cit:positionName>
            </cit:CI_Individual>
          </cit:individual>
        </cit:CI_Organisation>
      </cit:party>
    </cit:CI_Responsibility>
  </mdb:contact>
  <mdb:contact>
    <cit:CI_Responsibility>
      <cit:role>
        <cit:CI_RoleCode
            codeList='https://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode'
            codeListValue='pointOfContact'>pointOfContact</cit:CI_RoleCode>
      </cit:role>
      <cit:party>
        <cit:CI_Organisation>
          <cit:name>
            <gco:CharacterString>MyOrganization</gco:CharacterString>
          </cit:name>
          <cit:contactInfo>
            <cit:CI_Contact>
              <cit:address>
                <cit:CI_Address>
                  <cit:electronicMailAddress>
                    <gco:CharacterString>bob@org.net</gco:CharacterString>
                  </cit:electronicMailAddress>
                </cit:CI_Address>
              </cit:address>
              <cit:onlineResource>
                <cit:CI_OnlineResource>
                  <cit:linkage>
                    <gco:CharacterString>https://www.my.org/info</gco:CharacterString>
                  </cit:linkage>
                </cit:CI_OnlineResource>
              </cit:onlineResource>
            </cit:CI_Contact>
          </cit:contactInfo>
          <cit:individual>
            <cit:CI_Individual>
              <cit:name>
                <gco:CharacterString>Bob TheGreat</gco:CharacterString>
              </cit:name>
              <cit:positionName>
                <gco:CharacterString>developer</gco:CharacterString>
              </cit:positionName>
            </cit:CI_Individual>
          </cit:individual>
        </cit:CI_Organisation>
      </cit:party>
    </cit:CI_Responsibility>
  </mdb:contact>
  <mdb:identificationInfo>
    <mri:MD_DataIdentification>
      <mri:citation>
        <cit:CI_Citation>
          <cit:citedResponsibleParty>
            <cit:CI_Responsibility>
              <cit:role>
                <cit:CI_RoleCode 
                  codeList="https://schemas.isotc211.org/19115/resources/Codelist/cat/codelists.xml#CI_RoleCode" 
                  codeListValue="author"/>
              </cit:role>
              <cit:party>
                <cit:CI_Organisation>
                  <cit:name>
                    <gco:CharacterString>OpenWork Ltd</gco:CharacterString>
                  </cit:name>
                  <cit:contactInfo>
                    <cit:CI_Contact>
                      <cit:address>
                        <cit:CI_Address>
                          <cit:electronicMailAddress>
                            <gco:CharacterString>info@openwork.nz</gco:CharacterString>
                          </cit:electronicMailAddress>
                        </cit:CI_Address>
                      </cit:address>
                    </cit:CI_Contact>
                  </cit:contactInfo>
                </cit:CI_Organisation>
              </cit:party>
            </cit:CI_Responsibility>
          </cit:citedResponsibleParty>
          <cit:citedResponsibleParty>
            <cit:CI_Responsibility>
              <cit:role>
               <cit:CI_RoleCode 
                 codeList="https://schemas.isotc211.org/19115/resources/Codelist/cat/codelists.xml#CI_RoleCode" 
                 codeListValue="publisher"/>
              </cit:role>
              <cit:party>
                <cit:CI_Individual>
                  <cit:name>
                    <gco:CharacterString>Byron Cochrane</gco:CharacterString>
                  </cit:name>
                  <cit:contactInfo>
                    <cit:CI_Contact>
                      <cit:address>
                        <cit:CI_Address>
                          <cit:electronicMailAddress>
                            <gco:CharacterString>byron@openwork.nz</gco:CharacterString>
                          </cit:electronicMailAddress>
                        </cit:CI_Address>
                      </cit:address>
                    </cit:CI_Contact>
                  </cit:contactInfo>
                </cit:CI_Individual>
              </cit:party>
            </cit:CI_Responsibility>
          </cit:citedResponsibleParty>
        </cit:CI_Citation>
      </mri:citation>
      <mri:pointOfContact>
        <cit:CI_Responsibility>
          <cit:role>
            <cit:CI_RoleCode codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode"
                             codeListValue="pointOfContact"/>
          </cit:role>
          <cit:party>
            <cit:CI_Organisation>
              <cit:name>
                <gco:CharacterString>Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département de la Géomatique - Direction de l'Intégration des géodonnées)</gco:CharacterString>
              </cit:name>
              <cit:contactInfo>
                <cit:CI_Contact>
                  <cit:address>
                    <cit:CI_Address>
                      <cit:electronicMailAddress>
                        <gco:CharacterString>helpdesk.carto@spw.wallonie.be</gco:CharacterString>
                      </cit:electronicMailAddress>
                    </cit:CI_Address>
                  </cit:address>
                </cit:CI_Contact>
              </cit:contactInfo>
            </cit:CI_Organisation>
          </cit:party>
        </cit:CI_Responsibility>
      </mri:pointOfContact>
    </mri:MD_DataIdentification>
  </mdb:identificationInfo>
  <mdb:distributionInfo>
    <mrd:MD_Distribution>
      <mrd:distributor>
        <mrd:MD_Distributor>
          <mrd:distributorContact>
            <cit:CI_Responsibility>
              <cit:role>
                <cit:CI_RoleCode 
                  codeList='https://schemas.isotc211.org/19115/resources/Codelist/cat/codelists.xml#CI_RoleCode'
                  codeListValue='distributor'/>
              </cit:role>
              <cit:party>
                <cit:CI_Organisation>
                  <cit:name>
                    <gco:CharacterString>OpenWork Ltd</gco:CharacterString>
                  </cit:name>
                  <cit:contactInfo>
                    <cit:CI_Contact>
                      <cit:address>
                        <cit:CI_Address>
                          <cit:electronicMailAddress>
                            <gco:CharacterString>info@openwork.nz</gco:CharacterString>
                          </cit:electronicMailAddress>
                        </cit:CI_Address>
                      </cit:address>
                    </cit:CI_Contact>
                  </cit:contactInfo>
                </cit:CI_Organisation>
              </cit:party>
            </cit:CI_Responsibility>
          </mrd:distributorContact>
        </mrd:MD_Distributor>
      </mrd:distributor>
    </mrd:MD_Distribution>
  </mdb:distributionInfo>
</mdb:MD_Metadata>`)
        )
        contacts = readContacts(withContacts)
        contactsForResource = readResourceContacts(withContacts)
        ownerOrg = readOwnerOrganization(withContacts)
      })

      it('root contacts are for record', () => {
        expect(contacts).toEqual([
          {
            firstName: 'Frédéric',
            lastName: 'Plumier',
            position: 'Attaché',
            email: 'frederic.plumier@spw.wallonie.be',
            address: 'Boulevard du Nord, 8, Namur, 5000, Belgique',
            organization: {
              name: 'Direction Asset Management (SPW - Mobilité et Infrastructures - Direction Asset Management)',
            },
            role: 'custodian',
          },
          {
            email: 'name@email.org',
            firstName: 'Metadata',
            lastName: 'Bob',
            organization: {
              name: 'OpenWork Ltd',
            },
            role: 'owner',
          },
          {
            email: 'bob@org.net',
            firstName: 'Bob',
            lastName: 'TheGreat',
            organization: {
              name: 'MyOrganization',
              website: new URL('https://www.my.org/info'),
            },
            position: 'developer',
            role: 'point_of_contact',
          },
        ])
      })
      it('point of contact, citation and distribution are contacts for resource', () => {
        expect(contactsForResource).toEqual([
          {
            email: 'info@openwork.nz',
            organization: {
              name: 'OpenWork Ltd',
            },
            role: 'author',
          },
          {
            firstName: 'Byron',
            lastName: 'Cochrane',
            email: 'byron@openwork.nz',
            organization: {
              name: 'Missing Organization',
            },
            role: 'publisher',
          },
          {
            email: 'helpdesk.carto@spw.wallonie.be',
            organization: {
              name: "Helpdesk carto du SPW (SPW - Secrétariat général - SPW Digital - Département de la Géomatique - Direction de l'Intégration des géodonnées)",
            },
            role: 'point_of_contact',
          },
          {
            email: 'info@openwork.nz',
            organization: {
              name: 'OpenWork Ltd',
            },
            role: 'distributor',
          },
        ])
      })
      it('owner organization is organization of the first point of contact for the record', () => {
        expect(ownerOrg).toEqual({
          name: 'MyOrganization',
          website: new URL('https://www.my.org/info'),
        })
      })
    })
  })
})
