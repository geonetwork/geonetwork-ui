import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { UiLayoutModule } from '../ui-layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StickyHeaderComponent } from './sticky-header.component'

export default {
  title: 'Layout/Sticky Header',
  component: StickyHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [UiLayoutModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="bg-background overflow-y-scroll" style='position: relative; height: 400px'>
  <div style='height: 200vh'>
    <p class='m-4'>
      A top toolbar (this should not stay visible).
    </p>
    ${story}
    <p class='m-4'>
      Illud tamen clausos vehementer angebat quod captis navigiis, 
      quae frumenta vehebant per flumen, Isauri quidem alimentorum 
      copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo 
      inediae propinquantis aerumnas exitialis horrebant.
    </p>
    <p class='m-4'>
      Illud tamen clausos vehementer angebat quod captis navigiis, 
      quae frumenta vehebant per flumen, Isauri quidem alimentorum 
      copiis adfluebant, ipsi vero solitarum rerum cibos iam consumendo 
      inediae propinquantis aerumnas exitialis horrebant.
    </p>
  </div>
</div>`
    ),
  ],
} as Meta<StickyHeaderComponent>

const Template: Story<StickyHeaderComponent> = (
  args: StickyHeaderComponent
) => ({
  template: `
    <gn-ui-sticky-header
      minHeightPx='${args.minHeightPx}'
      fullHeightPx='${args.fullHeightPx}'>
      <ng-template let-expandRatio>
        <div class='bg-primary-darker p-8 h-full'>
          <p class='text-white font-bold' [style.font-size]='22 * (1 + expandRatio) + "px"'>My header</p>
          <p class='text-white' [style.opacity]='expandRatio * 0.7'>This header should become smaller when scrolling down.</p>
          <p class='text-white' [style.opacity]='expandRatio * 0.7'>Current expand ratio is {{expandRatio}}</p>
        </div>
      </ng-template>
    </gn-ui-sticky-header>`,
})

export const Primary = Template.bind({})
Primary.args = {
  minHeightPx: 100,
  fullHeightPx: 230,
}
