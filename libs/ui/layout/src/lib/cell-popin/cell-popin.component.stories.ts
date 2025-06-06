import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { CellPopinComponent } from './cell-popin.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

const meta: Meta<CellPopinComponent> = {
  component: CellPopinComponent,
  title: 'Layout/Cell Popin',
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <div class="border border-gray-300 w-96">
        <gn-ui-cell-popin
            #popinRef
          >
            <div cellContent>
              <button (click)="popinRef.openOverlay()">Click Me</button>              
            </div>
            <div
              popinContent
              class="max-h-60 max-w-56 overflow-y-auto min-w-64 py-4 px-6 pr-9"
              style="scrollbar-width: thin"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque suscipit aliquet ligula, posuere egestas mi. In consectetur tortor sit amet nibh posuere, ut facilisis dolor laoreet. Morbi in dapibus libero. Praesent quam enim, vehicula id nibh at, scelerisque faucibus libero. In hac habitasse platea dictumst. 
            </div>
          </gn-ui-cell-popin>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<CellPopinComponent>

export const Primary: Story = {}
