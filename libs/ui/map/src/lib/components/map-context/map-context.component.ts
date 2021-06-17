import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import { MapContextService } from '../../services/map-context.service'
import { MapContextModel } from '../../models/map-context.model'

import Map from 'ol/Map'

@Component({
  selector: 'gn-ui-map-context',
  templateUrl: './map-context.component.html',
  styleUrls: ['./map-context.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapContextComponent implements OnInit {
  @Input() context: MapContextModel
  map: Map
  constructor(private service: MapContextService) {}

  ngOnInit(): void {
    this.map = this.service.createMap(this.context)
  }
}
