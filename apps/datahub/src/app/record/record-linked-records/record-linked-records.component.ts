import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { map } from 'rxjs'
import { RecordInternalLinksComponent } from '../record-internal-links/record-internal-links.component.js'
import { CommonModule } from '@angular/common'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'datahub-record-linked-records',
  standalone: true,
  imports: [
    CommonModule,
    RecordInternalLinksComponent,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './record-linked-records.component.html',
  styleUrl: './record-linked-records.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordLinkedRecordsComponent {
  protected metadataViewFacade = inject(MdViewFacade)

  sourceDatasets$ = this.metadataViewFacade.sources$
  linkedDatasets$ = this.metadataViewFacade.sourceOf$.pipe(
    map((records) => records?.filter((record) => record?.kind === 'dataset'))
  )
  linkedReuses$ = this.metadataViewFacade.sourceOf$.pipe(
    map((records) => records?.filter((record) => record?.kind === 'reuse'))
  )
  linkedServices$ = this.metadataViewFacade.sourceOf$.pipe(
    map((records) => records?.filter((record) => record?.kind === 'service'))
  )

  get hasSourceDatasets$() {
    return this.sourceDatasets$.pipe(map((records) => records?.length > 0))
  }
  get hasLinkedDatasets$() {
    return this.linkedDatasets$.pipe(map((records) => records?.length > 0))
  }
  get hasLinkedReuses$() {
    return this.linkedReuses$.pipe(map((records) => records?.length > 0))
  }
  get hasLinkedServices$() {
    return this.linkedServices$.pipe(map((records) => records?.length > 0))
  }
}
