import { TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { select, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { UiModule } from '../ui.module'
import { ButtonComponent } from './button.component'

const moduleMetadatas = {
  imports: [TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG), UiModule],
}

export default {
  title: 'UI/Button',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const ButtonSimpleStory = () => ({
  component: ButtonComponent,
  template: '<ui-button [type]="type">{{content}}</ui-button>',
  props: {
    type: select('buttonType', ['primary', 'secondary', 'default'], 'primary'),
    content: text('buttonContent', 'My Button2'),
  },
})
ButtonSimpleStory.storyName = 'Simple'
