import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'

import { OrganizationHeaderComponent } from '../organization-header/organization-header.component'
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component'
import { combineLatest, Observable, of, switchMap } from 'rxjs'
import { filter, tap } from 'rxjs/operators'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { LetDirective } from '@ngrx/component'
import {
  FeatureSearchModule,
  SearchStateContainerDirective,
} from '@geonetwork-ui/feature/search'
import { TitleService } from '../../router/datahub-title.service'

@Component({
  selector: 'datahub-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    OrganizationHeaderComponent,
    OrganizationDetailsComponent,
    LetDirective,
    FeatureSearchModule,
    SearchStateContainerDirective,
  ],
})
export class OrganizationPageComponent implements OnInit {
  private router = inject(RouterFacade)
  private orgService = inject(OrganizationsServiceInterface)
  private titleService = inject(TitleService)

  organization$: Observable<Organization>

  ngOnInit(): void {
    this.organization$ = combineLatest([
      this.router.pathParams$,
      this.orgService.organisations$,
    ]).pipe(
      filter(([pathParams, _]) => Object.keys(pathParams).length > 0),
      switchMap(([pathParams, organizations]) => {
        const organization = organizations.find(
          (organization) =>
            organization.name.replaceAll('/', '') === pathParams['name']
        )
        return of(organization)
      }),
      tap((organization) => {
        if (organization) {
          this.titleService.setTitle(organization.name)
        }
      })
    )
  }
}
