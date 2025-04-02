import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UiLayoutModule } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'datahub-record-section',
  standalone: true,
  imports: [CommonModule, UiLayoutModule, TranslateModule],
  template: `
    <section [id]="id">
      <div
        *ngIf="title"
        class="title-font text-title font-medium pt-9 text-section-title container-lg px-4 lg:mx-auto"
      >
        {{ title | translate }}
      </div>
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
