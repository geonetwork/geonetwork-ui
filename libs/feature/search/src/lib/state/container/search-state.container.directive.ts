import { Directive, Input, OnInit, inject } from '@angular/core'
import { SearchService } from '../../utils/service/search.service.js'
import { SearchFacade } from '../search.facade.js'

@Directive({
  selector: '[gnUiSearchStateContainer]',
  providers: [SearchFacade, SearchService],
  standalone: true,
})
export class SearchStateContainerDirective implements OnInit {
  private facade = inject(SearchFacade, { host: true })

  @Input('gnUiSearchStateContainer') searchId: string

  ngOnInit(): void {
    this.facade.init(this.searchId)
  }
}
