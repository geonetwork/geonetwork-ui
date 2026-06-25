import { ChangeDetectorRef, Component, inject, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { createViewFromLayer, MapContext } from '@geospatial-sdk/core'
import { MapContainerComponent } from '../map-container/map-container.component'
import { BehaviorSubject, from, Observable, of } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { DatasetSpatialExtent } from '@geonetwork-ui/common/domain/model/record'
import { createSpatialExtentLayer } from '../../map-utils'

@Component({
  selector: 'gn-ui-spatial-extent',
  standalone: true,
  imports: [CommonModule, MapContainerComponent],
  templateUrl: './spatial-extent.component.html',
  styleUrl: './spatial-extent.component.css',
})
export class SpatialExtentComponent {
  private _cdr = inject(ChangeDetectorRef)

  @Input() set spatialExtents(value: DatasetSpatialExtent[]) {
    this.spatialExtents$.next(value)
  }
  spatialExtents$ = new BehaviorSubject<DatasetSpatialExtent[]>([])
  mapContext$: Observable<MapContext> = this.spatialExtents$.pipe(
    switchMap((extents) => {
      const layer = createSpatialExtentLayer(extents)
      if (!layer) {
        return of(null)
      }
      return from(createViewFromLayer(layer)).pipe(
        map((view) => ({ view, layers: [layer] }) as MapContext),
        tap(() => this._cdr.markForCheck())
      )
    })
  )

  error = ''
}
