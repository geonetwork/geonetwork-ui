import { Component, OnInit } from '@angular/core'
import { EsRequestAggTerm } from '@lib/common'
import { combineLatest, Observable } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'
import { ModelBlock } from '../../../../../ui/src/lib/facets/facets.model'
import { SearchFacade } from '../../state/search.facade'
import { FacetsService } from '../facets.service'

@Component({
  selector: 'search-facets-container',
  templateUrl: './facets-container.component.html',
  styleUrls: ['./facets-container.component.css'],
})
export class FacetsContainerComponent implements OnInit {
  selectedPaths$: Observable<string[][]>
  models$: Observable<ModelBlock[]>

  constructor(
    private facets: FacetsService,
    private searchFacade: SearchFacade
  ) {}

  ngOnInit(): void {
    this.selectedPaths$ = this.searchFacade.searchFilters$.pipe(
      map((filters) => this.findSelectedPaths(filters))
    )

    this.models$ = combineLatest([
      this.searchFacade.configAggregations$,
      this.searchFacade.resultsAggregations$,
    ]).pipe(
      map(([configAggregations, resultsAggregations]) => {
        return this.facets.createFacetModel(
          configAggregations,
          resultsAggregations,
          false
        )
      })
    )
  }

  onItemSelected(path: string[], selected) {
    this.searchFacade.searchFilters$
      .pipe(
        take(1),
        tap((filters) => {
          const newFilters = this.computeNewFilters(filters, path, selected)
          this.searchFacade.setFilters(newFilters)
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
  private findSelectedPaths(filters): string[][] {
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
