import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular'
import { FormFieldComponent } from './form-field.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatIcon } from '@angular/material/icon'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldFileComponent } from './form-field-file/form-field-file.component'
import { FormFieldTemporalExtentComponent } from './form-field-temporal-extent/form-field-temporal-extent.component'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'

export default {
  title: 'Inputs/FormFieldComponent',
  component: FormFieldComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        MatIcon,
        FormFieldSimpleComponent,
        FormFieldSpatialExtentComponent,
        FormFieldFileComponent,
        FormFieldTemporalExtentComponent,
        FormFieldRichComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `
      <div class="border border-gray-300 p-2 w-[600px] h-[400px] resize overflow-auto">
        ${story}
      </div>`
    ),
  ],
} as Meta<FormFieldComponent>

export const Basic: Story = (args) => ({
  props: {
    config: args,
  },
})

Basic.args = {
  model: 'myModel',
  type: 'text',
  labelKey: 'my.field.label',
  hintKey: 'my.field.hint',
  tooltipKey: 'my.field.tooltip',
  required: false,
  locked: false,
  invalid: false,
  invalidHintKey: '',
}
Basic.argTypes = {
  type: {
    control: 'radio',
    options: [
      'text',
      'number',
      'date',
      'list',
      'url',
      'toggle',
      'rich',
      'file',
      'spatial_extent',
      'temporal_extent',
    ],
  },
}
