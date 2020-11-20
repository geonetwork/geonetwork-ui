import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'

@Component({
  selector: 'app-data-import-validation-map-panel',
  templateUrl: './data-import-validation-map-panel.component.html',
  styleUrls: ['./data-import-validation-map-panel.css'],
})
export class DataImportValidationMapPanelComponent
  implements OnInit, AfterViewInit {
  @ViewChild('map') mapElt: ElementRef

  @Input() mapViewId = 'map'
  @Input() headerLabel = ''
  @Input() footerLabel = ''
  @Input() footerList = []
  @Input() geoJson = ''

  selectedValue: any

  private map: Map

  constructor() {}

  ngOnInit(): void {
    this.selectedValue = this.footerList[0]
  }

  ngAfterViewInit() {
    this.map = new Map({
      target: this.mapElt.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      interactions: [],
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
