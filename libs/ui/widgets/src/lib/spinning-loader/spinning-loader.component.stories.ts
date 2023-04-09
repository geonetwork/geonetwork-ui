import { moduleMetadata, Meta, StoryFn, StoryObj } from '@storybook/angular'
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

export const Primary: StoryObj<SpinningLoaderComponent> = {}
