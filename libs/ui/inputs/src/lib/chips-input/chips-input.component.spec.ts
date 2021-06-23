import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TranslateService } from '@ngx-translate/core'

import { ChipsInputComponent } from './chips-input.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'

const translateServiceMock = {
  currentLang: 'en',
}

describe('ChipsInputComponent', () => {
  let component: ChipsInputComponent
  let fixture: ComponentFixture<ChipsInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipsInputComponent],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
