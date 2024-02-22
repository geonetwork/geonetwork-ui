import { ComponentFixture, TestBed } from '@angular/core/testing'
import { DashboardPageComponent } from './dashboard-page.component'
import { CommonModule } from '@angular/common'

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent
  let fixture: ComponentFixture<DashboardPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({})
      .overrideComponent(DashboardPageComponent, {
        set: {
          imports: [CommonModule],
          providers: [],
        },
      })
      .compileComponents()

    fixture = TestBed.createComponent(DashboardPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
