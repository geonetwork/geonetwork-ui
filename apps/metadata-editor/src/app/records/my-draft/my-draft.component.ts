import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-my-my-draft',
  templateUrl: './my-draft.component.html',
  styleUrls: ['./my-draft.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class MyDraftComponent {
  constructor(public searchFacade: SearchFacade) {
    this.searchFacade.resetSearch()
  }
}
