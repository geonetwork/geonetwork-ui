import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-my-org-records',
  templateUrl: './my-org-records.component.html',
  styleUrls: ['./my-org-records.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class MyOrgRecordsComponent {
  constructor(public searchFacade: SearchFacade) {
    this.searchFacade.setFilters({})
  }
}
