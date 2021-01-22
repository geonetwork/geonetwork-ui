import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WizardComponent } from './wizard.component'
import { TranslateModule } from '@ngx-translate/core'
import { UiModule } from '@lib/ui'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('WizardComponent', () => {
  let component: WizardComponent
  let fixture: ComponentFixture<WizardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardComponent],
      imports: [
        TranslateModule.forRoot(),
        UiModule,
        BrowserModule,
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
