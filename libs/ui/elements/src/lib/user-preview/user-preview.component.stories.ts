import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { barbieUserFixture } from '@geonetwork-ui/common/fixtures'
import { UserPreviewComponent } from './user-preview.component'

export default {
  title: 'Elements/UserPreviewComponent',
  component: UserPreviewComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<UserPreviewComponent>

export const Primary: StoryObj<UserPreviewComponent> = {
  args: {
    user: barbieUserFixture(),
    avatarPlaceholder: 'https://www.gravatar.com/avatar/?d=mp',
  },
}
