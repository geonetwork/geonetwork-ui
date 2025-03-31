import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'

@Component({
  selector: 'datahub-record-section',
  standalone: true,
  imports: [CommonModule, UiLayoutModule],
  template: `
    <section [id]="id">
      <h1
        *ngIf="title"
        class="title-font text-title font-medium pt-9 text-section-title container-lg px-4 lg:mx-auto"
      >
        {{ title }}
      </h1>
      <div>
        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class RecordSectionComponent {
  @Input() id: string
  @Input() title: string
}
