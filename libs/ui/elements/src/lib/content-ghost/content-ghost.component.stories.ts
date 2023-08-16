import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { ContentGhostComponent } from './content-ghost.component'
import { importProvidersFrom } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

export default {
  title: 'Elements/ContentGhostComponent',
  component: ContentGhostComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserModule)],
    }),
  ],
} as Meta<ContentGhostComponent>

type Args = ContentGhostComponent & { content: string }

const content = 'My content'

export const Primary: StoryObj<ContentGhostComponent> = {
  args: {
    showContent: false,
    ghostClass: 'h-full',
  },
  render: (args) => ({
    template: `<div class="border border-gray-500 overflow-auto p-2" style="resize: both; width: 600px; height: 250px">
    <gn-ui-content-ghost [showContent]="showContent">${content}</gn-ui-content-ghost>
  </div>`,
  }),
}
