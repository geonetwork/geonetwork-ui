import { Injectable } from '@angular/core'
import {
  LinkClassifierService,
  LinkUsage,
  MetadataRecord,
  MetadataUrlService,
} from '@geonetwork-ui/util/shared'
import {
  getAsArray,
  getAsUrl,
  getFirstValue,
  mapContact,
  mapLink,
  selectFallback,
  selectFallbackFields,
  selectField,
  selectTranslatedField,
  selectTranslatedValue,
  SourceWithUnknownProps,
  toDate,
} from './atomic-operations'

type ESResponseSource = SourceWithUnknownProps

type EsFieldMapperFn = (
  output: Partial<MetadataRecord>,
  source: ESResponseSource
) => Partial<MetadataRecord>

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchFieldMapper {
  constructor(
    private metadataUrlService: MetadataUrlService,
    private linkClassifier: LinkClassifierService
  ) {}

  protected fields: Record<string, EsFieldMapperFn> = {
    id: (output, source) => ({
      ...output,
      id: selectField(source, 'id'),
    }),
    uuid: (output, source) => {
      const uuid = selectField<string>(source, 'uuid')
      const metadataUrl = this.metadataUrlService.getUrl(uuid)
      return { ...output, uuid, metadataUrl }
    },
    resourceTitleObject: (output, source) => ({
      ...output,
      title: selectFallback(
        selectTranslatedField(source, 'resourceTitleObject'),
        'no title'
      ),
    }),
    resourceAbstractObject: (output, source) => ({
      ...output,
      abstract: selectFallback(
        selectTranslatedField(source, 'resourceAbstractObject'),
        'no title'
      ),
    }),
    overview: (output, source) => ({
      ...output,
      thumbnailUrl: getAsUrl(
        selectFallback(
          selectFallbackFields(
            getFirstValue(selectField(source, 'overview')),
            'data',
            'url'
          ),
          ''
        )
      ),
    }),
    cl_status: (output, source) => ({
      ...output,
      updateStatus: selectTranslatedValue(
        getFirstValue(selectField(source, 'cl_status'))
      ),
    }),
    cl_maintenanceAndUpdateFrequency: (output, source) => ({
      ...output,
      updateFrequency: selectTranslatedValue(
        getFirstValue(selectField(source, 'cl_maintenanceAndUpdateFrequency'))
      ),
    }),
    creationDateForResource: (output, source) => ({
      ...output,
      dataCreatedOn: toDate(
        getFirstValue(selectField<string>(source, 'creationDateForResource'))
      ),
    }),
    createDate: (output, source) => ({
      ...output,
      createdOn: toDate(selectField<string>(source, 'createDate')),
    }),
    changeDate: (output, source) => ({
      ...output,
      updatedOn: toDate(selectField<string>(source, 'changeDate')),
    }),
    link: (output, source) => {
      const rawLinks = getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'link')
      )
      const links = rawLinks.map(mapLink).filter((v) => v !== null)
      return {
        ...output,
        links,
        hasDownloads: links.some((link) =>
          this.linkClassifier.hasUsage(link, LinkUsage.DOWNLOAD)
        ),
        hasMaps: links.some((link) =>
          this.linkClassifier.hasUsage(link, LinkUsage.MAP_API)
        ),
      }
    },
    contact: (output, source) => ({
      ...output,
      contact: mapContact(
        getFirstValue(selectField(source, 'contact')),
        source
      ),
    }),
    contactForResource: (output, source) => ({
      ...output,
      resourceContacts: [
        ...(output.resourceContacts || []),
        ...getAsArray(selectField(source, 'contactForResource')).map(
          (contact) => mapContact(contact, source)
        ),
      ],
    }),
    sourceCatalogue: (output, source) => ({
      ...output,
      catalogUuid: selectFallback(
        selectField(source, 'sourceCatalogue'),
        'no title'
      ),
    }),
    tag: (output, source) => ({
      ...output,
      keywords: getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'tag')
      ).map((tag) => selectTranslatedValue<string>(tag)),
    }),
    MD_ConstraintsUseLimitationObject: (output, source) =>
      this.constraintField('MD_ConstraintsUseLimitationObject', output, source),
    MD_LegalConstraintsUseLimitationObject: (output, source) =>
      this.constraintField(
        'MD_LegalConstraintsUseLimitationObject',
        output,
        source
      ),
    MD_LegalConstraintsOtherConstraintsObject: (output, source) =>
      this.constraintField(
        'MD_LegalConstraintsOtherConstraintsObject',
        output,
        source
      ),
    MD_SecurityConstraintsUseLimitationObject: (output, source) =>
      this.constraintField(
        'MD_SecurityConstraintsUseLimitationObject',
        output,
        source
      ),
    lineageObject: (output, source) => ({
      ...output,
      lineage: selectTranslatedField(source, 'lineageObject'),
    }),
    mainLanguage: (output) => output,
    userSavedCount: (output, source) => ({
      ...output,
      favoriteCount: parseInt(selectField(source, 'userSavedCount')),
    }),
    isOpenData: (output, source) => ({
      ...output,
      isOpenData: selectField(source, 'isOpenData') !== 'false',
    }),
  }

  private genericField = (output) => output

  private constraintField = (fieldName: string, output, source) => ({
    ...output,
    constraints: [
      ...(output.constraints || []),
      ...selectField<unknown[]>(source, fieldName).map(selectTranslatedValue),
    ],
  })

  getMappingFn(fieldName: string) {
    return fieldName in this.fields ? this.fields[fieldName] : this.genericField
  }
}
