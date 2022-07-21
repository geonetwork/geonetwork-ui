import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
} from '@angular/core'

export const THUMBNAIL_PLACEHOLDER = new InjectionToken<string>(
  'thumbnail-placeholder'
)

@Component({
  selector: 'gn-ui-thumbnail',
  templateUrl: './thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbnailComponent {
  @Input() set thumbnailUrl(url: string) {
    this.imgUrl = url || this.placeholderUrl
  }
  imgUrl: string
  placeholderUrl =
    this.optionalPlaceholderUrl || 'assets/img/thumb_placeholder.webp'
  constructor(
    @Optional()
    @Inject(THUMBNAIL_PLACEHOLDER)
    private optionalPlaceholderUrl: string
  ) {}
}
