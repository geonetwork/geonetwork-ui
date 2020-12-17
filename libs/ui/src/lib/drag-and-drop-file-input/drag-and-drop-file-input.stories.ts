import { TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input.component'

const moduleMetadatas = {
  imports: [
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    NgxDropzoneModule,
  ],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const DragAndDropFileInputStory = () => ({
  component: DragAndDropFileInputComponent,
  props: {
    placeholder: text('placeholder', 'Drag and drop file'),
    fileChange: action('output'),
  },
})
DragAndDropFileInputStory.storyName = 'Drag and drop file input'
