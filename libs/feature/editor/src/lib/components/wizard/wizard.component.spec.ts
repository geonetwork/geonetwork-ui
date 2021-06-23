import { ComponentFixture, TestBed } from '@angular/core/testing'

import { WizardComponent } from './wizard.component'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

describe('WizardComponent', () => {
  let component: WizardComponent
  let fixture: ComponentFixture<WizardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WizardComponent],
      imports: [
        TranslateModule.forRoot(),
        UiInputsModule,
        BrowserModule,
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardComponent)
    component = fixture.componentInstance
    component.initialConfig = {
      configuration: [],
      storageKey: 'datafeeder-storage',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
