import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideTranslateTestingService } from '@geonetwork-ui/util/i18n/test-translate-loader'
import { KeywordTooltipComponent } from './keyword-tooltip.component'

describe('KeywordTooltipComponent', () => {
  let component: KeywordTooltipComponent
  let fixture: ComponentFixture<KeywordTooltipComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideTranslateTestingService({
          en: {
            'domain.record.keywordType.theme': 'Theme',
            'domain.record.keywordType.other': 'Keywords',
          },
        }),
      ],
    })
    fixture = TestBed.createComponent(KeywordTooltipComponent)
    component = fixture.componentInstance
  })

  it('returns the hierarchy path when the keyword has one', () => {
    component.keyword = {
      label: 'foo',
      type: 'theme',
      hierarchyPath: ['Root', 'foo'],
    }
    expect(component.segments).toEqual(['Root', 'foo'])
  })

  it('returns the thesaurus name and the label when there is no hierarchy path', () => {
    component.keyword = {
      label: 'foo',
      type: 'theme',
      thesaurus: { id: '1', name: 'Some thesaurus' },
    }
    expect(component.segments).toEqual(['Some thesaurus', 'foo'])
  })

  it('returns the translated type label and the label for a free keyword', () => {
    component.keyword = { label: 'éolienne', type: 'theme' }
    expect(component.segments).toEqual(['Theme', 'éolienne'])
    component.keyword = { label: 'données ouvertes', type: 'other' }
    expect(component.segments).toEqual(['Keywords', 'données ouvertes'])
  })

  it('renders the segments separated by ">", last one bold', () => {
    component.keyword = {
      label: 'foo',
      type: 'theme',
      hierarchyPath: ['Root', 'Sub', 'foo'],
    }
    fixture.detectChanges()
    const text = fixture.nativeElement.textContent.replace(/\s+/g, ' ').trim()
    expect(text).toBe('Root > Sub > foo')
    const boldSpans = fixture.nativeElement.querySelectorAll('span.font-bold')
    expect(boldSpans.length).toBe(1)
    expect(boldSpans[0].textContent).toBe('foo')
  })
})
