import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WizardSummarizeComponent } from './wizard-summarize.component'
import { TranslateModule } from '@ngx-translate/core'
import { UiModule } from '@lib/ui'
import { BrowserModule, By } from '@angular/platform-browser'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { WizardService } from '../../services/wizard.service'

const wizardServiceMock = {
  getWizardFieldData: jest.fn((id) => {
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
        return String(new Date().getTime())
      }
      case 'dropdown': {
        return JSON.stringify('10000')
      }
      case 'description': {
        return 'description'
      }
    }
  }),
}

describe('WizardSummarizeComponent', () => {
  let component: WizardSummarizeComponent
  let fixture: ComponentFixture<WizardSummarizeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WizardSummarizeComponent],
      imports: [
        TranslateModule.forRoot(),
        UiModule,
        BrowserModule,
        HttpClientTestingModule,
      ],
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
      window.localStorage.getItem('title').toUpperCase().trim()
    )
  })

  it('should display abstract', () => {
    const abstract = fixture.debugElement.query(By.css('.abstract'))
      .nativeElement.textContent

    expect(abstract.trim()).toEqual(
      window.localStorage.getItem('abstract').trim()
    )
  })

  it('should display date', () => {
    const date = fixture.debugElement.query(By.css('.date')).nativeElement
      .textContent

    const time = window.localStorage.getItem('datepicker')

    expect(date).toEqual(
      new Date(Number(time)).toLocaleDateString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    )
  })

  it('should display scale', () => {
    const scale = fixture.debugElement.query(By.css('.scale')).nativeElement
      .textContent

    expect(scale.trim()).toEqual(
      `1:${JSON.parse(window.localStorage.getItem('dropdown'))}`
    )
  })

  it('should display description', () => {
    const description = fixture.debugElement.query(By.css('.description'))
      .nativeElement.textContent

    expect(description.trim()).toEqual(
      window.localStorage.getItem('description').trim()
    )
  })

  it('should display tags', () => {
    const tags = fixture.debugElement.query(By.css('.tags')).nativeElement
      .textContent

    const expectedTags = JSON.parse(window.localStorage.getItem('tags'))
      .map((t) => t.display)
      .join(' - ')

    expect(tags.trim()).toEqual(expectedTags.trim())
  })
})
