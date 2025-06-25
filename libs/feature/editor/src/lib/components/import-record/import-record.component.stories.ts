import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ImportRecordComponent } from './import-record.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent, UrlInputComponent } from '@geonetwork-ui/ui/inputs'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { of } from 'rxjs'

class MockRecordsRepository {
  importRecordFromExternalFileUrlAsDraft(url: string) {
    return of('mockedRecordTempId')
  }
}

export default {
  title: 'Elements/ImportRecordComponent',
  component: ImportRecordComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ButtonComponent,
        ThumbnailComponent,
        UrlInputComponent,
      ],
      providers: [
        {
          provide: RecordsRepositoryInterface,
          useClass: MockRecordsRepository,
        },
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 500px; margin: auto;">${story}</div>`
    ),
  ],
} as Meta<ImportRecordComponent>

export const Primary: StoryObj<ImportRecordComponent> = {
  args: {},
}
