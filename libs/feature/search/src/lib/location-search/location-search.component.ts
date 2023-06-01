import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteItem } from '@geonetwork-ui/ui/inputs'
import { LocationSearchService } from './location-search.service'
import { LocationSearchResultModel } from './location-search-result.model'

@Component({
  selector: 'gn-ui-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSearchComponent {
  constructor(private locationSearchService: LocationSearchService) {}

  displayWithFn: (LocationSearchResultModel) => string = (location) => {
    return location?.attrs.label.replace(/<[^>]*>?/gm, '')
  }

  autoCompleteAction = (query: string) => {
    return this.locationSearchService.getLocationSearch(query)
  }

  handleItemSelection(item: AutocompleteItem) {
    console.log('location', item)
  }

  handleInputSubmission(inputValue: string) {
    console.log('inputValue', inputValue)
  }
}
