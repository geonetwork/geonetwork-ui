import {
  AccessConstraintType,
  DatasetRecord,
} from '@geonetwork-ui/util/types/metadata'
import { getStatusFromStatusCode } from '../iso19139/codelists/status.mapper'
import { getUpdateFrequencyFromFrequencyCode } from '../iso19139/codelists/update-frequency.mapper'
import {
  getAsArray,
  getAsUrl,
  getFirstValue,
  mapContact,
  mapLink,
  mapOrganization,
  selectFallback,
  selectFallbackFields,
  selectField,
  selectTranslatedField,
  selectTranslatedValue,
  SourceWithUnknownProps,
  toDate,
} from './atomic-operations'
import { MetadataMapperContext } from '../metadata-base.mapper'

type ESResponseSource = SourceWithUnknownProps

type EsFieldMapperFn = (
  output: Partial<DatasetRecord>,
  source: ESResponseSource
) => Partial<DatasetRecord>

export class Gn4FieldMapper {
  constructor(protected ctx: MetadataMapperContext) {}

  protected fields: Record<string, EsFieldMapperFn> = {
    id: (output, source) =>
      this.addExtra({ id: selectField(source, 'id') }, output),
    uuid: (output, source) => {
      const uniqueIdentifier = selectField<string>(source, 'uuid')
      return { ...output, uniqueIdentifier }
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
    overview: (output, source) => {
      const firstOverview = getFirstValue(selectField(source, 'overview'))
      const description = selectTranslatedValue<string>(
        selectField(firstOverview, 'text')
      )
      const t = selectFallbackFields(firstOverview, 'data', 'url')
      const r = selectFallback(
        selectFallbackFields(firstOverview, 'data', 'url'),
        ''
      )
      const a = getAsUrl(
        selectFallback(selectFallbackFields(firstOverview, 'data', 'url'), '')
      )

      return {
        ...output,
        overviews: [
          {
            url: getAsUrl(
              selectFallback(
                selectFallbackFields(firstOverview, 'data', 'url'),
                ''
              )
            ),
            ...(description ? { description } : {}),
          },
        ],
      }
    },
    cl_status: (output, source) => ({
      ...output,
      status: getStatusFromStatusCode(
        getFirstValue(selectField(source, 'cl_status'))
      ),
    }),
    cl_maintenanceAndUpdateFrequency: (output, source) => ({
      ...output,
      updateFrequency: getUpdateFrequencyFromFrequencyCode(
        selectField(
          getFirstValue(
            selectField(source, 'cl_maintenanceAndUpdateFrequency')
          ),
          'key'
        )
      ),
    }),
    creationDateForResource: (output, source) => ({
      ...output,
      datasetCreated: toDate(
        getFirstValue(selectField<string>(source, 'creationDateForResource'))
      ),
    }),
    createDate: (output, source) => ({
      ...output,
      recordCreated: toDate(selectField<string>(source, 'createDate')),
    }),
    changeDate: (output, source) => ({
      ...output,
      recordUpdated: toDate(selectField<string>(source, 'changeDate')),
    }),
    link: (output, source) => {
      const rawLinks = getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'link')
      )
      const distributions = rawLinks.map(mapLink).filter((v) => v !== null)
      return {
        ...output,
        distributions,
      }
    },
    contact: (output, source) => ({
      ...output,
      ownerOrganization: mapOrganization(
        getFirstValue(selectField(source, 'contact')),
        source
      ),
    }),
    contactForResource: (output, source) => ({
      ...output,
      contacts: [
        ...(output.contacts || []),
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
    inspireTheme: (output, source) => ({
      ...output,
      themes: getAsArray(selectField(source, 'inspireTheme_syn')),
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
    licenseObject: (output, source) => ({
      ...output,
      licenses: getAsArray(
        selectField<SourceWithUnknownProps[]>(source, 'licenseObject')
      ).map((license) => {
        const link = getAsUrl(selectField(license, 'link'))
        return {
          text: selectTranslatedValue<string>(license),
          ...(link ? { link } : {}),
        }
      }),
    }),
    lineageObject: (output, source) => ({
      ...output,
      lineage: selectTranslatedField(source, 'lineageObject'),
    }),
    mainLanguage: (output) => output,
    userSavedCount: (output, source) =>
      this.addExtra(
        {
          favoriteCount: parseInt(selectField(source, 'userSavedCount')),
        },
        output
      ),
    isOpenData: (output, source) =>
      this.addExtra(
        {
          isOpenData: selectField(source, 'isOpenData') !== 'false',
        },
        output
      ),
    isPublishedToAll: (output, source) =>
      this.addExtra(
        {
          isPublishedToAll: selectField(source, 'isPublishedToAll') !== 'false',
        },
        output
      ),
  }

  private genericField = (output) => output

  private constraintField = (fieldName: string, output, source) => ({
    ...output,
    ...(fieldName.endsWith('UseLimitationObject')
      ? {
          useLimitations: [
            ...(output.useLimitations || []),
            ...selectField<SourceWithUnknownProps[]>(source, fieldName).map(
              selectTranslatedValue
            ),
          ],
        }
      : {
          accessConstraints: [
            ...(output.accessConstraints || []),
            ...selectField<SourceWithUnknownProps[]>(source, fieldName).map(
              (field) => ({
                text: selectTranslatedValue(field),
                type: this.getConstraintsType(fieldName),
              })
            ),
          ],
        }),
  })

  private addExtra = (value: object, output) => ({
    ...output,
    extras: { ...(output.extras || {}), ...value },
  })

  private getConstraintsType(indexField: string): AccessConstraintType {
    switch (indexField) {
      case 'MD_LegalConstraintsUseLimitationObject':
        return 'legal'
      case 'MD_SecurityConstraintsUseLimitationObject':
        return 'security'
      case 'MD_ConstraintsUseLimitationObject':
      default:
        return 'other'
    }
  }

  getMappingFn(fieldName: string) {
    return fieldName in this.fields ? this.fields[fieldName] : this.genericField
  }
}
