import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { of } from 'rxjs'
import { DashboardMenuComponent } from './dashboard-menu.component'

describe('DashboardMenuComponent', () => {
  let component: DashboardMenuComponent
  let fixture: ComponentFixture<DashboardMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMenuComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    fixture = TestBed.createComponent(DashboardMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
