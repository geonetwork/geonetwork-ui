import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import {
  FavoriteStarComponent,
  SearchService,
} from '@geonetwork-ui/feature/search'
import { LanguageSwitcherComponent } from '@geonetwork-ui/ui/catalog'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { getGlobalConfig } from '@geonetwork-ui/util/app-config'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { iconoirMenu } from '@ng-icons/iconoir'
import { matArrowBack } from '@ng-icons/material-icons/baseline'
import { TranslateDirective } from '@ngx-translate/core'
import { AnchorLinkDirective } from '@geonetwork-ui/ui/layout'
import { HostListener } from '@angular/core'
import { ElementRef, ViewChild } from '@angular/core'

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
  viewProviders: [provideIcons({ iconoirMenu, matArrowBack })],
})
export class NavigationBarComponent {
  @Input() metadata: DatasetRecord
  @ViewChild('navBar', { static: false }) mobileMenuRef: ElementRef
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

  constructor(private searchService: SearchService) {}

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
    this.searchService.updateFilters({})
  }
}
