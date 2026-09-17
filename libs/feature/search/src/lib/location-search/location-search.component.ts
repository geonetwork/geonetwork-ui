import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core'
import { Observable } from 'rxjs'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import {
  AutocompleteComponent,
  AutocompleteItem,
} from '@geonetwork-ui/ui/inputs'
import { GeocodingService } from '../geocoding/geocoding.service'

@Component({
  selector: 'gn-ui-location-search',
  templateUrl: './location-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AutocompleteComponent],
})
export class LocationSearchComponent {
  private geocodingService = inject(GeocodingService)

  @Input() placeholder = ''
  @Input() displayWithTemplate?: TemplateRef<{ $implicit: GeocodingResult }>
  @Output() resultSelected = new EventEmitter<GeocodingResult>()

  displayWithFn = (item: AutocompleteItem) => (item as GeocodingResult).label

  searchAction = (text: string): Observable<AutocompleteItem[]> =>
    this.geocodingService.query(text)

  handleItemSelected(item: AutocompleteItem) {
    this.resultSelected.emit(item as GeocodingResult)
  }
}
