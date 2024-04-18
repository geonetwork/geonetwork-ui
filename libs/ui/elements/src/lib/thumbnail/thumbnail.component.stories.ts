import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ThumbnailComponent } from './thumbnail.component'

export default {
  title: 'Elements/ThumbnailComponent',
  component: ThumbnailComponent,
  decorators: [
    moduleMetadata({
      imports: [ThumbnailComponent],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ThumbnailComponent>

export const Primary: StoryObj<ThumbnailComponent> = {}
