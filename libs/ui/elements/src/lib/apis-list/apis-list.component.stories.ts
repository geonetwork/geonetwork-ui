import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { ApisListComponent } from './apis-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiElementsModule } from '../ui-elements.module'

export default {
  title: 'Elements/ApisListComponent',
  component: ApisListComponent,
  decorators: [
    moduleMetadata({
      imports: [UiElementsModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ApisListComponent>

const Template: Story<ApisListComponent> = (args: ApisListComponent) => ({
  component: ApisListComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  links: [
    {
      protocol: 'OGC:WFS',
      name: 'Roads',
      description: 'A file that contains all roads',
      url: 'https//roads.com/wfs',
    },
    {
      protocol: 'ESRI:REST',
      name: 'Roads',
      description: 'A file that contains all roads',
      url: 'https//roads.com/rest',
    },
  ],
}
