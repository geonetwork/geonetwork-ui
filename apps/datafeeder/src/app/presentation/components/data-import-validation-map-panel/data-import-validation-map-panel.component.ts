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
import { OSM, Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import GeoJSON from 'ol/format/GeoJSON'
import { Fill, Stroke, Style } from 'ol/style'

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
    const vectorLayer = this.buildVectorLayer()

    this.map = new Map({
      target: this.mapElt.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      interactions: [],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })

    this.map.getView().fit(vectorLayer.getSource().getExtent())
  }

  selectValue(event) {
    console.log(event)
  }

  private getDefaultStyle(): Style {
    return new Style({
      stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    })
  }

  private buildVectorSource(geoJson: GeoJSON): VectorLayer {
    return new VectorSource({
      features: new GeoJSON().readFeatures(this.geoJson),
    })
  }

  private buildVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: this.buildVectorSource(this.geoJson),
      style: this.getDefaultStyle(),
    })
  }
}
