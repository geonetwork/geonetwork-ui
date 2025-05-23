import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { DragAndDropFileInputComponent } from './drag-and-drop-file-input.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/DragAndDropFileInputComponent',
  component: DragAndDropFileInputComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
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
