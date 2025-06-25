import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { ExpandablePanelComponent } from './expandable-panel.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Layout/Expandable Panel',
  component: ExpandablePanelComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 700px">${story}</div>`
    ),
  ],
} as Meta<ExpandablePanelComponent>

export const Primary: StoryObj<ExpandablePanelComponent> = {
  render: (args) => ({
    props: args,
    template: `
    <gn-ui-expandable-panel title="Panel Title" [iconColor]="'var(--color-gray-800)'">
      Illud tamen clausos vehementer angebat quod captis navigiis,
      quae frumenta vehebant per flumen, Isauri quidem alimentorum
      copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo
      inediae propinquantis aerumnas exitialis horrebant.
    </gn-ui-expandable-panel>`,
  }),
}

export const WithCustomTitle: StoryObj<ExpandablePanelComponent> = {
  render: (args) => ({
    props: args,
    template: `
    <gn-ui-expandable-panel [iconColor]="'var(--color-main)'">
      <ng-template #titleTemplate>
        <div>
          <div class="text-xl font-bold">Custom Title</div>
          <div class="text-medium">Subtitle with more details</div>
        </div>
      </ng-template>
      Illud tamen clausos vehementer angebat quod captis navigiis,
      quae frumenta vehebant per flumen, Isauri quidem alimentorum
      copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo
      inediae propinquantis aerumnas exitialis horrebant.
    </gn-ui-expandable-panel>`,
  }),
}

export const WithCustomIconColor: StoryObj<ExpandablePanelComponent> = {
  render: (args) => ({
    props: args,
    template: `
    <gn-ui-expandable-panel title="Custom Icon Color" [iconColor]="'var(--color-secondary)'">
      This panel uses a custom icon color defined as 'var(--color-secondary)'.
    </gn-ui-expandable-panel>`,
  }),
}
