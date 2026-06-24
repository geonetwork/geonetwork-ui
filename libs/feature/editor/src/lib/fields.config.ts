import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { EditorConfig } from './models/editor-config.model'
import {
  INSPIRE_topic,
  Keyword,
} from '@geonetwork-ui/common/domain/model/record'

/**
 * This file contains the configuration of the fields that will be displayed in the editor.
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

export const INSPIRE_TOPICS: INSPIRE_topic[] = [
  { value: 'biota', label: 'editor.record.form.topics.inspire.biota' },
  {
    value: 'boundaries',
    label: 'editor.record.form.topics.inspire.boundaries',
  },
  {
    value: 'climatologyMeteorologyAtmosphere',
    label: 'editor.record.form.topics.inspire.climatology',
  },
  { value: 'economy', label: 'editor.record.form.topics.inspire.economy' },
  { value: 'elevation', label: 'editor.record.form.topics.inspire.elevation' },
  {
    value: 'environment',
    label: 'editor.record.form.topics.inspire.environnement',
  },
  { value: 'farming', label: 'editor.record.form.topics.inspire.farming' },
  {
    value: 'geoscientific information',
    label: 'editor.record.form.topics.inspire.geoscientific',
  },
  { value: 'health', label: 'editor.record.form.topics.inspire.health' },
  {
    value: 'imageryBaseMapsEarthCover',
    label: 'editor.record.form.topics.inspire.imagery',
  },
  { value: 'inlandWaters', label: 'editor.record.form.topics.inspire.waters' },
  {
    value: 'intelligenceMilitary',
    label: 'editor.record.form.topics.inspire.intelligence',
  },
  { value: 'Location', label: 'editor.record.form.topics.inspire.location' },
  { value: 'Oceans', label: 'editor.record.form.topics.inspire.oceans' },
  {
    value: 'planningCadastre',
    label: 'editor.record.form.topics.inspire.planning',
  },
  { value: 'Society', label: 'editor.record.form.topics.inspire.society' },
  { value: 'Structure', label: 'editor.record.form.topics.inspire.structure' },
  {
    value: 'Transportation',
    label: 'editor.record.form.topics.inspire.transportation',
  },
  {
    value: 'utilitiesCommunication',
    label: 'editor.record.form.topics.inspire.utilities',
  },
]

marker('editor.record.form.topics.inspire.biota')
marker('editor.record.form.topics.inspire.boundaries')
marker('editor.record.form.topics.inspire.climatology')
marker('editor.record.form.topics.inspire.economy')
marker('editor.record.form.topics.inspire.elevation')
marker('editor.record.form.topics.inspire.environnement')
marker('editor.record.form.topics.inspire.farming')
marker('editor.record.form.topics.inspire.geoscientific')
marker('editor.record.form.topics.inspire.health')
marker('editor.record.form.topics.inspire.imagery')
marker('editor.record.form.topics.inspire.intelligence')
marker('editor.record.form.topics.inspire.location')
marker('editor.record.form.topics.inspire.oceans')
marker('editor.record.form.topics.inspire.planning')
marker('editor.record.form.topics.inspire.society')
marker('editor.record.form.topics.inspire.structure')
marker('editor.record.form.topics.inspire.transportation')
marker('editor.record.form.topics.inspire.utilities')
marker('editor.record.form.topics.inspire.waters')
