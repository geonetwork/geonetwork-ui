import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { ResultsTableComponent } from './results-table.component'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { action } from '@storybook/addon-actions'
import { MatIconModule } from '@angular/material/icon'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import {
  InteractiveTableColumnComponent,
  InteractiveTableComponent,
} from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { importProvidersFrom } from '@angular/core'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'

const meta: Meta<ResultsTableComponent> = {
  component: ResultsTableComponent,
  title: 'Search/ResultsTableComponent',
  decorators: [
    moduleMetadata({
      imports: [
        UiInputsModule,
        InteractiveTableComponent,
        InteractiveTableColumnComponent,
        MatIconModule,
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(TranslateModule.forRoot())],
    }),
  ],
  render: (args: ResultsTableComponent) => ({
    props: {
      ...args,
      recordSelect: action('recordSelect'),
      sortByChange: action('sortByChange'),
    },
  }),
}
export default meta
type Story = StoryObj<ResultsTableComponent>

export const Primary: Story = {
  args: {},
}
