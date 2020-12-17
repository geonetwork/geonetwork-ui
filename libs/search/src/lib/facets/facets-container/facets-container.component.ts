import { Component, Input, OnInit } from '@angular/core'
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
  @Input() uiConfig = 'srv'

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
    private facets: FacetsService
  ) {}

  ngOnInit(): void {}

  onItemSelected(path: string[], selected) {
    this.store
      .pipe(
        take(1),
        select(getSearchFilters),
        tap((filters) => {
          const newFilters = this.getCloneWithSelectedPath(
            filters,
            path,
            selected
          )
          this.store.dispatch(new SetFilters(newFilters))
        })
      )
      .subscribe()
  }

  findSelectedPaths(filters) {
    const discoveredObjects = [] // For checking for cyclic object
    const path = []
    const results = []

    ;(function find(obj) {
      for (const key of Object.keys(obj)) {
        if (obj[key] === true) {
          // Found a selected path
          path.push(key)
          results.push(Array.from(path))
          path.pop()
        }
        const o = obj[key] // The next object to be searched
        if (o && typeof o === 'object') {
          if (!discoveredObjects.find((obj) => obj === o)) {
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

  getCloneWithSelectedPath(filters, path, selected) {
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
}
