import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { ThemeService } from '@geonetwork-ui/util/shared'
import type { Feature } from 'geojson'
import { asArray, asString } from 'ol/color'
import { isEmpty } from 'ol/extent'
import GeoJSON from 'ol/format/GeoJSON'
import { Geometry } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Fill, RegularShape, Stroke, Style } from 'ol/style'
import { StyleLike } from 'ol/style/Style'
import View from 'ol/View'

const DEFAULT_PRIMARY_COLOR = '#9a9a9a'
const PADDING = 50

@Component({
  selector: 'gn-ui-data-import-validation-map-panel',
  templateUrl: './data-import-validation-map-panel.component.html',
  styleUrls: ['./data-import-validation-map-panel.css'],
})
export class DataImportValidationMapPanelComponent
  implements OnInit, AfterViewInit, OnChanges
{
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
  private source: VectorSource<Geometry>
  private vectorLayer: VectorLayer<VectorSource<Geometry>>
  private format: any = new GeoJSON({})

  ngOnInit(): void {
    this.selectedValue = this.footerValue || ''
    this.vectorLayer = this.buildVectorLayer()
    if (this.geoJson) {
      this.addFeature()
    }
  }

  addFeature() {
    if (!this.source) {
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
    if (this.map) {
      this.fit()
    }
  }

  ngOnChanges() {
    this.addFeature()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map = new Map({
        target: this.mapElt.nativeElement,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        controls: [],
        interactions: [],
        view: new View({
          center: [0, 0],
          zoom: 1,
          constrainResolution: true,
        }),
      })
      if (this.vectorLayer) {
        this.map.addLayer(this.vectorLayer)
      }
      this.fit()
    })
  }

  fit() {
    if (isEmpty(this.source.getExtent())) {
      return
    }
    this.map.getView().fit(this.source.getExtent(), {
      padding:
        this.padding.length === 0 ? Array(4).fill(PADDING) : this.padding,
      maxZoom: 18,
    })
  }

  getSecondaryColor(opacity = 1) {
    const secondaryColor =
      ThemeService.getColor('secondary') || DEFAULT_PRIMARY_COLOR
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

  private getDefaultStyle(): StyleLike {
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

  private buildVectorLayer(): VectorLayer<VectorSource<Geometry>> {
    this.source = new VectorSource({})
    if (this.geoJson) {
      this.source.addFeatures(
        this.format.readFeatures(this.geoJson, {
          featureProjection: 'EPSG:3857',
        })
      )
    }
    return new VectorLayer({
      source: this.source,
      style: this.getDefaultStyle(),
    })
  }
}
