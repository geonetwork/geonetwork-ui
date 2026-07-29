import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { EditorConfig } from './models/editor-config.model'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'

export interface ISOTopic {
  value: string
  label: string
}

/**
 * This file contains the configuration of the fields
 * that will be displayed in the editor
 * and the reuse light editor.
 */

// keeping track of labels to not lose existing translations
marker('editor.record.form.field.updateFrequency')
marker('editor.record.form.field.spatialExtents')
marker('editor.record.form.field.onlineResources')
marker('editor.record.form.field.onlineLinkResources')

export const DEFAULT_CONFIGURATION: EditorConfig = {
  pages: [
    /**
     * Page 1: DESCRIPTION
     */

    {
      labelKey: marker('editor.record.form.page.description'),
      sections: [
        // Section: Title, abstract and overview
        {
          fields: [
            {
              model: 'title',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.title'),
              },
            },
            {
              model: 'abstract',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.abstract'),
              },
            },
            {
              model: 'overviews',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.overviews'),
              },
            },
          ],
        },

        // Section: Classification
        {
          labelKey: marker('editor.record.form.section.classification.label'),
          descriptionKey: marker(
            'editor.record.form.section.classification.description'
          ),
          fields: [
            {
              model: 'keywords',
              formFieldConfig: {},
            },
          ],
        },

        // Section: Topics
        {
          labelKey: marker('editor.record.form.section.topics.label'),
          descriptionKey: marker(
            'editor.record.form.section.topics.description'
          ),
          fields: [
            {
              model: 'topics',
              formFieldConfig: {},
            },
          ],
        },

        // Section: About (identifiers, dates, update frequency, temporal extents)
        {
          labelKey: marker('editor.record.form.section.about.label'),
          descriptionKey: marker(
            'editor.record.form.section.about.description'
          ),
          fields: [
            {
              model: 'uniqueIdentifier',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.uniqueIdentifier'),
              },
              hidden: true,
            },
            {
              model: 'resourceIdentifiers',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.resourceIdentifier'),
              },
            },
            {
              model: 'resourceCreated',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.resourceCreated'),
              },
              gridColumnSpan: 1,
            },
            {
              model: 'resourceUpdated',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.resourceUpdated'),
              },
              gridColumnSpan: 1,
            },
            {
              model: 'recordUpdated',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.recordUpdated'),
              },
              onSaveProcess: '${dateNow()}',
              gridColumnSpan: 1,
              hidden: true,
            },
            {
              model: 'updateFrequency',
              formFieldConfig: {},
            },
            {
              model: 'temporalExtents',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.temporalExtents'),
              },
              hidden: '${record.kind == "service"}',
            },
          ],
        },

        // Section: Geographical coverage
        {
          labelKey: marker(
            'editor.record.form.section.geographicalCoverage.label'
          ),
          fields: [
            {
              componentName: 'form-field-spatial-toggle',
              formFieldConfig: {},
              hidden: true,
            },
            {
              model: 'spatialExtents',
              formFieldConfig: {},
            },
          ],
        },
      ],
    },

    /**
     * Page 2: RESOURCES
     */

    {
      labelKey: marker('editor.record.form.page.resources'),
      sections: [
        // Section: Associated resources (distributions, services, …)
        {
          hidden: '${record.kind != "dataset"}',
          labelKey: marker(
            'editor.record.form.section.associatedResources.label'
          ),
          descriptionKey: marker(
            'editor.record.form.section.associatedResources.description'
          ),
          fields: [
            {
              model: 'onlineResources',
              modelSpecifier: 'onlineResourceType:!link',
              formFieldConfig: {},
            },
          ],
        },

        // Section: Annexes (links)
        {
          labelKey: marker('editor.record.form.section.annexes.label'),
          descriptionKey: marker(
            'editor.record.form.section.annexes.description'
          ),
          fields: [
            {
              model: 'onlineResources',
              modelSpecifier: 'onlineResourceType:link',
              formFieldConfig: {},
            },
          ],
        },
      ],
    },

    /**
     * Page 3: ACCESS & CONTACT
     */

    {
      labelKey: marker('editor.record.form.page.accessAndContact'),
      sections: [
        // Section: Use and access conditions (license, constraints)
        {
          labelKey: marker(
            'editor.record.form.section.useAndAccessConditions.label'
          ),
          fields: [
            {
              model: 'licenses',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.license'),
              },
            },
            {
              componentName: 'form-field-constraints-shortcuts',
              formFieldConfig: {
                labelKey: marker(
                  'editor.record.form.field.constraintsShortcuts'
                ),
              },
            },
            {
              model: 'legalConstraints',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.legalConstraints'),
              },
            },
            {
              model: 'securityConstraints',
              formFieldConfig: {
                labelKey: marker(
                  'editor.record.form.field.securityConstraints'
                ),
              },
            },
            {
              model: 'otherConstraints',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.otherConstraints'),
              },
            },
          ],
        },

        // Section: Data managers (contacts for resource)
        {
          labelKey: marker('editor.record.form.section.dataManagers.label'),
          descriptionKey: marker(
            'editor.record.form.section.dataManagers.description'
          ),
          fields: [
            {
              model: 'contactsForResource',
              formFieldConfig: { labelKey: '' },
            },
          ],
        },

        // Section: Metadata point of contact
        {
          labelKey: marker(
            'editor.record.form.section.metadataPointOfContact.label'
          ),
          descriptionKey: marker(
            'editor.record.form.section.metadataPointOfContact.description'
          ),
          fields: [
            {
              model: 'contacts',
              formFieldConfig: { labelKey: '' },
            },
          ],
        },
      ],
    },
  ],
}

// reduced configuration used by the light edition page for reuse records;
// the point of contact is edited outside the record form on that page
export const REUSE_LIGHT_CONFIGURATION: EditorConfig = {
  pages: [
    {
      sections: [
        {
          hidden: false,
          fields: [
            {
              model: 'title',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.title'),
              },
            },
            {
              model: 'abstract',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.abstract'),
              },
            },
            {
              model: 'onlineResources',
              modelSpecifier: 'onlineResourceType:singleLink',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.reuseUrl'),
              },
            },
            {
              model: 'overviews',
              formFieldConfig: {
                labelKey: marker('editor.record.form.field.overviews'),
              },
            },
          ],
        },
      ],
    },
  ],
}

/**
 * OTHER SETTINGS
 */

export const AVAILABLE_LICENSES: string[] = [
  'cc-by',
  'cc-by-sa',
  'cc-zero',
  'etalab',
  'etalab-v2',
  'odbl',
  'odc-by',
  'pddl',
  'unknown',
]

export const OPEN_DATA_LICENSE = 'etalab'

marker('editor.record.form.license.cc-by')
marker('editor.record.form.license.cc-by-sa')
marker('editor.record.form.license.cc-zero')
marker('editor.record.form.license.etalab')
marker('editor.record.form.license.etalab-v2')
marker('editor.record.form.license.odbl')
marker('editor.record.form.license.odc-by')
marker('editor.record.form.license.pddl')
marker('editor.record.form.license.unknown')

export const MAX_UPLOAD_SIZE_MB = 10

export const SPATIAL_SCOPES: Keyword[] = [
  {
    key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/national',
    label: 'National',
    description: '',
    type: 'theme',
  },
  {
    key: 'http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/regional',
    label: 'Regional',
    description: '',
    type: 'theme',
  },
]

// label keys mirror the ISO MD_TopicCategoryCode value for consistency
// TODO: correctly handle code lists; for instance, this code list is specific to ISO 19139
export const ISO_TOPICS: ISOTopic[] = [
  { value: 'biota', label: marker('editor.record.form.topics.iso.biota') },
  {
    value: 'boundaries',
    label: marker('editor.record.form.topics.iso.boundaries'),
  },
  {
    value: 'climatologyMeteorologyAtmosphere',
    label: marker(
      'editor.record.form.topics.iso.climatologyMeteorologyAtmosphere'
    ),
  },
  {
    value: 'economy',
    label: marker('editor.record.form.topics.iso.economy'),
  },
  {
    value: 'elevation',
    label: marker('editor.record.form.topics.iso.elevation'),
  },
  {
    value: 'environment',
    label: marker('editor.record.form.topics.iso.environment'),
  },
  {
    value: 'farming',
    label: marker('editor.record.form.topics.iso.farming'),
  },
  {
    value: 'geoscientificInformation',
    label: marker('editor.record.form.topics.iso.geoscientificInformation'),
  },
  {
    value: 'health',
    label: marker('editor.record.form.topics.iso.health'),
  },
  {
    value: 'imageryBaseMapsEarthCover',
    label: marker('editor.record.form.topics.iso.imageryBaseMapsEarthCover'),
  },
  {
    value: 'inlandWaters',
    label: marker('editor.record.form.topics.iso.inlandWaters'),
  },
  {
    value: 'intelligenceMilitary',
    label: marker('editor.record.form.topics.iso.intelligenceMilitary'),
  },
  {
    value: 'location',
    label: marker('editor.record.form.topics.iso.location'),
  },
  {
    value: 'oceans',
    label: marker('editor.record.form.topics.iso.oceans'),
  },
  {
    value: 'planningCadastre',
    label: marker('editor.record.form.topics.iso.planningCadastre'),
  },
  {
    value: 'society',
    label: marker('editor.record.form.topics.iso.society'),
  },
  {
    value: 'structure',
    label: marker('editor.record.form.topics.iso.structure'),
  },
  {
    value: 'transportation',
    label: marker('editor.record.form.topics.iso.transportation'),
  },
  {
    value: 'utilitiesCommunication',
    label: marker('editor.record.form.topics.iso.utilitiesCommunication'),
  },
]
