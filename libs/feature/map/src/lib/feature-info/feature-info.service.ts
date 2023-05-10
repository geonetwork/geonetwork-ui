import { EventEmitter, Injectable } from '@angular/core'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'
import { forkJoin, Observable, of } from 'rxjs'
import { MapManagerService } from '../manager/map-manager.service'
import { MapUtilsService } from '../utils/map-utils.service'

@Injectable({
  providedIn: 'root',
})
export class FeatureInfoService {
  features$ = new EventEmitter<Feature<Geometry>[]>()

  constructor(
    private manager: MapManagerService,
    private mapUtils: MapUtilsService
  ) {}

  handleFeatureInfo(): void {
    const { map } = this.manager
    map.on('click', (event) => {
      const gfiFeaturesObservables =
        this.mapUtils.getGFIFeaturesObservablesFromClick(map, event)
      const vectorFeatures$ = of(
        this.mapUtils.getVectorFeaturesFromClick(map, event)
      )

      const featuresObservablesArray: Observable<Feature<Geometry>[]>[] = [
        ...gfiFeaturesObservables,
        vectorFeatures$,
      ]

      forkJoin(...featuresObservablesArray).subscribe((featuresArrays) => {
        const allFeatures = featuresArrays.reduce(
          (outputFeatures, features) => [...outputFeatures, ...features],
          []
        )
        this.features$.emit(allFeatures)
      })
    })
  }
}
