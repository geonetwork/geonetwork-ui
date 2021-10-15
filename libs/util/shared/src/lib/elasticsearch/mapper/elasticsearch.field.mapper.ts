import { Injectable } from '@angular/core'
import { MetadataRecord, MetadataUrlService } from '@geonetwork-ui/util/shared'
import {
  getAsArray,
  getAsUrl,
  getFirstValue,
  mapLink,
  selectFallback,
  selectFallbackFields,
  selectField,
  selectTranslatedField,
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
  constructor(private metadataUrlService: MetadataUrlService) {}

  protected fields: Record<string, EsFieldMapperFn> = {
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
    codelist_status_text: (output, source) => ({
      ...output,
      updateFrequency: getFirstValue(
        selectField(source, 'codelist_status_text')
      ),
    }),
    logo: (output, source) => ({
      ...output,
      logoUrl: getAsUrl(`/geonetwork${selectField(source, 'logo')}`),
    }),
    resourceDate: (output) => output,
    resourceIdentifier: (output) => output,
    resourceLanguage: (output) => output,
    resourceTemporalDateRange: (output) => output,
    resourceTemporalExtentDateRange: (output) => output,
    resourceType: (output) => output,
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
  }

  private genericField = (output, source, fieldName: string) => ({
    ...output,
    [fieldName]: selectField(source, fieldName),
  })

  getMappingFn(fieldName: string) {
    return fieldName in this.fields ? this.fields[fieldName] : this.genericField
  }
}
