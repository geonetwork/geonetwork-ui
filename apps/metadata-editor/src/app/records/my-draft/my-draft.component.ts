import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { ResultsTableComponent } from '@geonetwork-ui/ui/search'
import { TranslateDirective } from '@ngx-translate/core'
import { startWith, switchMap } from 'rxjs'
import { EditorService } from '@geonetwork-ui/feature/editor'

@Component({
  selector: 'md-editor-my-draft',
  templateUrl: './my-draft.component.html',
  styleUrls: ['./my-draft.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateDirective, ResultsTableComponent],
})
export class MyDraftComponent {
  records$ = this.recordsRepository.draftsChanged$.pipe(
    startWith(void 0),
    switchMap(() => this.recordsRepository.getAllDrafts()),
    startWith([])
  )
  hasDraft = () => true

  constructor(
    private router: Router,
    public recordsRepository: RecordsRepositoryInterface,
    public editorService: EditorService
  ) {}

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }

  rollbackDraft(record: CatalogRecord) {
    this.editorService.undoRecordDraft(record)
  }
}
