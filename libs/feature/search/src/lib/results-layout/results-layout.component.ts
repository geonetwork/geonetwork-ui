import { Component, inject } from '@angular/core'
import {
  RESULTS_LAYOUT_CONFIG,
  ResultsLayoutConfigModel,
} from '@geonetwork-ui/ui/search'
import { SearchFacade } from '../state/search.facade'
import { CommonModule } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'
import { DropdownSelectorComponent } from '@geonetwork-ui/ui/inputs'

@Component({
  selector: 'gn-ui-results-layout',
  templateUrl: './results-layout.component.html',
  standalone: true,
  imports: [CommonModule, TranslatePipe, DropdownSelectorComponent],
})
export class ResultsLayoutComponent {
  searchFacade = inject(SearchFacade)
  private resultsLayoutConfig = inject<ResultsLayoutConfigModel>(
    RESULTS_LAYOUT_CONFIG
  )

  choices = Object.keys(this.resultsLayoutConfig).map((v) => {
    return {
      label: v,
      value: v,
    }
  })

  change(layout: string) {
    this.searchFacade.setResultsLayout(layout)
  }
}
