import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { Observable } from 'rxjs'
import { SearchFacade } from '../state/search.facade'
import { MetadataRecord, ES_SOURCE_BRIEF } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'gn-ui-last-created',
  templateUrl: './last-created.component.html',
  styleUrls: ['./last-created.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastCreatedComponent implements OnInit {
  constructor(private searchfacade: SearchFacade) { }
  records$: Observable<MetadataRecord[]>
  @Input() minPagination: number = 0
  @Input() maxPagination: number = 10

  ngOnInit(): void {
    this.searchfacade.setPagination(this.minPagination, this.maxPagination)
    this.searchfacade.setSortBy('-createDate')
    this.searchfacade.setConfigRequestFields({
      includes: [...ES_SOURCE_BRIEF, 'createDate', 'changeDate'],
    })
    this.records$ = this.searchfacade.results$.pipe()
  }
}
