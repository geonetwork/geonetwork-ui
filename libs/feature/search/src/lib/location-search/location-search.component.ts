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
import pointer from 'jsonpointer'
import { GeocodingResult } from '@geospatial-sdk/geocoding'
import {
  AutocompleteComponent,
  AutocompleteItem,
} from '@geonetwork-ui/ui/inputs'
import { BoundingBox, getGeometryBoundingBox } from '@geonetwork-ui/util/shared'
import { GeocodingService } from '../geocoding/geocoding.service'

// JSON Pointers resolved against a geocoding result to build the labels shown in the dropdown
export interface GeocodingProviderLabels {
  main?: string
  secondary?: string
  tertiary?: string
}

export const GEOCODING_PROVIDER_LABELS =
  new InjectionToken<GeocodingProviderLabels>('geocodingProviderLabels', {
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
  private labels = inject(GEOCODING_PROVIDER_LABELS)

  @Input() placeholder = ''
  @Output() resultSelected = new EventEmitter<GeocodingResult>()
  @Output() bboxSelected = new EventEmitter<BoundingBox>()

  displayWithFn = (item: AutocompleteItem) => (item as GeocodingResult).label

  searchAction = (text: string): Observable<AutocompleteItem[]> =>
    this.geocodingService.query(text)

  getSecondaryLabel(result: GeocodingResult): string | undefined {
    return this.resolveLabel(result, this.labels.secondary)
  }

  getMainLabel(result: GeocodingResult): string {
    return this.resolveLabel(result, this.labels.main) ?? result.label
  }

  getTertiaryLabel(result: GeocodingResult): string | undefined {
    return this.resolveLabel(result, this.labels.tertiary)
  }

  private resolveLabel(
    result: GeocodingResult,
    path?: string
  ): string | undefined {
    if (!path) return undefined
    const value = pointer.get(result, path)
    return typeof value === 'string' && value ? value : undefined
  }

  handleItemSelected(item: AutocompleteItem) {
    const result = item as GeocodingResult
    this.resultSelected.emit(result)
    if (result.geom) {
      this.bboxSelected.emit(getGeometryBoundingBox(result.geom))
    }
  }
}
