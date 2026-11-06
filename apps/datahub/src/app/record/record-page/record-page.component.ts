import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { Meta } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
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
import { NotificationsContainerComponent } from '@geonetwork-ui/feature/notifications'

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
    NotificationsContainerComponent,
  ],
})
export class RecordPageComponent implements OnInit, OnDestroy {
  mdViewFacade = inject(MdViewFacade)
  titleService = inject(TitleService)
  subscription: Subscription
  metadataQualityDisplay: boolean
  private meta = inject(Meta)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

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
            if (
              metadata.kind &&
              metadata.uniqueIdentifier ===
                this.route.snapshot.params.metadataUuid &&
              this.route.snapshot.url[0]?.path !== metadata.kind
            ) {
              this.router.navigate(
                ['/', metadata.kind, metadata.uniqueIdentifier],
                {
                  queryParamsHandling: 'preserve',
                  preserveFragment: true,
                  replaceUrl: true,
                }
              )
            }
          }
        })
      )
      .subscribe()
    this.subscription.add(
      this.mdViewFacade.error$.subscribe((error) => {
        if (error?.notFound) {
          this.meta.updateTag({ name: 'robots', content: 'noindex' })
        } else {
          this.meta.removeTag('name="robots"')
        }
      })
    )
  }

  ngOnDestroy() {
    document.documentElement.classList.remove('record-page-active')
    this.subscription.unsubscribe()
    this.meta.removeTag('name="robots"')
  }
}
