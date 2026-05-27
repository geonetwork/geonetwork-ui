import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular'
import { NotifyReuseFormComponent } from './notify-reuse-form.component'
import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'

const RECORD: ReuseRecord = {
  uniqueIdentifier: 'story-reuse-001',
  kind: 'reuse',
  title: 'Photographie aérienne 2021 — Saint-Etienne-Roilaye',
  abstract:
    'Orthophotoplan 2021 sur le territoire de la commune de Saint-Etienne-Roilaye.',
  reuseType: 'map',
  lineage: '',
  onlineResources: [
    {
      type: 'link',
      url: new URL('https://example.com/viewer'),
      name: 'Visionneuse en ligne',
    },
  ],
  spatialExtents: [],
  temporalExtents: [],
  contacts: [],
  contactsForResource: [],
  keywords: [],
  topics: [],
  legalConstraints: [],
  securityConstraints: [],
  otherConstraints: [],
  licenses: [],
  overviews: [],
  ownerOrganization: { name: 'Geo2France', translations: {} },
  recordUpdated: new Date('2022-12-08'),
  defaultLanguage: 'fr',
  otherLanguages: [],
}

export default {
  title: 'Smart/NotifyReuse/NotifyReuseForm',
  component: NotifyReuseFormComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div class="max-w-3xl p-6">${story}</div>`
    ),
  ],
} as Meta<NotifyReuseFormComponent>

export const Primary: StoryObj<NotifyReuseFormComponent> = {
  args: {
    record: RECORD,
  },
}

export const WithoutRecord: StoryObj<NotifyReuseFormComponent> = {
  args: {
    record: null,
  },
}
