import { Meta, StoryObj, moduleMetadata } from '@storybook/angular'
import { FeatureCatalogComponent } from './feature-catalog.component'
import { TranslateModule } from '@ngx-translate/core'

const SAMPLE_DATA = [
  {
    type: 'String',
    name: 'name_field',
    code: 'NAME_001',
    title: 'Name of the entity',
  },
  {
    type: 'Integer',
    name: 'population',
    code: 'POP_001',
    title: 'Population count',
  },
  {
    type: 'Date',
    name: 'created_at',
    code: 'DATE_001',
    title: 'Creation date',
  },
]

export default {
  title: 'Elements/FeatureCatalogComponent',
  component: FeatureCatalogComponent,
  decorators: [
    moduleMetadata({
      imports: [FeatureCatalogComponent, TranslateModule.forRoot()],
    }),
  ],
} as Meta<FeatureCatalogComponent>

export const Default: StoryObj<FeatureCatalogComponent> = {
  args: {
    data: SAMPLE_DATA,
    columns: [
      { key: 'type', label: 'type', width: '19%' },
      { key: 'name', label: 'name', width: '32%' },
      { key: 'code', label: 'code', width: '24%' },
      {
        key: 'title',
        label: 'description',
        width: '25%',
      },
    ],
  },
}

export const CustomWidths: StoryObj<FeatureCatalogComponent> = {
  args: {
    data: SAMPLE_DATA,
    columns: [
      { key: 'type', label: 'Type', width: '30%' },
      { key: 'name', label: 'Name', width: '30%' },
      { key: 'code', label: 'Code', width: '40%' },
    ],
  },
}

export const NoData: StoryObj<FeatureCatalogComponent> = {
  args: {
    data: [],
    columns: Default.args.columns,
  },
}
