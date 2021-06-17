import { Injectable } from '@angular/core'
import { FeatureCollection } from 'geojson'
import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'

@Injectable({
  providedIn: 'root',
})
export class MapUtilsService {
  constructor() {}

  readFeatureCollection = (
    featureCollection: FeatureCollection,
    featureProjection = 'EPSG:3857',
    dataProjection = 'EPSG:4326'
  ): Feature[] => {
    const olFeatures = new GeoJSON().readFeatures(featureCollection, {
      featureProjection,
      dataProjection,
    })
    return olFeatures
  }
}
