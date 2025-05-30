import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchFacade } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TemplatesComponent {
  constructor(public searchFacade: SearchFacade) {
    this.searchFacade.resetSearch()
  }
}
