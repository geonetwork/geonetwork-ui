import { TestBed } from '@angular/core/testing'

import { WizardService } from './wizard.service'
import { TranslateModule } from '@ngx-translate/core'
import { UiModule } from '@lib/ui'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'

describe('WizardService', () => {
  let service: WizardService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        UiModule,
        BrowserModule,
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    service = TestBed.inject(WizardService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
