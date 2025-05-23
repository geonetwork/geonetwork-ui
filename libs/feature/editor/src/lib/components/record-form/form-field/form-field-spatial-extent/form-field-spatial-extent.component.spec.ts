import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent.component'
import { BehaviorSubject, from, of } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  CatalogRecord,
  Keyword,
} from '@geonetwork-ui/common/domain/model/record'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { EditorFacade } from '../../../../+state/editor.facade'
import {
  datasetRecordsFixture,
  NATIONAL_KEYWORD,
  SAMPLE_PLACE_KEYWORDS,
  SAMPLE_PLACE_KEYWORDS_FROM_XML,
  SAMPLE_RECORD,
  SAMPLE_SPATIAL_EXTENTS,
} from '@geonetwork-ui/common/fixtures'
import { provideTranslateService } from '@ngx-translate/core'

class PlatformServiceInterfaceMock {
  // this simulates a search of a complete keyword with bbox, key...
  // only thesaurus 1 is known
  searchKeywordsInThesaurus = jest.fn((label, thesaurusId) => {
    if (thesaurusId !== '1') return of([])
    const found = SAMPLE_PLACE_KEYWORDS.find((k) => k.label === label)
    return found ? of([found]) : of([])
  })
}

describe('FormFieldSpatialExtentComponent', () => {
  let component: FormFieldSpatialExtentComponent
  let fixture: ComponentFixture<FormFieldSpatialExtentComponent>
  let editorFacade: EditorFacade

  beforeEach(() => {
    return MockBuilder(FormFieldSpatialExtentComponent)
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        MockProvider(
          PlatformServiceInterface,
          PlatformServiceInterfaceMock,
          'useClass'
        ),
        MockProvider(EditorFacade, {
          record$: new BehaviorSubject(SAMPLE_RECORD),
          updateRecordField: jest.fn(),
        }),
      ],
    })

    editorFacade = TestBed.inject(EditorFacade)
    fixture = TestBed.createComponent(FormFieldSpatialExtentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('spatialExtents$', () => {
    let extents
    beforeEach(() => {
      component.spatialExtents$.subscribe((v) => (extents = v))
    })
    it('emits the extents of the current record', () => {
      expect(extents).toEqual(SAMPLE_SPATIAL_EXTENTS)
    })
  })

  describe('shownKeywords$', () => {
    let shownKeywords
    beforeEach(() => {
      component.shownKeywords$.subscribe((v) => (shownKeywords = v))
    })
    it('emits the keywords of the current record, along with unnamed keywords for extents', () => {
      expect(shownKeywords).toEqual([
        // these keywords were successfully linked to spatial extents
        {
          ...SAMPLE_PLACE_KEYWORDS[0],
          _linkedExtent: SAMPLE_SPATIAL_EXTENTS[0],
        },
        {
          ...SAMPLE_PLACE_KEYWORDS[1],
          _linkedExtent: SAMPLE_SPATIAL_EXTENTS[1],
        },
        // these keywords are not linked to spatial extents
        SAMPLE_PLACE_KEYWORDS[2],
        SAMPLE_PLACE_KEYWORDS[3],
        SAMPLE_PLACE_KEYWORDS[4],
        // these keywords were generated from spatial extents and should not be persisted in the record
        {
          _doNotSave: true,
          _linkedExtent: SAMPLE_SPATIAL_EXTENTS[2],
          bbox: [11.5, 48.5, 11.5, 48.3],
          label: 'editor.record.placeKeywordWithoutLabel',
          type: 'place',
        },
        {
          _doNotSave: true,
          _linkedExtent: SAMPLE_SPATIAL_EXTENTS[3],
          bbox: [1, 2, 3, 4],
          label: 'editor.record.placeKeywordWithoutLabel',
          type: 'place',
        },
        {
          _doNotSave: true,
          _linkedExtent: SAMPLE_SPATIAL_EXTENTS[4],
          bbox: [5, 6, 7, 8],
          label: 'editor.record.placeKeywordWithoutLabel',
          type: 'place',
        },
      ])
    })
    it('calls the API only once per keyword on multiple subscriptions', () => {
      component.shownKeywords$.subscribe()
      component.shownKeywords$.subscribe()
      component.shownKeywords$.subscribe()
      const platformService = TestBed.inject(PlatformServiceInterface)
      expect(platformService.searchKeywordsInThesaurus).toHaveBeenCalledTimes(
        SAMPLE_PLACE_KEYWORDS.filter((k) => !!k.thesaurus).length
      )
    })
  })

  describe('handleKeywordDelete', () => {
    describe('keyword with an extent attached', () => {
      beforeEach(async () => {
        await component.handleKeywordDelete(SAMPLE_PLACE_KEYWORDS[0])
      })
      it('deletes both the keyword and the extent', () => {
        const newPlaceKeywords = SAMPLE_PLACE_KEYWORDS_FROM_XML.slice(1)
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'keywords',
          [...datasetRecordsFixture()[0].keywords, ...newPlaceKeywords]
        )
        const newExtents = SAMPLE_SPATIAL_EXTENTS.slice(1)
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'spatialExtents',
          newExtents
        )
      })
    })
    describe('keyword with no extent attached', () => {
      beforeEach(async () => {
        await component.handleKeywordDelete(SAMPLE_PLACE_KEYWORDS[2])
      })
      it('deletes only the keyword, do not change the record extents', () => {
        const newPlaceKeywords = SAMPLE_PLACE_KEYWORDS_FROM_XML.slice(0)
        newPlaceKeywords.splice(2, 1)
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'keywords',
          [...datasetRecordsFixture()[0].keywords, ...newPlaceKeywords]
        )
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'spatialExtents',
          SAMPLE_SPATIAL_EXTENTS
        )
      })
    })
    describe('keyword that was generated from an extent', () => {
      beforeEach(async () => {
        await component.handleKeywordDelete({
          _linkedExtent: SAMPLE_SPATIAL_EXTENTS[3],
          bbox: [1, 2, 3, 4],
          label: 'editor.record.placeKeywordWithoutLabel',
          type: 'place',
        } as any)
      })
      it('deletes only the extent, do not change the record keywords', () => {
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'keywords',
          [
            ...datasetRecordsFixture()[0].keywords,
            ...SAMPLE_PLACE_KEYWORDS_FROM_XML,
          ]
        )
        const newExtents = SAMPLE_SPATIAL_EXTENTS.slice(0)
        newExtents.splice(3, 1)
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'spatialExtents',
          newExtents
        )
      })
    })
  })

  describe('handleKeywordAdd', () => {
    describe('keyword with a bbox', () => {
      const newKeyword: Keyword = {
        key: 'uri-5',
        label: 'Oceania',
        thesaurus: {
          id: '2',
          name: 'otherPlaces',
        },
        type: 'place',
        bbox: [10, 20, 30, 40],
      }
      beforeEach(async () => {
        await component.handleKeywordAdd(newKeyword)
      })
      it('adds both the keyword and a new extent with the bbox', () => {
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'keywords',
          [
            ...datasetRecordsFixture()[0].keywords,
            ...SAMPLE_PLACE_KEYWORDS_FROM_XML,
            {
              label: newKeyword.label,
              type: newKeyword.type,
              thesaurus: newKeyword.thesaurus,
            },
          ]
        )
        const newExtent = {
          description: 'uri-5',
          bbox: [10, 20, 30, 40],
        }
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'spatialExtents',
          [...SAMPLE_SPATIAL_EXTENTS, newExtent]
        )
      })
    })
    describe('keyword that was not found locally', () => {
      const newKeyword: Keyword = {
        label: 'Anctartica',
        thesaurus: {
          id: '2',
          name: 'otherPlaces',
        },
        type: 'place',
      }
      beforeEach(async () => {
        await component.handleKeywordAdd(newKeyword)
      })
      it('adds only the keyword, do not change the record extents', () => {
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'keywords',
          [
            ...datasetRecordsFixture()[0].keywords,
            ...SAMPLE_PLACE_KEYWORDS_FROM_XML,
            {
              label: newKeyword.label,
              type: newKeyword.type,
              thesaurus: newKeyword.thesaurus,
            },
          ]
        )
        expect(editorFacade.updateRecordField).toHaveBeenCalledWith(
          'spatialExtents',
          SAMPLE_SPATIAL_EXTENTS
        )
      })
    })
  })
  describe('spatial coverage', () => {
    describe('#emitChanges', () => {
      const allKeywords = [
        ...datasetRecordsFixture()[0].keywords,
        ...SAMPLE_PLACE_KEYWORDS,
        NATIONAL_KEYWORD,
      ] as Keyword[]

      beforeEach(() => {
        editorFacade.record$ = from([
          { ...SAMPLE_RECORD, keywords: allKeywords } as CatalogRecord,
        ])
      })

      it('should filter out keywords that are not of type place and spatial scope keywords', async () => {
        const placeKeywords = [...SAMPLE_PLACE_KEYWORDS].map((k) => ({
          label: k.label,
          type: k.type,
          thesaurus: k.thesaurus,
        })) // remove bbox
        const placeKeywordsWithExtent = placeKeywords.map((k) => ({
          ...k,
          _doNotSave: false,
          _linkedExtent: SAMPLE_SPATIAL_EXTENTS[0],
        }))
        const spatialExtents = SAMPLE_SPATIAL_EXTENTS

        await component.emitChanges(placeKeywordsWithExtent, spatialExtents)

        expect(editorFacade.updateRecordField).toHaveBeenNthCalledWith(
          1,
          'keywords',
          [
            ...datasetRecordsFixture()[0].keywords,
            NATIONAL_KEYWORD,
            ...placeKeywords,
          ]
        )
        expect(editorFacade.updateRecordField).toHaveBeenNthCalledWith(
          2,
          'spatialExtents',
          spatialExtents
        )
      })
    })
  })
})
