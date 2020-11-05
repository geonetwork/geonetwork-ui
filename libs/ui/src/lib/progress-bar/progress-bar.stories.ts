import { I18nModule } from '@lib/common'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { number, object, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { ProgressBarComponent } from './progress-bar.component'

const moduleMetadatas = {
  imports: [I18nModule],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const ProgressBarStory = () => ({
  component: ProgressBarComponent,
  props: {
    value: number('Value', 0),
  },
})
ProgressBarStory.storyName = 'Progress bar'
