import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FavoriteStarComponent } from './favorite-star.component'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { StarToggleComponent } from '@geonetwork-ui/ui/inputs'
import { By } from '@angular/platform-browser'
import {
  ChangeDetectionStrategy,
  EventEmitter,
  NO_ERRORS_SCHEMA,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import tippy from 'tippy.js'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { FavoritesService } from '@geonetwork-ui/api/repository'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { MockProvider } from 'ng-mocks'
import { Location } from '@angular/common'

tippy = jest.fn()
const isAnonymous$ = new BehaviorSubject(false)
class PlatformServiceMock {
  isAnonymous = jest.fn(() => isAnonymous$)
}

class FavoritesServiceMock {
  myFavoritesUuid$ = new BehaviorSubject<string[]>([])
  removeFromFavorites = jest.fn(() => of(true))
  addToFavorites = jest.fn(() => of(true))
}

describe('FavoriteStarComponent', () => {
  let component: FavoriteStarComponent
  let fixture: ComponentFixture<FavoriteStarComponent>
  let platformService: PlatformServiceInterface
  let favoritesService: FavoritesService
  let favoriteCountHTMLEl: HTMLElement
  let starToggle: StarToggleComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: PlatformServiceInterface,
          useClass: PlatformServiceMock,
        },
        {
          provide: FavoritesService,
          useClass: FavoritesServiceMock,
        },
        MockProvider(TranslateService, {
          currentLang: 'fr',
          get: jest.fn(() => of('You can log in here')),
          onLangChange: new EventEmitter<{
            lang: string
            translations: object
          }>(),
        }),
        MockProvider(Location, {
          path: () => '/',
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(FavoriteStarComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    platformService = TestBed.inject(PlatformServiceInterface)
    favoritesService = TestBed.inject(FavoritesService)
    fixture = TestBed.createComponent(FavoriteStarComponent)
    component = fixture.componentInstance
    component.displayCount = true
    fixture.detectChanges()
    starToggle = fixture.debugElement.query(
      By.directive(StarToggleComponent)
    ).componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('Favorite count', () => {
    describe('when a record has a favorite count', () => {
      beforeEach(() => {
        component.record = {
          ...datasetRecordsFixture[0],
          extras: { favoriteCount: 42 },
        }
        fixture.detectChanges()
      })
      it('shows the amount of favorites on the record', () => {
        favoriteCountHTMLEl = fixture.debugElement.query(
          By.css('[data-test=favorite-count]')
        ).nativeElement
        expect(favoriteCountHTMLEl).toBeTruthy()
        expect(favoriteCountHTMLEl.textContent).toEqual(
          component.record.extras.favoriteCount.toString()
        )
      })
    })
    describe('when a record does not have a favorite count', () => {
      beforeEach(() => {
        component.record = { ...datasetRecordsFixture[0] }
        fixture.detectChanges()
      })
      it('does not show the amount of favorites on the record', () => {
        const favoriteCountEl = fixture.debugElement.query(
          By.css('[data-test=favorite-count]')
        )
        expect(favoriteCountEl).toBeFalsy()
      })
    })
  })
  describe('Favorite component availability', () => {
    describe('when authenticated', () => {
      it('star toggle is enabled', () => {
        expect(starToggle.disabled).toBe(false)
      })
      it('does not create tippy tooltip', () => {
        expect(tippy).not.toHaveBeenCalled()
      })
    })
    describe('when not authenticated', () => {
      beforeEach(() => {
        isAnonymous$.next(true)
        fixture.detectChanges()
      })
      it('star toggle is disabled', () => {
        expect(starToggle.disabled).toBe(true)
      })
      it('creates tippy tooltip', () => {
        expect(tippy).toHaveBeenCalledWith(
          expect.any(Object),
          expect.objectContaining({
            content: 'You can log in here',
            allowHTML: true,
            interactive: true,
            zIndex: 60,
            maxWidth: 250,
          })
        )
      })
    })
  })
  describe('On favorite click', () => {
    beforeEach(() => {
      component.record = {
        ...datasetRecordsFixture[0],
        extras: { favoriteCount: 42 },
      }
      fixture.detectChanges()
    })
    describe('When the record is already in favorites', () => {
      beforeEach(() => {
        starToggle.newValue.emit(false)
        fixture.detectChanges()
      })
      it('removes record from favorites', () => {
        expect(favoritesService.removeFromFavorites).toHaveBeenCalledWith([
          component.record.uniqueIdentifier,
        ])
        expect(favoritesService.addToFavorites).not.toHaveBeenCalled()
      })
    })
    describe('When the record is not in favorites', () => {
      beforeEach(() => {
        starToggle.newValue.emit(true)
        fixture.detectChanges()
      })
      it('adds record to favorites', () => {
        expect(favoritesService.addToFavorites).toHaveBeenCalledWith([
          component.record.uniqueIdentifier,
        ])
        expect(favoritesService.removeFromFavorites).not.toHaveBeenCalled()
      })
    })
  })

  describe('On favorites array update', () => {
    beforeEach(() => {
      component.record = {
        ...datasetRecordsFixture[0],
        extras: { favoriteCount: 42 },
      }
      fixture.detectChanges()
      favoriteCountHTMLEl = fixture.debugElement.query(
        By.css('[data-test=favorite-count]')
      ).nativeElement
    })
    describe('When my record is part of the updates', () => {
      beforeEach(() => {
        ;(favoritesService as any).myFavoritesUuid$.next([
          component.record.uniqueIdentifier,
        ])
        fixture.detectChanges()
      })
      it('increase record favorite count by one', () => {
        expect(favoriteCountHTMLEl.textContent).toEqual(
          ((component.record.extras.favoriteCount as number) + 1).toString()
        )
      })
    })
    describe('When my record is not part of the updates', () => {
      beforeEach(() => {
        ;(favoritesService as any).myFavoritesUuid$.next(['aaa', 'bbb'])
        fixture.detectChanges()
      })
      it('increase record favorite count by one', () => {
        expect(favoriteCountHTMLEl.textContent).toEqual(
          component.record.extras.favoriteCount.toString()
        )
      })
    })
  })

  describe('two subsequent changes', () => {
    beforeEach(() => {
      component.record = {
        ...datasetRecordsFixture[0],
        extras: { favoriteCount: 42 },
      }
      ;(favoritesService as any).myFavoritesUuid$.next(['aaa'])
      starToggle.newValue.emit(false)
      starToggle.newValue.emit(true)
      fixture.detectChanges()
    })
    it('removes and adds record to favorites', () => {
      expect(favoritesService.removeFromFavorites).toHaveBeenCalledWith([
        component.record.uniqueIdentifier,
      ])
      expect(favoritesService.addToFavorites).toHaveBeenCalledWith([
        component.record.uniqueIdentifier,
      ])
    })
    it('record favorite count stays the same', () => {
      expect(favoriteCountHTMLEl.textContent).toEqual(
        component.record.extras.favoriteCount.toString()
      )
    })
  })
  describe('if favorite modification fails', () => {
    beforeEach(() => {
      component.record = {
        ...datasetRecordsFixture[0],
        extras: { favoriteCount: 42 },
      }
      favoritesService.addToFavorites = () => throwError('blargz')
      starToggle.newValue.emit(true)
      fixture.detectChanges()
    })
    it('does not change record favorite count', () => {
      expect(favoriteCountHTMLEl.textContent).toEqual(
        component.record.extras.favoriteCount.toString()
      )
    })
  })

  describe('unsubscribe', () => {
    let unsubscribeSpy
    beforeEach(() => {
      unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe')
      component.ngOnDestroy()
    })
    it('unsubscribes', () => {
      expect(unsubscribeSpy).toHaveBeenCalled()
    })
  })
})
