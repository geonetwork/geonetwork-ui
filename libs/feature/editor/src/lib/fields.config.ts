import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  EditorConfig,
  EditorField,
  EditorSection,
} from './models/editor-config.model'

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
}

export const RECORD_UPDATED_FIELD: EditorField = {
  model: 'recordUpdated',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.recordUpdated'),
    locked: true,
  },
  onSaveProcess: '${dateNow()}',
}

export const RECORD_UPDATE_FREQUENCY_FIELD: EditorField = {
  model: 'updateFrequency',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.updateFrequency'),
  },
}

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

export const RECORD_GRAPHICAL_OVERVIEW_FIELD: EditorField = {
  model: 'overviews',
  formFieldConfig: {
    labelKey: marker('editor.record.form.field.overviews'),
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
  fields: [],
}

export const ASSOCIATED_RESOURCES_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.associatedResources.label'),
  descriptionKey: marker(
    'editor.record.form.section.associatedResources.description'
  ),
  hidden: false,
  fields: [],
}

export const ANNEXES_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.annexes.label'),
  hidden: false,
  fields: [],
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
  fields: [],
}

export const DATA_POINT_OF_CONTACT_SECTION: EditorSection = {
  labelKey: marker('editor.record.form.section.dataPointOfContact.label'),
  descriptionKey: marker(
    'editor.record.form.section.dataPointOfContact.description'
  ),
  hidden: false,
  fields: [],
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
