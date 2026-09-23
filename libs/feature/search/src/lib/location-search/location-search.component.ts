import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  InjectionToken,
  Input,
  Output,
} from '@angular/core'
import { Observable } from 'rxjs'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import {
  AutocompleteComponent,
  AutocompleteItem,
} from '@geonetwork-ui/ui/inputs'
import { BoundingBox, getGeometryBoundingBox } from '@geonetwork-ui/util/shared'
import { GeocodingService } from '../geocoding/geocoding.service'
import {
  parseSpatialExtentResult,
  SpatialExtentJsonPointers,
} from '../geocoding/spatial-extent-result.parser'

// JSON Pointers resolved against a geocoding result to build the labels shown in the dropdown
export const GEOCODING_RESULT_LABELS =
  new InjectionToken<SpatialExtentJsonPointers>('geocodingResultLabels', {
    factory: () => ({}),
  })

@Component({
  selector: 'gn-ui-location-search',
  templateUrl: './location-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AutocompleteComponent],
})
export class LocationSearchComponent {
  private geocodingService = inject(GeocodingService)
  private jsonPointers = inject(GEOCODING_RESULT_LABELS)

  @Input() placeholder = ''
  @Output() resultSelected = new EventEmitter<GeocodingResult>()
  @Output() bboxSelected = new EventEmitter<BoundingBox>()

  displayWithFn = (item: AutocompleteItem) => (item as GeocodingResult).label

  searchAction = (text: string): Observable<AutocompleteItem[]> =>
    this.geocodingService.query(text)

  getSecondaryLabel(result: GeocodingResult): string | undefined {
    return parseSpatialExtentResult(result, this.jsonPointers).secondaryLabel
  }

  getMainLabel(result: GeocodingResult): string {
    const { label, tertiaryLabel } = parseSpatialExtentResult(
      result,
      this.jsonPointers
    )
    return tertiaryLabel ? `${label}, ${tertiaryLabel}` : label
  }

  handleItemSelected(item: AutocompleteItem) {
    const result = item as GeocodingResult
    this.resultSelected.emit(result)
    if (result.geom) {
      this.bboxSelected.emit(getGeometryBoundingBox(result.geom))
    }
  }
}
