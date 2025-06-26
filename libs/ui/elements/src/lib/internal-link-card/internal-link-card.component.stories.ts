import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { InternalLinkCardComponent } from './internal-link-card.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { action } from '@storybook/addon-actions'
import { provideIcons } from '@ng-icons/core'
import { matStar, matStarBorder } from '@ng-icons/material-icons/baseline'
import { iconoirBank } from '@ng-icons/iconoir'

const mockRecord = datasetRecordsFixture()[0] as CatalogRecord
const mockRecordLong = datasetRecordsFixture()[1] as CatalogRecord
const mockLongRecordWithoutContact = {
  ...mockRecordLong,
  ownerOrganization: null,
} as CatalogRecord
const interactiveFavoriteTemplate = `
<div class="flex flex-row items-center">
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
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideI18n(),
        provideIcons({
          matStar,
          matStarBorder,
          iconoirBank,
        }),
      ],
    }),
  ],
} as Meta<InternalLinkCardComponent>

type InternalLinkCardComponentWithFavoriteTemplate =
  InternalLinkCardComponent & {
    favoriteTemplateString: string
  }

export const RecordCard: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    argTypes: {
      size: {
        control: 'radio',
        options: ['L', 'L', 'M', 'S'],
        description: 'Size variant of the card',
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
      record: mockRecordLong,
      size: 'L',
      metadataQualityDisplay: true,
      favoriteTemplateString: interactiveFavoriteTemplate,
    },

    render: (args) => ({
      props: {
        ...args,
        mdSelect: action('mdSelect'),
      },
      template: `
      <div class="border border-gray-100 rounded-md inline-block card-shadow" [ngClass]="{
        'w-auto': size === 'XS' || size === 'S',
        'w-[800px]': size === 'M',
        'w-full': size === 'L'
      }">
        <gn-ui-internal-link-card
          [record]="record"
          [size]="size"
          [metadataQualityDisplay]="metadataQualityDisplay"
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

export const AllSizeOfCards: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
    },
    render: (args) => ({
      props: {
        ...args,
        mdSelect: action('mdSelect'),
        records: datasetRecordsFixture().slice(0, 3),
      },
      template: `
      <div class="flex flex-col gap-4 w-[620px]">
        <div class="w-[800px]">
          <div class="border border-gray-100 rounded-md inline-block card-shadow w-full">
            <gn-ui-internal-link-card
              [record]="records[1]"
              [size]="'L'"
              [metadataQualityDisplay]="metadataQualityDisplay"
              [favoriteTemplate]="favoriteRef"
              (mdSelect)="mdSelect($event)">
            </gn-ui-internal-link-card>
          </div>
        </div>
        <div class="w-[800px]">
          <div class="border border-gray-100 rounded-md inline-block card-shadow w-full">
            <gn-ui-internal-link-card
              [record]="records[1]"
              [size]="'M'"
              [metadataQualityDisplay]="metadataQualityDisplay"
              [favoriteTemplate]="favoriteRef"
              (mdSelect)="mdSelect($event)">
            </gn-ui-internal-link-card>
          </div>
        </div>
        <div class="w-full flex gap-4">
          <div class="border border-gray-100 rounded-md inline-block card-shadow">
            <gn-ui-internal-link-card
              [record]="records[0]"
              [size]="'S'"
              [metadataQualityDisplay]="metadataQualityDisplay"
              [favoriteTemplate]="favoriteRef"
              (mdSelect)="mdSelect($event)">
            </gn-ui-internal-link-card>
          </div><div class="border border-gray-100 rounded-md inline-block card-shadow">
            <gn-ui-internal-link-card
              [record]="records[1]"
              [size]="'S'"
              [metadataQualityDisplay]="metadataQualityDisplay"
              [favoriteTemplate]="favoriteRef"
              (mdSelect)="mdSelect($event)">
            </gn-ui-internal-link-card>
          </div>
        </div>
        <div class="w-full flex gap-4">
          <div class="border border-gray-100 rounded-md card-shadow">
            <gn-ui-internal-link-card
              [record]="records[1]"
              [size]="'XS'"
              [metadataQualityDisplay]="metadataQualityDisplay"
              [favoriteTemplate]="favoriteRef"
              (mdSelect)="mdSelect($event)">
            </gn-ui-internal-link-card>
          </div>
          <div class="border border-gray-100 rounded-md card-shadow">
            <gn-ui-internal-link-card
              [record]="records[0]"
              [size]="'XS'"
              [metadataQualityDisplay]="metadataQualityDisplay"
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

export const LargeCardWithSmallContent: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
      size: 'L',
      record: {
        ...mockRecord,
        ...{
          ownerOrganization: {
            name: 'The very long organisation name long organisation namelong organisation name',
          },
        },
      },
    },
    render: RecordCard.render,
  }

export const MediumCard: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
      size: 'M',
    },
    render: RecordCard.render,
  }

export const SmallCard: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
      size: 'S',
    },
    render: RecordCard.render,
  }

export const ExtraSmallCard: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
      size: 'XS',
    },
    render: RecordCard.render,
  }

export const WithoutQualityMetrics: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
      metadataQualityDisplay: false,
    },
    render: RecordCard.render,
  }

export const MultipleLargeCards: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
    },
    render: (args) => ({
      props: {
        ...args,
        mdSelect: action('mdSelect'),
        records: datasetRecordsFixture().slice(0, 3),
      },
      template: `
      <div class="flex flex-col gap-4 w-[620px]">
        <div class="w-[800px]" *ngFor="let rec of records">
          <div class="border border-gray-100 rounded-md inline-block card-shadow w-full">
            <gn-ui-internal-link-card
              [record]="rec"
              [size]="size"
              [metadataQualityDisplay]="metadataQualityDisplay"
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

export const LargeCardWithoutContact: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
      size: 'L',
      record: mockLongRecordWithoutContact,
    },
    render: RecordCard.render,
  }

export const MediumCardWithoutContact: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
      size: 'M',
      record: mockLongRecordWithoutContact,
    },
    render: RecordCard.render,
  }

export const MediumCardsSquashed: StoryObj<InternalLinkCardComponentWithFavoriteTemplate> =
  {
    args: {
      ...RecordCard.args,
    },
    render: (args) => ({
      props: {
        ...args,
        mdSelect: action('mdSelect'),
        records: datasetRecordsFixture().slice(0, 3),
      },
      template: `
      <div class="flex flex-col gap-4 w-[620px]">
        <div class="w-[488px]" *ngFor="let rec of records">
          <div class="border border-gray-100 rounded-md inline-block card-shadow w-full">
            <gn-ui-internal-link-card
              [record]="rec"
              [size]="'M'"
              [metadataQualityDisplay]="metadataQualityDisplay"
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
