import { Meta, StoryObj, applicationConfig } from '@storybook/angular'
import { ValueListComponent } from './value-list.component'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'

const meta: Meta<ValueListComponent> = {
  component: ValueListComponent,
  title: 'Layout/ValueList',
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(
          TranslateModule.forRoot({
            defaultLanguage: 'en',
          })
        ),
      ],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <div [style.width]="width" class="border border-gray-300">
        <gn-ui-value-list
          [values]="values"
          extraClass="py-1"
        ></gn-ui-value-list>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<
  ValueListComponent & {
    width: string
  }
>

export const TwoValues: Story = {
  args: {
    values: [{ label: 'Apple' }, { code: 'BANANA' }],
    width: '200px',
  },
}

export const ManyValuesScroll: Story = {
  args: {
    values: Array.from({ length: 20 }, (_, i) => ({
      label: `Item ${i + 1}`,
    })),
    width: '240px',
  },
}

export const NarrowCell: Story = {
  args: {
    values: [{ label: 'A' }, { label: 'B' }, { label: 'C' }],
    width: '120px',
  },
}
