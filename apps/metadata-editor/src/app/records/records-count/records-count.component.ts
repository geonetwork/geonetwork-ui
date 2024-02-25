import {
  Component,
  EventEmitter,
  importProvidersFrom,
  Output,
} from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import {
  InteractiveTableColumnComponent,
  InteractiveTableComponent,
} from '@geonetwork-ui/ui/layout'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { CommonModule } from '@angular/common'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-records-count',
  templateUrl: './records-count.component.html',
  styleUrls: ['./records-count.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    UiInputsModule,
    InteractiveTableComponent,
    InteractiveTableColumnComponent,
    MatIconModule,
    TranslateModule,
  ],
})
export class RecordsCountComponent {
  @Output() recordClick = new EventEmitter<CatalogRecord>()

  records$ = this.searchFacade.results$
  recordCount$ = this.searchFacade.resultsHits$
  selectedRecords$ = this.selectionService.selectedRecordsIdentifiers$

  constructor(
    private searchFacade: SearchFacade,
    private selectionService: SelectionService
  ) {}
}
