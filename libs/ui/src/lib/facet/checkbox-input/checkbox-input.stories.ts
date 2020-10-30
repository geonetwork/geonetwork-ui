import { I18nModule } from '@lib/common'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { object, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { CheckboxInputComponent } from './checkbox-input.component'

const moduleMetadatas = {
  imports: [I18nModule],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const CheckboxInputStory = () => ({
  component: CheckboxInputComponent,
})
CheckboxInputStory.storyName = 'Checkbox input'
