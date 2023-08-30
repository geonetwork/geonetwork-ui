import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { USER_FIXTURE } from '@geonetwork-ui/common/fixtures'
import { LetDirective } from '@ngrx/component'
import { BehaviorSubject } from 'rxjs'
import { SidebarComponent } from './sidebar.component'
import { UserModel } from '@geonetwork-ui/common/domain/user.model'

@Component({
  // eslint-disable-next-line
  selector: 'md-editor-dashboard-menu',
  template: '<div></div>',
})
class DashboardMenuMockComponent {}

@Component({
  // eslint-disable-next-line
  selector: 'gn-ui-user-preview',
  template: '<div></div>',
})
export class UserPreviewComponent {
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
        UserPreviewComponent,
        DashboardMenuMockComponent,
      ],
      imports: [LetDirective],
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
})
