import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import type { Feature } from 'geojson'

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

  get properties() {
    if (!this.feature) return []
    return Object.keys(this.feature.properties).filter(
      (prop) => !geometryKeys.includes(prop)
    )
  }
}
