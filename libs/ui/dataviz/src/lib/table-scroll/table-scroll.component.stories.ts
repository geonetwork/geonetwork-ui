import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TableScrollComponent } from './table-scroll.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiDatavizModule } from '../ui-dataviz.module'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Dataviz/TableScrollComponent',
  component: TableScrollComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(UiDatavizModule),
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(UtilI18nModule),
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 700px; height: 400px">${story}</div>`
    ),
  ],
} as Meta<TableScrollComponent>

export const Primary: StoryObj<TableScrollComponent> = {
  args: {
    data: [
      {
        id: '0001',
        firstName: 'John',
        lastName: 'Lennon',
      },
      {
        id: '0002',
        firstName: 'Ozzy',
        lastName: 'Osbourne',
      },
      {
        id: '0003',
        firstName: 'Claude',
        lastName: 'François',
      },
    ],
  },
}
