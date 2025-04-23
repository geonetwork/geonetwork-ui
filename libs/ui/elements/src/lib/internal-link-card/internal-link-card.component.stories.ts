import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { InternalLinkCardComponent } from './internal-link-card.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { action } from '@storybook/addon-actions'
import { HttpClientModule } from '@angular/common/http'
import { provideIcons } from '@ng-icons/core'
import { matStar, matStarBorder } from '@ng-icons/material-icons/baseline'
import { NgIconComponent } from '@ng-icons/core'
import { CommonModule } from '@angular/common'

const mockRecord = datasetRecordsFixture()[0] as CatalogRecord
const mockRecordLong = datasetRecordsFixture()[1] as CatalogRecord

const interactiveFavoriteTemplate = `<div class="flex flex-row items-center">
  <span class="inline-flex items-center text-gray-700 font-medium" style="line-height: 1; margin-top: 1px;">{{record.extras?.favoriteCount || 42}}</span>
  <button type="button" class="ml-1 flex items-center justify-center text-secondary hover:scale-125 transition will-change-transform"
          title="Add to favorites"
          (click)="$event.preventDefault(); $event.stopPropagation();">
    <ng-icon name="matStar"></ng-icon>
  </button>
</div>`

export default {
  title: 'Elements/InternalLinkCardComponent',
  component: InternalLinkCardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        UtilSharedModule,
        UiDatavizModule,
        NgIconComponent,
        CommonModule,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        provideIcons({
          matStar,
          matStarBorder,
        }),
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="p-4 bg-white" style="height: 400px; max-width: 1200px; resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<InternalLinkCardComponent>

type InternalLinkCardComponentWithFavoriteTemplate =
  InternalLinkCardComponent & {
    favoriteTemplateString: string
  }

export const Primary: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    argTypes: {
      size: {
        control: 'radio',
        options: ['L', 'M', 'S', 'XS'],
        description: 'Size variant of the card',
      },
      isGeodata: {
        control: 'boolean',
        description: 'Whether the record represents geodata',
      },
      metadataQualityDisplay: {
        control: 'boolean',
        description: 'Whether to show metadata quality information',
      },
      record: {
        control: 'object',
        description: 'The catalog record data',
        table: {
          category: 'Data',
        },
      },
    },
    args: {
      record: mockRecord,
      size: 'M',
      isGeodata: true,
      metadataQualityDisplay: true,
      favoriteTemplateString: interactiveFavoriteTemplate,
    },

    render: (args) => ({
      props: {
        ...args,
        mdSelect: action('mdSelect'),
      },
      template: `
    <div class="border border-gray-100 rounded-md w-auto inline-block card-shadow">
      <gn-ui-internal-link-card     
      class="w-auto"   
        [record]="record"
        [size]="size"
        [isGeodata]="isGeodata"
        [metadataQualityDisplay]="metadataQualityDisplay"
        [linkHref]="linkHref"
        [favoriteTemplate]="favoriteRef"
        (mdSelect)="mdSelect($event)">
      </gn-ui-internal-link-card>
      <ng-template #favoriteRef let-record>
        ${args.favoriteTemplateString}
      </ng-template>
    </div>
    `,
    }),
  }

export const LargeCard: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...Primary.args,
      size: 'L',
    },
    render: Primary.render,
  }

export const LargeCardWithLongContent: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...Primary.args,
      size: 'L',
      record: mockRecordLong,
    },
    render: Primary.render,
  }

export const MediumCard: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...Primary.args,
      size: 'M',
    },
    render: Primary.render,
  }

export const SmallCard: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...Primary.args,
      size: 'S',
    },
    render: Primary.render,
  }

export const ExtraSmallCard: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...Primary.args,
      size: 'XS',
    },
    render: Primary.render,
  }

export const WithoutGeodataIndicator: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...Primary.args,
      isGeodata: false,
    },
    render: Primary.render,
  }

export const WithoutQualityMetrics: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...Primary.args,
      metadataQualityDisplay: false,
    },
    render: Primary.render,
  }

export const MultipleMediumCards: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...Primary.args,
    },
    render: (args) => ({
      props: {
        ...args,
        mdSelect: action('mdSelect'),
        records: datasetRecordsFixture().slice(0, 3),
      },
      template: `
      <div class="flex flex-col gap-4 w-[620px]">
        <div class="w-[620px]" *ngFor="let rec of records">
          <div class="border border-gray-100 rounded-md inline-block card-shadow w-full">
            <gn-ui-internal-link-card
              [record]="rec"
              [size]="size"
              [isGeodata]="isGeodata"
              [metadataQualityDisplay]="metadataQualityDisplay"
              [linkHref]="linkHref"
              [favoriteTemplate]="favoriteRef"
              (mdSelect)="mdSelect($event)">
            </gn-ui-internal-link-card>
          </div>
        </div>
      </div>
      <ng-template #favoriteRef let-record>
        ${args.favoriteTemplateString}
      </ng-template>
    `,
    }),
  }
