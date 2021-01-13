import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  RequestMoreOnAggregation,
  RequestMoreResults,
  SetConfigAggregations,
  SetIncludeOnAggregation,
} from './actions'
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

  requestMoreOnAggregation(key: string, increment: number): void {
    this.store.dispatch(new RequestMoreOnAggregation(key, increment))
  }

  setIncludeOnAggregation(key: string, include: string): void {
    this.store.dispatch(new SetIncludeOnAggregation(key, include))
  }
}
