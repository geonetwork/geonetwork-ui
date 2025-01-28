import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { XmlElement } from '@rgrove/parse-xml'
import { Iso19139Converter } from '../iso19139'
import { renameElements } from '../xml-utils'
import {
  readContacts,
  readContactsForResource,
  readDefaultLanguage,
  readKind,
  readLandingPage,
  readLineage,
  readOnlineResources,
  readOtherLanguages,
  readOwnerOrganization,
  readRecordCreated,
  readRecordPublished,
  readRecordUpdated,
  readReuseType,
  readUniqueIdentifier,
} from './read-parts'
import {
  writeContacts,
  writeContactsForResource,
  writeDefaultLanguage,
  writeKind,
  writeLandingPage,
  writeLineage,
  writeOnlineResources,
  writeOtherLanguages,
  writeRecordCreated,
  writeRecordPublished,
  writeRecordUpdated,
  writeResourceCreated,
  writeResourcePublished,
  writeResourceUpdated,
  writeReuseType,
  writeSpatialRepresentation,
  writeStatus,
  writeUniqueIdentifier,
} from './write-parts'

export class Iso191153Converter extends Iso19139Converter {
  constructor() {
    super()

    this.readers['uniqueIdentifier'] = readUniqueIdentifier
    this.readers['kind'] = readKind
    this.readers['recordUpdated'] = readRecordUpdated
    this.readers['recordCreated'] = readRecordCreated
    this.readers['recordPublished'] = readRecordPublished
    this.readers['contacts'] = readContacts
    this.readers['contactsForResource'] = readContactsForResource
    this.readers['ownerOrganization'] = readOwnerOrganization
    this.readers['landingPage'] = readLandingPage
    this.readers['lineage'] = readLineage
    this.readers['onlineResources'] = readOnlineResources
    this.readers['defaultLanguage'] = readDefaultLanguage
    this.readers['otherLanguages'] = readOtherLanguages
    this.readers['reuseType'] = readReuseType

    this.writers['uniqueIdentifier'] = writeUniqueIdentifier
    this.writers['kind'] = writeKind
    this.writers['recordUpdated'] = writeRecordUpdated
    this.writers['recordCreated'] = writeRecordCreated
    this.writers['recordPublished'] = writeRecordPublished
    this.writers['resourceUpdated'] = writeResourceUpdated
    this.writers['resourceCreated'] = writeResourceCreated
    this.writers['resourcePublished'] = writeResourcePublished
    this.writers['reuseType'] = writeReuseType
    this.writers['contacts'] = writeContacts
    this.writers['contactsForResource'] = writeContactsForResource
    this.writers['ownerOrganization'] = () => undefined // fixme: find a way to store this value properly
    this.writers['landingPage'] = writeLandingPage
    this.writers['lineage'] = writeLineage
    this.writers['onlineResources'] = writeOnlineResources
    this.writers['status'] = writeStatus
    this.writers['spatialRepresentation'] = writeSpatialRepresentation
    this.writers['defaultLanguage'] = writeDefaultLanguage
    this.writers['otherLanguages'] = writeOtherLanguages
  }

  beforeDocumentCreation(rootEl: XmlElement) {
    renameElements(rootEl, {
      gmd: 'mdb',
      'gmd:characterEncoding': 'lan:characterEncoding',
      'gmd:MD_CharacterSetCode': 'lan:MD_CharacterSetCode',
      'gmd:MD_DataIdentification': 'mri:MD_DataIdentification',
      'gmd:citation': 'mri:citation',
      'gmd:abstract': 'mri:abstract',
      'gmd:title': 'cit:title',
      'gmd:CI_Citation': 'cit:CI_Citation',
      'gmx:Anchor': 'gcx:Anchor',

      // languages
      'gmd:PT_Locale': 'lan:PT_Locale',
      'gmd:PT_FreeText': 'lan:PT_FreeText',
      'gmd:LanguageCode': 'lan:LanguageCode',

      // status
      'gmd:status': 'mri:status',
      'gmd:MD_ProgressCode': 'mri:MD_ProgressCode',

      // dates
      'gmd:date': 'cit:date',
      'gmd:CI_Date': 'cit:CI_Date',
      'gmd:dateType': 'cit:dateType',
      'gmd:CI_DateTypeCode': 'cit:CI_DateTypeCode',

      // contacts
      'gmd:CI_Responsibility': 'cit:CI_Responsibility',
      'gmd:role': 'cit:role',
      'gmd:CI_RoleCode': 'cit:CI_RoleCode',

      // keywords
      'gmd:descriptiveKeywords': 'mri:descriptiveKeywords',
      'gmd:MD_Keywords': 'mri:MD_Keywords',
      'gmd:type': 'mri:type',
      'gmd:MD_KeywordTypeCode': 'mri:MD_KeywordTypeCode',
      'gmd:thesaurusName': 'mri:thesaurusName',
      'gmd:keyword': 'mri:keyword',
      'gmd:identifier': 'cit:identifier',
      'gmd:MD_Identifier': 'mcc:MD_Identifier',
      'gmd:code': 'mcc:code',

      // distributions
      'gmd:MD_Distribution': 'mrd:MD_Distribution',
      'gmd:transferOptions': 'mrd:transferOptions',
      'gmd:MD_DigitalTransferOptions': 'mrd:MD_DigitalTransferOptions',
      'gmd:onLine': 'mrd:onLine',
      'gmd:distributionFormat': 'mrd:distributionFormat',
      'gmd:MD_Format': 'mrd:MD_Format',
      'gmd:CI_OnlineResource': 'cit:CI_OnlineResource',
      'gmd:linkage': 'cit:linkage',
      'gmd:name': 'cit:name',
      'gmd:description': 'cit:description',
      'gmd:CI_OnLineFunctionCode': 'cit:CI_OnLineFunctionCode',
      'gmd:function': 'cit:function',
      'gmd:protocol': 'cit:protocol',

      // topic
      'gmd:topicCategory': 'mri:topicCategory',
      'gmd:MD_TopicCategoryCode': 'mri:MD_TopicCategoryCode',

      // update frequency
      'gmd:resourceMaintenance': 'mri:resourceMaintenance',
      'gmd:MD_MaintenanceInformation': 'mmi:MD_MaintenanceInformation',
      'gmd:userDefinedMaintenanceFrequency':
        'mmi:userDefinedMaintenanceFrequency',
      'gts:TM_PeriodDuration': 'gco:TM_PeriodDuration',

      // constraints
      'gmd:resourceConstraints': 'mri:resourceConstraints',
      'gmd:MD_Constraints': 'mco:MD_Constraints',
      'gmd:MD_LegalConstraints': 'mco:MD_LegalConstraints',
      'gmd:MD_SecurityConstraints': 'mco:MD_SecurityConstraints',
      'gmd:useLimitation': 'mco:useLimitation',
      'gmd:useConstraints': 'mco:useConstraints',
      'gmd:accessConstraints': 'mco:accessConstraints',
      'gmd:otherConstraints': 'mco:otherConstraints',
      'gmd:MD_RestrictionCode': 'mco:MD_RestrictionCode',
      'gmd:classification': 'mco:classification',
      'gmd:MD_ClassificationCode': 'mco:MD_ClassificationCode',

      // overviews
      'gmd:graphicOverview': 'mri:graphicOverview',
      'gmd:MD_BrowseGraphic': 'mcc:MD_BrowseGraphic',
      'gmd:fileName': 'mcc:fileName',
      'gmd:fileDescription': 'mcc:fileDescription',

      // no more URL elements
      'gmd:URL': 'gco:CharacterString',
    })
  }

  async writeRecord(
    record: CatalogRecord,
    reference?: string
  ): Promise<string> {
    let result = await super.writeRecord(record, reference)
    // fix gco namespace definition (changes between iso19139 and iso19115-3
    result = result.replace(
      '"http://www.isotc211.org/2005/gco"',
      '"http://standards.iso.org/iso/19115/-3/gco/1.0"'
    )
    return result
  }
}
