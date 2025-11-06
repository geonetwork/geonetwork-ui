import { provideI18n } from '@geonetwork-ui/util/i18n'
import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { ResultCardComponent } from './result-card.component'

export default {
  title: 'Elements/ResultCardComponent',
  component: ResultCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<ResultCardComponent>

export const Default: StoryObj<ResultCardComponent> = {
  args: {
    item: {
      id: 'item-1',
      datetime: '2023-01-15T10:30:00Z',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded p-4'>
      <gn-ui-result-card [item]="item"></gn-ui-result-card>
    </div>`,
  }),
}

export const WithLongId: StoryObj<ResultCardComponent> = {
  args: {
    item: {
      id: 'very-long-item-identifier-that-might-cause-layout-issues-in-the-card-component',
      datetime: '2023-08-10T16:45:30Z',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded p-4'>
      <gn-ui-result-card [item]="item"></gn-ui-result-card>
    </div>`,
  }),
}

export const WithShortId: StoryObj<ResultCardComponent> = {
  args: {
    item: {
      id: 'x',
      datetime: '2023-12-01T00:00:00Z',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='border border-black inline-block rounded p-4'>
      <gn-ui-result-card [item]="item"></gn-ui-result-card>
    </div>`,
  }),
}

export const MultipleCards: StoryObj<ResultCardComponent> = {
  args: {
    item: {
      id: 'item-1',
      datetime: '2023-06-15T12:00:00Z',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='flex gap-4 flex-wrap'>
      <div class='border border-black rounded p-4'>
        <gn-ui-result-card [item]="{id: 'item-1', datetime: '2023-06-15T12:00:00Z'}"></gn-ui-result-card>
      </div>
      <div class='border border-black rounded p-4'>
        <gn-ui-result-card [item]="{id: 'item-2', datetime: '2023-07-20T14:30:00Z'}"></gn-ui-result-card>
      </div>
      <div class='border border-black rounded p-4'>
        <gn-ui-result-card [item]="{id: 'item-3', datetime: '2023-08-25T09:15:00Z'}"></gn-ui-result-card>
      </div>
    </div>`,
  }),
}
