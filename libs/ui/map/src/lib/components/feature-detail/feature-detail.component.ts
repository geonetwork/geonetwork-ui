import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import type { Feature } from 'geojson'
import { DatasetFeatureCatalog } from '@geonetwork-ui/common/domain/model/record'

const geometryKeys = ['geometry', 'the_geom']

@Component({
  selector: 'gn-ui-feature-detail',
  templateUrl: './feature-detail.component.html',
  styleUrls: ['./feature-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class FeatureDetailComponent {
  @Input() feature: Feature
  _featureAttributes = []
  @Input() set featureCatalog(value: DatasetFeatureCatalog) {
    if (value) this._featureAttributes = value.featureTypes[0].attributes
  }

  get properties() {
    if (!this.feature) return []
    return this.setProperties()
  }

  setProperties() {
    const properties = Object.keys(this.feature.properties)
      .filter((p) => !geometryKeys.includes(p))
      .reduce((acc, p) => {
        let key = p
        if (this._featureAttributes.length) {
          const matchingAttribute = this._featureAttributes.find(
            (attr) => attr.name === p
          )

          if (matchingAttribute && matchingAttribute.code) {
            key = matchingAttribute.code
          }
        }
        acc[key] = this.feature.properties[p]
        return acc
      }, {})

    return properties
  }
}
