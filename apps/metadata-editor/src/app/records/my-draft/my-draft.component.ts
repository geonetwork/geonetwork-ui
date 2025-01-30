import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { ResultsTableComponent } from '@geonetwork-ui/ui/search'
import { TranslateModule } from '@ngx-translate/core'
import { startWith, switchMap } from 'rxjs'

@Component({
  selector: 'md-editor-my-draft',
  templateUrl: './my-draft.component.html',
  styleUrls: ['./my-draft.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    UiElementsModule,
    ResultsTableComponent,
  ],
})
export class MyDraftComponent {
  records$ = this.recordsRepository.draftsChanged$.pipe(
    startWith(void 0),
    switchMap(() => this.recordsRepository.getAllDrafts()),
    startWith([])
  )
  hasDraft = () => true
  canDuplicate = (): boolean => false
  isUnsavedDraft = (record: CatalogRecord): boolean =>
    this.recordsRepository.isRecordNotYetSaved(record.uniqueIdentifier)

  constructor(
    private router: Router,
    public recordsRepository: RecordsRepositoryInterface
  ) {}

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }

  deleteDraft(record: CatalogRecord) {
    this.recordsRepository.clearRecordDraft(record.uniqueIdentifier)
  }
}
