import { FavoritesService } from './favorites.service'
import {
  MeResponseApiModel,
  UserselectionsApiService,
} from '@geonetwork-ui/data-access/gn4'
import { firstValueFrom, of, throwError } from 'rxjs'
import { delay } from 'rxjs/operators'
import { fakeAsync, tick } from '@angular/core/testing'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'

class Gn4PlatformServiceMock {
  getMe = jest.fn(() =>
    of({
      id: '1234',
      name: 'fakeuser',
    } as MeResponseApiModel)
  )
}

class UserSelectionsServiceMock {
  getSelectionRecords = jest.fn(() => of(['abcd', 'efgh', 'ijkl']))
  addToUserSelection = jest.fn(() => of(''))
  deleteFromUserSelection = jest.fn(() => of(''))
}

describe('FavoritesService', () => {
  let service: FavoritesService
  let userSelectionsService: UserselectionsApiService
  let platform: PlatformServiceInterface

  beforeEach(() => {
    userSelectionsService = new UserSelectionsServiceMock() as any
    platform = new Gn4PlatformServiceMock() as any
    service = new FavoritesService(userSelectionsService, platform)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('myFavorites$', () => {
    describe('when not authenticated', () => {
      beforeEach(() => {
        platform.getMe = () => of(null)
        service = new FavoritesService(userSelectionsService, platform)
      })
      it('returns an empty array', async () => {
        const uuids = await firstValueFrom(service.myFavoritesUuid$)
        expect(uuids).toEqual([])
      })
    })
    describe('when an error happens', () => {
      let originalConsoleError
      beforeAll(() => {
        originalConsoleError = window.console.error
        window.console.error = jest.fn()
      })
      afterAll(() => {
        window.console.error = originalConsoleError
      })
      beforeEach(() => {
        userSelectionsService.getSelectionRecords = jest.fn(() =>
          throwError(() => new Error('blargz'))
        )
      })
      it('writes the error to the console', async () => {
        await firstValueFrom(service.myFavoritesUuid$)
        const errorMsg = (window.console.error as jest.Mock).mock.calls[0][0]
        expect(errorMsg).toContain('fetching favorite records')
        expect(errorMsg).toContain('blargz')
      })
    })
    it('emits a list of saved record uuids', async () => {
      const uuids = await firstValueFrom(service.myFavoritesUuid$)
      expect(uuids).toEqual(['abcd', 'efgh', 'ijkl'])
    })
    describe('when subscribing multiple times', () => {
      beforeEach(fakeAsync(() => {
        ;(userSelectionsService as any).getSelectionRecords = jest.fn(() =>
          of(['aa']).pipe(
            delay(100) // add a delay to make sure that there are no concurrent requests
          )
        )
        service.myFavoritesUuid$.subscribe()
        service.myFavoritesUuid$.subscribe()
        tick(200)
        service.myFavoritesUuid$.subscribe()
      }))
      it('only calls the API once', () => {
        expect(userSelectionsService.getSelectionRecords).toHaveBeenCalledTimes(
          1
        )
      })
    })
  })

  describe('addToFavorites', () => {
    let favorites
    describe('when not authenticated', () => {
      beforeEach(() => {
        platform.getMe = () => of(null)
        service = new FavoritesService(userSelectionsService, platform)
      })
      it('throws an error', async () => {
        expect.assertions(1)
        try {
          await firstValueFrom(service.addToFavorites(['aaa']))
        } catch (e: any) {
          expect(e.message).toContain('not authenticated')
        }
      })
    })
    describe('when an error happens', () => {
      beforeEach(() => {
        favorites = null
        service.myFavoritesUuid$.subscribe((value) => (favorites = value))
        userSelectionsService.addToUserSelection = jest.fn(() =>
          throwError(() => new Error('blargz'))
        )
      })
      it('throws an error', async () => {
        expect.assertions(2)
        try {
          await firstValueFrom(service.addToFavorites(['aaa']))
        } catch (e: any) {
          expect(e.message).toContain('adding records')
          expect(e.message).toContain('blargz')
        }
      })
      it('does not add the record to favorites', async () => {
        expect.assertions(1)
        try {
          await firstValueFrom(service.addToFavorites(['zzz']))
        } catch (e) {
          // ignore
        }
        expect(favorites).toEqual(['abcd', 'efgh', 'ijkl'])
      })
    })
    describe('nominal case', () => {
      beforeEach(async () => {
        favorites = null
        service.myFavoritesUuid$.subscribe((value) => (favorites = value))
        await firstValueFrom(service.addToFavorites(['uvw', 'xyz']))
      })
      it('calls the corresponding API', () => {
        expect(userSelectionsService.addToUserSelection).toHaveBeenCalledWith(
          0,
          1234,
          ['uvw', 'xyz']
        )
      })
      it('emits new records in myFavorites$', () => {
        expect(favorites).toEqual(['abcd', 'efgh', 'ijkl', 'uvw', 'xyz'])
      })
    })
  })

  describe('removeFromFavorites', () => {
    let favorites
    describe('when not authenticated', () => {
      beforeEach(() => {
        platform.getMe = () => of(null)
        service = new FavoritesService(userSelectionsService, platform)
      })
      it('throws an error', async () => {
        expect.assertions(1)
        try {
          await firstValueFrom(service.removeFromFavorites(['aaa']))
        } catch (e: any) {
          expect(e.message).toContain('not authenticated')
        }
      })
    })
    describe('when an error happens', () => {
      beforeEach(() => {
        favorites = null
        service.myFavoritesUuid$.subscribe((value) => (favorites = value))
        userSelectionsService.deleteFromUserSelection = jest.fn(() =>
          throwError(() => new Error('blargz'))
        )
      })
      it('throws an error', async () => {
        expect.assertions(2)
        try {
          await firstValueFrom(service.removeFromFavorites(['aaa']))
        } catch (e: any) {
          expect(e.message).toContain('removing records')
          expect(e.message).toContain('blargz')
        }
      })
      it('does not remove the record from favorites', async () => {
        expect.assertions(1)
        try {
          await firstValueFrom(service.removeFromFavorites(['abcd']))
        } catch (e) {
          // ignore
        }
        expect(favorites).toEqual(['abcd', 'efgh', 'ijkl'])
      })
    })
    describe('nominal case', () => {
      beforeEach(async () => {
        favorites = null
        service.myFavoritesUuid$.subscribe((value) => (favorites = value))
        await firstValueFrom(service.removeFromFavorites(['abcd', 'ijkl']))
      })
      it('calls the corresponding API', () => {
        expect(
          userSelectionsService.deleteFromUserSelection
        ).toHaveBeenCalledWith(0, 1234, ['abcd', 'ijkl'])
      })
      it('emits records without the ones removed in myFavorites$', () => {
        expect(favorites).toEqual(['efgh'])
      })
    })
  })
})
