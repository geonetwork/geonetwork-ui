import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FeatureCollection } from 'geojson'
import TileLayer from 'ol/layer/Tile'
import Map from 'ol/Map'
import { fromLonLat } from 'ol/proj'
import XYZ from 'ol/source/XYZ'
import View from 'ol/View'
import TileWMS from 'ol/source/TileWMS'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { filter, take } from 'rxjs/operators'

export interface RecordLayer {
  name: string
  description?: string
  'OGC:WMS'?: string
  'OGC:WFS'?: string
}
@Injectable()
export class MapService {
  map: Map
  layers: RecordLayer[]
  datas: { [key: string]: Observable<FeatureCollection> } = {}
  data$ = new BehaviorSubject(undefined)

  constructor(private http: HttpClient) {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            urls: [
              `https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png`,
              `https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png`,
              `https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png`,
            ],
            crossOrigin: 'anonymous',
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([4, 45]),
        zoom: 5,
        minZoom: 2,
        multiWorld: true,
        constrainResolution: true,
      }),
    })
  }

  toggleLayer(recordLayer: RecordLayer): void {
    const oldLayer = this.getLayerInMap(recordLayer)
    if (oldLayer) {
      this.map.removeLayer(oldLayer)
    } else {
      const layer = new TileLayer({
        name: recordLayer.name,
        description: recordLayer.description,
        source: new TileWMS({
          url: recordLayer['OGC:WMS'],
          params: {
            LAYERS: recordLayer.name,
          },
        }),
      })
      this.map.addLayer(layer)
    }
  }

  toggleData(recordLayer: RecordLayer): void {
    const url = recordLayer['OGC:WFS']
    if (url) {
      this.fetchFeatures(recordLayer)
        .pipe(
          take(1),
          filter((collection) => !!collection)
        )
        .subscribe((collection) => this.data$.next(collection))
    }
  }

  fetchFeatures(recordLayer: RecordLayer) {
    if (!this.datas[recordLayer.name]) {
      this.datas[recordLayer.name] = this.http.get<FeatureCollection>(
        `${recordLayer['OGC:WFS']}?REQUEST=GetFeature&SERVICE=WFS&VERSION=1.1.0&TypeName=surval_parametre_point&outputformat=geojson&MAXFEATURES=50`
      )
    }
    return this.datas[recordLayer.name]
  }

  private getLayerInMap(recordLayer: RecordLayer): boolean {
    const candidates = this.map
      .getLayers()
      .getArray()
      // .filter((layer) => typeof layer === TileLayer)
      .filter((layer) => layer.get('name') === recordLayer.name)

    return candidates.length === 1 ? candidates[0] : null
  }

  setLayers(layers: RecordLayer[]): void {
    this.layers = layers
    this.layers.forEach((layer) => this.toggleLayer(layer))
    this.layers.forEach((layer) => this.toggleData(layer))
  }
}
