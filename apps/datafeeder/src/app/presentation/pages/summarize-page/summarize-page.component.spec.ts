import { NO_ERRORS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { WizardService } from '@lib/editor'
import { SummarizePageComponent } from './summarize-page.component'

const wizardServiceMock = {
  getConfigurationStepNumber: jest.fn(() => 6),
}

describe('SummarizePageComponent', () => {
  let component: SummarizePageComponent
  let fixture: ComponentFixture<SummarizePageComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummarizePageComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: WizardService,
          useValue: wizardServiceMock,
        },
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
