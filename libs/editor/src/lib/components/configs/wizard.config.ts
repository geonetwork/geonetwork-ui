import { WizardFieldType } from '../../models/wizard-field.type'
import { WizardFieldModel } from '../../models/wizard-field.model'

export const DEFAULT_CHIPS_ITEMS_URL = (keys) =>
  `https://apps.titellus.net/geonetwork/srv/api/registries/vocabularies/search?type=CONTAINS&thesaurus=external.place.regions&rows=200&q=${keys}&uri=*QUERY*&lang=eng`

export const DEFAULT_WIZARD_CONFIGURATION: WizardFieldModel[][] = [
  [
    {
      id: 'title',
      label: 'datafeeder.form.title',
      icon: 'icon-title',
      type: WizardFieldType.TEXT,
    },
    {
      id: 'abstract',
      label: 'datafeeder.form.abstract',
      icon: 'icon-description',
      type: WizardFieldType.TEXT_AREA,
    },
  ],
  [
    {
      id: 'tags',
      label: 'datafeeder.form.tags',
      icon: 'icon-tag',
      type: WizardFieldType.CHIPS,
      options: {
        url: DEFAULT_CHIPS_ITEMS_URL,
      },
    },
  ],
  [
    {
      id: 'datepicker',
      label: 'datafeeder.form.datepicker',
      icon: 'icon-date',
      type: WizardFieldType.DATA_PICKER,
    },
    {
      id: 'dropdown',
      label: 'datafeeder.form.dropdown',
      icon: 'icon-scale',
      type: WizardFieldType.DROPDOWN,
    },
  ],
  [
    {
      id: 'description',
      label: 'datafeeder.form.description',
      icon: 'icon-process',
      type: WizardFieldType.TEXT_AREA,
    },
  ],
  [],
]
