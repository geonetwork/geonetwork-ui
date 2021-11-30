import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { RelatedRecordCardComponent } from './related-record-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiElementsModule } from '../ui-elements.module'

export default {
  title: 'Elements/RelatedRecordCardComponent',
  component: RelatedRecordCardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UiElementsModule,
        BrowserAnimationsModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<RelatedRecordCardComponent>

const Template: Story<RelatedRecordCardComponent> = (
  args: RelatedRecordCardComponent
) => ({
  component: RelatedRecordCardComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  record: {
    thumbnailUrl:
      'https://www.geo2france.fr/public/vignettes_geonetwork/arrondissements_hdf.JPG',
    title: 'Arrondissements de la région Hauts-de-France',
    uuid: 'd90835e0-2763-49f1-a251-cd64c8a4bbf4',
    metadataUrl:
      '/geonetwork/srv/api/../fre/catalog.search#/metadata/d90835e0-2763-49f1-a251-cd64c8a4bbf4',
    abstract:
      "Découpage géographique des arrondissements des Hauts-de-France. L'arrondissement, subdivision des départements, est une circonscription administrative qui depuis mars 2015 est composé de regroupement de communes.",
    id: '40697',
    hasDownloads: true,
    hasMaps: true,
  },
}
