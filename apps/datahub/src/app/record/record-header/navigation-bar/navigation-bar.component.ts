import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  inject,
} from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { AnchorLinkDirective } from '@geonetwork-ui/ui/layout'
import { getIsMobile } from '@geonetwork-ui/util/shared'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { iconoirMenu } from '@ng-icons/iconoir'
import { matArrowBack } from '@ng-icons/material-icons/baseline'
import { TranslateDirective } from '@ngx-translate/core'
import { RecordActionsComponent } from '../record-actions/record-actions.component'
import { RecordHeaderService } from '../record-header.service'

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
    AnchorLinkDirective,
    RecordActionsComponent,
  ],
  viewProviders: [
    provideIcons({ iconoirMenu, matArrowBack }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class NavigationBarComponent {
  private headerService = inject(RecordHeaderService)

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
  isMobile$ = getIsMobile()

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
    this.headerService.back()
  }
}
