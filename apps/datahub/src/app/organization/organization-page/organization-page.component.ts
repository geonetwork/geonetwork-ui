import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/router'
import { AsyncPipe } from '@angular/common'
import { HeaderOrganizationComponent } from '../header-organization/header-organization.component'
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component'
import { combineLatest, Observable, of, switchMap } from 'rxjs'
import { filter } from 'rxjs/operators'
import { Organization } from '@geonetwork-ui/common/domain/model/record'
import { OrganizationsServiceInterface } from '@geonetwork-ui/common/domain/organizations.service.interface'
import { LetDirective } from '@ngrx/component'

@Component({
  selector: 'datahub-organization-page',
  templateUrl: './organization-page.component.html',
  styleUrls: ['./organization-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderOrganizationComponent,
    OrganizationDetailsComponent,
    LetDirective,
  ],
})
export class OrganizationPageComponent implements OnInit {
  organization$: Observable<Organization>

  constructor(
    private router: RouterFacade,
    private orgService: OrganizationsServiceInterface
  ) {}

  ngOnInit(): void {
    this.organization$ = combineLatest([
      this.router.pathParams$,
      this.orgService.organisations$,
    ]).pipe(
      filter(([pathParams, _]) => Object.keys(pathParams).length > 0),
      switchMap(([pathParams, organizations]) =>
        of(
          organizations.find(
            (organization) => organization.name === pathParams['name']
          )
        )
      )
    )
  }
}
