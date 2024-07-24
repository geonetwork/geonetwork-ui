import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
} from '@storybook/angular'
import { GeoTableViewComponent } from './geo-table-view.component'
import { importProvidersFrom } from '@angular/core'
import { FeatureDetailComponent } from '@geonetwork-ui/ui/map'

export default {
  title: 'Map/GeoTable',
  component: GeoTableViewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FeatureDetailComponent,
        UiLayoutModule,
        FeatureMapModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="height: 400px">${story}</div>`
    ),
  ],
} as Meta<GeoTableViewComponent>

/*export const POINTS: StoryObj<GeoTableViewComponent> = {
  args: {
    data: FEATURE_COLLECTION_POINT_FIXTURE_4326,
  },
}*/
