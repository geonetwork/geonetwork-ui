import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import {
  GeoDataBadgeComponent,
  ImageOverlayPreviewComponent,
  KindBadgeComponent,
} from '@geonetwork-ui/ui/elements'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { StickyHeaderComponent } from '@geonetwork-ui/ui/layout'
import { getThemeConfig } from '@geonetwork-ui/util/app-config'
import {
  GnUiHumanizeDateDirective,
  getIsMobile,
} from '@geonetwork-ui/util/shared'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { iconoirOpenNewWindow } from '@ng-icons/iconoir'
import { matArrowBack, matEdit } from '@ng-icons/material-icons/baseline'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { combineLatest, map } from 'rxjs'
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component'
import { RecordActionsComponent } from './record-actions/record-actions.component'
import { RecordHeaderService } from './record-header.service'

export const HEADER_HEIGHT_DEFAULT = 344
export const HEADER_HEIGHT_MOBILE_THUMBNAIL = 640

marker('record.metadata.resourceUpdated')
marker('record.metadata.resourcePublished')
marker('record.metadata.resourceCreated')

@Component({
  selector: 'datahub-record-header',
  templateUrl: './record-header.component.html',
  styleUrls: ['./record-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    NgIcon,
    ImageOverlayPreviewComponent,
    GeoDataBadgeComponent,
    KindBadgeComponent,
    NavigationBarComponent,
    ButtonComponent,
    StickyHeaderComponent,
    GnUiHumanizeDateDirective,
    RecordActionsComponent,
  ],
  viewProviders: [
    provideIcons({ matArrowBack, iconoirOpenNewWindow }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class RecordHeaderComponent implements OnChanges {
  facade = inject(MdViewFacade)
  private headerService = inject(RecordHeaderService)

  @Input() metadata: CatalogRecord

  isMobile$ = getIsMobile()

  backgroundCss =
    getThemeConfig().HEADER_BACKGROUND ||
    `center /cover url('assets/img/header_bg.webp')`
  foregroundColor = getThemeConfig().HEADER_FOREGROUND_COLOR || '#ffffff'
  showOverlay = true

  thumbnailUrl$ = this.facade.metadata$.pipe(
    map((metadata) => {
      if (metadata?.overviews === undefined) {
        return undefined
      } else {
        return metadata?.overviews?.[0]?.url.toString() ?? null
      }
    })
  )

  fullHeaderHeight$ = combineLatest([this.isMobile$, this.thumbnailUrl$]).pipe(
    map(([isMobile, thumbnailUrl]) =>
      isMobile && thumbnailUrl
        ? HEADER_HEIGHT_MOBILE_THUMBNAIL
        : HEADER_HEIGHT_DEFAULT
    )
  )

  reuseLinkUrl$ = this.facade.allLinks$.pipe(
    map((links) => {
      return links.length ? links[0].url : null
    })
  )

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metadata'] && this.metadata) {
      this.headerService.metadata$.next(this.metadata)
    }
  }

  get resourceDate(): { date: string; tooltip: string; label: string } | null {
    let dateToDisplay = null
    if (this.metadata.resourceUpdated) {
      dateToDisplay = {
        date: this.metadata.resourceUpdated,
        label: 'record.metadata.resourceUpdated',
      }
    } else if (this.metadata.resourcePublished) {
      dateToDisplay = {
        date: this.metadata.resourcePublished,
        label: 'record.metadata.resourcePublished',
      }
    } else if (this.metadata.resourceCreated) {
      dateToDisplay = {
        date: this.metadata.resourceCreated,
        label: 'record.metadata.resourceCreated',
      }
    }
    return dateToDisplay
  }

  back() {
    this.headerService.back()
  }
}
