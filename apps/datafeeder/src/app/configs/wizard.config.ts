import { WizardFieldType } from '@lib/editor'
import { WizardFieldModel } from '@lib/editor'

export const DEFAULT_CHIPS_ITEMS_URL = (keys) =>
  `https://www.pigma.org/geonetwork/srv/api/registries/vocabularies/search?type=CONTAINS&thesaurus=external.theme.inspire-theme&rows=200&q=${keys}&uri=**&lang=eng`

export const STORAGE_KEY = 'datafeeder-state'

export const DEFAULT_WIZARD_CONFIGURATION: WizardFieldModel[][] = [
  [
    {
      id: 'title',
      label: 'datafeeder.form.title',
      icon: 'icon-title',
      type: WizardFieldType.TEXT,
      required: true,
    },
    {
      id: 'abstract',
      label: 'datafeeder.form.abstract',
      icon: 'icon-description',
      type: WizardFieldType.TEXT_AREA,
      required: true,
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
      required: true,
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
      required: true,
    },
  ],
  [],
]

export const config = {
  storageKey: STORAGE_KEY,
  configuration: DEFAULT_WIZARD_CONFIGURATION,
}
