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
  SpatialExtentJsonPaths,
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

  private get jsonPaths(): SpatialExtentJsonPaths {
    const config = getOptionalSearchConfig()?.SPATIAL_EXTENT_SERVICE
    return {
      mainLabel: config?.MAIN_LABEL_JSONPATH,
      secondaryLabel: config?.SECONDARY_LABEL_JSONPATH,
      tertiaryLabel: config?.TERTIARY_LABEL_JSONPATH,
      geometry: config?.GEOMETRY_STRING_JSONPATH,
    }
  }

  getSecondaryLabel(result: GeocodingResult): string | undefined {
    return parseSpatialExtentResult(result, this.jsonPaths).secondaryLabel
  }

  getMainLabel(result: GeocodingResult): string {
    const { label, tertiaryLabel } = parseSpatialExtentResult(
      result,
      this.jsonPaths
    )
    return tertiaryLabel ? `${label}, ${tertiaryLabel}` : label
  }

  handleResultSelected(result: GeocodingResult) {
    const { geom } = parseSpatialExtentResult(result, this.jsonPaths)
    if (!geom) return
    this.bboxSelected.emit(getGeometryBoundingBox(geom))
  }
}
