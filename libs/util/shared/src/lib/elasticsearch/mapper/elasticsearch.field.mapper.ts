import { Injectable } from '@angular/core'
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
import { MetadataUrlService } from '../../services'
import { MetadataRecord } from '../../models'

type ESResponseSource = SourceWithUnknownProps

type EsFieldMapperFn = (
  output: Partial<MetadataRecord>,
  source: ESResponseSource
) => Partial<MetadataRecord>

@Injectable({
  providedIn: 'root',
})
export class ElasticsearchFieldMapper {
  constructor(private metadataUrlService: MetadataUrlService) {}

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
    link: (output, source) => ({
      ...output,
      links: getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'link')
      ).map(mapLink),
    }),
    contact: (output, source) => ({
      ...output,
      contact: mapContact(
        getFirstValue(selectField(source, 'contact')),
        source
      ),
    }),
    tag: (output, source) => ({
      ...output,
      keywords: getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'tag')
      ).map((tag) => selectTranslatedValue<string>(tag)),
    }),
    MD_ConstraintsUseLimitationObject: (output, source) => ({
      ...output,
      usageConstraints: selectTranslatedValue(
        getFirstValue(selectField(source, 'MD_ConstraintsUseLimitationObject'))
      ),
    }),
    lineageObject: (output, source) => ({
      ...output,
      lineage: selectTranslatedField(source, 'lineageObject'),
    }),
    mainLanguage: (output) => output,
  }

  private genericField = (output) => output

  getMappingFn(fieldName: string) {
    return fieldName in this.fields ? this.fields[fieldName] : this.genericField
  }
}
