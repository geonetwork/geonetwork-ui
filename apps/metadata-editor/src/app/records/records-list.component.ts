import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  ResultsTableContainerComponent,
  SearchFacade,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { UiSearchModule } from '@geonetwork-ui/ui/search'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { TranslateModule } from '@ngx-translate/core'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { RecordsCountComponent } from './records-count/records-count.component'

@Component({
  selector: 'md-editor-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    UiSearchModule,
    UiElementsModule,
    TranslateModule,
    ResultsTableContainerComponent,
    UiInputsModule,
    RecordsCountComponent,
  ],
})
export class RecordsListComponent {
  constructor(
    private router: Router,
    public searchFacade: SearchFacade,
    private searchService: SearchService
  ) {}

  paginate(page: number) {
    this.searchService.setPage(page)
  }

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }

  duplicateRecord(record: CatalogRecord) {
    this.router.navigate(['/duplicate', record.uniqueIdentifier])
  }
}
