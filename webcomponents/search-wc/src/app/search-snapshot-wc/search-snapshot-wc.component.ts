import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { Metadata, MetadataApi } from '@lib/gn-api'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-search-snapshot-wc',
  templateUrl: './search-snapshot-wc.component.html',
  styleUrls: ['./search-snapshot-wc.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SearchSnapshotWcComponent implements OnInit {
  metadatas$: Observable<Metadata[]>
  constructor(private mdApi: MetadataApi) {}

  ngOnInit(): void {
    this.metadatas$ = this.mdApi.find()
  }
}
