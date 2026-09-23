import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
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
import { getOptionalSearchConfig } from '@geonetwork-ui/util/app-config'
import { GeocodingService } from '../geocoding/geocoding.service'
import {
  parseSpatialExtentResult,
  SpatialExtentJsonPointers,
} from '../geocoding/spatial-extent-result.parser'

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
  @Output() resultSelected = new EventEmitter<GeocodingResult>()
  @Output() bboxSelected = new EventEmitter<BoundingBox>()

  displayWithFn = (item: AutocompleteItem) => (item as GeocodingResult).label

  searchAction = (text: string): Observable<AutocompleteItem[]> =>
    this.geocodingService.query(text)

  private get jsonPointers(): SpatialExtentJsonPointers {
    const config = getOptionalSearchConfig()?.GEOCODING_RESULT_LABELS
    return {
      mainLabel: config?.MAIN_LABEL_JSON_POINTER,
      secondaryLabel: config?.SECONDARY_LABEL_JSON_POINTER,
      tertiaryLabel: config?.TERTIARY_LABEL_JSON_POINTER,
    }
  }

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
