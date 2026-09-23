import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { of } from 'rxjs'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  GEOCODING_RESULT_LABELS,
  LocationSearchComponent,
} from './location-search.component'
import { GeocodingService } from '../geocoding/geocoding.service'

const results: GeocodingResult[] = [
  {
    label: 'Beaufort',
    geom: { type: 'Point', coordinates: [6.771, 45.72] },
    properties: { category: ['poi', 'commune'], citycode: ['38150'] },
  },
  {
    label: 'Beaufort',
    geom: { type: 'Point', coordinates: [6.099, 45.72] },
    properties: { category: ['poi', 'commune'], citycode: ['73180'] },
  },
  {
    label: 'Beaufort',
    geom: { type: 'Point', coordinates: [4.099, 44.13] },
    properties: { category: ['poi', 'commune'], citycode: ['05202'] },
  },
]

export default {
  title: 'Search/LocationSearchComponent',
  component: LocationSearchComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideI18n(),
        {
          provide: GeocodingService,
          useValue: {
            query: (text: string) =>
              of(
                results.filter((r) =>
                  r.label.toLowerCase().includes(text.toLowerCase())
                )
              ),
          },
        },
      ],
    }),
  ],
  argTypes: {
    resultSelected: { action: 'resultSelected' },
    bboxSelected: { action: 'bboxSelected' },
  },
} as Meta<LocationSearchComponent>

export const Default: StoryObj<LocationSearchComponent> = {
  args: {
    placeholder: 'Search for a place',
  },
}

export const WithSpatialExtentLabels: StoryObj<LocationSearchComponent> = {
  args: {
    placeholder: 'Search for a place',
  },
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: GEOCODING_RESULT_LABELS,
          useValue: {
            secondaryLabel: '/properties/category/1',
            tertiaryLabel: '/properties/citycode/0',
          },
        },
      ],
    }),
  ],
}
