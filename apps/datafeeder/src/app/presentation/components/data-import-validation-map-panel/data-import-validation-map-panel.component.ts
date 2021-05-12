import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { ColorService } from '@lib/common'
import { Feature } from 'geojson'
import { asArray, asString } from 'ol/color'
import { isEmpty } from 'ol/extent'
import GeoJSON from 'ol/format/GeoJSON'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import Map from 'ol/Map'
import { transform } from 'ol/proj'
import { OSM, Vector as VectorSource } from 'ol/source'
import { Fill, Stroke, Style, RegularShape } from 'ol/style'
import View from 'ol/View'

const DEFAULT_PRIMARY_COLOR = '#9a9a9a'
const PADDING = 50

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
  @Input() footerValue = ''
  @Input() padding = []

  @Output() propertyChange = new EventEmitter<string>()

  selectedValue: any

  private map: Map
  private source: VectorSource
  private vectorLayer: VectorLayer
  private format: any = new GeoJSON({})

  constructor() {}

  ngOnInit(): void {
    this.selectedValue = this.footerValue || ''
    this.vectorLayer = this.buildVectorLayer()

    if (!this.geoJson) {
      return
    }
    this.source.clear()
    this.source.addFeatures(
      this.geoJson
        ? this.format.readFeatures(this.geoJson, {
            featureProjection: 'EPSG:3857',
          })
        : []
    )
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
        constrainResolution: true,
      }),
    })

    this.fit()
  }

  fit() {
    if (isEmpty(this.source.getExtent())) {
      return
    }
    this.map.getView().fit(this.source.getExtent(), {
      padding:
        this.padding.length === 0 ? Array(4).fill(PADDING) : this.padding,
      constrainResolution: false,
      maxZoom: 18,
    })
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
    this.propertyChange.emit(event)
  }

  private getDefaultStyle(): Style {
    const stroke = new Stroke({
      color: this.getSecondaryColor(1),
      width: 3,
    })
    const fill = new Fill({
      color: this.getSecondaryColor(0.1),
    })
    return [
      new Style({ stroke, fill }),
      new Style({
        image: new RegularShape({
          fill,
          stroke,
          points: 5,
          radius: 12,
          radius2: 4,
          angle: 0,
        }),
      }),
    ]
  }

  private buildVectorLayer(): VectorLayer {
    this.source = new VectorSource({
      features: this.format.readFeatures(this.geoJson, {
        featureProjection: 'EPSG:3857',
      }),
    })
    return new VectorLayer({
      source: this.source,
      style: this.getDefaultStyle(),
    })
  }
}
