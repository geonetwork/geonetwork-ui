import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MetadataQualityPanelComponent } from './metadata-quality-panel.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

describe('MetadataQualityPanelComponent', () => {
  let component: MetadataQualityPanelComponent
  let fixture: ComponentFixture<MetadataQualityPanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadataQualityPanelComponent],
      providers: [provideI18n()],
    }).compileComponents()

    fixture = TestBed.createComponent(MetadataQualityPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
