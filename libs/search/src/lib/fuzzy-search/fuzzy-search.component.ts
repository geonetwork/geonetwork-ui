import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { from, of } from 'rxjs'

@Component({
  selector: 'search-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnInit {
  results$ = (term: string) => of(['Hello', 'World'])
  constructor() {}

  ngOnInit(): void {}
}
