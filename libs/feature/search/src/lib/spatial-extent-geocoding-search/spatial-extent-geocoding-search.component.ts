import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import { BoundingBox, getGeometryBoundingBox } from '@geonetwork-ui/util/shared'
import { getOptionalSearchConfig } from '@geonetwork-ui/util/app-config'
import { LocationSearchComponent } from '../location-search/location-search.component'
import {
  parseSpatialExtentResult,
  SpatialExtentJsonPointers,
} from '../geocoding/spatial-extent-result.parser'

@Component({
  selector: 'gn-ui-spatial-extent-geocoding-search',
  templateUrl: './spatial-extent-geocoding-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LocationSearchComponent],
})
export class SpatialExtentGeocodingSearchComponent {
  @Output() bboxSelected = new EventEmitter<BoundingBox>()

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

  handleResultSelected(result: GeocodingResult) {
    if (!result.geom) return
    this.bboxSelected.emit(getGeometryBoundingBox(result.geom))
  }
}
