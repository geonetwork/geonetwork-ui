import { TestBed } from '@angular/core/testing'
import { Title } from '@angular/platform-browser'
import { RouterStateSnapshot } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { of, throwError, BehaviorSubject } from 'rxjs'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { TitleService } from './datahub-title.service.js'
import { DatahubTemplatePageTitleStrategy } from './datahub-page-title-strategy.service.js'
import { MockProvider } from 'ng-mocks'

const RouterStateSnapshotMock = {
  url: '/test',
}

describe('DatahubTemplatePageTitleStrategy', () => {
  let service: DatahubTemplatePageTitleStrategy
  let titleService: Title
  let translateService: TranslateService
  let platformService: PlatformServiceInterface
  let titleServiceInstance: TitleService
  let titleSubject: BehaviorSubject<string>

  beforeEach(() => {
    titleSubject = new BehaviorSubject<string>('')

    TestBed.configureTestingModule({
      providers: [
        DatahubTemplatePageTitleStrategy,
        MockProvider(Title, {
          setTitle: jest.fn(),
        }),
        MockProvider(TranslateService, {
          get: jest.fn(),
        }),
        MockProvider(PlatformServiceInterface, {
          translateKey: jest.fn(),
        }),
        MockProvider(TitleService, {
          title$: titleSubject.asObservable(),
          setTitle: jest.fn(),
        }),
      ],
    })

    service = TestBed.inject(DatahubTemplatePageTitleStrategy)
    titleService = TestBed.inject(Title)
    translateService = TestBed.inject(TranslateService)
    platformService = TestBed.inject(PlatformServiceInterface)
    titleServiceInstance = TestBed.inject(TitleService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('updateTitle', () => {
    describe('when pageTitle is undefined', () => {
      beforeEach(() => {
        jest.spyOn(service as any, 'buildTitle').mockReturnValue(undefined)
      })

      it('should set title to "Datahub"', () => {
        service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)
        expect(titleService.setTitle).toHaveBeenCalledWith('Datahub')
      })

      it('should set titleService title to null', () => {
        service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)
        expect(titleServiceInstance.setTitle).toHaveBeenCalledWith(null)
      })
    })

    describe('when pageTitle is "entityTitle"', () => {
      beforeEach(() => {
        jest.spyOn(service as any, 'buildTitle').mockReturnValue('entityTitle')
        jest
          .spyOn(platformService, 'translateKey')
          .mockReturnValue(of('{pageTitle} | Custom Pattern'))
        jest
          .spyOn(translateService, 'get')
          .mockReturnValue(of('Entity Title Translation'))
        titleSubject.next('My Entity')
      })
      it('should not set titleService title to null', () => {
        service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)
        expect(titleServiceInstance.setTitle).not.toHaveBeenCalled()
      })

      it('should use entity title in formatted title', () => {
        service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)

        expect(titleService.setTitle).toHaveBeenCalledWith(
          'My Entity | Custom Pattern'
        )
      })
    })

    describe('when pageTitle is defined (not "entityTitle")', () => {
      beforeEach(() => {
        jest.spyOn(service as any, 'buildTitle').mockReturnValue('home.title')
      })

      it('should set titleService title to null', () => {
        jest
          .spyOn(platformService, 'translateKey')
          .mockReturnValue(of('{pageTitle}'))
        jest.spyOn(translateService, 'get').mockReturnValue(of('Home'))
        titleSubject.next(null)

        service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)
        expect(titleServiceInstance.setTitle).toHaveBeenCalledWith(null)
      })

      describe('with custom title pattern from platform service', () => {
        beforeEach(() => {
          jest
            .spyOn(platformService, 'translateKey')
            .mockReturnValue(of('{pageTitle} | Custom App'))
          jest.spyOn(translateService, 'get').mockReturnValue(of('Home Page'))
          titleSubject.next(null)
        })
        it('should request title pattern from platform service', () => {
          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)
          expect(platformService.translateKey).toHaveBeenCalledWith(
            'datahub-page-title-pattern'
          )
        })

        it('should translate page title', () => {
          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)
          expect(translateService.get).toHaveBeenCalledWith('home.title')
        })

        it('should set formatted title using custom pattern', () => {
          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)

          expect(titleService.setTitle).toHaveBeenCalledWith(
            'Home Page | Custom App'
          )
        })
      })

      describe('with default title pattern (platform service returns null)', () => {
        beforeEach(() => {
          jest.spyOn(platformService, 'translateKey').mockReturnValue(of(null))
          jest
            .spyOn(translateService, 'get')
            .mockReturnValue(of('Search Results'))
          titleSubject.next(null)
        })

        it('should use default pattern "{pageTitle} | Datahub"', () => {
          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)

          expect(titleService.setTitle).toHaveBeenCalledWith(
            'Search Results | Datahub'
          )
        })
      })

      describe('with platform service error', () => {
        beforeEach(() => {
          jest
            .spyOn(platformService, 'translateKey')
            .mockReturnValue(
              throwError(() => new Error('Platform service error'))
            )
          jest
            .spyOn(translateService, 'get')
            .mockReturnValue(of('Organizations'))
          titleSubject.next(null)
        })

        it('should fallback to default pattern', () => {
          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)

          expect(titleService.setTitle).toHaveBeenCalledWith(
            'Organizations | Datahub'
          )
        })
      })

      describe('with translate service error', () => {
        beforeEach(() => {
          jest
            .spyOn(platformService, 'translateKey')
            .mockReturnValue(of('{pageTitle} | App'))
          jest
            .spyOn(translateService, 'get')
            .mockReturnValue(throwError(() => new Error('Translation error')))
          titleSubject.next(null)
        })

        it('should use original page title key as fallback', () => {
          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)

          expect(titleService.setTitle).toHaveBeenCalledWith('home.title | App')
        })
      })

      describe('with entity title present', () => {
        beforeEach(() => {
          jest
            .spyOn(platformService, 'translateKey')
            .mockReturnValue(of('{pageTitle} - Datahub'))
          jest.spyOn(translateService, 'get').mockReturnValue(of('Page Title'))
          titleSubject.next('Entity Name')
        })

        it('should prefer entity title over translated page title', () => {
          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)

          expect(titleService.setTitle).toHaveBeenCalledWith(
            'Entity Name - Datahub'
          )
        })
      })

      describe('with entity title service error', () => {
        it('should fallback to translated page title', () => {
          jest
            .spyOn(platformService, 'translateKey')
            .mockReturnValue(of('{pageTitle} | App'))
          jest
            .spyOn(translateService, 'get')
            .mockReturnValue(of('Fallback Title'))

          const errorObservable = throwError(
            () => new Error('Title service error')
          )
          Object.defineProperty(titleServiceInstance, 'title$', {
            get: () => errorObservable,
            configurable: true,
          })

          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)

          expect(titleService.setTitle).toHaveBeenCalledWith(
            'Fallback Title | App'
          )
        })
      })

      describe('with null entity title', () => {
        beforeEach(() => {
          jest
            .spyOn(platformService, 'translateKey')
            .mockReturnValue(of('{pageTitle}'))
          jest.spyOn(translateService, 'get').mockReturnValue(of('News'))
          titleSubject.next(null)
        })

        it('should use translated page title', () => {
          service.updateTitle(RouterStateSnapshotMock as RouterStateSnapshot)

          expect(titleService.setTitle).toHaveBeenCalledWith('News')
        })
      })
    })
  })
})
