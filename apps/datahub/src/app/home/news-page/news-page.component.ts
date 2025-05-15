import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { globalConfigFilters } from '../../app.config'

@Component({
  selector: 'datahub-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent implements OnInit {
  constructor(public searchFacade: SearchFacade) {}

  ngOnInit() {
    this.searchFacade.setConfigFilters(globalConfigFilters)
  }

  getContactMail(): string {
    return getGlobalConfig().CONTACT_EMAIL
  }
}
