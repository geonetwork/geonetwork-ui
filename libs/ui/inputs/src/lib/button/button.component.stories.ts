import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { ButtonComponent } from './button.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

export default {
  title: 'Inputs/ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        MatIconModule,
        MatProgressSpinnerModule,
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
    template: `<div class='flex flex-row gap-5 flex-wrap'>
  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    {{ content }}
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    with an icon&nbsp;<mat-icon class="material-symbols-outlined">downloading</mat-icon>
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled"
    [style.--gn-ui-button-font-size]='"1.5em"'
    [extraClass]="extraClass">
    <mat-icon class='material-symbols-outlined'>globe_asia</mat-icon>&nbsp;bigger (with variable)
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled"
    [style.font-size]='"0.7em"'
    [extraClass]="extraClass">
    <mat-icon class='material-symbols-outlined'>pest_control</mat-icon>&nbsp;smaller (with css)
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled"
    [style.--gn-ui-button-padding]='"0.5em 3em"'
    [extraClass]="extraClass">
    different&nbsp;<mat-icon class="material-symbols-outlined">waves</mat-icon>&nbsp;shape
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled"
    [style.--gn-ui-button-rounded]='"10px"'
    [extraClass]="extraClass">
    different corners
  </gn-ui-button>
  <div class='h-[150px] w-[150px] resize overflow-auto border border-gray-200 p-3'>
    <gn-ui-button [type]="type" [disabled]="disabled"
      [style.--gn-ui-button-width]='"100%"' [style.--gn-ui-button-height]='"100%"'
      [extraClass]="extraClass">
      <mat-icon class="material-symbols-outlined">fit_screen</mat-icon>&nbsp;resize it
    </gn-ui-button>
  </div>
  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    <mat-spinner [diameter]="32"></mat-spinner>
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled"
    [style.--gn-ui-button-background]='"rgba(168,255,235,1)"'
    [extraClass]="extraClass">
    different background
  </gn-ui-button>
</div>`,
  }),
}
