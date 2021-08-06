import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { DatepickerComponent } from './datepicker.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { AngularMyDatePickerModule } from 'angular-mydatepicker'

export default {
  title: 'Inputs/DatepickerComponent',
  component: DatepickerComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        NgxDropzoneModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        AngularMyDatePickerModule,
      ],
    }),
  ],
} as Meta<DatepickerComponent>

const Template: Story<DatepickerComponent> = (args: DatepickerComponent) => ({
  component: DatepickerComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  options: {},
  currentDate: new Date(),
}
Primary.argTypes = {
  currentDate: {
    control: 'date',
  },
  selectedDate: {
    action: 'selectedDate',
  },
}
