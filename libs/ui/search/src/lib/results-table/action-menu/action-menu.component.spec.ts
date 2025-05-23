import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActionMenuComponent } from './action-menu.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('ActionMenuComponent', () => {
  let component: ActionMenuComponent
  let fixture: ComponentFixture<ActionMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(ActionMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
