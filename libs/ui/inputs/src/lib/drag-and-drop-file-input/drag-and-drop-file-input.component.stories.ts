import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { NgxDropzoneModule } from 'ngx-dropzone'

export default {
  title: 'Inputs/DragAndDropFileInputComponent',
  component: DragAndDropFileInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        NgxDropzoneModule,
      ],
    }),
  ],
} as Meta<DragAndDropFileInputComponent>

export const Primary: StoryObj<DragAndDropFileInputComponent> = {
  args: {
    placeholder: 'Drag and drop file',
    accept: '*',
  },
  argTypes: {
    fileChange: {
      action: 'fileChange',
    },
  },
}
