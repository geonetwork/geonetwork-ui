import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchHeaderComponent } from './search-header.component'
import { BehaviorSubject } from 'rxjs'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { USER_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { SiteApiService } from '@geonetwork-ui/data-access/gn4'

const user = USER_FIXTURE()
class AuthServiceMock {
  user$ = new BehaviorSubject(user)
}

class SiteApiServiceMock {
  getSettingsSet = () => new BehaviorSubject({ 'system/users/identicon': null })
}

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent
  let fixture: ComponentFixture<SearchHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchHeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: SiteApiService, useClass: SiteApiServiceMock },
      ],
    })
      .overrideComponent(SearchHeaderComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(SearchHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
