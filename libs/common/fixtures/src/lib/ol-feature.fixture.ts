import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'

export const OL_FEATURE_FIXTURE = new Feature()
OL_FEATURE_FIXTURE.set('id', 123)
OL_FEATURE_FIXTURE.set('name', 'ol_feature')
OL_FEATURE_FIXTURE.set('geometry', new Geometry())
