import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core'
import { Meta } from '@angular/platform-browser'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-record-meta',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class RecordMetaComponent implements OnDestroy, OnChanges {
  @Input() metadata: CatalogRecord

  constructor(private meta: Meta) {}

  ngOnChanges() {
    if (this.metadata?.title) {
      this.meta.addTag({ property: 'og:title', content: this.metadata.title })
      this.meta.addTag({
        property: 'og:url',
        content: window.location.href.toString(),
      })
      if (this.metadata?.overviews?.length > 0) {
        for (const overview of this.metadata.overviews) {
          this.meta.addTag({
            property: 'og:image',
            content: overview.url.toString(),
          })
        }
      }
    }
  }

  ngOnDestroy() {
    this.meta.removeTag('property="og:image"')
    this.meta.removeTag('property="og:url"')
    this.meta.removeTag('property="og:title"')
  }
}
