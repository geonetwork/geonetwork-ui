import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { SortBy } from '../state/actions'
import { SearchState } from '../model'
import { getSearchSortBy } from '../state/selectors'
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'search-sort-by',
  templateUrl: './sort-by.component.html',
})
export class SortByComponent implements OnInit {
  choices = [
    {
      label: 'last changed',
      value: 'lastUpdated',
    },
    {
      label: 'popularity',
      value: 'popularity',
    },
  ]
  currentSortBy$ = this.store.pipe(select(getSearchSortBy))

  constructor(private store: Store<SearchState>,
              translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');
  }

  ngOnInit(): void {}

  changeSortBy(criteria: any) {
    if (typeof criteria === 'string') this.store.dispatch(new SortBy(criteria))
    else {
      throw new Error(`Unexpected value received: ${criteria}`)
    }
  }
}
