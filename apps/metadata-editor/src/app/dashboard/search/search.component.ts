import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  constructor(private searchFacade: SearchFacade) {}

  ngOnInit() {
    this.searchFacade.setResultsLayout('ROW')
  }
}
