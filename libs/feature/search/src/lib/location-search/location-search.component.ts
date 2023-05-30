import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteItem } from '@geonetwork-ui/ui/inputs'
import { of } from 'rxjs'

@Component({
  selector: 'gn-ui-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSearchComponent {
  displayWithFn: (any) => string = (location) => location?.name

  autoCompleteAction = (query) =>
    of([
      {
        name: 'Geneve',
      },
      {
        name: 'Lausanne',
      },
    ])

  handleItemSelection(item: AutocompleteItem) {
    console.log('location', item)
  }

  handleInputSubmission(inputValue: string) {
    console.log('inputValue', inputValue)
  }
}
