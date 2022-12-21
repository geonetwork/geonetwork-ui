import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FavoriteStarComponent } from './favorite-star.component'
import { BehaviorSubject, of, throwError } from 'rxjs'
import { AuthService } from '@geonetwork-ui/feature/auth'
import { FavoritesService } from '../favorites.service'
import { StarToggleComponent } from '@geonetwork-ui/ui/inputs'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { By } from '@angular/platform-browser'
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import tippy from 'tippy.js'

tippy = jest.fn()
class AuthServiceMock {
  isAnonymous$ = new BehaviorSubject(false)
}

class FavoritesServiceMock {
  myFavoritesUuid$ = new BehaviorSubject<string[]>([])
  removeFromFavorites = jest.fn(() => of(true))
  addToFavorites = jest.fn(() => of(true))
}

class TranslateServiceMock {
  currentLang = 'fr'
  instant = jest.fn(() => 'You can log in here')
}

describe('FavoriteStarComponent', () => {
  let component: FavoriteStarComponent
  let fixture: ComponentFixture<FavoriteStarComponent>
  let authService: AuthService
  let favoritesService: FavoritesService
  let favoriteCountEl: HTMLElement
  let starToggle: StarToggleComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteStarComponent, StarToggleComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: FavoritesService,
          useClass: FavoritesServiceMock,
        },
        {
          provide: TranslateService,
          useClass: TranslateServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(FavoriteStarComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents()

    authService = TestBed.inject(AuthService)
    favoritesService = TestBed.inject(FavoritesService)
    fixture = TestBed.createComponent(FavoriteStarComponent)
    component = fixture.componentInstance
    component.record = { ...RECORDS_SUMMARY_FIXTURE[0], favoriteCount: 42 }
    fixture.detectChanges()
    starToggle = fixture.debugElement.query(
      By.directive(StarToggleComponent)
    ).componentInstance
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('when a record has a favorite count', () => {
    beforeEach(() => {
      favoriteCountEl = fixture.debugElement.query(
        By.css('.favorite-count')
      ).nativeElement
    })
    it('shows the amount of favorites on the record', () => {
      expect(favoriteCountEl).toBeTruthy()
      expect(favoriteCountEl.textContent).toEqual(
        component.record.favoriteCount.toString()
      )
    })
  })
  describe('when a record does not have a favorite count', () => {
    beforeEach(() => {
      component.record = { ...RECORDS_SUMMARY_FIXTURE[0] }
      delete component.record.favoriteCount
      fixture.detectChanges()
    })
    it('does not show the amount of favorites on the record', () => {
      expect(fixture.debugElement.query(By.css('.favorite-count'))).toBeFalsy()
    })
  })
  describe('when authenticated', () => {
    it('star toggle is enabled', () => {
      expect(starToggle.disabled).toBe(false)
    })
    it('does not create tippy tooltip', () => {
      expect(tippy).not.toHaveBeenCalled()
    })
    describe('on toggle state change', () => {
      beforeEach(() => {
        favoriteCountEl = fixture.debugElement.query(
          By.css('.favorite-count')
        ).nativeElement
      })
      describe('if record is not part of favorite', () => {
        beforeEach(() => {
          ;(favoritesService as any).myFavoritesUuid$.next([
            'aaa',
            'bbb',
            'ccc',
          ])
          starToggle.newValue.emit(true)
          fixture.detectChanges()
        })
        it('adds record to favorites', () => {
          expect(favoritesService.addToFavorites).toHaveBeenCalledWith([
            component.record.uuid,
          ])
          expect(favoritesService.removeFromFavorites).not.toHaveBeenCalled()
        })
        it('increase record favorite count by one', () => {
          expect(favoriteCountEl.textContent).toEqual(
            (component.record.favoriteCount + 1).toString()
          )
        })
      })
      describe('if record is part of favorite', () => {
        beforeEach(() => {
          ;(favoritesService as any).myFavoritesUuid$.next([
            'aaa',
            'bbb',
            component.record.uuid,
          ])
          starToggle.newValue.emit(false)
          fixture.detectChanges()
        })
        it('removes record from favorites', () => {
          expect(favoritesService.removeFromFavorites).toHaveBeenCalledWith([
            component.record.uuid,
          ])
          expect(favoritesService.addToFavorites).not.toHaveBeenCalled()
        })
        it('decrease record favorite count by one', () => {
          expect(favoriteCountEl.textContent).toEqual(
            (component.record.favoriteCount - 1).toString()
          )
        })
      })
      describe('two subsequent changes', () => {
        beforeEach(() => {
          ;(favoritesService as any).myFavoritesUuid$.next([
            'aaa',
            'bbb',
            component.record.uuid,
          ])
          starToggle.newValue.emit(false)
          starToggle.newValue.emit(true)
          fixture.detectChanges()
        })
        it('removes and adds record to favorites', () => {
          expect(favoritesService.removeFromFavorites).toHaveBeenCalledWith([
            component.record.uuid,
          ])
          expect(favoritesService.addToFavorites).toHaveBeenCalledWith([
            component.record.uuid,
          ])
        })
        it('record favorite count stays the same', () => {
          expect(favoriteCountEl.textContent).toEqual(
            component.record.favoriteCount.toString()
          )
        })
      })
      describe('if favorite modification fails', () => {
        beforeEach(() => {
          favoritesService.addToFavorites = () => throwError('blargz')
          starToggle.newValue.emit(true)
          fixture.detectChanges()
        })
        it('does not change record favorite count', () => {
          expect(favoriteCountEl.textContent).toEqual(
            component.record.favoriteCount.toString()
          )
        })
      })
    })
  })
  describe('when not authenticated', () => {
    beforeEach(() => {
      ;(authService as any).isAnonymous$.next(true)
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
          zIndex: 40,
          maxWidth: 250,
        })
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
