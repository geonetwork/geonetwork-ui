import { I18nModule } from '@lib/common'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input.component'
import { NgxDropzoneModule } from 'ngx-dropzone'

const moduleMetadatas = {
  imports: [I18nModule, NgxDropzoneModule],
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
