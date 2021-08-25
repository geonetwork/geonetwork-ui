import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import { RecordSummary } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-metadata-page',
  templateUrl: './metadata-page.component.html',
  styleUrls: ['./metadata-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataPageComponent {
  @Input() metadata: RecordSummary
}
