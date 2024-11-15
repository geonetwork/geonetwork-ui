import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { Meta } from '@angular/platform-browser'
import {
  MetadataQualityConfig,
  getMetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'
import { Subscription } from 'rxjs'

@Component({
  selector: 'datahub-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordPageComponent implements OnDestroy, OnInit {
  metadataQualityDisplay: boolean
  sub: Subscription

  constructor(public mdViewFacade: MdViewFacade, private meta: Meta) {
    document.documentElement.classList.add('record-page-active')
    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = cfg.ENABLED
  }
  ngOnDestroy() {
    document.documentElement.classList.remove('record-page-active')
    this.meta.updateTag({ property: 'og:title', content: 'Datahub' })
    this.meta.updateTag({
      property: 'og:url',
      content: window.location.href.toString(),
    })
    this.meta.removeTag('property="og:image"')
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.sub = this.mdViewFacade.metadata$.subscribe((metadata) => {
      if (metadata) {
        this.meta.updateTag({ property: 'og:title', content: metadata.title })
        this.meta.updateTag({
          property: 'og:url',
          content: window.location.href.toString(),
        })
        if (metadata.overviews.length > 0) {
          for (const overview of metadata.overviews) {
            this.meta.addTag({
              property: 'og:image',
              content: overview.url.toString(),
            })
          }
        }
      }
    })
  }
}
