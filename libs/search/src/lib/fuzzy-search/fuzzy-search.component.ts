import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { TextInputComponent } from '@lib/ui'
import { Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'search-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnDestroy, AfterViewInit {
  @ViewChild('searchText') searchText: TextInputComponent

  currentTextSearch$

  subs = new Subscription()

  constructor(private searchFacade: SearchFacade) {
    this.currentTextSearch$ = this.searchFacade.searchFilters$
  }

  ngAfterViewInit(): void {
    this.subs.add(
      this.searchText.valueChange.pipe(debounceTime(400)).subscribe((value) => {
        this.searchFacade.setFilters({ any: value })
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
