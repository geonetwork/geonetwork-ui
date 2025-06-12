import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ButtonComponent } from './button.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matDownloading,
  matFitScreen,
  matPestControl,
  matTravelExplore,
  matWaves,
} from '@ng-icons/material-icons/baseline'

export default {
  title: 'Inputs/ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [MatProgressSpinnerModule, NgIconComponent],
    }),
    applicationConfig({
      providers: [
        provideI18n(),
        provideIcons({
          matDownloading,
          matPestControl,
          matWaves,
          matTravelExplore,
          matFitScreen,
        }),
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
      options: [
        'primary',
        'secondary',
        'default',
        'outline',
        'light',
        'gray',
        'black',
      ],
    },
  },
  render: (args) => ({
    props: args,
    template: `<div class='flex flex-row gap-5 flex-wrap'>
  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    {{ content }}
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled" [extraClass]="extraClass">
    with an icon&nbsp;<ng-icon name="matDownloading"></ng-icon>
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled"
    [style.--gn-ui-button-font-size]='"1.5em"'
    [extraClass]="extraClass">
    <ng-icon name="matTravelExplore"></ng-icon>&nbsp;bigger (with variable)
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled"
    [style.font-size]='"0.7em"'
    [extraClass]="extraClass">
    <ng-icon name="matPestControl"></ng-icon>&nbsp;smaller (with css)
  </gn-ui-button>
  <gn-ui-button [type]="type" [disabled]="disabled"
    [style.--gn-ui-button-padding]='"0.5em 3em"'
    [extraClass]="extraClass">
    different&nbsp;<ng-icon name="matWaves"></ng-icon>&nbsp;shape
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
      <ng-icon name="matFitScreen"></ng-icon>&nbsp;resize it
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
