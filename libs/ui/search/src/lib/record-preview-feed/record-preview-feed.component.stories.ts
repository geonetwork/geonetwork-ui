import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RecordPreviewFeedComponent } from './record-preview-feed.component'
import { importProvidersFrom } from '@angular/core'
import { action } from '@storybook/addon-actions'
import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matStar } from '@ng-icons/material-icons/baseline'

export default {
  title: 'Search/RecordPreviewFeedComponent',
  component: RecordPreviewFeedComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        UiDatavizModule,
        UtilSharedModule,
        NgIconComponent,
        ThumbnailComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
        provideIcons({
          matStar,
        }),
      ],
    }),
  ],
} as Meta<RecordPreviewFeedComponent>

type RecordPreviewFeedTemplate = RecordPreviewFeedComponent & {
  favoriteTemplateString: string
}

export const Primary: StoryObj<RecordPreviewFeedTemplate> = {
  args: {
    record: datasetRecordsFixture()[0] as CatalogRecord,
    linkTarget: '_blank',
    favoriteTemplateString: `<a href title="Mark '{{record.title}}' as favorite">
    1234 <ng-icon name="matStar" class="align-middle"></ng-icon>
  </a>`,
  },
  render: (args) => ({
    props: { ...args, mdSelect: action('mdSelect') },
    template: `<gn-ui-record-preview-feed
      [record]='record'
      [linkTarget]='linkTarget'
      (mdSelect)='mdSelect'
      [favoriteTemplate]='favorite'>
    </gn-ui-record-preview-feed>
    <ng-template #favorite let-record>${args.favoriteTemplateString}</ng-template>`,
  }),
}
