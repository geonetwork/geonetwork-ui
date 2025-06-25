import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  datasetRecordsFixture,
  SAMPLE_RECORD,
} from '@geonetwork-ui/common/fixtures'

import {
  HEADER_HEIGHT_DEFAULT,
  HEADER_HEIGHT_MOBILE_THUMBNAIL,
  HeaderRecordComponent,
} from './header-record.component'
import { MockBuilder, MockProvider } from 'ng-mocks'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'
import { MdViewFacade } from '@geonetwork-ui/feature/record'
import { BehaviorSubject } from 'rxjs'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { SearchService } from '@geonetwork-ui/feature/search'
import { DateService } from '@geonetwork-ui/util/shared'

jest.mock('@geonetwork-ui/util/app-config', () => ({
  getThemeConfig: () => ({
    HEADER_BACKGROUND: 'red',
    HEADER_FOREGROUND_COLOR: 'white',
  }),
  getGlobalConfig() {
    return {
      LANGUAGES: ['en', 'es'],
    }
  },
}))

describe('HeaderRecordComponent', () => {
  let component: HeaderRecordComponent
  let fixture: ComponentFixture<HeaderRecordComponent>
  let facade

  beforeEach(() => MockBuilder(HeaderRecordComponent))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideI18n(),
        MockProvider(MdViewFacade, {
          isPresent$: new BehaviorSubject(false),
          metadata$: new BehaviorSubject(SAMPLE_RECORD),
          downloadLinks$: new BehaviorSubject([]),
          apiLinks$: new BehaviorSubject([]),
          otherLinks$: new BehaviorSubject([]),
          related$: new BehaviorSubject(null),
          error$: new BehaviorSubject(null),
          isMetadataLoading$: new BehaviorSubject(false),
        }),
        MockProvider(SearchService, {
          updateFilters: jest.fn(),
        }),
        MockProvider(DateService, {
          formatDate: jest.fn(),
        }),
      ],
    }).compileComponents()
    facade = TestBed.inject(MdViewFacade)
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRecordComponent)
    component = fixture.componentInstance
    component.metadata = {
      ...datasetRecordsFixture()[0],
    } as DatasetRecord
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('isMobile$', () => {
    it('should emit true if window.innerWidth < MOBILE_MAX_WIDTH', (done) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      window.dispatchEvent(new Event('resize'))
      component.isMobile$.subscribe((isMobile) => {
        expect(isMobile).toBe(true)
        done()
      })
    })
    it('should emit false if window.innerWidth >= MOBILE_MAX_WIDTH', (done) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      })
      window.dispatchEvent(new Event('resize'))
      component.isMobile$.subscribe((isMobile) => {
        expect(isMobile).toBe(false)
        done()
      })
    })
  })

  describe('thumbnailUrl$', () => {
    it('should emit the overview url if present', (done) => {
      const record = {
        ...datasetRecordsFixture().find((r) => r.kind === 'dataset'),
        overviews: [{ url: 'http://img' }],
      }
      facade.metadata$.next(record)
      component.thumbnailUrl$.subscribe((url) => {
        expect(url).toBe('http://img')
        done()
      })
    })
    it('should emit null if overviews is empty', (done) => {
      const record = {
        ...datasetRecordsFixture().find((r) => r.kind === 'dataset'),
        overviews: [],
      }
      facade.metadata$.next(record)
      component.thumbnailUrl$.subscribe((url) => {
        expect(url).toBeNull()
        done()
      })
    })
    it('should emit undefined if overviews is undefined', (done) => {
      const record = {
        ...datasetRecordsFixture().find((r) => r.kind === 'dataset'),
      }
      delete record.overviews
      facade.metadata$.next(record)
      component.thumbnailUrl$.subscribe((url) => {
        expect(url).toBeUndefined()
        done()
      })
    })
  })

  describe('fullHeaderHeight$', () => {
    it('should emit HEADER_HEIGHT_MOBILE_THUMBNAIL if mobile and thumbnailUrl', (done) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500,
      })
      window.dispatchEvent(new Event('resize'))
      const record = {
        ...datasetRecordsFixture().find((r) => r.kind === 'dataset'),
        overviews: [{ url: 'http://img' }],
      }
      facade.metadata$.next(record)
      component.fullHeaderHeight$.subscribe((height) => {
        expect(height).toBe(HEADER_HEIGHT_MOBILE_THUMBNAIL)
        done()
      })
    })
    it('should emit HEADER_HEIGHT_DEFAULT if not mobile', (done) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      })
      window.dispatchEvent(new Event('resize'))
      const record = {
        ...datasetRecordsFixture().find((r) => r.kind === 'dataset'),
        overviews: [{ url: 'http://img' }],
      }
      facade.metadata$.next(record)
      component.fullHeaderHeight$.subscribe((height) => {
        expect(height).toBe(HEADER_HEIGHT_DEFAULT)
        done()
      })
    })
    it('should emit HEADER_HEIGHT_DEFAULT if no thumbnail', (done) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      })
      window.dispatchEvent(new Event('resize'))
      const record = {
        ...datasetRecordsFixture().find((r) => r.kind === 'dataset'),
      }
      facade.metadata$.next(record)
      component.fullHeaderHeight$.subscribe((height) => {
        expect(height).toBe(HEADER_HEIGHT_DEFAULT)
        done()
      })
    })
  })

  describe('reuseLinkUrl$', () => {
    it('should emit the first url if links are present', (done) => {
      const links = [{ url: 'http://test1' }, { url: 'http://test2' }]
      facade.otherLinks$.next(links)
      component.reuseLinkUrl$.subscribe((url) => {
        expect(url).toBe('http://test1')
        done()
      })
    })
    it('should emit null if no links are present', (done) => {
      facade.otherLinks$.next([])
      component.reuseLinkUrl$.subscribe((url) => {
        expect(url).toBeNull()
        done()
      })
    })
  })

  describe('lastUpdate getter', () => {
    it('should format the recordUpdated date using DateService', () => {
      const dateService = TestBed.inject(DateService)
      const spy = jest
        .spyOn(dateService, 'formatDate')
        .mockReturnValue('formatted-date')
      expect(component.lastUpdate).toBe('formatted-date')
      expect(spy).toHaveBeenCalledWith(datasetRecordsFixture()[0].recordUpdated)
    })
  })

  describe('back()', () => {
    it('should call searchService.updateFilters with empty object', () => {
      const searchService = TestBed.inject(SearchService)
      const spy = jest.spyOn(searchService, 'updateFilters')
      component.back()
      expect(spy).toHaveBeenCalledWith({})
    })
  })
})
