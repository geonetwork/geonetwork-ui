import { ComponentFixture, TestBed } from '@angular/core/testing'
import { OnlineServiceResourceInputComponent } from './online-service-resource-input.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('OnlineServiceResourceInputComponent', () => {
  let component: OnlineServiceResourceInputComponent
  let fixture: ComponentFixture<OnlineServiceResourceInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(OnlineServiceResourceInputComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
