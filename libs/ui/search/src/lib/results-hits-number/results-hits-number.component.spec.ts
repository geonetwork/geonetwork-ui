import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { ResultsHitsNumberComponent } from './results-hits-number.component'
import { TranslateTestingModule } from 'ngx-translate-testing'

describe('ResultsHitsNumberComponent', () => {
  let component: ResultsHitsNumberComponent
  let fixture: ComponentFixture<ResultsHitsNumberComponent>
  let de: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsHitsNumberComponent],
      imports: [
        TranslateTestingModule.withTranslations({
          en: {
            'results.records.hits.found':
              '{hits, plural, =0{No documents match the specified search.} one{} other{{hits} records found.}}',
            'results.records.hits.empty.help.html':
              "Suggestions: <ul class='list-disc list-inside'><li>Try other words</li><li>Specify fewer words</li></ul>",
          },
        })
          .withDefaultLanguage('en')
          .withCompiler(new TranslateMessageFormatCompiler()),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsHitsNumberComponent)
    component = fixture.componentInstance
    de = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when loading', () => {
    beforeEach(() => {
      component.loading = true
      fixture.detectChanges()
    })
    it('does not display', () => {
      expect(de.query(By.css('.w-full'))).toBeFalsy()
    })
  })

  describe('when not loading', () => {
    beforeEach(() => {
      component.loading = false
      fixture.detectChanges()
    })
    it('does display', () => {
      expect(de.query(By.css('.w-full'))).toBeTruthy()
    })
    describe('when hits has results', () => {
      beforeEach(() => {
        component.hits = 10
        fixture.detectChanges()
      })
      it('display the hits number', () => {
        const span = de.query(By.css('span'))
        expect(span).toBeTruthy()
        expect(span.nativeElement.innerHTML).toEqual('10 records found.')
        expect(de.query(By.css('p'))).toBeFalsy()
      })
    })
    describe('when hits has 0 results', () => {
      beforeEach(() => {
        component.hits = 0
        fixture.detectChanges()
      })
      it('display that no record has been found', () => {
        const span = de.query(By.css('span'))
        expect(span).toBeTruthy()
        expect(span.nativeElement.innerHTML).toEqual(
          'No documents match the specified search.'
        )
      })
      it('display the help', () => {
        const p = de.query(By.css('p'))
        expect(p).toBeTruthy()
        expect(p.nativeElement.innerHTML).toEqual(
          'Suggestions: <ul class="list-disc list-inside"><li>Try other words</li><li>Specify fewer words</li></ul>'
        )
      })
    })
  })
})
