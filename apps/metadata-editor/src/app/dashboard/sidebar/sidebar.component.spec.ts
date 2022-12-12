import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { UserModel } from '@geonetwork-ui/util/shared'
import { USER_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { LetModule } from '@ngrx/component'
import { BehaviorSubject } from 'rxjs'

import { SidebarComponent } from './sidebar.component'

@Component({
  selector: 'md-editor-dashboard-menu',
  template: '<div></div>',
})
class DashboardMenuMockComponent {}

@Component({
  selector: 'gn-ui-user-preview',
  template: '<div></div>',
})
export class UserPreviewComponentMock {
  @Input() user: UserModel
}

const user = USER_FIXTURE()
class AuthServiceMock {
  user$ = new BehaviorSubject(user)
}

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        UserPreviewComponentMock,
        DashboardMenuMockComponent,
      ],
      imports: [LetModule],
      providers: [{ provide: AuthService, useClass: AuthServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(SidebarComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents()

    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  describe('when a user is logged', () => {
    it('displays the user preview', () => {
      const avatar = fixture.debugElement.query(
        By.directive(UserPreviewComponentMock)
      )
      expect(avatar.componentInstance.user).toBe(user)
    })
  })
})
