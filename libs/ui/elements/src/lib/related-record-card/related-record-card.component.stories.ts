import { provideI18n } from '@geonetwork-ui/util/i18n'
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
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Elements/RelatedRecordCardComponent',
  component: RelatedRecordCardComponent,
  decorators: [
    moduleMetadata({
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule, RouterModule.forRoot([])),
        provideI18n(),
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
