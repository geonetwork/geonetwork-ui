import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'search-facets-container',
  templateUrl: './facets-container.component.html',
  styleUrls: ['./facets-container.component.css'],
})
export class FacetsContainerComponent implements OnInit {
  @Input() uiConfig = 'srv'

  constructor() {}

  ngOnInit(): void {}
}
