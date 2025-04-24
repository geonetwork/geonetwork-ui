import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MultilingualPanelComponent } from './multilingual-panel.component'
import { TranslateModule } from '@ngx-translate/core'

describe('MultilingualPanelComponent', () => {
  let component: MultilingualPanelComponent
  let fixture: ComponentFixture<MultilingualPanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultilingualPanelComponent, TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(MultilingualPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
