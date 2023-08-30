import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SearchHeaderComponent } from './search-header.component'
import { BehaviorSubject } from 'rxjs'
import {
  AuthService,
  AvatarServiceInterface,
} from '@geonetwork-ui/feature/auth'
import { USER_FIXTURE } from '@geonetwork-ui/common/fixtures'

const user = USER_FIXTURE()
class AuthServiceMock {
  user$ = new BehaviorSubject(user)
}

class AvatarServiceInterfaceMock {
  placeholder = 'http://placeholder.com'
  getProfileIcon = (hash: string) => `${hash}`
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
        {
          provide: AvatarServiceInterface,
          useClass: AvatarServiceInterfaceMock,
        },
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
