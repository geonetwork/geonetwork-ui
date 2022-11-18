import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { FEATURE_COLLECTION_POINT_FIXTURE_4326 } from '@geonetwork-ui/util/shared/fixtures'
import { TranslateModule } from '@ngx-translate/core'
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular'
import { GeoTableViewComponent } from './geo-table-view.component'
import { MapContextComponent } from '@geonetwork-ui/feature/map'

export default {
  title: 'Map/GeoTable',
  component: GeoTableViewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        UiMapModule,
        UiLayoutModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
      declarations: [MapContextComponent],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="h-[400px] w-[800px] overflow-auto resize border border-gray-300">${story}</div>`
    ),
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
