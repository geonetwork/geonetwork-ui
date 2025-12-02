import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MyRecordsComponent } from './my-records.component'
import {
  FeatureSearchModule,
  SearchStateContainerDirective,
} from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-my-records-state-wrapper',
  templateUrl: './my-records-state-wrapper.component.html',
  styles: [],
  standalone: true,
  imports: [
    FeatureSearchModule,
    MyRecordsComponent,
    SearchStateContainerDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyRecordsStateWrapperComponent {}
