import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
} from '@angular/core'
import Map from 'ol/Map'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { MapService } from '../../map.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  @ViewChild('mapElt', { static: true }) mapRef: ElementRef
  map: Map

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.map.setTarget(this.mapRef.nativeElement)
  }
}
