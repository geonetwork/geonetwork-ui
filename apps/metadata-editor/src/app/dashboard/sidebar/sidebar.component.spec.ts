import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SidebarComponent } from './sidebar.component'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { Component } from '@angular/core'
import { LetModule } from '@ngrx/component'

class AuthServiceMock {}

@Component({
  selector: 'md-editor-dashboard-menu',
  template: '<div></div>',
})
class DashboardMenuMockComponent {}

describe('SidebarComponent', () => {
  let component: SidebarComponent
  let fixture: ComponentFixture<SidebarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent, DashboardMenuMockComponent],
      imports: [LetModule],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SidebarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
