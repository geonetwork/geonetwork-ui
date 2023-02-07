import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core'
import { SearchFacade, SearchService } from '@geonetwork-ui/feature/search'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-search-input',
  templateUrl: './gn-search-input.component.html',
  styleUrls: ['./gn-search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [SearchFacade, SearchService],
})
export class GnSearchInputComponent extends BaseComponent {
  @Input() datahubUrl: string

  search(any: string) {
    if (this.datahubUrl) {
      const landingPage = `${this.datahubUrl}/home/search/?q=${any}`
      window.open(landingPage, '_self').focus()
    }
  }

  select(record: MetadataRecord) {
    if (this.datahubUrl) {
      const landingPage = `${this.datahubUrl}/dataset/${record.uuid}`
      window.open(landingPage, '_self').focus()
    }
  }
}
