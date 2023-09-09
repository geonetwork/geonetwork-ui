import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ButtonComponent } from './button.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { MatIconModule } from '@angular/material/icon'

export default {
  title: 'Inputs/ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        MatIconModule,
      ],
    }),
  ],
} as Meta<ButtonComponent>

type ButtonComponentWithContent = ButtonComponent & { content: string }

export const Primary: StoryObj<ButtonComponentWithContent> = {
  args: {
    type: 'default',
    disabled: false,
    extraClass: '',
    content: 'My button',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['primary', 'secondary', 'default', 'outline', 'light'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<div class='flex flex-row gap-5'>
  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    {{ content }}
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    with an icon&nbsp;<mat-icon class="material-symbols-outlined">downloading</mat-icon>
  </gn-ui-button>
  <gn-ui-button class="text-[1.5em]" [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    <mat-icon class='material-symbols-outlined'>globe_asia</mat-icon>&nbsp;bigger
  </gn-ui-button>
  <gn-ui-button class="text-[0.7em]" [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    <mat-icon class='material-symbols-outlined'>pest_control</mat-icon>&nbsp;smaller
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass + ' !px-[3em] !py-[0.5em]'">
    different&nbsp;<mat-icon class="material-symbols-outlined">waves</mat-icon>&nbsp;shape
  </gn-ui-button>
</div>`,
  }),
}
