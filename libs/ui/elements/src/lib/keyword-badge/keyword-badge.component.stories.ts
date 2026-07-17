import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { KeywordBadgeComponent } from './keyword-badge.component'

export default {
  title: 'Elements/KeywordBadgeComponent',
  component: KeywordBadgeComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<KeywordBadgeComponent>

const keyword = {
  label: 'wind energy',
  type: 'theme',
  hierarchyPath: ['energy', 'renewable energy', 'wind energy'],
} satisfies Keyword

export const Clickable: StoryObj<KeywordBadgeComponent> = {
  args: { keyword },
}

export const Editable: StoryObj<KeywordBadgeComponent> = {
  args: { keyword, editMode: true },
}
