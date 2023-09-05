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
import { BehaviorSubject, of } from 'rxjs'
import { SidebarComponent } from './sidebar.component'
import { UserModel } from '@geonetwork-ui/common/domain/user.model'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

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

const translateServiceMock = {
  currentLang: 'fr',
}

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
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
