import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { DownloadItemComponent } from './download-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Elements/DownloadsListItemComponent',
  component: DownloadItemComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<DownloadItemComponent>

export const SizeXS: StoryObj<DownloadItemComponent> = {
  args: {
    size: 'XS',
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
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-download-item [link]="link" size="XS" color="#b3cde8" format="json" [isFromAPI]="true"></gn-ui-download-item>
    </div>`,
  }),
}

export const SizeS: StoryObj<DownloadItemComponent> = {
  args: {
    size: 'S',
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
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-download-item [link]="link" size="S" color="#FFF2CC" format="html" [isFromAPI]="true"></gn-ui-download-item>
    </div>`,
  }),
}

export const SizeM: StoryObj<DownloadItemComponent> = {
  args: {
    size: 'M',
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
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-download-item [link]="link" size="M" color="#a6d6c0" format="csv" [isFromAPI]="true"></gn-ui-download-item>
    </div>`,
  }),
}

export const SizeL: StoryObj<DownloadItemComponent> = {
  args: {
    size: 'L',
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
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded'>
      <gn-ui-download-item [link]="link" size="L" color="#f5b2a3" format="pdf" [isFromAPI]="true"></gn-ui-download-item>
    </div>`,
  }),
}
