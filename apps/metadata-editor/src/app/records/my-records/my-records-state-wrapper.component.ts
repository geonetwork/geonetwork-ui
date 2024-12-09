import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MyRecordsComponent } from './my-records.component'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'md-editor-my-records-state-wrapper',
  templateUrl: './my-records-state-wrapper.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, FeatureSearchModule, MyRecordsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyRecordsStateWrapperComponent {}
