import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { ApisListItemComponent } from './apis-list-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiElementsModule } from '../ui-elements.module'

export default {
  title: 'Elements/ApisListItemComponent',
  component: ApisListItemComponent,
  decorators: [
    moduleMetadata({
      imports: [UiElementsModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ApisListItemComponent>

const Template: Story<ApisListItemComponent> = (
  args: ApisListItemComponent
) => ({
  component: ApisListItemComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  link: {
    protocol: 'OGC:WFS',
    name: 'Allroads',
    description: 'A file that contains all roads',
    url: 'https//roads.com/wfs',
  },
}
Primary.argTypes = {
  exportUrl: {
    action: 'exportUrl',
  },
}
