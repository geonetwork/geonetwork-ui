import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { TruncatedTextComponent } from './truncated-text.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const meta: Meta<TruncatedTextComponent> = {
  component: TruncatedTextComponent,
  title: 'Layout/TruncatedText',
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <div [style.width]="width" class="border border-gray-300">
        <gn-ui-truncated-text [text]="text"></gn-ui-truncated-text>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<TruncatedTextComponent & { width: string }>

export const ShortText: Story = {
  args: {
    text: 'This is a short text that will not be truncated',
    width: '500px',
  },
}

export const LongText: Story = {
  args: {
    text: 'This is a very long text that will definitely be truncated because it contains too many characters to fit in the container width and thus will show an ellipsis and the open button',
    width: '300px',
  },
}

export const VeryNarrow: Story = {
  args: {
    text: 'This text will be truncated',
    width: '120px',
  },
}

export const TextFitPerfectly: Story = {
  args: {
    text: 'This text will not be truncated',
    width: '230px',
  },
}

export const URL: Story = {
  args: {
    text: 'https://www.very-long-domain-name-example.com/with/very/long/path/that/should/be/truncated',
    width: '200px',
  },
}
