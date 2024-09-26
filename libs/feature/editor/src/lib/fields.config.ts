import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  EditorConfig,
  EditorField,
  EditorSection,
} from './models/editor-config.model'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'

/**
 * This file contains the configuration of the fields that will be displayed in the editor.
 * To add a new field, you need to create a new EditorField object in the fields part of this file.
 * Then add it to the corresponding section in the sections part of this file.
 * Finally, add the section to the corresponding page in the pages part of this file.
 */

/************************************************************
 ***************           FIELDS           *****************
 ************************************************************
 */

export const RECORD_LICENSE_FIELD: EditorField = {
  model: 'licenses',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.license'),
  },
}

export const RECORD_KEYWORDS_FIELD: EditorField = {
  model: 'keywords',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.keywords'),
  },
}

export const RECORD_UNIQUE_IDENTIFIER_FIELD: EditorField = {
  model: 'uniqueIdentifier',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.uniqueIdentifier'),
    locked: true,
  },
}

export const RECORD_RESOURCE_UPDATED_FIELD: EditorField = {
  model: 'resourceUpdated',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.resourceUpdated'),
  },
  gridColumnSpan: 1,
}

export const RECORD_UPDATED_FIELD: EditorField = {
  model: 'recordUpdated',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.recordUpdated'),
    locked: true,
  },
  onSaveProcess: '${dateNow()}',
  gridColumnSpan: 1,
}

export const RECORD_UPDATE_FREQUENCY_FIELD: EditorField = {
  model: 'updateFrequency',
  formFieldConfig: {},
}
// keeping track of the label to not lose existing translation
marker('editor.record.form.field.updateFrequency')

export const RECORD_TEMPORAL_EXTENTS_FIELD: EditorField = {
  model: 'temporalExtents',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.temporalExtents'),
  },
}

export const RECORD_TITLE_FIELD: EditorField = {
  model: 'title',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.title'),
  },
}

export const RECORD_ABSTRACT_FIELD: EditorField = {
  model: 'abstract',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.abstract'),
  },
}

export const CONTACTS_FOR_RESOURCE_FIELD: EditorField = {
  model: 'contactsForResource',
  formFieldConfig: {
    labelKey: '',
  },
}

export const CONTACTS: EditorField = {
  model: 'contacts',
  formFieldConfig: {
    labelKey: '',
  },
}

export const RECORD_GRAPHICAL_OVERVIEW_FIELD: EditorField = {
  model: 'overviews',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.overviews'),
  },
}

export const RECORD_SPATIAL_EXTENTS_FIELD: EditorField = {
  model: 'spatialExtents',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.spatialExtents'),
  },
}

export const RECORD_ONLINE_RESOURCES: EditorField = {
  model: 'onlineResources',
  modelSpecifier: 'onlineResourceType:!link',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.onlineResources'),
  },
}

export const RECORD_ONLINE_LINK_RESOURCES: EditorField = {
  model: 'onlineResources',
  modelSpecifier: 'onlineResourceType:link',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.onlineLinkResources'),
  },
}

/************************************************************
 ***************          SECTIONS          *****************
 ************************************************************
 */

export const TITLE_SECTION: EditorSection = {
  hidden: false,
  fields: [
    RECORD_TITLE_FIELD,
    RECORD_ABSTRACT_FIELD,
    RECORD_GRAPHICAL_OVERVIEW_FIELD,
  ],
}

export const ABOUT_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.about.label'),
  descriptionKey: marker('editor.record.form.section.about.description'),
  hidden: false,
  fields: [
    RECORD_UNIQUE_IDENTIFIER_FIELD,
    RECORD_RESOURCE_UPDATED_FIELD,
    RECORD_UPDATED_FIELD,
    RECORD_UPDATE_FREQUENCY_FIELD,
    RECORD_TEMPORAL_EXTENTS_FIELD,
  ],
}

export const GEOGRAPHICAL_COVERAGE_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.geographicalCoverage.label'),
  hidden: false,
  fields: [RECORD_SPATIAL_EXTENTS_FIELD],
}

export const ASSOCIATED_RESOURCES_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.associatedResources.label'),
  descriptionKey: marker(
    'editor.record.form.section.associatedResources.description'
  ),
  hidden: false,
  fields: [RECORD_ONLINE_RESOURCES],
}

export const ANNEXES_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.annexes.label'),
  descriptionKey: marker('editor.record.form.section.annexes.description'),
  hidden: false,
  fields: [RECORD_ONLINE_LINK_RESOURCES],
}

export const CLASSIFICATION_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.classification.label'),
  descriptionKey: marker(
    'editor.record.form.section.classification.description'
  ),
  hidden: false,
  fields: [RECORD_KEYWORDS_FIELD],
}

export const USE_AND_ACCESS_CONDITIONS_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.useAndAccessConditions.label'),
  hidden: false,
  fields: [RECORD_LICENSE_FIELD],
}

export const DATA_MANAGERS_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.dataManagers.label'),
  descriptionKey: marker('editor.record.form.section.dataManagers.description'),
  hidden: false,
  fields: [CONTACTS_FOR_RESOURCE_FIELD],
}

export const DATA_POINT_OF_CONTACT_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.dataPointOfContact.label'),
  descriptionKey: marker(
    'editor.record.form.section.dataPointOfContact.description'
  ),
  hidden: false,
  fields: [CONTACTS],
}

/************************************************************
 ***************           PAGES            *****************
 ************************************************************
 */
export const DEFAULT_CONFIGURATION: EditorConfig = {
  pages: [
    {
      labelKey: marker('editor.record.form.page.description'),
      sections: [TITLE_SECTION, ABOUT_SECTION, GEOGRAPHICAL_COVERAGE_SECTION],
    },
    {
      labelKey: marker('editor.record.form.page.ressources'),
      sections: [ASSOCIATED_RESOURCES_SECTION, ANNEXES_SECTION],
    },
    {
      labelKey: marker('editor.record.form.page.accessAndContact'),
      sections: [
        CLASSIFICATION_SECTION,
        USE_AND_ACCESS_CONDITIONS_SECTION,
        DATA_MANAGERS_SECTION,
        DATA_POINT_OF_CONTACT_SECTION,
      ],
    },
  ],
}

/************************************************************
 ***************           LICENSES            **************
 ************************************************************
 */
export const OPEN_DATA_LICENSES: string[] = [
  'etalab',
  'etalab-v2',
  'odbl',
  'odc-by',
  'pddl',
]

export const MAX_UPLOAD_SIZE_MB = 10
/************************************************************
 ***************        SPATIAL SCOPE            ************
 ************************************************************
 */

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
