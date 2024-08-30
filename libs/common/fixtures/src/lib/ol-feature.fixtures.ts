import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'

export const openLayerFeatureFixture = (): Feature => {
  const feature = new Feature()
  feature.set('id', 123)
  feature.set('name', 'ol_feature')
  feature.set('geometry', new Geometry())
  return feature
}
