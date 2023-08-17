import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ExpandablePanelButtonComponent } from './expandable-panel-button.component'
import { UiLayoutModule } from '../ui-layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from '@angular/material/icon'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Layout/Expandable Panel Button',
  component: ExpandablePanelButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [UiLayoutModule, MatIconModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `
<div class='relative p-3' style="max-width: 700px; height:300px">
  <p>Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.</p>
  ${story}
</div>`
    ),
  ],
} as Meta<ExpandablePanelButtonComponent>

type ExpandablePanelButtonTemplate = ExpandablePanelButtonComponent & {
  titleTemplateString: string
}

export const Primary: StoryObj<ExpandablePanelButtonTemplate> = {
  args: {
    titleTemplateString:
      "<mat-icon class='mr-4'>key</mat-icon> Open this menu to find out more",
  },
  render: (args) => ({
    props: args,
    template: `
    <gn-ui-expandable-panel-button [titleTemplate]='title'>
      <div class='bg-gray-50 p-3'>
        <p>
          Illud tamen clausos vehementer angebat quod captis navigiis,
          quae frumenta vehebant per flumen, Isauri quidem alimentorum
          copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo
          inediae propinquantis aerumnas exitialis horrebant.
        </p><br><br>
        <p>
          Illud tamen clausos vehementer angebat quod captis navigiis,
          quae frumenta vehebant per flumen, Isauri quidem alimentorum
          copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo
          inediae propinquantis aerumnas exitialis horrebant.
        </p><br><br>
        <p>
          Illud tamen clausos vehementer angebat quod captis navigiis,
          quae frumenta vehebant per flumen, Isauri quidem alimentorum
          copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo
          inediae propinquantis aerumnas exitialis horrebant.
        </p>
      </div>
    </gn-ui-expandable-panel-button>
    <ng-template #title>
      ${args.titleTemplateString}
    </ng-template>
`,
  }),
}
