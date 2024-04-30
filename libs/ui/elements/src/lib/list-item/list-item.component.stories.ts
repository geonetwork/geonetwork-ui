import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ListItemComponent } from './list-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { importProvidersFrom } from '@angular/core'
import { MatIcon } from '@angular/material/icon'

export default {
  title: 'Elements/ListItemComponent',
  component: ListItemComponent,
  decorators: [
    moduleMetadata({
      declarations: [MatIcon],
      imports: [TranslateModule.forRoot()],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ListItemComponent>

export const Primary: StoryObj<ListItemComponent> = {
  args: {
    link: {
      name: 'allroads.geojson',
      type: 'download',
      description: 'A file that contains all roads',
      url: new URL('https://roads.com/allroads.geojson'),
    },
  },
  argTypes: {
    exportUrl: {
      action: 'exportUrl',
    },
  },
}
