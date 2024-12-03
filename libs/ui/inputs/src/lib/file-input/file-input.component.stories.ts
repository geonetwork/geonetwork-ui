import { HttpClientModule } from '@angular/common/http'
import { importProvidersFrom } from '@angular/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { FileInputComponent } from './file-input.component'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/FileInputComponent',
  component: FileInputComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(UtilI18nModule),
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
    }),
    moduleMetadata({
      imports: [FileInputComponent],
    }),
  ],
} as Meta<FileInputComponent>

export const Primary: StoryObj<FileInputComponent> = {
  args: {
    maxSizeMB: 5,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      fileChange: action('fileChange'),
      urlChange: action('urlChange'),
      uploadCancel: action('uploadCancel'),
    },
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-file-input
        [maxSizeMB]="maxSizeMB"
        [disabled]="disabled"
        (fileChange)='fileChange($event)'
        (urlChange)='urlChange($event)'
        (uploadCancel)='uploadCancel($event)'>
      </gn-ui-file-input>
    </div>`,
  }),
}

export const UploadProgress5: StoryObj<FileInputComponent> = {
  args: {
    maxSizeMB: 5,
    uploadProgress: 5,
  },
  render: (args) => ({
    props: {
      ...args,
      fileChange: action('fileChange'),
      urlChange: action('urlChange'),
      uploadCancel: action('uploadCancel'),
    },
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-file-input
        [maxSizeMB]="maxSizeMB"
        [uploadProgress]="uploadProgress"
        (fileChange)='fileChange($event)'
        (urlChange)='urlChange($event)'
        (uploadCancel)='uploadCancel($event)'>
      ></gn-ui-file-input>
    </div>`,
  }),
}

export const UploadProgress75: StoryObj<FileInputComponent> = {
  args: {
    maxSizeMB: 5,
    uploadProgress: 75,
  },
  render: (args) => ({
    props: {
      ...args,
      fileChange: action('fileChange'),
      urlChange: action('urlChange'),
      uploadCancel: action('uploadCancel'),
    },
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-file-input
        [maxSizeMB]="maxSizeMB"
        [uploadProgress]="uploadProgress"
        (fileChange)='fileChange($event)'
        (urlChange)='urlChange($event)'
        (uploadCancel)='uploadCancel($event)'>
      ></gn-ui-file-input>
    </div>`,
  }),
}
