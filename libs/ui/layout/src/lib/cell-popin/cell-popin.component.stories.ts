import { Meta, StoryObj, applicationConfig } from '@storybook/angular'
import { importProvidersFrom } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { CellPopinComponent } from './cell-popin.component'

const meta: Meta<CellPopinComponent> = {
  component: CellPopinComponent,
  title: 'Layout/CellPopin',
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
        <gn-ui-cell-popin
          #popinRef
        >
          <div cellContent>
            <button>Open popin</button>
            <gn-ui-button
              type="light"
              extraClass="bg-transparent border-none"
              (buttonClick)="popinRef.openOverlay()"
            >
              <ng-icon name="iconoirList" size="24"></ng-icon>
            </gn-ui-button>
          </div>
          <div
            popinContent
            class="max-h-60 overflow-y-auto min-w-64 py-4 px-6"
            style="scrollbar-width: thin"
          >
            <ul class="list-disc list-inside mr-4">
              <li *ngFor="let v of row.values">
                {{ v.label || v.code }}
              </li>
            </ul>
          </div>
        </gn-ui-cell-popin>
      </div>
    `,
  }),
}

export default meta
type Story = StoryObj<
  CellPopinComponent & {
    width: string
  }
>
