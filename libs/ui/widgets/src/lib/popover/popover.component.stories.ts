import { Meta, moduleMetadata } from '@storybook/angular'
import { PopoverComponent } from './popover.component'
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

export const Primary = (args: PopoverComponent) => ({
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
Primary.args = {
  content: 'Default tooltip content',
  theme: '',
}
