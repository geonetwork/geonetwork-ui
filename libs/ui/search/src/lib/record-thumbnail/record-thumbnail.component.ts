import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'

@Component({
  selector: 'gn-ui-record-thumbnail',
  templateUrl: './record-thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordThumbnailComponent {
  @Input() set thumbnailUrl(url: string) {
    this.imgUrl = url || this.placeholderUrl
  }
  imgUrl: string
  placeholderUrl = getThemeConfig().THUMBNAIL_PLACEHOLDER
}
