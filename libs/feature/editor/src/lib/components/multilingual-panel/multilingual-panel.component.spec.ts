import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MultilingualPanelComponent } from './multilingual-panel.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('MultilingualPanelComponent', () => {
  let component: MultilingualPanelComponent
  let fixture: ComponentFixture<MultilingualPanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(MultilingualPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
