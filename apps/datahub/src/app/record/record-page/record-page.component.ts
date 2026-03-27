import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  MdViewFacade,
  RecordMetaComponent,
} from '@geonetwork-ui/feature/record'
import {
  getMetadataQualityConfig,
  MetadataQualityConfig,
} from '@geonetwork-ui/util/app-config'
import { Subscription, tap } from 'rxjs'
import { TitleService } from '../../router/datahub-title.service'
import { RecordHeaderComponent } from '../record-header/record-header.component'
import { RecordMetadataComponent } from '../record-metadata/record-metadata.component'

@Component({
  selector: 'datahub-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RecordMetadataComponent,
    RecordHeaderComponent,
    RecordMetaComponent,
  ],
})
export class RecordPageComponent implements OnInit, OnDestroy {
  mdViewFacade = inject(MdViewFacade)
  titleService = inject(TitleService)
  subscription: Subscription
  metadataQualityDisplay: boolean

  constructor() {
    document.documentElement.classList.add('record-page-active')
    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = cfg.ENABLED
  }

  ngOnInit() {
    this.subscription = this.mdViewFacade.metadata$
      .pipe(
        tap((metadata) => {
          if (metadata) {
            this.titleService.setTitle(metadata.title)
          }
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    document.documentElement.classList.remove('record-page-active')
    this.subscription.unsubscribe()
  }
}
