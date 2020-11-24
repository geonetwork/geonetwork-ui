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
import { transform } from 'ol/proj'

@Component({
  selector: 'app-data-import-validation-map-panel',
  templateUrl: './data-import-validation-map-panel.component.html',
  styleUrls: ['./data-import-validation-map-panel.css'],
})
export class DataImportValidationMapPanelComponent
  implements OnInit, AfterViewInit {
  @ViewChild('map') mapElt: ElementRef

  @Input() showProperties = false
  @Input() headerLabel = ''
  @Input() footerLabel = ''
  @Input() footerList = []
  @Input() geoJson: any = {}

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
      controls: [],
      interactions: [],
      view: new View({
        projection: 'EPSG:4326',
        center: transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 1,
      }),
    })

    this.map.getView().fit(vectorLayer.getSource().getExtent(), {
      padding: [100, 100, 100, 100],
      constrainResolution: false,
    })
  }

  getProperties() {
    return Object.entries(this.geoJson.properties || {})
  }

  selectValue(event) {
    this.selectedValue = event
  }

  private getDefaultStyle(): Style {
    return new Style({
      stroke: new Stroke({
        color: 'orange',
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(255,165,0, 0.1)',
      }),
    })
  }

  private buildVectorSource(geoJson: GeoJSON): VectorLayer {
    return new VectorSource({
      features: new GeoJSON().readFeatures(geoJson),
    })
  }

  private buildVectorLayer(): VectorLayer {
    return new VectorLayer({
      source: this.buildVectorSource(this.geoJson),
      style: this.getDefaultStyle(),
    })
  }
}
