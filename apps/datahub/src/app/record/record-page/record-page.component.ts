import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import {
  MdViewFacade,
  RecordMetaComponent,
} from '@geonetwork-ui/feature/record'
import {
  getMetadataQualityConfig,
  MetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'
import { RecordMetadataComponent } from '../record-metadata/record-metadata.component'
import { HeaderRecordComponent } from '../header-record/header-record.component'
import { CommonModule } from '@angular/common'
import { StickyHeaderComponent } from '@geonetwork-ui/ui/layout'
import { map, fromEvent, startWith, combineLatest } from 'rxjs'

@Component({
  selector: 'datahub-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    StickyHeaderComponent,
    RecordMetadataComponent,
    HeaderRecordComponent,
    RecordMetaComponent,
  ],
})
export class RecordPageComponent implements OnDestroy {
  metadataQualityDisplay: boolean

  thumbnailUrl$ = this.mdViewFacade.metadata$.pipe(
    map((metadata) => {
      if (metadata?.overviews === undefined) {
        return undefined
      } else {
        return metadata?.overviews?.[0]?.url ?? null
      }
    })
  )

  isMobile$ = fromEvent(window, 'resize').pipe(
    startWith(window.innerWidth),
    map(() => window.innerWidth < 640)
  )

  fullHeaderHeight$ = combineLatest([this.isMobile$, this.thumbnailUrl$]).pipe(
    map(([isMobile, thumbnailUrl]) => (isMobile && thumbnailUrl ? 544 : 344))
  )

  constructor(public mdViewFacade: MdViewFacade) {
    document.documentElement.classList.add('record-page-active')
    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = cfg.ENABLED
  }
  ngOnDestroy() {
    document.documentElement.classList.remove('record-page-active')
  }
}
