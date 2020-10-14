import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { UpdateParams } from '../state/actions'
import { select, Store } from '@ngrx/store'
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators'
import { TextInputComponent } from '../../../../ui/src/lib/text-input/text-input.component'
import { SearchState } from '../state/reducer'
import { getSearchParams } from '../state/selectors'

@Component({
  selector: 'search-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnDestroy, AfterViewInit {
  @ViewChild('searchText') searchText: TextInputComponent

  currentTextSearch$ = this.store.pipe(
    select(getSearchParams),
    map((params) => params.any || '')
  )
  subs = new Subscription()

  constructor(private store: Store<SearchState>) {}

  ngAfterViewInit(): void {
    this.subs.add(
      this.searchText.valueChange.pipe(debounceTime(400)).subscribe((value) => {
        this.store.dispatch(new UpdateParams({ any: value }))
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
