import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import {
  RECORDS_FULL_FIXTURE,
  UtilSharedModule,
} from '@geonetwork-ui/util/shared'
import { RecordPreviewFeedComponent } from './record-preview-feed.component'
import { TranslateModule } from '@ngx-translate/core'
import { action } from '@storybook/addon-actions'
import { MatIconModule } from '@angular/material/icon'

export default {
  title: 'Search/RecordPreviewFeedComponent',
  component: RecordPreviewFeedComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilSharedModule,
        UiElementsModule,
        TranslateModule.forRoot(),
        MatIconModule,
      ],
    }),
  ],
} as Meta<RecordPreviewFeedComponent>

type RecordPreviewFeedTemplate = RecordPreviewFeedComponent & {
  favoriteTemplateString: string
}

const Template: Story<RecordPreviewFeedTemplate> = (
  args: RecordPreviewFeedTemplate
) => ({
  props: { ...args, mdSelect: action('mdSelect') },
  template: `<gn-ui-record-preview-feed
      [record]='record'
      [linkTarget]='linkTarget'
      (mdSelect)='mdSelect'
      [favoriteTemplate]='favorite'>
    </gn-ui-record-preview-feed>
    <ng-template #favorite let-record>${args.favoriteTemplateString}</ng-template>`,
})

export const Primary = Template.bind({})
Primary.args = {
  record: RECORDS_FULL_FIXTURE[0],
  linkTarget: '_blank',
  favoriteTemplateString: `<a href title="Mark '{{record.title}}' as favorite">
    1234 <mat-icon class='align-middle'>star</mat-icon>
  </a>`,
}
