import { CommonModule, Location } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core'
import { Router } from '@angular/router'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import { FavoriteStarComponent } from '@geonetwork-ui/feature/search'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { AnchorLinkDirective } from '@geonetwork-ui/ui/layout'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { getIsMobile } from '@geonetwork-ui/util/shared'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { iconoirMenu } from '@ng-icons/iconoir'
import { matArrowBack, matEdit } from '@ng-icons/material-icons/baseline'
import { TranslateDirective } from '@ngx-translate/core'
import { RecordsRepositoryInterface } from '@geonetwork-ui/common/domain/repository/records-repository.interface'
import { Observable, of } from 'rxjs'

marker('record.metadata.about')
marker('record.metadata.capabilities')
marker('record.metadata.preview')
marker('record.metadata.ressources.and.links')
marker('record.metadata.linked.records')
marker('record.metadata.userFeedbacks')

@Component({
  selector: 'datahub-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIcon,
    CommonModule,
    TranslateDirective,
    ButtonComponent,
    LanguageSwitcherComponent,
    FavoriteStarComponent,
    AnchorLinkDirective,
  ],
  viewProviders: [
    provideIcons({ iconoirMenu, matArrowBack, matEdit }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class NavigationBarComponent implements OnChanges {
  private router = inject(Router)
  private location = inject(Location)
  private platformServiceInterface = inject(PlatformServiceInterface)
  private recordsRepositoryInterface = inject(RecordsRepositoryInterface)

  @Input() metadata: DatasetRecord
  @ViewChild('navBar', { static: false }) mobileMenuRef: ElementRef

  canEdit$: Observable<boolean> = of(false)
  editUrl: string

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metadata'] && this.metadata) {
      this.canEdit$ = this.recordsRepositoryInterface.canEditIndexedRecord(
        this.metadata
      )
      this.editUrl = this.editUrlTemplate.replace(
        '${record_id}',
        this.metadata.uniqueIdentifier
      )
    }
  }

  displayMobileMenu = false
  anchorLinks = [
    {
      anchor: 'about',
      label: 'record.metadata.about',
    },
    {
      anchor: 'capabilities',
      label: 'record.metadata.capabilities',
    },
    {
      anchor: 'data-preview',
      label: 'record.metadata.preview',
    },
    {
      anchor: 'resources',
      label: 'record.metadata.ressources.and.links',
    },
    {
      anchor: 'feature-catalog',
      label: 'record.metadata.feature.catalog',
    },
    {
      anchor: 'linked-records',
      label: 'record.metadata.linked.records',
    },
    {
      anchor: 'user-feedbacks',
      label: 'record.metadata.userFeedbacks',
    },
  ]
  showLanguageSwitcher = getGlobalConfig().LANGUAGES?.length > 0
  editUrlTemplate = getGlobalConfig().EDIT_URL_TEMPLATE

  openEditUrl() {
    window.open(this.editUrl, '_blank')
  }

  isMobile$ = getIsMobile()

  get isAuthDisabled(): boolean {
    return !this.platformServiceInterface.supportsAuthentication()
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.displayMobileMenu = false
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (
      this.displayMobileMenu &&
      this.mobileMenuRef &&
      !this.mobileMenuRef.nativeElement.contains(event.target)
    ) {
      this.displayMobileMenu = false
    }
  }
  toggleMobileMenu() {
    this.displayMobileMenu = !this.displayMobileMenu
  }
  back() {
    this.router.lastSuccessfulNavigation.previousNavigation
      ? this.location.back()
      : this.router.navigateByUrl('/search')
  }
}
