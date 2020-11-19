import { AfterViewInit, Component, Input, OnInit } from '@angular/core'
import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, AfterViewInit {
  @Input() mapViewId = 'map'
  @Input() headerLabel = ''
  @Input() footerLabel = ''
  @Input() footerList = []
  @Input() geoJson = ''

  selectedValue: any

  private map: Map = null

  constructor() {}

  ngOnInit(): void {
    this.selectedValue = this.footerList[0]
  }

  ngAfterViewInit() {
    this.map = new Map({
      target: this.mapViewId,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })
  }

  selectValue(event) {
    console.log(event)
  }
}
