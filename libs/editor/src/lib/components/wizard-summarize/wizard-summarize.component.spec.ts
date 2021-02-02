import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WizardSummarizeComponent } from './wizard-summarize.component'
import { TranslateModule } from '@ngx-translate/core'
import { UiModule } from '@lib/ui'
import { BrowserModule, By } from '@angular/platform-browser'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { WizardService } from '../../services/wizard.service'

const localStorageMock = () => {
  let storage = {}
  return {
    getItem: (key) => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: (key) => delete storage[key],
    clear: () => (storage = {}),
  }
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
      providers: [WizardService],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardSummarizeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock() })

    window.localStorage.setItem('title', 'title')
    window.localStorage.setItem('abstract', 'abstract')
    window.localStorage.setItem(
      'tags',
      JSON.stringify([
        {
          display: 'tagName1',
          value: 'tagName1',
        },
        {
          display: 'tagName2',
          value: 'tagName2',
        },
      ])
    )
    window.localStorage.setItem('datepicker', String(new Date().getTime()))
    window.localStorage.setItem('dropdown', JSON.stringify('10000'))
    window.localStorage.setItem('description', 'description')
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
