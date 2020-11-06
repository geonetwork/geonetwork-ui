import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { TextInputComponent } from '@lib/ui'
import { select, Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import { UpdateFilters } from '../state/actions'
import { SearchState } from '../state/reducer'
import { getSearchFilters } from '../state/selectors'

@Component({
  selector: 'search-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnDestroy, AfterViewInit {
  @ViewChild('searchText') searchText: TextInputComponent

  currentTextSearch$ = this.store.pipe(
    select(getSearchFilters),
    map((filters) => filters.any || '')
  )
  subs = new Subscription()

  constructor(private store: Store<SearchState>) {}

  ngAfterViewInit(): void {
    this.subs.add(
      this.searchText.valueChange.pipe(debounceTime(400)).subscribe((value) => {
        this.store.dispatch(new UpdateFilters({ any: value }))
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
