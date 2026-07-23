import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { provideTranslateTestingService } from '@geonetwork-ui/util/i18n/test-translate-loader'
import { KeywordBadgeComponent } from './keyword-badge.component'

describe('KeywordBadgeComponent', () => {
  let component: KeywordBadgeComponent
  let fixture: ComponentFixture<KeywordBadgeComponent>

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
    fixture = TestBed.createComponent(KeywordBadgeComponent)
    component = fixture.componentInstance
  })

  const badge = () => fixture.debugElement.query(By.css('gn-ui-badge'))

  describe('segments', () => {
    it('returns the hierarchy path when present', () => {
      component.keyword = {
        label: 'foo',
        type: 'theme',
        hierarchyPath: ['Root', 'foo'],
      }
      expect(component.segments).toEqual(['Root', 'foo'])
    })
    it('returns the thesaurus name and label when there is no path', () => {
      component.keyword = {
        label: 'foo',
        type: 'theme',
        thesaurus: { id: '1', name: 'Some thesaurus' },
      }
      expect(component.segments).toEqual(['Some thesaurus', 'foo'])
    })
    it('returns the translated type and label for free keywords', () => {
      component.keyword = { label: 'éolienne', type: 'theme' }
      expect(component.segments).toEqual(['Theme', 'éolienne'])
      component.keyword = { label: 'données ouvertes', type: 'other' }
      expect(component.segments).toEqual(['Keywords', 'données ouvertes'])
    })
  })

  describe('isPlaceWithoutExtent', () => {
    it('is true for a place keyword without bbox', () => {
      component.keyword = { label: 'Paris', type: 'place' }
      expect(component.isPlaceWithoutExtent).toBe(true)
    })
    it('is false for a place keyword with a bbox', () => {
      component.keyword = { label: 'Paris', type: 'place', bbox: [0, 1, 2, 3] }
      expect(component.isPlaceWithoutExtent).toBe(false)
    })
    it('is false for a non-place keyword', () => {
      component.keyword = { label: 'foo', type: 'theme' }
      expect(component.isPlaceWithoutExtent).toBe(false)
    })
  })

  describe('clickable mode', () => {
    beforeEach(() => {
      component.keyword = { label: 'foo', type: 'theme' }
      fixture.detectChanges()
    })
    it('emits keywordClick when the badge is clicked', () => {
      const emitted: unknown[] = []
      component.keywordClick.subscribe((k) => emitted.push(k))
      badge().triggerEventHandler('badgeClicked', undefined)
      expect(emitted).toEqual([component.keyword])
    })
  })

  describe('editable mode', () => {
    beforeEach(() => {
      component.keyword = { label: 'Paris', type: 'place' }
      component.editable = true
      fixture.detectChanges()
    })
    it('emits remove when the badge remove is clicked', () => {
      const emitted: unknown[] = []
      component.keywordRemove.subscribe((k) => emitted.push(k))
      badge().triggerEventHandler('badgeRemoveClicked', undefined)
      expect(emitted).toEqual([component.keyword])
    })
  })
})
