import { Directive, Input, OnInit, inject } from '@angular/core'
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
  standalone: true,
})
export class SearchRouterContainerDirective implements OnInit {
  private facade = inject(SearchFacade, { host: true })

  @Input('gnUiSearchRouterContainer') searchId: string

  ngOnInit(): void {
    this.facade.init(this.searchId)
  }
}
