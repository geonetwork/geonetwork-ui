import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SearchService } from '@geonetwork-ui/feature/search'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'datahub-header-record',
  templateUrl: './header-record.component.html',
  styleUrls: ['./header-record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderRecordComponent {
  @Input() metadata: CatalogRecord
  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'

  constructor(private searchService: SearchService) {}

  back() {
    this.searchService.updateFilters({})
  }
}
