import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
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
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-4" style="width: 400px; resize: both; overflow: auto">
  ${story}
</div>`
    ),
  ],
  argTypes: {
    keywordClick: { action: 'keywordClick' },
    keywordRemove: { action: 'keywordRemove' },
  },
} as Meta<KeywordBadgeComponent>

const keyword: Keyword = {
  label: 'wind energy',
  type: 'theme',
  hierarchyPath: ['energy', 'renewable energy', 'wind energy'],
}

export const Clickable: StoryObj<KeywordBadgeComponent> = {
  args: { keyword },
}

export const Editable: StoryObj<KeywordBadgeComponent> = {
  args: { keyword, editable: true },
}

export const PlaceKeywordWithoutExtent: StoryObj<KeywordBadgeComponent> = {
  args: {
    keyword: {
      label: 'agricultural areas',
      type: 'place',
    } as Keyword,
    editable: true,
  },
}
