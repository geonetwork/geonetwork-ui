import { Meta, moduleMetadata, StoryFn } from '@storybook/angular'
import { OverlayComponent } from './overlay.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Elements/Overlay',
  component: OverlayComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
} as Meta<OverlayComponent>

const Template: StoryFn<OverlayComponent> = (args) => ({
  component: OverlayComponent,
  props: args,
  template: `
    <gn-ui-overlay>
      <div style="padding: 20px;">
        <h3>Overlay Content</h3>
        <p>Discover the innovative features of our software that streamline your workflow and enhance productivity. With user-friendly interfaces and powerful tools, you can achieve your goals more efficiently than ever.</p>
      </div>
    </gn-ui-overlay>
  `,
})

export const Default = Template.bind({})
Default.args = {}
