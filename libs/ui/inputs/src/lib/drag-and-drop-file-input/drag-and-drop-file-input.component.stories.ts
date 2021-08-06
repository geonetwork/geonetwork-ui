import { Meta, moduleMetadata, Story } from '@storybook/angular'
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

const Template: Story<DragAndDropFileInputComponent> = (
  args: DragAndDropFileInputComponent
) => ({
  component: DragAndDropFileInputComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  placeholder: 'Drag and drop file',
  accept: '*',
}
Primary.argTypes = {
  fileChange: {
    action: 'fileChange',
  },
}
