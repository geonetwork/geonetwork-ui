import { TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { color, number, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { GnAggregatedRecordsComponent } from '../src/app/gn-aggregated-records.component'
import { GnAggregatedRecordsModule } from '../src/app/gn-aggregated-records.module'

const moduleMetadatas = {
  imports: [
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    GnAggregatedRecordsModule,
  ],
}

export default {
  title: '_Web Component',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const AggregatedRecordsStory = () => ({
  component: GnAggregatedRecordsComponent,
  props: {
    aggregationField: text('Aggregation Field', 'tag'),
    aggregationMaxCount: number('Aggregation Max Count', 20),
    aggregationQueryString: text('Aggregation Query String', '+isTemplate:n'),
    apiUrl: text('Api URL', 'https://apps.titellus.net/geonetwork/srv/api'),
    primaryColor: color('Primary Color', '#e73f51'),
    secondaryColor: color('Secondary Color', '#c2e9dc'),
    mainColor: color('Main Color', '#212029'),
    backgroundColor: color('Background Color', '#fdfbff'),
  },
})
AggregatedRecordsStory.storyName = 'Aggregated Records Component'
