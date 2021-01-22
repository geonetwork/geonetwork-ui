import { TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { DatepickerComponent } from './datepicker.component'
import { MyDatePickerModule } from 'mydatepicker'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

const moduleMetadatas = {
  imports: [
    TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
    NgxDropzoneModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MyDatePickerModule,
  ],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const DatePickerStory = () => ({
  component: DatepickerComponent,
  props: {},
})
DatePickerStory.storyName = 'Date picker'
