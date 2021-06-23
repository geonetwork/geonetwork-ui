import { Directive, Host, Input, OnInit } from '@angular/core'
import { SearchFacade } from '../search.facade'

@Directive({
  selector: '[gnUiSearchStateContainer]',
  providers: [SearchFacade],
})
export class SearchStateContainerDirective implements OnInit {
  @Input('gnUiSearchStateContainer') searchId: string

  constructor(@Host() private facade: SearchFacade) {}

  ngOnInit(): void {
    this.facade.init(this.searchId)
  }
}
