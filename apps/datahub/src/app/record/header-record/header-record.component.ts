import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SearchService } from '@geonetwork-ui/feature/search'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { MetadataRecord } from '@geonetwork-ui/util/shared'

@Component({
  selector: 'datahub-header-record',
  templateUrl: './header-record.component.html',
  styleUrls: ['./header-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderRecordComponent {
  @Input() metadata: MetadataRecord
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    "center url('assets/img/default_header_bg.webp')"

  constructor(private searchService: SearchService) {}

  back() {
    this.searchService.updateSearch({})
  }
}
