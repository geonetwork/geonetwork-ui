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
      (story) => `<div style="max-width: 700px">${story}</div>`
    ),
  ],
} as Meta<StickyHeaderComponent>

const Template: Story<StickyHeaderComponent> = (
  args: StickyHeaderComponent
) => ({
  template: `
    <gn-ui-sticky-header minHeight='${args.minHeight}' title="Panel Title">
      <h1>My header</h1>
      <p class='text-muted'>This header should become smaller when scrolling down.</p>
    </gn-ui-sticky-header>`,
})

export const Primary = Template.bind({})
Primary.args = {
  minHeight: '100px',
}
