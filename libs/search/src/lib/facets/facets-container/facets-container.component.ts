import { Component, OnInit } from '@angular/core'
import { EsRequestAggTerm } from '@lib/common'
import { SearchFacade } from '../../state/search.facade'
import { select, Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'
import { SetFilters } from '../../state/actions'
import { SearchState } from '../../state/reducer'
import {
  getSearchConfigAggregations,
  getSearchFilters,
  getSearchResultsAggregations,
} from '../../state/selectors'
import { FacetsService } from '../facets.service'

@Component({
  selector: 'search-facets-container',
  templateUrl: './facets-container.component.html',
  styleUrls: ['./facets-container.component.css'],
})
export class FacetsContainerComponent implements OnInit {
  models$ = combineLatest([
    this.store.select(getSearchConfigAggregations),
    this.store.select(getSearchResultsAggregations),
  ]).pipe(
    map(([configAggregations, resultsAggregations]) => {
      return this.facets.createFacetModel(
        configAggregations,
        resultsAggregations,
        false
      )
    })
  )

  selectedPaths$ = this.store.pipe(
    select(getSearchFilters),
    map((filters) => this.findSelectedPaths(filters))
  )

  constructor(
    private store: Store<SearchState>,
    private facets: FacetsService,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {}

  onItemSelected(path: string[], selected) {
    this.store
      .pipe(
        take(1),
        select(getSearchFilters),
        tap((filters) => {
          const newFilters = this.computeNewFilters(filters, path, selected)
          this.store.dispatch(new SetFilters(newFilters))
        })
      )
      .subscribe()
  }

  /**
   * Compute filters recursive paths enabled in the state current
   * search
   * e.g [["tag.default", "land use"]]
   *
   * @param filters Search filters from state
   */
  private findSelectedPaths(filters) {
    const discoveredObjects = [] // For checking for cyclic object
    const path = []
    const results = []

    // store void result to prevent ; added by prettier before iife
    const _ = (function find(obj) {
      for (const key of Object.keys(obj)) {
        if (obj[key] === true) {
          // Found a selected path
          path.push(key)
          results.push(Array.from(path))
          path.pop()
        }
        const o = obj[key] // The next object to be searched
        if (o && typeof o === 'object') {
          if (!discoveredObjects.find((discovered) => discovered === o)) {
            // check for cyclic link
            path.push(key)
            discoveredObjects.push(o)
            find(o)
            path.pop()
          }
        }
      }
    })(filters)

    return results
  }

  private computeNewFilters(filters, path, selected) {
    const clone = JSON.parse(JSON.stringify(filters))
    let current = clone

    for (let i = 0; i < path.length; i++) {
      if (i === path.length - 1) {
        if (selected) {
          current[path[i]] = selected
        } else {
          delete current[path[i]]
        }
      }

      if (selected && current[path[i]] === undefined) {
        current[path[i]] = {}
      }
      current = current[path[i]]
    }
    return clone
  }

  onMore(key: string): void {
    this.searchFacade.requestMoreOnAggregation(key, 20)
  }

  onFilterChange(term: EsRequestAggTerm): void {
    const include = `.*${term.include}.*`
    this.searchFacade.setIncludeOnAggregation(term.field, include)
  }
}
