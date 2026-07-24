import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { NotifyReuseFormComponent } from './notify-reuse-form.component'
import { ReuseRecord } from '@geonetwork-ui/common/domain/model/record'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { provideGn4, provideRepositoryUrl } from '@geonetwork-ui/api/repository'

const RECORD: ReuseRecord = {
  uniqueIdentifier: 'story-reuse-001',
  kind: 'reuse',
  title: 'Photographie aérienne 2021 — Saint-Etienne-Roilaye',
  abstract:
    'Orthophotoplan 2021 sur le territoire de la commune de Saint-Etienne-Roilaye.',
  reuseType: 'map',
  lineage: '',
  sourceRecords: [],
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
    applicationConfig({
      providers: [
        provideI18n(),
        provideRepositoryUrl('/geonetwork/srv/api'),
        provideGn4(),
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `<div class="max-w-[400px] p-6">
      <gn-ui-notify-reuse-form [record]="record"></gn-ui-notify-reuse-form>
    </div>`,
  }),
} as Meta<NotifyReuseFormComponent>

export const Primary: StoryObj<NotifyReuseFormComponent> = {
  args: {
    record: RECORD,
  },
}
