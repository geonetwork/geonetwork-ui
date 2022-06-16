import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LayersPanelComponent } from './layers-panel.component'
import { UtilI18nModule } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { MatIconModule } from '@angular/material/icon'

describe('LayersPanelComponent', () => {
  let component: LayersPanelComponent
  let fixture: ComponentFixture<LayersPanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilI18nModule, TranslateModule.forRoot(), MatIconModule],
      declarations: [LayersPanelComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
