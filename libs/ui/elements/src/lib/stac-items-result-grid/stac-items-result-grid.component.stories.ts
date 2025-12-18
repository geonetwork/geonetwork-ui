import { provideI18n } from '@geonetwork-ui/util/i18n'
import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { StacItemsResultGridComponent } from './stac-items-result-grid.component.js'

export default {
  title: 'Elements/StacItemsResultGridComponent',
  component: StacItemsResultGridComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<StacItemsResultGridComponent>

export const Default: StoryObj<StacItemsResultGridComponent> = {
  args: {
    items: [
      {
        id: 'item-1',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-15T10:30:00Z' },
      },
      {
        id: 'item-2',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-02-20T14:45:00Z' },
      },
      {
        id: 'item-3',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-03-25T08:15:00Z' },
      },
    ],
  },
}

export const Empty: StoryObj<StacItemsResultGridComponent> = {
  args: {
    items: [],
  },
}

export const SingleItem: StoryObj<StacItemsResultGridComponent> = {
  args: {
    items: [
      {
        id: 'single-item',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-06-15T12:00:00Z' },
      },
    ],
  },
}

export const ManyItems: StoryObj<StacItemsResultGridComponent> = {
  args: {
    items: [
      {
        id: 'item-001',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-01T00:00:00Z' },
      },
      {
        id: 'item-002',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-02T06:30:00Z' },
      },
      {
        id: 'item-003',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-03T12:00:00Z' },
      },
      {
        id: 'item-004',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-04T18:30:00Z' },
      },
      {
        id: 'item-005',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-05T09:15:00Z' },
      },
      {
        id: 'item-006',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-06T15:45:00Z' },
      },
      {
        id: 'item-007',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-07T11:20:00Z' },
      },
      {
        id: 'item-010',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-10T19:50:00Z' },
      },
      {
        id: 'item-009',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-09T13:35:00Z' },
      },
      {
        id: 'item-011',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-11T07:25:00Z' },
      },
      {
        id: 'item-012',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-12T14:40:00Z' },
      },
      {
        id: 'item-008',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-01-08T17:10:00Z' },
      },
    ],
  },
}

export const WithLongIds: StoryObj<StacItemsResultGridComponent> = {
  args: {
    items: [
      {
        id: 'very-long-item-identifier-that-might-cause-layout-issues-in-the-grid-component-first',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-04-10T10:30:00Z' },
      },
      {
        id: 'another-extremely-long-item-identifier-to-test-grid-layout-behavior-second',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-04-11T14:45:00Z' },
      },
      {
        id: 'third-very-long-item-identifier-for-comprehensive-testing-of-responsive-behavior',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-04-12T08:15:00Z' },
      },
    ],
  },
}

export const WithMixedIdLengths: StoryObj<StacItemsResultGridComponent> = {
  args: {
    items: [
      {
        id: 'x',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-05-01T00:00:00Z' },
      },
      {
        id: 'medium-length-item-id',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-05-02T12:00:00Z' },
      },
      {
        id: 'extremely-long-item-identifier-that-tests-how-the-grid-handles-varying-content-lengths',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-05-03T18:30:00Z' },
      },
      {
        id: 'short',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-05-04T06:15:00Z' },
      },
      {
        id: 'another-very-long-identifier-for-testing-purposes',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-05-05T20:45:00Z' },
      },
      {
        id: 'abc',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2023-05-06T09:30:00Z' },
      },
    ],
  },
}

export const WithFourItems: StoryObj<StacItemsResultGridComponent> = {
  args: {
    items: [
      {
        id: 'recent-1',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2024-11-06T10:30:00Z' },
      },
      {
        id: 'recent-2',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2024-11-05T14:45:00Z' },
      },
      {
        id: 'recent-3',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2024-11-04T08:15:00Z' },
      },
      {
        id: 'recent-4',
        type: 'Feature',
        geometry: null,
        links: [],
        properties: { datetime: '2024-11-03T16:20:00Z' },
      },
    ],
  },
}
