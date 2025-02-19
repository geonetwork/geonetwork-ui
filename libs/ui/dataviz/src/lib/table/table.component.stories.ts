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
import { TableComponent } from './table.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiDatavizModule } from '../ui-dataviz.module'
import { importProvidersFrom } from '@angular/core'
import {
  BaseFileReader,
  DataItem,
  PropertyInfo,
} from '@geonetwork-ui/data-fetcher'

export default {
  title: 'Dataviz/TableComponent',
  component: TableComponent,
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
      (story) => `<div style="height: 400px">${story}</div>`
    ),
  ],
} as Meta<TableComponent>

export class MockBaseReader extends BaseFileReader {
  override getData(): Promise<{
    items: DataItem[]
    properties: PropertyInfo[]
  }> {
    return Promise.resolve({
      items: [
        {
          type: 'Feature',
          geometry: null,
          properties: {
            id: '0001',
            firstName: 'John',
            lastName: 'Lennon',
          },
        },
        {
          type: 'Feature',
          geometry: null,
          properties: {
            id: '0002',
            firstName: 'Ozzy',
            lastName: 'Osbourne',
          },
        },
        {
          type: 'Feature',
          geometry: null,
          properties: {
            id: '0003',
            firstName: 'Claude',
            lastName: 'François',
          },
        },
      ],
      properties: [
        { name: 'id', label: 'id', type: 'string' },
        { name: 'firstName', label: 'Firstname', type: 'string' },
        { name: 'lastName', label: 'Lastname', type: 'string' },
      ],
    })
  }
  // override read(): Promise<DataItem[]> {
  //   return Promise.resolve([
  //     {
  //       type: 'Feature',
  //       geometry: null,
  //       properties: {
  //         id: '0001',
  //         firstName: 'John',
  //         lastName: 'Lennon',
  //       },
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: null,
  //       properties: {
  //         id: '0002',
  //         firstName: 'Ozzy',
  //         lastName: 'Osbourne',
  //       },
  //     },
  //     {
  //       type: 'Feature',
  //       geometry: null,
  //       properties: {
  //         id: '0003',
  //         firstName: 'Claude',
  //         lastName: 'François',
  //       },
  //     },
  //   ])
  // }
}
const reader = new MockBaseReader('')

export const Primary: StoryObj<TableComponent> = {
  args: {
    dataset: reader,
  },
}
