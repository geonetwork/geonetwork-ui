import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { DashboardMenuComponent } from '../dashboard-menu/dashboard-menu.component'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  AuthService,
  AvatarServiceInterface,
} from '@geonetwork-ui/api/repository'
import { UserPreviewComponent } from '@geonetwork-ui/ui/elements'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { combineLatest, Observable } from 'rxjs'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import { RouterLink } from '@angular/router'
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core'
import { iconoirSystemShut } from '@ng-icons/iconoir'
import { FeatureSearchModule } from '@geonetwork-ui/feature/search'

@Component({
  selector: 'md-editor-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DashboardMenuComponent,
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    ButtonComponent,
    RouterLink,
    NgIcon,
    FeatureSearchModule,
    UserPreviewComponent,
  ],
  providers: [
    provideIcons({
      iconoirSystemShut,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class SidebarComponent implements OnInit {
  platformService = inject(PlatformServiceInterface)
  private avatarService = inject(AvatarServiceInterface)
  organisationsService = inject(OrganizationsServiceInterface)
  private authService = inject(AuthService)

  public placeholder$ = this.avatarService.getPlaceholder()
  organisations$: Observable<Organization[]>

  get settingsUrl() {
    return this.authService.settingsUrl
  }

  ngOnInit(): void {
    this.organisations$ = combineLatest(
      this.organisationsService.organisations$,
      this.platformService.getMe(),
      (orgs, me) => orgs.filter((org) => org.name === me?.organisation)
    )
  }

  logOut() {
    const current_url = window.origin.toString()
    fetch(this.authService.logoutUrl, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = current_url
        } else {
          console.error('Logout failed')
        }
      })
      .catch((error) => {
        console.error('Error during logout request:', error)
      })
  }
}
