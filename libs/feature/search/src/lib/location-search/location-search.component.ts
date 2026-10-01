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
import { Geometry } from 'geojson'
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

export interface LocationBbox {
  bbox: BoundingBox
  label: string
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
  @Output() bboxSelected = new EventEmitter<LocationBbox>()

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

  getDisplayLabel(result: GeocodingResult): string {
    const tertiary = this.getTertiaryLabel(result)
    return this.getMainLabel(result) + (tertiary ? ', ' + tertiary : '')
  }

  private resolveLabel(
    result: GeocodingResult,
    path?: string
  ): string | undefined {
    if (!path) return undefined
    let value: unknown
    try {
      value = pointer.get(result, path)
    } catch {
      return undefined
    }
    const values = Array.isArray(value) ? value : [value]
    const label = values
      .filter((v) => typeof v === 'string' || typeof v === 'number')
      .join(', ')
    return label || undefined
  }

  // geoplateforme keeps a simplified geometry in geom and puts the real one,
  // as a JSON string, in properties.truegeometry when returnTrueGeometry is set
  private getGeometry(result: GeocodingResult): Geometry | null {
    const trueGeometry = result.properties?.['truegeometry']
    if (typeof trueGeometry === 'string') {
      return JSON.parse(trueGeometry)
    }
    return (trueGeometry as Geometry) ?? result.geom
  }

  handleItemSelected(item: AutocompleteItem) {
    const result = item as GeocodingResult
    this.resultSelected.emit(result)
    const geometry = this.getGeometry(result)
    if (geometry) {
      this.bboxSelected.emit({
        bbox: getGeometryBoundingBox(geometry),
        label: this.getDisplayLabel(result),
      })
    }
  }
}
