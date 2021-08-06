import { Injectable } from '@angular/core'
import Map from 'ol/Map'
import { MapUtilsService } from '../utils/map-utils.service'

@Injectable({
  providedIn: 'root',
})
export class MapManagerService {
  readonly map: Map
  constructor(private utils: MapUtilsService) {
    this.map = this.utils.createEmptyMap()
  }
}
