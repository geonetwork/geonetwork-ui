import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { importProvidersFrom } from '@angular/core'
import { USER_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { UserPreviewComponent } from './user-preview.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { AvatarComponent } from '../avatar/avatar.component'

export default {
  title: 'Elements/UserPreviewComponent',
  component: UserPreviewComponent,
  decorators: [
    moduleMetadata({
      declarations: [AvatarComponent],
      imports: [MatTooltipModule],
      providers: [],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule, RouterModule.forRoot([])),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<UserPreviewComponent>

export const Primary: StoryObj<UserPreviewComponent> = {
  args: {
    user: USER_FIXTURE(),
    avatarPlaceholder: 'https://www.gravatar.com/avatar/?d=mp',
  },
}
