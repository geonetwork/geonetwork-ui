import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'

@Component({
  selector: 'datahub-record-section',
  standalone: true,
  imports: [CommonModule, UiLayoutModule],
  template: `
    <section [id]="id" class="container-lg px-4 lg:mx-auto">
      <h1 *ngIf="title" class="title-font font-medium mb-3 text-[28px]">
        {{ title }}
      </h1>
      <div class="section-content">
        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class RecordSectionComponent {
  @Input() id: string
  @Input() title: string
}
