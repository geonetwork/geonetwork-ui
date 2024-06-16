import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { ResultsTableContainerComponent } from '@geonetwork-ui/feature/search'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { MatIconModule } from '@angular/material/icon'
import { RecordsCountComponent } from '../records-count/records-count.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { Router } from '@angular/router'
import { ResultsTableComponent } from '@geonetwork-ui/ui/search'
import { startWith } from 'rxjs'

@Component({
  selector: 'md-editor-my-my-draft',
  templateUrl: './my-draft.component.html',
  styleUrls: ['./my-draft.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RecordsListComponent,
    ButtonComponent,
    MatIconModule,
    RecordsCountComponent,
    ResultsTableContainerComponent,
    UiElementsModule,
    ResultsTableComponent,
  ],
})
export class MyDraftComponent {
  records$ = this.recordsRepository.getAllDrafts().pipe(startWith([]))
  hasDraft = () => true

  constructor(
    private router: Router,
    public recordsRepository: RecordsRepositoryInterface
  ) {}

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }
}
