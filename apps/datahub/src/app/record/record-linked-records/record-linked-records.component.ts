import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { map } from 'rxjs'
import { RecordInternalLinksComponent } from '../record-internal-links/record-internal-links.component'
import { CommonModule } from '@angular/common'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  AssociationType,
  CatalogRecord,
  RecordRelation,
} from '@geonetwork-ui/common/domain/model/record'

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

  private linkedRecords$ = this.metadataViewFacade.linkedRecords$.pipe(
    map((linkedRecords) => linkedRecords ?? [])
  )

  sourceDatasets$ = this.recordsOf('source')
  linkedDatasets$ = this.recordsOf('sourceOf', 'dataset')
  linkedReuses$ = this.recordsOf('sourceOf', 'reuse')
  linkedServices$ = this.recordsOf('sourceOf', 'service')
  associated$ = this.recordsOf('associated')

  siblings$ = this.linkedRecords$.pipe(
    map((linkedRecords) =>
      linkedRecords
        .filter(({ relation }) => relation === 'sibling')
        .reduce(
          (groups, { record, associationType }) => {
            groups[associationType] ??= []
            groups[associationType].push(record)
            return groups
          },
          {} as Partial<Record<AssociationType, CatalogRecord[]>>
        )
    )
  )

  hasSourceDatasets$ = this.sourceDatasets$.pipe(
    map((records) => records.length > 0)
  )
  hasLinkedDatasets$ = this.linkedDatasets$.pipe(
    map((records) => records.length > 0)
  )
  hasLinkedReuses$ = this.linkedReuses$.pipe(
    map((records) => records.length > 0)
  )
  hasLinkedServices$ = this.linkedServices$.pipe(
    map((records) => records.length > 0)
  )
  hasAssociated$ = this.associated$.pipe(map((records) => records.length > 0))

  private recordsOf(relation: RecordRelation, kind?: CatalogRecord['kind']) {
    return this.linkedRecords$.pipe(
      map((linkedRecords) =>
        linkedRecords
          .filter((associated) => associated.relation === relation)
          .map(({ record }) => record)
          .filter((record) => !kind || record.kind === kind)
      )
    )
  }
}
