import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GenericKeywordsComponent } from './generic-keywords.component'
import { of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { MockBuilder, MockProvider } from 'ng-mocks'

describe('GenericKeywordsComponent', () => {
  let component: GenericKeywordsComponent
  let fixture: ComponentFixture<GenericKeywordsComponent>
  let platformService: PlatformServiceInterface

  beforeEach(() => {
    return MockBuilder(GenericKeywordsComponent)
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(PlatformServiceInterface, {
          searchKeywords: jest.fn(() =>
            of([
              {
                label: 'Address',
                thesaurus: { id: '1' },
                type: 'theme',
              } as Keyword,
            ])
          ),
        }),
      ],
    })
    fixture = TestBed.createComponent(GenericKeywordsComponent)
    platformService = TestBed.inject(PlatformServiceInterface)
    component = fixture.componentInstance
    component.keywords = []
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display the keyword with the thesaurus name', () => {
    const item = {
      title: 'Address',
      value: { thesaurus: { name: 'Address-Thesaurus' } },
    } as any
    expect(component.displayWithFn(item)).toBe('Address (Address-Thesaurus)')
  })

  it('should search keywords', () => {
    component.keywordTypes = ['theme', 'temporal']
    component.autoCompleteAction('Address')

    expect(platformService.searchKeywords).toHaveBeenCalledWith('Address', [
      'theme',
      'temporal',
    ])
  })

  describe('keyword change', () => {
    let emittedKeywords
    let emittedAddedKeyword
    let emittedDeletedKeyword
    beforeEach(() => {
      emittedKeywords = null
      emittedAddedKeyword = null
      emittedDeletedKeyword = null
      component.changedKeywords.subscribe((v) => (emittedKeywords = v))
      component.addedKeyword.subscribe((v) => (emittedAddedKeyword = v))
      component.deletedKeyword.subscribe((v) => (emittedDeletedKeyword = v))
    })
    it('should add keyword', () => {
      const keyword = {
        label: 'Address',
        thesaurus: { id: '1' },
        type: 'theme' as KeywordType,
      }
      component.addKeyword(keyword)

      expect(component.keywords).toEqual([keyword])
      expect(emittedKeywords).toEqual([keyword])
      expect(emittedAddedKeyword).toEqual(keyword)
      expect(emittedDeletedKeyword).toEqual(null)
    })

    it('should not add duplicated keyword if it is a duplicate', () => {
      const keyword = {
        label: 'Address',
        thesaurus: { id: '1' },
        type: 'theme' as KeywordType,
      }
      component.keywords = [keyword]
      component.addKeyword(keyword)

      expect(component.keywords).toEqual([keyword])
      expect(component.keywords.length).toEqual(1)
      expect(emittedKeywords).toEqual(null)
      expect(emittedAddedKeyword).toEqual(null)
      expect(emittedDeletedKeyword).toEqual(null)
    })

    it('should remove keyword', () => {
      const keyword = {
        label: 'Address',
        thesaurus: { id: '1' },
        type: 'theme' as KeywordType,
      }
      component.keywords = [keyword]
      component.removeKeyword(keyword)

      expect(component.keywords).toEqual([])
      expect(emittedKeywords).toEqual([])
      expect(emittedAddedKeyword).toEqual(null)
      expect(emittedDeletedKeyword).toEqual(keyword)
    })
  })

  describe('isPlaceWithoutExtent', () => {
    it('should return true if keyword is a place and does not have a bbox', () => {
      const keyword: Keyword = {
        label: 'Address',
        thesaurus: { id: '1' },
        type: 'place',
      }
      expect(component.isPlaceWithoutExtent(keyword)).toBeTruthy()
    })
    it('should return false if keyword is not a place', () => {
      const keyword: Keyword = {
        label: 'Address',
        thesaurus: { id: '1' },
        type: 'theme',
      }
      expect(component.isPlaceWithoutExtent(keyword)).toBeFalsy()
    })
    it('should return false if keyword is a place and has a bbox', () => {
      const keyword: Keyword = {
        label: 'Address',
        thesaurus: { id: '1' },
        type: 'place',
        bbox: [1, 2, 3, 4],
      }
      expect(component.isPlaceWithoutExtent(keyword)).toBeFalsy()
    })
  })
})
