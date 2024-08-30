import { ComponentFixture, TestBed } from '@angular/core/testing'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { RecordsCountComponent } from './records-count.component'
import { By } from '@angular/platform-browser'
import { BehaviorSubject } from 'rxjs'
import { SearchFacade } from '@geonetwork-ui/feature/search'
import { SelectionService } from '@geonetwork-ui/api/repository'
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler'
import { TranslateTestingModule } from 'ngx-translate-testing'

class SearchFacadeMock {
  results$ = new BehaviorSubject(datasetRecordsFixture())
  resultsHits$ = new BehaviorSubject(1000)
}
class SelectionServiceMock {
  selectedRecordsIdentifiers$ = new BehaviorSubject([])
}

describe('RecordsCountComponent', () => {
  let component: RecordsCountComponent
  let selectionService: SelectionServiceMock
  let fixture: ComponentFixture<RecordsCountComponent>

  beforeEach(() => {
    const testingModule = TranslateTestingModule.withTranslations({
      en: {
        'results.records.hits.displayedOn':
          '{displayed, plural, =0{No record.} one{1 record} other{{displayed} records}} {hits, plural, other{displayed on {hits} total.}}',
        'results.records.hits.selected': '{ amount } selected',
      },
    })
      .withDefaultLanguage('en')
      .withCompiler(new TranslateMessageFormatCompiler())
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchFacade,
          useClass: SearchFacadeMock,
        },
        {
          provide: SelectionService,
          useClass: SelectionServiceMock,
        },
      ],
    }).overrideComponent(RecordsCountComponent, {
      add: {
        providers: [...testingModule.providers],
      },
    })

    fixture = TestBed.createComponent(RecordsCountComponent)
    selectionService = TestBed.inject(SelectionService) as any
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('records count', () => {
    it('shows both visible and total counts', () => {
      const el = fixture.debugElement.query(
        By.css('[data-test=records-count]')
      ).nativeElement
      expect(el.textContent).toContain('2 records displayed on 1000 total.')
    })
  })

  describe('selected count', () => {
    describe('if none selected', () => {
      it('does not show anything', () => {
        const el = fixture.debugElement.query(
          By.css('[data-test=selected-count]')
        )
        expect(el).toBeFalsy()
      })
    })
    describe('if some selected', () => {
      beforeEach(() => {
        selectionService.selectedRecordsIdentifiers$.next(['1', '2'])
        fixture.detectChanges()
      })
      it('shows the count', () => {
        const el = fixture.debugElement.query(
          By.css('[data-test=selected-count]')
        ).nativeElement
        expect(el.textContent).toContain('2 selected')
      })
    })
  })
})
