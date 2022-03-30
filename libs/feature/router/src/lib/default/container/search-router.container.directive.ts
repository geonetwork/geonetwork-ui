import { Directive, Host, Input, OnInit } from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { RouterSearchService } from '../services/router-search.service'

@Directive({
  selector: '[gnUiSearchRouterContainer]',
  providers: [
    SearchFacade,
    {
      provide: SearchService,
      useClass: RouterSearchService,
    },
  ],
})
export class SearchRouterContainerDirective implements OnInit {
  @Input('gnUiSearchRouterContainer') searchId: string

  constructor(@Host() private facade: SearchFacade) {}

  ngOnInit(): void {
    this.facade.init(this.searchId)
  }
}
