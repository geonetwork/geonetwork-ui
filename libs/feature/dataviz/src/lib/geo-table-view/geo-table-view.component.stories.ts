import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { GeoTableViewComponent } from './geo-table-view.component'
import { importProvidersFrom } from '@angular/core'
import {
  FeatureDetailComponent,
  MapContainerComponent,
} from '@geonetwork-ui/ui/map'
import { pointFeatureCollectionFixture } from '@geonetwork-ui/common/fixtures'
import { TableComponent } from '@geonetwork-ui/ui/dataviz'
import { HttpClientModule } from '@angular/common/http'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  BaseFileReader,
  DataItem,
  PropertyInfo,
} from '@geonetwork-ui/data-fetcher'
// import { parseGeojson } from 'libs/util/data-fetcher/src/lib/readers/geojson'

export default {
  title: 'Map/GeoTable',
  component: GeoTableViewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FeatureDetailComponent,
        MapContainerComponent,
        TableComponent,
        BrowserAnimationsModule,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
        importProvidersFrom(HttpClientModule),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="height: 480px">${story}</div>`
    ),
  ],
} as Meta<GeoTableViewComponent>

export class MockBaseReader extends BaseFileReader {
  override getData(): Promise<{
    items: DataItem[]
    properties: PropertyInfo[]
  }> {
    // return Promise.resolve(
    //   parseGeojson(JSON.stringify(pointFeatureCollectionFixture()))
    // )
    return Promise.resolve({
      items: pointFeatureCollectionFixture().features,
      properties: [
        { name: 'gml_id', label: 'GML ID', type: 'string' },
        { name: 'GRAPHES', label: 'Graphes', type: 'string' },
        { name: 'LIEU_IDENTIFIANT', label: 'Lieu Identifiant', type: 'number' },
        { name: 'LIEU_LIBELLE', label: 'Lieu Libelle', type: 'string' },
        { name: 'LIEU_MNEMONIQUE', label: 'Lieu Mnemonique', type: 'string' },
        { name: 'LATITUDE', label: 'Latitude', type: 'string' },
        { name: 'LONGITUDE', label: 'Longitude', type: 'string' },
        {
          name: 'DCSMM_SOUS_REGION',
          label: 'DCSMM Sous Region',
          type: 'string',
        },
        {
          name: 'QUADRIGE_ZONEMARINE',
          label: 'Quadrige Zonemarine',
          type: 'string',
        },
        { name: 'DCE_MASSE_EAU', label: 'DCE Masse Eau', type: 'string' },
        { name: 'TAXON_PRESENT', label: 'Taxon Present', type: 'string' },
        { name: 'PROGRAMME', label: 'Programme', type: 'string' },
        {
          name: 'SUPPORT_NIVEAUPRELEVEMENT',
          label: 'Support Niveau Prelevement',
          type: 'string',
        },
        { name: 'THEME', label: 'Theme', type: 'string' },
        { name: 'DATEMIN', label: 'Date Min', type: 'string' },
        { name: 'DATEMAX', label: 'Date Max', type: 'string' },
      ],
    })
  }
}
const reader = new MockBaseReader('')

export const Primary: StoryObj<GeoTableViewComponent> = {
  args: {
    dataset: reader,
  },
}
