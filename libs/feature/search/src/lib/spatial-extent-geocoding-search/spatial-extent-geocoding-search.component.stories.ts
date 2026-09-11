import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { of } from 'rxjs'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { loadAppConfig } from '@geonetwork-ui/util/app-config'
import { SpatialExtentGeocodingSearchComponent } from './spatial-extent-geocoding-search.component'
import { GeocodingService } from '../geocoding/geocoding.service'

// SpatialExtentGeocodingSearchComponent reads its JSONPath config from
// getOptionalSearchConfig(), which is only populated by loadAppConfig(); mock
// fetch just for that call so the story actually exercises the secondary/
// tertiary label rendering, instead of always falling back to the plain label.
async function loadStorySearchConfig() {
  const originalFetch = window.fetch
  window.fetch = (() =>
    Promise.resolve({
      ok: true,
      text: () =>
        Promise.resolve(`
[global]
geonetwork4_api_url = "/geonetwork/srv/api"
proxy_path = "/proxy/?url="

[theme]
primary_color = "#093564"
secondary_color = "#c2e9dc"
main_color = "#212029"
background_color = "#fdfbff"

[search.spatial_extent_service]
secondary_label_jsonpath = '$.properties.category[1]'
tertiary_label_jsonpath = '$.properties.citycode[0]'
`),
    })) as unknown as typeof fetch
  await loadAppConfig().finally(() => {
    window.fetch = originalFetch
  })
}

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
  title: 'Search/SpatialExtentGeocodingSearchComponent',
  component: SpatialExtentGeocodingSearchComponent,
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
    bboxSelected: { action: 'bboxSelected' },
  },
} as Meta<SpatialExtentGeocodingSearchComponent>

export const Default: StoryObj<SpatialExtentGeocodingSearchComponent> = {
  loaders: [
    async () => {
      await loadStorySearchConfig()
      return {}
    },
  ],
}
