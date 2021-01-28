import { Component, OnInit } from '@angular/core'
import { SearchFacade } from '../state/search.facade'

@Component({
  selector: 'search-results-hits',
  templateUrl: './results-hits.container.component.html',
})
export class ResultsHitsContainerComponent implements OnInit {
  constructor(public facade: SearchFacade) {}
  ngOnInit(): void {}
}
