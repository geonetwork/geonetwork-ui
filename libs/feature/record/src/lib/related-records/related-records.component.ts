import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-related-records',
  templateUrl: './related-records.component.html',
  styleUrls: ['./related-records.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedRecordsComponent implements OnInit {
  @Input() records: MetadataRecord[]
  constructor() {}

  ngOnInit(): void {}
}
