import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ApplicationBannerComponent } from './application-banner.component'

describe('ApplicationBannerComponent', () => {
  let component: ApplicationBannerComponent
  let fixture: ComponentFixture<ApplicationBannerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationBannerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ApplicationBannerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
