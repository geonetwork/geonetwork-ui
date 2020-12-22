import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { RequestMoreResults, SetConfigAggregations } from './actions'
import { SearchState } from './reducer'

@Injectable({
  providedIn: 'root',
})
export class SearchFacade {
  constructor(private store: Store<SearchState>) {}
  setConfigAggregations(config: any): void {
    this.store.dispatch(new SetConfigAggregations(config))
  }

  requestMoreResults(): void {
    this.store.dispatch(new RequestMoreResults())
  }
}
