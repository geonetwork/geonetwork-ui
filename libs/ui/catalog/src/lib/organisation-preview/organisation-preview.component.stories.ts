import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { ThumbnailComponent } from '@geonetwork-ui/ui/elements'
import { OrganisationPreviewComponent } from './organisation-preview.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Catalog/OrganisationPreviewComponent',
  component: OrganisationPreviewComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
      ],
    }),
    moduleMetadata({
      declarations: [ThumbnailComponent],
      imports: [
        UtilI18nModule,
        UtilSharedModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[350px] w-[250px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<OrganisationPreviewComponent>

export const Primary: StoryObj<OrganisationPreviewComponent> = {
  args: {
    organization: {
      name: 'Agglo du Saint Quentinois',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      logoUrl: new URL(
        'https://www.declic-mobilites.org/images/neoentreprises/e/65/agglomeration_du_saint_quentinois_00269100_120312697-20180412122249.png'
      ),
      recordCount: 12,
    },
  },
}
