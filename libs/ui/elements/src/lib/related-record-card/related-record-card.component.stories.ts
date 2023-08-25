import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { RelatedRecordCardComponent } from './related-record-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common'
import { importProvidersFrom } from '@angular/core'
import { ThumbnailComponent } from '../thumbnail/thumbnail.component'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { UtilSharedModule } from '@geonetwork-ui/util-shared'

export default {
  title: 'Elements/RelatedRecordCardComponent',
  component: RelatedRecordCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ThumbnailComponent],
      imports: [
        RouterModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        MatIconModule,
        MatTooltipModule,
        UtilSharedModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule, RouterModule.forRoot([])),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<RelatedRecordCardComponent>

export const Primary: StoryObj<RelatedRecordCardComponent> = {
  args: {
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
  },
}
