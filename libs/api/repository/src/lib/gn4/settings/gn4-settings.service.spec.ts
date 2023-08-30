import { TestBed } from '@angular/core/testing'

import { Gn4SettingsService } from './gn4-settings.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('Gn4SettingsService', () => {
  let service: Gn4SettingsService

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
    service = TestBed.inject(Gn4SettingsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
