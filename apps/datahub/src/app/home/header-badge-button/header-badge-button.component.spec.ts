import { ComponentFixture, TestBed } from '@angular/core/testing'
import { HeaderBadgeButtonComponent } from './header-badge-button.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('HeaderBadgeButtonComponent', () => {
  let component: HeaderBadgeButtonComponent
  let fixture: ComponentFixture<HeaderBadgeButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBadgeButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
