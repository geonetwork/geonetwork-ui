import { Component, Input, OnInit } from '@angular/core'
import { ModelBlock } from '../facets.model'

@Component({
  selector: 'ui-facet-list',
  templateUrl: './facet-list.component.html',
  styleUrls: ['./facet-list.component.css'],
})
export class FacetListComponent implements OnInit {
  @Input() models: ModelBlock[]

  constructor() {}

  ngOnInit(): void {}
}
