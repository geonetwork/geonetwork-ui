import { Component, inject } from '@angular/core'

import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
  standalone: true,
  imports: [],
})
export class TemplatesComponent {
  searchFacade = inject(SearchFacade)

  constructor() {
    this.searchFacade.resetSearch()
  }
}
