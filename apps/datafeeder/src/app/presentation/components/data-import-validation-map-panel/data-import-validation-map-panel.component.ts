import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { ColorService } from '@lib/common'
import { Feature } from 'geojson'
import { asArray, asString } from 'ol/color'
import GeoJSON from 'ol/format/GeoJSON'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import Map from 'ol/Map'
import { isEmpty } from 'ol/extent'
import { transform } from 'ol/proj'
import { OSM, Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style } from 'ol/style'
import View from 'ol/View'

const DEFAULT_PRIMARY_COLOR = '#9a9a9a'

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
  @Input() geoJson?: Feature

  selectedValue: any

  private map: Map
  private source: VectorSource
  private vectorLayer: VectorLayer
  private GeoJSON = new GeoJSON()

  constructor() {}

  ngOnInit(): void {
    this.selectedValue = this.footerList[0]
    this.vectorLayer = this.buildVectorLayer()
  }

  ngAfterViewInit() {
    this.map = new Map({
      target: this.mapElt.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      controls: [],
      interactions: [],
      view: new View({
        center: transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 1,
      }),
    })

    this.fit()
  }

  fit() {
    if (isEmpty(this.source.getExtent())) return
    this.map.getView().fit(this.source.getExtent(), {
      padding: [100, 100, 100, 100],
      constrainResolution: false,
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const geoJson = changes.geoJson.currentValue
    if (!geoJson || !this.source) return
    this.source.clear()
    this.source.addFeatures(
      geoJson
        ? this.GeoJSON.readFeatures(geoJson, {
            featureProjection: 'EPSG:3857',
          })
        : []
    )
    this.fit()
  }

  getSecondaryColor(opacity: number = 1) {
    const secondaryColor =
      ColorService.getColor('secondary') || DEFAULT_PRIMARY_COLOR
    const [r, g, b] = Array.from(asArray(secondaryColor))

    return asString([r, g, b, opacity])
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
        color: this.getSecondaryColor(1),
        width: 3,
      }),
      fill: new Fill({
        color: this.getSecondaryColor(0.1),
      }),
    })
  }

  private buildVectorLayer(): VectorLayer {
    this.source = new VectorSource({
      features: new GeoJSON().readFeatures(this.geoJson, {
        featureProjection: 'EPSG:3857',
      }),
    })
    return new VectorLayer({
      source: this.source,
      style: this.getDefaultStyle(),
    })
  }
}
