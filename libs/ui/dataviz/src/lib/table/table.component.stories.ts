import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { TableComponent } from './table.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiDatavizModule } from '../ui-dataviz.module'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Layout/TableComponent',
  component: TableComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(UiDatavizModule),
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 700px">${story}</div>`
    ),
  ],
} as Meta<TableComponent>

export const Primary: StoryObj<TableComponent> = {
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
