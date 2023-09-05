import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { RecordsListComponent } from '../records-list.component'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, RecordsListComponent],
})
export class MyLibraryComponent {
  constructor(public searchFacade: SearchFacade) {
    this.searchFacade.resetSearch()
  }
}
