import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core'
import { MapUtilsService } from '../../utils/map-utils.service'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'

import Map from 'ol/Map'
import { FeatureInfoService } from '../../feature-info/feature-info.service'
import { MapManagerService } from '../../manager/map-manager.service'
import { MapContextModel } from '../map-context.model'
import { MapContextService } from '../map-context.service'
import { MapConfig } from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'gn-ui-map-context',
  templateUrl: './map-context.component.html',
  styleUrls: ['./map-context.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapContextComponent implements OnChanges {
  @Input() context: MapContextModel
  @Input() mapConfig: MapConfig
  @Output() featureClicked = new EventEmitter<Feature<Geometry>[]>()

  map: Map

  constructor(
    private service: MapContextService,
    private featureInfo: FeatureInfoService,
    private manager: MapManagerService,
    private utils: MapUtilsService
  ) {
    this.map = manager.map
  }

  ngOnChanges() {
    if (this.context?.view) {
      if (this.context.view.extent && !this.map.getSize()) {
        this.map.once('change:size', () => {
          this.service.resetMapFromContext(
            this.map,
            this.context,
            this.mapConfig
          )
        })
      } else {
        this.service.resetMapFromContext(this.map, this.context, this.mapConfig)
      }
    }
  }
}
