import { ComponentFixture, TestBed } from '@angular/core/testing'
import { WizardSummarizeComponent } from './wizard-summarize.component'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserModule, By } from '@angular/platform-browser'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { WizardService } from '../../services/wizard.service'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { DateService } from '@geonetwork-ui/util/shared'

const TIME = new Date('2025-01-01T00:00:00Z').getTime()

const wizardServiceMock = {
  getWizardFieldData: jest.fn((id: string) => {
    switch (id) {
      case 'title': {
        return 'title'
      }
      case 'abstract': {
        return 'abstract'
      }
      case 'tags': {
        return JSON.stringify([
          {
            display: 'tagName1',
            value: 'tagName1',
          },
          {
            display: 'tagName2',
            value: 'tagName2',
          },
        ])
      }
      case 'datepicker': {
        return String(TIME)
      }
      case 'dropdown': {
        return JSON.stringify('10000')
      }
      case 'description': {
        return 'description'
      }
      default:
        return 'unknown'
    }
  }),
}

const dateServiceStub = {
  formatDate: jest.fn(
    (date: Date, options?: Intl.DateTimeFormatOptions): string => {
      // For testing, we force the locale to 'en'
      return date.toLocaleDateString('en', options)
    }
  ),
  formatDateTime: jest.fn(),
}

describe('WizardSummarizeComponent', () => {
  let component: WizardSummarizeComponent
  let fixture: ComponentFixture<WizardSummarizeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WizardSummarizeComponent],
      imports: [
        TranslateModule.forRoot(),
        UiInputsModule,
        BrowserModule,
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: WizardService,
          useValue: wizardServiceMock,
        },
        {
          provide: DateService,
          useValue: dateServiceStub,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardSummarizeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display title', () => {
    const title = fixture.debugElement.query(By.css('.title')).nativeElement
      .textContent
    expect(title.trim()).toEqual(
      wizardServiceMock.getWizardFieldData('title').toUpperCase().trim()
    )
  })

  it('should display abstract', () => {
    const abstract = fixture.debugElement.query(By.css('.abstract'))
      .nativeElement.textContent
    expect(abstract.trim()).toEqual(
      wizardServiceMock.getWizardFieldData('abstract').trim()
    )
  })

  it('should display date using DateService', () => {
    const dateEl = fixture.debugElement.query(By.css('.date')).nativeElement
      .textContent
    const expectedDate = 'January 1, 2025'
    expect(dateEl.trim()).toEqual(expectedDate)
  })

  it('should display scale', () => {
    const scale = fixture.debugElement.query(By.css('.scale')).nativeElement
      .textContent
    expect(scale.trim()).toEqual(
      `1:${JSON.parse(wizardServiceMock.getWizardFieldData('dropdown'))}`
    )
  })

  it('should display description', () => {
    const description = fixture.debugElement.query(By.css('.description'))
      .nativeElement.textContent
    expect(description.trim()).toEqual(
      wizardServiceMock.getWizardFieldData('description').trim()
    )
  })

  it('should display tags', () => {
    const tags = fixture.debugElement.query(By.css('.tags')).nativeElement
      .textContent
    const expectedTags = JSON.parse(
      wizardServiceMock.getWizardFieldData('tags')
    )
      .map((t) => t.display)
      .join(' - ')
    expect(tags.trim()).toEqual(expectedTags.trim())
  })
})
