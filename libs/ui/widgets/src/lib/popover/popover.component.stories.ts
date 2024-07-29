import { Meta, Story } from '@storybook/angular'
import { PopoverComponent } from './popover.component'
import { moduleMetadata } from '@storybook/angular'
import { CommonModule } from '@angular/common'

export default {
  title: 'Widgets/Popover',
  component: PopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    content: { control: 'text' },
    theme: {
      control: 'select',
      options: ['', 'light', 'light-border', 'translucent', 'material'],
    },
  },
} as Meta

const Template: Story<PopoverComponent> = (args: PopoverComponent) => ({
  component: PopoverComponent,
  props: args,
  template: `<gn-ui-popover [content]="content" [theme]="theme">Hover me to see tooltip</gn-ui-popover>`,
})

export const Default = Template.bind({})
Default.args = {
  content: 'Default tooltip content',
  theme: '',
}

export const TemplateContent: Story<PopoverComponent> = (
  args: PopoverComponent
) => ({
  component: PopoverComponent,
  template: `
    <ng-template #popoverTemplate>
      <div>
        <strong>Tooltip Header</strong>
        <p>Detailed information about the tooltip.</p>
      </div>
    </ng-template>
    <gn-ui-popover [content]="popoverTemplate" [theme]="theme">
      Hover me to see tooltip
    </gn-ui-popover>
  `,
})
