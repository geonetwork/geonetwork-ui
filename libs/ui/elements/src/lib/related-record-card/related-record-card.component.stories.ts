import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { RelatedRecordCardComponent } from './related-record-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common'
import { importProvidersFrom } from '@angular/core'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Elements/RelatedRecordCardComponent',
  component: RelatedRecordCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ThumbnailComponent],
      imports: [
        RouterModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        MatTooltipModule,
        UtilSharedModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule, RouterModule.forRoot([])),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<RelatedRecordCardComponent>

export const Primary: StoryObj<RelatedRecordCardComponent> = {
  args: {
    record: datasetRecordsFixture()[0] as CatalogRecord,
  },
}
