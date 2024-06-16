import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
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

const includes = [
  'uuid',
  'resourceTitleObject',
  'createDate',
  'changeDate',
  'userinfo',
  'cl_status',
  'isPublishedToAll',
  'link',
  'owner',
]

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
  @Input() title: string
  @Input() logo: string
  @Input() linkToDatahub?: string
  @Input() userCount = 0

  constructor(
    private router: Router,
    public searchFacade: SearchFacade,
    public searchService: SearchService
  ) {
    this.searchFacade.setPageSize(15).setConfigRequestFields(includes)
  }

  paginate(page: number) {
    this.searchService.setPage(page)
  }
  createRecord() {
    this.router.navigate(['/create'])
  }

  editRecord(record: CatalogRecord) {
    this.router.navigate(['/edit', record.uniqueIdentifier])
  }

  showUsers() {
    this.router.navigate(['/users/my-org'])
  }
}
