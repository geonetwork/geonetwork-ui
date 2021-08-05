import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'

import Map from 'ol/Map'
import { forkJoin, Observable, of } from 'rxjs'
import { MapContextModel } from '../../models/map-context.model'
import { MapContextService } from '../../services/map-context.service'
import { MapUtilsService } from '../../services/map-utils.service'

@Component({
  selector: 'gn-ui-map-context',
  templateUrl: './map-context.component.html',
  styleUrls: ['./map-context.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapContextComponent implements OnInit {
  @Input() context: MapContextModel
  @Output() featureClicked = new EventEmitter<Feature<Geometry>[]>()

  map: Map

  constructor(
    private service: MapContextService,
    private mapUtils: MapUtilsService
  ) {}

  ngOnInit(): void {
    this.map = this.service.createMap(this.context)
    this.initInteractions()
  }

  private initInteractions(): void {
    this.map.on('click', (event) => {
      const gfiFeaturesObservables = this.mapUtils.getGFIFeaturesObservablesFromClick(
        this.map,
        event
      )
      const vectorFeatures$ = of(
        this.mapUtils.getVectorFeaturesFromClick(this.map, event)
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
        this.featureClicked.emit(allFeatures)
      })
    })
  }
}
