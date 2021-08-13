import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { FEATURE_COLLECTION_POINT_FIXTURE_4326 } from '@geonetwork-ui/util/shared'
import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { GeoTableViewComponent } from './geo-table-view.component'
import {
  defaultMapOptions,
  FEATURE_MAP_OPTIONS,
  FeatureMapModule,
} from '@geonetwork-ui/feature/map'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'

export default {
  title: 'Map/GeoTable',
  component: GeoTableViewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        UiMapModule,
        UiLayoutModule,
        FeatureMapModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
} as Meta<GeoTableViewComponent>

const Template: Story<GeoTableViewComponent> = (
  args: GeoTableViewComponent
) => ({
  component: GeoTableViewComponent,
  props: args,
})

export const POINTS = Template.bind({})
POINTS.args = {
  data: FEATURE_COLLECTION_POINT_FIXTURE_4326,
}
