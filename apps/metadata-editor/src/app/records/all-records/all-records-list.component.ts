import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'

@Component({
  selector: 'md-editor-all-records-list',
  templateUrl: './all-records-list.component.html',
  styleUrls: ['./all-records-list.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class AllRecordsComponent {
  constructor(public searchFacade: SearchFacade) {
    this.searchFacade.resetSearch()
  }
}
