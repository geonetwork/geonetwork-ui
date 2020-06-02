import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'lib-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styleUrls: ['./fuzzy-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuzzySearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
