import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { SpinningLoaderComponent } from './spinning-loader.component'

export default {
  title: 'Widgets/SpinningLoaderComponent',
  component: SpinningLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<SpinningLoaderComponent>

const Template: Story<SpinningLoaderComponent> = () => ({
  component: SpinningLoaderComponent,
})

export const Primary = Template.bind({})
