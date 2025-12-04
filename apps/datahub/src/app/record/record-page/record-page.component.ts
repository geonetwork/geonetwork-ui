import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core'
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
import { TitleService } from '../../router/datahub-title.service'
import { tap } from 'rxjs'

@Component({
  selector: 'datahub-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RecordMetadataComponent,
    HeaderRecordComponent,
    RecordMetaComponent,
  ],
})
export class RecordPageComponent implements OnInit, OnDestroy {
  mdViewFacade = inject(MdViewFacade)
  titleService = inject(TitleService)

  metadataQualityDisplay: boolean

  constructor() {
    document.documentElement.classList.add('record-page-active')
    const cfg: MetadataQualityConfig =
      getMetadataQualityConfig() || ({} as MetadataQualityConfig)
    this.metadataQualityDisplay = cfg.ENABLED
  }

  ngOnInit() {
    this.mdViewFacade.metadata$
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
  }
}
