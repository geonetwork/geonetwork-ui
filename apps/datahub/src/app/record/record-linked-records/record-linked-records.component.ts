import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { map } from 'rxjs'
import { RecordInternalLinksComponent } from '../record-internal-links/record-internal-links.component'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'datahub-record-linked-records',
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordInternalLinksComponent],
  templateUrl: './record-linked-records.component.html',
  styleUrl: './record-linked-records.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordLinkedRecordsComponent {
  linkedDatasets$ = this.metadataViewFacade.hasSources$.pipe(
    map((records) => records?.filter((record) => record?.kind === 'dataset'))
  )
  linkedReuses$ = this.metadataViewFacade.hasSources$.pipe(
    map((records) => records?.filter((record) => record?.kind === 'reuse'))
  )
  linkedServices$ = this.metadataViewFacade.hasSources$.pipe(
    map((records) => records?.filter((record) => record?.kind === 'service'))
  )

  constructor(protected metadataViewFacade: MdViewFacade) {}

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
