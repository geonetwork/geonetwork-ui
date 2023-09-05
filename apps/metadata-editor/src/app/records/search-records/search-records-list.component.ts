import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { RecordsListComponent } from '../records-list.component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'md-editor-search-records-list',
  templateUrl: './search-records-list.component.html',
  styleUrls: ['./search-records-list.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class SearchRecordsComponent {
  constructor(public searchFacade: SearchFacade) {}
}
