import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { of } from 'rxjs'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { LocationSearchComponent } from './location-search.component'
import { GeocodingService } from '../geocoding/geocoding.service'

const results: GeocodingResult[] = [
  { label: 'Beaufort', geom: { type: 'Point', coordinates: [6.771, 45.72] } },
  {
    label: 'Beaufort-en-Vallée',
    geom: { type: 'Point', coordinates: [-0.2, 47.43] },
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
  },
} as Meta<LocationSearchComponent>

export const Default: StoryObj<LocationSearchComponent> = {
  args: {
    placeholder: 'Search for a place',
  },
}
