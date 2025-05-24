import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { globalConfigFilters } from '../../app.config'

@Component({
  selector: 'datahub-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor(public searchFacade: SearchFacade) {}

  ngOnInit() {
    this.searchFacade
      .setResultsLayout('ROW')
      .setConfigFilters(globalConfigFilters)
  }
}
